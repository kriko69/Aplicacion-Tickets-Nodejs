
const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');

const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const searchParam=new URLSearchParams(window.location.search);

const socket = io();

socket.on('connect',()=>{

});

socket.on('disconnect',()=>{

});

socket.on('ultimos-4',(resp)=>{

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    if (resp[0]) {
        lblEscritorio1.innerText='Escritorio '+resp[0].escritorio;
        lblTicket1.innerText='Ticket '+resp[0].numero;
    }else{
        lblTicket1.innerText='En espera';
        lblEscritorio1.innerText='de un Ticket';
    }

    if (resp[1]) {
        lblTicket2.innerText='Ticket '+resp[1].numero;
        lblEscritorio2.innerText='Escritorio '+resp[1].escritorio;
    }else{
        lblTicket2.innerText='En espera';
        lblEscritorio2.innerText='de un Ticket';
    }

    if (resp[2]) {
        lblTicket3.innerText='Ticket '+resp[2].numero;
        lblEscritorio3.innerText='Escritorio '+resp[2].escritorio;
    }else{
        lblTicket3.innerText='En espera';
        lblEscritorio3.innerText='de un Ticket';
    }

    if (resp[3]) {
        lblTicket4.innerText='Ticket '+resp[3].numero;
        lblEscritorio4.innerText='Escritorio '+resp[3].escritorio;
    }else{
        lblTicket4.innerText='En espera';
        lblEscritorio4.innerText='de un Ticket';
    }

});

