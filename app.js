
document.addEventListener("DOMContentLoaded", () => {
  /* ================= TESTIMONIALS CAROUSEL ================= */

  const track = document.querySelector("#track");
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  const carousel = document.querySelector(".carousel");

  if (!track || !next || !prev || !carousel) {
    return;
  }

  const cards = Array.from(track.querySelectorAll(".review-card"));

  if (cards.length === 0) {
    return;
  }

  let index = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 700) {
      return 1;
    }

    return 2;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCards());
  }

  function updateCarousel() {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width;

    index = Math.min(index, getMaxIndex());
    index = Math.max(index, 0);

    track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;

    prev.disabled = index === 0;
    next.disabled = index === getMaxIndex();

    prev.style.opacity = prev.disabled ? "0.5" : "1";
    next.style.opacity = next.disabled ? "0.5" : "1";

    prev.style.cursor = prev.disabled ? "not-allowed" : "pointer";
    next.style.cursor = next.disabled ? "not-allowed" : "pointer";
  }

  next.addEventListener("click", () => {
    if (index < getMaxIndex()) {
      index++;
      updateCarousel();
    }
  });

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
});
