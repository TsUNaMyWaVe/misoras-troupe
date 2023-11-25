const _ = require("lodash");

module.exports = (name) => {
    let dresses = [];
    const linesjson = require("../../public/chara_action_grouped_2.json");
    _.mapKeys(linesjson, (value, key) => {
        switch (name) {
            case "Sakura":
                name = "Sakura Shinguji";
                break;
            case "Gemini":
                name = "Gemini Sunrise";
                break;
            default:
                break;
        }
        if (key.includes(name)) {
            dresses.push(key);
        }
    })
    return dresses;
}