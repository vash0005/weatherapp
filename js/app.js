window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone= document.querySelector('.location-timezone');
    let temperatureSection =document.querySelector(".temperature-section");
    const temperatureSpan = document.querySelector(".temperature-section span");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position =>{
            console.log(position);

            long = position.coords.longitude;
            lat = position.coords.latitude;

             const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.darksky.net/forecast/d1363b52e67060491b488aa5c571cec7/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                temperatureDegree.textContent = temperature;

               temperatureDescription.textContent = summary;

               locationTimeZone.textContent = data.timezone;

               let celsius = (temperature - 32) * (5 / 9)

               setIcons(icon, document.querySelector(".icon"));

               temperatureSection.addEventListener("click", ()=>{
                   if(temperatureSpan.textContent === "F"){
                       temperatureSpan.textContent = "C"
                       temperatureDegree.textContent = Math.floor(celsius);
                   }else{
                    temperatureSpan.textContent = "F"
                    temperatureDegree.textContent = temperature;
                   }
               })


              
            })

            function setIcons(icon, iconId){
                const skycons = new Skycons({color: "white"});
                const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                skycons.play();
                return skycons.set(iconId, Skycons[currentIcon])
            }
        });

        

    }
})