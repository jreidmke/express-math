const express = require("express");
const app = express();
const ExpressError = require("./expressError");

//before we hit the routes. let's do the functions first.

function mean(arr) {
    return ((arr.reduce((a, b) => {
        return a+b
    }))/arr.length);
}

app.get('/mean', (req, res) => {
    const avg = mean(((req.query.nums.split('').filter(x => x !== ","))).map(x => parseInt(x))).toString();
    return res.send(avg);
})

function median(arr) {
    return (arr.sort(function(a, b){return a - b})[Math.floor(arr.length/2)]);
}

app.get('/median', (req, res) => {
    const med = median(((req.query.nums.split('').filter(x => x !== ","))).map(x => parseInt(x))).toString();
    return res.send(med);
})

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

app.get("/mode", (req, res) => {
    const mod = mode(((req.query.nums.split('').filter(x => x !== ","))).map(x => parseInt(x))).toString();
    return res.send(mod);
})

app.get("/all", (req, res) => {
    const avg = mean(((req.query.nums.split('').filter(x => x !== ","))).map(x => parseInt(x))).toString();
    const med = median(((req.query.nums.split('').filter(x => x !== ","))).map(x => parseInt(x))).toString();
    const mod = mode(((req.query.nums.split('').filter(x => x !== ","))).map(x => parseInt(x))).toString();
    return res.json({response: {
        mean: avg,
        median: med,
        mode: mod
    }})
})

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
  });

app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
      error: err,
      message: err.message
    });
  });


module.exports = app;