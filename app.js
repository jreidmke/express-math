const express = require("express");
const app = express();
const ExpressError = require("./expressError");

//before we hit the routes. let's do the functions first.

function mean(arr) {
    return ((arr.reduce((a, b) => {
        return a+b
    }))/arr.length);
}

app.get('/', (req, res) => {
    return res.send("THIS IS PIZZA");
})

function median(arr) {
    return (arr.sort(function(a, b){return a - b})[Math.floor(arr.length/2)]);
}

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

const arr = [1, 2, 2, 3];

console.log(mean(arr));
console.log(median(arr));
console.log(mode(arr));

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

app.listen(3000, function() {
    console.log("SERVER RUNNING");
})