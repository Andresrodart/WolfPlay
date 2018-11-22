var data 
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../files/tableNormalDistribution.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function init(){
    loadJSON(function(response) {
        data = JSON.parse(response);
        /*var table = document.createElement('table');
        table.classList.add("highlight");
        //var zTable = Object.keys(data)
        var count = Object.keys(data).length;
        var aux = 0;
        var carga =  document.getElementById('Cargando')
        
        var col = ['z', 'Valor', 'z', 'Valor', 'z', 'Valor', 'z', 'Valor'];
        
        var tr = table.insertRow(-1);                   // TABLE ROW.
        for (let i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (let i in data) {
            tr = table.insertRow(-1);
            for (let j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (j % 2 == 0)
                    tabCell.innerHTML = i;
                else
                    tabCell.innerHTML = data[i];
            }
            aux++;
        }
        document.getElementById('probaTable').appendChild(table);
        carga.style.visibility = 'hidden';*/
    });
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

function search(){
    document.getElementById('Cargando').innerHTML = data[ document.getElementById('z').value * 1]
}

ready(init)