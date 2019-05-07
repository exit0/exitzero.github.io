function Slides(selector, options) {

    var mergedOptions = $.extend({
        duration: 5000
    }, options);

    var containerEl = document.querySelector(selector);
    var slideEls = Array.prototype.slice.call(containerEl.children);

    var timeout;
    var currentIndex = 0;

    if (slideEls.length < 3) {
        throw new Error('At least 3 slides are required.');
    }

    // Init
    init();

    function init() {

        slideEls.forEach(function (slide, i) {
            slide.style.zIndex = 0;
        });

        slideEls[0].style.opacity = 1;
    
        timeout = setTimeout(transition, mergedOptions.duration);
    }

    function transition() {

        var newIndex = currentIndex >= (slideEls.length - 1) ? 0 : currentIndex + 1;
        var prevIndex = currentIndex - 1 < 0 ? (slideEls.length - 1) : currentIndex - 1;

        slideEls[prevIndex].style.cssText = 'opacity: 0; z-index: 0;';
        slideEls[currentIndex].style.zIndex = 1;
        slideEls[newIndex].style.cssText = 'opacity: 1; z-index: 2;';

        currentIndex = newIndex;
        timeout = setTimeout(transition, mergedOptions.duration);
    }

    function destroy() {
        clearTimeout(timeout);
    }

    return {
        destroy: destroy
    }
}