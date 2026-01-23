gsap.registerPlugin(MotionPathPlugin);

const count = 150;
const container = document.getElementById("sparkles");
const sparkles = [];

for (let i = 0; i < count; i++) {
  const p = document.createElement("div");
  p.className = "sparkle";
  container.prepend(p);

  p.ox = Math.random() * window.innerWidth;
  p.oy = Math.random() * window.innerHeight;

  gsap.set(p, {
    left: p.ox,
    top: p.oy,
    x: 0,
    y: 0,
    height: gsap.utils.random(1, 4),
    width: gsap.utils.random(1, 4),
    opacity: Math.random(),
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "50%",
  });

  sparkles.push(p);
  animate(p);
}

function animate(el) {
  var x = gsap.getProperty(el, "x");
  var y = gsap.getProperty(el, "y");
  var pos1 = [
    x + gsap.utils.random(-200, 200),
    y + gsap.utils.random(-200, 200),
  ];
  var pos2 = [
    x + gsap.utils.random(-200, 200),
    y + gsap.utils.random(-200, 200),
  ];

  el.swimming = gsap.to(el, {
    motionPath: {
      path: [
        { x: pos1[0], y: pos1[1] },
        { x: pos2[0], y: pos2[1] },
      ],
      curviness: 1.5,
      autoRotate: false,
    },
    duration: gsap.utils.random(6, 12),
    ease: "sine.inOut",
    onComplete: () => animate(el),
  });
}


const cards = document.querySelectorAll(".menu a");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    sparkles.forEach((p) => {
      if (p.swimming) p.swimming.kill();
      gsap.killTweensOf(p);

      const tx = cx - p.ox;
      const ty = cy - p.oy;

      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 100;
      const ox = Math.cos(angle) * radius;
      const oy = Math.sin(angle) * radius;

      gsap.to(p, {
        x: tx + ox,
        y: ty + oy,
        opacity: 0,
        duration: gsap.utils.random(0.5, 0.7),
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });

  card.addEventListener("mouseleave", () => {
    sparkles.forEach((p) => {
      gsap.killTweensOf(p);

      const x = gsap.utils.random(0, window.innerWidth);
      const y = gsap.utils.random(0, window.innerHeight);

      const targetX = x - p.ox;
      const targetY = y - p.oy;

      gsap.to(p, {
        x: targetX,
        y: targetY,
        opacity: 1,
        duration: gsap.utils.random(0.6, 1.5),
        ease: "power2.out",
        onComplete: () => {
          animate(p);
        },
      });
    });
  });
});