const express = require('express');
const snowflake = require('snowflake-sdk');
const app = express();
const http = require('http').createServer(app);

const PORT=5001;

function getConnection(){
    return new Promise((resolve, reject) => {
        var conn = snowflake.createConnection( {
            account: 'XXXXXX',  
            role: 'EGRESSTEST_SPCS_ROLE',
            warehouse: 'APPSERVICE_WH',
            username: 'test_spcs_usr',
            password: "XXXXX",
        });       
        conn.connect( 
            function(err, conn) {
                if (err) {
                    reject('Unable to connect: ' + err.message);
                    } 
                else {
                    resolve(conn);
                    connection_ID = conn.getId();
                    }
            }
        );
    })
}

const sql = `
        SELECT
            current_account() AS account,
            current_database() AS database,
            current_schema() AS schema
            `
app.get('/', async (req, res) => {
    try {
        var conn=await getConnection();
        const statement = await conn.execute( {
            sqlText: sql,
            complete: function(err, stmt, rows) {
                if (err) {
                    res.send('ERROR '+err);
                }
                else {
                    res.send('SUCCESS FROM SNOWFLAKE SDK');
                }
            }
        })
    } catch (error) {
        res.send(error);
    }
  })

http.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}...`));



