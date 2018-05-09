const express = require('express')
const fs = require('fs')

const app = express()

/**
 * Load the configuration and any overrides from the trapper config file
 */
configContents = fs.readFileSync('../etc/default.config.json')
config = JSON.parse(configContents)

function handleRequest(req, res) {

    // Troubleshooting
    console.log(req.body)
    res.send("{ message: 'This is a successful test' }")

    // Get the request information to be stored

    // Store the information to a file
}

if(config.enabled_methods.includes("get")) app.get('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("post")) app.post('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("patch")) app.path('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("options")) app.options('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("head")) app.head('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("put")) app.put('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("delete")) app.delete('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("trace")) app.trace('/', (req,res) => { handleRequest(req,res) })
if(config.enabled_methods.includes("connect")) app.connect('/', (req,res) => { handleRequest(req,res) })

app.listen(config.keys.port, () => {
    var server = express.server
    var port = express.port

    console.log("Server listening on ${server}:${port}")
})