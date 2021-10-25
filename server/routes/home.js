/* eslint-disable prettier/prettier */
// Importando router
import { Router } from 'express';

// iportando al controlador home
import homeController from "@server/controllers/homeController";

// Creando  la instanca  de un router
const router = new Router();

// GET '/'
router.get('/', homeController.index);

// GET '/greeting'
router.get('/greeting', homeController.greeting);  

// Exportando el router que maneja las subrutas para el controlador Home
export default router;