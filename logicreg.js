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
function numerar(){
        // Seleccionar todas las filas dentro del tbody
const filas = document.querySelectorAll('#loadTable tr');

// Recorre las filas y asigna un número de fila a la primera columna
filas.forEach((fila, index) => {
    // Asigna el número de la fila en la primera celda de cada fila
    fila.cells[0].textContent = index + 1; // 'index' empieza en 0, por eso se suma 1
});   
}
function table(user,nombre,area,date,descuento,costo,asistencia,total){
    return '<tr><td>'+'</td><td>'+user+'</td><td>'+nombre+'</td><td>'+area+'</td><td>'+date+'</td><td>'+descuento+
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
function removeDuplicateRowsByNombre() {
    // Obtener la tabla y las filas
    var tabla = document.getElementById("tabla1");
    var filas = tabla.getElementsByTagName("tr");

    // Crear un conjunto para almacenar los nombres encontrados
    var nombresEncontrados = new Set();

    // Recorrer las filas desde el final hacia el inicio para poder eliminar sin problemas
    for (var i = filas.length - 1; i > 0; i--) {
        var celdas = filas[i].getElementsByTagName("td");
        
        // Verificar que la fila tenga celdas para evitar errores
        if (celdas.length > 0) {
            var nombre = celdas[2].innerText; // Columna "Nombre"

            // Si el nombre ya fue encontrado, eliminar la fila
            if (nombresEncontrados.has(nombre)) {
                tabla.deleteRow(i);
            } else {
                // Si el nombre no ha sido encontrado, agregarlo al conjunto
                nombresEncontrados.add(nombre);
            }
        }
    }
}
function reporte(){
const arrayWithRepetition = [];

// Desactivar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = true; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
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
    var user = celdas[1].innerHTML;
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
        var user = celdas[1].innerHTML; // Obtener el usuario de la fila actual
        var descuento= parseFloat(celdas[5].innerHTML); // Obtener el dato de la fila 5
        var costo= parseFloat(celdas[6].innerHTML); // Obtener el dato de la fila 6
        var repeticion = result[user]; // Obtener el número de repeticiones para ese usuario

// Asignar el valor de repeticiones a la columna de repeticiones
        celdas[7].innerHTML = repeticion; // Asignar celda
        var resultadoMultiplicacionDes = descuento* repeticion;
        var resultadoMultiplicacionCos = costo* repeticion;
        var resultadoTotal = parseFloat(resultadoMultiplicacionCos)-parseFloat(resultadoMultiplicacionDes);
        // Asignar el resultado de la multiplicación a la columna (resultado)
        celdas[5].innerHTML = resultadoMultiplicacionDes.toFixed(2);
        celdas[6].innerHTML = resultadoMultiplicacionCos.toFixed(2);
        celdas[8].innerHTML = resultadoTotal.toFixed(2);
    }
    /*removeDuplicateRowsByNombre();
    numerar();*/
}


// Función que se ejecuta al hacer clic en el botón de consulta
function onClickConsulta() {
    inHTML('loadTable', ""); // Limpia la tabla HTML
    var diaIni = value("diaIni"); // Obtiene el día de inicio
    var mesIni = value("mesIni"); // Obtiene el mes de inicio
    var diaFin = value("diaFin"); // Obtiene el día de fin
    var mesFin = value("mesFin"); // Obtiene el mes de fin

    const consulta1 = new Array(32); // Crea un arreglo para almacenar hasta 31 días

    // Valida que los campos no estén vacíos y que los días ingresados sean válidos
    if (diaIni.length == 0 || diaIni >= 32 || mesIni.length == 0 || diaFin.length == 0 || diaFin >= 32 || mesFin.length == 0) {
        update.disabled = false;
        asignation("diaIni", ""); // Reinicia el valor del campo de día de inicio
        asignation("mesIni", ""); // Reinicia el valor del campo de mes de inicio
        asignation("diaFin", ""); // Reinicia el valor del campo de día de fin
        asignation("mesFin", ""); // Reinicia el valor del campo de mes de fin
        alert("Favor de completar los campos solicitados con información correcta");
        inHTML('loadTable', ""); // Limpia la tabla
    } else {
        inHTML('loadTable', ""); // Limpia la tabla de nuevo
        // Verifica si los meses de inicio y fin son diferentes
        if (mesIni != mesFin) {
            // Ciclo para el mes inicial
            for (let i = diaIni; i <= consulta1.length; i++) {
                var reference = db.ref(`registros/${i}-${mesIni}/`);
                reference.on('value', function (datas) {
                    var data = datas.val();
                    $.each(data, function (nodo, value) {
                        var sendData = table(value.user, value.nombre, value.area, value.date, value.descuento, value.costo, value.asistencia, '0', nodo);
                        printHTML('loadTable', sendData);
                        numerar();
                    });
                });
            }
            // Ciclo para el mes final
            for (let j = 0; j <= diaFin; j++) {
                var reference = db.ref(`registros/${j}-${mesFin}/`);
                reference.on('value', function (datas) {
                    var data = datas.val();
                    $.each(data, function (nodo, value) {
                        var sendData = table(value.user, value.nombre, value.area, value.date, value.descuento, value.costo, value.asistencia, '0', nodo);
                        printHTML('loadTable', sendData);
                        numerar();
                    });
                });
            }
        } else {
            // Si el mes de inicio y fin es el mismo
            for (let i = diaIni; i <= diaFin; i++) {
                var reference = db.ref(`registros/${i}-${mesIni}/`);
                reference.on('value', function (datas) {
                    var data = datas.val();
                    $.each(data, function (nodo, value) {
                        var sendData = table(value.user, value.nombre, value.area, value.date, value.descuento, value.costo, value.asistencia, '0', nodo);
                        printHTML('loadTable', sendData);
                        numerar();
                    });
                });
            }
        }
        update.disabled = false; // Habilita la actualización
        asignation("diaIni", ""); // Reinicia el día de inicio
        asignation("mesIni", ""); // Reinicia el mes de inicio
        asignation("diaFin", ""); // Reinicia el día de fin
        asignation("mesFin", ""); // Reinicia el mes de fin
        alert("Consulta realizada con éxito");

        // Activa el botón para generar reporte después de realizar la consulta
        const button = document.getElementById('generateReportButton');
        button.disabled = false;
        button.textContent = 'Generar reporte';
    }
}

//Funcion para generar las tablas de cada mes
function generarTablaConsultas(mes){
    const arrMes = new Array(31); // Crea un arreglo para el mes (31 días)
    for (let i = 0; i <= arrMes.length; i++) {
        var reference = db.ref(`registros/${i}-`+mes+`/`);
        reference.on('value', function (datas) {
            var data = datas.val();
            $.each(data, function (nodo, value) {
                var sendData = table(value.user, value.nombre, value.area, value.date, value.descuento, value.costo, value.asistencia, '0', nodo);
                printHTML('loadTable', sendData);
                numerar();
            });
        });
    }
}

// Función para realizar la consulta del mes de enero
function onclickEnero() {
    const button = document.getElementById('generateReportButton');
    button.disabled = false;
    button.textContent = 'Generar reporte';
    inHTML('loadTable', ""); // Limpia la tabla
    generarTablaConsultas(1);
}

// Se repiten funciones similares para cada mes

function onclickFebrero(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
    generarTablaConsultas(2);
}

function onclickMarzo(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
    generarTablaConsultas(3);
}

function onclickAbril(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
generarTablaConsultas(4);
}

function onclickMayo(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
generarTablaConsultas(5);
}

function onclickJunio(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
    generarTablaConsultas(6);
}

function onclickJulio(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
    generarTablaConsultas(7);
}

function onclickAgosto(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
generarTablaConsultas(8);
}

function onclickSeptiembre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
inHTML('loadTable',"");
generarTablaConsultas(9);
}

function onclickOctubre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
    generarTablaConsultas(10)
}

function onclickNoviembre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
    generarTablaConsultas(11);
}

function onclickDiciembre(){
    // Activar el botón después de hacer clic
const button = document.getElementById('generateReportButton');
button.disabled = false; // Desactiva el botón

//  Cambiar el texto del botón para indicar que está desactivado
button.textContent = 'Generar reporte';
    inHTML('loadTable',"");
    generarTablaConsultas(12);
}

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

