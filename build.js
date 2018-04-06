module.exports = {
    "main": "src/index.js",
    "out": "dist/artist.js",
    "config": { 
        "path": [
		    { test: /^\/?(node_modules\/*)/, result: "/$1" }
        ],
		"ignore": [
			{ test: /^\/?node_modules\/jquery\/dist\/jquery/, result: "function() { if (typeof $ === 'undefined') throw '$ is not defined'; return $; }" }
		]
    }
}