/* eslint-disable */
/* global WebImporter */

/**
 * Parser for quote-story (div.aside.no-media).
 * Row 1: logo image, heading, quotation paragraph(s)
 * Row 2: attribution, "Read the story" link
 */
export default function parse(element, { document }) {
  const quoteCell = [];
  const attributionCell = [];

  const text = element.querySelector('.foreground .text') || element.querySelector('.foreground') || element;

  const isAttribution = (el) => {
    const strong = el.querySelector('strong, b');
    return strong && el.textContent.trim() === strong.textContent.trim();
  };

  [...text.children].forEach((el) => {
    const hasMedia = el.querySelector('picture, img') || el.tagName === 'PICTURE';
    if (!el.textContent.trim() && !hasMedia) return;

    if (el.classList.contains('icon-area') || (hasMedia && !el.textContent.trim())) {
      quoteCell.push(el);
    } else if (el.classList.contains('action-area')) {
      el.querySelectorAll('a').forEach((a) => {
        const p = document.createElement('p');
        p.append(a);
        attributionCell.push(p);
      });
    } else if (attributionCell.length || (el.tagName === 'P' && isAttribution(el))) {
      attributionCell.push(el);
    } else {
      quoteCell.push(el);
    }
  });

  const cells = [[quoteCell]];
  if (attributionCell.length) cells.push([attributionCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'quote-story', cells });
  element.replaceWith(block);
}
