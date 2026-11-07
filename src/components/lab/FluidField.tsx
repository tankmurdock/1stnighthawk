import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "../../hooks/useMotion";

/* ══════════════════════════════════════════════════════════════════
   06 · FLUID FIELD
   20,000 GPU particles morphing between shapes. All motion happens in
   the vertex shader — JavaScript only pushes a uniform. One draw call.

   Click to reform into the next shape.
   ══════════════════════════════════════════════════════════════════ */

const VERT = `
uniform float u_time;
uniform float u_morph;
uniform float u_points;

attribute vec3 a_sphere;
attribute vec3 a_torus;
attribute vec3 a_cube;
attribute float a_seed;

varying float v_energy;

vec3 shapeAt(float t) {
  // cube → torus → sphere, then back to cube
  if (t < 0.334) {
    float k = t / 0.334;
    k = k * k * (3.0 - 2.0 * k);
    return mix(a_cube, a_torus, k);
  } else if (t < 0.667) {
    float k = (t - 0.334) / 0.333;
    k = k * k * (3.0 - 2.0 * k);
    return mix(a_torus, a_sphere, k);
  } else {
    float k = (t - 0.667) / 0.333;
    k = k * k * (3.0 - 2.0 * k);
    return mix(a_sphere, a_cube, k);
  }
}

void main() {
  vec3 base = shapeAt(u_morph);

  // breathing turbulence so it never looks frozen
  float n = sin(u_time * 0.7 + a_seed * 6.2831) * 0.5 + 0.5;
  base += normalize(base + 0.0001) * n * 0.055;

  vec4 mv = modelViewMatrix * vec4(base, 1.0);

  // subtle depth-of-field-ish falloff toward the camera
  float depth = -mv.z;
  gl_PointSize = (1.5 + a_seed * 1.4) * (11.0 / depth);

  v_energy = n;
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = `
varying float v_energy;
uniform vec3 u_cool;
uniform vec3 u_warm;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;

  // soft round sprite
  float alpha = smoothstep(0.5, 0.06, d);

  vec3 col = mix(u_cool, u_warm, v_energy);

  gl_FragColor = vec4(col, alpha * 0.42);
}
`;

export function FluidField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const COUNT = reduced ? 4000 : 20000;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.6;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const geo = new THREE.BufferGeometry();

    const positions = new Float32Array(COUNT * 3); // required dummy
    const sphere = new Float32Array(COUNT * 3);
    const torus = new Float32Array(COUNT * 3);
    const cube = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // sphere (fibonacci)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.25;
      sphere[i3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sphere[i3 + 2] = r * Math.cos(phi);

      // torus
      const u = (i / COUNT) * Math.PI * 2;
      const v = i * 0.618 * Math.PI * 2;
      const R = 1.05;
      const rr = 0.4;
      torus[i3] = (R + rr * Math.cos(v)) * Math.cos(u);
      torus[i3 + 1] = rr * Math.sin(v);
      torus[i3 + 2] = (R + rr * Math.cos(v)) * Math.sin(u);

      // cube shell
      const face = i % 6;
      const a = Math.random() * 2 - 1;
      const b = Math.random() * 2 - 1;
      const h = 0.95;
      if (face === 0) {
        cube[i3] = h;
        cube[i3 + 1] = a * h;
        cube[i3 + 2] = b * h;
      } else if (face === 1) {
        cube[i3] = -h;
        cube[i3 + 1] = a * h;
        cube[i3 + 2] = b * h;
      } else if (face === 2) {
        cube[i3] = a * h;
        cube[i3 + 1] = h;
        cube[i3 + 2] = b * h;
      } else if (face === 3) {
        cube[i3] = a * h;
        cube[i3 + 1] = -h;
        cube[i3 + 2] = b * h;
      } else if (face === 4) {
        cube[i3] = a * h;
        cube[i3 + 1] = b * h;
        cube[i3 + 2] = h;
      } else {
        cube[i3] = a * h;
        cube[i3 + 1] = b * h;
        cube[i3 + 2] = -h;
      }

      seed[i] = Math.random();
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("a_sphere", new THREE.BufferAttribute(sphere, 3));
    geo.setAttribute("a_torus", new THREE.BufferAttribute(torus, 3));
    geo.setAttribute("a_cube", new THREE.BufferAttribute(cube, 3));
    geo.setAttribute("a_seed", new THREE.BufferAttribute(seed, 1));

    const uniforms = {
      u_time: { value: 0 },
      u_morph: { value: 0 },
      u_points: { value: COUNT },
      u_cool: { value: new THREE.Color("#74d0e6") },
      u_warm: { value: new THREE.Color("#ffa03a") },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, material);
    scene.add(points);

    let morph = 0;
    let targetMorph = 0;
    let raf = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const w = Math.max(1, r.width);
      const h = Math.max(1, r.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const onClick = () => {
      targetMorph = (targetMorph + 0.334) % 1;
    };
    wrap.addEventListener("click", onClick);

    const render = () => {
      const t = clock.getElapsedTime();
      morph += (targetMorph - morph) * 0.035;

      uniforms.u_time.value = reduced ? 0 : t;
      uniforms.u_morph.value = morph;

      if (!reduced) {
        points.rotation.y = t * 0.16;
        points.rotation.x = Math.sin(t * 0.22) * 0.12;
        camera.position.x = Math.sin(t * 0.18) * 0.22;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("click", onClick);
      geo.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === wrap) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, [reduced]);

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1">
        <div
          ref={wrapRef}
          className="absolute inset-0 cursor-pointer"
          data-cursor="morph"
        />
      </div>
      <p className="px-8 pb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        {reduced
          ? "Static preview"
          : "Click to reform · 20,000 points, 1 draw call"}
      </p>
    </div>
  );
}
