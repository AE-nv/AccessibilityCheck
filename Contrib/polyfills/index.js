// console.log('Loading polyfills');
// window.Promise || document.write('<script src="/promise.js"></script>');
// window.fetch || document.write('<script src="/fetch.js"></script>');

function browserSupportsAllFeatures() {
    return window.Promise && window.fetch;
}

function loadScript(src, done) {
    var js = document.createElement('script');
    js.src = src;
    js.onload = function() {
        done();
    }
    js.onerror = function() {
        done(new Error('Failed to load script ' + src));
    }
    document.head.appendChild(js);
}