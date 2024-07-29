// Import the 'http' module to create an HTTP server
const http = require('http');

// Set the port number where the server will listen our request
const port = 8000;


//  module to handle file operations
const fs = require('fs'); // FS = "FILE SYSTEM"

// createserver =  to Create an  server
http.createServer((request, response) => {
    // Initialize a variable to hold the file name based on the URL
    let fileName = "";  
    
    switch(request.url) {
        case '/':
            fileName = './index.html'; 
            break;

        case '/about':
            fileName = './about.html';
            break;

        case '/contact':
            fileName = './contact.html'; 
            break;

        default:
            fileName = './404.html';    
    }

    // Read the file from the filesystem
    fs.readFile(fileName, (err, result) => {
        if (err) {
            // If there's an error reading the file, it will give an error message
            console.log("YOUR FILE IS NOT FOUND");
            return false; // Stop execution
        }
        
        response.end(result);// The 'result' variable holds the file content (like HTML, text, etc.)
    });

}).listen(port); // Start the server and wait for requests 

