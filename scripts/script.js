const cards = document.querySelectorAll(".card");
const cartItemsContainer = document.getElementById("cart-item-container");
const totalCartPriceEl = document.getElementById("total-price");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");
const inputCoupon = document.querySelector(".input-coupon");
const btnCoupon = document.querySelector(".btn-coupon");
const btnHome = document.getElementById("btn-home");
const btnPurchase = document.getElementById("btn-purchase");

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

let item = 1;

cards.forEach((card) =>
  card.addEventListener("click", (e) => {
    const itemName = e.target
      .closest(".card")
      .querySelector(".item-name").textContent;

    const itemPrice = parseFloat(
      e.target.closest(".card").querySelector(".item-price").textContent
    );

    const totalCartPrice = parseFloat(totalCartPriceEl.textContent) + itemPrice;
    totalCartPriceEl.innerHTML = `${totalCartPrice.toFixed(2)}TK`;

    if (totalCartPrice >= 200) btnCoupon.removeAttribute("disabled");

    const li = document.createElement("li");
    li.textContent = `${item++}. ${itemName}`;
    cartItemsContainer.appendChild(li);
  })
);

btnCoupon.addEventListener("click", () => {
  const totalCartPrice = parseFloat(totalCartPriceEl.textContent);

  if (totalCartPrice < 200) return;

  if (!inputCoupon.value || inputCoupon.value !== "SELL200") {
    alert("Please provide a valid coupon");
    return;
  }

  const discount = (totalCartPrice / 100) * 20;
  const total = totalCartPrice - discount;

  discountEl.innerHTML = `${discount.toFixed(2)}TK`;
  totalEl.innerHTML = `${total.toFixed(2)}TK`;

  // clear the input field
  inputCoupon.value = "";
});

btnPurchase.addEventListener("click", () => {
  const totalCartPrice = parseFloat(totalCartPriceEl.textContent);

  if (totalCartPrice <= 0) return;

  modal.classList.remove("remove");
  overlay.classList.remove("remove");
});

btnHome.addEventListener("click", () => {
  item = 1;
  cartItemsContainer.textContent = "";
  totalCartPriceEl.innerHTML =
    discountEl.innerHTML =
    totalEl.innerHTML =
      "00.00 TK";

  modal.classList.add("remove");
  overlay.classList.add("remove");
});
