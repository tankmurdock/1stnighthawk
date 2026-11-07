import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useMotion";

/* ══════════════════════════════════════════════════════════════════
   01 · LIQUID CTA — a button whose surface is a live fragment shader.
   Pointer velocity drives a distortion field; ink pools where you
   last dragged. Raw WebGL, no three.js, ~2KB of GLSL.
   ══════════════════════════════════════════════════════════════════ */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_energy;

// value noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv - 0.5;
  p.x *= u_res.x / u_res.y;

  // pointer pulls the field toward itself
  vec2 m = u_mouse / u_res - 0.5;
  m.x *= u_res.x / u_res.y;
  float d = length(p - m);
  float pull = u_energy * 0.42 / (1.0 + d * 7.0);

  vec2 q = p * 2.6 + vec2(u_time * 0.055, u_time * 0.03);
  float f = fbm(q + pull * 3.4);
  float f2 = fbm(q * 1.7 - f * 1.3 + vec2(1.7, 9.2));

  // sodium base, pulled toward ember in the hot spots
  vec3 base = vec3(1.0, 0.628, 0.228);
  vec3 hot  = vec3(1.0, 0.416, 0.172);
  vec3 cool = vec3(0.35, 0.22, 0.14);

  vec3 col = mix(base, hot, smoothstep(0.28, 0.78, f2));
  col = mix(col, cool, smoothstep(0.62, 1.0, f) * 0.55);

  // liquid specular from the noise gradient
  float spec = pow(smoothstep(0.46, 0.94, f * f2 * 1.9), 5.0);
  col += spec * vec3(1.0, 0.94, 0.86) * (0.7 + u_energy * 0.9);

  // edge falloff so it reads as a solid object
  vec2 e = smoothstep(vec2(0.0), vec2(0.09), uv) *
           smoothstep(vec2(0.0), vec2(0.09), 1.0 - uv);
  col *= mix(0.55, 1.0, e.x * e.y);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function ShaderButton() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    // full-viewport quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uEnergy = gl.getUniformLocation(prog, "u_energy");

    let energy = 0;
    let targetEnergy = 0;
    let mx = 0;
    let my = 0;
    let raf = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width * dpr));
      const h = Math.max(1, Math.floor(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const dpr = canvas.width / r.width;
      mx = (e.clientX - r.left) * dpr;
      my = canvas.height - (e.clientY - r.top) * dpr;
      targetEnergy = 1;
    };
    const onLeave = () => {
      targetEnergy = 0;
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const render = (now: number) => {
      energy += (targetEnergy - energy) * 0.06;
      targetEnergy *= 0.985;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mx || canvas.width * 0.5, my || canvas.height * 0.5);
      gl.uniform1f(uTime, reduced ? 0 : (now - start) / 1000);
      gl.uniform1f(uEnergy, reduced ? 0.35 : energy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [reduced]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center p-8">
        <div
          ref={wrapRef}
          className="relative w-full max-w-sm cursor-pointer overflow-hidden rounded-sm"
          style={{ aspectRatio: "3 / 1" }}
          data-cursor="drag"
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
          />
          {!ready && (
            <div className="absolute inset-0 bg-graphite" aria-hidden />
          )}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.24em] text-void mix-blend-overlay">
            Start a project
          </span>
        </div>
      </div>
      <p className="px-8 pb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
        Drag across it
      </p>
    </div>
  );
}
