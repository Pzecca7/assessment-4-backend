const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment,
        getFortune,
        getAllPizzerias,
        addPizzeria,
        removePizzeria,
        updateRating
} = require('./controller')


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/pizzerias", getAllPizzerias)
app.post("/pizzerias", addPizzeria)
app.delete("/pizzerias/:index", removePizzeria)
app.put("/pizzerias/:index", updateRating)





app.listen(4000, () => console.log("Server running on 4000"));
