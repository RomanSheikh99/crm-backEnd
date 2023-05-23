const app = require('./app')
const dev = require('./config/config')
const PORT = dev.app.port;


app.listen(PORT, ()=>{
    console.log(`server is running at port http://localhost:${PORT}`);
})