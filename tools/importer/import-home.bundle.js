/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/hero-concierge.js
  function parse(element, { document: document2 }) {
    const cells = [];
    const bgPicture = element.querySelector(".background .desktop-only picture") || element.querySelector(".background .tablet-only picture") || element.querySelector(".background picture");
    if (bgPicture) {
      cells.push([bgPicture]);
    }
    const content = [];
    const eyebrowSrc = element.querySelector(".bc-header-eyebrow");
    if (eyebrowSrc && eyebrowSrc.textContent.trim()) {
      const p = document2.createElement("p");
      p.textContent = eyebrowSrc.textContent.trim();
      content.push(p);
    }
    const titleSrc = element.querySelector(".bc-header-title, .bc-header h1, .bc-header h2");
    if (titleSrc && titleSrc.textContent.trim()) {
      const h1 = document2.createElement("h1");
      h1.innerHTML = titleSrc.innerHTML;
      content.push(h1);
    }
    const subtitleSrc = element.querySelector(".bc-header-subtitle");
    if (subtitleSrc && subtitleSrc.textContent.trim()) {
      const p = document2.createElement("p");
      p.innerHTML = subtitleSrc.innerHTML;
      content.push(p);
    }
    const chipTexts = [...element.querySelectorAll(".bc-prompt-cards .prompt-card-text")].map((t) => t.textContent.trim()).filter(Boolean);
    if (chipTexts.length) {
      const ul = document2.createElement("ul");
      chipTexts.forEach((text) => {
        const li = document2.createElement("li");
        li.textContent = text;
        ul.append(li);
      });
      content.push(ul);
    }
    element.querySelectorAll(".bc-legal p").forEach((p) => {
      if (p.textContent.trim()) content.push(p);
    });
    cells.push([content]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-concierge", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-ribbon.js
  function parse2(element, { document: document2 }) {
    const logoCell = [];
    const textCell = [];
    const ctaCell = [];
    const logo = element.querySelector(".icon-area picture, .icon-area img");
    if (logo) logoCell.push(logo);
    element.querySelectorAll(".copy-wrap > *").forEach((el) => {
      if (el.textContent.trim()) textCell.push(el);
    });
    element.querySelectorAll(".action-area a").forEach((a) => {
      const p = document2.createElement("p");
      p.append(a);
      ctaCell.push(p);
    });
    const cells = [[logoCell, textCell, ctaCell]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-ribbon", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-editorial.js
  function parse3(element, { document: document2 }) {
    const cells = [];
    element.querySelectorAll(".editorial-card").forEach((card) => {
      const imageCell = [];
      const picture = card.querySelector(".media-area picture");
      if (picture) imageCell.push(picture);
      const bodyCell = [];
      const textWrap = card.querySelector(".foreground > .body-m") || card.querySelector(".foreground");
      if (textWrap) {
        [...textWrap.children].forEach((el) => {
          if (el.textContent.trim() || el.querySelector("img, picture")) bodyCell.push(el);
        });
      }
      card.querySelectorAll(".card-footer .action-area a").forEach((a) => {
        const p = document2.createElement("p");
        p.append(a);
        bodyCell.push(p);
      });
      if (imageCell.length || bodyCell.length) cells.push([imageCell, bodyCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-editorial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-masonry.js
  function parse4(element, { document: document2 }) {
    const cells = [];
    element.querySelectorAll(":scope > div.brick").forEach((brick) => {
      const bodyCell = [];
      const text = brick.querySelector(".foreground .brick-text") || brick.querySelector(".foreground");
      if (text) {
        [...text.children].forEach((el) => {
          if (el.textContent.trim() || el.querySelector("img, picture")) bodyCell.push(el);
        });
      }
      const imageCell = [];
      const picture = brick.querySelector(".background .desktop-only picture") || brick.querySelector(".background .tablet-only picture") || brick.querySelector(".background picture");
      if (picture) imageCell.push(picture);
      if (bodyCell.length || imageCell.length) cells.push([bodyCell, imageCell]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-masonry", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-segmented.js
  function parse5(element, { document: document2 }) {
    const cells = [];
    const buttons = [...element.querySelectorAll('.tab-list-container button[id^="tab-"]')];
    buttons.forEach((button, i) => {
      const label = button.textContent.trim();
      const suffix = button.id.replace(/^tab-/, "");
      const panel = element.querySelector(`.tabpanel[id="tab-panel-${suffix}"]`) || element.querySelectorAll(".tabpanel")[i];
      const content = [];
      if (panel) {
        panel.querySelectorAll(".brick").forEach((brick) => {
          const text = brick.querySelector(".brick-text");
          if (text) {
            [...text.children].forEach((el) => {
              if (el.tagName === "UL" || el.tagName === "OL") {
                el.querySelectorAll("span.list-text").forEach((span) => {
                  while (span.firstChild) span.parentNode.insertBefore(span.firstChild, span);
                  span.remove();
                });
              }
              if (el.textContent.trim() || el.querySelector("img, picture")) content.push(el);
            });
          }
          brick.querySelectorAll(".brick-media picture").forEach((picture) => {
            const p = document2.createElement("p");
            p.append(picture);
            content.push(p);
          });
        });
      }
      cells.push([label, content]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-segmented", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-logos.js
  function parse6(element, { document: document2 }) {
    const cells = [];
    element.querySelectorAll(".action-item").forEach((item) => {
      const img = item.querySelector("picture img, img");
      if (!img) return;
      const picture = img.closest("picture") || img;
      const link = item.querySelector("a.main-image[href], a[href]");
      let imageContent = picture;
      if (link) {
        const a = document2.createElement("a");
        a.href = link.getAttribute("href");
        const title = link.getAttribute("title") || img.getAttribute("alt");
        if (title) a.title = title;
        a.append(picture);
        imageContent = a;
      }
      cells.push([imageContent, ""]);
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "carousel-logos", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote-story.js
  function parse7(element, { document: document2 }) {
    const quoteCell = [];
    const attributionCell = [];
    const text = element.querySelector(".foreground .text") || element.querySelector(".foreground") || element;
    const isAttribution = (el) => {
      const strong = el.querySelector("strong, b");
      return strong && el.textContent.trim() === strong.textContent.trim();
    };
    [...text.children].forEach((el) => {
      const hasMedia = el.querySelector("picture, img") || el.tagName === "PICTURE";
      if (!el.textContent.trim() && !hasMedia) return;
      if (el.classList.contains("icon-area") || hasMedia && !el.textContent.trim()) {
        quoteCell.push(el);
      } else if (el.classList.contains("action-area")) {
        el.querySelectorAll("a").forEach((a) => {
          const p = document2.createElement("p");
          p.append(a);
          attributionCell.push(p);
        });
      } else if (attributionCell.length || el.tagName === "P" && isAttribution(el)) {
        attributionCell.push(el);
      } else {
        quoteCell.push(el);
      }
    });
    const cells = [[quoteCell]];
    if (attributionCell.length) cells.push([attributionCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "quote-story", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse8(element, { document: document2 }) {
    const textCell = [];
    const imageCell = [];
    const text = element.querySelector(".foreground .text");
    if (text) {
      [...text.children].forEach((el) => {
        if (el.classList.contains("action-area")) {
          el.querySelectorAll("a").forEach((a) => {
            const p = document2.createElement("p");
            p.append(a);
            textCell.push(p);
          });
        } else if (el.textContent.trim() || el.querySelector("img, picture")) {
          textCell.push(el);
        }
      });
    }
    const picture = element.querySelector(".foreground .image picture") || element.querySelector(".foreground .image img");
    if (picture) imageCell.push(picture);
    const cells = [[textCell, imageCell]];
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/adobe-business-cleanup.js
  function isEmptySection(el) {
    if (!el) return false;
    if (el.querySelector("img, picture, video, iframe, table, hr")) return false;
    return el.textContent.trim() === "";
  }
  function transform(hookName, element, payload) {
    const doc = element.ownerDocument || document;
    if (hookName === "beforeTransform") {
      WebImporter.DOMUtils.remove(element, [
        "header.global-navigation",
        "div.feds-topnav-wrapper",
        "footer.global-footer",
        "div.feds-footer-icons",
        "div.notification-visibility-hidden",
        "#page-load-ok-milo",
        "script",
        "style",
        "noscript",
        "link",
        "iframe"
      ]);
      const body = doc.body;
      if (body) {
        const strayDiv = body.querySelector(":scope > div:nth-of-type(3)");
        if (strayDiv && !strayDiv.querySelector("main")) strayDiv.remove();
      }
      element.querySelectorAll("div.card-metadata").forEach((cm) => {
        const section = cm.closest("div.section");
        cm.remove();
        if (section && isEmptySection(section)) section.remove();
      });
      WebImporter.DOMUtils.remove(element, ["div.section-metadata"]);
      WebImporter.DOMUtils.remove(element, ["div.nav-grad", "button.nav-button"]);
      WebImporter.DOMUtils.remove(element, [
        "div.brand-concierge section.bc-input-field",
        "div.brand-concierge textarea",
        "div.brand-concierge input",
        "#bc-label-tooltip"
      ]);
      element.querySelectorAll("main > div.section").forEach((section) => {
        if (isEmptySection(section)) section.remove();
      });
    }
    if (hookName === "afterTransform") {
      element.querySelectorAll("button").forEach((btn) => {
        const parent = btn.parentNode;
        if (!parent) return;
        while (btn.firstChild) parent.insertBefore(btn.firstChild, btn);
        btn.remove();
      });
      WebImporter.DOMUtils.remove(element, [
        "textarea",
        "input",
        "form",
        "script",
        "style",
        "noscript",
        "link",
        "iframe"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        [...el.attributes].forEach((attr) => {
          const n = attr.name;
          if (n.startsWith("data-excat-")) return;
          if (n.startsWith("daa-") || n.startsWith("data-") || n === "onclick") {
            el.removeAttribute(n);
          }
        });
      });
    }
  }

  // tools/importer/transformers/adobe-business-sections.js
  var MARKER = "data-excat-section-id";
  function findSection(root, section) {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (const sel of selectors) {
      if (!sel) continue;
      try {
        const el = root.querySelector(sel);
        if (el) return el;
      } catch (e) {
      }
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const template = payload && payload.template;
    const sections = template && template.sections || [];
    if (sections.length < 2) return;
    const doc = element.ownerDocument || document;
    if (hookName === "beforeTransform") {
      const resolved = sections.map((s) => findSection(element, s));
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const el = resolved[i];
        if (!el || !el.parentNode) continue;
        const section = sections[i];
        if (i === 0) {
          if (section.style) {
            const hr2 = doc.createElement("hr");
            hr2.setAttribute(MARKER, section.id);
            el.parentNode.insertBefore(hr2, el);
          }
          continue;
        }
        const hr = doc.createElement("hr");
        hr.setAttribute(MARKER, section.id);
        el.parentNode.insertBefore(hr, el);
      }
    }
    if (hookName === "afterTransform") {
      const markers = sections.map((s) => element.querySelector(`hr[${MARKER}="${s.id}"]`));
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const marker = markers[i];
        if (!section.style || !marker || !marker.parentNode) continue;
        const metadata = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
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

  // tools/importer/import-home.js
  var PAGE_TEMPLATE = {
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
  var parsers = {
    "hero-concierge": parse,
    "columns-ribbon": parse2,
    "cards-editorial": parse3,
    "cards-masonry": parse4,
    "tabs-segmented": parse5,
    "carousel-logos": parse6,
    "quote-story": parse7,
    "columns-promo": parse8
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        document2.querySelectorAll(selector).forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element });
        });
      });
    });
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const { document: document2, url, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (!parser) return;
        try {
          parser(block.element, { document: document2, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      });
      executeTransformers("afterTransform", main, payload);
      main.appendChild(document2.createElement("hr"));
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document2.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
