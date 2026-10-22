const track = document.querySelector("#track");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

let index = 0;

function getVisibleCards() {
  return window.innerWidth <= 700 ? 1 : 2;
}

function updateCarousel() {
  const cards = track.querySelectorAll(".review-card");
  const visible = getVisibleCards();
  const maxIndex = Math.max(0, cards.length - visible);

  index = Math.min(Math.max(index, 0), maxIndex);

  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;

  track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;

  prev.disabled = index === 0;
  next.disabled = index === maxIndex;
}

next.addEventListener("click", () => {
  index++;
  updateCarousel();
});

prev.addEventListener("click", () => {
  index--;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);

updateCarousel();

const revealElements = document.querySelectorAll(
  ".hero-wrapper, .sell-wrapper, .about-wrapper, .fifth-wrapper, .testimonials, .footer-wrapper",
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  observer.observe(element);
});

// TESTIMONIALS CAROUSEL
const track = document.querySelector("#track");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

if (track && next && prev) {
  let index = 0;

  function updateCarousel() {
    const cards = track.querySelectorAll(".review-card");
    if (!cards.length) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const visibleCards = window.innerWidth <= 700 ? 1 : 2;
    const maxIndex = Math.max(0, cards.length - visibleCards);

    index = Math.max(0, Math.min(index, maxIndex));

    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
  }

  next.addEventListener("click", () => {
    const visibleCards = window.innerWidth <= 700 ? 1 : 2;
    const maxIndex = Math.max(
      0,
      track.querySelectorAll(".review-card").length - visibleCards,
    );

    index = index >= maxIndex ? 0 : index + 1;
    updateCarousel();
  });

  prev.addEventListener("click", () => {
    const visibleCards = window.innerWidth <= 700 ? 1 : 2;
    const maxIndex = Math.max(
      0,
      track.querySelectorAll(".review-card").length - visibleCards,
    );

    index = index <= 0 ? maxIndex : index - 1;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}
