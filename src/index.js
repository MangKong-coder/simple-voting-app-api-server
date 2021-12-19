import express from 'express'
import cors from 'cors'
import sequelize from './util/db.js'

import Candidate from './models/candidate.js';
import Party from './models/party.js'
import User from './models/user.js';
import Position from './models/position.js';
import Vote from './models/vote.js'

import candidateRouter from './routes/candidate.js'
import partyRouter from './routes/party.js'
import authRouter from './routes/auth.js'
import positionRouter from './routes/position.js'
import voteRouter from './routes/vote.js'

const app = express();

app.use(express.json());
app.use(cors())

Position.hasMany(Candidate);
Party.hasMany(Candidate)


app.get('/', (req, res, next) => {
    res.json({
        message: "Connection success"
    })
});

app.use('/candidate', candidateRouter)
app.use('/party', partyRouter)
app.use('/auth', authRouter)
app.use('/position', positionRouter)
app.use('/vote', voteRouter)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data
    res.status(status).json({message: message, data: data})
});

sequelize.sync()
.then(result => {
    app.listen(5000)
})
.catch(err => {
    console.log(err)
})
