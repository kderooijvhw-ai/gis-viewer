const map = new ol.Map({
target: 'map',
layers: [
new ol.layer.Tile({
source: new ol.source.OSM()
})
],
view: new ol.View({
center: ol.proj.fromLonLat([5.3,52.2]),
zoom: 8
})
});

document
.getElementById("zoomNL")
.addEventListener("click",function(){

map.getView().animate({
center: ol.proj.fromLonLat([5.3,52.2]),
zoom: 8
});

});

map.on("pointermove",function(evt){

const coord =
ol.proj.toLonLat(evt.coordinate);

document
.getElementById("coords")
.innerHTML =
"Lon: "
+
coord[0].toFixed(6)
+
"<br>Lat: "
+
coord[1].toFixed(6);

});

document
.getElementById("upload")
.addEventListener(
"change",
function(e){

const files =
e.target.files;

if(files.length===0){
return;
}

document
.getElementById("layers")
.innerHTML =
files.length
+
" bestand(en) geselecteerd";

}
);

const dropzone =
document.getElementById(
"dropzone"
);

dropzone.addEventListener(
"dragover",
function(e){
e.preventDefault();
}
);

dropzone.addEventListener(
"drop",
function(e){

e.preventDefault();

document
.getElementById("layers")
.innerHTML =
e.dataTransfer.files.length
+
" bestand(en) gesleept";

}
);
