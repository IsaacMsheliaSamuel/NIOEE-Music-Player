/*
  TEAM GUIDE: JAVASCRIPT FOR THE FAKE API STORE UI

  Goal:
  Connect the HTML structure to the Platzi Fake Store API and render a working storefront.

  API endpoints to explore:
  - https://api.escuelajs.co/api/v1/products
  - https://api.escuelajs.co/api/v1/categories
  - optional: product detail queries and filtering parameters

  JavaScript responsibilities:
  1. Fetch data from the API using fetch() or async/await.
  2. Store the product list in a JavaScript array.
  3. Render product cards into the product-container.
  4. Filter by category and search for product names.
  5. Allow sorting by price or name.
  6. Add items to the cart and update totals.
  7. Show loading states and error messages.
  8. Open and close a product detail modal.

  Recommended flow:
  - getProducts() -> fetch and store data
  - renderProducts() -> build HTML cards
  - filterProducts() -> apply category/search/sort logic
  - addToCart() -> update cart array and display total
  - renderCart() -> show list of products in the cart
  - openModal() / closeModal() -> product detail interactions

  Important notes:
  - Keep functions separate and reusable.
  - Use event listeners for buttons and inputs.
  - Keep DOM queries in one place for clarity.
  - Handle API errors gracefully with a friendly message.

  Suggested project state:
  const state = {
    products: [],
    filteredProducts: [],
    cart: [],
    selectedCategory: 'all'
  };

  Suggested actions:
  - Load products on page load
  - Add category buttons dynamically if needed
  - Update cart count in the header
  - Display empty-cart message when no items exist

  Team split:
  - The JS data member: fetches API and renders products
  - The interaction member: cart logic, modal, filters, search
  - CSS handles the final appearance
  - HTML provides the placeholders and containers

  Do not write production logic inside HTML or CSS files.
  The JavaScript file should be the main logic center of the project.
*/

// Add your API base URL here
// const API_URL = 'https://api.escuelajs.co/api/v1/products';

// Add DOM references here
// const productContainer = document.getElementById('product-container');
// const cartItems = document.getElementById('cart-items');
// const searchInput = document.getElementById('search-input');

// Add app state object here
// const state = {
//   products: [],
//   filteredProducts: [],
//   cart: []
// };

// Add fetchProducts function here
// async function fetchProducts() {
//   // fetch data from the API
//   // handle loading and errors
// }

// Add renderProducts function here
// function renderProducts() {
//   // loop through filtered products
//   // create product card HTML
//   // insert cards into productContainer
// }

// Add filter logic here
// function applyFilters() {
//   // category filtering
//   // text search
//   // sorting by price or name
// }

// Add cart functions here
// function addToCart(product) {
//   // check if item already exists
//   // increase quantity
//   // update totals
// }

// function renderCart() {
//   // show cart items
//   // calculate total price
// }

// Add modal logic here
// function openProductModal(product) {
//   // fill modal with product data
//   // show modal
// }

// function closeProductModal() {
//   // hide modal
// }

// Add event listeners here
// document.addEventListener('DOMContentLoaded', () => {
//   fetchProducts();
//   // attach search input listener
//   // attach category button listeners
//   // attach modal close events
// });

console.log('JavaScript guide ready. Add the actual app logic here.');
