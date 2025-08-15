// Initialize storage
if(!localStorage.getItem("products")) localStorage.setItem("products", JSON.stringify([]));
if(!localStorage.getItem("services")) localStorage.setItem("services", JSON.stringify([]));
if(!localStorage.getItem("cart")) localStorage.setItem("cart", JSON.stringify([]));
if(!localStorage.getItem("orders")) localStorage.setItem("orders", JSON.stringify([]));

// Floating cart update
function updateFloatingCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBtn = document.getElementById("floatingCart");
  if(cart.length>0) {
    cartBtn.style.display = "block";
    let count=0; cart.forEach(p=>count+=p.qty);
    document.getElementById("cartCount").innerText=count;
  } else cartBtn.style.display="none";
}

// Add product to cart
function addToCart(id, productsList) {
  const product = productsList.find(p=>p.id===id);
  const qty = parseInt(document.getElementById(`qty-${id}`).innerText);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exist = cart.find(c=>c.id===id);
  if(exist) exist.qty += qty;
  else cart.push({...product, qty});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateFloatingCart();
}

// Change quantity
function changeQty(id, delta){
  const span = document.getElementById(`qty-${id}`);
  let val = parseInt(span.innerText) + delta;
  if(val<1) val=1;
  span.innerText = val;
}

updateFloatingCart();
