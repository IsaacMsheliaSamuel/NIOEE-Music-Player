// ============================================================
// WEEK 7 — Simple E-Commerce Site
// Concepts covered:
//   1. Async / Fetch API  → fetchProducts()
//   2. DOM Manipulation   → renderProducts(), renderCart()
//   3. localStorage       → saveCart(), loadCart()
// ============================================================


// ─── 1. STATE ───────────────────────────────────────────────
// We keep the cart in memory as an array of objects.
// Each item: { id, title, price, image, quantity }

let cart = loadCart(); // load saved cart on page start


// ─── 2. LOCALSTORAGE ────────────────────────────────────────

function saveCart() {
  // Convert the array to a JSON string and save it
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  // Read the string from storage and convert it back to an array
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
}


// ─── 3. ASYNC — FETCH PRODUCTS ──────────────────────────────
// We use the free FakeStore API to get real product data.
// async/await makes the code read like normal top-to-bottom code.

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=8");
    const products = await response.json(); // parse JSON body
    renderProducts(products);
  } catch (error) {
    // If the network fails, show a friendly message
    document.getElementById("product-list").innerHTML =
      "<p>⚠️ Could not load products. Check your internet connection.</p>";
    console.error(error);
  }
}


// ─── 4. DOM — RENDER PRODUCTS ───────────────────────────────

function renderProducts(products) {
  const list = document.getElementById("product-list");

  // Build a card for every product using .map() then join into one string
  list.innerHTML = products
    .map(
      (product) => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id}, '${escapeQuotes(product.title)}', ${product.price}, '${product.image}')">
          Add to Cart
        </button>
      </div>
    `
    )
    .join("");
}

// Helper: prevent titles with apostrophes from breaking the onclick string
function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}


// ─── 5. CART LOGIC ──────────────────────────────────────────

function addToCart(id, title, price, image) {
  // Check if the item is already in the cart
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1; // just increase the count
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
  }

  saveCart();    // persist to localStorage
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartUI();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}


// ─── 6. DOM — RENDER CART ───────────────────────────────────

function updateCartUI() {
  // Update the badge count in the header
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalItems;

  // Build the list of cart items
  const cartList = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cartList.innerHTML = cart
      .map(
        (item) => `
        <li>
          <span>${item.title.substring(0, 25)}… x${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
          <button onclick="removeFromCart(${item.id})" title="Remove">✕</button>
        </li>
      `
      )
      .join("");
  }

  // Calculate and display the total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("cart-total").textContent = total.toFixed(2);
}


// ─── 7. CART SIDEBAR TOGGLE ─────────────────────────────────

document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.remove("hidden");
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.add("hidden");
});

document.getElementById("clear-btn").addEventListener("click", clearCart);

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert(`✅ Order placed! Total: $${cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}`);
  clearCart();
  document.getElementById("cart-sidebar").classList.add("hidden");
});


// ─── 8. INIT ────────────────────────────────────────────────
// Run when the page loads

fetchProducts(); // async call to get products
updateCartUI();  // restore cart state from localStorage
