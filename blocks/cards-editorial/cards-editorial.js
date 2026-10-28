import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Marks the eyebrow (paragraph before the title) and the CTA (last paragraph
 * that holds only a link) inside a card body.
 * @param {Element} body
 */
function decorateBody(body) {
  const heading = body.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('cards-editorial-card-title');
    const prev = heading.previousElementSibling;
    if (prev && prev.tagName === 'P' && !prev.querySelector('a')) {
      prev.classList.add('cards-editorial-card-eyebrow');
    }
  }
  const paragraphs = [...body.querySelectorAll(':scope > p')];
  const last = paragraphs[paragraphs.length - 1];
  const link = last?.querySelector('a');
  if (link && last.textContent.trim() === link.textContent.trim()) {
    last.classList.add('cards-editorial-card-cta');
  }
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-editorial-card';
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture') && div.textContent.trim() === '') {
        div.className = 'cards-editorial-card-image';
      } else if (div.textContent.trim() === '' && !div.querySelector('picture')) {
        div.remove();
      } else {
        div.className = 'cards-editorial-card-body';
        decorateBody(div);
      }
    });
    // keep the image first regardless of authored cell order
    const image = li.querySelector('.cards-editorial-card-image');
    if (image) li.prepend(image);
    if (li.children.length) ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
  block.replaceChildren(ul);
}
