module.exports = {
    "main": "src/index.js",
    "out": "dist/artist.js",
    "config": { 
        "name": "Artist",
        "path": [
		    { test: /^\/?(node_modules\/*)/, result: "/$1" }
        ],
		"require": {
			"jQuery": { id: "jquery", for: /^\/?node_modules\/jquery\/dist\/jquery/ }
        }
    }
}