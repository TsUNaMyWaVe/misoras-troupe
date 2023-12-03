const fs = require('fs').promises;
const path = require('path');
const _ = require("lodash");
const generalParsers = require("./App/generalParsers");

const downloadRequiredFiles = async () => {
    await generalParsers.charaDownloader();
    await generalParsers.dressDownloader();
    await generalParsers.charaActionDownloader();
    await generalParsers.costumeDownloader();
    await generalParsers.housingDownloader();
    return;
}

const theaterLines = generalParsers.housingParser();

const formatSingleCharaActions = (charaName, actionsGroupedById, charaDresses, charaCostumes) => {
    if (charaName === 'MeiFan Liu') {
        charaName = 'Liu Mei Fan';
    }
    const dresses = _.keys(actionsGroupedById);
    let file = {};
    dresses.map(dress => {
        let dressName = '';
        if (dress == 0) {
            dressName = `GENERIC ${charaName}`;
        } else if (_.get(charaCostumes, `${dress}.name.en`)) {
            dressName = charaCostumes[dress].name.en.includes(charaName) ? `${charaCostumes[dress].name.en}` : `${charaCostumes[dress].name.en} ${charaName}`;
        } else if (_.get(charaDresses, `${dress}.name.en`)) {
            dressName = charaDresses[dress].name.en.includes(charaName) ? `${charaDresses[dress].name.en}` : `${charaDresses[dress].name.en} ${charaName}`;
        } else if (dress.length > 7 && _.get(charaCostumes, `${dress.slice(0, 7)}.name.en`)) {
            dressName = charaDresses[dress.slice(0, 7)].name.en.includes(charaName) ? `${charaDresses[dress.slice(0, 7)].name.en} (Skin)` : `${charaDresses[dress.slice(0, 7)].name.en} ${charaName} (Skin)`;
        } else {
            dressName = `UNKNOWN(${dress}) ${charaName}`;
        }
        const linesByGroup = _.groupBy(actionsGroupedById[dress], action => action.group_name);
        let onlyLines = {}
        _.keys(linesByGroup).map(group => {
            const lines = linesByGroup[group].map(lineObj => lineObj.message.en);
            onlyLines = {
                ...onlyLines,
                [group]: lines
            }
        });
        const dressTheaterLines = theaterLines[dress];
        if(dressTheaterLines) {
            onlyLines['My Theater'] = _.keys(dressTheaterLines).map(key => {
                return dressTheaterLines[key].text.en;
            });
        }
        file = {
            ...file,
            [dressName]: onlyLines
        }
    });
    return file;
}

const formatActionsByCharacter = (actionsByCharacter, dresses, charactersNamesById, costumes) => {
    let file = {};
    const characters = _.keys(actionsByCharacter);
    let dressesByCharacter = {};
    _.map(_.keys(dresses), dress => {
        dressesByCharacter[dresses[dress].chara_id] = {
            ...dressesByCharacter[dresses[dress].chara_id],
            [dress]: dresses[dress]
        }
    });
    let costumesByCharacter = {};
    _.map(_.keys(costumes), costume => {
        costumesByCharacter[costumes[costume].chara_id] = {
            ...costumesByCharacter[costumes[costume].chara_id],
            [costume]: costumes[costume]
        }
    });
    characters.map(charaId => {
        const charaName = charactersNamesById[charaId];
        const actionsGroupedById = _.groupBy(actionsByCharacter[charaId], action => action.costume_id);
        const formattedLines = formatSingleCharaActions(charaName, actionsGroupedById, dressesByCharacter[charaId], costumesByCharacter[charaId]);
        file = {
            ...file,
            ...formattedLines
        }
    });
    return file;
}

const formatLinesFile = (charaAction, dresses, characters, costumes) => {
    let charactersNamesById = {};
    _.map(characters, (value) => {
        const id = _.get(value, "basicInfo.charaID");
        const name = _.get(value, "basicInfo.name_ruby.en") || _.get(value, "basicInfo.name_ruby.ja");
        charactersNamesById[id] = name;
    });
    const actionsByCharacter = _.groupBy(charaAction, action => action.chara_id);
    const file = formatActionsByCharacter(actionsByCharacter, dresses, charactersNamesById, costumes);
    return file;
}

const generateLinesFile = async () => {
    try {
        if (!process.env.isRender) {
            await downloadRequiredFiles();
        }
        const charaAction = generalParsers.charaActionParser();
        const dresses = generalParsers.dressParser();
        const characters = generalParsers.charaParser();
        const costumes = generalParsers.costumeParsers();
        const file = formatLinesFile(charaAction, dresses, characters, costumes);
        await fs.writeFile(path.join(__dirname, "/public", "chara_action_grouped.json"), JSON.stringify(file, null, 4), function(err) {
            if (err) {
                console.log(err);
            }
        });
        return;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    generateLinesFile,
}