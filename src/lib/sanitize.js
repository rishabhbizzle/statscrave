import sanitizeHtml from 'sanitize-html';

// Allowlist for blog HTML (Jodit editor output). Anything not listed is
// stripped: <script>, <iframe>, on* handlers, javascript:/data: URLs, etc.
const OPTIONS = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'u', 's', 'del', 'ins', 'sup', 'sub', 'figure', 'figcaption']),
    allowedAttributes: {
        a: ['href', 'name', 'target', 'rel', 'title'],
        img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
        ol: ['start', 'type'],
        td: ['colspan', 'rowspan', 'align'],
        th: ['colspan', 'rowspan', 'align', 'scope'],
        '*': ['style'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    allowedStyles: {
        '*': {
            color: [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s,.%]+\)$/i, /^[a-z]+$/i],
            'background-color': [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s,.%]+\)$/i, /^[a-z]+$/i],
            'text-align': [/^(left|right|center|justify)$/],
            'font-weight': [/^(normal|bold|bolder|lighter|\d{3})$/],
            'font-style': [/^(normal|italic)$/],
            'text-decoration': [/^[a-z\s-]+$/],
            'list-style-type': [/^[a-z-]+$/],
        },
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow' }),
    },
};

export function sanitizeBlogHtml(html) {
    return sanitizeHtml(typeof html === 'string' ? html : '', OPTIONS);
}
