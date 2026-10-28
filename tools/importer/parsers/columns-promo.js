/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-promo (div.aside.dark).
 * One row: heading + CTA link | image
 */
export default function parse(element, { document }) {
  const textCell = [];
  const imageCell = [];

  const text = element.querySelector('.foreground .text');
  if (text) {
    [...text.children].forEach((el) => {
      if (el.classList.contains('action-area')) {
        el.querySelectorAll('a').forEach((a) => {
          const p = document.createElement('p');
          p.append(a);
          textCell.push(p);
        });
      } else if (el.textContent.trim() || el.querySelector('img, picture')) {
        textCell.push(el);
      }
    });
  }

  const picture = element.querySelector('.foreground .image picture')
    || element.querySelector('.foreground .image img');
  if (picture) imageCell.push(picture);

  const cells = [[textCell, imageCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
