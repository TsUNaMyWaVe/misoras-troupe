const generalParsers = require("../generalParsers");
const _ = require("lodash");

module.exports = async () => {
    let characters = [];
    const info = await generalParsers.charaParser();
    _.mapValues(info, (value, key) => {
        const name = _.split(_.get(value, "basicInfo.name_ruby.en"), ' ')[0] || _.split(_.get(value, "basicInfo.name_ruby.ja"), ' ')[0];
        if (name)
            characters.push({url: _.lowerCase(name),
                            name: name,
                            id: key,
                            school: _.get(value, "basicInfo.school_id")})
    })
    return characters;
}