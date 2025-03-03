/*
Nombre del Codigo : script.js
Autor             : Ivan Ayala Ayala
Fecha             : 04-02-2025
                    12-02-2025
                    25-02-2025

Objetivo          : Registrar amigos y sortear el mejor Amigo
*/


// arreglo re importante es donde se guardan los amigos ingresados
let amigos = [];

//funcion que permite tomar el nombre de un amigo
function misAmigos()
{
    let nombreAmigo = document.getElementById('amigo').value;

    //proceso de validacion
        if(nombreAmigo === '' || amigos.includes(nombreAmigo)){
            alert("Por favor ingresa un nombre válido."); 
        } else { 
            if(isNaN(nombreAmigo))
            {
                //si todo esta correcto okay..se guarda en el arreglo amigos
                amigos.push(nombreAmigo);
            }
             else{
                alert("Has ingresado un número, ingresa un nombre válido.");
            }
        } 

        //llama a funcion  vaciarIdAmigo, para dejar en blanco el ingreso del input type #amigo
        //en el html <input type="text" id="amigo" class="amigo" placeholder="Nombre de Amigo">
        vaciarIdAmigo();  // se podria hacer sin llamdo a la funcion
        
        //llama a la funcion todosMisAmigos, es el registros de mis amigos
        todosMisAmigos();

    return;     //regresa/sale de la funcion misAmigos
 }

//función que limpia el campo de texto donde ingresamos el nombre
 function  vaciarIdAmigo()
 {
    //esto tambien se puede hacer asi document.getElementById('amigo');
    document.querySelector("#amigo").value = '';
    return;
}


//funcion en donde se muestra en el html mis amigos.
//
function todosMisAmigos()
{
    //en el html se refiere a esto <ul id="listaMisAmigos"></ul>
    //en este codigo se pasa a llamar listaHTML
    let listaHTML = document.querySelector("#listaMisAmigos");
    listaHTML.innerHTML = '';  //limpia ese espacio html

    //el for recorre el arreglo amigos para mostrarlo en el html listaHTML.appendChild(listItem);
    for(let i = 0; i < amigos.length; i++)
    {
            //se crea una variable del tipo html li  un elemento de lista
            let listItem = document.createElement('li'); 

            //al elmento de la lista se asigna cada elemento del arreglo
            listItem.textContent = amigos[i];

            //a la lista se cres/se agrega el elemento de lsita creado...es decir el amigo que 
            // esta en el arreglo
            // se hace especificamente con la funcion appendChild
            listaHTML.appendChild(listItem);
    }
    return;
}


//A partir del arreglo/lista de amigos let amigos = [];
// se sortea el amigo preferido 
// se usan funciones ramdomice como: 
// Math.floor   devuelve un valor entero, redondea un valor
// Math.random  devuelve un número de coma flotante pseudo-aleatorio,
//        comprendido en el rango de 0 a menor que 1 (es decir, incluido el 0 pero no el 1)
// aqui se genera/queda en random let randomGenerado = Math.floor(Math.random()*amigos.length);
function elegirMiAmigo()
{
        let randomGenerado = Math.floor(Math.random()*amigos.length);

        //se verifican tres instancias, 
        // si no hay amigos  if(amigos.length === 0)
        // si hay un amigo if(amigos.length === 1)
        // y si hay mas de un amigo, caso ideal   
        if(amigos.length === 0)
        {
            alert("La lista está vacia.");
         }
         else
         {
            if(amigos.length === 1)
            {
                alert("Debes de ingresar al menos dos amigos para sortear");
            }
            else
            {
               
                // se toma/rescata el valor desde html
                //  <ul id="amigoObtenido" class="amigos-a-mostrar" aria-live="polite"></ul>
                //   en este codigo se identifica con let amigoObtenido
                let amigoObtenido = document.getElementById('amigoObtenido');


                // se toma/rescata el valor desde html
                // <p id="amigoElegido" class="amigos-a-mostrar" hidden = true>Amigo Elegido:</p>
                // ojo con atributo hidden...esta oculto
                //en este codigo se llamara amigoElegido
                let amigoElegido = document.getElementById('amigoElegido');


                // <p id="amigoElegido" class="amigos-a-mostrar" hidden = true>Amigo Elegido:</p>
                //atributo hidden se quita/se saca...es para mostrar
                amigoElegido.removeAttribute('hidden');

                //se muestra el amigo sorteado....
                // <ul id="amigoObtenido" class="amigos-a-mostrar" aria-live="polite"></ul>
                amigoObtenido.innerHTML = amigos[randomGenerado];


                //el amigo sorteado se quita desde el arreglo/lista. en este caso amigos
                // El método splice() es un método incorporado en los arreglos de JavaScript. 
                // Que permite cambiar el contenido del arreglo eliminando o sustituyendo
                // los elementos existentes por otros nuevos.
                // el 1  indica eliminar un solo valor
                amigos.splice(randomGenerado, 1);


                //mostrar los amigos que quedan en el arreglo/lista original.
                todosMisAmigos;
            }
            
        }   
    return;
}

