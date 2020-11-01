function initMap(){

    const uluru = {lat: -25.344, lng: 131.036}
    apiKey = "AIzaSyD22zxuY26ljviv3FvrIAjCCc4VvQAKcyw"
    const testData = [
        {place: "uluru", lat: -25.344, lng: 131.036},
        {place: "japan", lat: 35.6762, lng:139.6503},
        {place: "london",lat: 51.5074, lng: 0.1278},
    ]
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom:13,
        center: { lat: -33.8688, lng: 151.2195 },
        mapTypeId: "roadmap",
    })

    const input = document.getElementById("pac-input")
    const searchBox = new google.maps.places.SearchBox(input)
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds())
    })
    let markers = []

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces()

        if (places.length == 0){
            return
        }

        markers.forEach((marker) => {
            marker.setMap(null)
        })
        markers = []
            // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

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
    