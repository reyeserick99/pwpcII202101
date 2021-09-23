var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author: 'Erick Reyes G ', appName: ' WebApp', company:"awesome software"});
});


/*[BROWSER] --> request{info} -->  http --> [SERVER] --> GET --> [] -->/ [greeting] res --> [] --> [¨BROWSER] */

/*AGREGANDO RUTA NUEVA*/
router.get('/greeting', function(req, res, next){
  res.send('BUENAS')

});

module.exports = router;
