const express=require('express');
const path=require('path');
const fetch=require('node-fetch');
const app= express();


//Setting up body parser
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());

const port=process.env.PORT||3000;

app.set("views",path.join(__dirname,'views'));
app.set("view engine",'ejs')


app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/weather', async  (req,res)=>{

    
console.log(req.body);
const latlon = req.body.latlon.split(',');
const lat=latlon[0];
const lon=latlon[1];
const fetch_response=  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a8fb83cf8f3996326cbdd4809997d6c`)
const json= await fetch_response.json();

const temp=parseFloat(json.main.temp)-273.15;
const tempmin=parseFloat(json.main.temp_min)-273.15;
const tempmax=parseFloat(json.main.temp_max)-273.15;
console.log(json.weather[0].description);
 //temp=temp.toString();
const reply={
    weather:json.weather,
    Country:json.sys.country,
    Temp:temp.toString(),
    TempMin:tempmin.toString(),
    TempMax:tempmax.toString(),
    City:json.name
}


res.render('index',reply);

});


app.listen(port,()=>{
    console.log(`Server is Up and its running on port ${port}`)
})