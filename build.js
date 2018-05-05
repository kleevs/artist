module.exports = {
    "main": "src/index.js",
    "out": "dist/artist.js",
    "config": { 
        "name": "Artist",
        "path": [
		    { test: /^\/?(node_modules\/*)/, result: "/$1" }
        ]
    }
}