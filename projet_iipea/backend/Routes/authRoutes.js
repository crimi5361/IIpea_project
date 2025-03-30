const { connectDB, sql} = require ('../dbConfig');

Router.post('/login', async (req, res) =>{
    try{
        const pool = await connectDB();
        const result = await pool.request()
            .input('username', sql.VarChar, req.body.username)
            .query('SELECT * FROM Utilisateurs WHERE username = @username')

            res.json(result.recordset);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    })


