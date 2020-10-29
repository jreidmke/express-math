const express = require("express");

//before we hit the routes. let's do the functions first.

function mean(arr) {
    return ((arr.reduce((a, b) => {
        return a+b
    }))/arr.length);
}

function median(arr) {

}

function mode(arr) {

}

console.log(mean([1, 2, 3]));

module.exports = { mean };