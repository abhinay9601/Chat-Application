/*******************************************************************/
 /* what should be their in this middle ware 
 * authenticate the call
 * channel -- enum ecommerce  , chat , iot etc
 * if ecommerce than invoice key ,
 * merchant key ,
 * product information , 
 * description ,
 * price amount ,
 * pay amount
 */  
 /**********************************************************************/

//qos is not working need to change with paho 


import env from './env'
import MQTT from 'mqtt'
import './database/db';
import messagecontroller from "./controller/messageController"

var client = MQTT.connect(env.MQTT_CONNECTION);
 
/**
 * what type of call will come 
 * a) address creation , transaction from the node
 * b) request from the merchant 
 * d) session alive management
 **/
/**
 * in future all will be in mongodb
 */
function defaultSubscription(){

    var array_of_subscription = [
        'channel/presence',
        'channel/invoice',
        'channel/merchant',
        'identifier/presence',
        'identifier/invoice',
        'identifier/merchant',
  ];
    return array_of_subscription;
} 

client.on('connect', function () {
    defaultSubscription().forEach(element => {
        client.subscribe(element);
    });
     
});
//creating mockup
//send api key and secreate key & ip -- channel/presence/merchantkey and subscribe to identifier/presence/merchantkey
// authentication will happen on broker side --  channel/presence/merchantkey and publish  to identifier/presence/merchantkey
//after authentication from broker session-key will be create and publish   to identifier/presence/merchantkey
//proccess 
 
client.on('message', MSG);  
function MSG(topic, message){
    var message = message.toString();
    console.log(topic, message);
    var merchantMsg  = JSON.parse(message);   
    var newtopic = topic.split('/')[0] + "/" + topic.split('/')[1];
    switch (newtopic){
        case  "channel/presence" :
            if (merchantMsg.merchant_id) {
                //authentication 
                //jwt token 
                   var insert_json_data = {
                    "message_topic": topic,
                    "message": message                     
                }                 
                
                messagecontroller.create(insert_json_data, function (e) {
                    console.log(e);
                });
              
                var response = '{ "MerchantName": "findmeeveryday", "message": "welcome to fastest payment gateway", "session-id": "4545-558KAR-45" }';
                client.publish('identifier/presence', response);
            }
        break;
        case "channel/invoice":
            if (merchantid.merchant_id) {
                var response = '{ "MerchantName": "findmeeveryday", "message": "welcome to fastest payment gateway", "session-id": "4545-558KAR-45" }';
                client.publish('identifier/presence/' + merchantid.merchant_id, response);
            }
        break;
        case "channel/merchant":
        break;
        default:
            console.log(topic, message);
        break;
    }

    
}
// // message is Buffer
// var message = message.toString();
// console.log(topic, message);
// // json parse and subscribe and publish
// // client.subscribe('channel/presence/', function (err) {
// //     if (!err) {


// //     }
// // });
// var response = '{ "MerchantName": "findmeeveryday", "message": "welcome to fastest payment gateway", "session-id": "4545-558KAR-45" }';
// client.publish('identifier/presence/1575615410', response);
  // client.end()