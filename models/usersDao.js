const { DataSource } = require("typeorm")

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.log(err)
        console.log("Data Source initialize failed..")
    })


const getUserByAccount = async (account) => {
    const [queryRes] = await myDataSource.query(`SELECT id, account, password FROM users WHERE account = ?`, [account])
    return queryRes;
}

const getUserByPhone = async (phone) => {
    const [queryRes] = await myDataSource.query(`SELECT account FROM users WHERE phone = ?`, [phone])
    return queryRes;
}

const createUser = async (account, hashedPw, name, phone, birth) => {
    const queryRes = await myDataSource.query(`INSERT INTO users(account, password, name, phone, birth) VALUES (?, ?, ?, ?, ?)`, [account, hashedPw, name, phone, birth])
    return queryRes;
}



module.exports = { createUser, getUserByAccount, getUserByPhone };
