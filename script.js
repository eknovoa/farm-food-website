let shopping_items = [
  {id:1,name: "Green Beans", count: 1, price: 3.00, desc: " per lb", img: "green-beans.jpg"},
  {id: 2, name: "Lettuce", count: 1, price: 1.50, desc: " per lb", img: "lettuce.jpg"},
  {id: 3, name: "Zucchini Squash",  count: 1, price: 0.75, desc: " each", img: "squash.jpg"},
  {id: 4, name: "Artichokes",count: 1, price: 1.25, desc: " each", img: "artichokes.jpg"},
  {id: 5, name: "Okra", count: 1, price: 3.00, desc: " per lb", img: "okra.jpg"},
  {id: 6, name: "Cauliflower", count: 1, price: 2.50, desc: " each", img: "cauliflower.jpg"},
  {id: 7, name: "Bell Pepppers", count: 1, price: 0.50, desc: " each", img: "bell-pepper.jpg"},
  {id: 8, name: "Whole Carrots",  count: 1, price: 1.00, desc: " per lb", img: "carrots.jpg"},
  {id: 9, name: "Corn", count: 1, price: 1.00, desc: "each", img: "corn.jpg"},
  {id: 10, name: "Radish",  count: 1, price: 1.50, desc: " per bunch", img: "radish.jpg"},
  {id: 11, name: "Chili Peppers",  count: 1, price: 1.50, desc: " per lb", img:"chili-pepper.jpg"},
  {id: 12, name: "Hot Peppers",  count: 1, price: 1.50, desc: " per lb", img: "hot-peppers.jpg"},
  {id: 13, name: "White Onions",  count: 1, price: 1.00, desc: " each", img: "white-onions.jpg"},
  {id: 14, name: "Pasture Raised Eggs",  count: 1, price: 6.00, desc: " per dozen", img: "eggs.jpg"},
  {id: 15, name: "Blueberries",  count: 1, price: 5.00, desc: " per pint", img: "blueberries.jpg"},
  {id: 16, name: "Tomatoes", count: 1, price: 2.00, desc: " per pint", img: "tomatoes.jpg"},
  {id: 17, name: "Raw Honey", count: 1, price: 15.00, desc: " per 40oz bottle", img: "honey.jpg"},
  {id: 18, name: "Grass Fed Whole Milk", count: 1, price: 5.00, desc: " per gallon", img: "milk.jpg"},
  {id: 19, name: "Market Bag", count: 1, price: 10.00, desc: " each", img: "market-bag.jpg"}
];



// empty array that will stored the shopping cart items
let cart = JSON.parse(localStorage.getItem("shopping-items")) || [];


let shop = document.getElementById('shop');
console.log(shop)

let generateShop = () => {
  return (shop.innerHTML = shopping_items
    .map((x) => {
    let { id, name, count, price, desc, img } = x;
    let searchItem = cart.find((x) => x.id === id) || [];
    return `
    <div class="item-description" id=product-id-${id}>
                <img src="resources/shop-pictures/${img}" alt="picture of ${name}">
                <h5>${name}</h5>
                <h6>$${price} ${desc}</h6>
                <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">
                  ${searchItem.item === undefined ? 0 : searchItem.item}
                  </div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
    </div>
  `;
  }).join(""));
};

generateShop();

let increment = (id) => {
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

let decrement = (id) => {
  let selectedItem = id;
  console.log(selectedItem.id);
};
let update = (id) => {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();