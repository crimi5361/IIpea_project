const sql = require('mssql/msnodesqlv8');
require('dotenv').config(); 

const dbConfig = {
    server: process.env.BD_SERVER,
    database: process.env.BD_NAME,
    user: process.env.BD_USER,
    password: process.env.BD_PWD,
    driver: "msnodesqlv8",
    options: {
      trustedConnection: false, 
      enableArithAbort: true 
    }
  };
  




// Fonction pour se connecter à la base
async function connectDB() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("✅ Connexion réussie à la base de données !");
        return pool;
    } catch (error) {
        console.error("❌ Erreur lors de la connexion à la base de données :", error);
        throw error;
    }
}


module.exports={connectDB, sql}




