/**
* Required External Modules
*/
const express = require("express");
const _ = require("lodash");
const path = require("path");
const modulesRunner = require("./App/Modules/index");

(async () => {
/**
* App Variables
*/

const app = express();
const port = process.env.PORT || "3242";
const appModules = await modulesRunner.runModules();

/**
*  App Configuration
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
* Routes Definitions
*/

app.get("/", (req, res) => {
    res.render("index", { title: "Home", backgrounds2: "https://relive-assets.qwewqa.xyz/jp_ja/dlc/res/dress/cg/3020015/image.png",
    backgrounds: appModules.pickBackground(appModules.backgrounds),
    characters: appModules.characters });
})

app.get("/chara/:name/:number", async (req, res) => {
    const dresses = appModules.dressesFetch(_.upperFirst(req.params.name));
    const lines = await appModules.linesFetch(dresses[req.params.number]);
    res.render("chara", { title: _.upperFirst(req.params.name), backgrounds2: "https://relive-assets.qwewqa.xyz/jp_ja/dlc/res/dress/cg/3020015/image.png",
    backgrounds: appModules.pickBackground(appModules.backgrounds),
    name: req.params.name,
    number: req.params.number,
    dresses,
    lines });
})

/**
* Server Activation
*/

app.listen(port, async () => {
    console.log(`Listening to requests on http://localhost:${port}`);
})})();