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
            datedebut = new Date(datedebut)

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
            console.log("data : ", data);
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
        const x= machines.length - 1;
        machines.forEach(async (mach,l,machines) => {
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
            console.log("l : ",l,"  length : ",x, "  condition : ",l == x); 

            if (l == x) {
                console.log("--------------daaaaata :", data);
    
                res.send(data)
            }

        })

        
        


    } catch (err) {
        res.status(400).send(err)
    }
}





exports.getoperateurstats = async (req, res) => {
    try {
        let stats = [];

        const ids = await Shift.find().distinct('operateur');
        console.log(ids);
        ids.forEach(async (id, l, ids) => {
            let sh = await Shift.find({ operateur: id }).populate('breaks').populate('operateur', '_id username name role score')
            let stat = {};
            stat.operateur = sh[0].operateur;
            stat.nbrshifts = sh.length;
            stat.nbrproduit = 0;
            stat.nbrbreaks = 0
            stat.nbrbreaksjustifiee = 0;
            stat.nbrbreaksnonjustifiee = 0

            sh.forEach(doc => {
                if (doc.breaks.length > 0) {
                    stat.nbrbreaks += doc.breaks.length;
                    doc.breaks.forEach(d => {
                        if (d.justification == "non justifiee") {
                            stat.nbrbreaksnonjustifiee += 1;
                        } else {
                            stat.nbrbreaksjustifiee += 1;
                        }

                    })
                }
            })

            let c = await Counter.find().populate('shift');
            c.forEach(doc => {
                if (JSON.stringify(doc.shift.operateur._id) == JSON.stringify(id)) {
                    stat.nbrproduit += doc.counter;
                }
            })
            
            stats.push(stat)

            if (l == ids.length - 1) {

                res.send(stats)
            }
        })

    } catch (err) {
        console.log(err);
        res.status(400).send(err)
    }

}