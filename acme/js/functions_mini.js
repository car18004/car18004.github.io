"use strict";let pageNav=document.getElementById("pageNav"),statusContainer=document.getElementById("statusMessage"),contentContainer=document.getElementById("mainContent"),acmeURL="/acme/js/acme.json";function fetchNav(e){fetch(e).then(function(e){if(e.ok)return e.json();throw new ERROR("Network response was not OK.")}).then(function(e){let t=[];for(let n=0;n<e.Navigation.nav.length;n++)t[n]=e.Navigation.nav[n];buildNav(t)})}function buildNav(e){let t=document.getElementById("navUl");for(let n=0;n<e.length;n++){let c=document.createElement("li"),i=document.createTextNode(e[n]);c.appendChild(i),c.setAttribute("id","nav"+e[n]),t.appendChild(c)}clickListeners()}function clickListeners(){document.getElementById("navHome").addEventListener("click",clickHome);let e=document.querySelector("#navAnvils");e.myParam="Anvils",e.addEventListener("click",clickNav);let t=document.querySelector("#navExplosives");t.myParam="Explosives",t.addEventListener("click",clickNav);let n=document.querySelector("#navDecoys");n.myParam="Decoys",n.addEventListener("click",clickNav);let c=document.querySelector("#navTraps");c.myParam="Traps",c.addEventListener("click",clickNav)}function clickHome(){document.getElementById("home").setAttribute("class",""),document.getElementById("items").setAttribute("class","hide")}function clickNav(e){!function(t){fetch(t).then(function(e){if(e.ok)return e.json();throw new ERROR("Network response was not OK.")}).then(function(t){document.getElementById("home").setAttribute("class","hide"),document.getElementById("items").setAttribute("class","");let n=t[e.target.myParam];console.log("Ya done clicked "+e.target.myParam),document.getElementById("item_title").innerHTML=n.name,document.getElementById("itemPicture").setAttribute("src",n.path),document.getElementById("item_desc").innerHTML=n.description,document.getElementById("item_manufac").innerHTML=n.manufacturer,document.getElementById("item_reviews").innerHTML=n.reviews+"/5 stars",document.getElementById("item_price").innerHTML="$"+n.price})}(acmeURL)}console.log(data),fetchNav(acmeURL);