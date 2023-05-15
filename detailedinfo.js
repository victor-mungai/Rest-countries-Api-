let darkMode = document.querySelector(".dark_mode");
let clicked  = localStorage.getItem("darkMode") === "true" ? true : false; // Set the initial state to off
let backButton = document.querySelector(".back_button");
body = document.querySelector("body");

darkMode.addEventListener("click", function(){
    console.log("clicked");
    clicked = !clicked; // Invert the state on each click
    if (clicked) {
      darkToggle(); // Turn on the dark mode
    } else {
      lightToggle(); // Turn off the dark mode
    }
    localStorage.setItem("darkMode", clicked.toString());
  });
  document.addEventListener("DOMContentLoaded", function() {
    if (clicked) {
      darkToggle(); // Apply dark mode styles
    } else {
      lightToggle(); // Apply light mode styles
    }
  });
  window.onload = function() {
    if (clicked) {
      darkToggle(); // Apply dark mode styles
    } else {
      lightToggle(); // Apply light mode styles
    }
  };
  function darkToggle(){
    body.style.backgroundColor = "hsl(207, 26%, 17%)";
    body.style.color = "hsl(0, 0%, 100%)";
    let nav = document.querySelector("nav");
    nav.style.backgroundColor = "hsl(209, 23%, 22%)";
    backButton.style.backgroundColor = "hsl(209, 23%, 22%)";
    backButton.style.color = "hsl(0, 0%, 100%)";
    backButton.style.border = "none";
    let search = document.querySelector(".search_filter");
    search.style.border.left = "none";
    let filter = document.querySelector(".dropdown-toggle");
    filter.style.backgroundColor = "hsl(209, 23%, 22%)";
    filter.style.border = "none";
    filter.style.color ="hsl(0, 0%, 100%)";
  }
  function lightToggle(){
    body.style.backgroundColor = "hsl(0, 0%, 100%)";
    body.style.color = "hsl(200, 15%, 8%)";
    let nav = document.querySelector("nav");
    nav.style.backgroundColor = "hsl(0, 0%, 98%)";
    backButton.style.backgroundColor = "hsl(0, 0%, 98%)";
    backButton.style.color = "hsl(200, 15%, 8%)";
    backButton.style.border = "1px solid hsl(0, 0%, 80%)";
    let search = document.querySelector(".search_filter");
    search.style.border.left = "1px solid hsl(0, 0%, 80%)";
    let filter = document.querySelector(".dropdown-toggle");
    filter.style.backgroundColor = "hsl(0, 0%, 98%)";
    filter.style.border = "1px solid hsl(0, 0%, 80%)";
    filter.style.color ="hsl(200, 15%, 8%)";
  }
document.addEventListener("DOMContentLoaded", function() {
  loader.style.display = "block";
  const flagImg = document.querySelector('.svg_flag');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const inputValue = urlParams.get('inputValue');
  fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,currencies,flags,population,region,subregion,languages,topLevelDomain`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      loader.style.display = "none";
      const country = data[0]; // Assuming the API returns an array with a single country object
console.log(data);
      // Update the flag path
      const flagPath = country.flags.svg;
      flagImg.src = flagPath;

      // Update the span elements with corresponding data from the API response
      const nameSpan = document.querySelector('.detailed_name');
      const nativeNameSpan = document.querySelector('.native_name');
      const populationSpan = document.querySelector('.detailed_population');
      const regionSpan = document.querySelector('.detailed_Region');
      const subRegionSpan = document.querySelector('.detailed_subregion');
      const capitalSpan = document.querySelector('.detailed_Capital');
      const topLevelDomain = document.querySelector(".top_level_domain");
      const currencies = document.querySelector(".detailed_currencies");
      const languages = document.querySelector(".detailed_languages");


      nameSpan.textContent = country.name.common;
      nativeNameSpan.textContent = country.name.nativeName.eng ;
      populationSpan.textContent = country.population ;
      regionSpan.textContent = country.region ;
      subRegionSpan.textContent = country.subregion;
      capitalSpan.textContent = country.capital ;
      topLevelDomain.textContent =country.topLevelDomain.join(", ");
      currencies.textContent = country.currencies[0].name;
      languages.textContent = country.languages;
    })
    .catch(error => {
      loader.style.display = "none";
      console.error("Error searching for country:", error);
    });
   

});

