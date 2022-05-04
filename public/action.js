let weather = { 
    apiKey: "on version 2",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("NO INFORMATION FOR GIVEN CITY NAME.");
            throw new Error("NO INFORMATION FOR GIVEN CITY NAME.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { main } = data.weather[0];
      const { temp, humidity } = data.main;

      document.querySelector(".city").innerText = "Today in " + name;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".condition").innerText = main;

      if(temp >= 70) {
        document.querySelector("#shop-image").src = "img/polo-shirt.jpg";
        document.querySelector("#shop-link").href = "https://www.amazon.com/Amazon-Essentials-Regular-Fit-Quick-Dry-XX-Large/dp/B07XD4TRM3/ref=sr_1_8?crid=3MGOS8HHXPJKC&keywords=polo+shirt&qid=1651367735&sprefix=polo+shir%2Caps%2C140&sr=8-8";
      }
      else if(temp >= 50 && temp <=69) {
        document.querySelector("#shop-image").src = "img/hoodie.jpg";
        document.querySelector("#shop-link").href = "https://www.amazon.com/dp/B07BKR2NZF/ref=twister_B08MCBLYT5?_encoding=UTF8&th=1&psc=1";
      }
      else if(temp <= 49) {
        document.querySelector("#shop-image").src = "img/snowcoat.jpg";
        document.querySelector("#shop-link").href ="https://www.amazon.com/Amazon-Essentials-Lightweight-Water-Resistant-Packable/dp/B08SXDGQCP/ref=cs_sr_dp_5?crid=A933ZWGQHKXJ&keywords=puffy%2Bsnow%2Bcoat&qid=1651370760&sprefix=puffy%2Bsnow%2Bcoat%2Caps%2C95&sr=8-23&th=1";
      }

      //regardless of temparature, if rain is present, recommend a raincoat
      if(main.includes("Rain")) {
        document.querySelector("#shop-image").src = "img/raincoat.jpg";
        document.querySelector("#shop-link").href = "https://www.amazon.com/Waterproof-Jacket-Outdoor-Lightweight-Raincoat/dp/B0982N59X2/ref=sr_1_3_sspa?crid=1DQTAEH2OZK9Z&keywords=raincoat&qid=1651365054&sprefix=raincoat%2Caps%2C125&sr=8-3-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyQjZPR1lOV1pJOU9CJmVuY3J5cHRlZElkPUEwOTA0ODE3MkJIVFhIUk8wUEUxNyZlbmNyeXB0ZWRBZElkPUEwNjE2ODE4M080SkMwWThBV0M4UiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU&th=1&psc=1";
      }


    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  //user clicks search button
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  //user hits enter instead of search button
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  //default city when user lands on page, action starts here
  weather.fetchWeather("Las Vegas");















