import express from "express";
import fs from "fs";
import path from "path";
import "@babel/polyfill";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import App from "../src/App";

const PORT = 8080;

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.get('/*', (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});


app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
