import express from "express"
import ngrok from "ngrok"
import QRCode from "qrcode"
import { parentPort } from "node:worker_threads"
import chalk from "chalk"

const PORT = 2000
const app = express()

await ngrok.authtoken(process.env.NGROK_TOKEN)
const url = await ngrok.connect({ proto: "http", addr: PORT });

app.get("/next", (req, res) => {
    parentPort.postMessage("NEXT")
    res.status(200).send("Next")
})

app.get("/previous", (req, res) => {
    parentPort.postMessage("PREVIOUS")
    res.status(200).send("Previous")
})

app.get("/", (req, res) => {
    parentPort.postMessage("LOGIN")
    res.status(200).send("Login")
})

process.on("uncaughtException", (err) => {
    console.error(err)
})

app.listen(PORT, _ => {
    QRCode.toString(url, { type: "terminal" }, (err, result) => {
        if(err) {
            console.error(err) 
            return
        }
        console.log(result)
        console.log(chalk.greenBright.bold("\n\n\t[!] Read the QRCode on the app to connect to the server"))
    })
})