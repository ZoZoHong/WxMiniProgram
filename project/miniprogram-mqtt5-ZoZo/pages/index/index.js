//index.js
//获取应用实例
const app = getApp()

Page({
    data:{
        client: null,
        topic:{
            LedControlTopic:'ZoZo/LedControlTopicOut'
        },
        Led:{
            buttonflag: true,
            value:100,
            status: '开'
        }
    },
    LedControl: function(e){
        var that = this;
        if(that.data.Led.buttonflag){
            this.setData({
                'Led.buttonflag':false,
                'Led.status':'关'
            })
        that.data.client.publish(that.data.topic.LedControlTopic,'2关灯');   
        } else {
            this.setData({
                'Led.buttonflag':true,
                'Led.status':'开'
            })
        that.data.client.publish(that.data.topic.LedControlTopic,'1开灯');  
        }
    },

    onLoad: function() {
        var that = this;
        this.data.client = app.globalData.client;
    
        // console.log("on load");
    
        that.data.client.on('connect', that.ConnectCallback);
        that.data.client.on("message", that.MessageProcess);
        that.data.client.on("error", that.ConnectError);
        that.data.client.on("reconnect", that.ClientReconnect);
        that.data.client.on("offline", that.ClientOffline);
        
        that.data.client.subscribe('ZoZo/LedControlTopicIn',function(err,granted){
            if(!err){
                wx.showToast({
                  title: '订阅成功',
                })
            }
        });


      },
    MessageProcess: function(topic, payload) {
        var that = this;
    
        var payload_string = payload.toString();
          if (topic == that.data.topic.HumdTopic) {
            that.setData({
              'value.HumdValue': payload_string
            })
          }
          if (topic == that.data.topic.TempTopic) {
            that.setData({
              'value.TempValue': payload_string
            })
          }
          if(topic == 'ZoZo/LedControlTopicIn'){
              if(payload_string === 'On' ){
                  that.setData({
                    'Led.buttonflag':true,
                    'Led.status':'开'
                  })
              } else {
                that.setData({
                    'Led.buttonflag':false,
                    'Led.status':'关'
                })
              }
              
          }
    
      },
    ConnectCallback: function(connack) {
        var that = this;
         console.log("connect callback ");
        for (var v in that.data.topic) {
          that.data.client.subscribe(that.data.topic[v], {
            qos: 1
          });
        }
      },
    ConnectError: function(error) {
        console.log(error)
      },
    
    ClientReconnect: function() {
        console.log("Client Reconnect")
      },
    
    ClientOffline: function() {
        console.log("Client Offline")
      }
    

})