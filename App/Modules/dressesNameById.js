const generalParsers = require("../generalParsers");
const _ = require("lodash");

module.exports = async (charactersNamesById) => {
    let dressesNamesById = {};
    const info = await generalParsers.dressParser();
    _.mapValues(info, (value, key) => {
        const name = _.get(value, "basicInfo.name.en");
        const id = _.get(value, "basicInfo.cardID");
        const charaId = _.get(value, "basicInfo.character");
        if (name) {
            dressesNamesById[id] = `${name} ${charactersNamesById[charaId]}`;
        }
    })
    return dressesNamesById;
}