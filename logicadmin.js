var db = firebase.database();
function obtenerValorAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let i = obtenerValorAleatorio(50, 999);


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
    return fh.getDate()+"-"+(fh.getMonth()+1)+"-"+fh.getFullYear();
}
function dateActuali(){
    var fh = new Date();
    return fh.getHours()+":"+fh.getMinutes()+"   "+fh.getDate()+"-"+(fh.getMonth()+1)+"-"+fh.getFullYear();
}
function dateActualityReg(){
    var fh = new Date();
    return fh.getDate()+"-"+(fh.getMonth()+1);
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
function onClickLogin(){
    var user = value("user");
    var clave = value("clave");
    asignation("user","");
    asignation("clave","");
    if(user.length==0 || clave.length==0){ 
        alert("Favor de completar los campos solicitados"); 
    }else{
        db.ref('admin/'+user+'/clave/').once('value').then(function(snapshot) { 
            if(clave != snapshot.val()){
            alert("Usuario o clave incorrecto ")
            asignation("user","");
            asignation("clave","");
        }else{
            asignation("user","");
            asignation("clave","");
            window.location.href = "administrador.html";
        }})
        }
    }
db.ref('comida/descuento/').once('value').then(function(snapshot) {
    return descuento = snapshot.val();
    })
    db.ref('comida/costo/').once('value').then(function(snapshot1) {
        return costo = snapshot1.val();
        })
function viewFecha(user,nombre,area){
        var viFecha = 
        '<div class="form-group">'+
        '<input type="number" id="usuario" class="form-control" placeholder="user" value="'+user+'"></input>'+
        '</div>'+
        '<div class="form-group">'+
        '<textarea type="text" id="name" class="form-control" placeholder="Nombre" value=>'+nombre+'</textarea>'+
        '</div>'+
        '<div class="form-group">'+
        '<input type="text" id="are" class="form-control" placeholder="Area" value="'+area+'"></input>'+
        '</div>'+
        '<div class="form-group">'+
        '<input type="number" id="dia" class="form-control" placeholder="Dia"></input>'+
        '</div>'+
        '<div class="form-group">'+
                        '<select id="mes">'+
                        '<option value="" >Seleccione el mes</option>'+
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
        inHTML('Fecha',viFecha);
}
function insertReg(){
    var user=value("usuario");
    var nombre=value("name");
    var area=value("are");
    var asistencia = 0;
    var dia=value("dia");
    var mes=value("mes");
    if( dia.length==0 || mes.length==0){
        alert("Agrege una fecha valida")
    }else
        if(area=='Practicante' || area=='Visitante'){
    descuento = 0;
    i--;
    db.ref('registros/'+dia+'-'+mes+'/'+i).set({
        user:user,
        nombre:nombre,
        area:area,
        date:hourReg()+' '+dia+'-'+mes,
        descuento:descuento,
        costo:costo,
        asistencia:asistencia
        });
    alert("Registro de "+nombre+" realizado correctamente");
    asignation("dia","");
    asignation("mes","");
    asignation("name","");
    asignation("are","");
    asignation("usuario","");
        }else{
            i--;
            db.ref('registros/'+dia+'-'+mes+'/'+i).set({
                user:user,
                nombre:nombre,
                area:area,
                date:hourReg()+' '+dia+'-'+mes,
                descuento:descuento,
                costo:costo,
                asistencia:asistencia
                });
            alert("Registro de "+nombre+" realizado correctamente");
            asignation("dia","");
            asignation("mes","");
            asignation("name","");
            asignation("are","");
            asignation("usuario","");
        }
}
function insertAdmin(user,clave){
    db.ref('admin/'+user).set({
        user:user,
        clave:clave
    });
}
function onClickInsertAdmin(){
    var user = value("userAdmin");
    var clave = value("claveAdmin");
    if(user.length==0 || clave.length==0){ 
        alert("Favor de llenar todos los campos"); 
    }else{
        db.ref('admin/'+user+'/user/').once('value').then(function(snapshot) { 
            if(user == snapshot.val()){
            alert("No se permite duplicar usuario")
            asignation("userAdmin","");
            asignation("claveAdmin","");
        }else{
        insertAdmin(user,clave); 
        asignation("userAdmin","");
        asignation("claveAdmin","");
        inHTML("tablaAdmin","");
        alert("Usuario guardado correctamente");
        update.disabled = false;
    }})
}
}
function insertUser(user,nombre,clave,area){
    db.ref('users/'+user).set({
        nombre:nombre,
        user:user,
        clave:clave,
        area:area,
        date:dateActuality()
    });
}
function onClickInsert(){
    var user = value("user");
    var clave = value("clave");
    var nombre = value("nombre");
    var area = value("area");
    if(nombre.length==0 || user.length==0 || clave.length==0 || area.length==0){ 
        alert("Favor de llenar todos los campos"); 
    }else{
        db.ref('users/'+user+'/user/').once('value').then(function(snapshot) { 
            if(user == snapshot.val()){
            alert("No se permite duplicar usuario")
        }else{
        inHTML("loadTable","");
        insertUser(user,nombre,clave,area); 
        asignation("user","");
        asignation("clave","");
        asignation("nombre","");
        asignation("area","");
        alert("Usuario guardado correctamente");
        update.disabled = false;
    }})
}
}
function updateUser(user,nombre,clave,area){
    db.ref('users/'+user).update({
        user:user,
        nombre:nombre,
        clave:clave,
        area:area
    });
}
function onClickUpdate(){
    var user = value("userEdit");
    var nombre = value("nombreEdit");
    var area = value("areaEdit");
    var clave = value("claveEdit");
    if(nombre.length==0 || user.length==0 || clave.length==0 || area.length==0){ 
        alert("Favor de llenar todos los campos");
    }else{
        /*db.ref('users/'+user+'/user/').once('value').then(function(snapshot) { 
            if(user == snapshot.val()){
            alert("No se permite duplicar usuario")
        }else{*/
        inHTML("loadTable","");
        updateUser(user,nombre,clave,area); 
        inHTML("editData","");
        alert("Usuario modificado correctamente");
        update.disabled = false;
    }
}
function onClickUpdatePrecio(){
    var costo = value("costo");
    if(descuento.length==0 ){ 
        alert("Favor de llenar todos los campos");
    }else{
        asignation("costo","");
        updatePrecio(costo); 
        inHTML("precioActual","");
        alert("Costo modificada correctamente");
        update.disabled = false;
    }
}
function onclickModalUpdatePrecio(){
db.ref('comida/costo/').once('value').then(function(snapshot) {
    var inprecio = '<div class="form-group">'+
    '<p>Costo actual '+snapshot.val()+'</p>'+
    '</div>'+
    '<div class="form-group">'+
    '<input type="number" id="costo" class="form-control" placeholder="costo sin IVA"></input>'+
    '</div>';
    inHTML('precioActual',inprecio)
})
}
function updatePrecio(costo){
    var iva=(costo*0.16).toFixed(2);
    var precio=(parseFloat(iva)+parseFloat(costo));
    db.ref('comida/').update({
        costoIVA:precio,
        costo:costo
    });
}
function onclickModalUpdateUMA(){
    db.ref('comida/descuento/').once('value').then(function(snapshot) {
        return descuentoUMA = snapshot.val();
    })
    db.ref('comida/UMA/').once('value').then(function(snapshot) {
        var inUMA = '<div class="form-group">'+
        '<p>UMA actual: '+snapshot.val()+'</p>'+
        '</div>'+
        '<div class="form-group">'+
        '<p>Descuento de: '+descuentoUMA+'</p>'+
        '</div>'+
        '<div class="form-group">'+
        '<input type="number" id="UMA" class="form-control" placeholder="UMA"></input>'+
        '</div>';
        inHTML('UMAActual',inUMA)
    })
    }
    function updateUMA(UMA){
        db.ref('comida/').update({
            UMA:UMA,
            descuento:(UMA*0.2).toFixed(2)
        });
    }
    function onClickUpdateUMA(){
        var UMA = value("UMA");
        if(descuento.length==0 ){ 
            alert("Favor de llenar todos los campos");
        }else{
            asignation("UMA","");
            updateUMA(UMA); 
            inHTML("UMAActual","");
            alert("UMA modificada correctamente");
            update.disabled = false;
        }
    }
function removeUser(user){
    db.ref('users/'+user+'/nombre/').once('value').then(function(snapshot) {
    if(confirm("¿Desea eliminar al usuario "+snapshot.val()+"?")){
        inHTML("loadTable","");
        db.ref('users/'+user).remove();
    }})
}
function removeAdmin(user){
    db.ref('admin/'+user+'/user/').once('value').then(function(snapshot) {
    if(confirm("¿Desea eliminar al usuario "+snapshot.val()+"?")){
        inHTML("tablaAdmin","");
        db.ref('admin/'+user).remove();
    }})
}
function table(user,nombre,clave,area,date){
    return '<tr><td></td><td>'+user+'</td><td>'+nombre+'</td><td>'+clave+'</td><td>'+area+'</td><td>'+date+'</td>'+
    '<td><a data-toggle="modal" data-target="#modalEdit" href="#" onclick="viewDataUpdate(\''+user+'\',\''+nombre+'\',\''+clave+'\',\''+area+'\')">'+
    '<i class="fas fa-edit blue icon-lg"></i></a></td>'+
    '<td><a href="#" onclick="removeUser(\''+user+'\')">'+
    '<i class="fas fa-trash-alt red icon-lg"></i></a></td>'+
    '<td><a data-toggle="modal" data-target="#modalFecha" href="#" onclick="viewFecha(\''+user+'\',\''+nombre+'\',\''+area+'\')"'+
    '<i class="fas fa-plus blue icon-lg"></i></a></td>'
}
function tableAdmin(user,clave){
    return '<tr><td>'+user+'</td><td>'+clave+
    '<td><a href="#" onclick="removeAdmin(\''+user+'\')">'+
    '<i class="fas fa-trash-alt red icon-lg"></i></a></td>'
}
function modalUserAdmin(){
var modal='<div class="form-group">'+
                        '<div class="input-group">'+
                         '<input type="text" id="userAdmin" class="form-control" placeholder="Usuario">'+
                            '<div class="input-group-append">'+
                                '<button class="btn btn-primary" type="button" onclick="generateRandom(\'userAdmin\')">Generar</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    
                    '<div class="form-group">'+
                        '<div class="input-group">'+
                            '<input type="text" id="claveAdmin" class="form-control" placeholder="Clave">'+
                            '<div class="input-group-append">'+
                                '<button class="btn btn-primary" type="button" onclick="generateRandom(\'claveAdmin\')">Generar</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<table class="table custom-table-admin">'+
                            '<thead class="thead-dark">'+
                                '<tr>'+
                                    '<th>Usuario</th>'+
                                    '<th>Clave</th>'+
                                    '<th>Eliminar</th>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody id="tablaAdmin"></tbody>'+
                        '</table>'+
                    '</div>';
                    
    inHTML('adminModal',modal);
    
//Tabla administrador
var reference = db.ref('admin/');    
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = tableAdmin(value.user,value.clave,nodo);
            printHTML('tablaAdmin',sendData);
            
        });
    }); 
}
function viewDataUpdate(user,nombre,clave,area){
    var response = '<div class="form-group">'+
    '<input type="text" class="form-control" placeholder="User" value='+user+' id="userEdit"></input>'+
    '</div>'+
    '<div class="form-group">'+
    '<textarea type="text" placeholder="Nombre" class="form-control" id="nombreEdit" value=>'+nombre+'</textarea>'+
    '</div>'+
    '<div class="form-group">'+
    '<input type="text" placeholder="Clave" class="form-control" id="claveEdit" value='+clave+'></input>'+
    '</div>'+
    '<div class="form-group">'+
                        '<select id="areaEdit">'+
                            '<option >'+area+'<nav></nav></option>'+
                            '<option >Almacén<nav></nav></option>'+
                            '<option >Logistica</option>'+
                            '<option >Produccion</option>'+
                            '<option >Mantenimiento General</option>'+
                            '<option >Bascula</option>'+
                            '<option >Calidad</option>'+
                            '<option >Seguridad Industrial</option>'+
                            '<option >Calcinacion</option>'+
                            '<option >Activo Fijo</option>'+
                            '<option >Compras</option>'+
                            '<option >Talento</option>'+
                            '<option >Finanzas</option>'+
                            '<option >Operaciones</option>'+
                            '<option >Ecología y Medio Ambiente</option>'+
                            '<option >Tecnologías de la Información</option>'+
                            '<option >Preliquidación</option>'+
                            '<option >Recursos Humanos</option>'+
                            '<option >Practicante</option>'+
                            '<option >Visitante</option>'+
                          '</select>'+
                    '</div>';
    inHTML('editData',response);
    update.disabled = false;
}
// Función que genera un número aleatorio de 4 dígitos y lo inserta en el campo especificado
function generateRandom(inputId) {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Genera un número de 4 dígitos
    document.getElementById(inputId).value = randomNum;
}
//Mostrar datos en tabla
var reference = db.ref('users/');    
reference.on('value',function(datas){
    var data = datas.val();
    $.each(data, function(nodo, value) {
            var sendData = table(value.user,value.nombre,value.clave,value.area,value.date,nodo);
            printHTML('loadTable',sendData);
            numerar();
//obtengo los datos de la columna
var rows = $(nombre);
//creo un array el cual guardare los datos para después comparar
var arr = {};
//recorro los campos de la columna
rows.each(function(){
  //obtengo el texto del campo correspondiente
  var val = $(this).text();
  //realizo las comparaciones y realiza el conteo
  if (val === "") return;
  if (typeof(arr[val])!= "undefined"){
      arr[val] = ++arr[val];
  }
  else{
      arr[val] = 1;
  }
});
//mostramos los datos en consola
 //console.log((arr));
    });       
});
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
function searchTable() {
    // Obtener el valor de entrada y convertirlo a minúsculas para hacer la búsqueda insensible a mayúsculas/minúsculas
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();

    // Obtener la tabla y todas las filas del cuerpo de la tabla
    var table = document.getElementById("reportes");
    var rows = table.getElementsByTagName("tr");

    // Recorrer todas las filas de la tabla, excepto la cabecera
    for (var i = 1; i < rows.length; i++) {
        var td = rows[i].getElementsByTagName("td")[1]; // Obtener la tercera celda (nombre)
        
        if (td) {
            var txtValue = td.textContent || td.innerText;
            
            // Comparar el valor del nombre con el filtro
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = ""; // Mostrar fila si coincide
            } else {
                rows[i].style.display = "none"; // Ocultar fila si no coincide
            }
        }
    }
}