# AI TECHNOLOGY — Website (CCTV & Computer Store)

A static, mobile-first product catalog website for **AI TECHNOLOGY**, Hathazari, Chattogram — built to be hosted for free on **GitHub Pages**. No coding experience is required to update products, prices, images, or the order form — just follow the steps below.

---

## 📁 Folder Structure

```
ai-technology-site/
├── index.html                  ← the whole website (one page)
├── README.md                   ← this file
└── assets/
    ├── css/
    │   └── style.css           ← colors, fonts, layout, hero image setting
    ├── js/
    │   └── script.js           ← products list, cart, Google Form settings
    └── img/
        ├── hero-bg.svg         ← hero section background
        ├── logo.svg            ← navbar/footer logo
        ├── og-image.svg        ← image shown when link is shared on Facebook
        └── products/           ← put all product photos here
```

---

## 🚀 Publishing to GitHub Pages

1. Create a free GitHub account at [github.com](https://github.com) if you don't have one.
2. Create a **new repository** (e.g. `ai-technology-site`). Keep it **Public**.
3. Upload every file/folder from this project into that repository (drag-and-drop works on github.com, or use "Add file → Upload files").
4. Go to the repository's **Settings → Pages**.
5. Under "Build and deployment", set **Source: Deploy from a branch**, Branch: `main`, folder: `/ (root)` → **Save**.
6. Wait 1–2 minutes. GitHub will give you a live link like:
   `https://your-username.github.io/ai-technology-site/`
7. Open `index.html`, find the line with `og:url` near the top, and replace the placeholder with this real link — this makes Facebook link previews work correctly.

---

## 🛠️ A) How to Add / Edit / Remove Products

All products live in **`assets/js/script.js`**, inside the `PRODUCTS` list near the top of the file.

Each product looks like this:

```js
{
  id: 11,
  name: "Your Product Name",
  price: 3500,
  image_url: "assets/img/products/your-photo.jpg",
  category: "Indoor Cameras",
  description: "A short 1–2 sentence description of the product."
}
```

**To add a new product:**
1. Save your product photo inside `assets/img/products/` (e.g. `assets/img/products/new-camera.jpg`).
2. Open `assets/js/script.js`.
3. Copy one of the existing `{ ... }` product blocks.
4. Paste it inside the `PRODUCTS = [ ... ]` list, just above the closing `]`.
5. Give it a **unique `id`** number (one higher than your last product).
6. Update `name`, `price`, `image_url` (point it to your uploaded photo), `category`, and `description`.
7. Save the file. The product will automatically appear on the site and in the category filter — no other changes needed.

**To edit a product:** find its block in the same list and change the text/price/image directly.

**To remove a product:** delete its entire `{ ... }` block (including the comma after it).

**Categories:** the filter buttons (All / Indoor Cameras / Outdoor Cameras / etc.) are generated automatically from whatever `category` values you use — so introducing a brand-new category name automatically creates a new filter button.

**Currency:** prices are shown with the ৳ symbol automatically — just type plain numbers (e.g. `4200`, not `"4200 taka"`).

---

## 🖼️ B) How to Change the Hero Image

The hero background is controlled by **one single line** at the top of `assets/css/style.css`:

```css
:root {
  --hero-image: url("../img/hero-bg.svg");
  ...
```

**To use your own photo:**
1. Add your image file to `assets/img/` (e.g. `assets/img/hero-photo.jpg`).
2. Change that line to:
   ```css
   --hero-image: url("../img/hero-photo.jpg");
   ```
3. Save. The new hero background appears immediately — no other code changes needed.

You can also use an image hosted elsewhere online by pasting its full link, e.g.:
```css
--hero-image: url("https://example.com/my-hero-photo.jpg");
```

**Logo and shared-link image (Facebook preview):**
- Logo: replace `assets/img/logo.svg` with your own logo file (keep the same filename, or update the `<img src="...">` references in `index.html`).
- Facebook/social preview image: replace `assets/img/og-image.svg` (recommended size: 1200×630px).

---

## 📝 C) How the Google Form Popup Works & How to Update It

Clicking **"Order Now" / "Buy Now"** (on a product card, or "Checkout" in the cart) opens a **popup window with your Google Form embedded directly inside the page** — customers never leave the site or open a new tab.

The form currently connected is your **QUICKFIXX Service Booking** form:
`https://docs.google.com/forms/d/e/1FAIpQLSda2e2MaEqLuCPQULHbtaN3wlQ2CExDl9IuReBXFMSUcriZ1g/viewform`

Because this form doesn't have a dedicated "Product Name" field, the popup shows a hint above the form — *"Please mention this in the Problem Description field: [product name]"* — so the customer knows what to type in.

### Optional: auto-fill the product name into the form
If you'd rather have the product name typed in automatically (into "Problem Description"), do this:

1. Open your form and click the eye icon (**Preview**).
2. Type any test text into **Problem Description**, fill the required fields, and click **Submit**.
3. On the "Response recorded" screen, right-click → **View Page Source** (or `Ctrl+U` / `Cmd+Option+U`).
4. Press `Ctrl+F`, search for `entry.`, and find the `entry.XXXXXXXXX` number that sits near the text you typed into Problem Description.
5. Open **`assets/js/script.js`**, find `GOOGLE_FORM_CONFIG`, and set:
   ```js
   entryProductName: "entry.XXXXXXXXX",
   ```
6. Save — the popup will now auto-fill Problem Description with the product name (or full cart summary at checkout).

### Switching to a different Google Form later
Open **`assets/js/script.js`** and update the `baseUrl` in `GOOGLE_FORM_CONFIG` to your new form's `/viewform` link (found via **Send → link icon 🔗** on the form). Repeat the steps above if you want auto-fill on the new form too.

### A note on embedding
Google Forms allows embedding by default, but if a customer ever sees a blank popup instead of the form, double check the form's **Settings → Responses** hasn't restricted embedding, and that the form is not set to "Restrict to users in your organization" (which blocks outside customers from viewing it at all).

---

## 📍 D) How to Update the Google Maps Location

In `index.html`, find the **"Visit Us"** section and this line:

```html
<iframe src="https://www.google.com/maps?q=Hathazari,Chattogram,4330,Bangladesh&output=embed" ...>
```

**To point it to your exact shop location:**
1. Open [Google Maps](https://maps.google.com) and search for your shop (or drop a pin on the exact spot).
2. Click **Share → Embed a map → COPY HTML**.
3. From the copied code, take just the `src="..."` link.
4. Paste it in place of the current `src` value above.

---

## ✏️ E) Other Easy Edits

| What to change | Where |
|---|---|
| Shop phone/address in the footer & "Visit Us" section | `index.html` — search for `01819-790882` |
| FAQ questions/answers | `index.html` — inside the `<section id="faq">` block, each `.faq-item` |
| Testimonials | `index.html` — inside the `<section id="reviews">` block |
| SEO keyword pills | `index.html` — inside the `.tag-cloud` block |
| Terms & Conditions text | `index.html` — inside `<div class="modal-box">` near the bottom |
| Brand colors | `assets/css/style.css` — the `:root { ... }` variables near the top (`--color-primary`, etc.) |

---

## ✅ What's Already Built In

- Mobile-first responsive design (works on phone, tablet, desktop)
- Shopping cart with quantity controls, saved in the browser (localStorage) so it survives page refresh
- Floating cart button + slide-in cart drawer
- Category filtering (All / Indoor Cameras / Outdoor Cameras / Recorders & Storage)
- Open Graph tags for clean Facebook Ads / link-sharing previews
- FAQ accordion, testimonials grid, SEO keyword pills, Google Maps embed
- Collapsible Terms & Conditions modal in the footer
- Placeholder product images (simple camera icons) — swap them for real photos anytime in `assets/img/products/`

**Note on images:** the current product/hero images are clean placeholder graphics so the site looks complete out of the box. Replace them with real photos whenever you're ready — no code changes required, just keep the same filenames or update `image_url` in `script.js`.
