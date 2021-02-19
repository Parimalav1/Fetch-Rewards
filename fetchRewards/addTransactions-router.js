const router = require('express').Router();

const Transactions = require('./add-model.js');

// adding points and payers to the list
router.post('/', (req, res) => {
    Transactions.addDeal(req.body)
        .then(([newDeal]) => {
            // console.log('newDeal:', newDeal)
            d = {id: newDeal}
            res.status(201).json(d);
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to add new transaction' + err
            });
        });
});

module.exports = router;