/* =========================================================================
   AI TECHNOLOGY — CCTV & Computer Store
   script.js — products, cart, filters, Buy Now / Google Form integration
   -------------------------------------------------------------------------
   HOW TO ADD A NEW PRODUCT (see README.md for full walkthrough):
   1. Copy an object inside the PRODUCTS array below.
   2. Give it a new unique "id" (just increase the number).
   3. Update name, price, image_url, category, description.
   4. Put the product photo inside assets/img/products/ and point
      "image_url" to it, e.g. "assets/img/products/my-photo.jpg".
   5. Save the file — the product appears on the site automatically.

   HOW TO UPDATE GOOGLE FORM IDs:
   Scroll down to the "GOOGLE FORM CONFIG" section below.
   ========================================================================= */

/* =========================================================================
   1. PRODUCT CATALOG
   ========================================================================= */
const PRODUCTS = [
  {
    id: 1,
    name: "2MP HD Dome Camera",
    price: 1850,
    image_url: "assets/img/products/cctv-dome-2mp.svg",
    category: "Indoor Cameras",
    description: "Compact indoor dome camera with 2MP Full HD image quality and night vision, ideal for shops and offices."
  },
  {
    id: 2,
    name: "4MP Bullet Camera (Outdoor)",
    price: 2450,
    image_url: "assets/img/products/cctv-bullet-4mp.svg",
    category: "Outdoor Cameras",
    description: "Weatherproof 4MP bullet camera with long-range night vision, built for outdoor gates and building exteriors."
  },
  {
    id: 3,
    name: "5MP PTZ Speed Dome",
    price: 8900,
    image_url: "assets/img/products/cctv-ptz-5mp.svg",
    category: "Outdoor Cameras",
    description: "Pan-tilt-zoom camera with 5MP resolution and remote-controlled 360° coverage for large open areas."
  },
  {
    id: 4,
    name: "WiFi Smart Camera (Indoor)",
    price: 2200,
    image_url: "assets/img/products/cctv-wireless-wifi.svg",
    category: "Indoor Cameras",
    description: "Wireless smart camera with mobile app live view, two-way audio, and motion alerts — no cabling required."
  },
  {
    id: 5,
    name: "8-Channel NVR (No HDD)",
    price: 6500,
    image_url: "assets/img/products/cctv-nvr-8ch.svg",
    category: "Recorders & Storage",
    description: "8-channel network video recorder supporting up to 5MP IP cameras with remote mobile viewing."
  },
  {
    id: 6,
    name: "4-Channel DVR Kit",
    price: 4200,
    image_url: "assets/img/products/cctv-dvr-4ch.svg",
    category: "Recorders & Storage",
    description: "4-channel DVR bundled with power supply and connectors — a simple starter kit for small shops."
  },
  {
    id: 7,
    name: "Smart Video Doorbell",
    price: 3100,
    image_url: "assets/img/products/cctv-doorbell.svg",
    category: "Indoor Cameras",
    description: "WiFi video doorbell with HD view, real-time visitor alerts, and two-way talk from your phone."
  },
  {
    id: 8,
    name: "Solar Outdoor Camera",
    price: 5400,
    image_url: "assets/img/products/cctv-solar-outdoor.svg",
    category: "Outdoor Cameras",
    description: "Fully wireless solar-powered outdoor camera — no wiring, no electricity bill, works even during load-shedding."
  },
  {
    id: 9,
    name: "2TB Surveillance Hard Disk",
    price: 6800,
    image_url: "assets/img/products/cctv-hdd-2tb.svg",
    category: "Recorders & Storage",
    description: "Dedicated 2TB surveillance-grade hard drive built for continuous 24/7 CCTV recording."
  },
  {
    id: 10,
    name: "CCTV Cable & Connector Kit (90m)",
    price: 2600,
    image_url: "assets/img/products/cctv-cable-kit.svg",
    category: "Recorders & Storage",
    description: "90-meter coaxial power/video cable roll with BNC and DC connectors — everything needed for one installation."
  }

  /* --- Add more products below by copying the block above --- */
];

/* =========================================================================
   2. GOOGLE FORM CONFIG
   -------------------------------------------------------------------------
   This form opens in a POPUP (embedded inline) instead of a new tab.
   baseUrl is already set to the AI TECHNOLOGY / QuickFixx Service Booking
   form. If you switch to a different form later, replace baseUrl and the
   entry IDs below. See README.md section "C" for how to find entry IDs
   (right-click → View Page Source on the "response recorded" screen,
   search for "entry.").

   NOTE: the current form has no separate "Product Name" field, so the
   product name is shown as a text hint above the embedded form instead.
   If you want it typed in automatically, get the entry ID for the
   "Problem Description" field and set entryProductName below — leave it
   blank ("") to skip auto-fill and just show the hint text.
   ========================================================================= */
const GOOGLE_FORM_CONFIG = {
  // Base viewform URL of your Google Form (must end in /viewform)
  baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSda2e2MaEqLuCPQULHbtaN3wlQ2CExDl9IuReBXFMSUcriZ1g/viewform",
  // Optional: entry ID for a field to auto-fill with the product/order summary.
  // Leave as "" until you've found the real entry.XXXXXXXXX for "Problem Description".
  entryProductName: "",
  // Optional: entry ID for the Email field, if you want to auto-fill it too.
  entryCustomerEmail: ""
};

/* =========================================================================
   3. STATE
   ========================================================================= */
let currentFilter = "All";
let cart = loadCart();

/* =========================================================================
   4. INIT
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderProducts();
  renderCart();
  bindGlobalEvents();
});

/* =========================================================================
   5. CART — localStorage helpers
   ========================================================================= */
function loadCart() {
  try {
    const raw = localStorage.getItem("aitech_cart");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem("aitech_cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image_url: product.image_url, qty: 1 });
  }
  saveCart();
  renderCart();
  showToast(`${product.name} added to cart`);
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((i) => i.id !== productId);
  saveCart();
  renderCart();
}

function cartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.qty * item.price, 0);
}

/* =========================================================================
   6. RENDER — Category Filters
   ========================================================================= */
function renderFilters() {
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
  const bar = document.getElementById("filterBar");
  if (!bar) return;
  bar.innerHTML = categories
    .map(
      (cat) =>
        `<button class="filter-btn ${cat === currentFilter ? "active" : ""}" data-cat="${escapeAttr(cat)}">${escapeHtml(cat)}</button>`
    )
    .join("");

  bar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.cat;
      renderFilters();
      renderProducts();
    });
  });
}

/* =========================================================================
   7. RENDER — Product Grid
   ========================================================================= */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const list =
    currentFilter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === currentFilter);

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">No products in this category yet.</div>`;
    return;
  }

  grid.innerHTML = list
    .map(
      (p) => `
    <div class="product-card">
      <div class="product-media">
        <img src="${escapeAttr(p.image_url)}" alt="${escapeAttr(p.name)}" loading="lazy">
        <span class="product-category-tag">${escapeHtml(p.category)}</span>
        <div class="viewfinder-corners">
          <span class="vc-tl"></span><span class="vc-tr"></span><span class="vc-bl"></span><span class="vc-br"></span>
        </div>
      </div>
      <div class="product-body">
        <h3>${escapeHtml(p.name)}</h3>
        <p class="desc">${escapeHtml(p.description)}</p>
        <div class="product-price-row">
          <span class="product-price">৳${p.price.toLocaleString("en-BD")}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-secondary" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="btn btn-primary" onclick="buyNow(${p.id})">Order Now</button>
        </div>
      </div>
    </div>`
    )
    .join("");
}

/* =========================================================================
   8. RENDER — Cart Drawer
   ========================================================================= */
function renderCart() {
  const badge = document.getElementById("cartBadge");
  const itemsWrap = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (badge) badge.textContent = cartCount();
  if (!itemsWrap) return;

  if (cart.length === 0) {
    itemsWrap.innerHTML = `<div class="cart-empty">Your cart is empty.<br>Browse products and tap "Add to Cart".</div>`;
  } else {
    itemsWrap.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <img src="${escapeAttr(item.image_url)}" alt="${escapeAttr(item.name)}">
        <div class="cart-item-info">
          <h4>${escapeHtml(item.name)}</h4>
          <span>৳${item.price.toLocaleString("en-BD")} each</span>
          <div class="qty-control">
            <button onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      </div>`
      )
      .join("");
  }

  if (totalEl) totalEl.textContent = `৳${cartTotal().toLocaleString("en-BD")}`;
}

/* =========================================================================
   9. BUY NOW / ORDER NOW — Google Form POPUP integration
   -------------------------------------------------------------------------
   Instead of opening a new tab, this builds the (optionally pre-filled)
   form URL and displays it inline inside a popup modal (#orderFormModal),
   embedded with an <iframe>.
   ========================================================================= */
function buildOrderFormUrl(summaryText) {
  const params = new URLSearchParams();
  params.set("embedded", "true");
  if (GOOGLE_FORM_CONFIG.entryProductName) {
    params.set(GOOGLE_FORM_CONFIG.entryProductName, summaryText);
  }
  return `${GOOGLE_FORM_CONFIG.baseUrl}?${params.toString()}`;
}

function openOrderFormPopup(summaryText) {
  const modal = document.getElementById("orderFormModal");
  const iframe = document.getElementById("orderFormIframe");
  const hint = document.getElementById("orderFormProductName");
  if (!modal || !iframe) return;

  if (hint) hint.textContent = summaryText;
  iframe.src = buildOrderFormUrl(summaryText);
  modal.classList.add("open");
}

function closeOrderFormPopup() {
  const modal = document.getElementById("orderFormModal");
  const iframe = document.getElementById("orderFormIframe");
  if (modal) modal.classList.remove("open");
  if (iframe) iframe.src = "about:blank"; // stop the form / reset for next open
}

function buyNow(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  openOrderFormPopup(product.name);
}

function checkoutCart() {
  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }
  const summary = cart.map((i) => `${i.name} x${i.qty}`).join(", ");
  openOrderFormPopup(summary);
}

/* =========================================================================
   10. UI — Cart Drawer, Modal, Accordion, Mobile Nav, Toast
   ========================================================================= */
function bindGlobalEvents() {
  // Cart drawer open/close
  const cartOverlay = document.getElementById("cartOverlay");
  const cartDrawer = document.getElementById("cartDrawer");
  document.querySelectorAll("[data-open-cart]").forEach((el) =>
    el.addEventListener("click", () => {
      cartOverlay.classList.add("open");
      cartDrawer.classList.add("open");
    })
  );
  document.querySelectorAll("[data-close-cart]").forEach((el) =>
    el.addEventListener("click", closeCart)
  );
  cartOverlay.addEventListener("click", closeCart);

  function closeCart() {
    cartOverlay.classList.remove("open");
    cartDrawer.classList.remove("open");
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkoutCart);

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Order Form popup (Google Form embedded)
  const orderFormModal = document.getElementById("orderFormModal");
  document.querySelectorAll("[data-close-order-form]").forEach((el) =>
    el.addEventListener("click", closeOrderFormPopup)
  );
  orderFormModal.addEventListener("click", (e) => {
    if (e.target === orderFormModal) closeOrderFormPopup();
  });

  // Terms & Conditions modal
  const termsModal = document.getElementById("termsModal");
  document.querySelectorAll("[data-open-terms]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      termsModal.classList.add("open");
    })
  );
  document.querySelectorAll("[data-close-terms]").forEach((el) =>
    el.addEventListener("click", () => termsModal.classList.remove("open"))
  );
  termsModal.addEventListener("click", (e) => {
    if (e.target === termsModal) termsModal.classList.remove("open");
  });

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("mobile-open"))
    );
  }

  // Escape key closes overlays
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      termsModal.classList.remove("open");
      closeOrderFormPopup();
    }
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* =========================================================================
   11. Utilities
   ========================================================================= */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}
