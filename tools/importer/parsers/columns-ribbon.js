/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-ribbon (div.notification.ribbon).
 * One row: logo image | promo text | CTA link
 */
export default function parse(element, { document }) {
  const logoCell = [];
  const textCell = [];
  const ctaCell = [];

  const logo = element.querySelector('.icon-area picture, .icon-area img');
  if (logo) logoCell.push(logo);

  element.querySelectorAll('.copy-wrap > *').forEach((el) => {
    if (el.textContent.trim()) textCell.push(el);
  });

  element.querySelectorAll('.action-area a').forEach((a) => {
    const p = document.createElement('p');
    p.append(a);
    ctaCell.push(p);
  });

  const cells = [[logoCell, textCell, ctaCell]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-ribbon', cells });
  element.replaceWith(block);
}
