
// const pizzerias = [
//     {
//         name: `Name: <br> John's of Bleecker St.`,
//         address: `Address: <br> 278 Bleecker St, New York, NY 10014`,
//         speciality: `Speciality: <br> coal fired pie`,
//         rating: `9.6`,
//         imgURL: `https://1.bp.blogspot.com/-kitWSCFQ5Xo/YNxhrd5KmaI/AAAAAAABZiQ/6f3YMZDaRikVNMenyX5zUH_EG_NPsviZACNcBGAsYHQ/s2048/20210625_161948.jpg`
//     },
//     {
//         name: `Name: <br> Prince Street Pizza`,
//         address: `Address: <br> 27 Prince St, New York, NY 10012`,
//         speciality: `Speciality: <br> square with pepperoni`,
//         rating: `9.2`,
//         imgURL: `https://roadfood.com/wp-content/uploads/2017/08/20161231_145159-1024x685.jpg`

//     },
//     {
//         name: `Name: <br> NY Pizza Suprema`,
//         address: `Address: <br> 413 8th Ave, New York, NY 10001`,
//         speciality: `Speciality: <br> plain slice pie`,
//         rating: `8.9`,
//         imgURL: `https://external-preview.redd.it/e7YCrCGvBWj43qfM09BlFAi7ez4j1GkFp3R81sFpyYY.jpg?auto=webp&s=4be3cb41610ac44fab7a49b1160bcad29d77d9f2`
//     },
//     {
//         name: `Name: <br> Lee's Tavern`,
//         address: `Address: <br> 60 Hancock St, Staten Island, NY 10305`,
//         speciality: `Speciality: <br> bar pie`,
//         rating: `8.8`,
//         imgURL: `https://leestavernnyc.com/wp-content/uploads/2019/06/IMG_9477.jpg`
//     },
//     {
//         name: `Name: <br> Joe's Pizza`,
//         address: `Address: <br> 7 Carmine St New York, NY 10014`,
//         speciality: `Speciality: <br> plain slice pie`,
//         rating: `8.6`,
//         imgURL: `https://cdn2.pizzadb.com/wp-content/uploads/2018/03/joes4-1012x1024.png`
//     }
// ]

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
        let index = pizzeriaDB.findIndex(pizzeria => pizzeria.id === id++)
        console.log(req.body)
        console.log(req.params)
        if(type === 'minus' && pizzeriaDB[index].rating > 0){
            pizzeriaDB[index].rating -= .10
        } else if(type === 'plus' && pizzeriaDB[index].rating < 10){
            pizzeriaDB[index].rating += .10
        } else {
            res.status(400).send('bad request!')
            return
        }
        res.status(200).send(pizzeriaDB)
    }
}
