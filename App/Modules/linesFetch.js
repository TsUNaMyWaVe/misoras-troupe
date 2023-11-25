const generalParsers = require("../generalParsers");
const _ = require("lodash");

module.exports = async (dress, charactersIdByName) => {
    const linesjson = require("../../public/chara_action_grouped_2.json");
    let lines = [];
    let dressObj = _.find(linesjson, (value, key) => {
        return key === dress;
    });
    _.mapValues(dressObj, (value, key) => {
        const keyParts = key.split('_');
        if (keyParts[1] && charactersIdByName[keyParts[1]]) {
            key = key.replace(keyParts[1], charactersIdByName[keyParts[1]]);
        }
        lines.push({
            title: _.upperFirst(key.replace(/_/g, ' ')),
            lines: value
        })
    })
    return lines;
}