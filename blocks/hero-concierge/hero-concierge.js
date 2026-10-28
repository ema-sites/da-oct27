import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Optimizes a picture only when its image is same-origin and not an SVG;
 * otherwise the authored picture is kept as-is.
 * @param {HTMLPictureElement} picture
 */
function optimizePicture(picture) {
  const img = picture.querySelector('img');
  if (!img) return;
  const url = new URL(img.src, window.location.href);
  if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
  const optimized = createOptimizedPicture(img.src, img.alt, true, [
    { media: '(min-width: 900px)', width: '2000' },
    { width: '900' },
  ]);
  picture.replaceWith(optimized);
}

/**
 * Builds the prompt input. The placeholder comes from the paragraph authored
 * directly before the prompt list (if any).
 * @param {string} placeholder
 * @param {Element} block
 */
function buildPromptForm(placeholder, block) {
  const form = document.createElement('form');
  form.className = 'hero-concierge-form';
  form.setAttribute('role', 'search');

  const label = document.createElement('label');
  label.className = 'hero-concierge-form-label';
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'prompt';
  input.className = 'hero-concierge-input';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', placeholder);
  label.append(input);

  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'hero-concierge-submit';
  submit.setAttribute('aria-label', 'Submit');

  form.append(label, submit);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;
    block.dispatchEvent(new CustomEvent('hero-concierge:prompt', { bubbles: true, detail: { prompt } }));
  });
  return form;
}

export default function decorate(block) {
  const rows = [...block.children];

  // Background: the first row whose only content is a picture (optional).
  const bgRow = rows.find((row) => {
    const cell = row.firstElementChild;
    return cell && cell.querySelector('picture') && cell.textContent.trim() === '';
  });

  const background = document.createElement('div');
  background.className = 'hero-concierge-background';
  if (bgRow) {
    const picture = bgRow.querySelector('picture');
    background.append(picture);
    optimizePicture(picture);
    bgRow.remove();
  }

  // Content: every remaining cell, merged in authoring order.
  const content = document.createElement('div');
  content.className = 'hero-concierge-content';
  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      while (cell.firstChild) content.append(cell.firstChild);
    });
    row.remove();
  });

  const heading = content.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('hero-concierge-title');
    const before = heading.previousElementSibling;
    if (before && before.tagName === 'P') before.classList.add('hero-concierge-eyebrow');
    const after = heading.nextElementSibling;
    if (after && after.tagName === 'P') after.classList.add('hero-concierge-subtitle');
  }

  const list = content.querySelector(':scope > ul, :scope > ol');
  if (list) {
    list.classList.add('hero-concierge-prompts');
    [...list.querySelectorAll('a')].forEach((a) => a.classList.add('hero-concierge-chip'));

    // Placeholder paragraph: directly before the list, plain text, not the subtitle.
    const prev = list.previousElementSibling;
    let placeholder = 'What do you need help solving today?';
    if (prev && prev.tagName === 'P' && !prev.querySelector('a, picture')
      && !prev.classList.contains('hero-concierge-subtitle')
      && !prev.classList.contains('hero-concierge-eyebrow')) {
      placeholder = prev.textContent.trim() || placeholder;
      prev.remove();
    }

    const prompt = document.createElement('div');
    prompt.className = 'hero-concierge-prompt';
    list.before(prompt);
    prompt.append(buildPromptForm(placeholder, block), list);

    // Everything after the prompt area is legal/disclaimer text.
    let next = prompt.nextElementSibling;
    while (next) {
      if (next.tagName === 'P') next.classList.add('hero-concierge-legal');
      next = next.nextElementSibling;
    }
  }

  block.replaceChildren(background, content);
  if (!bgRow) block.classList.add('hero-concierge-no-image');
}
