"use strict";
//DOM Structures from webpage
let pageNav = document.getElementById('pageNav');
let statusContainer = document.getElementById('statusMessage');
let contentContainer = document.getElementById('mainContent');

let acmeURL = "/acme/js/acme.json";



function loggingData(acmeURL){
    fetch(acmeURL)
            console.log(data);
            }

fetchNav(acmeURL);
function fetchNav(acmeURL){
    fetch(acmeURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function(data){
            let nav = []
            for (let i=0; i<data.Navigation.nav.length; i++){
                nav[i] = data.Navigation.nav[i];
            }
            buildNav(nav);
        })
}

function buildNav(navItems){
    let ul = document.getElementById("navUl");

    for(let i=0; i<navItems.length; i++){
        let li = document.createElement('li');
        let text = document.createTextNode(navItems[i]);
        li.appendChild(text);
        li.setAttribute("id", "nav" + navItems[i]);
        ul.appendChild(li);
    }
    clickListeners();
}

function clickListeners(){
    document.getElementById("navHome").addEventListener("click", clickHome);

    let anvils = document.querySelector("#navAnvils");
    anvils.myParam = "Anvils";
    anvils.addEventListener("click", clickNav);
    
    let explosives = document.querySelector("#navExplosives");
    explosives.myParam = "Explosives";
    explosives.addEventListener("click", clickNav);

    let decoys = document.querySelector("#navDecoys");
    decoys.myParam = "Decoys";
    decoys.addEventListener("click", clickNav);
    
    let traps = document.querySelector("#navTraps");
    traps.myParam = "Traps"
    traps.addEventListener("click", clickNav);
}

function clickHome(){
    document.getElementById("home").setAttribute("class", "");
    document.getElementById("items").setAttribute("class", "hide");
}

function clickNav(event){
    fetchData(acmeURL);
    function fetchData(acmeURL){
    fetch(acmeURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            document.getElementById("home").setAttribute("class", "hide");
            document.getElementById("items").setAttribute("class", "");

            let o = data[event.target.myParam];
            console.log("Ya done clicked " + event.target.myParam);
            document.getElementById("item_title").innerHTML = o.name;
            document.getElementById("itemPicture").setAttribute("src", o.path);
            document.getElementById("item_desc").innerHTML = o.description;
            document.getElementById("item_manufac").innerHTML = o.manufacturer;
            document.getElementById("item_reviews").innerHTML = o.reviews + "/5 stars";
            document.getElementById("item_price").innerHTML = "$" + o.price;
        })
    }
}