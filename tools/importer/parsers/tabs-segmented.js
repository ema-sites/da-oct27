/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-segmented (div.tabs.segmented-control).
 * One row per tab: tab label | panel content
 * (H3, paragraph, image, H3 "Explore products.", list of icon + product links)
 */
export default function parse(element, { document }) {
  const cells = [];

  const buttons = [...element.querySelectorAll('.tab-list-container button[id^="tab-"]')];

  buttons.forEach((button, i) => {
    const label = button.textContent.trim();
    const suffix = button.id.replace(/^tab-/, '');
    const panel = element.querySelector(`.tabpanel[id="tab-panel-${suffix}"]`)
      || element.querySelectorAll('.tabpanel')[i];

    const content = [];
    if (panel) {
      panel.querySelectorAll('.brick').forEach((brick) => {
        const text = brick.querySelector('.brick-text');
        if (text) {
          [...text.children].forEach((el) => {
            if (el.tagName === 'UL' || el.tagName === 'OL') {
              // flatten list-text wrappers so each item is icon + link (+ label)
              el.querySelectorAll('span.list-text').forEach((span) => {
                while (span.firstChild) span.parentNode.insertBefore(span.firstChild, span);
                span.remove();
              });
            }
            if (el.textContent.trim() || el.querySelector('img, picture')) content.push(el);
          });
        }
        brick.querySelectorAll('.brick-media picture').forEach((picture) => {
          const p = document.createElement('p');
          p.append(picture);
          content.push(p);
        });
      });
    }

    cells.push([label, content]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-segmented', cells });
  element.replaceWith(block);
}
