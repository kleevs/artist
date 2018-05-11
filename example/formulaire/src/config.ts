let conf = {
    path: [
        { test: /^\/?jquery/, result: "node_modules/jquery/dist/jquery" } ,
        { test: /^\/?(node_modules\/*)/, result: "$1" }, 
        { test: /^\/?artist/, result: "node_modules/artist/dist/artist" },
    ]
};

export default conf;