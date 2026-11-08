import { useMemo, useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/* ══════════════════════════════════════════════════════════════════
   HAWK RELIEF

   The brand mark is a flat JPEG. We sample it on the CPU into a grid,
   then use per-pixel luminance to drive Z displacement. Bright chrome
   pushes forward, the black background sinks away. The result is a
   genuine 3D relief with real normals that can be lit and moved.

   No .glb required, and it keeps the exact brand mark.
   ══════════════════════════════════════════════════════════════════ */

const GRID = 240; // vertices per side
const SIZE = 3.1; // world units
const DEPTH = 0.62; // max displacement — a bas-relief, not an explosion
const SILHOUETTE_BLUR = 7; // wide blur defines the overall volume
const DETAIL_GAIN = 0.55; // how much surface texture rides on top

type Sampled = {
  positions: Float32Array;
  colors: Float32Array;
  heights: Float32Array;
  indices: Uint32Array;
};

/* Separable box blur over a square height field. */
function blurHeights(
  src: Float32Array,
  size: number,
  radius: number,
  passes: number,
) {
  const buf = src.slice();
  const tmp = new Float32Array(size * size);

  for (let p = 0; p < passes; p++) {
    for (let y = 0; y < size; y++) {
      const row = y * size;
      for (let x = 0; x < size; x++) {
        let sum = 0;
        let n = 0;
        for (let k = -radius; k <= radius; k++) {
          const xx = x + k;
          if (xx < 0 || xx >= size) continue;
          sum += buf[row + xx];
          n++;
        }
        tmp[row + x] = sum / n;
      }
    }
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        let sum = 0;
        let n = 0;
        for (let k = -radius; k <= radius; k++) {
          const yy = y + k;
          if (yy < 0 || yy >= size) continue;
          sum += tmp[yy * size + x];
          n++;
        }
        buf[y * size + x] = sum / n;
      }
    }
  }

  return buf;
}

function buildRelief(image: HTMLImageElement): Sampled {
  const canvas = document.createElement("canvas");
  const s = GRID;
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(image, 0, 0, s, s);
  const { data } = ctx.getImageData(0, 0, s, s);

  const count = s * s;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const raw = new Float32Array(count);

  // pass 1 — luminance + colour
  for (let i = 0; i < count; i++) {
    const p = i * 4;
    const r = data[p] / 255;
    const g = data[p + 1] / 255;
    const b = data[p + 2] / 255;

    let lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // crush the near-black background so the silhouette is clean
    lum = Math.max(0, (lum - 0.055) / 0.945);
    raw[i] = lum;

    const i3 = i * 3;
    const base = 0.05 + Math.pow(lum, 0.62) * 0.95;
    colors[i3] = Math.min(1, base * (0.9 + r * 0.28));
    colors[i3 + 1] = Math.min(1, base * (0.93 + g * 0.24));
    colors[i3 + 2] = Math.min(1, base * (1.0 + b * 0.18));
  }

  /* Two scales of height, which is the whole trick:

     SILHOUETTE — a wide blur of luminance. This is the hawk's actual
     volume: the beak, the crown, the cheek plates. Smooth, so the
     surface normals stay clean under a moving light.

     DETAIL — the high-frequency remainder (raw minus a light blur).
     Panel lines, screws, edge highlights. Scaled well below the
     silhouette amplitude so it textures the form instead of
     shattering it. */

  const silhouette = blurHeights(raw, s, SILHOUETTE_BLUR, 3);
  const midBlur = blurHeights(raw, s, 2, 2);

  const heights = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const detail = (raw[i] - midBlur[i]) * DETAIL_GAIN;
    heights[i] = Math.max(0, silhouette[i] + detail);
  }

  // pass 3 — geometry
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const i = y * s + x;
      const i3 = i * 3;
      positions[i3] = (x / (s - 1) - 0.5) * SIZE;
      positions[i3 + 1] = (0.5 - y / (s - 1)) * SIZE;
      positions[i3 + 2] = heights[i] * DEPTH;
    }
  }

  const indices = new Uint32Array((s - 1) * (s - 1) * 6);
  let o = 0;
  for (let y = 0; y < s - 1; y++) {
    for (let x = 0; x < s - 1; x++) {
      const a = y * s + x;
      const b2 = a + 1;
      const c = a + s;
      const d = c + 1;
      indices[o++] = a;
      indices[o++] = c;
      indices[o++] = b2;
      indices[o++] = b2;
      indices[o++] = c;
      indices[o++] = d;
    }
  }

  return { positions, colors, heights, indices };
}

function Relief({ sampled, reduced }: { sampled: Sampled; reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(sampled.positions.slice(), 3),
    );
    g.setAttribute(
      "color",
      new THREE.BufferAttribute(sampled.colors.slice(), 3),
    );
    g.setIndex(new THREE.BufferAttribute(sampled.indices, 1));
    g.computeVertexNormals();
    return g;
  }, [sampled]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mesh = meshRef.current;
    if (!mesh) return;

    if (!reduced) {
      // slow breathing rotation — like an object on a turntable under a light
      mesh.rotation.y = Math.sin(t * 0.14) * 0.16;
      mesh.rotation.x = -0.04 + Math.sin(t * 0.11 + 1.2) * 0.035;
      mesh.position.y = Math.sin(t * 0.32) * 0.018;
    }

    // travelling specular sweep across the plates
    if (matRef.current) {
      const sweep = reduced ? 0.5 : Math.sin(t * 0.28) * 0.5 + 0.5;
      matRef.current.emissiveIntensity = 0.05 + sweep * 0.09;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0.06, 0]}>
      <meshStandardMaterial
        ref={matRef}
        vertexColors
        roughness={0.28}
        metalness={0.94}
        emissive="#ffa03a"
        emissiveIntensity={0.08}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

/* ── Camera rig: pointer parallax + scroll dolly ─────────────────── */

function Rig({ reduced }: { reduced: boolean }) {
  const { camera, size } = useThree();
  const target = useRef({ x: 0, y: 0 });
  const pointer = useRef({ x: 0, y: 0 });

  /* Framing. The mark must *bleed* — that's what makes the desktop
     composition work: the hawk is large, slightly cropped, and the headline
     lands on its dark lower half. Pulling the camera far back on a phone
     shrinks it into a tidy postcard above the text, which reads as a
     separate panel instead of one layered image. So on narrow screens we
     move *closer* and aim lower, cropping the top and dropping the mark
     into the upper half to leave the type real space. */
  const frameFor = (w: number, h: number) => {
    const aspect = w / Math.max(h, 1);
    if (aspect >= 1.4) return { dist: 4.05, aimY: 0.02 }; // desktop / landscape
    if (aspect >= 1.0) return { dist: 4.3, aimY: 0.0 };
    if (aspect >= 0.75) return { dist: 3.95, aimY: -0.1 };
    return { dist: 3.5, aimY: -0.42 }; // tall, narrow phones
  };

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { dist, aimY } = frameFor(size.width, size.height);

    if (reduced) {
      camera.position.set(0, aimY, dist);
      camera.lookAt(0, aimY, 0);
      return;
    }

    target.current.x += (pointer.current.x * 0.34 - target.current.x) * 0.045;
    target.current.y += (-pointer.current.y * 0.24 - target.current.y) * 0.045;

    // gentle handheld drift so it never feels machine-perfect
    const driftX = Math.sin(t * 0.19) * 0.045;
    const driftY = Math.cos(t * 0.23) * 0.032;

    camera.position.x +=
      (target.current.x + driftX - camera.position.x) * Math.min(1, delta * 4);
    camera.position.y +=
      (aimY + target.current.y + driftY - camera.position.y) *
      Math.min(1, delta * 4);
    // ease the dolly so a resize (orientation change) doesn't snap
    camera.position.z +=
      (dist - camera.position.z) * Math.min(1, delta * 3);

    camera.lookAt(0, aimY + 0.02, 0);
  });

  return null;
}

/* ── Atmosphere: warm dust drifting through the beam ─────────────── */

function Dust({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = reduced ? 220 : 900;

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const sz = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7 - 0.5;
      sz[i] = Math.random();
    }
    return { positions: pos, sizes: sz };
  }, [COUNT]);

  useFrame((state) => {
    const p = ref.current;
    if (!p) return;
    const t = state.clock.elapsedTime;
    if (!reduced) {
      p.rotation.y = t * 0.012;
      p.rotation.x = Math.sin(t * 0.07) * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.013}
        color="#ffc98a"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Procedural environment ───────────────────────────────────────
   A metal with no environment has nothing to reflect, so it reads as
   flat black with a few hot spots. Rather than ship an HDR file, we
   paint a tiny equirectangular gradient (cool sky above, sodium floor
   below) and run it through PMREM. Costs one 128×64 canvas. */

function Environment() {
  const { gl, scene } = useThree();
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;

    const w = 128;
    const h = 64;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#93aecf");
    grad.addColorStop(0.34, "#3b4a60");
    grad.addColorStop(0.52, "#080b12");
    grad.addColorStop(0.72, "#3a2413");
    grad.addColorStop(1, "#ffb066");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // warm key panel so highlights have direction
    const hotspot = ctx.createRadialGradient(
      w * 0.72,
      h * 0.28,
      0,
      w * 0.72,
      h * 0.28,
      w * 0.3,
    );
    hotspot.addColorStop(0, "rgba(255,190,130,0.95)");
    hotspot.addColorStop(0.5, "rgba(255,140,60,0.28)");
    hotspot.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = hotspot;
    ctx.fillRect(0, 0, w, h);

    // cool bounce panel on the other side
    const cool = ctx.createRadialGradient(
      w * 0.2,
      h * 0.34,
      0,
      w * 0.2,
      h * 0.34,
      w * 0.26,
    );
    cool.addColorStop(0, "rgba(150,200,255,0.7)");
    cool.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = cool;
    ctx.fillRect(0, 0, w, h);

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;

    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromEquirectangular(tex);
    scene.environment = envRT.texture;

    return () => {
      scene.environment = null;
      envRT.dispose();
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

/* ── Lighting: cool key from above, warm sodium rim from behind ──── */

function Lights({ reduced }: { reduced: boolean }) {
  const rim = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!rim.current || reduced) return;
    const t = state.clock.elapsedTime;
    rim.current.intensity = 22 + Math.sin(t * 0.6) * 4;
  });

  return (
    <>
      <ambientLight intensity={0.14} color="#2b3547" />

      {/* key — cool moonlight, high and left */}
      <directionalLight
        position={[-3.2, 4.4, 3.4]}
        intensity={1.5}
        color="#cfe4ff"
      />

      {/* fill — very low, keeps the blacks from going flat */}
      <directionalLight
        position={[3.4, -1.8, 2.2]}
        intensity={0.25}
        color="#5c7085"
      />

      {/* sodium rim from behind, the signature light of the whole site */}
      <pointLight
        ref={rim}
        position={[1.7, 1.5, -2.6]}
        intensity={22}
        color="#ff9a3c"
        distance={10}
      />

      {/* thin cool instrument glow, used once, low */}
      <pointLight
        position={[-2.6, -1.4, -1.6]}
        intensity={5}
        color="#74d0e6"
        distance={8}
      />
    </>
  );
}

/* ── Scene ──────────────────────────────────────────────────────── */

function Scene({ sampled, reduced }: { sampled: Sampled; reduced: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#04050a", 7, 14]} />
      <Environment />
      <Lights reduced={reduced} />
      <Relief sampled={sampled} reduced={reduced} />
      <Dust reduced={reduced} />
      <Rig reduced={reduced} />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={reduced ? 0.3 : 0.55}
          luminanceThreshold={0.62}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <ChromaticAberration
          offset={[0.00022, 0.00034]}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.96} />
        <Noise
          premultiply
          blendFunction={BlendFunction.OVERLAY}
          opacity={0.18}
        />
      </EffectComposer>
    </>
  );
}

/* ── Public component ───────────────────────────────────────────── */

export default function HawkScene({ className = "" }: { className?: string }) {
  const [sampled, setSampled] = useState<Sampled | null>(null);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* Device pixel ratio cap.

     The relief is a soft, low-frequency form, so it holds up at lower
     resolution than, say, text does. On a 3x phone the 1.75 cap means
     rendering ~3.7x the pixels of a 1x canvas, every frame, through a
     mipmap-blur bloom chain — and that cost lands directly on the scroll.
     Capping touch devices at 1.25 cuts pixels per frame by more than half
     with no visible loss at this scale. */
  const dpr = useMemo<[number, number]>(() => {
    if (typeof window === "undefined") return [1, 1.75];
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    return coarse ? [1, 1.25] : [1, 1.75];
  }, []);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/nighthawk.jpeg";

    img.onload = () => {
      if (cancelled) return;
      try {
        // defer the CPU sampling so first paint isn't blocked
        requestAnimationFrame(() => {
          if (cancelled) return;
          setSampled(buildRelief(img));
        });
      } catch {
        setFailed(true);
      }
    };
    img.onerror = () => !cancelled && setFailed(true);

    return () => {
      cancelled = true;
    };
  }, []);

  /* Pause the render loop when the hero is off screen.

     A generous rootMargin so the scene is already warm again by the time you
     scroll back up — resuming into a black frame would be worse than the
     wasted frames. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (failed) return <StaticHawk className={className} />;

  return (
    <div ref={wrapRef} className={className}>
      {!sampled && <StaticHawk className="absolute inset-0" />}

      {sampled && (
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0.05, 4.6], fov: 44, near: 0.1, far: 40 }}
          dpr={dpr}
          /* Stop rendering once the hero scrolls away. Three.js otherwise
             keeps drawing the relief, its dust field and the whole post
             chain for the entire length of the page — pure waste that shows
             up as dropped frames exactly when you are scrolling past it. */
          frameloop={visible ? "always" : "never"}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <Scene sampled={sampled} reduced={reduced} />
        </Canvas>
      )}

      {/* radial falloff so the sculpture sits in real darkness */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 50% 46%, transparent 30%, rgba(4,5,10,0.55) 68%, #04050a 100%)",
        }}
      />
    </div>
  );
}

/* Graceful fallback: the original image, graded to match */
function StaticHawk({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img
        src="/nighthawk.jpeg"
        alt="1st Nighthawk Innovations mark"
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          filter: "contrast(1.15) saturate(0.7) brightness(0.95)",
          maskImage:
            "radial-gradient(ellipse 62% 58% at 50% 46%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 58% at 50% 46%, #000 30%, transparent 78%)",
        }}
      />
    </div>
  );
}
