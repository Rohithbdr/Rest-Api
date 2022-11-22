
const search = document.querySelector("#search-bar");
let render = document.getElementById("render")
let btn = document.getElementById("btn");
const cross = document.querySelector(".cross");

const mode = document.querySelector(".cont1-child");


let dropDown = document.querySelector("#dropDown");



let americaRegion;
let africaRegion;
let asiaRegion;
let europeRegion;
let oceaniaRegion;

let searchInput;

let iconBg = document.querySelector(".icon-bg");

mode.onclick = (event) => {

    let modeText = document.querySelector(".modeContent");
    let modeIcon = document.querySelector(".modeIcon");
    let bg = document.querySelector(".background");

    bg.classList.toggle("theme");

   if(modeText.textContent === "Dark Mode") {
    modeText.textContent = "Light Mode";
    modeIcon.textContent = "light_mode";
    iconBg.style.transform = "translateX(30px)";

   } else {
    modeText.textContent = "Dark Mode";
    modeIcon.textContent = "dark_mode";
    iconBg.style.transform = "translateX(1px)";
    
   }

    

}



function displayData(data) {
   const template = Handlebars.compile(document.querySelector("#template").innerHTML);
   const create = template({data});
    document.querySelector("#render").innerHTML = create;   
}

const searchData = (fn , delay) => {
    let timer; 

    return function (...args) {
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args);
        } , delay);
    }
}



search.addEventListener('keyup' ,  searchData((event) => {


    searchInput = search.value;

    if(searchInput === "") {
        cross.style.opacity = "0";
    } else {
        cross.style.opacity = "1";
    }

    // let countryCode = jsonData.filter(data => data.altSpellings[0].toLowerCase() === searchInput)
    // displayData(countryCode);

    let filteredArray = jsonData.filter(each => each.name.common.toLowerCase().includes(searchInput));
    displayData(filteredArray);
  
},300));

cross.onclick = () => {
    search.value = "";

    if(search.value === ""){
        cross.style.opacity = "0";
    }
    
    displayData(jsonData)
}



dropDown.onchange = async function() {
    
    let express = await dropDown.value;
    
    switch(express) {

        case "Africa":  displayData(africaRegion);
        break;

        case "America": displayData(americaRegion);
        break; 
        
        case "Asia": displayData(asiaRegion);
        break;

        case "Europe":  displayData(europeRegion);
        break;

        case "Oceania": displayData(oceaniaRegion);
        break;

        default: "hey";
        break;
    }               
}




let jsonData;

let resting = async function() {

    let response = await fetch("https://restcountries.com/v3.1/all");
    jsonData = await response.json();
    displayData(jsonData);


    americaRegion = jsonData.filter(each => each.region.toLowerCase().includes("americas"));
    africaRegion = jsonData.filter(each => each.region.toLowerCase().includes("africa"));
    asiaRegion = jsonData.filter(each => each.region.toLowerCase().includes("asia"));
    europeRegion = jsonData.filter(each => each.region.toLowerCase().includes("europe"));
    oceaniaRegion = jsonData.filter(each => each.region.toLowerCase().includes("oceania"));
}

resting();