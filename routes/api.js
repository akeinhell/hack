let assets  = require('../stats.json');
var express = require('express');
var router  = express.Router();

let rnd = (max, prec = 2) => (Math.random() * max).toFixed(prec);

let mockData = {
    name: 'ETC ' + rnd(100),
    cost: rnd(1000, 2),
    count: rnd(1000),
    profit: rnd(50, 4),
    profitMoney: rnd(50, 2),
    curs: rnd(5000)
};
let mockArray = [];

for(let i = 0; i<12; i++){
    let tmp = {
        name: 'ETC ' + rnd(100),
        cost: rnd(1000, 2),
        count: rnd(1000),
        profit: rnd(50, 4),
        profitMoney: rnd(50, 2),
        curs: rnd(5000)
    }
    tmp.id = mockArray.length +1;
    mockArray.push(tmp);
}

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
];

router.get('/list', (req, res) => {
    res.status(200).json(mockArray);
});

router.get('/options', (req, res) => {
    res.status(200).json({
        options,
    });
});

router.post('/add', (req, res) => {
    let data = Object.assign(mockData, req.body);
    data.id = mockArray.length + 1;
    mockArray.push(data);
    res
        .status(200)
        .json(mockArray);
});

module.exports = router;
