import express from 'express';
import bodyParser from 'body-parser';
// import * as querystring from 'querystring';
// import * as http from 'http';
// import * as fs from 'fs';
import fetch from 'node-fetch';
export const app = express();

///////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//
// Setup CORS
//
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    );
    next();
});

app.get('/getWeatherByLatLon', async (req, res, next) =>
{
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const timezone = req.query.timezone;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ latitude }&longitude=${ longitude }&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,windspeed_10m_max,winddirection_10m_dominant&current_weather=true&timeformat=unixtime&timezone=${ timezone }`,
    {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: null,
        })
        .then(response => response.json())
        .then((response) =>
        {
            res.status(200).json(response);
        })
        .catch(err =>
            {
                console.error(err);
                res.status(500);
            })
});

app.get('/getCoordsByCityName', async (req, res, next) =>
{
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ req.query.name }`,
    {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: null,
        })
        .then(response => response.json())
        .then((response) =>
        {
            console.log('getCoordsByCityName', req.params.name, response)
            res.status(200).json(response);
        })
        .catch(err =>
            {
                console.error(err);
                res.status(500);
            })
});
