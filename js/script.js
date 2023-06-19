//preloader
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector("body").classList.add("loaded");
	}, 50)
});

//top-btn
let mybutton = document.getElementById("top-btn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

//hamburger-menu
const hamburger = document.querySelector(".nav-hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
	hamburger.classList.toggle("active");
	navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
	hamburger.classList.remove("active");
	navMenu.classList.remove("active");
}))

//open search
function openSearch() {
	document.getElementById("search").style.display = "block";
}

function closeSearch() {
	document.getElementById("search").style.display = "none";
}

/*//open login popup
function openLoginForm() {
	document.body.classList.add("showLoginForm");
}
function closeLoginForm() {
	document.body.classList.remove("showLoginForm");
}*/

function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("account__tab-content");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("account__tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}
function openService(evt, serviceName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("service-card-inner");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("service-card-title");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(serviceName).style.display = "flex";
	evt.currentTarget.className += " active";
}



//show/close coupon field
function showCouponField() {
	document.getElementById("checkout-coupon").style.display = "flex";
}

function closeCouponField() {
	document.getElementById("checkout-coupon").style.display = "none";
}
function shopFilterFunction() {
	document.getElementById("shop-sidebar").classList.toggle("active");
}
//cart page/ add items to cart/ total value
let items = document.querySelectorAll('.add-cart');

let products = [
	{
		id: 0,
		name: 'Veronica Persica',
		tag: 'veronicaPersica',
		price: 30,
		inCart: 0
	},
	{
		id: 1,
		name: 'Scilla',
		tag: 'scilla',
		price: 30,
		inCart: 0
	},
	{
		id: 2,
		name: 'Aquarium',
		tag: 'aquarium',
		price: 10,
		inCart: 0
	}
];

for (let i = 0; i < items.length; i++) {
	items[i].addEventListener('click', () => {
		itemNumbers(products[i]);
		totalCost(products[i]);
	})
}

function onLoadItemNumber() {
	let productNumbers = localStorage.getItem('itemNumbers');

	if (productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function itemNumbers(products) {
	let productNumbers = localStorage.getItem('itemNumbers');

	productNumbers = parseInt(productNumbers);

	if (productNumbers) {
		localStorage.setItem('itemNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('itemNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}

	setItems(products);
}

function setItems(products) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);

	if (cartItems != null) {
		if (cartItems[products.tag] == undefined) {
			cartItems = {
				...cartItems,
				[products.tag]: products
			}
		}
		cartItems[products.tag].inCart += 1;
	} else {
		products.inCart = 1;
		cartItems = {
			[products.tag]: products
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products) {
	let cartCost = localStorage.getItem('totalCost');

	console.log("My cartCost is", cartCost);
	console.log(typeof cartCost);

	if (cartCost != null) {
		cartCost = parseInt(cartCost); //convert string to a number
		localStorage.setItem("totalCost", cartCost + products.price);
	} else {
		localStorage.setItem("totalCost", products.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".cart-sec__1-product-container");
	let cartCost = localStorage.getItem('totalCost');

	console.log(cartItems);
	if (cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="item">
				<img src="img/${item.tag}.gif">
				<span>${item.name}</span>
				<div class="price">$${item.price},00</div>
				<div class="quantity">
					<ion-icon class="decrease" name="remove-outline"></ion-icon>
					<span>${item.inCart}</span>
					<ion-icon name="add-outline"></ion-icon>
				</div>
				<div class="total">$${item.inCart * item.price},00</div>
				<ion-icon name="close-outline"></ion-icon>
			</div>
			`;
		});

		productContainer.innerHTML += `
		<aside>
			<div class="summary">
				<h2>Summary</h2>
				<div class="summary-subtotal">
					<div class="subtotal-title-value">
						<div class="subtotal-title">Subtotal</div>
						<div class="subtotal-value cart-sec__1-final-value" id="basket-subtotal">
							$50</div>
					</div>
				</div>
				<div class="summary-delivery">
					<h4>Shipping</h4>
					<select name="cart-sec__1-delivery" class="cart-sec__1-summary-delivery-selection">
						<option value="0" selected="selected">Select shipping</option>
						<option value="first-class">Royal Mail 1st Class</option>
						<option value="second-class">Royal Mail 2nd Class</option>
						<option value="signed-for">Royal Mail Special Delivery</option>
					</select>
				</div>
				<div class="cart-sec__1-summary-total">
					<div class="cart-sec__1-total-title-value">
						<div class="cart-sec__1-total-title">Total</div>
						<div class="cart-sec__1-total-value cart-final-value" id="basket-total">
							$${cartCost},00
						</div>
					</div>
				</div>
				<div class="cart-sec__1-summary-checkout">
				<a href="checkout.html"><button class="cart-sec__1-checkout-cta">Go to Secure Checkout</button></a>
				</div>
			</div>
		</aside>
		`;
	}

}

onLoadItemNumber();
displayCart();
// Loop all projects
const projects = document.querySelectorAll('.sec__2-filter');

projects.forEach(function (project, index) {
	// Get all tab buttons
	const buttons = project.querySelectorAll('.sec__2-filter-btn');
	// Get all projects
	const projects = project.querySelectorAll('.sec__2-filter-item');

	// Loop though all tab buttons
	buttons.forEach(function (button, index) {

		// When click on a tab button
		button.addEventListener('click', function (event) {

			// Get value of clicked button
			const current = button.getAttribute('data-value');

			// Remove all current active classes
			buttons.forEach(function (button, index) {
				button.classList.remove('sec__2-filter-btn-active');
			});

			// Add active class to clicked tab button
			button.classList.add('sec__2-filter-btn-active');

			// Loop through all projects
			projects.forEach(function (project, index) {

				// Get data attribute for categories
				const categories = project.getAttribute('data-category');
				//console.log(categories);

				// If clicked is all
				if (current == '[all]') {
					// Remove all hidden projects
					project.classList.remove('hidden-filter-item');
					// If clicked is not all
				} else {
					if (categories.includes(`${current}`)) {
						// Remove all hidden projects
						project.classList.remove('hidden-filter-item');
					} else {
						// Show all hidden projects
						project.classList.add('hidden-filter-item');
					}
				}

			});

		});

	});
});
//product quantity
var count = 1;
var countEl = document.getElementById("count");
function plus() {
	count++;
	countEl.value = count;
}
function minus() {
	if (count > 1) {
		count--;
		countEl.value = count;
	}
}

//product information tabs
const tabs = document.querySelector(".single-product__wrap");
const tabButton = document.querySelectorAll(".product-tab-button");
const contents = document.querySelectorAll(".single-product__tab-content");

tabs.onclick = e => {
	const id = e.target.dataset.id;
	if (id) {
		tabButton.forEach(btn => {
			btn.classList.remove("active");
		});
		e.target.classList.add("active");

		contents.forEach(content => {
			content.classList.remove("active");
		});
		const element = document.getElementById(id);
		element.classList.add("active");
	}
}
