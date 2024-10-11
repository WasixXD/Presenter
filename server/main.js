#!/usr/bin/env node
import { Worker } from "node:worker_threads"
import { fork } from "node:child_process"
import { Command } from "commander"
import fs from "node:fs"
import path from "node:path"

const program = new Command()
const baseDir = import.meta.dirname

program
    .name("presenter")
    .description("Present your slides on terminal")
    .version("0.0.1")
    .option("--path <path>", "Path to your slide file")
    .option("--web", "It's going to be controlled by the cellphone")
    .action((str, options) => {
        if(!str.path) {
            console.log("[x] Error: --path is required")
            program.help()
            process.exit(0)
        }

        if(!fs.existsSync(str.path)) {
            console.log(`[x] Error: ${str.path} does not exist`)
            program.help()
            process.exit(0)
        }
        const child = fork(path.resolve(baseDir, "presenter.js"), {
            stdio: "inherit"
        })

        child.send({ msg: "PATH", path: str.path})

        if(str.web) {
            const web = new Worker(path.resolve(baseDir, "web.js"), {
                name: "Web"
            })
            
            web.on("message", (message) => {
                child.send(message)
            })
        } else {
            child.send("LOGIN")
        }
        
    })

program.parse(process.argv)



