const express = require("express");
const apiRotes = require("./routes")
const { DB} = require("./db")

const app = express();
app.use(express.json());

app.use("/", apiRotes)



app.listen(5000, async () => {
    console.log("server is running");
    await DB()
})

