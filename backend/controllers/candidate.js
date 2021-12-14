const Candidate = require('../models/candidate')

exports.getCandidates = async (req, res, next) => {
    try {
        const candidates =  await Candidate.findAll();
        res.status(200).json({
            message: "Candidates successfully returned",
            candidates: candidates
        })
    } catch (err) {
        console.log(err);
    }
}

exports.postCandidate = async (req, res, next) => {
    const name = req.body.name
    const position = req.body.position
    try {
        const candidate = new Candidate({
            name: name,
            position: position
        })

        const result = await candidate.save()
        res.status(201).json({
            message: "Candidate successfully created",
            candidate: result
        })
    } catch (err) {
        console.log(err)
    }
}