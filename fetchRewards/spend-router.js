const router = require("express").Router();

const Spend = require("./spend-model.js");

router.post('/', (req, res) => {
    let points = req.body.points
    Spend.spendPoints(req.body.points)
        .then(([rv, remainingPoints]) => {
            if (remainingPoints > 0 && remainingPoints == points) {
                rv.error = `Zero balance, unable to service request`
                res.status(400).json(rv);
            } else if (remainingPoints > 0 && remainingPoints < points) {
                rv.info = `Partial debit. Inadequate balance for the rest ${remainingPoints} points`
                res.status(200).json(rv);
            } else {
                res.status(200).json(rv);
            }
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to edit points' + err
            });
        });
});

module.exports = router;
