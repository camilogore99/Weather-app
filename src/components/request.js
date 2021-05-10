const request = async() => {
   
   navigator.geolocation.getCurrentPosition(function(position) {
         const lat = position.coords.latitude;
         const lon = position.coords.longitude;

   });
   
   const keyApi = '3affd9aa0f0ebd9214bbbf5344c32362';
   const url = `api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${lon}}&appid={${keyApi}}`;

   const res = await fetch(url)
   const data = await res.json();
}