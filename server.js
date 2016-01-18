/* global writeHead */
/* global setHeader */
var http = require('http'),
    path = require('path'),
    fs=require('fs'),
    os = require('os');

var Busboy = require('busboy');

var port=3000;
var savePath="c:/saved/";

http.createServer(function(req, res) {

   // Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( res.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}



  if (req.method === 'POST') {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
      console.log('Save to ' + savePath+filename);
      file.pipe(fs.createWriteStream(savePath+filename));
    });
    busboy.on('finish', function() {
        console.log('Transfer complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);
  }
  res.writeHead(404);
  res.end();
}).listen(port, function() {
  console.log('Listening for requests on port',port);
});
