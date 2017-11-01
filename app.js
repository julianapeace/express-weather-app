//express class notes
var express = require('express');
var app = express();
var pgp = require('pg-promise')({});
var db = pgp({database: 'restaurant'});

//As of 10/31/2017, Express now supports a native body-parsers. no need for this middleware.
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: false}));
//instead of url handlers on the bottome, they're created and called right here.
//express is very minimal, you have to add a 404 page if you try to go to a nonexisting URL. However, you still get the correct code in the background.
app.set('view engine', 'hbs');
///for static files
app.use(express.static('public'));
//the way paul likes to do it, have to had /static in front of the url
//app.use('/static', express.static('public'))

app.get('/', function (request, response) {
  response.send('Hello World!');
});
app.get('/about', function (request, response) {
  response.render('about.hbs', {title: 'About Us'});
});
app.get('/projects', function (request, response) {
  response.send('Projects');
});
app.get('/post/:slug', function (request, response) {
  //istead of regex, u use a colon and a variable. it will extract that from the url.
  //request the url parameters.
  var slug = request.params.slug;
  response.send('Post About: ' + slug);
});
app.get('/form', function(request, response){
  response.render('forms.hbs', {title: 'FORM'});
});
app.post('/submit', function(request, response){
  console.log(request.body);
  // response.send('OK ' + request.body.name);
  response.redirect('/hello');
})
app.get('/hello', function (request, response) {
  //get the request query name, the double pipes are 'OR', if nothing is there, it will pick up the OR default
  var name = request.query.name || 'World';
  var friends = [
      {name: 'joe'},
      {name: 'darth'}
  ]
  var context = {
    title: 'Hello Express APP',
    name: name,
    friends: friends,
    age: 21
  };
  response.render('hello.hbs', context);
});

//how to search your database, use pg-promise
//we get a callback called next for every viewhandler
app.get('/search', function(request, response, next) {
  let term = request.query.searchTerm;

  //this is looking for a case insensitive search
  //the percent means it contains this term
  let query = "SELECT * FROM restaurant WHERE \
  restaurant.name ILIKE '%$1#%'";
  db.any(query, term)
    .then(function(resultsArray) {
      console.log(resultsArray)
      response.render('search_results.hbs', {
        results: resultsArray
      });
    })
    .catch(next);
});

//u get a call back once that port has been connected to
app.listen(8000, function () {
  console.log('Listening on port 8000');
});
//to use nodemon use it in the terminal instead of node.
//nodemon is hidden now in "ls ./node_modules/.bin/nodemon./node_modules/.bin/nodemon"
//now change it so its in your part
//nano ~/.bash_profile
// add "export PATH=$PATH:./node_modules/.bin"
//now restart the terminal
