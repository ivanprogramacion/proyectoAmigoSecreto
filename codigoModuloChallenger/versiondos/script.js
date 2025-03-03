
// Variables globales
const ingresoJugador = document.getElementById('ingresoJugador'); 
const listadoParticipantes = document.getElementById('listadoParticipantes'); 
const asignarBoton = document.getElementById('asignarBoton'); 
const listaResultado = document.getElementById('listaResultado');


let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

function renderParticipantes() 
{ 

   
    listadoParticipantes.innerHTML = ''; 
    jugadores.forEach((jugador, index) =>
         { 
            const li = document.createElement('li'); 
            li.textContent = jugador; 
            listadoParticipantes.appendChild(li);
            
         }
    );
    asignarBoton.disabled = jugadores.length < 2;

}


function guardarJugadores() 
{ 
    localStorage.setItem('jugadores', JSON.stringify(jugadores)); 
  
}

ingresoJugador.addEventListener('submit', (e) => 
{
     e.preventDefault();
     const nombreIngresado = document.getElementById('nombre'); 
     const nombre = nombreIngresado.value.trim();

    
     if (nombre && !jugadores.includes(nombre))
    {
         jugadores.push(nombre);
         guardarJugadores(); 
         renderParticipantes(); 
        
         nombreIngresado.value = ''; 
         
    }
      else 
        { 
             alert('El nombre ya existe o no es válido.');
    }
});

function encontrarAmigoSecreto() 
{
    const sorteoJugadores = [...jugadores].sort(() => Math.random() - 0.5); 
    const encontrados = {};
    sorteoJugadores.forEach((jugador, index) =>
     {
        const nextIndex = (index + 1) % sorteoJugadores.length;
        encontrados[jugador] = sorteoJugadores[nextIndex]; 
     });

     listaResultado.innerHTML = ''; 
     Object.entries(encontrados).forEach(([jugador, friend]) => 
     {
             const li = document.createElement('li'); 
             li.textContent = `${jugador} -> ${friend}`;
             listaResultado.appendChild(li); 
     });
}

asignarBoton.addEventListener('click', encontrarAmigoSecreto);

renderParticipantes();

