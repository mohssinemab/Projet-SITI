const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const connectdb = require('./database/db');
const operateur = require('./routes/operateur')
const machine = require('./routes/machine')
const auth = require('./routes/auth')
const authMidd = require('./middleware/authMidd')
const isManager = require('./middleware/isManager')


require('dotenv').config();


connectdb();
app.use(express.json({extended:false}))
app.use(cors())
app.use(morgan('tiny'))

app.use('/manager', isManager, operateur);
app.use('/machine', authMidd, machine);
app.use('/auth', auth);


var port = process.env.PORT || 5002;
app.listen(port, console.log(`Server is listening on port ${port}`) )

