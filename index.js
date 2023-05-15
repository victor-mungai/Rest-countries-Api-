let darkMode = document.querySelector(".dark_mode");
let body = document.querySelector("body");
let clicked = false; // Set the initial state to off
let loader = document.getElementById("loader"); // get the loader element
loader.style.display = "none";
let input = document.querySelector("input");

input.addEventListener('keydown', function(event) {
  if (event.code === 'Enter') {
    // Enter key was pressed
    loader.style.display = "block";
    fetch(`https://restcountries.com/v3.1/name/${input.value}?fields=name,capital,currencies,flags,population,region`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then(data => {
        loader.style.display = "none";
        let population = document.querySelector(".population");
        let countries = document.querySelector(".countries");
        countries.innerHTML = ``;
        data.forEach(item => {
          population.textContent = item.population;
          countries.innerHTML += `
          <div class="country" onclick="clickedIn('${input.value}')">
            <div class="country_flag">
              <img src="${item.flags.png}" alt="">
            </div>
            <div class="country_info">
              <div class="country_name">${item.name.common}</div>
              <div class="country_population">Population: <span class="population">${item.population}</span></div>
              <div class="country_region">Region: <span class="Region">${item.region}</span></div>
              <div class="country_capital">Capital: <span class="Capital">${item.capital}</span></div>
            </div>
          </div>
          `;
        });
      })
      .catch(error => {
        loader.style.display = "none";
        input.value = ""; // clear input value
        console.error("Error searching for country:", error);
      });
  }
});

function clickedIn(inputValue) {
  console.log("clicked");
  fetch(`https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,currencies,flags,population,region`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      console.log("Response data:", data);

      const flagPath = data[0]?.flags?.svg;
      console.log("Flag path:", flagPath);

      const flagImg = document.querySelector('.svg_flag');
      if (flagImg && flagPath) {
        flagImg.src = flagPath;
      }

      // Navigate to "detailedinfo.html" after setting the flagImg.src
     
    })
    .catch(error => {
      loader.style.display = "none";
      input.value = ""; // clear input value
      console.error("Error searching for country:", error);
    });
    window.location.href = `detailedinfo.html?inputValue=${inputValue}`;
}



    
darkMode.addEventListener("click", function(){
  console.log("clicked");
  clicked = !clicked; // Invert the state on each click
  if (clicked) {
    darkToggle(); // Turn on the dark mode
  } else {
    lightToggle(); // Turn off the dark mode
  }
});
function darkToggle(){
  body.style.backgroundColor = "hsl(207, 26%, 17%)";
  body.style.color = "hsl(0, 0%, 100%)";
  let countries = document.querySelector(".country");
  countries.style.backgroundColor = "hsl(209, 23%, 22%)";
  let nav = document.querySelector("nav");
  nav.style.backgroundColor = "hsl(209, 23%, 22%)";
  input.style.backgroundColor = "hsl(209, 23%, 22%)";
  input.style.color = "hsl(0, 0%, 100%)";
  input.placeholder.color = "hsl(0, 0%, 100%)";
  input.style.border = "none";
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
  let countries = document.querySelector(".country");
  countries.style.backgroundColor = "hsl(0, 0%, 98%)";
  let nav = document.querySelector("nav");
  nav.style.backgroundColor = "hsl(0, 0%, 98%)";
  let input = document.querySelector("input");
  input.style.backgroundColor = "hsl(0, 0%, 98%)";
  input.style.color = "hsl(200, 15%, 8%)";
  input.placeholder.color = "hsl(200, 15%, 8%)";
  input.style.border = "1px solid hsl(0, 0%, 80%)";
  let search = document.querySelector(".search_filter");
  search.style.border.left = "1px solid hsl(0, 0%, 80%)";
  let filter = document.querySelector(".dropdown-toggle");
  filter.style.backgroundColor = "hsl(0, 0%, 98%)";
  filter.style.border = "1px solid hsl(0, 0%, 80%)";
  filter.style.color ="hsl(200, 15%, 8%)";
}
document.addEventListener("DOMContentLoaded", function() {
  fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,region')
  .then(response => response.json())
  .then(data => {
    let population = document.querySelector(".population");
    let countries = document.querySelector(".countries");
    countries.innerHTML = ``;
    let counter = 0; // Counter variable to limit the loop
    
    data.forEach(item => {
      if (counter < 8) { // Limit the loop to 8 times
        population.textContent = item.population;
        countries.innerHTML += `
          <div class="country" onclick="clickedIn('${item.name.common}')">
            <div class="country_flag">
              <img src="${item.flags.png}" alt="">
            </div>
            <div class="country_info">
              <div class="country_name">${item.name.common}</div>
              <div class="country_population">Population: <span class="population">${item.population}</span></div>
              <div class="country_region">Region: <span class="Region">${item.region}</span></div>
              <div class="country_capital">Capital: <span class="Capital">${item.capital}</span></div>
            </div>
          </div>
        `;
        counter++; // Increment the counter
      }
    });
  })
  .catch(error => console.error(error));
});


  
  let dropdownTitle = document.querySelector(".dropdown a");
  let africaFilter = document.querySelector(".africa_filter");
  africaFilter.addEventListener("click", () =>{
    dropdownTitle.textContent = "Africa";
    fetch('https://restcountries.com/v3.1/region/africa?fields=name,capital,currencies,flags,population,region')
  .then(response => response.json())
  .then(data => {
    let population = document.querySelector(".population");
      let countries = document.querySelector(".countries");
      countries.innerHTML = ``;
      data.forEach(item => {
        population.textContent = item.population;
        countries.innerHTML+=`
        <div class="country"onclick="clickedIn('${item.name.common}')">
       <div class="country_flag">
             <img src="${item.flags.png}" alt="">
       </div>
       <div class="country_info">
               <div class="country_name">${item.name.common}</div>
               <div class="country_population">Population: <span class="population">${item.population}</span></div>
               <div class="country_region">Region: <span class="Region">${item.region}</span></div>
               <div class="country_capital">Capital: <span class="Capital"></span>${item.capital}</div>
       </div>
    </div>`
    })
   
  })
  .catch(error => console.error(error));
  })


  let americaFilter = document.querySelector(".america_filter");
  americaFilter.addEventListener("click", () =>{
    dropdownTitle.textContent = "America";
    fetch('https://restcountries.com/v3.1/region/america?fields=name,capital,currencies,flags,population,region')
    .then(response => response.json())
    .then(data => {
      let population = document.querySelector(".population");
      let countries = document.querySelector(".countries");
      countries.innerHTML = ``;
      data.forEach(item => {
        population.textContent = item.population;
        countries.innerHTML+=`
        <div class="country" onclick="clickedIn('${item.name.common}')">
       <div class="country_flag">
             <img src="${item.flags.png}" alt="">
       </div>
       <div class="country_info">
               <div class="country_name">${item.name.common}</div>
               <div class="country_population">Population: <span class="population">${item.population}</span></div>
               <div class="country_region">Region: <span class="Region">${item.region}</span></div>
               <div class="country_capital">Capital: <span class="Capital"></span>${item.capital}</div>
       </div>
    </div>`
    })
  })
    .catch(error => console.error(error));
    })


  let asiaFilter = document.querySelector(".asia_filter");
  asiaFilter.addEventListener("click", () =>{
    dropdownTitle.textContent = "Asia";
    fetch('https://restcountries.com/v3.1/region/asia?fields=name,capital,currencies,flags,population,region')
  .then(response => response.json())
  .then(data => {
    let population = document.querySelector(".population");
      let countries = document.querySelector(".countries");
      countries.innerHTML = ``;
      data.forEach(item => {
        population.textContent = item.population;
        countries.innerHTML+=`
        <div class="country" onclick="clickedIn('${item.name.common}')">
       <div class="country_flag">
             <img src="${item.flags.png}" alt="">
       </div>
       <div class="country_info">
               <div class="country_name">${item.name.common}</div>
               <div class="country_population">Population: <span class="population">${item.population}</span></div>
               <div class="country_region">Region: <span class="Region">${item.region}</span></div>
               <div class="country_capital">Capital: <span class="Capital"></span>${item.capital}</div>
       </div>
    </div>`
    })
    .catch(error => console.error(error));
  })
});


  let europeFilter = document.querySelector(".europe_filter");
  europeFilter.addEventListener("click", () =>{
    dropdownTitle.textContent = "Europe";
    fetch('https://restcountries.com/v3.1/region/europe?fields=name,capital,currencies,flags,population,region')
  .then(response => response.json())
  .then(data => {
    let population = document.querySelector(".population");
      let countries = document.querySelector(".countries");
      countries.innerHTML = ``;
      data.forEach(item => {
        population.textContent = item.population;
        countries.innerHTML+=`
        <div class="country" onclick="clickedIn('${item.name.common}')">
       <div class="country_flag">
             <img src="${item.flags.png}" alt="">
       </div>
       <div class="country_info">
               <div class="country_name">${item.name.common}</div>
               <div class="country_population">Population: <span class="population">${item.population}</span></div>
               <div class="country_region">Region: <span class="Region">${item.region}</span></div>
               <div class="country_capital">Capital: <span class="Capital"></span>${item.capital}</div>
       </div>
    </div>`
    })
    .catch(error => console.error(error));
  })
});


  let oceaniaFilter = document.querySelector(".oceania_filter");
  oceaniaFilter.addEventListener("click", () =>{
    dropdownTitle.textContent = "Oceania";
    fetch('https://restcountries.com/v3.1/region/oceania?fields=name,capital,currencies,flags,population,region')
  .then(response => response.json())
  .then(data => {
    let population = document.querySelector(".population");
      let countries = document.querySelector(".countries");
      countries.innerHTML = ``;
      data.forEach(item => {
        population.textContent = item.population;
        countries.innerHTML+=`
        <div class="country" onclick="clickedIn('${item.name.common}')">
       <div class="country_flag">
             <img src="${item.flags.png}" alt="">
       </div>
       <div class="country_info">
               <div class="country_name">${item.name.common}</div>
               <div class="country_population">Population: <span class="population">${item.population}</span></div>
               <div class="country_region">Region: <span class="Region">${item.region}</span></div>
               <div class="country_capital">Capital: <span class="Capital"></span>${item.capital}</div>
       </div>
    </div>`
    })
  })
  .catch(error => console.error(error));
});
