const http = require("http");
const fs = require("fs");
// const { render } = require("ejs");

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html");

  let htmlFile;
  switch (req.url) {
    case "/":
      htmlFile = "index.html";
      break;
    case "/projects":
      htmlFile = "projects.html";
      break;
    case "/contact":
      htmlFile = "contact.html";
      break;
    default:
      htmlFile = "index.html";
      break;
  }

  if (htmlFile) {
    render(res, htmlFile);
  }
});

function render(res, htmlFile) {
  fs.stat(`./${htmlFile}`, (err, stats) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (stats) {
      fs.createReadStream(htmlFile).pipe(res);
    } else {
      res.statusCode = 404;
      res.end("Sorry, page not found!");
    }
  });
}

server.listen(4000, "127.0.0.1", () => {
  console.log("Hello");
});


