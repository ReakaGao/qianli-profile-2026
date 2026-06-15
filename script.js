const body = document.body;
const menuButton = document.querySelector(".menu-button");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const cursor = document.querySelector(".cursor");
const storyCards = [...document.querySelectorAll(".story-card")];
const filmModal = document.querySelector(".film-modal");
const modalFrame = filmModal.querySelector("iframe");

menuButton.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuButton.querySelector("span").textContent = isOpen ? "CLOSE" : "MENU";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    menuButton.querySelector("span").textContent = "MENU";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "打开菜单");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  revealObserver.observe(element);
});

function openProject(card) {
  filmModal.querySelector(".modal-type").textContent = card.dataset.type;
  filmModal.querySelector(".modal-title").textContent = card.dataset.title;
  filmModal.querySelector(".modal-description").textContent = card.dataset.description;
  modalFrame.src = card.dataset.video;
  filmModal.showModal();
  body.classList.add("modal-open");
}

storyCards.forEach((card) => {
  card.querySelector("button").addEventListener("click", () => openProject(card));
});

function closeModal() {
  filmModal.close();
  modalFrame.src = "";
  body.classList.remove("modal-open");
}

filmModal.querySelector(".modal-close").addEventListener("click", closeModal);

filmModal.addEventListener("click", (event) => {
  if (event.target === filmModal) closeModal();
});

filmModal.addEventListener("close", () => {
  modalFrame.src = "";
  body.classList.remove("modal-open");
});

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll("[data-cursor]").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.querySelector("span").textContent = element.dataset.cursor;
      cursor.classList.add("visible");
    });
    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("visible");
    });
  });

  const collageImages = document.querySelectorAll(".hero-image");
  window.addEventListener(
    "pointermove",
    (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      collageImages.forEach((image, index) => {
        const intensity = index === 0 ? 10 : -7;
        image.style.translate = `${x * intensity}px ${y * intensity}px`;
      });
    },
    { passive: true }
  );
}
