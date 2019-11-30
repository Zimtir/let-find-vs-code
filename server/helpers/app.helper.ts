var cors = require("cors");
var morgan = require("morgan");

export const normalizePort = (val: string) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

export const initModules = (app: any) => {
  app.use(morgan("combined"));
  app.use(cors());
};

export const log = (name: any) => {
  console.log(name);
};

export const isNonEmpty = (obj: any) => {
  return obj !== undefined && obj !== null && obj !== "";
};

export const isNonEmptyList = (list: any[]) => {
  let flag = true;
  for (var i = 0; i < list.length; i++) {
    if (!isNonEmpty(list[i])) {
      flag = false;
      break;
    }
  }
  return flag;
};

export const handleAppErrors = (app: any) => {
  app.use((req: any, res: any, next: any) => {
    var err = new Error("Not Found");
    next(err);
  });

  app.use((err: any, req: any, res: any, next: any) => {
    res.locals.message = err.message;
    res.locals.error = {};
    res.status(err.status || 500);
    res.json(err);
    console.log(err, next);
  });
};

export const handleServerErrors = (server: any) => {
  const onListening = (server: any) => {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

    log(`server listen at ${bind}`);
  };

  server.on("listening", () => onListening(server));
};
