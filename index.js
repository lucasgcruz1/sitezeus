const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let statusLuz = 'desligado';
let velocidade = 0;
let milhas = 'desligado';
let radio = false;
let som = false;
let latitude = 0.0;
let longitude = 0.0;

// Configurações do broker MQTT
const mqttBroker = 'mqtt://18.231.185.171';
const mqttTopic = 'luz';

// Cria um cliente MQTT
const client = mqtt.connect(mqttBroker);

// Função para publicar mensagens MQTT
function publishToMqtt(message) {
  client.publish(mqttTopic, message);
}

// Função para processar as mensagens MQTT recebidas
function processMqttMessage(message) {
  if (message === 'l1') {
    statusLuz = 'ligado';
  } else if (message === 'l2') {
    statusLuz = 'desligado';
  }
  if (message === 'm1') {
    milhas = 'ligado';
  } else if (message === 'm2') {
    milhas = 'desligado';
  }

  // Aqui você pode adicionar qualquer lógica adicional que desejar
}

// Assina o tópico MQTT para receber mensagens
client.on('connect', () => {
  client.subscribe(mqttTopic);
});

// Processa as mensagens MQTT recebidas
client.on('message', (topic, message) => {
  processMqttMessage(message.toString());
});

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


app.get('/milhas', (req, res) => {
    res.send(milhas);
  });
  
  app.post('/milhas', (req, res) => {
    milhas = (milhas === 'desligado') ? 'ligado' : 'desligado';
  
    // Envia a mensagem MQTT com base no valor atualizado de statusLuz
    if (milhas === 'ligado') {
      publishToMqtt('m1');
    } else {
      publishToMqtt('m2');
    }
  
    res.send(milhas);
  });
 
 
  app.get('/latitude', (req, res) => {
    res.send(latitude.toString());
  });

  

  // Função para processar as mensagens MQTT recebidas
function processMqttMessage(message) {
  if (message === 'l1') {
    statusLuz = 'ligado';
  } else if (message === 'l2') {
    statusLuz = 'desligado';
  }
  if (message === 'm1') {
    milhas = 'ligado';
  } else if (message === 'm2') {
    milhas = 'desligado';
  }

  if (message.startsWith('lat=')) {
    const numbers = message.match(/-?\d+\.\d+/g);
    if (numbers && numbers.length > 0) {
      latitude = parseFloat(numbers[0]);
      console.log(latitude);
    }
  }

  if (message.startsWith('long=')) {
    const numbers = message.match(/-?\d+\.\d+/g);
    if (numbers && numbers.length > 0) {
      longitude = parseFloat(numbers[0]);
      console.log(longitude);
    }
  }
}

app.get('/longitude', (req, res) => {
    res.send(longitude.toString());
  });

   // Função para processar as mensagens MQTT recebidas

    

// Resto do seu código...

app.listen(3000, () => {
  console.log('A API está rodando na porta 3000.');
});
