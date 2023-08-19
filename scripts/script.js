const cards = document.querySelectorAll(".card");
const cartItemContainer = document.getElementById("cart-item-container");
const totalItemPriceEl = document.getElementById("total-price");

let item = 1;

cards.forEach((card) =>
  card.addEventListener("click", (e) => {
    const itemName = e.target
      .closest(".card")
      .querySelector(".item-name").textContent;

    const itemPrice = parseFloat(
      e.target.closest(".card").querySelector(".item-price").textContent
    );

    const totalItemsPrice =
      parseFloat(totalItemPriceEl.textContent) + itemPrice;
    totalItemPriceEl.innerHTML = `${totalItemsPrice}TK`;

    const li = document.createElement("li");
    li.textContent = `${item++}. ${itemName}`;
    cartItemContainer.appendChild(li);
  })
);
