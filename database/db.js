const mongoose = require('mongoose')

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
const connectdb =()=>{ mongoose.connect(process.env.DATABASE,connectionParams)
    .then( () => {
        console.log('++++++ Well connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
  }


module.exports = connectdb;