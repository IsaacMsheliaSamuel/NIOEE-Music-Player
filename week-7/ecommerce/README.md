# Week 7 — Simple E-Commerce Site

## What You'll Learn
- **Async / Fetch API** — get data from the internet
- **DOM Manipulation** — build and update the page with JavaScript
- **localStorage** — save data in the browser so it survives a page refresh

---

## How the Code is Organised

```
ecommerce/
├── index.html   ← page structure (header, product grid, cart sidebar)
├── style.css    ← layout and visual styles
└── app.js       ← ALL the JavaScript logic (read this carefully!)
```

Open `app.js` and follow the numbered sections (1 → 8).

---

## Key Concepts

### 1. Fetch API (Async)
```js
async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
}
```
- `fetch()` sends a network request and returns a **Promise**
- `await` pauses the function until the Promise resolves
- `async` must be added to any function that uses `await`

### 2. DOM Manipulation
```js
document.getElementById("product-list").innerHTML = `<div>...</div>`;
```
- We select an element, then set its `innerHTML` to inject HTML
- We use `.map()` to turn an array of products into an array of HTML strings

### 3. localStorage
```js
localStorage.setItem("cart", JSON.stringify(cart)); // save
const cart = JSON.parse(localStorage.getItem("cart")); // load
```
- localStorage only stores **strings**, so we use `JSON.stringify` / `JSON.parse`
- Data persists even after the browser tab is closed

---

## Assignments

### ⭐ Level 1 — Explore
1. Open the site in your browser and add items to the cart
2. Refresh the page — is the cart still there? Why?
3. Open DevTools → Application → Local Storage and inspect the saved data

### ⭐⭐ Level 2 — Modify
1. Change the API limit from `8` to `12` products
2. Add a **quantity selector** (+ / - buttons) on each cart item instead of just removing it
3. Show a "Added to cart ✓" message on the product card button after clicking

### ⭐⭐⭐ Level 3 — Extend
1. Add a **search/filter bar** that filters products by name as you type
2. Add a **category filter** using the `/products/categories` endpoint from FakeStore API
3. Replace the `alert()` checkout with a proper order summary modal

---

## Useful Links
- FakeStore API docs: https://fakestoreapi.com
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
