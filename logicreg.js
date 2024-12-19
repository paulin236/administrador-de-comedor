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
function numerar(){
        // Seleccionar todas las filas dentro del tbody
const filas = document.querySelectorAll('#loadTable tr');

// Recorre las filas y asigna un número de fila a la primera columna
filas.forEach((fila, index) => {
    // Asigna el número de la fila en la primera celda de cada fila
    fila.cells[0].textContent = index + 1; // 'index' empieza en 0, por eso se suma 1
});   
}

function removeReg(date, nombre){

    // Dividir la cadena para obtener la parte de la fecha
    let dateId = date.split(" ")[3];
    // Dividir la fecha para obtener solo el día y el mes
    //let diaMes = dateId.split("-").slice(0, 2).join("-");
    //console.log(diaMes);
    if(confirm("¿Desea eliminar el registro de "+nombre+"?")){
        inHTML("loadTable","");
        db.ref('/registros/'+dateId+'/').orderByChild("date").equalTo(date).once("value").then(function (snapshot) {
          snapshot.forEach((childSnapshot) => {
            //remove each child
            db.ref('/registros/'+dateId).child(childSnapshot.key).remove();
          });
        });;
        inHTML("loadTable","");
    }
}

function table(user,nombre,area,date,descuento,costo,asistencia,total){
    return '<tr><td>'+'</td><td>'+user+'</td><td>'+nombre+'</td><td>'+area+'</td><td>'+date+'</td><td>'+descuento+
    '</td><td>'+costo+'</td><td>'+asistencia+'</td><td>'+total+'</td>'+'<td><a href="#" onclick="removeReg(\''+date+'\',\''+nombre+'\')">'+
    '<i class="fas fa-trash-alt red icon-lg"></i></a></td>'+'</tr>';
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
    const fh = new Date();
    const year = fh.getFullYear(); // Año actual
    inHTML('loadTable', ""); // Limpia la tabla HTML

    const diaIni = parseInt(value("diaIni"), 10); // Día de inicio
    const mesIni = parseInt(value("mesIni"), 10); // Mes de inicio
    const diaFin = parseInt(value("diaFin"), 10); // Día de fin
    const mesFin = parseInt(value("mesFin"), 10); // Mes de fin

    // Validar entradas
    if (
        isNaN(diaIni) || diaIni <= 0 || diaIni > 31 ||
        isNaN(mesIni) || mesIni <= 0 || mesIni > 12 ||
        isNaN(diaFin) || diaFin <= 0 || diaFin > 31 ||
        isNaN(mesFin) || mesFin <= 0 || mesFin > 12
    ) {
        alert("Favor de completar los campos solicitados con información válida");
        asignation("diaIni", "");
        asignation("mesIni", "");
        asignation("diaFin", "");
        asignation("mesFin", "");
        return;
    }

    // Función para consultar un rango de días dentro de un mes específico
    const consultarDias = (diaInicio, diaFinal, mes) => {
        for (let dia = diaInicio; dia <= diaFinal; dia++) {
            const referencia = db.ref(`registros/${dia}-${mes}-${year}/`);
            referencia.on('value', (snapshot) => {
                const datos = snapshot.val();
                if (datos) {
                    $.each(datos, (nodo, value) => {
                        const sendData = table(
                            value.user,
                            value.nombre,
                            value.area,
                            value.date,
                            value.descuento,
                            value.costo,
                            '1',
                            '0',
                            nodo
                        );
                        printHTML('loadTable', sendData);
                        numerar();
                    });
                }
            });
        }
    };

    // Lógica para diferentes casos de consulta
    if (mesIni === mesFin) {
        // Si el mes de inicio y fin es el mismo
        consultarDias(diaIni, diaFin, mesIni);
    } else if (mesIni < mesFin) {
        // Si los meses son diferentes
        // Consultar desde el día inicial hasta el fin del mes inicial
        consultarDias(diaIni, 31, mesIni);

        // Consultar para todos los días intermedios de los meses entre mesIni y mesFin
        for (let mes = mesIni + 1; mes < mesFin; mes++) {
            consultarDias(1, 31, mes);
        }

        // Consultar desde el inicio del mes final hasta el día final
        consultarDias(1, diaFin, mesFin);
    } else {
        alert("El mes de inicio no puede ser mayor al mes de fin.");
        return;
    }

    // Restablecer valores y notificar éxito
    asignation("diaIni", "");
    asignation("mesIni", "");
    asignation("diaFin", "");
    asignation("mesFin", "");
    alert("Consulta realizada con éxito");

    // Habilitar botón para generar reporte
    const button = document.getElementById('generateReportButton');
    button.disabled = false;
    button.textContent = 'Generar reporte';
}

//Funcion para generar las tablas de cada mes
function generarTablaConsultas(mes){
    var fh = new Date();
    const arrMes = new Array(31); // Crea un arreglo para el mes (31 días)
    for (let i = 0; i <= arrMes.length; i++) {
        var reference = db.ref(`registros/${i}-`+mes+`-${fh.getFullYear()}/`);
        reference.on('value', function (datas) {
            var data = datas.val();
            $.each(data, function (nodo, value) {
                var sendData = table(value.user, value.nombre, value.area, value.date, value.descuento, value.costo, '1', '0', nodo);
                printHTML('loadTable', sendData);
                numerar();
            });
        });
    }
}

function activarBoton (){
    const button = document.getElementById('generateReportButton');
    button.disabled = false;
    button.textContent = 'Generar reporte';
}

// Función para realizar la consulta del mes de enero
function onclickEnero() {
    activarBoton();
    inHTML('loadTable', ""); // Limpia la tabla
    generarTablaConsultas(1);
}

// Se repiten funciones similares para cada mes

function onclickFebrero(){
    activarBoton();
    inHTML('loadTable',"");
    generarTablaConsultas(2);
}

function onclickMarzo(){
    activarBoton();
    inHTML('loadTable',"");
    generarTablaConsultas(3);
}

function onclickAbril(){
    activarBoton();
inHTML('loadTable',"");
generarTablaConsultas(4);
}

function onclickMayo(){
    activarBoton();
inHTML('loadTable',"");
generarTablaConsultas(5);
}

function onclickJunio(){
    activarBoton();
    inHTML('loadTable',"");
    generarTablaConsultas(6);
}

function onclickJulio(){
    activarBoton();
    inHTML('loadTable',"");
    generarTablaConsultas(7);
}

function onclickAgosto(){
    activarBoton();
inHTML('loadTable',"");
generarTablaConsultas(8);
}

function onclickSeptiembre(){
    activarBoton();
inHTML('loadTable',"");
generarTablaConsultas(9);
}

function onclickOctubre(){
    activarBoton();
    inHTML('loadTable',"");
    generarTablaConsultas(10)
}

function onclickNoviembre(){
    activarBoton();
    inHTML('loadTable',"");
    generarTablaConsultas(11);
}

function onclickDiciembre(){
    activarBoton();
    inHTML('loadTable',"");
    generarTablaConsultas(12);
}

function exportTableToExcel(tableID, filename = '') {
    const table = document.getElementById(tableID);
    const rows = table.querySelectorAll('tr');
    let csvContent = "";

    // Recorremos cada fila de la tabla para construir el contenido en formato CSV
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = Array.from(cells).map(cell => cell.innerText).join(',');
        csvContent += rowData + '\n';
    });

    // Crear un Blob con el contenido CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const downloadLink = document.createElement("a");

    // Crear el enlace de descarga
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename ? filename + '.csv' : 'Reporte_del_comedor.csv';

    // Simular clic en el enlace de descarga
    downloadLink.click();

    // Liberar el objeto URL
    URL.revokeObjectURL(url);
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

