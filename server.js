const detenv = require('dotenv');

detenv.config({ path: './config.env' });
const app = require('./app');


const port=process.env.PORT||81

app.listen(port,()=>{
    console.log(` App running on port ${port} ....`)
})
