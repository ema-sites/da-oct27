/* eslint-disable */
/* global WebImporter */

/**
 * Sections transformer for business.adobe.com.
 * Uses payload.template.sections (page-templates.json). The outer
 * main > div.section elements are the section boundaries; inner div.section
 * elements nested inside div.fragment wrappers are not treated as sections.
 */

const MARKER = 'data-excat-section-id';

function findSection(root, section) {
  const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
  for (const sel of selectors) {
    if (!sel) continue;
    try {
      const el = root.querySelector(sel);
      if (el) return el;
    } catch (e) {
      // invalid selector in this environment, try next
    }
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const template = payload && payload.template;
  const sections = (template && template.sections) || [];
  if (sections.length < 2) return;
  const doc = element.ownerDocument || document;

  if (hookName === 'beforeTransform') {
    // Resolve all elements first so inserted <hr> do not affect nth-of-type fallbacks
    const resolved = sections.map((s) => findSection(element, s));
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const el = resolved[i];
      if (!el || !el.parentNode) continue;
      const section = sections[i];
      if (i === 0) {
        // First section never gets a real break; add a temporary marker only if styled
        if (section.style) {
          const hr = doc.createElement('hr');
          hr.setAttribute(MARKER, section.id);
          el.parentNode.insertBefore(hr, el);
        }
        continue;
      }
      const hr = doc.createElement('hr');
      hr.setAttribute(MARKER, section.id);
      el.parentNode.insertBefore(hr, el);
    }
  }

  if (hookName === 'afterTransform') {
    const markers = sections.map((s) => element.querySelector(`hr[${MARKER}="${s.id}"]`));

    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const marker = markers[i];
      if (!section.style || !marker || !marker.parentNode) continue;

      const metadata = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });

      // Place metadata at the end of the section: before the next section's break,
      // or at the end of the container for the last section.
      let next = null;
      for (let j = i + 1; j < markers.length; j += 1) {
        if (markers[j] && markers[j].parentNode === marker.parentNode) {
          next = markers[j];
          break;
        }
      }
      if (next) {
        next.parentNode.insertBefore(metadata, next);
      } else {
        marker.parentNode.appendChild(metadata);
      }
    }

    // Clean up markers; drop the first section's temporary <hr>
    markers.forEach((hr, i) => {
      if (!hr || !hr.parentNode) return;
      if (i === 0) {
        hr.remove();
      } else {
        hr.removeAttribute(MARKER);
      }
    });
  }
}
