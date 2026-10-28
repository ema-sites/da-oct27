import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Marks the eyebrow (paragraph before the title) and the CTA (last paragraph
 * that holds only a link) inside a card body.
 * @param {Element} body
 */
function decorateBody(body) {
  const heading = body.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('cards-masonry-card-title');
    const prev = heading.previousElementSibling;
    if (prev && prev.tagName === 'P' && !prev.querySelector('a')) {
      prev.classList.add('cards-masonry-card-eyebrow');
    }
  }
  const paragraphs = [...body.querySelectorAll(':scope > p')];
  const last = paragraphs[paragraphs.length - 1];
  const link = last?.querySelector('a');
  if (link && last.textContent.trim() === link.textContent.trim()) {
    last.classList.add('cards-masonry-card-cta');
  }
}

/**
 * Masonry layout: cards fill rows of three; a trailing row of two or one
 * stretches to the full width (e.g. 5 cards render as 3 + 2).
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-masonry-card';
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.querySelector('picture') && div.textContent.trim() === '') {
        div.className = 'cards-masonry-card-image';
      } else if (div.textContent.trim() === '') {
        div.remove();
      } else {
        div.className = 'cards-masonry-card-body';
        decorateBody(div);
      }
    });
    // body first, image after (rendered in the card's lower corner)
    const image = li.querySelector('.cards-masonry-card-image');
    if (image) {
      li.append(image);
      li.classList.add('cards-masonry-card-has-image');
    }
    if (li.children.length) ul.append(li);
  });

  const cards = [...ul.children];
  const remainder = cards.length % 3;
  if (remainder) {
    cards.slice(cards.length - remainder).forEach((li) => {
      li.classList.add(remainder === 2 ? 'cards-masonry-card-half' : 'cards-masonry-card-full');
    });
  }

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
