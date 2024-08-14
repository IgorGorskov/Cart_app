const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

const dbFilePath = './db.json';
const usersFilePath = "./users.json"

// Функция для чтения задач из db.json
const readFromDb = () => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading db.json:', error);
        return [];
    }
};

// Функция для записи задач в db.json
const writeToDb = (items) => {
    try {
        fs.writeFileSync(dbFilePath, JSON.stringify(todos));
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
    const { name, password, email } = res.body;
    const newUser = {name, password, email, userid}
    users.push(newUser)

    writeUsersToFile(users)

    res.status(200).json()
})

app.get('/', (req, res) => {
    res.send('Welcome to the Todo API!');
});


