import { shopping_items } from '/data.js';

console.log('My script is loading...');

// empty array that will stored the shopping cart items
let cart = JSON.parse(localStorage.getItem("shopping-items")) || [];
console.log(cart);
let currentAmount = 0;

const shop = document.getElementById('shop');
console.log(shop)

function getShopHtml() {
  let shopHtml = ``;
  
  shopping_items.forEach(function(item) {
    shopHtml += `
    <div class="item-description" id=product-id-${item.id}>
      <img class="item-img" src="images/shop-pictures/${item.img}" alt="picture of ${item.name}">
      <h5 class="item-title">${item.name}</h5>
      <h6 class="item-price">$${item.price} ${item.desc}</h6>
      <button class="add-cart-btn" data-add="${item.id}">Add to Cart</button>
    </div>
    `
  });
  return shopHtml;
}

function generateShop() {
  if (shop) {
    shop.innerHTML = getShopHtml();   
  } 
};

function getOrderNumbers() {
  let price = cart.reduce(function(total, item) {
    return total + item.price;
  }, 0)
  let tax = price * 0.0825;
  let total = tax + price;

  return [price.toFixed(2), tax.toFixed(2), total.toFixed(2)];
}


function getOrderSummary() {
  let [price, tax, totalPrice] = getOrderNumbers();
  console.log(price, tax, totalPrice);
  document.getElementById('totalPrice').textContent = price;
  document.getElementById('tax').textContent = tax;
  document.getElementById('totalPriceTax').textContent = totalPrice;
}

const bag = document.querySelector('.cart-items-container');

function getBagHtml() {
  let bagHtml = ``;

  if (cart.length !== 0) {

    document.querySelector('.number-in-cart').innerHTML = cart.length;

    cart.forEach(function(item) {
      bagHtml += `
        <div class="cart-item-container">
              <div class="img-container"></div>
              <div class="cart-item-details">
                <div class="cart-item-description">
                  <p class="cart-item-name">${item.name}</p>
                  <p class="cart-item-price">Item Price: $${item.price}</p> 
                </div>
                <div>
                  <label for="cart-qty">Qty:</label>
                  <input class="cart-quantity-input" id="cart-qty" name="cart-qty" type="number" value="5">
                </div>
                <div class="cart-btns">
                  <button class="cart-update-btn">Update Count</button>
                  <button class="cart-remove-btn">Remove Item</button>
                </div>
              </div>
        </div>
      `
      })
      getOrderSummary();
  } else {
    bagHtml += `
      <p class="no-items">No Items in Shopping Cart</p>
    `;
  }
  return bagHtml;
}

function generateBag() {  
  if (bag) {
    bag.innerHTML = getBagHtml(); 
  }
}

document.addEventListener("DOMContentLoaded", function() {
  generateShop();
  generateBag();
  updateCartCount();
});

function updateCartCount() {
  const cartCountElement = document.querySelector(".shopping-cart-count");

  if (cart.length > 0) {
    cartCountElement.style.visibility = 'visible';
    cartCountElement.textContent = cart.length;
  } else {
    cartCountElement.style.visibility = 'hidden';
  }
}

/* Add to Cart button */

document.addEventListener("click", function(event) {
  if (event.target.dataset.add) {
    addToCart(event.target.dataset.add);
  }
});

function addToCart(id) {
  let foundItem = shopping_items.find(item => item.id === Number(id));
  cart.push(foundItem);
  localStorage.setItem("shopping-items", JSON.stringify(cart));
  updateCartCount();
}




/* Cart Updates */

function increment(id) {
  let selectedItem = id;
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    cart.push({id: selectedItem.id, item: 1});
  }
  else {
    search.item += 1;
  }
  console.log(cart);
};

function decrement(id) {
  let selectedItem = id;
  console.log(selectedItem.id);
};

function update(id) {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

function calculation (){
  // let cartIcon = document.getElementById("cartAmount");
  // cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();



function createOrderSummary() {
  document.querySelector(".order-summary").innerHTML = `
    <p>Order Summary:</p>
    <p>Items: $10.00</p>
    <p>Shipping: $0.00</p>
    <p>Tax: $0.83</p>
    <p>Promo Code:</p>
    <p>Order Total: $10.83</p>
  `
}
