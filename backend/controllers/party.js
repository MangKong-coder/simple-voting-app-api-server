const Party =  require('../models/party')

exports.getParties = async (req, res, next) => {
    try {
        const parties = await Party.findAll()
        res.status(200).json({
            message: "Parties returned successfully",
            parties: parties
        })
    } catch (err) {
        console.log(err)
    }
}

exports.postParties = async (req, res, next) => {
    const partyName = req.body.partyName
    try {
        const party = new Party({
            partyName: partyName
        })
        const result = await party.save()
        res.status(201).json({
            message: "Party created successfully",
            party: result
        })
    } catch (err) {
        console.log(err)
    }
}