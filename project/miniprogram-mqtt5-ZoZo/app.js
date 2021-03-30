import mqtt from './utils/mqtt.js';

const host = 'wxs://mqttx.cn:8084/mqtt';
const options = {
  protocolVersion: 5, //MQTT连接协议版本
  clientId:'miniprogram-ZoZo',
  clean: true,

  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  resubscribe: true
};

App({
  onLaunch: function() {

  },

  globalData: {
    client_ID:"wxtest",
    client: mqtt.connect(host, options),
  },
})