const server = require("./api/server")
require('dotenv').config()

const port = porecess.env.PORT || 8080

server.listen(port, function() {
    console.log(`\n service is up and running on http://localhost:${port} ]n`)
})