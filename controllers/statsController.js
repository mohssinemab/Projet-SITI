const Shift = require('../models/Shift');
const Break = require('../models/Break')
const Operateur = require('../models/Operateur');
const Counter = require('../models/Counter');
const mongoose = require('mongoose')

exports.getcounterbyoperateur = async (req, res) => {
    try {
        const id = req.body.id;
        let datedebut = req.body.datedebut;
        let datefin = req.body.datefin;

        if (datedebut == undefined && datefin == undefined) {

            let c = await Counter.find().populate('shift');
            let data = [];
            c.forEach(doc => {
                if (doc.shift.operateur == id) {
                    data.push(doc);
                }
            })

            res.send(data);
        } else if (datedebut != undefined && datefin == undefined) {
            datedebut = new Date(datedebut);
            datedebut = new Date(datedebut.toISOString())

            console.log("----- datedebut : ", datedebut);
            console.log("----- dateFIN : ", datefin);

            let c = await Counter.find({
                createdAt: {
                    $gte: datedebut
                }
            }).populate('shift');
            let data = [];
            c.forEach(doc => {
                if (doc.shift.operateur == id) {
                    data.push(doc);
                }
            })

            res.send(data);


        } else {
            datedebut = new Date(datedebut);
            datefin = new Date(datefin);

            console.log("----- datedebut : ", datedebut);
            console.log("----- datefin : ", datefin);

            let c = await Counter.find({
                createdAt: {
                    $gte: datedebut,
                    $lte: datefin
                }
            }).populate('shift');
            let data = [];
            c.forEach(doc => {
                if (doc.shift.operateur == id) {
                    data.push(doc);
                }
            })

            res.send(data);
        }
    } catch (err) {
        res.status(400).send(err);
    }
}


exports.getcounterbymachine = async (req, res) => {
    try {
        const id = req.body.id;
        let datedebut = req.body.datedebut;
        let datefin = req.body.datefin;

        if (datedebut == undefined && datefin == undefined) {

            let c = await Counter.find().populate('shift');
            let data = [];
            c.forEach(doc => {
                if (doc.shift.machine == id) {
                    data.push(doc);
                }
            })

            res.send(data);
        } else if (datedebut != undefined && datefin == undefined) {
            datedebut = new Date(datedebut);
            datedebut = new Date(datedebut.toISOString())

            console.log("-----/ datedebut : ", datedebut);
            console.log("-----/ dateFIN : ", datefin);

            let c = await Counter.find({
                createdAt: {
                    $gte: datedebut
                }
            }).populate('shift');
            let data = [];
            c.forEach(doc => {
                if (doc.shift.machine == id) {
                    data.push(doc);
                }
            })

            res.send(data);


        } else {
            datedebut = new Date(datedebut);
            datefin = new Date(datefin);
            console.log("----- datedebut : ", datedebut);
            console.log("----- datefin : ", datefin);

            let c = await Counter.find({
                createdAt: {
                    $gte: datedebut,
                    $lte: datefin
                }
            }).populate('shift');
            let data = [];
            c.forEach(doc => {
                if (doc.shift.machine == id) {
                    data.push(doc);
                }
            })
            console.log("data : ",data);
            res.send(data);
        }
    } catch (err) {
        res.status(400).send(err);
    }
}


exports.getallbreaksbyoperateur = async (req, res) => {
    try {
        const id = req.params.id;
        const docs = await Shift.find({ operateur: id }).populate('breaks');

        let brs = [];
        if (docs.length == 0) { res.send("No shifts") }
        docs.forEach(doc => {
            if (doc.breaks.length > 0) {
                doc.breaks.forEach(d => {
                    brs.push(d);
                })
            }
        })
        if (brs.length == 0) { res.send("No breaks") }
        res.send(brs)
    } catch (err) {
        res.status(400).send(err)
    }

}


exports.getallbreaksbymachine = async (req, res) => {
    try {
        const id = req.params.id;
        const docs = await Shift.find({ machine: id }).populate('breaks');

        let brs = [];
        if (docs.length == 0) { res.send("No shifts for this machine") }
        docs.forEach(doc => {
            if (doc.breaks.length > 0) {
                doc.breaks.forEach(d => {
                    brs.push(d);
                })
            }
        })
        if (brs.length == 0) { res.send("No breaks for this machine") }
        res.send(brs)
    } catch (err) {
        res.status(400).send(err)
    }



}


exports.getshiftsbyoperateurbydate = async (req, res) => {
    try {
        const id = req.body.id;
        let datedebut = req.body.datedebut;
        let datefin = req.body.datefin;

        datedebut = new Date(datedebut);
        datefin = new Date(datefin);


        const sh = await Shift.find({
            operateur: id,
            createdAt: {
                $gte: datedebut,
                $lte: datefin
            }
        })
        res.send(sh)
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }

}


exports.getmachineswithnumberofbreaks = async (req, res) => {

    try {

        let data = [];
        const machines = await Shift.find().distinct('machine')
        console.log("machines  : ", machines);
        machines.forEach(async mach => {
            let n = 0;
            const docs = await Shift.find({ machine: mach }).populate('breaks');

            docs.forEach(s => {
                console.log("shift  : ", s);

                n += s.breaks.length;
                console.log(n);
            })
            console.log(n);
            let doc = {
                machine: mach,
                breaks: n
            }
            console.log(doc);
            data.push(doc)
            console.log("ssssssssssdaaaaata :", data);


        })

        console.log("daaaaata :", data);
            res.send(data)
        


    } catch (err) {
        res.status(400).send(err)
    }
}



// try {

//     let data=[];
//     const machines = await Shift.find().distinct('machine')
//     console.log("machines  : ", machines );
//     machines.forEach(async mach => {
//         let n=0;
//         const sh = await Shift.find({ machine: mach }).populate('breaks');
//         sh.forEach(s => {
//             console.log("shift  : ",s);

//             n+=s.breaks.length;
//             console.log(n);
//         })
//         console.log(n);
//         let doc = {
//             "machine":mach,
//             "breaks" : n
//         }
//         console.log(doc);
//          data.push(doc)
//     })
//     console.log("daaaaata :",data);
//     res.send(data)

// } catch (err) {
//     res.status(400).send(err)
// }

exports.getoperateurstats = async (req, res) => {
    try {
        const id = req.params.id;
        let stats = {};
        const sh = await Shift.find({ operateur: id }).populate('breaks').populate('operateur', '_id username name role score')

        stats.operateur = sh[0].operateur;
        stats.nbrshifts = sh.length;
        stats.nbrproduit = 0;
        stats.nbrbreaks = 0
        stats.nbrbreaksjustifiee = 0;
        stats.nbrbreaksnonjustifiee = 0

        sh.forEach(doc => {
            if (doc.breaks.length > 0) {
                stats.nbrbreaks += doc.breaks.length;
                doc.breaks.forEach(d => {
                    if (d.justification == "non justifiee") {
                        stats.nbrbreaksnonjustifiee += 1;
                    } else {
                        stats.nbrbreaksjustifiee += 1;
                    }

                })
            }
        })

        let c = await Counter.find().populate('shift');
        let data = [];
        c.forEach(doc => {
            if (doc.shift.operateur == id) {
                data.push(doc);
            }
        })

        data.forEach(d => {
            stats.nbrproduit += d.counter;
        })

        res.send(stats)
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }

}