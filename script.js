const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products");
  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
        let response = await data.json();
        console.log(response);

      for (let i = 0; i < response.length; i++) {
        let description = response[i].description;
        let title = response[i].title;
        products.innerHTML += `
       <div class="product">
           <img src="${response[i].images[1]}" alt="${response[i].category.name}" class="product-img">
           <div class="product-content">
           <h2 class="product-title">${title}</h2>
           <h3>ID: ${response[i].id}</h3>
           <h4 class="product-category">${response[i].category.name}</h4>
           <p class="product-description">${description}</p>
           <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a href="#!" data-productId="${response[i].id}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
               <button class="btn" onclick="stored(${response[i]["id"]})">Add to Chart</button>
           </div>
           </div>
       </div>
       `;
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchProducts("https://api.escuelajs.co/api/v1/products");
});

async function stored(item) {
  await fetch(`https://api.escuelajs.co/api/v1/products/${item}`).then(product_img => product_img.json()).then(
    product_img => {
      console.log(product_img)
      let cart_store = JSON.parse(localStorage.getItem("cart"))
      let cartTray = document.createElement("div")
      cartTray.setAttribute("id", "set")
      let tray = []
      let productItem = {
        "image": product_img["images"],
        "title": product_img["title"],
        "price": product_img["price"]
      }
      if (cart_store == null || cart_store == undefined) {
        tray.push(productItem)
        cart_store = localStorage.setItem("cart", JSON.stringify(tray));
        alert("One Item Added");
        location.reload();
      }
      if (cart_store.length > 0) {
        cart_store.push(productItem)
        localStorage.setItem("cart", JSON.stringify(cart_store))
        alert("Other Item Added");
        location.reload();
      }
    }
  );
}