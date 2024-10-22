var db = firebase.database();

var update = document.getElementById('update');
update.disabled = true;

function value(request){
    return  document.getElementById(request).value;
}
function asignation(request,response){
    return  document.getElementById(request).value=response;
}
function printHTML(request,response){
    return document.getElementById(request).innerHTML+=response;
}
function inHTML(request,response){
    return document.getElementById(request).innerHTML=response;
}
function dateActuality(){
    var fh = new Date();
    return fh.getFullYear()+"-"+(fh.getMonth()+1)+"-"+fh.getDate()+" "+fh.getHours()+":"+fh.getMinutes();
}
function dateActualityReg(){
    var fh = new Date();
    return (fh.getMonth()+1)+"-"+fh.getDate();
}
function hourReg(){
    var fh = new Date();
    return fh.getHours()+":"+fh.getMinutes();
}
function table(user,nombre,area,date,descuento,costo,asistencia,total){
    return '<tr><td>'+user+'</td><td>'+nombre+'</td><td>'+area+'</td><td>'+date+'</td><td>'+descuento+
    '</td><td>'+costo+'</td><td>'+asistencia+'</td><td>'+total+'</td></tr>';
}
function Consulta(){
    var response = '<div class="form-group">'+
    '<input type="number" class="form-control" placeholder="dia inicial"  id="diaIni"></input>'+
    '</div>'+
    '<div class="form-group">'+
                        '<select id="mesIni">'+
                        '<option value="" >Seleccione el mes de inicio a consultar</option>'+
                        '<option value="1" >Enero</option>'+
                        '<option value="2" >Febrero</option>'+
                        '<option value="3" >Marzo</option>'+
                        '<option value="4" >Abril</option>'+
                        '<option value="5" >Mayo</option>'+
                        '<option value="6" >Junio</option>'+
                        '<option value="7" >Julio</option>'+
                        '<option value="8" >Agosto</option>'+
                        '<option value="9" >Septiembre</option>'+
                        '<option value="10" >Octubre</option>'+
                        '<option value="11" >Noviembre</option>'+
                        '<option value="12" >Diciembre</option>'+
                        '</select>'+
                        '</div>'+
                        '<div class="form-group">'+
    '<input type="number" class="form-control" placeholder="dia de finalizacion"  id="diaFin"></input>'+
    '</div>'+
    '<div class="form-group">'+
                        '<select id="mesFin">'+
                        '<option value="" >Seleccione el mes final a consultar</option>'+
                        '<option value="1" >Enero</option>'+
                        '<option value="2" >Febrero</option>'+
                        '<option value="3" >Marzo</option>'+
                        '<option value="4" >Abril</option>'+
                        '<option value="5" >Mayo</option>'+
                        '<option value="6" >Junio</option>'+
                        '<option value="7" >Julio</option>'+
                        '<option value="8" >Agosto</option>'+
                        '<option value="9" >Septiembre</option>'+
                        '<option value="10" >Octubre</option>'+
                        '<option value="11" >Noviembre</option>'+
                        '<option value="12" >Diciembre</option>'+
                        '</select>'+
                    '</div>';
    inHTML('consulta',response);
    update.disabled = false;
}
function resumir(){
const arrayWithRepetition = [];

// Desactivar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = true; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Reporte generado';
// Obtener la tabla por su ID
var tabla = document.getElementById("tabla1");

// Obtener todas las filas de la tabla
var filas = tabla.getElementsByTagName("tr");

// Recorrer las filas (empezando desde 1 para saltar la cabecera)
for (var i = 1; i < filas.length; i++) {
    // Obtener todas las celdas de la fila actual
    var celdas = filas[i].getElementsByTagName("td");

    // Leer los datos de cada celda
    var user = celdas[0].innerHTML;
    arrayWithRepetition.push(user);
}
// Crear un objeto para almacenar el resultado
const result = {};
arrayWithRepetition.forEach((value) => {
    result[value] = (result[value] || 0) + 1;
});
// Resultado:
    //console.log(result);
// Asignar las repeticiones a las filas correspondientes
    for (var i = 1; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td");
        var user = celdas[0].innerHTML; // Obtener el usuario de la fila actual
        var descuento= parseFloat(celdas[4].innerHTML); // Obtener el dato de la fila 4
        var costo= parseFloat(celdas[5].innerHTML); // Obtener el dato de la fila 5
        var repeticion = result[user]; // Obtener el número de repeticiones para ese usuario

// Asignar el valor de repeticiones a la columna de repeticiones
        celdas[6].innerHTML = repeticion; // Asignar celda
        var resultadoMultiplicacionDes = descuento* repeticion;
        var resultadoMultiplicacionCos = costo* repeticion;
        var resultadoTotal = parseFloat(resultadoMultiplicacionCos)-parseFloat(resultadoMultiplicacionDes);
        // Asignar el resultado de la multiplicación a la columna (resultado)
        celdas[4].innerHTML = resultadoMultiplicacionDes.toFixed(2);
        celdas[5].innerHTML = resultadoMultiplicacionCos.toFixed(2);
        celdas[7].innerHTML = resultadoTotal.toFixed(2);
    }
}
function onClickConsulta(){
inHTML('loadTable',"");
var diaIni = value("diaIni");
var mesIni = value("mesIni");
var diaFin = value("diaFin");
var mesFin = value("mesFin");
inHTML('loadTable',"");
const consulta1 = new Array(32);
if(diaIni.length==0 || diaIni>=32 || mesIni.length==0 || diaFin.length==0 || diaFin>=32 || mesFin.length==0){ 
    update.disabled = false;
    asignation("diaIni","");
    asignation("mesIni","");
    asignation("diaFin","");
    asignation("mesFin","");
    alert("Favor de completar los campos solicitados con informacion correcta");
    inHTML('loadTable',"");
}else{ if(mesIni != mesFin){
inHTML('loadTable',"");
for(let i=diaIni;i<=consulta1.length;i++){
var reference = db.ref(`registros/`+`${i}-`+mesIni+`/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}
for(let j=0;j<=diaFin;j++){
    var reference = db.ref(`registros/`+`${j}-`+mesFin+`/`);
    reference.on('value',function(datas){
        var data = datas.val();
        $.each(data, function(nodo, value) {
                var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
                printHTML('loadTable',sendData);
        });
               
    });
    }
}else{
    inHTML('loadTable',"");
    for(let i=diaIni;i<=diaFin;i++){
    var reference = db.ref(`registros/`+`${i}-`+mesIni+`/`);
    reference.on('value',function(datas){
        var data = datas.val();
        $.each(data, function(nodo, value) {
                var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
                printHTML('loadTable',sendData);
        });
               
    });
    }
}
    update.disabled = false;
    asignation("diaIni","");
    asignation("mesIni","");
    asignation("diaFin","");
    asignation("mesFin","");
    alert("Consulta realizada con exito");
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
}
}
function onclickEnero(){
// Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
const enero = new Array(31);
for(let i=0;i<=enero.length;i++){
var reference = db.ref(`registros/`+`${i}-1/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function onclickFebrero(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
const febrero = new Array(31);
for(let i=0;i<=febrero.length;i++){
var reference = db.ref(`registros/`+`${i}-2/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function onclickMarzo(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
const marzo = new Array(31);
for(let i=0;i<=marzo.length;i++){
var reference = db.ref(`registros/`+`${i}-3/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function onclickAbril(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
const abril = new Array(31);
for(let i=0;i<=abril.length;i++){
var reference = db.ref(`registros/`+`${i}-4/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTableAbril',sendData);
    });
           
});
}}
function onclickMayo(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
const mayo = new Array(31);
for(let i=0;i<=mayo.length;i++){
var reference = db.ref(`registros/`+`${i}-5/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function onclickJunio(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
const junio = new Array(31);
for(let i=0;i<=junio.length;i++){
var reference = db.ref(`registros/`+`${i}-6/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function onclickJulio(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
const julio = new Array(31);
for(let i=0;i<=julio.length;i++){
var reference = db.ref(`registros/`+`${i}-7/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTableJulio',sendData);
    });
           
});
}}
function onclickAgosto(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
const agosto = new Array(31);
for(let i=0;i<=agosto.length;i++){
var reference = db.ref(`registros/`+`${i}-8/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });   
});
}}
function onclickSeptiembre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
const septiembre = new Array(31);
for(let i=0;i<=septiembre.length;i++){
var reference = db.ref(`registros/`+`${i}-9/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
});
}
}
function onclickOctubre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
const octubre = new Array(31);
for(let i=0;i<=octubre.length;i++){
var reference = db.ref(`registros/`+`${i}-10/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function onclickNoviembre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
const noviembre = new Array(31);
for(let i=0;i<=noviembre.length;i++){
var reference = db.ref(`registros/`+`${i}-11/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function onclickDiciembre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

// Opcional: Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
const diciembre = new Array(31);
for(let i=0;i<=diciembre.length;i++){
var reference = db.ref(`registros/`+`${i}-12/`);
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.area,value.date,value.descuento,value.costo,value.asistencia,'0',nodo);
            printHTML('loadTable',sendData);
    });
           
});
}}
function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // nombre de archivo
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // referencia agregada
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // link de archivo
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        //el nombre archivo a link
        downloadLink.download = filename;
        
        //ejecutando la descarga
        downloadLink.click();
    }
}
//Ordenar celdas
var getCellValue = function(tr, idx){ return tr.children[idx].innerText || tr.children[idx].textContent; }

var comparer = function(idx, asc) { return function(a, b) { return function(v1, v2) {
        return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
    }(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
}};

// orden tabla
Array.prototype.slice.call(document.querySelectorAll('th')).forEach(function(th) { th.addEventListener('click', function() {
        var table = th.parentNode
        while(table.tagName.toUpperCase() != 'TABLE') table = table.parentNode;
        Array.prototype.slice.call(table.querySelectorAll('tr:nth-child(n+2)'))
            .sort(comparer(Array.prototype.slice.call(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(function(tr) { table.appendChild(tr) });
            update.disabled = false;
    })
});

