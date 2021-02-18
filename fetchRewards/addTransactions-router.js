const router = require('express').Router();

const Transactions = require('./add-model.js');

// adding points and payers to the list
router.post('/', (req, res) => {
    Transactions.addDeal(req.body)
        .then(newDeal => {
            d = {}
            for(d in newDeal){
                if(d.name in d) {
                    d[d.name] = d.points
                } else {
                    d[d.name] = d.points
                }
            }
            res.status(201).json(d);
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to add new transaction'
            });
        });
});

module.exports = router;