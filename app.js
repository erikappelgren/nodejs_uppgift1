/* Includes: */
var http = require('http');
var fs = require('fs');
var url = require('url');

/* Register server: */
function computePage(req, res) {

    var adr = req.url;
    var q = url.parse(adr, true);
    var X = q.query.x * 1, Y = q.query.y * 1, Z;

    switch (q.query.op) {
        case "plus": Z = X + Y; break;
        case "minus": Z = X - Y; break;
        case "divide": Z = X / Y; break;
        case "times": Z = X * Y; break;
    }
    var expr = X + " " + q.query.op + " " + Y + "=" + Z;
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>" + q.search + "</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>" + expr + "</h1>");
    res.write("</body>");
    res.write("</html>");
}

http.createServer(function (req, res) {
    var p = url.parse(req.url, true);

    if (req.url == "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<!DOCTYPE html>");
        res.write("<html>");
        res.write("<head>");
        res.write("<title>" + req.url + "</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<h1>" + req.url + "</h1>");
        res.write("<p>" + "my first paragrpah" + "</p>");
        res.write("</body>");
        res.write("</html>");
    }

    else if (req.url == "/calc") {
        fs.readFile('webmodul.html', function (err, data) {
            res.write(data);
            return res.end();
        });
    }
    else if (p.pathname == "/compute") {
        computePage(req, res);
    }
    else if (p.pathname == "/testcalc") {
        fs.readFile("userinput.html", function (err, data) {
            res.write(data);
            return res.end();
        });
    }
}).listen(8080);