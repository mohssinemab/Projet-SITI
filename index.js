const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const connectdb = require('./database/db');
const operateur = require('./routes/operateur')
const machine = require('./routes/machine')
const auth = require('./routes/auth')


connectdb();
app.use(express.json({extended:false}))
app.use(cors())
app.use(morgan('tiny'))

app.use('/operateur', operateur);
app.use('/machine', machine);
app.use('/auth', auth);


var port = process.env.PORT || 5002;
app.listen(port, console.log(`Server is listening on port ${port}`) )

