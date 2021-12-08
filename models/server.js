/**
 * Este es el modelo del servidor, aqui levantamos el servidor para tener mas limpio el app.js
 * lo llamamos desde el app.js
 */

//invocamos express
const express = require('express');
//invocamos todas las variables de entorno definidas en .env
require('dotenv').config();
//invocamos el middleware del cors
const cors = require('cors');
const { socketController,crearTicket } = require('../controllers/socket');
//invocamos la conexion con mongo

class Server {

    constructor(){
        //inicializamos la instancia de express
        this.app = express();

        //configuracion de socket.io
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        //definimos el puerto del servidor con el valor de la variable de entorno PORT
        this.port = process.env.PORT;
        //definimos un path general para usuario como API
        //this.usuariosPath='/api/users';
        //this.authPath='/api/auth';
        //this.categoriasPath='/api/categorias';

        this.paths={

        }

        //middleware
        this.middleware();

        //routes
        this.routes();

        //sockets
        this.sockets();
    }

    sockets(){
        this.io.on('connection',socketController);
        this.io.on('connection',crearTicket);
    }

    routes(){
        //invocamos las rutas de usuarios
        

    }



    middleware(){
        //directorio public
        this.app.use(express.static('public'));
        //llamamos el middleware de CORS
        this.app.use(cors());


    }

    //funcion para levantar el servidor
    listen(){
        this.server.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: '+this.port);
        });
    }

}

//exportamos la clase
module.exports=Server;