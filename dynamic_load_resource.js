// dynamically add base tag as well as css and javascript files.
// we can't add css/js the usual way, because some browsers (FF) eagerly prefetch resources
// before the base attribute is added, causing 404 and terribly slow loading of the docs app.
;(function() {
    var 
        indexFile = (location.pathname.match(/\/(index[^\.]*\.html)/) || ['', ''])[1],
        rUrl = /(#!\/|app|index[^\.]*\.html).*$/,
        baseUrl = location.href.replace(rUrl, indexFile),
        headEl = document.getElementsByTagName('head')[0],
        sync = true;

    addTag('base', {href: baseUrl});
    addTag('link', {rel: 'stylesheet', href: 'css/bootstrap.min.css', type: 'text/css'});
    addTag('link', {rel: 'stylesheet', href: 'css/font-awesome.css', type: 'text/css'});
    addTag('link', {rel: 'stylesheet', href: 'css/prettify.css', type: 'text/css'});
    
    addTag('script', {src: 'js/google-code-prettify.js'}, sync);
    addTag('script', {src: 'js/marked.js'}, sync);
    function addTag(name, attributes, sync) {
        var el = document.createElement(name),
                attrName;
        for (attrName in attributes) {
            el.setAttribute(attrName, attributes[attrName]);
        }
        sync ? document.write(outerHTML(el)) : headEl.appendChild(el);
    }
    function outerHTML(node){
        // if IE, Chrome take the internal method otherwise build one
        return node.outerHTML || (
            function(n){
                var div = document.createElement('div'), h;
                div.appendChild(n);
                h = div.innerHTML;
                div = null;
                return h;
            })(node);
    }
})();
