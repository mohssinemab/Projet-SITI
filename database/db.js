const mongoose = require('mongoose')

const url = `mongodb+srv://mohssine:Mohssine@cluster0.edixx.mongodb.net/projet?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
const connectdb =()=>{ mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
  }


module.exports = connectdb;