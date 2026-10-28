import { toClassName } from '../../scripts/aem.js';

let instance = 0;

/**
 * Splits a panel into a media card (heading, text, image) and a product list
 * group (the heading directly before the list, plus the list). Panels without a
 * list keep all content in the media card.
 * @param {Element} panel
 */
function decoratePanel(panel) {
  const content = document.createElement('div');
  content.className = 'tabs-segmented-panel-content';
  [...panel.children].forEach((cell) => {
    while (cell.firstChild) content.append(cell.firstChild);
    cell.remove();
  });

  const list = [...content.children].reverse().find((el) => el.tagName === 'UL' || el.tagName === 'OL');
  const card = document.createElement('div');
  card.className = 'tabs-segmented-card';

  let products;
  if (list) {
    products = document.createElement('div');
    products.className = 'tabs-segmented-products';
    list.classList.add('tabs-segmented-products-list');
    const prev = list.previousElementSibling;
    const productsHeading = prev && /^H[1-6]$/.test(prev.tagName) ? prev : null;
    if (productsHeading) products.append(productsHeading);
    products.append(list);
  }

  // what remains is the media card; image-only paragraphs become the media side
  const text = document.createElement('div');
  text.className = 'tabs-segmented-card-text';
  const media = document.createElement('div');
  media.className = 'tabs-segmented-card-media';
  [...content.childNodes].forEach((node) => {
    const isImage = node.nodeType === Node.ELEMENT_NODE
      && node.querySelector?.('picture')
      && node.textContent.trim() === '';
    if (isImage || node.tagName === 'PICTURE') media.append(node);
    else text.append(node);
  });
  card.append(text);
  if (media.children.length) {
    card.append(media);
    card.classList.add('tabs-segmented-card-has-media');
  }

  panel.append(card);
  if (products) panel.append(products);
}

export default async function decorate(block) {
  instance += 1;
  const tablist = document.createElement('div');
  tablist.className = 'tabs-segmented-list';
  tablist.setAttribute('role', 'tablist');

  const rows = [...block.children].filter((row) => row.firstElementChild);
  const used = new Set();
  const buttons = [];

  rows.forEach((row, i) => {
    const label = row.firstElementChild;
    let id = `${toClassName(label.textContent) || 'tab'}-${instance}`;
    while (used.has(id)) id = `${id}-${i}`;
    used.add(id);

    const tabpanel = row;
    tabpanel.className = 'tabs-segmented-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', i !== 0);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    const button = document.createElement('button');
    button.className = 'tabs-segmented-tab';
    button.id = `tab-${id}`;
    button.innerHTML = label.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', i === 0);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.tabIndex = i === 0 ? 0 : -1;
    label.remove();
    decoratePanel(tabpanel);

    tablist.append(button);
    buttons.push(button);
  });

  const select = (index, focus = false) => {
    buttons.forEach((btn, j) => {
      const active = j === index;
      btn.setAttribute('aria-selected', active);
      btn.tabIndex = active ? 0 : -1;
      rows[j].setAttribute('aria-hidden', !active);
    });
    if (focus) buttons[index].focus();
  };

  buttons.forEach((button, i) => {
    button.addEventListener('click', () => select(i));
    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') select((i + 1) % buttons.length, true);
      else if (e.key === 'ArrowLeft') select((i - 1 + buttons.length) % buttons.length, true);
      else if (e.key === 'Home') select(0, true);
      else if (e.key === 'End') select(buttons.length - 1, true);
      else return;
      e.preventDefault();
    });
  });

  block.prepend(tablist);
}
