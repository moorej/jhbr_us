var BingMapsKey = "AlDE3Kfjbm4zONd4th3IMbzpPVFxliCg_fe70pgLUPwxU3L-lxypTOF7dEISPCbu";
var map = null;
function MakeServiceRequest(c) {
    var b = document.createElement("script");
    b.setAttribute("type", "text/javascript");
    b.setAttribute("src", c);
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(b, a)
}

function Search() {
    var a = "https://spatial.virtualearth.net/REST/v1/data/b797b4d709c443d7b96c82e05be4a57f/JHBRLocations/JHBRLocations?spatialFilter=nearby(37.932013,-121.696587,350)&$select=EntityID,Name,AddressLine,Locality,AdminDistrict,PostalCode,Phone,Latitude,Longitude,fileName&$format=json&key=" + BingMapsKey + "&Jsonp=MapResults";
    MakeServiceRequest(a)
}

function MapResults(e) {
    var n;
    var b = new Microsoft.Maps.EntityCollection();
    var f = new Microsoft.Maps.EntityCollection();
    pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
    b.push(pinInfobox);
    if (e.d.results.length != 0) {
        var k = e.d.results;
        var j = k[0].Latitude;
        var m = k[0].Latitude;
        var d = k[0].Longitude;
        var h = k[0].Longitude;
        for (var g = 0;
            g < k.length;
            ++g) {
            var l = new Microsoft.Maps.Location(k[g].Latitude, k[g].Longitude);
            var a = new Microsoft.Maps.Pushpin(l);
            a.Title = k[g].Name;
            a.Description = k[g].AddressLine + "<br/>" + k[g].Locality + ", " + k[g].AdminDistrict + " " + k[g].PostalCode + "<br /><br />" + k[g].Phone;
            f.push(a);
            Microsoft.Maps.Events.addHandler(a, "click", displayInfobox);
            if (k[g].Latitude > m) { m = k[g].Latitude } else { if (k[g].Latitude < j) { j = k[g].Latitude } } if (k[g].Longitude > h) { h = k[g].Longitude } else { if (k[g].Longitude < d) { d = k[g].Longitude } }
        } var c = { credentials: BingMapsKey, enableSearchLogo: false, mapTypeId: Microsoft.Maps.MapTypeId.road };
        mapDiv.style.visibility = "visible";
        if (map != null) { map.dispose() } map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), c);
        map.entities.push(f);
        map.entities.push(b);
        j -= 0.05;
        m += 0.05;
        d -= 0.05;
        h += 0.05;
        var o = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(j, d), new Microsoft.Maps.Location(m, h));
        map.setView({ bounds: o })
    } else { map.dispose() }
}

function displayInfobox(a) {
    pinInfobox.setOptions({ title: a.target.Title, description: a.target.Description, visible: true, offset: new Microsoft.Maps.Point(0, 25) });
    pinInfobox.setLocation(a.target.getLocation())
}

function hideInfobox(a) { pinInfobox.setOptions({ visible: false }) };
