const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const weatherApp = express();
weatherApp.use(bodyParser.urlencoded({extended: true}))

port = 3000;

weatherApp.get("/", (req,res)=>{
  res.sendFile(__dirname + "/index.html")

  // res.send("Temperature in Shimla is " + temp);
})

weatherApp.post("/", (req,res)=>{
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
  const apiKey = "884936b236ff36cba7db9f553d630f73";
  const query = req.body.cityName;
  // console.log(query);
  const url = baseURL + `q=${query}&appid=${apiKey}&units=metric`;
  https.get(url, (response)=>{
    const data = response.data;
    response.on("data",(d)=>{
      const data = JSON.parse(d);
      // console.log(data);
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const iconURL =  `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      res.write(`<h1>The temperature in Shimla is ${temp} degree Celcius </h1>`);
      res.write(`<p>The weather can be described as ${description}</p>` );
      res.write(`<img src=${iconURL}>`)
      res.send();
    });
    response.on("error", (e)=> console.log(e));
  });
})

// api key 884936b236ff36cba7db9f553d630f73

weatherApp.listen(port, ()=>{
  console.log(`Server is running on port ${port}`)

})
