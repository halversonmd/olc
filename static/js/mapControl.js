let OpenLocationCode = require('./openlocationcode.js')
let gmaps = require('./gmaps.js')

class MapControl {
    constructor(globalMap) {
      this.globalMap = globalMap
      this.poly = new google.maps.Rectangle()
      this.marker = new google.maps.Marker()
    }
    newMap(olc_size) {
      var initMap = new google.maps.Map(document.getElementById('map-canvas'), {
          center: new google.maps.LatLng(40.742192046649755, -73.99111747741699),
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scaleControl: true});
      initMap.setTilt(0);
      this.globalMap = initMap
    }
    clearPoly() {
      this.poly.setMap(null);
    }
    placeMarkerAndPanTo(latLng, olc_size) {
      var currentCode = OpenLocationCode.encode(latLng.lat(), latLng.lng(), olc_size);
      var codeAreac = OpenLocationCode.decode(currentCode);
      var newBoundc = new google.maps.LatLngBounds(
        new google.maps.LatLng(codeAreac.latitudeLo, codeAreac.longitudeLo),
        new google.maps.LatLng(codeAreac.latitudeHi, codeAreac.longitudeHi));
      this.clearPoly()
      this.poly.setOptions({
        map: this.globalMap,
        bounds: newBoundc,
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#e51c23',
        fillOpacity: 0.6,
        clickable: false
      });
      this.marker.setOptions({
        position: latLng,
        map: this.globalMap
      });
      self.lat = latLng.lat();
      self.lon = latLng.lng();
      self.currentCode = currentCode;
    }
    loadOlc() {
      var latlngs = [[40.817271964012974, -74.03211564029554], [40.817271964012974, -73.97716188630599], [40.76721868577083, -74.08706939428511], [40.76721868577083, -74.03219843277579], [40.76721868577083, -73.97732747126648], [40.76721868577083, -73.92245650975717], [40.71716540752868, -74.08706939428511], [40.71716540752868, -74.03228095473358], [40.71716540752868, -73.97749251518206], [40.71716540752868, -73.92270407563053], [40.66711212928654, -74.03236320723352], [40.66711212928654, -73.97765702018192]]
      var olcCodes = new Array()
      for (var i=0; i<latlngs.length; ++i){

        var my_lat = latlngs[i][0]
        var my_lon = latlngs[i][1]

        var currentCode = OpenLocationCode.encode(my_lat, my_lon, 6);
        olcCodes.push(currentCode)

        var codeArea = OpenLocationCode.decode(currentCode);

        var newBound = new google.maps.LatLngBounds(
            new google.maps.LatLng(codeArea.latitudeLo, codeArea.longitudeLo),
            new google.maps.LatLng(codeArea.latitudeHi, codeArea.longitudeHi));

        var poly = new google.maps.Rectangle({
          map: this.globalMap,
          bounds: newBound,
          strokeColor: '#000000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#e51c23',
          fillOpacity: 0.6,
          clickable: false
        });
      };
      var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      var centerMarc = new google.maps.Marker({
          position: {lat: 40.742192046649755, lng: -73.99111747741699},
          map: this.globalMap,
          icon: image
        });
      var circleCenter1 = new google.maps.LatLng(40.742192046649755, -73.99111747741699)
      var miles = 5
      var cityCircle = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 0.5,
        map: this.globalMap,
        center: circleCenter1,
        radius: miles*1609.34
      });
    }
    refreshPage() {
      window.location.reload()
    }
    clickData() {
      return {
        lat: self.lat,
        lon: self.lon,
        olcCode: self.currentCode
      }
    }
  }


export default MapControl;