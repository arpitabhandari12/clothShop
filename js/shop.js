// shop.js

// Function to handle adding products to the cart
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const productName = this.getAttribute("data-product");
    const productPrice = this.getAttribute("data-price");

    // Get current cart from localStorage, or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optional: Show a message or update cart icon
    alert(`${productName} added to cart!`);
  });
});
