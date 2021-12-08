const lbldesktop = document.querySelector('#lbldesktop');
const lblSmall = document.querySelector('#lblSmall');
const btnAtender = document.querySelector('#btnAtender');
const lblPendientes = document.querySelector('#lblPendientes');
const alertCola = document.querySelector('#alertCola');

const searchParam=new URLSearchParams(window.location.search);

if (!searchParam.has('escritorio')) {
    window.location='index.html';
    throw new Error('El escritorio es obligtorio.');
}

const escritorio = searchParam.get('escritorio');

lbldesktop.innerText='Escritorio: '+escritorio;

alertCola.hidden=true;

const socket = io();

socket.on('connect',()=>{
    btnAtender.disabled=false;
});

socket.on('disconnect',()=>{
    btnAtender.disabled=true;
});

btnAtender.addEventListener( 'click', () => {
    
    const payload={
        escritorio
    }
    socket.emit( 'atender-ticket',payload, ( resp ) => {
        console.log(resp);
        if (!resp.ok) {
            lblSmall.innerText='Nadie';
            alertCola.hidden=false;
            btnAtender.disabled=true;
            return;
        }
        lblSmall.innerText='ticket '+resp.msg.numero;
            
    });

});

socket.on('estado-actual',(estado)=>{
        console.log('cola',estado);
        lblPendientes.innerText=estado;
});

