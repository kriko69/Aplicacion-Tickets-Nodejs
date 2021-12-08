
const crearTicket = document.querySelector('#crearTicket');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
//console.log('Nuevo Ticket HTML');

const socket = io();

socket.on('connect',()=>{
    crearTicket.disabled=false;
});

socket.on('disconnect',()=>{
    crearTicket.disabled=true;
});

crearTicket.addEventListener( 'click', () => {
    
    socket.emit( 'crear-ticket',null, ( siguiente ) => {
        lblNuevoTicket.innerText=siguiente;
    });

});

socket.on('ultimo-ticket',(ultimo)=>{
        const mensaje='ticket '+ultimo;
        lblNuevoTicket.innerText=mensaje;

});

