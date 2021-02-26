const router = require("express").Router();

const Balance = require("./balance-model.js");

// get balance points for payers
router.get('/', (req, res) => {
    Balance.getBalances()
        .then(transactions => {
            // console.log('transactions: ', transactions)
            d = {}
            for (let i in transactions) {
                let t = transactions[i];
                // console.log("t: ", t)
                if (t.name in d) {
                    d[t.name] += t.points
                } else {
                    d[t.name] = t.points
                }
            }
            // console.log('d: ', d)
            res.status(200).json(d)
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to get balance/payers'
            });
        });
});

module.exports = router;