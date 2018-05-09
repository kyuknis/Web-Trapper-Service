const express = require('express')
const fs = require('fs')
const bodyparser = require('body-parser')

const app = express()

app.use(bodyparser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
}))

// Register the raw body middleware
app.use(function(req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');
  
    req.on('data', function(chunk) { 
      req.rawBody += chunk;
    });
  
    req.on('end', function() {
      next();
    });
  });


/**
 * Load the configuration and any overrides from the trapper config file
 */
configContents = fs.readFileSync('../etc/default.config.json')
config = JSON.parse(configContents)

function echoRequest(req, res) {
    // Send the request back to the original sender
}

/**
 * handRequest(...)
 * Handles the incoming request according to the loaded configuration
 * req: The request that was received
 */
function handleRequest(req, res) {

    // Send response to server
    if (config.keys.echo) echoRequest(req, res)
    else res.send("")

    // Open the file to store the request to
    var file = fs.createWriteStream(config.keys.out_dir + "\\" + (new Date().toISOString()).replace(/:/g, '').replace(/-/g, '') + ".txt")

    // Store the information to a file
    file.on('open', (fd) => {

        // Print headers
        for(var key in req.headers) {
            file.write(key + ": " + req.headers[key] + "\n")
        }

        // Print new line
        file.write("\n")

        // Print body
        file.write(req.rawBody)

        // Close file
        file.end()

    })

}

// Subscribe to all methods
if(config.enabled_methods.includes("get")) app.get('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("post")) app.post('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("patch")) app.path('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("options")) app.options('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("head")) app.head('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("put")) app.put('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("delete")) app.delete('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("trace")) app.trace('/', (req,res) => { handleRequest(req, res) })
if(config.enabled_methods.includes("connect")) app.connect('/', (req,res) => { handleRequest(req, res) })


// Start the express listener
app.listen(config.keys.port, () => {
    var server = express.server
    var port = express.port

    console.log("Server listening on ${server}:${port}")
})