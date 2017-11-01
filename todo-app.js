var express = require('express');
var app = express();
var pgp = require('pg-promise')({});
var db = pgp({database: 'tasks'});

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.redirect('/todos');
});

app.get('/todos', function (req, res, next) {
  let query = "SELECT * FROM tasks";
  db.any(query)
    .then(function(resultsArray) {
      res.render('todo.hbs', {
        results: resultsArray
      });
    })
    .catch(next);
});

app.post('/submit', function(req, res, next){
  let description = req.body.description;
  var query = "INSERT INTO tasks \
      VALUES (default, $1)";
  db.result(query, description)
    .then(function(result){
      console.log(result);
      res.redirect('/todos')
    })
    .catch(next)
});

app.get('/todos/done/:id', function(req, res, next){
  var id = req.params.id;
  var query = 'UPDATE tasks SET done = true WHERE id = $1'
  db.result(query, id)
    .then(function(result){
      console.log(result)
      console.log(query)
      res.redirect('/todos')
    })
    .catch(next)
});

app.listen(8000, function () {
  console.log('Listening on port 8000');
});
