// cart.js

// Function to load the cart from localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // If cart is empty, show the empty cart message
  if (cart.length === 0) {
    document.getElementById("cart-items").style.display = "none";
    document.getElementById("empty-cart").style.display = "block";
    document.getElementById("checkout-btn").disabled = true;
  } else {
    // Hide empty cart message and show table
    document.getElementById("cart-items").style.display = "block";
    document.getElementById("empty-cart").style.display = "none";
    document.getElementById("checkout-btn").disabled = false;

    // Render cart items in a table
    const tableBody = document.getElementById("cart-items");
    tableBody.innerHTML = ""; // Clear previous content

    let total = 0;

    cart.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>
            <input type="number" class="form-control quantity" value="${
              item.quantity
            }" data-index="${index}" min="1">
          </td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
          <td>
            <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
          </td>
        `;
      tableBody.appendChild(row);

      total += item.price * item.quantity;
    });

    // Update total price
    document.getElementById("total-price").textContent = total.toFixed(2);
  }
}

// Function to update cart in localStorage
function updateCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const quantities = document.querySelectorAll(".quantity");

  quantities.forEach((input) => {
    const index = input.getAttribute("data-index");
    const newQuantity = parseInt(input.value, 10);

    if (newQuantity > 0) {
      cart[index].quantity = newQuantity;
    }
  });

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // Reload cart to reflect changes
}

// Function to remove item from cart
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item at index
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // Reload cart to reflect changes
}

// Event listener for quantity changes
document.addEventListener("change", function (e) {
  if (e.target.classList.contains("quantity")) {
    updateCart();
  }
});

// Event listener for removing items
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-item")) {
    const index = e.target.getAttribute("data-index");
    removeItem(index);
  }
});

// Load the cart when the page loads
loadCart();
