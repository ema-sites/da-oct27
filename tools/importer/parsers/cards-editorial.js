/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-editorial (div.section.three-up).
 * One row per card: image | eyebrow, H3 title, description, CTA link
 */
export default function parse(element, { document }) {
  const cells = [];

  element.querySelectorAll('.editorial-card').forEach((card) => {
    const imageCell = [];
    const picture = card.querySelector('.media-area picture');
    if (picture) imageCell.push(picture);

    const bodyCell = [];
    const textWrap = card.querySelector('.foreground > .body-m') || card.querySelector('.foreground');
    if (textWrap) {
      [...textWrap.children].forEach((el) => {
        if (el.textContent.trim() || el.querySelector('img, picture')) bodyCell.push(el);
      });
    }

    card.querySelectorAll('.card-footer .action-area a').forEach((a) => {
      const p = document.createElement('p');
      p.append(a);
      bodyCell.push(p);
    });

    if (imageCell.length || bodyCell.length) cells.push([imageCell, bodyCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-editorial', cells });
  element.replaceWith(block);
}
