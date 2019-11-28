import express, {Request, Response, NextFunction, Application} from "express";
import morgan from "morgan"
import dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import * as fileUpload from 'express-fileupload'

import { db } from './config/database'
import * as routes from "./routes";
import { apiErrorHandler } from './shared/error-handler/handler'

class App {

    app: Application

    constructor() {
        this.app = express(),
        this.config();
        this.routes();
        this.errorHandler();
    }

    config() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(fileUpload.default())
        db.authenticate()
            .then( ()=>{ console.log("Database connected!") } )
            .catch(() => { console.log('err') })
        dotenv.config();
    }

    routes() {
        this.app.use(routes.userPath, routes.userRoutes);
        this.app.use(routes.notesPath, routes.notesRoutes);
        this.app.use(routes.labelPath, routes.labelRoutes)
    }

    start() {
        this.app.listen(process.env.port || 4000, ()=> {
            console.log("Server is runing ", 3000)
        });
    }

    errorHandler(){
        this.app.use(apiErrorHandler);
    }
}

const app = new App();
app.start();