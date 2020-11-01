function initMap(){

    const uluru = {lat: -25.344, lng: 131.036}
    apiKey = "AIzaSyD22zxuY26ljviv3FvrIAjCCc4VvQAKcyw"
    const testData = [
        {place: "uluru", lat: -25.344, lng: 131.036},
        {place: "japan", lat: 35.6762, lng:139.6503},
        {place: "london",lat: 51.5074, lng: 0.1278},
    ]
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom:4,
        center: new google.maps.LatLng(2.8, -187.3),
    })
    
    const getPlaces = async(apiKey) => {
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
    getPlaces(apiKey)
    }
    