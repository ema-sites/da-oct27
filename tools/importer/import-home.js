/* eslint-disable */
/* global WebImporter */

import heroConciergeParser from './parsers/hero-concierge.js';
import columnsRibbonParser from './parsers/columns-ribbon.js';
import cardsEditorialParser from './parsers/cards-editorial.js';
import cardsMasonryParser from './parsers/cards-masonry.js';
import tabsSegmentedParser from './parsers/tabs-segmented.js';
import carouselLogosParser from './parsers/carousel-logos.js';
import quoteStoryParser from './parsers/quote-story.js';
import columnsPromoParser from './parsers/columns-promo.js';

import adobeBusinessCleanupTransformer from './transformers/adobe-business-cleanup.js';
import adobeBusinessSectionsTransformer from './transformers/adobe-business-sections.js';

const PAGE_TEMPLATE = {
  "name": "home",
  "urls": [
    "https://business.adobe.com/"
  ],
  "representativeUrl": "https://business.adobe.com/",
  "description": "Adobe for Business home page: concierge hero, promo ribbon, editorial and solution cards, product tabs, customer logos, testimonial and contact promo",
  "urlPattern": "/",
  "blocks": [
    {
      "name": "hero-concierge",
      "instances": [
        "div.brand-concierge.marquee"
      ]
    },
    {
      "name": "columns-ribbon",
      "instances": [
        "div.notification.ribbon"
      ]
    },
    {
      "name": "cards-editorial",
      "instances": [
        "div.section.three-up"
      ]
    },
    {
      "name": "cards-masonry",
      "instances": [
        "div.section.static-links.masonry-layout"
      ]
    },
    {
      "name": "tabs-segmented",
      "instances": [
        "div.tabs.segmented-control"
      ]
    },
    {
      "name": "carousel-logos",
      "instances": [
        "div.action-scroller"
      ]
    },
    {
      "name": "quote-story",
      "instances": [
        "div.aside.no-media"
      ]
    },
    {
      "name": "columns-promo",
      "instances": [
        "div.aside.dark"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "Hero - Brand Concierge",
      "selector": [
        "main > div.section:has(> div.brand-concierge)",
        "body > main > div.section:nth-of-type(1)"
      ],
      "style": null,
      "blocks": [
        "hero-concierge"
      ],
      "defaultContent": []
    },
    {
      "id": "section-2",
      "name": "Adobe MAX ribbon",
      "selector": [
        "main > div.section:has(div.notification.ribbon)",
        "body > main > div.section:nth-of-type(2)"
      ],
      "style": "light-grey",
      "blocks": [
        "columns-ribbon"
      ],
      "defaultContent": []
    },
    {
      "id": "section-3",
      "name": "What's new heading",
      "selector": [
        "main > div.section:has(#whats-new-in-ai-creativity-and-customer-experience)",
        "body > main > div.section:nth-of-type(3)"
      ],
      "style": "centered",
      "blocks": [],
      "defaultContent": [
        "#whats-new-in-ai-creativity-and-customer-experience"
      ]
    },
    {
      "id": "section-4",
      "name": "What's new cards",
      "selector": [
        "main > div.section.three-up"
      ],
      "style": null,
      "blocks": [
        "cards-editorial"
      ],
      "defaultContent": []
    },
    {
      "id": "section-5",
      "name": "Challenges intro",
      "selector": [
        "main > div.section:has(#address-your-biggest-customer-experience-challenges-with-adobe)",
        "body > main > div.section:nth-of-type(5)"
      ],
      "style": "light-grey, centered",
      "blocks": [],
      "defaultContent": [
        "#address-your-biggest-customer-experience-challenges-with-adobe",
        "div.text.has-bg p.body-l"
      ]
    },
    {
      "id": "section-6",
      "name": "Solution cards",
      "selector": [
        "main > div.section.static-links.masonry-layout"
      ],
      "style": "light-grey",
      "blocks": [
        "cards-masonry"
      ],
      "defaultContent": []
    },
    {
      "id": "section-7",
      "name": "Explore all products",
      "selector": [
        "main > div.section:has(#explore-all-adobe-business-products)",
        "body > main > div.section:nth-of-type(7)"
      ],
      "style": "centered",
      "blocks": [],
      "defaultContent": [
        "#explore-all-adobe-business-products",
        "div.cta-container"
      ]
    },
    {
      "id": "section-8",
      "name": "Product category tabs",
      "selector": [
        "main > div.section.tablist-mweb-tab-section"
      ],
      "style": null,
      "blocks": [
        "tabs-segmented"
      ],
      "defaultContent": []
    },
    {
      "id": "section-9",
      "name": "Customer brands",
      "selector": [
        "main > div.section:has(div.action-scroller)",
        "body > main > div.section:nth-of-type(10)"
      ],
      "style": "centered",
      "blocks": [
        "carousel-logos",
        "quote-story"
      ],
      "defaultContent": [
        "#adobe-is-transforming-the-worlds-biggest-brands",
        "div.text.no-spacing-top div.cta-container"
      ]
    },
    {
      "id": "section-10",
      "name": "Contact promo",
      "selector": [
        "main > div.section:has(div.aside.dark)",
        "body > main > div.section:nth-of-type(12)"
      ],
      "style": "dark",
      "blocks": [
        "columns-promo"
      ],
      "defaultContent": []
    }
  ]
};

const parsers = {
  'hero-concierge': heroConciergeParser,
  'columns-ribbon': columnsRibbonParser,
  'cards-editorial': cardsEditorialParser,
  'cards-masonry': cardsMasonryParser,
  'tabs-segmented': tabsSegmentedParser,
  'carousel-logos': carouselLogosParser,
  'quote-story': quoteStoryParser,
  'columns-promo': columnsPromoParser,
};

const transformers = [
  adobeBusinessCleanupTransformer,
  adobeBusinessSectionsTransformer,
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }];
  },
};
