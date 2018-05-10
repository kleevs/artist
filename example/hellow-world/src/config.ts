export default { 
	path: [ 
		{ test: /^\/?(node_modules\/*)/, result: "$1" }, 
		{ test: /^\/?artist/, result: "node_modules/artist/dist/artist" } 
	] 
};