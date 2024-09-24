let weather = {
   apiKey : "549274f46f543ddae70f12a72756b46a",
   unsplashKey: "pHz1LSDYfZrlD7s15Q8nwlPYP020DzacXo7E-XtAKts",


   // Function to fetch weather data
   fetchWeather: function (city){

    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city
        + "&units=metric&appid="
        + this.apiKey
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
   },

   //function to display weather data

   displayWeather: function (data) {
    const { name } =data;
    const{ icon, description} = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
   console.log(name,icon,description,humidity,speed)
    document.querySelector(".city").innerText = "weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"; 
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity" + humidity + "%";
    document.querySelector(".speed").innerText = "Wind Speed:" + speed + "km/h" ;
    this.fetchUnsplashImage(name);
   },
   // Function to fetch background image from Unsplash
fetchUnsplashImage: function(city) {
    fetch(
       "https://api.unsplash.com/photos/random?query=" 
        + city 
        + "&client_id=" 
        + this.unsplashKey 
    )
    .then((response) => response.json())
    .then((data) => {
        const imageUrl = data.urls.regular;
        this.updateBackground(imageUrl);
    })
    .catch((error) => {
        console.error("Error fetching Unsplash image:", error);
});
},
updateBackground: function(imageUrl) {
    // Set the background image and remove the placeholder class
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
    document.body.classList.remove("placeholder");
    document.body.classList.add("unsplash");
    console.log("Background image updated successfully:", imageUrl);
},



// make the search bar respond
search:function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
},
};

document.querySelector(".search button").addEventListener("click", function(){
weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
      weather.search();
  }
   });