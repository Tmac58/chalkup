const apiKey = "AIzaSyCi1mGkCAUSHtMZ6pRCWg8VoVhkj5ROb1c"


function init() {

  const successCallback = (async(position) => {
    const test = [
      {lat: 40.7178, lng: -74.0431},
      {lat: 40.7017, lng: -74.3222},
      {lat: 40.7128, lng: -74.0060}
    ]
    console.log(position)
    const longitude = position.coords.longitude
    const latitude = position.coords.latitude

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=rock+climbing&types=establishment&location=40.7017,-74.3222&radius=500&key=${apiKey}`
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=rock+climbing&location=${latitude},${longitude}&radius=10000&fields=name,photos,formatted_address,geometry,opening_hours,rating,icon&key=${apiKey}`
    
    //get results 

    const result = await fetch(proxyurl + url)
    const data = await result.json()


    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 13,
    });
    console.log(data)
    for (let i = 0 ; i<data.results.length; i++){
      let location = data.results[i].geometry.location
      new google.maps.Marker({
          position: location,
          map:map,
      })
      
  }
  })
  const errorCallback = (error) => {
    console.log(error)
  }
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

}


  
   /* const getPlaces = async(apiKey) => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        //const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=rock+climbing&types=establishment&location=40.7017,-74.3222&radius=500&key=${apiKey}`
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=rock+gym&types=establishment&location=40.7017,-74.3222&radius=500&key=${apiKey}`
    
    
        const result = await fetch(proxyurl + url)
        console.log(result.json())
    }
    
    const mapMarker = (data) => {
        for (let i = 0 ; i<data.length; i++){
            const location = data[i]
            console.log(location)
            const latLng = {lat:location.lat, lng:location.lng}
            console.log(latLng)
            new google.maps.Marker({
                position:latLng,
                map:map,
            })
        }
    }
    mapMarker(testData)
    getPlaces(apiKey)*/
    //}