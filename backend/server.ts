import path from "path";
import express, { Express } from "express";
import cors from "cors";
import { WeatherResponse } from "@full-stack/types";
import fetch from "node-fetch";
import { Plant } from '../common/types/shared';
import { db } from './firebase';
import {
    addPlant,
    getPlants,
    getPlant,
    updateAmount,
    deletePlant,
    findPlant,
  } from "./plants.controller";

var bodyParser = require('body-parser')
var app: Express = express();
//var app = express.Router();

const hostname = "127.0.0.1";
const port = 8080;

app.use(cors());
app.use(express.json());

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/json' }))
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
//app.use(bodyParser.json())
//app.use(require('connect').bodyParser());
//app.use(express.bodyParser());


app.get("/MyPlants/:id", async (request, response) =>{
    const name = request.params.id;
    console.log("GET /api/plant was called 11 " + {name});
    try{
        //const id = request.body.id;
        const plant = await getPlant(name);
        response.status(200).json(plant);
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ error: "Something went wrong Get plant " + name });
    }
})
app.get("/MyPlants", async (request, response) =>{
    console.log("GET /api/plants was called 1");
    try{
        // const plant: Plant =       
        //     { name: "Rose", amount: 22,   watering: "Every day" };
        //   response.status(200).json(plant);
        // const plants: Plant[] = [
        //     { name: "Rose", amount: 22,   watering: "Every day" },
        //     { name: "cactus", amount: 23, watering: "once a week" },
        //     { name: "Rhipsalidopsis gaertneri", amount: 25, watering: "every day" },
        // ];
        const plants = await getPlants();
        response.status(200).json(plants);
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ error: "Something went wrong" });
    }
})
app.post("/Myplants",  async (req, res) => {
    //const body = JSON.parse(req);
    console.log("POST /api/plant add be called 1 "+req.body.name + " " + req.body.amount + req.body.watering);
    const plant = { name: req.body.name, amount: req.body.amount, type:req.body.type, watering: req.body.watering, detail: "N/A"};
    console.log("POST /api/plant add be called 2 "+req.body.name + " " + req.body.amount);
    let exist = await findPlant(req.body.name);
    if(exist)
    {
        console.log("update Plant in server " + req.body.name)
        updateAmount(req.body.name, req.body.amount);
    }
    else
    {
        console.log("addPlant in server " + req.body.name)
        addPlant(req.body.name, plant);
    }
    res.status(200);
});

app.delete("/MyPlants/:name", async (req, res) =>{
    console.log("delete /api/plants was called");
    try{
         const id = req.body.id;
         console.log("delete /api/plants was called at " + id);
         await deletePlant(id);
         res.status(200);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
})

app.listen(port, hostname, () => {
    console.log("Listening");
});
