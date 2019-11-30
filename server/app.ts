var express = require("express");
var app = express();

import { createServer } from "http";
import AppConfiguration from "./helpers/dataset.helper";
import { getPage } from "./helpers/html.helper";
import DatasetModel from "./models/dataset.model";
import EntryModel from "./models/entry.model";
var configuration = AppConfiguration.getInstance();

import {
  initModules,
  normalizePort,
  handleAppErrors,
  handleServerErrors
} from "./helpers/app.helper";

var app = express();

var port = normalizePort("8081");
const es6Renderer = require("express-es6-template-engine");

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.engine("html", es6Renderer);
app.set("views", "views");

app.set("view engine", "html");
app.set("port", port);
app.use("/static", express.static(__dirname + "/public"));

initModules(app);

app.post("/addStatistics", (req: any, res: any) => {
  console.log(req.body.time);
  if (req.body.time && req.body.name && req.body.value) {
    let flag = false;
    for (let i = 0; i < configuration.items.length; i++) {
      if (configuration.items[i].time === req.body.time) {
        flag = true;

        let entryFlag = false;
        for (let j = 0; j < configuration.items[i].entries.length; j++) {
          if (configuration.items[i].entries[j].name === req.body.name) {
            configuration.items[i].entries[j].value += req.body.value;
            entryFlag = true;
          }
        }

        if (!entryFlag) {
          configuration.items[i].entries.push(
            new EntryModel({
              name: req.body.name,
              value: req.body.value
            })
          );
        }
      }
    }

    if (!flag) {
      configuration.items.push(
        new DatasetModel({
          time: req.body.time,
          entries: [
            new EntryModel({
              name: req.body.name,
              value: req.body.value
            })
          ]
        })
      );
    }
  }

  console.log(configuration.items);
  res.send(configuration);
});

app.get("/getStatistics", (req: any, res: any) => {
  res.render("index");
});

app.get("/getData", (req: any, res: any) => {
  res.send(configuration.items);
});

handleAppErrors(app);

const all_routes = require("express-list-endpoints");
console.log(all_routes(app));

var server = createServer(app);
handleServerErrors(server);

server.listen(port);

var app = express();
