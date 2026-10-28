/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-masonry (div.section.static-links.masonry-layout).
 * One row per brick (5 cards: 3 x span-4, 2 x span-6):
 * body (eyebrow, H3 title, description, CTA) | corner image (optional, desktop rendition)
 */
export default function parse(element, { document }) {
  const cells = [];

  element.querySelectorAll(':scope > div.brick').forEach((brick) => {
    const bodyCell = [];
    const text = brick.querySelector('.foreground .brick-text') || brick.querySelector('.foreground');
    if (text) {
      [...text.children].forEach((el) => {
        if (el.textContent.trim() || el.querySelector('img, picture')) bodyCell.push(el);
      });
    }

    const imageCell = [];
    const picture = brick.querySelector('.background .desktop-only picture')
      || brick.querySelector('.background .tablet-only picture')
      || brick.querySelector('.background picture');
    if (picture) imageCell.push(picture);

    if (bodyCell.length || imageCell.length) cells.push([bodyCell, imageCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-masonry', cells });
  element.replaceWith(block);
}
