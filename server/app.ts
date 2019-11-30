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

app.set("port", port);
app.use("/static", express.static(__dirname + "/public"));

app.post("/addStatistics", (req: any, res: any) => {
  const existItem = configuration.items.find(i => i.time === req.body.time);
  if (existItem) {
    existItem.entries.push({
      name: req.body.name,
      value: req.body.value
    });
  } else {
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

  res.send("POST request to the homepage");
});
const es6Renderer = require("express-es6-template-engine");

app.engine("html", es6Renderer);
app.set("view engine", "html");
app.get("/getStatistics", (req: any, res: any) => {
  const page = getPage(configuration.items);

  console.log(page);
  res.render(page);
});

const all_routes = require("express-list-endpoints");
console.log(all_routes(app));

initModules(app);
handleAppErrors(app);

var server = createServer(app);
handleServerErrors(server);

server.listen(port);

var app = express();
