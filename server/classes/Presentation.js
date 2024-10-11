import fs from "node:fs"
import path from "node:path"
import blessed from "blessed"
import { marked } from "marked"
import TerminalRenderer from "marked-terminal"

marked.setOptions({
    renderer: new TerminalRenderer({
        emoji: true,
        tab: 4,
        reflowText: true,
        width: 80,
    })
})
export default class Presentation {
    #delimeter = "___"
    constructor() {
        this.slides = []

        this.file = ""
        this.title = "Presenter" 
        this.current = 1;

        this.screen = blessed.screen({ smartCSR: true })
        this.screen.key(["q", "C-c"], () => {
            process.exit(0)
        })
        this.screen.key("n", () => {
            this.next()
        })
        this.screen.key("b", () => {
            this.previous()
        })
    }


    setPath(filePath) {
        this.file = fs.readFileSync(filePath, { encoding: "utf-8" })
        let filename = path.basename(filePath)
        this.title = filename.slice(0, filename.indexOf("."))
        this.process()
    }


    process() {
        this.slides = this.file.split(this.#delimeter);
    }
    

    start() {
        let slide = this.slides[this.current - 1]

        this.screen.title = this.title

        let box = blessed.box({
            top: "center",
            left: "center",
            width: "100%",
            height: "100%",
            tags: true,
            border: { type: "line" },
            content: marked.parse(slide)
        })

        let text1 = blessed.text({
            align: "center",
            valign: "middle",
            bottom: 0,
            padding: 1,
            width: "shrink",
            height: "shrink",
            tags: true,
            style: {
                fg: "white",
                border: {
                    fg: "white"
                }
            },
            content: `{bold}${this.title}{/bold}`, 
        })
        let text2 = blessed.text({
            align: "center",
            valign: "middle",
            bottom: 0,
            padding: 1,
            right: 1,
            width: "shrink",
            height: "shrink",
            tags: true,
            style: {
                fg: "white",
                border: {
                    fg: "white"
                }
            },
            content: `{bold}${this.current}/${this.slides.length}{/bold}`, 
        })

        box.append(text1)
        box.append(text2)
        this.screen.append(box)
        this.screen.render()
    }

    next() {
        this.current += this.current >= this.slides.length ? 0 : 1;
        this.start()
    }

    previous() {
        this.current -= this.current == 1? 0 : 1;
        this.start()
    }

}