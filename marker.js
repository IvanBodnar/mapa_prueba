
function onEachFeature(feature, layer) {
    if (feature.properties) {
        var ft = feature.properties;
        layer.bindPopup(ft.mes.bold().fontcolor('red').fontsize(3) + '<br>'
                        + 'Id: ' + ft.id + '<br>'
                        + 'Lugar: ' + ft.lugar + '<br>');
    }
};


$(document).ready(function(){
      var markers = L.markerClusterGroup();
      $('#meses').change(function(){

      markers.clearLayers();
      var mes = $('#meses').val();
      $.ajax({
        url:'http://104.236.39.222/siniestros/api/search/mes/'.replace('mes', mes),
        datatype: 'jsonp',
        data: {},
        jsonpCallback: 'fetchData,
        type: 'GET',
        success: function(data){
          var capa = L.geoJson(data, {
            onEachFeature: onEachFeature
          });
          markers.addLayer(capa);
          map.addLayer(markers);
      }
    });
  });
});
