const map = L.map('map').setView([52.2,5.3],8);

const osm = L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19,
attribution:'© OpenStreetMap'
}
).addTo(map);

const luchtfoto = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
{
attribution:'Esri'
}
);

L.control.layers(
{
'OpenStreetMap':osm,
'Luchtfoto':luchtfoto
}
).addTo(map);

let layerCounter = 0;

function zoomNL(){
map.setView([52.2,5.3],8);
}

function voegLaagToe(naam,data){

const laag = L.geoJSON(data,{

onEachFeature:function(feature,layer){

layer.on('click',function(){

let html='';

if(feature.properties){

for(const key in feature.properties){

html +=
'<b>'+key+'</b>: '+
feature.properties[key]+
'<br>';

}

}

document.getElementById(
'featureInfo'
).innerHTML =
html || 'Geen attributen';

});

}

}).addTo(map);

if(layerCounter===0){
document.getElementById(
'layers'
).innerHTML='';
}

const id='laag'+layerCounter;

const div=document.createElement('div');

div.className='layer-item';

div.innerHTML=
'<input type="checkbox" checked id="'+id+'"> '+naam;

document
.getElementById('layers')
.appendChild(div);

document
.getElementById(id)
.addEventListener(
'change',
function(){

if(this.checked){
map.addLayer(laag);
}
else{
map.removeLayer(laag);
}

}
);

if(laag.getBounds().isValid()){
map.fitBounds(laag.getBounds());
}

layerCounter++;

}

async function verwerkBestand(file){

const ext =
file.name
.split('.')
.pop()
.toLowerCase();

if(
ext==='geojson' ||
ext==='json'
){

const txt =
await file.text();

const data =
JSON.parse(txt);

voegLaagToe(
file.name,
data
);

}
else{

alert(
'Momenteel worden alleen GeoJSON bestanden ondersteund.'
);

}

}

document
.getElementById('upload')
.addEventListener(
'change',
async function(e){

for(const file of e.target.files){

await verwerkBestand(file);

}

}
);

const dropzone =
document.getElementById(
'dropzone'
);

dropzone.addEventListener(
'dragover',
function(e){
e.preventDefault();
}
);

dropzone.addEventListener(
'drop',
async function(e){

e.preventDefault();

for(const file of e.dataTransfer.files){

await verwerkBestand(file);

}

}
);

map.on(
'mousemove',
function(e){

document.getElementById(
'coords'
).innerHTML =
'Lat: '+
e.latlng.lat.toFixed(6)+
'<br>Lon: '+
e.latlng.lng.toFixed(6);

}
);
