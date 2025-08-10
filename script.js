import { shopping_items } from '/data.js';

// empty array that will stored the shopping cart items
let cart = JSON.parse(localStorage.getItem("shopping-items")) || [];
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
      <button class="add-cart-btn">Add to Cart</button>
    </div>
    `
  });
  return shopHtml;
}

function generateShop() {
  shop.innerHTML = getShopHtml();    
};

generateShop();



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
