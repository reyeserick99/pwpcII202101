/* eslint-disable prettier/prettier */
// Importando el paquete Dotenv
import dotenv from 'dotenv';

// Cargar las variables del entorno
dotenv.config();

// Exportando valores de configuracion
// Configuracion
export default{
    homeUrl:`${process.env.APP_URL}:${process.env.PORT}`,
    port: process.env.PORT,
    ip: process.env.IP, 
    databaseUrl: process.env.DATABASE_URL,
};
