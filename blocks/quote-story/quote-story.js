/**
 * Customer story quote. Row 1: optional logo image and heading, then the
 * quotation. Row 2: attribution and an optional "Read the story" link.
 * Content is classified by element type, so authors may merge or split rows.
 */
export default function decorate(block) {
  const cells = [...block.children].map((row) => row.firstElementChild).filter(Boolean);
  const [first, ...rest] = cells;

  const logo = document.createElement('div');
  logo.className = 'quote-story-logo';
  const header = document.createElement('div');
  header.className = 'quote-story-heading';
  const quotation = document.createElement('div');
  quotation.className = 'quote-story-quotation';
  const attribution = document.createElement('div');
  attribution.className = 'quote-story-attribution';
  const cta = document.createElement('div');
  cta.className = 'quote-story-cta';

  const isLinkOnly = (el) => {
    const link = el.querySelector('a');
    return el.tagName === 'P' && link && el.textContent.trim() === link.textContent.trim()
      && !el.querySelector('picture');
  };

  if (first) {
    [...first.children].forEach((el) => {
      if (el.querySelector('picture') && el.textContent.trim() === '') logo.append(el);
      else if (el.tagName === 'PICTURE') logo.append(el);
      else if (/^H[1-6]$/.test(el.tagName) && !quotation.children.length) header.append(el);
      else quotation.append(el);
    });
    // a quotation authored as bare text (no paragraph)
    if (!quotation.children.length && first.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = first.textContent.trim();
      quotation.append(p);
    }
  }

  rest.forEach((cell) => {
    [...cell.children].forEach((el) => {
      if (isLinkOnly(el)) cta.append(el);
      else attribution.append(el);
    });
  });

  attribution.querySelectorAll('em').forEach((em) => {
    const cite = document.createElement('cite');
    cite.innerHTML = em.innerHTML;
    em.replaceWith(cite);
  });

  const figure = document.createElement('figure');
  figure.className = 'quote-story-figure';
  const blockquote = document.createElement('blockquote');
  blockquote.append(quotation);
  if (logo.children.length) figure.append(logo);
  if (header.children.length) figure.append(header);
  figure.append(blockquote);
  if (attribution.children.length) {
    const caption = document.createElement('figcaption');
    caption.append(attribution);
    figure.append(caption);
  }
  if (cta.children.length) figure.append(cta);

  block.replaceChildren(figure);
}
