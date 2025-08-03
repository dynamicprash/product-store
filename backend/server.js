import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import productRoutes from "./routes/product-route.js"
dotenv.config();//loads all environment variables from a .env file into process.env.
import {sql} from "./config/db.js"
import { aj} from "./lib/arcjet.js";


const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());//It parses incoming JSON in the body of a request and makes it accessible via req.body.  Without it: req.body will be undefined.
app.use(cors());//It enables Cross-Origin Resource Sharing — allows your backend to accept requests from other domains (e.g., from your React frontend on localhost:3000 to Express server on localhost:5000).
app.use(helmet());//middleware to provide security to our app by setting multiple headers
app.use(morgan("dev"));//log the request

//apply arcjet rate-limt, bot detection ...  before routings
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
});

app.use("/api/products", productRoutes )  //Defines a route that responds to a GET request — which is used when a client wants to fetch data or a page.
if(process.env.NODE_ENV === "production"){
    //serve our react app
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend", "dist", "index.html"));
    })
}

console.log("__dirname:", __dirname);
console.log("frontend dist path:", path.join(__dirname, "/frontend/dist"));


async function initDB(){
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log("Database initialized successfully");
    }catch (error){
        console.log("error initializing database",error)
    }
}

initDB().then(() =>{
    app.listen(PORT, () => {    //This starts the Express server and tells it to listen for incoming HTTP requests on a specific port.
        console.log("server is rinning on the port " + PORT);
    })

})

