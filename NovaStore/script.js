
//===========================
// PRODUCT DATABASE
//===========================


const products = [

{
    id:1,
    name:"Wireless Headphones",
    category:"audio",
    price:99,
    rating:4.8,
    image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description:"Premium wireless headphones with noise cancellation."
},

{
    id:2,
    name:"Smart Watch Pro",
    category:"watch",
    price:149,
    rating:4.7,
    image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description:"Advanced smartwatch with health tracking features."
},

{
    id:3,
    name:"Gaming Mouse",
    category:"gaming",
    price:59,
    rating:4.6,
    image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    description:"High precision RGB gaming mouse."
},

{
    id:4,
    name:"Bluetooth Speaker",
    category:"audio",
    price:89,
    rating:4.5,
    image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    description:"Portable speaker with powerful bass."
},

{
    id:5,
    name:"Gaming Laptop",
    category:"laptop",
    price:1299,
    rating:4.9,
    image:"https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    description:"Powerful laptop designed for gaming."
},

{
    id:6,
    name:"Smartphone X",
    category:"mobile",
    price:799,
    rating:4.8,
    image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    description:"Latest smartphone with premium camera."
},

{
    id:7,
    name:"4K Camera",
    category:"camera",
    price:899,
    rating:4.7,
    image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    description:"Professional camera for photography."
},

{
    id:8,
    name:"Mechanical Keyboard",
    category:"gaming",
    price:120,
    rating:4.6,
    image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    description:"RGB mechanical keyboard for gamers."
}


];



//===========================
// VARIABLES
//===========================


let cart =
JSON.parse(localStorage.getItem("cart")) || [];


let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];



const productGrid =
document.getElementById("productGrid");


const cartCount =
document.getElementById("cartCount");


const wishlistCount =
document.getElementById("wishlistCount");


const cartPanel =
document.getElementById("cartPanel");


const overlay =
document.getElementById("overlay");



const cartItems =
document.getElementById("cartItems");


const cartTotal =
document.getElementById("cartTotal");



//===========================
// DISPLAY PRODUCTS
//===========================


function displayProducts(items){


productGrid.innerHTML="";


items.forEach(product=>{


const card=document.createElement("div");


card.className="product-card";


card.innerHTML=`

<button class="wishlist"
onclick="addWishlist(${product.id})">

<i class="fa-solid fa-heart"></i>

</button>


<img src="${product.image}" alt="${product.name}">


<h3>${product.name}</h3>


<p>${product.description}</p>


<div class="product-price">
$${product.price}
</div>


<p>
⭐ ${product.rating}
</p>


<div class="product-actions">


<button onclick="viewProduct(${product.id})">

View

</button>


<button onclick="addCart(${product.id})">

Add Cart

</button>


</div>

`;


productGrid.appendChild(card);


});


}



displayProducts(products);



//===========================
// ADD TO CART
//===========================


function addCart(id){


let product =
products.find(item=>item.id===id);



let existing =
cart.find(item=>item.id===id);



if(existing){

existing.quantity++;

}

else{


cart.push({

...product,

quantity:1

});


}


saveCart();


showToast("Product added to cart");


}



//===========================
// SAVE CART
//===========================


function saveCart(){


localStorage.setItem(
"cart",
JSON.stringify(cart)
);


updateCart();


}




//===========================
// UPDATE CART
//===========================


function updateCart(){


cartCount.innerText =
cart.reduce(
(total,item)=>total+item.quantity,
0
);


cartItems.innerHTML="";


let total=0;



cart.forEach(item=>{


total += item.price * item.quantity;



cartItems.innerHTML += `


<div class="cart-item">


<img src="${item.image}">


<div>

<h4>
${item.name}
</h4>


<p>
$${item.price}
</p>


<div class="quantity">

<button onclick="changeQuantity(${item.id},-1)">
-
</button>


${item.quantity}


<button onclick="changeQuantity(${item.id},1)">
+
</button>


</div>


</div>


<button onclick="removeCart(${item.id})">

❌

</button>


</div>


`;

});


cartTotal.innerText =
"$"+total;



}




updateCart();

//===========================
// CHANGE CART QUANTITY
//===========================


function changeQuantity(id, amount){


let item =
cart.find(product=>product.id===id);



if(item){

    item.quantity += amount;


    if(item.quantity <= 0){

        cart =
        cart.filter(product=>product.id!==id);

    }

}


saveCart();


}



//===========================
// REMOVE FROM CART
//===========================


function removeCart(id){


cart =
cart.filter(item=>item.id!==id);


saveCart();


showToast("Product removed");


}



//===========================
// WISHLIST SYSTEM
//===========================


function addWishlist(id){


let product =
products.find(item=>item.id===id);



let exists =
wishlist.find(item=>item.id===id);



if(exists){


wishlist =
wishlist.filter(item=>item.id!==id);


showToast("Removed from wishlist");


}

else{


wishlist.push(product);


showToast("Added to wishlist");


}



saveWishlist();


}



function saveWishlist(){


localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);


wishlistCount.innerText =
wishlist.length;


}



saveWishlist();




//===========================
// SEARCH PRODUCTS
//===========================


const searchInput =
document.getElementById("searchInput");



searchInput.addEventListener(
"input",
()=>{


let value =
searchInput.value.toLowerCase();



let filtered =
products.filter(product=>


product.name
.toLowerCase()
.includes(value)



);



displayProducts(filtered);



});





//===========================
// CATEGORY FILTER
//===========================


const categoryFilter =
document.getElementById("categoryFilter");



categoryFilter.addEventListener(
"change",
()=>{


let category =
categoryFilter.value;



if(category==="all"){


displayProducts(products);


return;

}



let filtered =
products.filter(product=>

product.category===category

);



displayProducts(filtered);


});





//===========================
// SORT PRODUCTS
//===========================


const sortProducts =
document.getElementById("sortProducts");



sortProducts.addEventListener(
"change",
()=>{


let value =
sortProducts.value;



let sorted =
[...products];



if(value==="low"){


sorted.sort(
(a,b)=>a.price-b.price
);


}



else if(value==="high"){


sorted.sort(
(a,b)=>b.price-a.price
);


}



else if(value==="rating"){


sorted.sort(
(a,b)=>b.rating-a.rating
);


}



displayProducts(sorted);



});





//===========================
// PRODUCT MODAL
//===========================


const productModal =
document.getElementById("productModal");


const modalBody =
document.getElementById("modalBody");


const closeModal =
document.getElementById("closeModal");



function viewProduct(id){


let product =
products.find(item=>item.id===id);



modalBody.innerHTML=`


<img
src="${product.image}"
style="width:100%;border-radius:20px;">



<h2>
${product.name}
</h2>


<p>
${product.description}
</p>


<h3>
Price: $${product.price}
</h3>


<p>
Rating: ⭐ ${product.rating}
</p>



<button
onclick="addCart(${product.id})"
class="btn primary">

Add To Cart

</button>


`;



productModal.classList.add("active");


}




closeModal.onclick=()=>{


productModal.classList.remove("active");


};



productModal.onclick=(e)=>{


if(e.target===productModal){


productModal.classList.remove("active");


}


};




//===========================
// CART OPEN / CLOSE
//===========================


const cartBtn =
document.getElementById("cartBtn");


const closeCart =
document.getElementById("closeCart");



cartBtn.onclick=()=>{


cartPanel.classList.add("active");


overlay.classList.add("active");


};



closeCart.onclick=()=>{


cartPanel.classList.remove("active");


overlay.classList.remove("active");


};



overlay.onclick=()=>{


cartPanel.classList.remove("active");


overlay.classList.remove("active");


};




//===========================
// DARK MODE
//===========================


const themeBtn =
document.getElementById("themeBtn");



themeBtn.onclick=()=>{


document.body.classList.toggle("dark");



let icon =
themeBtn.querySelector("i");



if(document.body.classList.contains("dark")){


icon.className =
"fa-solid fa-sun";


localStorage.setItem(
"theme",
"dark"
);


}

else{


icon.className =
"fa-solid fa-moon";


localStorage.setItem(
"theme",
"light"
);


}



};




// LOAD SAVED THEME


if(
localStorage.getItem("theme")==="dark"
){


document.body.classList.add("dark");


themeBtn.querySelector("i")
.className =
"fa-solid fa-sun";


}

//===========================
// TOAST NOTIFICATION
//===========================


const toast =
document.getElementById("toast");



function showToast(message){


toast.innerText = message;


toast.classList.add("show");



setTimeout(()=>{


toast.classList.remove("show");


},3000);


}



//===========================
// NEWSLETTER FORM
//===========================


const newsletterForm =
document.getElementById("newsletterForm");



newsletterForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const email =
document.getElementById("newsletterEmail").value;



if(email.includes("@")){


showToast(
"Successfully subscribed!"
);


newsletterForm.reset();


}

else{


showToast(
"Enter a valid email"
);


}


});




//===========================
// CONTACT FORM
//===========================


const contactForm =
document.getElementById("contactForm");



contactForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



showToast(
"Message sent successfully!"
);



contactForm.reset();


});




//===========================
// MOBILE MENU
//===========================


const menuBtn =
document.querySelector(".menuBtn");


const navLinks =
document.querySelector(".nav-links");



menuBtn.onclick=()=>{


navLinks.classList.toggle("active");


};




//===========================
// CLOSE MOBILE MENU
//===========================


document
.querySelectorAll(".nav-links a")
.forEach(link=>{


link.onclick=()=>{


navLinks.classList.remove("active");


};


});





//===========================
// PAGE LOADER
//===========================


window.addEventListener(
"load",
()=>{


const loader =
document.getElementById("loader");



setTimeout(()=>{


loader.style.display="none";


},700);



});




//===========================
// SCROLL TO TOP
//===========================


const scrollTop =
document.getElementById("scrollTop");



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 400){


scrollTop.classList.add("show");


}

else{


scrollTop.classList.remove("show");


}


});



scrollTop.onclick=()=>{


window.scrollTo({

top:0,

behavior:"smooth"

});


};





//===========================
// SMOOTH CATEGORY SCROLL
//===========================


document
.querySelectorAll("a[href^='#']")
.forEach(anchor=>{


anchor.addEventListener(
"click",
function(e){


let target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth"

});


}


});


});




//===========================
// PRODUCT CARD ANIMATION
//===========================


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";

entry.target.style.transform=
"translateY(0)";


}



});


},
{

threshold:0.2

});



document
.querySelectorAll(
".product-card,.category-card,.review-card"
)
.forEach(card=>{


card.style.opacity="0";

card.style.transform=
"translateY(30px)";

observer.observe(card);


});




//===========================
// PREVENT EMPTY CART CHECKOUT
//===========================


const checkoutBtn =
document.getElementById("checkoutBtn");



checkoutBtn.onclick=()=>{


if(cart.length===0){


showToast(
"Your cart is empty"
);


}

else{


showToast(
"Redirecting to checkout..."
);


// Future checkout page can be added here


}


};




//===========================
// UPDATE YEAR AUTOMATICALLY
//===========================


const year =
new Date().getFullYear();



const copyright =
document.querySelector(".copyright");



if(copyright){


copyright.innerHTML =
`© ${year} NovaStore. All Rights Reserved.`;

}


//===========================
// INITIAL LOAD
//===========================


updateCart();

saveWishlist();

displayProducts(products);