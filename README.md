# Fathima Driving School: HTML, CSS and JavaScript website

Plain static website. No installation needed.

## Open it
Double-click `index.html`. That is all.

## Pages
- `index.html` Home (parallax hero, scroll-driven road journey, courses, FAQ, enquiry form)
- `four-wheeler-driving-classes-srivilliputtur.html`
- `two-wheeler-riding-classes-srivilliputtur.html`
- `about.html`, `licence-guide.html`, `contact.html`

## Enquiry form
By default the form opens **WhatsApp** (97517 09990) with the learner's details filled in.
To receive form entries by email instead, create a free form endpoint (for example on Formspree), then paste its URL in `js/main.js`:
`endpoint: ''`

## Put it online on GitHub Pages (free)
1. Create a GitHub repository and upload all these files (the `index.html` must be at the top level).
2. Repository **Settings -> Pages -> Deploy from a branch -> main -> / (root)**.
3. Your site opens at `https://USERNAME.github.io/REPOSITORY/`.
4. Replace `https://YOUR-DOMAIN.com` in all `.html` files, `sitemap.xml` and `robots.txt` with your real address, and commit again.

## Edit
- Colours and layout: `css/style.css` (variables at the top)
- Animations, vehicles, form: `js/main.js`
- Text and SEO: the `.html` files
- Read `SEO-KEYWORDS.md` before going live.
