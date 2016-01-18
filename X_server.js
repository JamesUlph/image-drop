var http = require('http');
var fs = require('fs');
 http.createServer(function(request,response){
	 
	 
	 // Set CORS headers
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
	if ( response.method === 'OPTIONS' ) {
		response.writeHead(200);
		response.end();
		return;
	}
	 
	 
 	response.writeHead(200);
 	
 
	var fileSize = request.headers['content-length'];
 	var uploadedBytes = 0 ;
 
 
 
	request.on('data',function(d){
		
		
 		console.log('received data',request,response);
		
		request.setBodyEncoding("bindary");
		
		
		
		 //var destinationFile = fs.createWriteStream("c:/destination.md");
 		//d.pipe(destinationFile);
		 console.log(JSON.stringify(d));
		 
 		uploadedBytes += d.length;
 		var p = (uploadedBytes/fileSize) * 100;
 		response.write("Uploading " + parseInt(p)+ " %\n");
 
	});
 
request.on('end',function(){
	 response.end("File Upload Complete");
});
 
}).listen(3000,function(){
 
 console.log("server started");
 
 });