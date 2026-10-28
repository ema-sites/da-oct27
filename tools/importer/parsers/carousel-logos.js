/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-logos (div.action-scroller).
 * One row per logo: linked logo image | optional text (empty)
 * Source item: div.action-item > div > div > a.main-image[href] > picture > img
 */
export default function parse(element, { document }) {
  const cells = [];

  element.querySelectorAll('.action-item').forEach((item) => {
    const img = item.querySelector('picture img, img');
    if (!img) return;
    const picture = img.closest('picture') || img;
    const link = item.querySelector('a.main-image[href], a[href]');

    let imageContent = picture;
    if (link) {
      const a = document.createElement('a');
      a.href = link.getAttribute('href');
      const title = link.getAttribute('title') || img.getAttribute('alt');
      if (title) a.title = title;
      a.append(picture);
      imageContent = a;
    }

    cells.push([imageContent, '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-logos', cells });
  element.replaceWith(block);
}
