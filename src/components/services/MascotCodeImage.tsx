// src/components/services/MascotCodeImage.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

const MASCOT_SRC = "/assets/brand/mascot-code.png";
const ASPECT_RATIO = 627 / 679;

const VERTEX_SHADER = `
attribute vec2 a; 
varying vec2 v;
void main(){ 
  v = vec2(a.x * 0.5 + 0.5, 0.5 - a.y * 0.5); 
  gl_Position = vec4(a, 0.0, 1.0); 
}`;

const FRAGMENT_SHADER = `
precision highp float; 
varying vec2 v;
uniform sampler2D tex;
uniform float uT, uNear, uSpd, uHov, uBlink, uEarL, uEarR;
uniform vec2 uCur;

float G(vec2 p, vec2 c, vec2 r){ 
  vec2 q = (p - c) / r; 
  float s = dot(q, q); 
  return exp(-s * s); 
}

vec2 R(vec2 p, vec2 c, float a){ 
  vec2 q = p - c; 
  float s = sin(a), k = cos(a); 
  return vec2(k * q.x - s * q.y, s * q.x + k * q.y) - q; 
}

float K(vec2 p, vec2 c, float a, float b){ 
  return smoothstep(a, b, length(p - c)); 
}

void main(){
  vec2 p = v, d = vec2(0.0);
  float live = 1.0 + uNear * 0.8;

  // 1. EARS TWITCH (Anchored to mascot-code.png ear positions)
  vec2 PL = vec2(0.38, 0.24), PR = vec2(0.60, 0.22);
  float eL = sin(uT * 2.3) * 0.025 + uEarL;
  float eR = sin(uT * 2.1 + 1.0) * 0.025 - uEarR;
  d += R(p, PL, -eL) * G(p, vec2(0.32, 0.12), vec2(0.10, 0.14)) * K(p, PL, 0.02, 0.18);
  d += R(p, PR, -eR) * G(p, vec2(0.65, 0.12), vec2(0.10, 0.14)) * K(p, PR, 0.02, 0.18);

  // 2. LEFT HAND TAPPING HOLOGRAM
  float ph = mod(uT, 30.0);
  float hi = max(
    smoothstep(0.0, 0.8, ph) * (1.0 - smoothstep(3.2, 4.0, ph)), 
    max(smoothstep(0.10, 0.5, uNear) * 0.95, uHov)
  );
  vec2 Elbow = vec2(0.35, 0.52);
  float waveMotion = (-0.12 + sin(uT * 6.5) * 0.10) * hi;
  float handMask = G(p, vec2(0.30, 0.48), vec2(0.14, 0.14)) * K(p, Elbow, 0.02, 0.18);
  d += R(p, Elbow, waveMotion) * handMask;

  // 3. RIGHT ARM SUBTLE BREATHING MOTION
  vec2 E2 = vec2(0.65, 0.60);
  d += R(p, E2, -sin(uT * 2.0 + 1.2) * 0.04) * G(p, vec2(0.58, 0.65), vec2(0.10, 0.09)) * K(p, E2, 0.03, 0.12);

  // 4. LEGS WEIGHT SHIFT
  float lg = sin(uT * 2.4) * 0.03 * live;
  vec2 HL = vec2(0.42, 0.82), HR = vec2(0.58, 0.82);
  d += R(p, HL, -lg) * G(p, vec2(0.42, 0.88), vec2(0.10, 0.12)) * K(p, HL, 0.04, 0.18);
  d += R(p, HR, lg) * G(p, vec2(0.58, 0.88), vec2(0.10, 0.12)) * K(p, HR, 0.04, 0.18);

  // 5. TAIL FLUID SWISH
  vec2 B = vec2(0.72, 0.75);
  float td = length(p - B), k = smoothstep(0.06, 0.5, td);
  float wt = G(p, vec2(0.85, 0.60), vec2(0.18, 0.30)) * smoothstep(0.62, 0.70, p.x);
  float sw = (sin(uT * 2.1) * 0.08 + sin(uT * 3.7 + 1.0) * 0.03);
  d += R(p, B, -sw * k) * wt;
  d.x += sin(uT * 4.2 - td * 11.0) * 0.010 * k * wt;
  d.y += cos(uT * 3.1 - td * 9.0) * 0.006 * k * wt;

  // Clean texture sampling without artificial eye overlays cutting through artwork
  vec2 t0 = p + d;
  vec4 c = texture2D(tex, t0);

  // Ambient LED Ear & Tail Glow
  float gl = G(p, vec2(0.28, 0.16), vec2(0.05, 0.08)) + G(p, vec2(0.64, 0.16), vec2(0.045, 0.07)) + G(p, vec2(0.78, 0.50), vec2(0.08, 0.10));
  c.rgb = min(c.rgb * (1.0 + gl * 0.35 * (0.5 + 0.5 * sin(uT * 3.0))), vec3(c.a));

  gl_FragColor = c;
}`;

export default function MascotCodeImage() {
    const wrap = useRef<HTMLDivElement>(null);
    const cv = useRef<HTMLCanvasElement>(null);
    const [fallback, setFallback] = useState(false);

    useEffect(() => {
        const canvas = cv.current;
        const box = wrap.current;
        if (!canvas || !box) return;

        const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true });
        if (!gl) { setFallback(true); return; }

        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

        const sh = (type: number, src: string) => {
            const s = gl.createShader(type)!;
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
            return s;
        };

        const prog = gl.createProgram()!;
        gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERTEX_SHADER));
        gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
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
        const uBlink = u("uBlink"), uEarL = u("uEarL"), uEarR = u("uEarR");

        const s = {
            tx: 0, ty: 0, x: 0, y: 0,
            nearT: 0, near: 0, hovT: 0, hov: 0,
            spdT: 0, spd: 0,
            blink: 0, earL: 0, earR: 0
        };

        let nextBlink = 1.5, blinkT = -1, dbl = false;
        const ears = [{ next: 1.8, t: -1 }, { next: 3.4, t: -1 }];
        let raf = 0, ready = false, alive = true;

        const draw = (t: number) => {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform1f(uT, t);
            gl.uniform1f(uNear, s.near);
            gl.uniform1f(uSpd, s.spd);
            gl.uniform1f(uHov, s.hov);
            gl.uniform2f(uCur, s.x, s.y);
            gl.uniform1f(uBlink, s.blink);
            gl.uniform1f(uEarL, s.earL);
            gl.uniform1f(uEarR, s.earR);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const resize = () => {
            const { width: W, height: H } = box.getBoundingClientRect();
            let w = W, h = W / ASPECT_RATIO;
            if (h > H) { h = H; w = H * ASPECT_RATIO; }
            const dpr = Math.min(devicePixelRatio || 1, 2);
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
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
            s.hovT = Math.max(0, 1 - Math.hypot(cx - 0.3, cy - 0.5) / 0.35);
            s.spdT = Math.min(1, (Math.abs(e.movementX) + Math.abs(e.movementY)) / 60);
        };

        const loop = (ms: number) => {
            s.x += (s.tx - s.x) * 0.07;
            s.y += (s.ty - s.y) * 0.07;
            s.near += (s.nearT - s.near) * 0.08;
            s.hov += (s.hovT - s.hov) * 0.1;
            s.spd += (s.spdT - s.spd) * 0.1;
            s.spdT *= 0.92;

            const t = ms / 1000;

            if (blinkT < 0 && t > nextBlink) {
                blinkT = t;
                nextBlink = t + 2 + Math.random() * 3;
                dbl = Math.random() < 0.25;
            }
            if (blinkT >= 0) {
                const k = (t - blinkT) / 0.17;
                if (k >= 1) {
                    s.blink = 0;
                    if (dbl) { blinkT = t; dbl = false; } else { blinkT = -1; }
                } else {
                    s.blink = Math.sin(k * Math.PI);
                }
            }

            ears.forEach((e, i) => {
                if (e.t < 0 && t > e.next) { e.t = t; e.next = t + 2.5 + Math.random() * 3.5; }
                let val = 0;
                if (e.t >= 0) {
                    const k = (t - e.t) / 0.5;
                    if (k >= 1) { e.t = -1; } else { val = Math.sin(k * Math.PI * 3) * (1 - k) * 0.16; }
                }
                if (i === 1) { s.earR = val; } else { s.earL = val; }
            });

            draw(t);
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
            ready = true;
            resize();
            if (reduce) return;
            addEventListener("pointermove", on);
            raf = requestAnimationFrame(loop);
        };
        img.src = MASCOT_SRC;

        return () => {
            alive = false;
            cancelAnimationFrame(raf);
            ro.disconnect();
            removeEventListener("pointermove", on);
        };
    }, []);

    return (
        <div ref={wrap} className="relative grid h-full w-full place-items-center" suppressHydrationWarning>
            <div aria-hidden className="absolute inset-[14%] rounded-full bg-purple-500/20 blur-3xl" />
            {fallback ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={MASCOT_SRC} alt="Quantimite mascot" className="relative max-h-full max-w-full object-contain" />
            ) : (
                <canvas ref={cv} role="img" aria-label="Quantimite mascot" className="relative" />
            )}
        </div>
    );
}