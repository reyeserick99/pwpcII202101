/* eslint-disable prettier/prettier */
// Importando biblioteca ODM
import mongoose from 'mongoose';
// Importando script para el log
import winston from './winston';

class MongooseODM { 
    // Constructor
    constructor(url){
        this.url = url;
    }

    async connect(){
        // Sustituyendo sistema de promesas
        // de mongoose por el JavaScript
        mongoose.Promise = global.Promise;
        winston.info(`Conectando a la base de datos en: ${this.url}`);
        try {
            await mongoose.connect(this.url);
        return true;            
        } catch (error) {
            winston.error(
                `Error en conectarse a la base de datos en: ${error.message}`
            );
            // Se returna en casdo que no se realice conexion exitosa
            return false;
        }
    }
}

export default MongooseODM;