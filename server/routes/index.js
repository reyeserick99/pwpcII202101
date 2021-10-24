/* eslint-disable prettier/prettier */
import { Router } from 'express';
// Importando el router de Home
import home from './home';

const router = new Router();

/*  GET home page. */
router.use('/', home);

module.exports = router;