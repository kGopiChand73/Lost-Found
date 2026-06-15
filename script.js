// VIEW ITEM DETAILS
function viewDetails(name, location, description){

let item = {
name: name,
location: location,
description: description
};

localStorage.setItem("selectedItem", JSON.stringify(item));

window.location.href = "details.html";

}


// REGISTER USER
function registerUser(event){

event.preventDefault();

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
let password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

users.push({name,email,phone,password});

localStorage.setItem("users", JSON.stringify(users));

alert("Registration Successful");

window.location.href="login.html";

}


// LOGIN USER
function loginUser(event){

event.preventDefault();

let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let user = users.find(u => u.email === email && u.password === password);

if(user){

localStorage.setItem("loggedInUser", JSON.stringify(user));

alert("Login successful");

window.location.href="index.html";

}else{

alert("Invalid login details");

}

}


// POST LOST ITEM
function addLostItem(event){

event.preventDefault();

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){
alert("Please login to post an item");
window.location.href="login.html";
return;
}

let name = document.getElementById("itemName").value;
let description = document.getElementById("description").value;
let location = document.getElementById("location").value;
let date = document.getElementById("date").value;

let imageInput = document.getElementById("image");

let reader = new FileReader();

reader.onload = function(){

let item = {
name:name,
description:description,
location:location,
date:date,
image:reader.result,
owner:user.name,
phone:user.phone,
type:"Lost Item"
};

let items = JSON.parse(localStorage.getItem("items")) || [];

items.push(item);

localStorage.setItem("items", JSON.stringify(items));

alert("Lost Item Posted Successfully");

window.location.href="index.html";

};

if(imageInput.files[0]){
reader.readAsDataURL(imageInput.files[0]);
}

}


// POST FOUND ITEM
function addFoundItem(event){

event.preventDefault();

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){
alert("Please login to post an item");
window.location.href="login.html";
return;
}

let name = document.getElementById("foundName").value;
let description = document.getElementById("foundDescription").value;
let location = document.getElementById("foundLocation").value;
let date = document.getElementById("foundDate").value;

let imageInput = document.getElementById("foundImage");

let reader = new FileReader();

reader.onload = function(){

let item = {
name:name,
description:description,
location:location,
date:date,
image:reader.result,
owner:user.name,
phone:user.phone,
type:"Found Item"
};

let items = JSON.parse(localStorage.getItem("items")) || [];

items.push(item);

localStorage.setItem("items", JSON.stringify(items));

alert("Found Item Posted Successfully");

window.location.href="index.html";

};

if(imageInput.files[0]){
reader.readAsDataURL(imageInput.files[0]);
}

}


// LOAD ITEMS ON HOMEPAGE
function loadItems(){

let items = JSON.parse(localStorage.getItem("items")) || [];

document.getElementById("itemCount").innerText = items.length;

let container = document.getElementById("itemsContainer");

if(!container) return;

container.innerHTML="";

items.forEach((item,index)=>{

container.innerHTML += `
<div class="card ${item.type==='Lost Item' ? 'lost':'found'}">

<img src="${item.image}" style="width:100%;height:150px;object-fit:cover">

<h3>${item.name}</h3>

<p><strong>${item.type}</strong></p>

<p>Location: ${item.location}</p>

<p>Date: ${item.date}</p>

<p>Status: ${item.status || "Active"}</p>

<p>Owner: ${item.owner}</p>

<button onclick="contactOwner('${item.phone}','contact${index}')">
Contact Owner
</button>

<p id="contact${index}"></p>

<button onclick="viewDetails('${item.name}','${item.location}','${item.description}')">
View Details
</button>

<button onclick="deleteItem(${index})">
Delete
</button>

</div>
`;

});

}

loadItems();


// DELETE ITEM
function deleteItem(index){

let items = JSON.parse(localStorage.getItem("items")) || [];

items.splice(index,1);

localStorage.setItem("items", JSON.stringify(items));

loadItems();

}


// CONTACT OWNER
function contactOwner(phone,id){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){

alert("Please login to contact the owner");
window.location.href="login.html";
return;

}

document.getElementById(id).innerText = "Owner Contact: " + phone;

}
function logoutUser(){

localStorage.removeItem("loggedInUser");

alert("Logged out successfully");

window.location.reload();

}
function toggleDarkMode(){
document.body.classList.toggle("dark-mode");
}
function updateNavbar(){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

let loginBtn = document.getElementById("loginBtn");
let registerBtn = document.getElementById("registerBtn");
let logoutBtn = document.getElementById("logoutBtn");

if(user){

loginBtn.style.display="none";
registerBtn.style.display="none";
logoutBtn.style.display="inline-block";

}else{

loginBtn.style.display="inline-block";
registerBtn.style.display="inline-block";
logoutBtn.style.display="none";

}

}

updateNavbar();