const generalParsers = require("../generalParsers");
const _ = require("lodash");

module.exports = async () => {
    let cardIds = [];
    const dress = await generalParsers.dressParser();
    const Misoras = _.filter(_.keys(dress), dressId => {
        return (_.get(dress[dressId], "chara_id") === 302) && (!_.endsWith(dressId, '001')) && (!_.endsWith(dressId, '007'));
    })
    _.map(Misoras, (value) => {
        cardIds.push(`https://relive-assets.qwewqa.xyz/jp_ja/dlc/res/dress/cg/${value}/image.png`)
    });
    return cardIds;
}