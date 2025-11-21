
/**
 * Security Utility Layer
 * Handles input sanitization and validation to prevent XSS and Injection attacks.
 */

// Whitelist of allowed tags for product descriptions
const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'b', 'i', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'img'];
const ALLOWED_ATTRS = ['class', 'style', 'href', 'src', 'alt', 'title', 'width', 'height'];

/**
 * Sanitizes a string of HTML to prevent XSS attacks.
 * Uses the browser's native DOMParser to parse and clean the content.
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const elements = doc.body.getElementsByTagName('*');

  // Iterate backwards since we might remove elements
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];

    // 1. Remove disallowed tags (e.g., script, iframe, object)
    if (!ALLOWED_TAGS.includes(el.tagName.toLowerCase())) {
      el.parentNode?.removeChild(el);
      continue;
    }

    // 2. Sanitize attributes
    const attrs = el.attributes;
    for (let j = attrs.length - 1; j >= 0; j--) {
      const attrName = attrs[j].name.toLowerCase();
      const attrValue = attrs[j].value.toLowerCase();

      // Remove event handlers (onclick, onmouseover, etc.)
      if (attrName.startsWith('on')) {
        el.removeAttribute(attrs[j].name);
        continue;
      }

      // Remove javascript: protocols in href/src
      if ((attrName === 'href' || attrName === 'src') && attrValue.trim().startsWith('javascript:')) {
        el.removeAttribute(attrs[j].name);
        continue;
      }

      // Remove disallowed attributes
      if (!ALLOWED_ATTRS.includes(attrName)) {
        el.removeAttribute(attrs[j].name);
      }
    }
  }

  return doc.body.innerHTML;
};

/**
 * Escapes user input to be safe for display/processing.
 * Prevents basic HTML injection in text fields.
 */
export const escapeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Strict validation patterns for Penetration Testing defense
 */
export const VALIDATION_PATTERNS = {
  // Alphanumeric, spaces, common punctuation. No script tags, no control chars.
  TEXT_SAFE: /^[a-zA-Z0-9\s.,!?@#%&()_\-+'"\/]*$/,
  
  // Strict Email
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Phone (Numbers, spaces, dashes, plus)
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  
  // Zip Code (3-10 digits/letters)
  ZIP: /^[a-zA-Z0-9\s-]{3,10}$/,

  // Credit Card (Simple Luhn-like length check, 13-19 digits, optional spaces)
  CARD: /^[0-9\s]{13,19}$/,

  // CVC (3 or 4 digits)
  CVC: /^[0-9]{3,4}$/,

  // Expiry (MM/YY or MM/YYYY)
  EXPIRY: /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/
};

export const validateInput = (value: string, type: keyof typeof VALIDATION_PATTERNS): boolean => {
  if (!value) return false;
  return VALIDATION_PATTERNS[type].test(value);
};
