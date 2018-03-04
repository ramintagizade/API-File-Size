var http = require("http");
var formidable = require("formidable");
var server = http.createServer(function(req,res){
	switch(req.method) {
		case 'GET' :
			show(req,res); 
		break;
		case 'POST' : 
			upload(req,res);
		break;
		default:
		break;
	}
});
function show(req,res) {
	var html = '<form method="POST" action="/file-size"  enctype="multipart/form-data">' +
				'<p>Upload your file to get its size. </p>'+
				'<p><input type="file" name="file"/></p>' + 
				'<p><input type="submit" value="Upload"/></p>' 
				'</form>';
	res.setHeader("Content-Type","text/html");
	res.setHeader("Content-Length",Buffer.byteLength(html));
	res.end(html);
}
function upload(req,res) {
	var form = formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		var File = files["file"];
		res.end("{size:"+File["size"]+"}");
	});
}
server.listen(3000);