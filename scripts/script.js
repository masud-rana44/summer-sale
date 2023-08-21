const cards = document.querySelectorAll(".card");
const cartItemsContainer = document.getElementById("cart-item-container");
const totalCartPriceEl = document.getElementById("total-price");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total-after-discount");
const inputCoupon = document.querySelector(".input-coupon");
const btnCoupon = document.querySelector(".btn-coupon");
const btnHome = document.getElementById("btn-home");
const btnPurchase = document.getElementById("btn-purchase");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

let item = 1;
let totalCartPrice = 0;

cards.forEach((card) =>
  card.addEventListener("click", (e) => {
    const currentItem = e.currentTarget;
    const itemName = currentItem.querySelector(".item-name").textContent;
    const itemPrice = parseFloat(
      currentItem.querySelector(".item-price").textContent
    );

    totalCartPrice += itemPrice;
    totalCartPriceEl.textContent = totalCartPrice.toFixed(2);

    if (totalCartPrice > 0) btnPurchase.removeAttribute("disabled");
    if (totalCartPrice >= 200) btnCoupon.removeAttribute("disabled");

    const li = document.createElement("li");
    li.textContent = `${item++}. ${itemName}`;
    cartItemsContainer.appendChild(li);
  })
);

btnCoupon.addEventListener("click", () => {
  if (totalCartPrice < 200) return;

  const couponCode = inputCoupon.value.trim();

  if (couponCode !== "SELL200") {
    alert("Invalid coupon! Please provide a valid coupon.");
    return;
  }

  const discountAmount = (totalCartPrice / 100) * 20;
  const totalAmount = totalCartPrice - discountAmount;

  discountEl.textContent = discountAmount.toFixed(2);
  totalEl.textContent = totalAmount.toFixed(2);

  // clear the input field
  inputCoupon.value = "";
});

btnPurchase.addEventListener("click", () => {
  if (totalCartPrice <= 0) return;

  modal.classList.remove("remove");
  overlay.classList.remove("remove");
});

btnHome.addEventListener("click", () => {
  item = 1;
  totalCartPrice = 0;
  cartItemsContainer.innerHTML = "";
  inputCoupon.value = "";

  totalCartPriceEl.textContent =
    discountEl.textContent =
    totalEl.textContent =
      "0.00";

  modal.classList.add("remove");
  overlay.classList.add("remove");

  btnPurchase.setAttribute("disabled", true);
  btnCoupon.setAttribute("disabled", true);
});
