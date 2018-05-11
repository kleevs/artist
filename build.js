module.exports = {
    "main": "src/index.js",
    "out": "dist/artiste.js",
    "config": { 
        "name": "Artiste",
        "path": [
		    { test: /^\/?(node_modules\/*)/, result: "/$1" }
        ]
    }
}