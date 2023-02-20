#!/usr/bin/env node
let inputArray = process.argv.slice(2)
let help = require('./functions/help')
let tree = require('./functions/tree')
let organise = require('./functions/organize')
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let command = inputArray[0];
switch (command) {
    case "tree":
        tree.treeFn(inputArray[2],inputArray[1])
        break;
    case "organise":
        organise.organiseFn(inputArray[1],inputArray[2])
        break;
    case "help":
        help.helpFn()
        break;
    default: console.log("🙏please input right command");
}




