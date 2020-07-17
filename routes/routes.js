const Router = function(path,name) {
    return {name , path };
}

const routes = new Router('app-route',[
    {path:"/",name:"home"},
    {path:"/category",name:"category"},
    {path:"/product",name:"product"},

]);
