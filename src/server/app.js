const express = require('express');
const app = express();
const path = require('path');
const port = 8453; // Puerto TILE = 8453
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// View engine setup
app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'ejs');  

app.get('/', (req, res) => {
  res.send("spritTile v1.0.0");
});

app.set('port', port);
app.set('url', `http://localhost:${port}`);

try {
  app.listen(port, () => {
    console.log(`Servidor funcionando en la url: ${app.get('url')}`);
  });
} catch(err){
  console.log(err);
}

module.exports = app;