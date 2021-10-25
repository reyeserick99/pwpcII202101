/* eslint-disable prettier/prettier */
// Importando el router de Home
import homeRouter from './home';
// Importando router de user
import userRouter from './user';

// Agregando las rutas a la aplicación
const addRoutes = (app) => {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    return app;
};

export default {
    addRoutes,
};