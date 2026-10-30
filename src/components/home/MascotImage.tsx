"use client";
import { useEffect, useRef, useState } from "react";

const SRC = "/assets/brand/mascot.png";
const ASPECT = 627 / 679;

const VERT = `attribute vec2 a; varying vec2 v;
void main(){ v = vec2(a.x*.5+.5, .5-a.y*.5); gl_Position = vec4(a,0.,1.); }`;

// Smooth single-bone rigid rotation for the forearm and hand to prevent finger distortion
const FRAG = `precision highp float; varying vec2 v;
uniform sampler2D tex;
uniform float uT, uNear, uSpd, uHov, uBlink, uEarL, uEarR;
uniform vec2 uCur, uEye;
float G(vec2 p, vec2 c, vec2 r){ vec2 q=(p-c)/r; float s=dot(q,q); return exp(-s*s); }
vec2 R(vec2 p, vec2 c, float a){ vec2 q=p-c; float s=sin(a), k=cos(a); return vec2(k*q.x-s*q.y, s*q.x+k*q.y)-q; }
float K(vec2 p, vec2 c, float a, float b){ return smoothstep(a,b,length(p-c)); }

// real eyeball movement
vec4 eyeball(vec4 c, vec2 t0, vec2 e, vec2 ev){
  float m=1.-smoothstep(.84,1.,length((t0-e)/vec2(.050,.040)));
  vec2 t=t0-ev;
  float ir=1.-smoothstep(.88,1.,length((t-e)/vec2(.036,.032)));
  vec4 sc=vec4(vec3(.94,.94,.98)*mix(.78,1.,smoothstep(-.03,.03,t0.y-e.y)),1.);
  return mix(c,mix(sc,texture2D(tex,t),ir),m);
}

// eyelids sweep over the eye
vec4 lid(vec4 c, vec2 p, vec2 e){
  float m=1.-smoothstep(.8,1.,length((p-e)/vec2(.062,.066)));
  float yy=(p.y-(e.y-.066))/.132;
  float a=uBlink*.6, b=1.-uBlink*.5;
  float cov=max(1.-smoothstep(a-.05,a,yy), smoothstep(b,b+.05,yy))*m;
  vec4 f=.5*(texture2D(tex,p+vec2(.075,0.))+texture2D(tex,p-vec2(.075,0.)));
  c=mix(c,f,cov);
  c.rgb*=1.-.45*uBlink*G(p,e+vec2(0.,.012),vec2(.05,.009));
  return c;
}

void main(){
  vec2 p=v, d=vec2(0.);
  float live=1.+uNear*.8;
  
  // Head turns toward cursor
  float wh=(1.-smoothstep(.40,.50,p.y))*(1.-smoothstep(.68,.74,p.x)*smoothstep(.30,.38,p.y));
  d+=(R(p,vec2(.44,.47),-uCur.x*.05)+vec2(-uCur.x*.012,-uCur.y*.008))*wh;

  // Ears animation
  vec2 PL=vec2(.30,.21), PR=vec2(.60,.20);
  float eL=sin(uT*2.3)*.025+uEarL+uSpd*.05, eR=sin(uT*2.1+1.)*.025-uEarR-uSpd*.05;
  d+=R(p,PL,-eL)*G(p,vec2(.25,.11),vec2(.10,.14))*K(p,PL,.02,.18);
  d+=R(p,PR,-eR)*G(p,vec2(.65,.11),vec2(.10,.14))*K(p,PR,.02,.18);

  // Smile animation
  vec2 M=vec2(.43,.405);
  float wm=G(p,M,vec2(.08,.045));
  float am=.10+.16*(.5+.5*sin(uT*1.7))+.16*uNear;
  float op=.15+.30*(.5+.5*sin(uT*2.9));
  d+=vec2(-(p.x-M.x)*am*.9, abs(p.x-M.x)*am*.9-(p.y-M.y)*op)*wm;

  // --- RIGID FOREARM & PAW WAVING (30s Cycle) ---
  float ph = mod(uT, 30.0);
  
  // Wave activation duration
  float hi = max(
    smoothstep(0.0, 0.8, ph) * (1.0 - smoothstep(3.2, 4.0, ph)), 
    max(smoothstep(.10, .5, uNear) * .95, uHov)
  );

  // Single pivot anchored cleanly at the Elbow/Forearm base
  vec2 Elbow = vec2(.22, .63);
  
  // Upright waving arc combining lift and side-to-side oscillation as a single bone
  float waveMotion = (-.20 + sin(uT * 7.0) * .18) * hi;
  
  // Deformation mask covering the entire forearm and hand uniformly (no finger tearing)
  float handMask = G(p, vec2(.14, .52), vec2(.18, .18)) * K(p, Elbow, .02, .20);
  d += R(p, Elbow, waveMotion) * handMask;

  // Left hand subtle breathing motion
  vec2 E2=vec2(.69,.62);
  d+=R(p,E2,-sin(uT*2.+1.2)*.06)*G(p,vec2(.60,.69),vec2(.11,.09))*K(p,E2,.03,.12);

  // Legs weight shift
  float lg=sin(uT*2.4)*.06*live;
  vec2 HL=vec2(.33,.76), HR=vec2(.50,.77);
  d+=R(p,HL,-lg)*G(p,vec2(.30,.88),vec2(.12,.13))*K(p,HL,.04,.2);
  d+=R(p,HR,lg)*G(p,vec2(.53,.88),vec2(.11,.13))*K(p,HR,.04,.2);

  // Tail animation
  vec2 B=vec2(.70,.78);
  float td=length(p-B), k=smoothstep(.06,.5,td);
  float hd=1.-smoothstep(.9,1.1,length((p-vec2(.43,.30))/vec2(.30,.22)));
  float wt=G(p,vec2(.84,.60),vec2(.20,.32))*smoothstep(.60,.68,p.x)*(1.-hd);
  float sp=1.+uSpd*2.5;
  float sw=(sin(uT*2.1)*.09+sin(uT*3.7+1.)*.04)*sp;
  d+=R(p,B,-sw*k)*wt;
  d.x+=sin(uT*4.2-td*11.)*.012*k*wt*sp;
  d.y+=cos(uT*3.1-td*9.)*.008*k*wt*sp;

  vec2 t0=p+d, EL=vec2(.344,.289), ER=vec2(.534,.284), ev=uEye*vec2(.014,.010);
  vec4 c=texture2D(tex,t0);
  c=eyeball(c,t0,EL,ev);
  c=eyeball(c,t0,ER,ev);
  c=lid(c,p,EL);
  c=lid(c,p,ER);

  // Glowing ear rings and tail LEDs
  float gl=G(p,vec2(.247,.15),vec2(.05,.08))+G(p,vec2(.646,.155),vec2(.045,.07))+G(p,vec2(.75,.50),vec2(.08,.10))+G(p,vec2(.79,.625),vec2(.03,.05));
  c.rgb=min(c.rgb*(1.+gl*.45*(.5+.5*sin(uT*3.))),vec3(c.a));
  gl_FragColor=c;
}`;

export default function MascotImage() {
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
    const uBlink = u("uBlink"), uEarL = u("uEarL"), uEarR = u("uEarR"), uEye = u("uEye");
    const s = {
      tx: 0, ty: 0, x: 0, y: 0,
      nearT: 0, near: 0, hovT: 0, hov: 0,
      spdT: 0, spd: 0, eTx: 0, eTy: 0,
      ex: 0, ey: 0, blink: 0, earL: 0, earR: 0
    };
    let nextBlink = 1.5, blinkT = -1, dbl = false;
    const ears = [{ next: 1.8, t: -1 }, { next: 3.4, t: -1 }];
    let raf = 0, ready = false, alive = true;

    const draw = (t: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, t); gl.uniform1f(uNear, s.near); gl.uniform1f(uSpd, s.spd);
      gl.uniform1f(uHov, s.hov); gl.uniform2f(uCur, s.x, s.y);
      gl.uniform1f(uBlink, s.blink); gl.uniform1f(uEarL, s.earL); gl.uniform1f(uEarR, s.earR); gl.uniform2f(uEye, s.ex, s.ey);
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
      let vx = (e.clientX - (r.left + r.width * 0.44)) / (innerWidth * 0.4);
      let vy = (e.clientY - (r.top + r.height * 0.29)) / (innerHeight * 0.4);
      const len = Math.hypot(vx, vy);
      if (len > 1) { vx /= len; vy /= len; }
      s.eTx = vx; s.eTy = vy;
    };
    const loop = (ms: number) => {
      s.x += (s.tx - s.x) * 0.07; s.y += (s.ty - s.y) * 0.07;
      s.near += (s.nearT - s.near) * 0.08; s.hov += (s.hovT - s.hov) * 0.1;
      s.spd += (s.spdT - s.spd) * 0.1; s.spdT *= 0.92;
      s.ex += (s.eTx - s.ex) * 0.22; s.ey += (s.eTy - s.ey) * 0.22;
      const t = ms / 1000;
      if (blinkT < 0 && t > nextBlink) { blinkT = t; nextBlink = t + 2 + Math.random() * 3; dbl = Math.random() < 0.25; }
      if (blinkT >= 0) {
        const k = (t - blinkT) / 0.17;
        if (k >= 1) { s.blink = 0; if (dbl) { blinkT = t; dbl = false; } else { blinkT = -1; } }
        else { s.blink = Math.sin(k * Math.PI); }
      }
      ears.forEach((e, i) => {
        if (e.t < 0 && t > e.next) { e.t = t; e.next = t + 2.5 + Math.random() * 3.5; }
        let val = 0;
        if (e.t >= 0) { const k = (t - e.t) / 0.5; if (k >= 1) { e.t = -1; } else { val = Math.sin(k * Math.PI * 3) * (1 - k) * 0.16; } }
        if (i) { s.earR = val; } else { s.earL = val; }
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