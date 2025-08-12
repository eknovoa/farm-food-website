import { shopping_items } from '/data.js';

console.log('My script is loading...');

// empty array that will stored the shopping cart items
let cart = JSON.parse(localStorage.getItem("shopping-items")) || [];
const shop = document.getElementById('shop');
const bag = document.querySelector('.cart-items-container');
let freqMap = {};



document.addEventListener("click", function(event) {
  if (event.target.dataset.add) {
    addToCart(event.target.dataset.add);
  }
  else if (event.target.dataset.remove) {
    removeItem(event.target.dataset.remove);
    generateBag();
  }
  else if (event.target.dataset.update) {
    console.log('button to update clicked')
    let itemId = event.target.dataset.update;
    let newQuantity = Number(document.getElementById(`cart-qty-${itemId}`).value);
    
    if (newQuantity >= 0) {
      updateItemCount(itemId, newQuantity);
      generateBag();
    }
    else {
      alert("Quantity must be a positive number.");
    }
  }
  else if (event.target.dataset.ordered) {
    console.log("order placed");
    clearCart();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  generateShop();
  generateBag();
  updateCartCount();
  generateCheckout();
});


/* Shop Functions */
function getShopHtml() {
  let shopHtml = ``;
  
  shopping_items.forEach(function(item) {
    shopHtml += `
    <div class="item-description" id=product-id-${item.id}>
      <img class="item-img" src="images/shop-pictures/${item.img}" alt="picture of ${item.name}">
      <h5 class="item-title">${item.name}</h5>
      <h6 class="item-price">$${item.price.toFixed(2)} ${item.desc}</h6>
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

function getCartFrequency() {
  let frequencyMap = {};
  cart.forEach(function(item) {
    if (frequencyMap[item.id]) {
      frequencyMap[item.id] += 1;
    } else {
      frequencyMap[item.id] = 1;
    }
  });
  return frequencyMap;
}


function getBagHtml() {
  let bagHtml = ``;

  if (cart.length !== 0) {
    document.querySelector('.pmt-btn-container').style.display = 'block';
    document.querySelector('.number-in-cart').innerHTML = cart.length;

    freqMap = getCartFrequency();
    Object.entries(freqMap).forEach(([key, value]) => {
      let obj = cart.find(item => Number(key) === item.id);
      bagHtml += `
        <div class="cart-item-container">
              <div>
                <img class="img-container" src="/images/shop-pictures/${obj.img}">
              </div>
              <div class="cart-item-details">
                <div class="cart-item-description">
                  <p class="cart-item-name">${obj.name}</p>
                  <p class="cart-item-price">Item Price: $${obj.price.toFixed(2)}</p> 
                </div>
                <div>
                  <label for="cart-qty-${key}">Qty:</label>
                  <input class="cart-quantity-input" name="cart-qty" type="number" id="cart-qty-${key}" value="${value}">
                </div>
                <div class="cart-btns">
                  <button class="cart-update-btn" data-update="${key}">Update Count</button>
                  <button class="cart-remove-btn" data-remove="${key}">Remove Item</button>
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


function getFinalOrderSummary() {
  let [price, tax, totalPrice] = getOrderNumbers();
  console.log(price, tax, totalPrice);
  document.querySelector('.order-summary').innerHTML = `
    <h3>Order Summary</h3>
    <p>Items: $${price}</p>
    <p>Delivery: $0 </p>
    <p>Taxes: $${tax}</p>
    <p>Total: $${totalPrice}</p>
  `;
}

function getFinalShoppingBagHtml() {
  let finalBag = '';
  freqMap = getCartFrequency();
  Object.entries(freqMap).forEach(([key, value]) => {
      let obj = cart.find(item => Number(key) === item.id);
    finalBag += `
      <div class="summary-item">
        <p class="summary-item-name">${obj.name} (${value})</p>
        <p class="summary-item-price">$${(value * obj.price).toFixed(2)}</p>
      </div>
    `;
  })
  return finalBag;
}

function getFinalShoppingBag() {
  document.querySelector('.summary-container').innerHTML = getFinalShoppingBagHtml();
}


function generateCheckout() {
  if (cart.length != 0) {
    getFinalOrderSummary();
    getFinalShoppingBag();
  }
}


function updateCartCount() {
  const cartCountElement = document.querySelector(".shopping-cart-count");

  if (cart.length > 0) {
    cartCountElement.style.visibility = 'visible';
    cartCountElement.textContent = cart.length;
  } else {
    cartCountElement.style.visibility = 'hidden';
  }
}


/* Cart Updates */

function addToCart(id) {
  let foundItem = shopping_items.find(item => item.id === Number(id));
  cart.push(foundItem);
  localStorage.setItem("shopping-items", JSON.stringify(cart));
  updateCartCount();
}


function removeItem(targetId) {
  cart = cart.filter(item => item.id != Number(targetId));
  localStorage.setItem("shopping-items", JSON.stringify(cart));
  updateCartCount();
  document.querySelector('.number-in-cart').innerHTML = cart.length;
}

function updateItemCount(targetId, newCount) {
  
  const filteredCart = cart.filter(item => item.id !== Number(targetId));
  const itemToAdd = shopping_items.find(item => item.id === Number(targetId));

  for (let i=0; i < newCount; i++) {
    filteredCart.push(itemToAdd);
  }

  cart = filteredCart;
  localStorage.setItem("shopping-items", JSON.stringify(cart));
  updateCartCount();
  document.querySelector('.number-in-cart').innerHTML = cart.length;
  location.reload();
}

function clearCart() {
  localStorage.clear();
  updateCartCount();
}