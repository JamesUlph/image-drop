var http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');
    
 
var Busboy = require('busboy');
 
http.createServer(function(req, res) {
  
  // Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
  
  if (req.method === 'POST') {
    console.log('got post');
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('got file ',fieldname,encoding);
      var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
      console.log('save to',saveTo);
      file.pipe(fs.createWriteStream('c:/nodefile','utf8'));
    });
    busboy.on('finish', function() {
      console.log('finish');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);
  }
  res.writeHead(404);
  res.end();
}).listen(3000, function() {
  console.log('Listening for requests');
});