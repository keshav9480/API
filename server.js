
const { response } = require('express');
const express = require('express');
const https = require("https");
const app = express();
const bodyParser = require('body-parser');

app.get("/", function (req, res) {

	console.log("server is running");
	res.sendFile(__dirname+"/index.html");
  });

app.use(bodyParser.urlencoded({extended: true}))
app.post("/", function(req, res){
	var city = req.body.city;
	var appKey = "a0d7ad3ecf92d06fcfed0a374102bfe6"
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appKey+"&units=metric";
	https.get(url, (response) => {
		console.log(response.statusCode);
		console.log(response.header);
		if (response.statusCode != 200){
			res.write(city+" is not in our records\n");
			res.write("Error Code :"+response.statusCode);
			res.send();	
		}else{
			response.on('data', (data) => {
			console.log(data);
			//process.stdout.write(data);
			const weatherData = JSON.parse(data);
			console.log("Temparture at "+weatherData.name+" "+weatherData.main.temp);
			console.log("Description: "+weatherData.weather[0].description);
			console.log("longitude: "+weatherData.coord.lon+" latitude: "+weatherData.coord.lat);
			//res.write("<h1>Temparture at Manvi "+weatherData.main.temp+" - "+weatherData.weather[0].description+ "</h1>");
			res.send("<h1>Temparture at city: "+city+" - "+weatherData.main.temp+" celcius - "+weatherData.weather[0].description+" co-ordinates longitude:"+weatherData.coord.lon+" latitude: "+weatherData.coord.lat+"</h1>")
			});
		}
	});
});

app.listen("8080", function (req, res) {
	console.log("server is running at port 8080");
});


