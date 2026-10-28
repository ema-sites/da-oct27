/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-concierge (div.brand-concierge.marquee).
 * Rows: [background image] / [eyebrow, H1 title, subtitle, prompt chip list, legal text]
 */
export default function parse(element, { document }) {
  const cells = [];

  // Row 1: background image (prefer the desktop-only rendition)
  const bgPicture = element.querySelector('.background .desktop-only picture')
    || element.querySelector('.background .tablet-only picture')
    || element.querySelector('.background picture');
  if (bgPicture) {
    cells.push([bgPicture]);
  }

  // Row 2: content
  const content = [];

  const eyebrowSrc = element.querySelector('.bc-header-eyebrow');
  if (eyebrowSrc && eyebrowSrc.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = eyebrowSrc.textContent.trim();
    content.push(p);
  }

  const titleSrc = element.querySelector('.bc-header-title, .bc-header h1, .bc-header h2');
  if (titleSrc && titleSrc.textContent.trim()) {
    const h1 = document.createElement('h1');
    h1.innerHTML = titleSrc.innerHTML;
    content.push(h1);
  }

  const subtitleSrc = element.querySelector('.bc-header-subtitle');
  if (subtitleSrc && subtitleSrc.textContent.trim()) {
    const p = document.createElement('p');
    p.innerHTML = subtitleSrc.innerHTML;
    content.push(p);
  }

  const chipTexts = [...element.querySelectorAll('.bc-prompt-cards .prompt-card-text')]
    .map((t) => t.textContent.trim())
    .filter(Boolean);
  if (chipTexts.length) {
    const ul = document.createElement('ul');
    chipTexts.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.append(li);
    });
    content.push(ul);
  }

  element.querySelectorAll('.bc-legal p').forEach((p) => {
    if (p.textContent.trim()) content.push(p);
  });

  cells.push([content]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-concierge', cells });
  element.replaceWith(block);
}
