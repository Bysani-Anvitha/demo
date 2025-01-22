// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
var comments = [];
app.get('/', function(req, res) {
    res.render('home');
});
app.get('/comment', function(req, res) {
    res.render('comment', {comments: comments});
});
app.post('/comment', function(req, res) {
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), function() {
        res.redirect('/comment');
    });
});
app.listen(3000, function() {
    console.log('Server is running on port 3000.');
});
