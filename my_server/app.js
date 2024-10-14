const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 3000;
const cors = require('cors');
const { error } = require('console');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: 'supersecretkey', // Используйте надежный секретный ключ в реальных приложениях
    resave: false, // Не сохранять сессию снова, если она не была изменена
    saveUninitialized: false, // Не сохранять сессию, если она не была инициализирована
    cookie: {
      httpOnly: true, // Куки недоступны из JavaScript
      secure: false, // Должно быть true, если используется HTTPS
      maxAge: 1000 * 60 * 60 * 24 // Срок жизни куки 1 день
    }
  }));

app.use(bodyParser.json());

const dbFilePath = './db.json';
const usersFilePath = "./users.json"
const productsFilePath = "./products.json"


const readUsersFromFile = async () => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users.json:', error);
        return [];
    }
};

const writeUsersToFile = async (users) => {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users));
    } catch (error) {
        console.error('Error writing to db.json:', error);
    }
};

const readProductsFromFile = async () => {
    try{
        const data = await fs.readFile(productsFilePath, "utf8")
        console.log('read Products from ', productsFilePath)
        return JSON.parse(data)
    }
    catch(error){
        console.error("Error reading products.json", error)
        return []
    }
}

const readCartAndWishFromFile = async (userId = req.session.userId) => {
    const filePath = `./users/${userId}.json`
    try{
        const data = await fs.readFile(filePath, "utf8")
        console.log('read Cart And Wish form', filePath)
        return JSON.parse(data)
    }
    catch(error){
        console.log(`Error reading ${filePath}`, error)
        return []
    }
}

const writeCartAndWishFromFile = async (userid = req.session.userId, newData) => {
    const filePath = `./users/${userid}.json`
    try {
        await fs.writeFile(filePath, JSON.stringify(newData));
    } catch (error) {
        console.log(`Error writing to ${filePath}:`, error);
    }
};

const countSumCart = (array) => {
    let sum = 0
    array.forEach(element => {
        sum += parseInt(element.cost)
    });
    return sum
}




app.post('/users', async (req, res) => {
    try{
        const { name, password, email, userid } = req.body;
        if(!name || !password || !email || !userid){
            return res.status(400).json({error: "All fields are required"})
        }
        const newUser = {name, password, email, userid}
        let users = await readUsersFromFile()
        if(JSON.stringify(users)
            .includes(
                JSON.stringify(newUser)
        )){
            return res.status(400).json({error: "User already registered"})
        }
        users.push(newUser)

        await writeUsersToFile(users)
        await fs.writeFile(`./users/${userid}.json`, JSON.stringify({"wishList": [], "cart": []}))

        return res.status(201).json({status: "success", message: "User was registered" })
    }
    catch(error){
        return res.status(500).json({error: "Unknow error"})
    }

})


app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try{
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"})
        }
        let users = await readUsersFromFile()
        
        let currentUser = users.find((user)=>{ return user.email === email })
        if (currentUser === undefined){
            return res.status(404).json({ error: "user not exist" })
        }
        if(currentUser.password == password){
            req.session.userName = currentUser.name
            req.session.userEmail = currentUser.email
            req.session.userId = currentUser.userid;
            console.log("userID", req.session.userId)
            return res.status(201).json({ status: "success" })
        }
        return res.status(401).json({ error: "uncorrect email or password" })
    }
    catch(error){
        res.status(500).json({error: "Unknow error"})
    }
})

app.delete('/logout', (req, res) => {
    if (!req.session.userId) { 
        return res.status(401).json({ error: "none user sessionId" });
    }   
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to destroy session" });
        }
    
        return res.status(200).json({ status: "success" });
      });
})

app.get('/me', async (req, res) => {
    if (!req.session.userId) { 
        return res.status(401).json({ error: "none user sessionId" });
    }   
    return res.status(200).json({status: "success", user: {name: req.session.userName, email: req.session.userEmail, userid: req.session.userId}})
})



app.get('/products', async (req, res) => {
    const products = await readProductsFromFile()
    return res.status(200).json({status: "success", products: products})
})

app.post('/cart', async (req, res) => {
    const products = await readProductsFromFile()
    const { productId } = req.body
    let product = products.find((product) => product.id === productId)
    let cartAndWish = await readCartAndWishFromFile(req.session.userId)
    cartAndWish.cart.push(product)
    writeCartAndWishFromFile(req.session.userId, cartAndWish)
    return res.status(200).json({starus: "success"})
})

app.get('/cart', async (req, res) => {
    try{
        if(!req.session.userId){
            return res.status(200).json({status: "success", cart: []})
        }
        const { cart } = await readCartAndWishFromFile(req.session.userId)
        return res.status(200).json({status: "success", cart, finalPrice: countSumCart(cart)})
    }
    catch(error){
        console.log(error)
        return res.status(401).json({status: "error", error})
    }
})

app.delete('/cart/:productId', async (req, res) => {
    try{
        const productId = req.params.productId
        let cartAndWish = await readCartAndWishFromFile(req.session.userId)
        console.log("remove id", productId)
        cartAndWish.cart = cartAndWish.cart.filter(item => Number(item.id) !== Number(productId))
        await writeCartAndWishFromFile(req.session.userId, cartAndWish)
        return res.status(200).json({status: "success"})
    }
    catch(error){
        console.log("cart delete error:",error)
        return res.status(400).json({status: "error", error})
    }
})

app.get('/', (req, res) => {
    res.send('Welcome to the Shop API!');
});

app.get('/wish', async (req, res) => {
    if(!req.session.userId){
        return res.status(200).json({status: "success", wishList: []})
    }
    try{
        const { wishList } = await readCartAndWishFromFile(req.session.userId)
        return res.status(200).json({status: "success", wishList})
    }
    catch(error){
        console.log("server erorr read wishList")
        return res.status(400).json({status: "error"})
    }
})

app.post('/wish', async (req, res) => {
    if(!req.session.userId){
        return res.status(200).json({status: "success"})
    }
    try{
        const { product } = req.body
        let cartAndWish = await readCartAndWishFromFile(req.session.userId)
        if(cartAndWish.wishList.includes(product)){
            console.log('there is already')
            return res.status(200).json({status: "success"})
        }
        cartAndWish.wishList.push(product)
        writeCartAndWishFromFile(req.session.userId, cartAndWish)
        return res.status(200).json({status: "success"})
    }
    catch(erorr){
        console.log("wishList post error", erorr)
        return res.status(400).json({status: "erorr"})
    }
})

app.delete('/wish/:productId', async (req, res) => {
    try{
        const productId = req.params.productId
        let cartAndWish = await readCartAndWishFromFile(req.session.userId)
        console.log("remove wish id", productId)
        cartAndWish.wishList = cartAndWish.wishList.filter(item => Number(item.id) !== Number(productId))
        await writeCartAndWishFromFile(req.session.userId, cartAndWish)
        return res.status(200).json({status: "success"})
    }
    catch(erorr){
        console.log("wishList delete error:", erorr)
        return res.status(400).json({status: "erorr"})
    }
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

        // if(!cartAndWish.wishList.some(item => Number(item.id) === Number(productId))){
        //     return res.status(200).json({status: "success"})
        // }