
const path = require('path');
const fs = require('fs');


class Ticket{

    constructor(numero,escritorio){
        this.numero=numero;
        this.escritorio=escritorio;
    }
}


class TicketControl{

    constructor(){
        //ultimo ticket
        this.ultimo   = 0;

        //dia de hoy
        this.hoy      = new Date().getDate(); //7

        //areglo de tickets
        this.tickets  = [];

        //ultimos 4 tickets que se muestran por pantalla
        this.ultimos4 = [];

        this.init();
    }

    get toJson(){
        return {
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4
        }
    }

    init(){
        const {ultimo,hoy,tickets,ultimos4} = require('../db/data.json');

        if (this.hoy===hoy) {
            //el el mismo dia
            //cargamos data del json
            //el hoy no es necesario
            this.ultimo=ultimo;
            this.tickets=tickets;
            this.ultimos4=ultimos4;
            
        }else{
            //es otro dia
            this.guardarDB();
        }

    }

    guardarDB(){
        //creamos el path de data.json
        const dataPath=path.join(__dirname,'../db/data.json');
        //escribimos el el archivo
        fs.writeFileSync(dataPath,JSON.stringify(this.toJson)); //el get toJson lo pone como propiedad y no como funcion
    }

    siguienteTicket(){
        //sumo uno al ultimo
        this.ultimo+=1;
        //creo el nuevo ticket con el valor de ultimo
        //no hay escritorio todavia asi que null
        const ticket = new Ticket(this.ultimo,null);
    
        //agrego el ticket a la lista de tickets
        this.tickets.push(ticket);
    
        //guardams los datos actualizados
        this.guardarDB();
    
        return 'ticket '+ticket.numero;
}       

    atenderTicket(escritorio){

        //validar

        //ya no hay tickets para atender
        if (this.tickets.length===0) {
            return null;
        }
        
        //obtenemos el primer ticket
        //const ticket = this.tickets[0];

        //quitamos el primero de la lista para no repetir
        //this.tickets.shift();

        //obtener el primer ticket y sacarlo del arreglo
        const ticket = this.tickets.shift();
        //le asigno la propiedad de escritorio
        ticket.escritorio=escritorio;
        //lo agrego a los ultimos4 pero lo agregamos al inicio con unshift
        this.ultimos4.unshift(ticket);

        //validamos que solo esten 4 tickets en ultimos4
        if(this.ultimos4.length>4){
            //si no es asi, eliminamos el ultimo elemento con splice(posicion,cantidad a borrar)
            this.ultimos4.splice(-1,1);
        }

        //guardamos en el data.json los valores actualizados
        this.guardarDB();

        //devuelvo el ticket que estoy atendiendo
        return ticket;
    }

    
}


module.exports=TicketControl;