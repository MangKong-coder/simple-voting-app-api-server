const express = require('express');
const cors = require('cors')
const sequelize = require('./util/db.js')

const Candidate = require('./models/candidate')
const Party = require('./models/party');

const candidateRouter = require('./routes/candidate');
const partyRouter = require('./routes/party');

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res, next) => {
    res.json({
        message: "Connection success"
    })
});

app.use('/candidate', candidateRouter)
app.use('/party', partyRouter)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message})
});

sequelize.sync()
.then(result => {
    app.listen(5000)
})
.catch(err => {
    console.log(err)
})
