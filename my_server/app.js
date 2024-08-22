const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
const cors = require('cors');
const { error } = require('console');

app.use(cors());

app.use(bodyParser.json());

const dbFilePath = './db.json';
const usersFilePath = "./users.json"

const readFromDb = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading db.json:', error);
        return [];
    }
};


const writeToDb = (items) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(items));
    } catch (error) {
        console.error('Error writing to db.json:', error);
    }
};

const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users.json:', error);
        return [];
    }
};

const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
    } catch (error) {
        console.error('Error writing to db.json:', error);
    }
};

let users = readUsersFromFile()

app.post('/users', (req, res) => {

    try{
        const { name, password, email, userid } = req.body;
        if(!name || !password || !email || !userid){
            return res.status(400).json({error: "All fields are required"})
        }
        const newUser = {name, password, email, userid}
        users.push(newUser)

        writeUsersToFile(users)

        res.status(201).json({ message: "User was registered" })
    }
    catch(error){
        res.status(500).json({error: "Unknow error"})
    }

})

let me = {}

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try{
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"})
        }
        let users = await readUsersFromFile()
        
        let currentUser = users.find((user)=>{ return user.email === email })
        if (currentUser === undefined){
            return res.status(402).json({ status: "user not exist" })
        }
        if(currentUser.password == password){
            me = currentUser
            return res.status(201).json({ status: "success" })
        }
        return res.status(401).json({ error: "uncorrect email or password" })
    }
    catch(error){
        res.status(500).json({error: "Unknow error"})
    }
})



app.get('/me', async (req, res) => {
    if(Object.keys(me).length === 0){
        return res.status(400).json({error: "error"})
    }    
    return res.status(200).json({status: "success", user: me})
})


app.get('/', (req, res) => {
    res.send('Welcome to the Shop API!');
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
