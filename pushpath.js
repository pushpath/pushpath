/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

var express  = require('express');
var app      = express();

app.configure(function() {
	app.use(express.static(__dirname + '/.tmp'));
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(app.router);
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
});

var api_server = require('./server')(app);

app.get("*", function(req, res){
	res.sendfile("/.tmp/index.html");
});

app.listen(8080);
console.log("Pushpath listening on port 8080");