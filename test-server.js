var express = require('express');
app.set('./views', 'hbs');
var app = express();
app.get('/', function (request, response) {
  response.send('Hello World!');
});
app.get('/about', function (request, response) {
  response.send('About Me');
});
app.get('/projects', function (request, response) {
  response.send('Projects');
});
app.get('/post/:slug', function (request, response) {
  var slug = request.params.slug;
  response.send('Post About: ' + slug);
});
app.get('/hello', function (request, response) {
  var name = request.query.name || 'World';
  var context = {title: 'Hello', name: name};
  response.render('hello.hbs', context);
});
///for static files
app.use(express.static('public'));

app.listen(8000, function () {
  console.log('Listening on port 8000');
});
