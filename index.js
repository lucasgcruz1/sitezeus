const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mqtt = require('mqtt'); // Importa a biblioteca MQTT

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let statusLuz = 'desligado';
let velocidade = 0;
let milhas = false;
let radio = false;
let som = false;

// Configurações do broker MQTT

const mqttBroker = 'mqtt://18.231.185.171';
const mqttTopic = 'luz';


// Cria um cliente MQTT
const client = mqtt.connect(mqttBroker);

// Função para publicar mensagens MQTT
function publishToMqtt(message) {
  client.publish(mqttTopic, message);
}

app.get('/statusLuz', (req, res) => {
  res.send(statusLuz);
});

app.post('/statusLuz', (req, res) => {
  statusLuz = (statusLuz === 'desligado') ? 'ligado' : 'desligado';

  // Envia a mensagem MQTT com base no valor atualizado de statusLuz
  if (statusLuz === 'ligado') {
    publishToMqtt('l1');
  } else {
    publishToMqtt('l2');
  }

  res.send(statusLuz);
});

// Resto do seu código...

app.listen(3000, () => {
  console.log('A API está rodando na porta 3000.');
});
