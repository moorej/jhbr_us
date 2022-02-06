var BingMapsKey = "AlDE3Kfjbm4zONd4th3IMbzpPVFxliCg_fe70pgLUPwxU3L-lxypTOF7dEISPCbu";
var map = null;
function MakeServiceRequest(c) {
    var b = document.createElement("script");
    b.setAttribute("type", "text/javascript");
    b.setAttribute("src", c);
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(b, a)
}

function Search(b) {
    var a = "https://spatial.virtualearth.net/REST/v1/data/b797b4d709c443d7b96c82e05be4a57f/JHBRLocations/JHBRLocations('" + b + "')?&$select=EntityID,Latitude,Longitude&$format=json&key=" + BingMapsKey + "&Jsonp=MapResult";
    MakeServiceRequest(a)
}

function MapResult(a) {
    loc = a.d;
    var b = { center: new Microsoft.Maps.Location(loc.Latitude, loc.Longitude), credentials: BingMapsKey, enableSearchLogo: false, mapTypeId: Microsoft.Maps.MapTypeId.road, zoom: 13 };
    var c = new Microsoft.Maps.EntityCollection();
    c.push(new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(loc.Latitude, loc.Longitude)));
    var d = new Microsoft.Maps.Map(document.getElementById("mapDiv"), b);
    d.entities.push(c)
};