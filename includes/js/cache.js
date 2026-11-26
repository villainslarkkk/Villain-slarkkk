// Handling cache
// Caching is now handled by cache.html + firmware cache pages
// This way we don't cache everything for everyone, keeping caching faster.

window.addEventListener('load', function () {
    var isPS4User = typeof isPS4Console === 'function' ? isPS4Console() : false;
    var isDevMode = typeof devMode !== 'undefined' ? Boolean(devMode) : false;

    // Check for applicationCache only on PS4
    if (isPS4User && (!window.applicationCache || window.applicationCache.status === window.applicationCache.UNCACHED) && !isDevMode) {
        var nextUrl = typeof testModeUrl === 'function' ? testModeUrl('./cache.html') : './cache.html';
        if (window.location.pathname.indexOf('cache.html') === -1) {
            window.location.href = nextUrl;
        }
    }
});

// Used if terminating cache process early
function terminateCache() {
    if (window.applicationCache) {
        // Status 1 is 'checking', Status 3 is 'downloading'
        if (window.applicationCache.status === 3 || window.applicationCache.status === 1) {
            console.log("Terminating cache process to save memory...");
            try {
                window.applicationCache.abort();
            } catch (e) {}
            var appTitle = (typeof projectName !== 'undefined') ? projectName : "Villain Slarkkk";
            document.title = appTitle;
            window.applicationCache.oncached = null;
            window.applicationCache.onupdateready = null;
            window.applicationCache.onerror = null;
        }
    }
}
