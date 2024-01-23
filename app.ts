// import  express, { Request, Response } from 'express';
import * as express from 'express';
import { Request, Response } from 'express';
import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: process.env.DB_PASS,
    port: 3306,
    database: 'tscrud',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const getConnection = async () => {
    try {        
        const connection = await pool.getConnection();
        return connection;
        
    } catch (error) {
        console.error('Error getting database connection:', error);
        throw error;
    }
};

app.post('/postdata', async (req: Request, res: Response) => {
    try {
        const connection = await getConnection();
        const data = req.body;
        const sql = 'INSERT INTO user SET ?';
        const [result] = await connection.query(sql, [data]);
        connection.release();

        console.log('Data Post Successfully....');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getdata', async (req: Request, res: Response) => {
    try {
        const connection = await getConnection();
        const sql = 'SELECT * FROM user';
        const [result] = await connection.query(sql);
        connection.release();

        console.log('Data Get Successfully...');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/dataupdate/:id', async (req: Request, res: Response) => {
    try {
        const connection = await getConnection();
        const id = req.params.id;
        const data = req.body;
        const sqlQuery = 'UPDATE user SET ? WHERE id = ?';

        const [result] = await connection.query(sqlQuery, [data, id]);
        connection.release();

        console.log('Data Update Successfully...');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deletedata/:id', async (req: Request, res: Response) => {
    try {
        const connection = await getConnection();
        const id = req.params.id;
        const sqlQuery = 'DELETE FROM user WHERE id = ?';

        const [result] = await connection.query(sqlQuery, id);
        connection.release();

        console.log('Data Delete Successfully...');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT: number = 5500;

app.listen(PORT, () => {
    console.log(`Server Started On ${PORT}`);
});
