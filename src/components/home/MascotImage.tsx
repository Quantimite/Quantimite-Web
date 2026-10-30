"use client";
import { useEffect, useRef, useState } from "react";

const SRC = "/assets/brand/mascot.png";
const ASPECT = 627 / 679;

const VERT = `attribute vec2 a; varying vec2 v;
void main(){ v = vec2(a.x*.5+.5, .5-a.y*.5); gl_Position = vec4(a,0.,1.); }`;

// The mascot is warped smoothly in place (no layers, no ghosting).
// Coordinates are normalised image positions, origin top-left.
const FRAG = `precision highp float; varying vec2 v;
uniform sampler2D tex; uniform float uT, uNear, uSpd, uHov; uniform vec2 uCur;
float G(vec2 p, vec2 c, vec2 r){ vec2 q=(p-c)/r; float s=dot(q,q); return exp(-s*s); }
vec2 R(vec2 p, vec2 c, float a){ vec2 q=p-c; float s=sin(a), k=cos(a); return vec2(k*q.x-s*q.y, s*q.x+k*q.y)-q; }
void main(){
  vec2 p=v, d=vec2(0.);
  // head turns and nods toward the cursor
  float wh = 1.-smoothstep(.40,.50,p.y);
  d += (R(p,vec2(.44,.47),-uCur.x*.05) + vec2(-uCur.x*.012,-uCur.y*.008))*wh;
  // eyes look at the cursor
  d += vec2(-uCur.x*.008,-uCur.y*.006)*(G(p,vec2(.343,.29),vec2(.045)) + G(p,vec2(.54,.29),vec2(.045)));
  // smile: widens, lifts at the corners, opens a little; grows when the cursor is near
  vec2 M=vec2(.43,.405); float wm=G(p,M,vec2(.075,.042));
  float am=.08+.10*(.5+.5*sin(uT*1.3))+.14*uNear;
  d += vec2(-(p.x-M.x)*am*.8, abs(p.x-M.x)*am*.8-(p.y-M.y)*am*.5)*wm;
  // waving hand (pivots at the elbow), waves more when the cursor is over it
  vec2 E=vec2(.21,.63);
  float wa=G(p,vec2(.11,.57),vec2(.14,.10))*smoothstep(.02,.14,length(p-E));
  float aw=(.07+.07*sin(uT*2.6))*(1.+uHov*1.3)+uCur.x*.02;
  d += R(p,E,-aw)*wa;
  // tail sways from its base, faster when the cursor moves quickly
  vec2 B=vec2(.70,.78);
  float wt=G(p,vec2(.86,.58),vec2(.17,.30))*smoothstep(.08,.5,length(p-B));
  d += R(p,B,-sin(uT*1.9)*.05*(1.+uSpd*2.5))*wt;
  gl_FragColor = texture2D(tex, p+d);
}`;

export default function MascotImage() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = cv.current!, box = wrap.current!;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true });
    if (!gl) { setFallback(true); return; }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFallback(true); return; }
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uT = u("uT"), uNear = u("uNear"), uSpd = u("uSpd"), uHov = u("uHov"), uCur = u("uCur");
    const s = { tx: 0, ty: 0, x: 0, y: 0, nearT: 0, near: 0, hovT: 0, hov: 0, spdT: 0, spd: 0 };
    let raf = 0, ready = false, alive = true;

    const draw = (t: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, t); gl.uniform1f(uNear, s.near); gl.uniform1f(uSpd, s.spd);
      gl.uniform1f(uHov, s.hov); gl.uniform2f(uCur, s.x, s.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const resize = () => {
      const { width: W, height: H } = box.getBoundingClientRect();
      let w = W, h = W / ASPECT;
      if (h > H) { h = H; w = H * ASPECT; }
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (ready && reduce) draw(0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(box);

    const on = (e: PointerEvent) => {
      s.tx = (e.clientX / innerWidth) * 2 - 1;
      s.ty = (e.clientY / innerHeight) * 2 - 1;
      const r = canvas.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width, cy = (e.clientY - r.top) / r.height;
      s.nearT = Math.max(0, 1 - Math.hypot(cx - 0.45, cy - 0.45) / 0.9);
      s.hovT = Math.max(0, 1 - Math.hypot(cx - 0.1, cy - 0.57) / 0.35);
      s.spdT = Math.min(1, (Math.abs(e.movementX) + Math.abs(e.movementY)) / 60);
    };
    const loop = (ms: number) => {
      s.x += (s.tx - s.x) * 0.07; s.y += (s.ty - s.y) * 0.07;
      s.near += (s.nearT - s.near) * 0.08; s.hov += (s.hovT - s.hov) * 0.1;
      s.spd += (s.spdT - s.spd) * 0.1; s.spdT *= 0.92;
      draw(ms / 1000);
      raf = requestAnimationFrame(loop);
    };

    const img = new Image();
    img.onload = () => {
      if (!alive) return;
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      ready = true; resize();
      if (reduce) return;
      addEventListener("pointermove", on);
      raf = requestAnimationFrame(loop);
    };
    img.src = SRC;

    return () => {
      alive = false; cancelAnimationFrame(raf); ro.disconnect();
      removeEventListener("pointermove", on);
    };
  }, []);

  return (
    <div ref={wrap} className="relative grid h-full w-full place-items-center">
      <div aria-hidden className="absolute inset-[14%] rounded-full bg-brand opacity-25 blur-3xl" />
      {fallback ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={SRC} alt="Quantimite mascot" className="relative max-h-full max-w-full object-contain" />
      ) : (
        <canvas ref={cv} role="img" aria-label="Quantimite mascot" className="relative" />
      )}
    </div>
  );
}
