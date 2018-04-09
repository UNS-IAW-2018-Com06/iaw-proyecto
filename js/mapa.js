function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: -37.0560032, lng: -65.9002859 }
    });
    return map;
}