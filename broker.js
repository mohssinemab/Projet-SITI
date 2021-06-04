const mqtt = require('mqtt');
const Counter = require('./models/Counter');
const Operateur = require('./models/Operateur');
const Shift = require('./models/Shift');
const Machine = require('./models/Machine');
const Break = require('./models/Break');
const mongoose = require('mongoose')


exports.connectmqtt = () => {

  this.mqttClient = mqtt.connect('mqtt://144.91.113.92:1883', { username: 'siti', password: 'siti@2021' });

  this.mqttClient.on('error', (err) => {
    console.log("Error MQTT : " + err);
    this.mqttClient.end();
  });

  this.mqttClient.on('connect', () => {
    console.log(`mqtt client connected`);
  });

  this.mqttClient.subscribe('#');

  this.mqttClient.on('message', async function (topic, message) {
    let f = parseInt(topic.slice(1, 3));
    let r = parseInt(topic.slice(5, 7));
    let m = parseInt(topic.slice(9, 11));

    let topicRecu = topic.slice(12, topic.length);

    let hbreaks = [];
    if (topicRecu == "counter") {
      if (parseInt(message) < 7 && parseInt(message) != -1 && parseInt(message) != 0) {
        console.log(" Bad counter : ", topic, " - ", parseInt(message))

        // mark the break
        const mach = await Machine.findOne({ factory: f, room: r, machine: m });
        if (mach) {
          mongoose.set('useFindAndModify', false);
          console.log(" ----- table hbreaks :  ",hbreaks);
          let condition = false;
          let breakalert = false;
          hbreaks.forEach(hb => {
            if (hb.mach == mach) {
              
              hb.index++;
              condition = true;
              console.log(" hbreak found , mach : ",mach," index after incr : ",hb.index );
              if (hb.index >= 6) {
                breakalert = true;
              }
            }
          })
          console.log(" ----- condition  :  ",condition);

          if (condition == false) {
            let doc = {
              machine: mach,
              index: 1
            }
            console.log(" ----- doc to push :  ",doc);

            await hbreaks.push(doc)
            console.log(" ----- hbreaks:  ",hbreaks);

          }
          if (breakalert == true) {
            // check if the machine already in a break
            const s = await Shift.findOne({ machine: mach._id, datefin: null }).populate('breaks');
            const l = s.breaks.length;
            if (l > 0) {
              const lastbreak = s.breaks[l - 1];

              if (lastbreak.breakend != null) {
                console.log("====No break alive , we'll create one : ")
                let b = new Break();
                const update = {
                  $push: {
                    breaks: b
                  }
                };
                await Shift.findOneAndUpdate({ machine: mach._id, datefin: null }, update, { returnNewDocument: true })
                  .then(async doc => {
                    if (doc) {
                      const res = await b.save();
                      console.log('-- Break well added  ');
                    } else {
                      console.log('-- Shift not found ');
                    }
                  })
                  .catch(err => console.error(`Failed to find and update shift : ${err}`))

                // send -1 on the broker
                const stop = '-1';
                const options = {
                  retain: false,
                  qos: 0
                };
                sendmsg(topic, stop, options);
              } else {
                console.log(" ---------------Machine : ", topic, "  already in a break")

              }


            } else {
              console.log("====Shift was never in a break , we'll create one : ")

              let b = new Break();
              const update = {
                $push: {
                  breaks: b
                }
              };
              await Shift.findOneAndUpdate({ machine: mach._id, datefin: null }, update, { returnNewDocument: true })
                .then(async doc => {
                  if (doc) {
                    const res = await b.save();
                    console.log('-- Break well added  ');
                  } else {
                    console.log('-- Shift not found ');
                  }
                })
                .catch(err => console.error(`Failed to find and update shift : ${err}`))

              // send -1 on the broker
              const stop = '-1';
              const options = {
                retain: false,
                qos: 0
              };
              sendmsg(topic, stop, options);

            }


          }

        } else {
          console.log(" ---------------Machine not Found :  ", topic)

        }

      } else if (parseInt(message) >= 7) {
        console.log(" Good counter : ", parseInt(message))

        // find the exact machine
        const mach = await Machine.findOne({ factory: f, room: r, machine: m });

        // find the shift
        if (mach) {


          await Shift.findOne({ machine: mach._id, datefin: null, produit: { $ne: "GHOST" } }
            , async (err, doc) => {
              if (!err && doc) {
                let c = new Counter({
                  shift: doc._id,
                  counter: parseInt(message)
                });
                let result = await c.save();
                console.log(" Counter save ------ : ", result);
              } else if (!doc) {

                const gh_op = await Operateur.findOne({ role: "ghost" });
                console.log("ghost op : ", gh_op);
                console.log(mach)

                const gh_sh = await Shift.findOne({ operateur: gh_op._id, datefin: null });
                console.log(" --- ghost shift : ", gh_sh);

                let c = new Counter({
                  shift: gh_sh._id,
                  counter: parseInt(message)
                });
                let result = await c.save();
                console.log(" --- Counter GHOST save ------ : ", result);

              } else {
                console.log(" Erreur : ", err);
              }
            })
        } else {
          console.log(" ---------------Machine not Found :  ", topic)

        }


      } else {
        // Nan message
        console.log("Random msg : ", topic, "    --    ", message.toString())
      }
    } else {
      // flow or other topic
      console.log("Random topic [ ", topic, "    --    ", message.toString(), " ]")

    }

  });

  this.mqttClient.on('close', () => {
    console.log(`mqtt client disconnected`);
  });

  sendmsg = (topic, msg, options) => {
    this.mqttClient.publish(topic, msg, options, () => {
      console.log("-----------> BREAK   -1 sent ")
    });
  }

}
