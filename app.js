const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

const apiKey = "edc228562ac0a8aa3116d41c0687cf56";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cityName = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      const { weather, main, sys, name } = response.data;
      // const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
      const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h2 class='city-name' data-name=${name},${sys.country}>
                <span>${name}</span>
                <span class="country">${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
            <figure>
                <img class='city-icon' src=${icon} alt ='city' >
                <figurecaption>${weather[0].description}</figurecaption>
            </figure>
            </h2>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
      input.value = "";
      msg.innerText = "";
    })
    .catch((error) => {
      error.response.status == 404
        ? (msg.innerText = "Search for a valid city")
        : (msg.innerText = "");
    });
});
