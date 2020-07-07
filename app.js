const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const fs = require('fs')

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
	path = './bigjson.json';
	var isRegistered = false;

	fs.readFile(path, 'utf-8', function (err, data)  {
		if (err) {
		  log.silly('addToexcludeFilesDirs', "Error reading config.xml. " + JSON.stringify(err));
		  d.resolve();
		} else {
	jsondata = JSON.parse(data);
			jsondata.features.forEach(function (app) {
			  if(app.type === "srihaan") {
				
					isRegistered = true;
				}
			  });
			  res.send("isRegistered is " + isRegistered);
		}



} )
});

app.post('/login', (req, res) => {
	var status = 200;
	var msg = "Logged in";
	if(req.body.username != req.body.password) {
		status = 401;
		msg = "Wrong username and password provided";
	}
	res.status(status)
		.send(msg)
	
});


/*{"dates":[
  date1,
  date2,
  date3,
  date4,
  date5,
  date6,
  date7
]

*/
app.post('/checkDatesAvailability', (req, res) => {
	var status = 200;
	var result = [];
	//var username = req.body.username;
	var dates = req.body.dates;
	console.log(JSON.stringify(dates));
	 
	var flag = 1;

	//Connect to db and query
	var qouta = true;
	dates.forEach(function(date){
		/****Get qouta of each date [Full or available]****
		if(qouta) {
			updateDB(username, date);
			result.push({
				date: true
			});
		} else {
			result.push({
				date: false
			})
		}*/
if(flag%2==0){
	result.push({
		date: date,
		value: true
	});
}else{
	result.push({
		date: date,
		value:false
	});
}
flag++;
});
	res.status(status)
		.send(result)
});


/***
 * 
 *  "latlngs":[[
            22.56904,
            88.359395
        ],
        [
            12.967444,
            77.498775
        ]]
 */
app.post('/checkLocation', (req, res) => {
	var status = 200;
	var result = '';
	
	var apikey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJjaG9jb2xhdGUxMjM0QG91dGxvb2suY29tIn0.rK82BH5iX6BKzpTzCig1tUklbvAGop-xNo031M8i7Zs";
	console.log("body params are :" + JSON.stringify(req.body));
	axios.post('https://data.geoiq.io/dataapis/v1.0/covid/locationcheck', {
			"latlngs": [req.body.locations],
			"key": apikey
		})
		.then(function(response) {
			result = JSON.stringify(response.data);
			res.status(status)
				.send(JSON.stringify(response.data));
			
		})
		.catch(function(error) {
			console.log(error);
			res.status(500)
				.send("error : " + JSON.stringify(error));
		});
	
});

app.listen(port, () => console.log("Example app listening at http://localhost:${port}", port));