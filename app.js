import express from 'express';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/getResponse', (req, res) => {
    console.log(req.body.question);
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    model.generateContent(req.body.question).then(result=>{
         console.log(result.response.text())
         const response = result.response.text();
         res.status(200).json({
            response: response
         })
    })
    .catch(err=>{
        console.error(err);
        res.status(500).json({
            error: err
        });
    })
}); 

app.get("*", (req, res) => {
    res.status(404).json({
        error: "Bad Found"
    });
});

export default app;