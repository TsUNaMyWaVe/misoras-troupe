const fs = require('fs').promises;
const path = require('path');
const axios = require ('axios');

const loadJSON = async (path) => {
    let json;
    await axios.get(path)
    .then(function (response) {
        json = response.data;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    return json;
}

const charaDownloader = async () => {
    let importedJSON = await loadJSON("https://karth.top/api/chara.json");
    await fs.writeFile(path.join(__dirname, "../public", "chara.json"), JSON.stringify(importedJSON, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
    return importedJSON;
}

const charaParser = () => {
    let importedJSON = require("../public/chara.json");
    return importedJSON;
}

const dressDownloader = async () => {
    let importedJSON = await loadJSON("https://relive-assets.qwewqa.xyz/masters/dress.json");
    await fs.writeFile(path.join(__dirname, "../public", "dress.json"), JSON.stringify(importedJSON, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
    return importedJSON;
}

const dressParser = () => {
    let importedJSON = require("../public/dress.json");
    return importedJSON;
}

const charaActionDownloader = async () => {
    let importedJSON = await loadJSON("https://relive-assets.qwewqa.xyz/masters/chara_action.json");
    await fs.writeFile(path.join(__dirname, "../public", "chara_action.json"), JSON.stringify(importedJSON, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
    return importedJSON;
}

const charaActionParser = () => {
    let importedJSON = require("../public/chara_action.json");
    return importedJSON;
}

const costumeDownloader = async () => {
    let importedJSON = await loadJSON("https://relive-assets.qwewqa.xyz/masters/costume.json");
    await fs.writeFile(path.join(__dirname, "../public", "costume.json"), JSON.stringify(importedJSON, null, 4), function(err) {
        if (err) {
            console.log(err);
        }
    });
    return importedJSON;
}

const costumeParsers = () => {
    let importedJSON = require("../public/costume.json");
    return importedJSON;
}

module.exports = {
    charaDownloader,
    dressDownloader,
    charaActionDownloader,
    costumeDownloader,
    dressParser,
    charaParser,
    charaActionParser,
    costumeParsers
}