const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let statusLuz = 'desligado';
let velocidade = 0;
let milhas = false;
let radio = false;
let som = false;

app.get('/statusLuz', (req, res) => {
  res.send(statusLuz);
});

app.post('/statusLuz', (req, res) => {
  statusLuz = (statusLuz === 'desligado') ? 'ligado' : 'desligado';
  res.send(statusLuz);
});

app.post('/velocidade', (req, res) => {
  velocidade = parseInt(req.body.velocidade);
  res.send('Número atualizado com sucesso!');
});

app.get('/velocidade', (req, res) => {
  res.send(velocidade.toString());
});

app.get('/milhas', (req, res) => {
  res.send(milhas.toString());
});

app.post('/milhas', (req, res) => {
  milhas = !milhas;
  res.send(milhas.toString());
});

app.get('/radio', (req, res) => {
  res.send(radio.toString());
});

app.post('/radio', (req, res) => {
  radio = !radio;
  res.send(radio.toString());
});

app.get('/som', (req, res) => {
  res.send(som.toString());
});

app.post('/som', (req, res) => {
  som = !som;
  res.send(som.toString());
});

app.listen(3000, () => {
  console.log('A API está rodando na porta 3000.');
});
