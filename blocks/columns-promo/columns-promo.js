/**
 * Promo: heading + CTA beside an image. Image cells are detected by content,
 * so the image may be authored in either column.
 */
export default function decorate(block) {
  const firstRow = block.firstElementChild;
  if (!firstRow) return;
  block.classList.add(`columns-promo-${firstRow.children.length}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-promo-row');
    [...row.children].forEach((cell) => {
      const pic = cell.querySelector('picture');
      if (pic && cell.textContent.trim() === '') {
        cell.classList.add('columns-promo-img-col');
      } else {
        cell.classList.add('columns-promo-text-col');
      }
    });
  });
}
