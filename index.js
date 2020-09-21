

const express = require('express');
const { checkError } = require('./multerLogic')
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

const app = express();

const port = 3000

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'C:/Users/lenovo/Documents/readText-f042075d9787.json'

app.use(express.json())

async function quickstart(req, res) {
    try {
        //Creates a client
        const client = new vision.ImageAnnotatorClient();
        const imageDesc = await checkError(req, res)
        console.log(imageDesc)
        //Performs text detection on the local file
        const [result] = await client.textDetection(imageDesc.path);
        const detections = result.textAnnotations;
        const [ text, ...others ] = detections
        res.send(`Text: ${ text.description }`)

    } catch (error) {
        console.log(error)
    }
    
}

app.get('/detectText', async(req, res) => {
    res.send('welcome to the homepage')
})


app.post('/detectText', quickstart)

app.listen(port, () => {
    console.log(`app is listening on ${port}`)
})