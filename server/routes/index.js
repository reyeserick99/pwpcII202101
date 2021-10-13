var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author: 'Reyes ', appName: ' WebApp', company:"awesome software"});

  res.render('index', { title: 'Express', author: 'Erick Reyes G ', appName: ' WebApp', company:"Awesome Software"});
});


/*AGREGANDO RUTA NUEVA*/
router.get('/greeting', function(req, res, next){
  res.send('BUENAS')

});

module.exports = router;



/*[BROWSER] --> request{info} -->  http --> [SERVER] --> GET --> [] -->/ [greeting] res --> [] --> [¨BROWSER] */
