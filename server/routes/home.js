/* eslint-disable prettier/prettier */
// Importando Router
import { Router } from 'express';

// eslint-disable-next-line prettier/prettier
// Importando al controlador Home
import homeController from '@server/controllers/homeController';

// Creando la instancia de un router
const router = new Router();

// GET '/'
router.get('/', homeController.index);

// GET '/greeting'
router.get('/greeting', homeController.greeting);

// Exportando el router que maneja las subrutas para ale controlador home
export default router;
