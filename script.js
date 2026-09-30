const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

// Loader
window.addEventListener("load",()=>setTimeout(()=>$("#loader").classList.add("hide"),1700));

// Typing animation
const words=["B.Tech Student","Web Developer","AI Enthusiast","Future Builder"];
let wi=0,ci=0,deleting=false;
function type(){const el=$("#typing"),w=words[wi];el.textContent=w.slice(0,ci);
  if(!deleting){ci++;if(ci>w.length){deleting=true;setTimeout(type,1200);return}}
  else{ci--;if(ci<0){deleting=false;wi=(wi+1)%words.length;ci=0}}
  setTimeout(type,deleting?45:85)} type();

// Mobile nav
$(".menu-btn").addEventListener("click",()=>$(".nav").classList.toggle("open"));
$$(".nav nav a").forEach(a=>a.addEventListener("click",()=>$(".nav").classList.remove("open")));

// Scroll reveal
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(x=>observer.observe(x));

// Cursor glow
const glow=$(".cursor-glow"),dot=$(".cursor-dot");
document.addEventListener("mousemove",e=>{
  glow.style.transform=`translate(${e.clientX-160}px,${e.clientY-160}px)`;
  dot.style.transform=`translate(${e.clientX-3}px,${e.clientY-3}px)`;
});
const style=document.createElement("style");style.textContent=".cursor-glow{position:fixed;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.07),transparent 65%);pointer-events:none;z-index:1;transition:transform .08s}.cursor-dot{position:fixed;width:6px;height:6px;border-radius:50%;background:#fff;pointer-events:none;z-index:50;mix-blend-mode:difference}@media(max-width:700px){.cursor-glow,.cursor-dot{display:none}}";document.head.appendChild(style);

// Particle field
const canvas=$("#particles"),ctx=canvas.getContext("2d");let pts=[],W,H;
function resize(){W=canvas.width=innerWidth*devicePixelRatio;H=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);W=innerWidth;H=innerHeight}
function init(){pts=Array.from({length:Math.min(110,Math.floor(innerWidth/10))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.5+.2}))}
function anim(){ctx.clearRect(0,0,W,H);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(255,255,255,.45)";ctx.fill()}
for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){let a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<115){ctx.strokeStyle=`rgba(255,255,255,${(1-d/115)*.09})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(anim)}
addEventListener("resize",()=>{resize();init()});resize();init();anim();

// 3D tilt
$$(".tilt").forEach(card=>card.addEventListener("mousemove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateY(-5px)`}));
$$(".tilt").forEach(card=>card.addEventListener("mouseleave",()=>card.style.transform=""));

// Magnetic buttons
$$(".magnetic").forEach(el=>el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`}));
$$(".magnetic").forEach(el=>el.addEventListener("mouseleave",()=>el.style.transform=""));

// QR popup — QR opens current website URL
const modal=$("#qrModal");
$("#qrBtn").addEventListener("click",()=>{
  $("#qrcode").innerHTML="";
  new QRCode($("#qrcode"),{text:location.href,width:180,height:180,colorDark:"#111",colorLight:"#fff"});
  modal.classList.add("open");document.body.style.overflow="hidden";
});
function closeQR(){modal.classList.remove("open");document.body.style.overflow=""}
$("#closeQr").addEventListener("click",closeQR);$(".qr-backdrop").addEventListener("click",closeQR);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeQR()});
