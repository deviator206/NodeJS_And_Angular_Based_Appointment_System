var http = require("http");
var fs = require('fs');
var mysql = require("mysql");

var dbConfig ={
"host":"localhost",
"user":"root",
"password":"root",
"database":"nodePocDB"

}


var conn =  mysql.createConnection(dbConfig);

var path = require('path');

var getParameter = function(str)
{
	console.log(" getParameter : "+str);
			
	var finalObj = {}, mLocal, i , arrT =  str.split("&");
	for(i=0;i<arrT.length;i++)
	{
		mLocal = arrT[i].split("=");
		var key = String(mLocal[0]).trim();
		var val = String(mLocal[1]).trim();
		finalObj[key] = val;
	}
	console.log(finalObj)
	return finalObj;
};

var checkForAPI = function(completeURL,reqType)
{
	var arrReturn = [];
	if(reqType === "GET")
	{
			var apiName, strParams,arrTemp = completeURL.split("?");
			apiName = arrTemp[0];

			strParams = arrTemp[1]

			if(strParams !== undefined && strParams !== "")
			{
				arrReturn.push(apiName);
				arrReturn.push(getParameter(strParams));
			}

	}

	console.log(arrReturn);

	return arrReturn;
};



http.createServer(function (request, response) {
    console.log('request starting...');
	
	var bProceed = -1, filePath =  "c1"+request.url;

	console.log(filePath);
	if (filePath == '/')
		filePath = 'c1/index.html';
	
	if (filePath == "c1/c1")
		filePath = 'c1/index.html';
	
	bProceed = checkForAPI(request.url,request.method)
	if(bProceed <= 0)
	{
		path.exists(filePath, function(exists) {
		
			if (exists) {
				fs.readFile(filePath, function(error, content) {
					if (error) {
						response.writeHead(500);
						response.end();
					}
					else {
						response.writeHead(200, { 'Content-Type': 'text/html' });
						response.end(content, 'utf-8');
					}
				});
			}
			else {
				response.writeHead(404);
				response.end();
			}
		});
	}
	else
	{

		var obj = bProceed[1];
		switch(bProceed[0])
		{
			case "/login":
					console.log(" LOGIN API CALLED !!")
					var queryStr = "select * from RegisteredUser where name='"+obj['name']+"' and password ='"+obj['passwd']+"'";
													console.log(queryStr);
													
													conn.query(queryStr,function(err,rows)
														{
															console.log("after query EXE : "+err);
															console.log(rows);	

															if(rows.length > 0)
															{
																console.log("SENDING DATA");
																console.log(rows[0]);
																response.write(JSON.stringify(rows[0]));
															}
															else
															{
																response.write(JSON.stringify({}));
															}
															
															response.end();	

														});	
												

			break;
		}
	}

	
}).listen(8125);




/*
 create database nodepocdb;

 create table RegisteredUser (userId int NOT NULL AUTO_INCREMENT, name varchar(55), password varchar(55), PRIMARY KEY(userId));


 insert into  RegisteredUser (name,password) values ("admin","demo"),("admin1","demo1"),("admin2","demo2");

 select * from RegisteredUser where name='admin2' and password ='demo2'	;
*/