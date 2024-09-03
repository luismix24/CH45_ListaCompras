const btnAgregar = document.getElementById("btnAgregar");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones")
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal")

// Bandera, al ser true permite agragar los datos a la tabla
let isValid = true;
let contador = 0;
let precio = 0;
let costoTotal = 0;
let totalEnProductos = 0;

function validarCantidad(){
    if(txtNumber.value.length==0){
        return false;
    }//length==0

    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN
    if(Number(txtNumber.value)<=0){
        return false;
    }// <=0
    return true;
}//validar Cantidad()

function getPrecio(){
    return Math.round((Math.random()*10000))/100;
}//getPrecio

btnAgregar.addEventListener("click", function(event){
event.preventDefault(); // prevenir por defecto
    txtNombre.style.border="";//borde rojo
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML=""
    alertValidaciones.style.display="none";
    isValid = true;

//Validar el nombre del producto
if(txtNombre.value.length<3){
    txtNombre.style.border="solid red medium";//borde rojo
    alertValidacionesTexto.innerHTML="El <strong>Nombre</strong> no es correcto. <br/>"
    alertValidaciones.style.display="block";
    isValid = false;
   }//if length<3

//Validar la cantidad
if(! validarCantidad()){
    txtNumber.style.border="solid red medium";
    alertValidacionesTexto.innerHTML+="La <strong>Cantidad</strong> no es correcta.";
    alertValidaciones.style.display="block";
    isValid = false;
}// !validar la cantidad
    if(isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
                   <td>${contador}</td>
                   <td>${txtNombre.value}</td>
                   <td>${txtNumber.value}</td>
                   <td>${precio}</td>
        </tr`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        //Multiplicación de precio unitario con la cantidad
        costoTotal += precio * Number(txtNumber.value);
        totalEnProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = "$" + costoTotal.toFixed(2); //toFixed redondea las decimales (2) "solo dos"
        //Almacenar de manera local al navegador
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductors", totalEnProductos);
        localStorage.setItem("constoTotal", costoTotal);

        txtNombre.value=""; //borra los form
        txtNumber.value="";
        txtNombre.focus();   //regresa a los campos
    }//isValid

});//btnAgregar.addEventListener//fin boton

//evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur",function(event){
    txtNombre.value = txtNombre.value.trim();//quita los espacios en form pierde el foco

});//txtNombre.addEventListener
txtNumber.addEventListener("blur",function(event){
    txtNumber.value = txtNumber.value.trim();//quita los espacios en form pierde el foco

}); //txtNumber.addEventListener

window.addEventListener("load", function(){
    if (this.localStorage.getItem("contador") != null){
        contador = Number(this.localStorage.getItem("contador"));
    }//null
    if (localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(localStorage.getItem("totalEnProductos"));
    }//null
    if (localStorage.getItem("costoTotal")!=null){
        totalEnProductos = Number(localStorage.getItem("costoTotal"));
    }//null
    contadorProductos.innerText = contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
});//winsows load