const cardsData = [
  {
    title: "Sweet and Plump Grapes",
    price: "Rs. 150 / kg",
    imageUrl: "img/fruits/Grapes.jpg",
  },
  {
    title: "Juicy and Tangy Orange",
    price: "Rs. 50 / kg",
    imageUrl: "img/fruits/Orange.jpg",
  },
  {
    title: "Fresh and Fragrant Pineapple",
    price: "Rs. 200 / kg",
    imageUrl: "img/fruits/Pine.jpg",
  },
  {
    title: "Succulent and Sweet Papaya",
    price: "Rs. 100 / kg",
    imageUrl: "img/fruits/Papaya.jpg",
  },
  {
    title: "Delicious and Fuzzy Peach",
    price: "Rs. 80 / kg",
    imageUrl: "img/fruits/Peach.jpg",
  },
  {
    title: "Sweet and Luscious Cherry",
    price: "Rs. 300 / kg",
    imageUrl: "img/fruits/Cherry.jpg",
  },
  {
    title: "Fragrant and Flavorful Guava",
    price: "Rs. 40 / kg",
    imageUrl: "img/fruits/Gauva.jpg",
  },
  {
    title: "Plump and Juicy Pomegranate",
    price: "Rs. 250 / kg",
    imageUrl: "img/fruits/Pomo.jpg",
  },
];

let cart = []
const latest = document.getElementById("latest");
const best = document.getElementById("best");
const special = document.getElementById("special");
const mainContainer = document.querySelector(".main-section");

latest.onclick = function () {
  mainContainer.innerHTML = "";
  createCards(cardsData.length);
};

best.onclick = function () {
  mainContainer.innerHTML = "";
  createCards(6);
};

special.onclick = function () {
  mainContainer.innerHTML = "";
  createCards(5);
};

function createCards(length) {
  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-section");
  for (let i = 0; i < length; i++) {
    const randInt = Math.floor(Math.random() * cardsData.length);
    const cardData = cardsData[length == cardsData.length ? i : randInt];
    // Create a new card element
    const card = document.createElement("div");
    card.classList.add("card");

    // Create the card image element
    const cardImage = document.createElement("img");
    cardImage.src = cardData.imageUrl;
    cardImage.alt = cardData.title;
    cardImage.classList.add("card-image");

    // Create the card title element
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = cardData.title;
    cardTitle.classList.add("card-title");

    const price = document.createElement("div");
    price.classList.add("price");
    price.textContent = cardData.price;
    // Create the card description element
    // const cardDescription = document.createElement("p");
    // cardDescription.textContent = "Card Description";
    // cardDescription.classList.add("card-description");

    // Create the card actions element
    const cardActions = document.createElement("div");
    cardActions.classList.add("card-actions");

    // Create the add to cart button
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add("add-to-cart-btn");

    // Create the quantity input element
    const quantityInput = document.createElement("div");
    quantityInput.classList.add("quantity-input");

    // Create the decrement button
    const decrementBtn = document.createElement("button");
    decrementBtn.textContent = "-";
    decrementBtn.classList.add("decrement-btn");

    // Create the item quantity input

    // Create the increment button
    const incrementBtn = document.createElement("button");
    incrementBtn.textContent = "+";
    incrementBtn.classList.add("increment-btn");

    // Create the item count element
    const itemCount = document.createElement("span");
    itemCount.textContent = "0";
    itemCount.classList.add("item-count");

    // Append all the elements to the card actions element
    quantityInput.append(decrementBtn, itemCount, incrementBtn);
    cardActions.append(addToCartBtn, quantityInput);

    // Append all the elements to the card element
    card.append(cardImage, cardTitle, price,cardActions);

    // Append the card element to the card container element
    cardsContainer.append(card);
  }
  mainContainer.append(cardsContainer);
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("adfasdf");
  createCards(cardsData.length);
  const decreaseButtons = document.querySelectorAll(".decrement-btn");
  const increaseButtons = document.querySelectorAll(".increment-btn");

  for (const decBtn of decreaseButtons) {
    decBtn.addEventListener("click", decreaseItemCount);
  }

  for (const incBtn of increaseButtons) {
    incBtn.addEventListener("click", increaseItemCount);
  }

  $(".add-to-cart-btn").on("click", function (){
    const count = +$(this).siblings(".quantity-input").children(".item-count").text();
    const price = +$(this).parent().siblings(".price").text().toString().split("/")[0].split("Rs. ")[1];
    const fruit = $(this).parent().siblings(".card-title").text().toString().split(" ").slice(-1)[0]
    if(count == 0){
      alert('0kg cannot of added into the cart');
      return;
    }
    const bill = {
      fruit, 
      count, 
      price,
      total: price*count
    };
    
    cart = [...JSON.parse(localStorage.getItem("cart") ?? "[]"), bill]
    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${count}kg ${fruit} has been added to cart`)
  })
  const modal = document.querySelector(".cartModal")
  $("button#cart").on("click", function(){
    let cartStore = JSON.parse(localStorage.getItem("cart"))
    const cartListContainer = document.querySelector(".cart-list--container");
    cartStore?.forEach(item => {
      const cartList = document.createElement("div")
      cartList.classList.add("cart-list");

      const itemName = document.createElement("div");
      itemName.classList.add("item-name");
      itemName.innerText = item.fruit
      const itemCount = document.createElement("div");
      itemCount.classList.add("item-count");
      itemCount.innerText = item.count
      const itemPrice = document.createElement("div");
      itemPrice.classList.add("item-price");
      itemPrice.innerText = item.price;
      const itemTotal = document.createElement("div");
      itemTotal.classList.add("item-total");
      itemTotal.innerText = item.total;

      cartList.append(itemName, itemPrice, itemCount, itemTotal);
      cartListContainer.append(cartList)

    })
    const total = document.createElement("span");
    total.classList.add("total");
    console.log(cartStore)
    total.innerText = cartStore?.reduce((a,b) => {
      console.log(a,b)
      return {total: a.total + b.total}
    },{total: 0}).total
    $('.total-section').append(total)
    modal.showModal()
  })

  $("button.buy").on("click", function(){
    alert("This is a sample project!. You can buy it in amazon, Happy shopping :)")
    modal.close()
  })
  
});

function decreaseItemCount(e) {
    const counterElement = e.target.nextElementSibling;
    const count = +counterElement.innerText
    counterElement.innerText = count==0? (0).toString() : (count-1).toString();
  }

  function increaseItemCount(e){
    const counterElement = e.target.previousElementSibling;
    const count = +counterElement.innerText
    counterElement.innerText = (count + 1).toString()

  }