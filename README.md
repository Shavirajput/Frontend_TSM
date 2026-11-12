# TSM Nexus Website

React site for [tsmnexus.in](https://tsmnexus.in).

## Development

- `npm start` starts the local development server.
- `npm test -- --watchAll=false` runs the tests once.
- `npm run build` creates the production assets, pre-renders every public route into standalone HTML, generates `build/404.html`, and refreshes the upload-ready `hostinger-frontend/` directory.

The public routes are `/`, `/method`, `/cohort`, `/contact`, `/guide`, and `/apply`. Route titles, descriptions, canonicals, and Open Graph tags are defined in `src/lib/seo.js`. Update those values when the SEO team supplies final copy.

## Apache / Hostinger deployment

Upload the **contents** of `hostinger-frontend/` (or `build/`) to the website document root, including the generated route folders, `404.html`, `.htaccess`, `robots.txt`, and `sitemap.xml`. The Apache rules serve each pre-rendered route directly, redirect `www` and trailing-slash page URLs to the canonical format, and return the branded `404.html` with an HTTP 404 status for unknown paths.

The `/admin` route is intentionally omitted from the sitemap and marked `noindex` in its HTML and response header. It remains crawlable so search engines can see those directives. These discovery controls do not replace authentication or authorization for the admin API.
