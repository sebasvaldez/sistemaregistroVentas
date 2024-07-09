import app from "./app.js"
import {connectDB} from "./db.js"


connectDB();


//asigno un puerto para que escuche el servidor
app.listen(4000, () => {console.log("server on port 4000")})