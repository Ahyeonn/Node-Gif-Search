require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const expressSanitizer = require('express-sanitizer');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");
app.use(express.json());
app.use(express.static('public'));
app.use(expressSanitizer());


app.get('/', (req, res) => {
    let term = "";
    if (req.query.term) {
      term = req.sanitize(req.query.term)
    }
    fetch(`https://g.tenor.com/v1/search?q=${ term }&key=${process.env.API_KEY}&limit=10`)
    .then(response => response.json())
    .then(
      (data) => {
        const gifs = data.results;
        res.render('home', { gifs });
      }
    );
  }
);

app.listen(3000, 
    () => {
      console.log(`Gif Search listening on http://localhost:3000/`);
    }
  );

app.get('/hello/:name', 
  (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
  }
);