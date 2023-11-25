const _ = require("lodash");
const generateLinesFile = require("../../generateLinesFile");
const backgroundsFetch = require("./backgroundsFetch");
const charactersFetch = require("./charactersFetch");
const linesFetcher = require("./linesFetch");
const dressesFetcher = require("./dressesFetch");
const dressesNameById = require("./dressesNameById");

const runModules = async () => {
    await generateLinesFile.generateLinesFile();
    const backgrounds = await backgroundsFetch();
    const pickBackground = (backgrounds) => {
        return backgrounds[Math.floor(Math.random() * (backgrounds.length - 1))];
    }
    const characters = await charactersFetch();
    let charactersIdByName = {};
    let charactersNamesById = {};
    characters.map((value) => {
        const id = _.get(value, "id");
        const name = _.get(value, "name");
        charactersIdByName[name] = id;
        charactersNamesById[id] = name;
    })
    const linesFetch = async (dress) => {
        return await linesFetcher(dress, charactersNamesById);
    }
    const dressesFetch = (name) => {
        return dressesFetcher(name);
    }
    const dressesNamesById = await dressesNameById(charactersNamesById);
    return { backgrounds,
            pickBackground,
            characters,
            charactersIdByName,
            linesFetch,
            dressesFetch };
}

module.exports = {
    runModules,
}