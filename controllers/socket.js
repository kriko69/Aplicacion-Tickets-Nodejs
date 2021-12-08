const TicketControl = require("../models/ticket-control");

const ticket = new TicketControl();


const socketController = (socket)=>{
    console.log('cliente conectado',socket.id);
    
    socket.on('disconnect',()=>{
        console.log('cliente desconectado');
    });

    //alerta al evento enviarmensaje
    socket.on('enviar-mensaje',(mensaje,callback)=>{
        //console.log('Se recibio el mensaje',mensaje);
        //callback de la funcion emit del cliente
        callback('Se envio el mensaje a los clientes');
        //emito un evento a todos los clientes mandando el mensaje
        //con broadcast se envia el mensaje a todos los clientes menos a el mismo
        socket.broadcast.emit('recibir-mensaje',mensaje);
    });
}

const crearTicket = (socket)=>{
    
    socket.emit('ultimo-ticket',ticket.ultimo);
    socket.emit('ultimos-4',ticket.ultimos4);
    socket.emit('estado-actual',ticket.tickets.length);

    socket.on('crear-ticket',(payload,callback)=>{
        const siguiente=ticket.siguienteTicket();
        callback(siguiente);

        //notificar que hay un ticket pendiente
        socket.broadcast.emit('estado-actual',ticket.tickets.length);
    });

    socket.on('atender-ticket',(payload,callback)=>{

        if(!payload.escritorio)
        {
            return callback({
                ok:false,
                msg:'El escritorio es obligatorio'
            });
        }

        const tck = ticket.atenderTicket(payload.escritorio);

        //notificar cambios
        socket.broadcast.emit('ultimos-4',ticket.ultimos4);
        //para que se actualice en el cliente actual
        socket.emit('estado-actual',ticket.tickets.length);
        //para que se actualice en los demas clientes
        socket.broadcast.emit('estado-actual',ticket.tickets.length);

        if (!tck) {
            callback({
                ok:false,
                msg:'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok:true,
                msg:tck
            });
        }

    });

}


module.exports={
    socketController,
    crearTicket
}