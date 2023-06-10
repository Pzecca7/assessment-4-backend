

let pizzeriaDB = require('./db.json')
let pizzeriaID = 6

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req,res) => {
        const fortunes =["Do not let ambitions overshadow small success.", "Now is the time to try something new.", "Expect much of yourself and little of others.", "Love is a warm fire to keep the soul warm.", "Success is a journey, not a destination."];

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex]

        res.status(200).send(randomFortune)
    },
    getAllPizzerias: (req,res) => {
        res.status(200).send(pizzeriaDB)
    },
    addPizzeria: (req,res) => {
        req.body.id = pizzeriaID
        pizzeriaDB.push(req.body)
        res.status(200).send(pizzeriaDB)
        pizzeriaID++
        console.log(req.body.id)
        console.log(req.body)
    },
    removePizzeria: (req,res) => {
        console.log(req.params)
        let { id } = req.params
        let index = pizzeriaDB.findIndex(pizzeria => pizzeria.id === +id)
        pizzeriaDB.splice(+index, 1)
        res.status(200).send(pizzeriaDB)
     },
    updateRating: (req,res) => {
        let { id } = req.params
        let { type } = req.body
        let index = pizzeriaDB.findIndex(pizzeria => pizzeria.id === +id)
        console.log(req.body)
        console.log(req.params)
        if(type === 'minus' && pizzeriaDB[index].rating > 0){
            pizzeriaDB[index].rating -= .1
        } else if(type === 'plus' && pizzeriaDB[index].rating < 10){
           pizzeriaDB[index].rating += .1
        } else {
            res.status(400).send('bad request!')
            return
        }
        res.status(200).send(pizzeriaDB)
    },
   
}
