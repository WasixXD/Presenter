import Presentation  from "./classes/Presentation.js"


let p
let path
process.on("message", (message) => {
    if(message.msg === "PATH") {
       path = message.path
    } else if(message === "LOGIN") {
        p = new Presentation()
        p.setPath(path)
        p.start()
    } else if(message === "NEXT") {
        p.next()
    } else if(message === "PREVIOUS") {
        p.previous()
    }
})
