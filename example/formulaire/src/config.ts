let conf = {
    path: [
        { test: /^\/?jquery/, result: "node_modules/jquery/dist/jquery" } ,
        { test: /^\/?(node_modules\/*)/, result: "$1" }, 
        { test: /^\/?artiste/, result: "node_modules/artistejs/dist/artiste" },
    ]
};

export default conf;