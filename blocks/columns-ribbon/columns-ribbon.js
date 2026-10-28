/**
 * Ribbon: one slim row of logo | promo text | CTA.
 * Cells are classified by content so authors can omit or reorder them.
 */
export default function decorate(block) {
  const firstRow = block.firstElementChild;
  if (!firstRow) return;
  block.classList.add(`columns-ribbon-${firstRow.children.length}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-ribbon-row');
    [...row.children].forEach((cell) => {
      const text = cell.textContent.trim();
      const links = [...cell.querySelectorAll('a')];
      const linkText = links.map((a) => a.textContent.trim()).join('');
      if (cell.querySelector('picture, img, .icon') && text === '') {
        cell.classList.add('columns-ribbon-logo');
      } else if (links.length && text.replace(/\s+/g, '') === linkText.replace(/\s+/g, '')) {
        // the cell holds only link(s): the call to action
        cell.classList.add('columns-ribbon-cta');
      } else if (text === '' && !cell.children.length) {
        cell.classList.add('columns-ribbon-empty');
      } else {
        cell.classList.add('columns-ribbon-text');
      }
    });
  });
}
