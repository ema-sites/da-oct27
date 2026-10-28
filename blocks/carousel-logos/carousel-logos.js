/**
 * Logo scroller: several linked logos visible at once, prev/next buttons
 * scroll by one logo. Logos keep their authored pictures (often SVG or external).
 */
function updateButtons(block) {
  const track = block.querySelector('.carousel-logos-slides');
  const prev = block.querySelector('.carousel-logos-prev');
  const next = block.querySelector('.carousel-logos-next');
  if (!track || !prev || !next) return;
  const max = track.scrollWidth - track.clientWidth;
  prev.disabled = track.scrollLeft <= 1;
  next.disabled = track.scrollLeft >= max - 1;
  block.classList.toggle('carousel-logos-static', max <= 1);
}

function scrollByStep(block, direction) {
  const track = block.querySelector('.carousel-logos-slides');
  const slide = track.querySelector('.carousel-logos-slide');
  if (!slide) return;
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  track.scrollBy({ left: direction * (slide.offsetWidth + gap), behavior: 'smooth' });
}

export default function decorate(block) {
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'Carousel');
  if (!block.hasAttribute('aria-label')) block.setAttribute('aria-label', 'Customer logos');

  const track = document.createElement('ul');
  track.className = 'carousel-logos-slides';

  [...block.children].forEach((row) => {
    const slide = document.createElement('li');
    slide.className = 'carousel-logos-slide';
    [...row.children].forEach((cell) => {
      if (cell.textContent.trim() === '' && !cell.querySelector('picture, img')) return;
      cell.classList.add(cell.querySelector('picture, img') ? 'carousel-logos-slide-image' : 'carousel-logos-slide-content');
      slide.append(cell);
    });
    row.remove();
    if (slide.children.length) track.append(slide);
  });

  const container = document.createElement('div');
  container.className = 'carousel-logos-slides-container';
  container.append(track);

  if (track.children.length > 1) {
    const nav = document.createElement('div');
    nav.className = 'carousel-logos-navigation';
    nav.innerHTML = `
      <button type="button" class="carousel-logos-prev" aria-label="Previous logos"></button>
      <button type="button" class="carousel-logos-next" aria-label="Next logos"></button>
    `;
    container.append(nav);
    nav.querySelector('.carousel-logos-prev').addEventListener('click', () => scrollByStep(block, -1));
    nav.querySelector('.carousel-logos-next').addEventListener('click', () => scrollByStep(block, 1));
    track.addEventListener('scroll', () => updateButtons(block), { passive: true });
    if (window.ResizeObserver) new ResizeObserver(() => updateButtons(block)).observe(track);
  }

  block.replaceChildren(container);
  updateButtons(block);
}
