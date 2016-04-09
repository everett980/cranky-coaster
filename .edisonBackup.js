/*jslint node:true, vars:true, bitwise:true, unparam:true */$
/*jshint unused:true */$
$
/*$
 *    Pulse Width Modulation, or PWM, is a technique for getting analog results with digital means.$
 *    $
 *       A simple node.js application intended to read and write analog values to fade a LED from Digital pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.$
 *       $
 *          MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms$
 *             Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.$
 *             $
 *                Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image$
 *                   Using a ssh client: $
 *                      1. echo "src maa-upm https://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf$
 *                         2. opkg update$
 *                            3. opkg upgrade$
 *                            $
 *                               Article: httpss://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates$
 *                                  */$
$
var mraa = require("mraa"); //require mraa$
var rp = require('request-promise');$
//Initialize PWM on Digital Pin #3 (D3) and enable the pwm pin$
//var pwm3 = new mraa.Pwm(3);$
//pwm3.enable(true);$
//var analogPin0 = new mraa.Aio(0);$
//$
//var body = '';$
//$
////test https$
///* https.get("https://nameless-beyond-23569.herokuapp.com/send")$
//   .on('data', function(data) { body+=data; console.log('data got');})$
//      .on('end', function() {console.log(body); })$
//         .on('error', function(err) { console.error(err); }); */$
//         //set the period in microseconds.$
//         pwm3.period_us(2000);$
//         var value = 0.0;$
//         $
//         var isUp = true;$
//         var weights = [0];$
//         var lastLogged = '[]';$
//         var hasDowned = false;$
//         $
//         setInterval(function () {$
//         ^Iif (value >= 1.0) {$
//         ^I^Ivalue = 0.0;$
//         ^I}$
//         $
//         ^Ivar waterWeight = analogPin0.read();$
//         ^IisUp = waterWeight < 20;$
//         $
//         ^Iif(isUp) {$
//         ^I^Iif(weights[weights.length - 1]) weights.push(0);$
//         ^I^IhasDowned = false;$
//         ^I} else {$
//         ^I^Iif(!hasDowned) {$
//         ^I^I^Iif(weights.length > 1) {$
//         ^I^I^I^IsetTimeout(function() {$
//         ^I^I^I^I^Ivar val = (weights[weights.length - 3] - weights[weights.length - 2]);$
//         ^I^I^I^I^Irp({$
//         ^I^I^I^I^I^Ibody: JSON.stringify({ changeInForce: val }),$
//         ^I^I^I^I^I^Imethod: 'POST',$
//         ^I^I^I^I^I^Iuri: 'https://lit-savannah-65925.herokuapp.com/api/cupReadings',
//                                                         headers: {
//                                                                                                                 'Content-Type': 'application/json',
//                                                                                                                                                                 },
//                                                                                                                                                                                                         }).then(null, console.error.bind(console));
//                                                                                                                                                                                                                                         }, 1000);
//                                                                                                                                                                                                                                                                         hasDowned = true;
//                                                                                                                                                                                                                                                                                                 }
//                                                                                                                                                                                                                                                                                                                         if(waterWeight > weights[weights.length - 1]) weights[weights.length - 1] = waterWeight;
//                                                                                                                                                                                                                                                                                                                                         }
//
//                                                                                                                                                                                                                                                                                                                                                         value = value + 0.03;
//                                                                                                                                                                                                                                                                                                                                                                         pwm3.write(value); //Write duty cycle value.
//
//                                                                                                                                                                                                                                                                                                                                                                                         //process.stdout.write(analogPin0.read() + ", ");
//                                                                                                                                                                                                                                                                                                                                                                                                         if(weights.toString().localeCompare(lastLogged)) {
//                                                                                                                                                                                                                                                                                                                                                                                                                                 console.log(weights.toString());
//                                                                                                                                                                                                                                                                                                                                                                                                                                                         lastLogged = weights.toString();
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                         }
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 }
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 },100);
