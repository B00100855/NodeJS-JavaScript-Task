/*
* Node server
* Author: Pedro Tavares - ITB B00100855
*/
var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
	{
		filePath = './index.html';
	}
	else if(filePath == './getData')
	{
		filePath = './sensorlog.txt';
	}
        

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
			console.log("INCOMING REQUEST: Check the data from the txt file");
			if(request.url == '/getData')
			{
					response.writeHead(200, { 'Content-Type': "application/json" });	
					var obj = JSON.stringify(content.toString());
					response.end(JSON.parse(obj));

				
			}
			else{
				response.writeHead(200, { 'Content-Type': contentType });			
				response.end(content, 'utf-8');
			}
			
           
        }
    });
	
	


}).listen(8080); 
console.log('Server running at http://127.0.0.1:8080/');





/*

	function handle_incoming_request (req, res) {

		console.log("INCOMING REQUEST: " + req.method + " " + req.url);

		load_sensor_data(function(err, readings){
		if (err) { 
		   console.log("Couldn't read file");
		}
		console.log(readings);
		res.writeHead(200, { 'Content-Type': "application/json" });			
		res.end(readings, 'utf-8');

	   });

	}
	
	function load_sensor_data(callback) 
	{
		fs.readFile('sensorlog.txt','utf8', function (err, readings) {
			if (err) 
			{
				callback(err);
				return;
			}
			callback(null, readings);
		});
	}
	

var s = http.createServer(handle_incoming_request);
s.listen(8080);
console.log('Server running at http://127.0.0.1:8080/'); */