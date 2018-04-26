declare let AMDLoader;

let conf = {
    path: [
        { test: /^\/?jquery/, result: "/node_modules/jquery/dist/jquery" } ,
        { test: /^\/?(node_modules\/*)/, result: "/$1" }, 
        { test: /^\/?artist/, result: "/dist/artist" },
    ]
};

export default conf;

typeof AMDLoader !== "undefined" && AMDLoader && AMDLoader.config(conf);