window.onload = data();
function data(){
    var url = "./assets/info.json";
    $.ajax({
    method: "GET",
    cache: false,
    url: url,
    success: function(data) {
        window.onmouseover=function(e) {
            var x = e.target.className;
            var res = x.replace("grid-item item", "");
            if(res>0&&res<119){
                this.document.getElementById("name").innerHTML = data.elements[res-1].name;
                this.document.getElementById("atomicNum").innerHTML = data.elements[res-1].number;
                this.document.getElementById("atomicWeight").innerHTML = data.elements[res-1].atomic_mass;
                this.document.getElementById("eConfig").innerHTML = data.elements[res-1].electron_configuration;
                this.document.getElementById("category").innerHTML = data.elements[res-1].category;
                var scientist = data.elements[res-1].discovered_by;
                if(scientist!=null)
                    this.document.getElementById("discoveredBy").innerHTML = "Discovery: " + data.elements[res-1].discovered_by;
                else
                    this.document.getElementById("discoveredBy").innerHTML = "";
            }
    };
    },
    error: function(error) {  
        console.log("Error");
    },
    });
}
function modeChange(){
    document.body.className = document.body.className == "dark" ? "light" : "dark";
    document.getElementById("modeButton").className = document.getElementById("modeButton").className == "far fa-moon" ? "far fa-sun" : "far fa-moon";
}