const router = require("express").Router();

const Spend = require("./spend-model.js");

router.put('/', (req, res) => {
    // console.log(req.params.id, req.body);
    Spend.spendPoints(req.body.points)
        .then((rv) => {
            // console.log(updatedUser)
            res.status(200).json(rv);
        })
        .catch(err => {
            res.status(500).json({
                err: 'Failed to edit user'
            });
        });
});

module.exports = router;
