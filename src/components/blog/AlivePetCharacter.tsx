"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Zap, Heart, MessageSquare } from "lucide-react";

const MASCOT_SRC = "/assets/brand/mascot.png";
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
uniform float uT, uNear, uSpd, uHov, uBlink, uEarL, uEarR, uScroll;
uniform vec2 uCur, uEye;

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

// Real eyeball movement
vec4 eyeball(vec4 c, vec2 t0, vec2 e, vec2 ev){
  float m = 1.0 - smoothstep(0.84, 1.0, length((t0 - e) / vec2(0.050, 0.040)));
  vec2 t = t0 - ev;
  float ir = 1.0 - smoothstep(0.88, 1.0, length((t - e) / vec2(0.036, 0.032)));
  vec4 sc = vec4(vec3(0.94, 0.94, 0.98) * mix(0.78, 1.0, smoothstep(-0.03, 0.03, t0.y - e.y)), 1.0);
  return mix(c, mix(sc, texture2D(tex, t), ir), m);
}

// Eyelids blinking
vec4 lid(vec4 c, vec2 p, vec2 e){
  float m = 1.0 - smoothstep(0.8, 1.0, length((p - e) / vec2(0.062, 0.066)));
  float yy = (p.y - (e.y - 0.066)) / 0.132;
  float a = uBlink * 0.6, b = 1.0 - uBlink * 0.5;
  float cov = max(1.0 - smoothstep(a - 0.05, a, yy), smoothstep(b, b + 0.05, yy)) * m;
  vec4 f = 0.5 * (texture2D(tex, p + vec2(0.075, 0.0)) + texture2D(tex, p - vec2(0.075, 0.0)));
  c = mix(c, f, cov);
  c.rgb *= 1.0 - 0.45 * uBlink * G(p, e + vec2(0.0, 0.012), vec2(0.05, 0.009));
  return c;
}

void main(){
  vec2 p = v, d = vec2(0.0);
  float live = 1.0 + uNear * 0.8;
  
  // 1. Head turns towards cursor & bows with scroll
  float wh = (1.0 - smoothstep(0.40, 0.50, p.y)) * (1.0 - smoothstep(0.68, 0.74, p.x) * smoothstep(0.30, 0.38, p.y));
  d += (R(p, vec2(0.44, 0.47), -uCur.x * 0.05) + vec2(-uCur.x * 0.012, -uCur.y * 0.010 - uScroll * 0.015)) * wh;

  // 2. Ears animation (reacts to cursor speed and scroll velocity)
  vec2 PL = vec2(0.30, 0.21), PR = vec2(0.60, 0.20);
  float eL = sin(uT * 2.3) * 0.025 + uEarL + uSpd * 0.06;
  float eR = sin(uT * 2.1 + 1.0) * 0.025 - uEarR - uSpd * 0.06;
  d += R(p, PL, -eL) * G(p, vec2(0.25, 0.11), vec2(0.10, 0.14)) * K(p, PL, 0.02, 0.18);
  d += R(p, PR, -eR) * G(p, vec2(0.65, 0.11), vec2(0.10, 0.14)) * K(p, PR, 0.02, 0.18);

  // 3. Living smile & mouth expression
  vec2 M = vec2(0.43, 0.405);
  float wm = G(p, M, vec2(0.08, 0.045));
  float am = 0.10 + 0.16 * (0.5 + 0.5 * sin(uT * 1.7)) + 0.16 * uNear;
  float op = 0.15 + 0.30 * (0.5 + 0.5 * sin(uT * 2.9));
  d += vec2(-(p.x - M.x) * am * 0.9, abs(p.x - M.x) * am * 0.9 - (p.y - M.y) * op) * wm;

  // 4. Forearm and paw waving (cycles or triggers when cursor hovers near)
  float ph = mod(uT, 30.0);
  float hi = max(
    smoothstep(0.0, 0.8, ph) * (1.0 - smoothstep(3.2, 4.0, ph)), 
    max(smoothstep(0.10, 0.5, uNear) * 0.95, uHov)
  );
  vec2 Elbow = vec2(0.22, 0.63);
  float waveMotion = (-0.20 + sin(uT * 7.0) * 0.18) * hi;
  float handMask = G(p, vec2(0.14, 0.52), vec2(0.18, 0.18)) * K(p, Elbow, 0.02, 0.20);
  d += R(p, Elbow, waveMotion) * handMask;

  // 5. Breathing chest and body motion
  vec2 E2 = vec2(0.69, 0.62);
  d += R(p, E2, -sin(uT * 2.0 + 1.2) * 0.06) * G(p, vec2(0.60, 0.69), vec2(0.11, 0.09)) * K(p, E2, 0.03, 0.12);

  // 6. Weight shifting
  float lg = sin(uT * 2.4) * 0.05 * live;
  vec2 HL = vec2(0.33, 0.76), HR = vec2(0.50, 0.77);
  d += R(p, HL, -lg) * G(p, vec2(0.30, 0.88), vec2(0.12, 0.13)) * K(p, HL, 0.04, 0.2);
  d += R(p, HR, lg) * G(p, vec2(0.53, 0.88), vec2(0.11, 0.13)) * K(p, HR, 0.04, 0.2);

  // 7. Tail animation (accelerates with speed & scroll)
  vec2 B = vec2(0.70, 0.78);
  float td = length(p - B), k = smoothstep(0.06, 0.5, td);
  float hd = 1.0 - smoothstep(0.9, 1.1, length((p - vec2(0.43, 0.30)) / vec2(0.30, 0.22)));
  float wt = G(p, vec2(0.84, 0.60), vec2(0.20, 0.32)) * smoothstep(0.60, 0.68, p.x) * (1.0 - hd);
  float sp = 1.0 + uSpd * 2.5;
  float sw = (sin(uT * 2.1) * 0.09 + sin(uT * 3.7 + 1.0) * 0.04) * sp;
  d += R(p, B, -sw * k) * wt;
  d.x += sin(uT * 4.2 - td * 11.0) * 0.012 * k * wt * sp;
  d.y += cos(uT * 3.1 - td * 9.0) * 0.008 * k * wt * sp;

  // Eyeball and lids tracking cursor and scroll
  vec2 t0 = p + d;
  vec2 EL = vec2(0.344, 0.289), ER = vec2(0.534, 0.284);
  vec2 ev = uEye * vec2(0.014, 0.010);
  
  vec4 c = texture2D(tex, t0);
  c = eyeball(c, t0, EL, ev);
  c = eyeball(c, t0, ER, ev);
  c = lid(c, p, EL);
  c = lid(c, p, ER);

  // Glowing cyber ear rings and tail LED accents
  float gl = G(p, vec2(0.247, 0.15), vec2(0.05, 0.08)) + 
             G(p, vec2(0.646, 0.155), vec2(0.045, 0.07)) + 
             G(p, vec2(0.75, 0.50), vec2(0.08, 0.10)) + 
             G(p, vec2(0.79, 0.625), vec2(0.03, 0.05));
  c.rgb = min(c.rgb * (1.0 + gl * 0.45 * (0.5 + 0.5 * sin(uT * 3.0))), vec3(c.a));

  gl_FragColor = c;
}`;

export default function AlivePetCharacter() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [petReaction, setPetReaction] = useState(false);
  const [characterFloatY, setCharacterFloatY] = useState(0);

  useEffect(() => {
    const canvas = cv.current;
    const box = wrap.current;
    if (!canvas || !box) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }

    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    const getLoc = (n: string) => gl.getUniformLocation(prog, n);
    const uT = getLoc("uT");
    const uNear = getLoc("uNear");
    const uSpd = getLoc("uSpd");
    const uHov = getLoc("uHov");
    const uCur = getLoc("uCur");
    const uBlink = getLoc("uBlink");
    const uEarL = getLoc("uEarL");
    const uEarR = getLoc("uEarR");
    const uEye = getLoc("uEye");
    const uScroll = getLoc("uScroll");

    const state = {
      tx: 0,
      ty: 0,
      x: 0,
      y: 0,
      nearT: 0,
      near: 0,
      hovT: 0,
      hov: 0,
      spdT: 0,
      spd: 0,
      eTx: 0,
      eTy: 0,
      ex: 0,
      ey: 0,
      blink: 0,
      earL: 0,
      earR: 0,
      scrollY: 0,
      targetScrollY: 0,
    };

    let nextBlink = 1.5;
    let blinkT = -1;
    let dbl = false;
    const ears = [
      { next: 1.8, t: -1 },
      { next: 3.4, t: -1 },
    ];
    let raf = 0;
    let ready = false;
    let alive = true;

    const draw = (t: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uT, t);
      gl.uniform1f(uNear, state.near);
      gl.uniform1f(uSpd, state.spd);
      gl.uniform1f(uHov, state.hov);
      gl.uniform2f(uCur, state.x, state.y);
      gl.uniform1f(uBlink, state.blink);
      gl.uniform1f(uEarL, state.earL);
      gl.uniform1f(uEarR, state.earR);
      gl.uniform2f(uEye, state.ex, state.ey);
      gl.uniform1f(uScroll, state.scrollY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const resize = () => {
      const { width: W, height: H } = box.getBoundingClientRect();
      let w = W,
        h = W / ASPECT_RATIO;
      if (h > H) {
        h = H;
        w = H * ASPECT_RATIO;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (ready && reduce) draw(0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(box);

    // Pointer movement tracking
    const onPointerMove = (e: PointerEvent) => {
      state.tx = (e.clientX / window.innerWidth) * 2 - 1;
      state.ty = (e.clientY / window.innerHeight) * 2 - 1;

      const r = canvas.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width;
      const cy = (e.clientY - r.top) / r.height;

      state.nearT = Math.max(0, 1 - Math.hypot(cx - 0.45, cy - 0.45) / 0.9);
      state.hovT = Math.max(0, 1 - Math.hypot(cx - 0.1, cy - 0.57) / 0.35);
      state.spdT = Math.min(1, (Math.abs(e.movementX) + Math.abs(e.movementY)) / 50);

      // Eyeball tracking direction
      let vx = (e.clientX - (r.left + r.width * 0.44)) / (window.innerWidth * 0.4);
      let vy = (e.clientY - (r.top + r.height * 0.29)) / (window.innerHeight * 0.4);
      const len = Math.hypot(vx, vy);
      if (len > 1) {
        vx /= len;
        vy /= len;
      }
      state.eTx = vx;
      state.eTy = vy;
    };

    // Scroll movement tracking
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // When scrolling down, animal looks down towards the content
      const normScroll = Math.min(1, currentScrollY / 500);
      state.targetScrollY = normScroll;

      // Scroll speed adds to ear and tail excitation
      state.spdT = Math.min(1, state.spdT + Math.abs(delta) / 40);

      // Eye targets downward bias during scrolling down
      if (delta > 2) {
        state.eTy = Math.min(1, state.eTy + 0.35);
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = (ms: number) => {
      if (!alive) return;

      const t = ms / 1000;

      // Smooth interpolation for cursor & scroll parameters
      state.x += (state.tx - state.x) * 0.08;
      state.y += (state.ty - state.y) * 0.08;
      state.near += (state.nearT - state.near) * 0.08;
      state.hov += (state.hovT - state.hov) * 0.1;
      state.spd += (state.spdT - state.spd) * 0.1;
      state.spdT *= 0.92;

      state.ex += (state.eTx - state.ex) * 0.22;
      state.ey += (state.eTy - state.ey) * 0.22;
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.08;

      // Natural vertical floating/breathing of the character
      const breathing = Math.sin(t * 2.2) * 5;
      const scrollLag = state.scrollY * 15;
      setCharacterFloatY(breathing + scrollLag);

      // Blinking logic
      if (blinkT < 0 && t > nextBlink) {
        blinkT = t;
        nextBlink = t + 2 + Math.random() * 3.5;
        dbl = Math.random() < 0.25;
      }
      if (blinkT >= 0) {
        const k = (t - blinkT) / 0.17;
        if (k >= 1) {
          state.blink = 0;
          if (dbl) {
            blinkT = t;
            dbl = false;
          } else {
            blinkT = -1;
          }
        } else {
          state.blink = Math.sin(k * Math.PI);
        }
      }

      // Ear twitches
      ears.forEach((e, i) => {
        if (e.t < 0 && t > e.next) {
          e.t = t;
          e.next = t + 2.5 + Math.random() * 3.5;
        }
        let val = 0;
        if (e.t >= 0) {
          const k = (t - e.t) / 0.5;
          if (k >= 1) {
            e.t = -1;
          } else {
            val = Math.sin(k * Math.PI * 3) * (1 - k) * 0.18;
          }
        }
        if (i) {
          state.earR = val;
        } else {
          state.earL = val;
        }
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
      raf = requestAnimationFrame(loop);
    };
    img.src = MASCOT_SRC;

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handlePet = () => {
    setPetReaction(true);
    setTimeout(() => setPetReaction(false), 1400);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:col-span-5 lg:max-w-none select-none">
      {/* Ambient background glow behind pet (static, smooth backdrop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-violet/25 via-azure/20 to-fuchsia-400/20 blur-3xl"
      />

      {/* Stable, clean Apple-Glass Card Panel — NO card perspective tilt */}
      <div
        onClick={handlePet}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="apple-glass-panel relative h-[380px] w-full max-w-[420px] rounded-3xl p-4 shadow-xl sm:h-[460px] cursor-pointer"
      >
        {/* Heart / Purr bubble on pet click */}
        {petReaction && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce flex items-center gap-1.5 rounded-full bg-rose-500 text-white px-3.5 py-1 text-xs font-bold shadow-lg">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Purr! Loved by you</span>
          </div>
        )}

        {/* The Alive Animal Character (Organic breathing float & WebGL deformation inside) */}
        <div
          ref={wrap}
          className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl transition-transform duration-300"
          style={{
            transform: `translateY(${characterFloatY}px)`,
          }}
        >
          {fallback ? (
            <img
              src={MASCOT_SRC}
              alt="Quantimite pet mascot"
              className="relative max-h-full max-w-full object-contain"
            />
          ) : (
            <canvas
              ref={cv}
              role="img"
              aria-label="Quantimite alive pet mascot"
              className="relative"
            />
          )}
        </div>

        {/* Informative interactive badges around the pet */}
        <div className="absolute -left-3 top-8 flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-plum shadow-md backdrop-blur-md sm:-left-5 pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Alive &amp; Reacting</span>
        </div>

        <div className="absolute -right-3 top-12 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-violet shadow-md backdrop-blur-md sm:-right-5 pointer-events-none">
          <Sparkles className="h-3.5 w-3.5 text-violet" />
          <span>Eye &amp; Scroll Follow</span>
        </div>

        <div className="absolute -left-2 bottom-8 hidden items-center gap-2 rounded-2xl border border-white/80 bg-white/95 p-2.5 shadow-md backdrop-blur-md sm:flex pointer-events-none">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-azure/10 text-azure">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-plum leading-tight">Quantimite Mascot</p>
            <p className="text-[9px] text-plum/60 font-mono">Blinks, Waves &amp; Glances</p>
          </div>
        </div>

        <div className="absolute -right-2 bottom-8 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-plum shadow-md backdrop-blur-md sm:-right-3 pointer-events-none">
          <span>🐾</span>
          <span className="text-plum/80 text-[11px]">Click to pet!</span>
        </div>
      </div>
    </div>
  );
}
