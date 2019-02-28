const utils = require('./utils');
const urlParser = require('url').parse;

function Router(options){
    options = options || {};
    this.stack = [];
}

Router.prototype.middlewareInit = function(req, res, out){
    let index = 0;
    let stack = this.stack;

    function next(){
        let layer = stack[index++];
        let hasError = Boolean(err);

        // 如果没有了则结束中间件，走下一个中间件
        if (!layer) {
            return hasError ? out(err) : out();
        }

    }

    next();
}

function pathFormat(route) {
    route = route.toLowerCase();
    if (route.length > 0 && route.lastIndexOf('/') === route.length - 1) {
        route = route.substr(0, route.length - 1);
    }
    return route
}
