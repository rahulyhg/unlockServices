(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/vendor/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_breakpoints.js","./_gridalicious.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_gridalicious.js","./_isotope":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_isotope.js","./_scrollable.js":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_scrollable.js","./_sidebar-pc":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_sidebar-pc.js","./_skins":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skins.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_gridalicious.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkGridalicious = function () {

        if (! this.length) return;

        this.gridalicious({
            gutter: this.data('gutter') || 15,
            width: this.data('width') || 370,
            selector: '> div',
            animationOptions: {
                complete: function () {
                    $(window).trigger('resize');
                }
            }
        });

    };

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).tkGridalicious();
    });

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_isotope.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkIsotope = function () {

        if (! this.length) return;

        this.isotope({
            layoutMode: this.data('layoutMode') || "packery",
            itemSelector: '.item'
        });

        this.isotope('on', 'layoutComplete', function(){
            $(window).trigger('resize');
        });

    };

    $(function(){

        setTimeout(function () {
            $('[data-toggle="isotope"]').each(function () {
                $(this).tkIsotope();
            });
        }, 300);

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);

},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_scrollable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('./_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkScrollable = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            horizontal: false
        }, options);

        var nice = this.niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: settings.horizontal
        });

        if (! settings.horizontal) return;

        var _super = nice.getContentSize;

        nice.getContentSize = function () {
            var page = _super.call(nice);
            page.h = nice.win.height();
            return page;
        };

    };

    $('[data-scrollable], .st-content-inner').tkScrollable();

    $('[data-scrollable-h]').each(function () {

        $(this).tkScrollable({ horizontal: true });

    });

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            $('[data-scrollable], [data-scrollable-h], .st-content-inner').getNiceScroll().resize();
        }, 100);
    });

}(jQuery));
},{"./_skin":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js"}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_sidebar-pc.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkSidebarSizePcDemo = function(){

        var t, spc_demo = this;

        if (! spc_demo.length) return;

        $(document)
            .on('sidebar.show', function(){
                $('#pc-open').prop('disabled', true);
            })
            .on('sidebar.hidden', function(){
                $('#pc-open').prop('disabled', false);
            });

        spc_demo.on('submit', function (e) {
            e.preventDefault();
            var s = $('.sidebar'), ve = $('#pc-value'), v = ve.val();
            ve.blur();
            if (! v.length || v < 25) {
                v = 25;
                ve.val(v);
            }
            s[ 0 ].className = s[ 0 ].className.replace(/sidebar-size-([\d]+)pc/ig, 'sidebar-size-' + v + 'pc');
            sidebar.open('sidebar-menu');
            clearTimeout(t);
            t = setTimeout(function () {
                sidebar.close('sidebar-menu');
            }, 5000);
        });

    };

    $('[data-toggle="sidebar-size-pc-demo"]').tkSidebarSizePcDemo();

})(jQuery);
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_skins.js":[function(require,module,exports){
var asyncLoader = require('./_async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin"),
            file = $.cookie("skin-file");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + file + '.min.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        $.cookie("skin-file", $(this).data('file'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"./_async":"/persistent/var/www/html/real-estate-1.1.0/dev/app/vendor/layout/js/_async.js"}]},{},["./app/vendor/layout/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9tYWluLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2FzeW5jLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2JyZWFrcG9pbnRzLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX2dyaWRhbGljaW91cy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19pc290b3BlLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3Njcm9sbGFibGUuanMiLCJhcHAvdmVuZG9yL2xheW91dC9qcy9fc2lkZWJhci1wYy5qcyIsImFwcC92ZW5kb3IvbGF5b3V0L2pzL19za2luLmpzIiwiYXBwL3ZlbmRvci9sYXlvdXQvanMvX3NraW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9fYnJlYWtwb2ludHMuanMnKTtcbnJlcXVpcmUoJy4vX2dyaWRhbGljaW91cy5qcycpO1xucmVxdWlyZSgnLi9fc2Nyb2xsYWJsZS5qcycpO1xucmVxdWlyZSgnLi9fc2tpbnMnKTtcbnJlcXVpcmUoJy4vX2lzb3RvcGUnKTtcblxuLy8gU2lkZWJhciBQZXJjZW50YWdlIFNpemVzIERlbW9cbnJlcXVpcmUoJy4vX3NpZGViYXItcGMnKTsiLCJmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcblxuICAgIHZhciBkb25lID0gZmFsc2UsIHRvcCA9IHRydWUsXG5cbiAgICAgICAgZG9jID0gd2luLmRvY3VtZW50LFxuICAgICAgICByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgbW9kZXJuID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIsXG5cbiAgICAgICAgYWRkID0gbW9kZXJuID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICAgICAgcmVtID0gbW9kZXJuID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICAgICAgcHJlID0gbW9kZXJuID8gJycgOiAnb24nLFxuXG4gICAgICAgIGluaXQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUudHlwZSA9PSAncmVhZHlzdGF0ZWNoYW5nZScgJiYgZG9jLnJlYWR5U3RhdGUgIT0gJ2NvbXBsZXRlJykgcmV0dXJuO1xuICAgICAgICAgICAgKGUudHlwZSA9PSAnbG9hZCcgPyB3aW4gOiBkb2MpWyByZW0gXShwcmUgKyBlLnR5cGUsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghIGRvbmUgJiYgKGRvbmUgPSB0cnVlKSkgZm4uY2FsbCh3aW4sIGUudHlwZSB8fCBlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBwb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByb290LmRvU2Nyb2xsKCdsZWZ0Jyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChwb2xsLCA1MCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5pdCgncG9sbCcpO1xuICAgICAgICB9O1xuXG4gICAgaWYgKGRvYy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIGZuLmNhbGwod2luLCAnbGF6eScpO1xuICAgIGVsc2Uge1xuICAgICAgICBpZiAoISBtb2Rlcm4gJiYgcm9vdC5kb1Njcm9sbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0b3AgPSAhIHdpbi5mcmFtZUVsZW1lbnQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9wKSBwb2xsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAnRE9NQ29udGVudExvYWRlZCcsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgZG9jWyBhZGQgXShwcmUgKyAncmVhZHlzdGF0ZWNoYW5nZScsIGluaXQsIGZhbHNlKTtcbiAgICAgICAgd2luWyBhZGQgXShwcmUgKyAnbG9hZCcsIGluaXQsIGZhbHNlKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJscywgY2FsbGJhY2spIHtcblxuICAgIHZhciBhc3luY0xvYWRlciA9IGZ1bmN0aW9uICh1cmxzLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHVybHMuZm9yZWFjaChmdW5jdGlvbiAoaSwgZmlsZSkge1xuICAgICAgICAgICAgbG9hZENzcyhmaWxlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hlY2tpbmcgZm9yIGEgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjYWxsaW5nIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgY29udGVudExvYWRlZCh3aW5kb3csIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbG9hZENzcyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbIDAgXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9O1xuXG4gICAgLy8gc2ltcGxlIGZvcmVhY2ggaW1wbGVtZW50YXRpb25cbiAgICBBcnJheS5wcm90b3R5cGUuZm9yZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICsrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpLCB0aGlzWyBpIF0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGFzeW5jTG9hZGVyKHVybHMsIGNhbGxiYWNrKTtcblxufTsiLCIoZnVuY3Rpb24gKCQpIHtcblxuICAgICQod2luZG93KS5zZXRCcmVha3BvaW50cyh7XG4gICAgICAgIGRpc3RpbmN0OiB0cnVlLFxuICAgICAgICBicmVha3BvaW50czogWyAzMjAsIDQ4MCwgNzY4LCAxMDI0IF1cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtHcmlkYWxpY2lvdXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmdyaWRhbGljaW91cyh7XG4gICAgICAgICAgICBndXR0ZXI6IHRoaXMuZGF0YSgnZ3V0dGVyJykgfHwgMTUsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5kYXRhKCd3aWR0aCcpIHx8IDM3MCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnPiBkaXYnLFxuICAgICAgICAgICAgYW5pbWF0aW9uT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZSo9XCJncmlkYWxpY2lvdXNcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50a0dyaWRhbGljaW91cygpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0lzb3RvcGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLmlzb3RvcGUoe1xuICAgICAgICAgICAgbGF5b3V0TW9kZTogdGhpcy5kYXRhKCdsYXlvdXRNb2RlJykgfHwgXCJwYWNrZXJ5XCIsXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcuaXRlbSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pc290b3BlKCdvbicsICdsYXlvdXRDb21wbGV0ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgICQoZnVuY3Rpb24oKXtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cImlzb3RvcGVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRrSXNvdG9wZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDMwMCk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2RvbUNoYW5nZWQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnW2RhdGEtdG9nZ2xlPVwiaXNvdG9wZVwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmlzb3RvcGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4vX3NraW4nKSgpO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1Njcm9sbGFibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgaG9yaXpvbnRhbDogZmFsc2VcbiAgICAgICAgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgdmFyIG5pY2UgPSB0aGlzLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAwLFxuICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IHNldHRpbmdzLmhvcml6b250YWxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCEgc2V0dGluZ3MuaG9yaXpvbnRhbCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBfc3VwZXIgPSBuaWNlLmdldENvbnRlbnRTaXplO1xuXG4gICAgICAgIG5pY2UuZ2V0Q29udGVudFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGFnZSA9IF9zdXBlci5jYWxsKG5pY2UpO1xuICAgICAgICAgICAgcGFnZS5oID0gbmljZS53aW4uaGVpZ2h0KCk7XG4gICAgICAgICAgICByZXR1cm4gcGFnZTtcbiAgICAgICAgfTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS1zY3JvbGxhYmxlXSwgLnN0LWNvbnRlbnQtaW5uZXInKS50a1Njcm9sbGFibGUoKTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGUtaF0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKHRoaXMpLnRrU2Nyb2xsYWJsZSh7IGhvcml6b250YWw6IHRydWUgfSk7XG5cbiAgICB9KTtcblxuICAgIHZhciB0O1xuICAgICQod2luZG93KS5vbignZGVib3VuY2VkcmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdLCBbZGF0YS1zY3JvbGxhYmxlLWhdLCAuc3QtY29udGVudC1pbm5lcicpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQuZm4udGtTaWRlYmFyU2l6ZVBjRGVtbyA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdmFyIHQsIHNwY19kZW1vID0gdGhpcztcblxuICAgICAgICBpZiAoISBzcGNfZGVtby5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAkKGRvY3VtZW50KVxuICAgICAgICAgICAgLm9uKCdzaWRlYmFyLnNob3cnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJyNwYy1vcGVuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3NpZGViYXIuaGlkZGVuJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc3BjX2RlbW8ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgcyA9ICQoJy5zaWRlYmFyJyksIHZlID0gJCgnI3BjLXZhbHVlJyksIHYgPSB2ZS52YWwoKTtcbiAgICAgICAgICAgIHZlLmJsdXIoKTtcbiAgICAgICAgICAgIGlmICghIHYubGVuZ3RoIHx8IHYgPCAyNSkge1xuICAgICAgICAgICAgICAgIHYgPSAyNTtcbiAgICAgICAgICAgICAgICB2ZS52YWwodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzWyAwIF0uY2xhc3NOYW1lID0gc1sgMCBdLmNsYXNzTmFtZS5yZXBsYWNlKC9zaWRlYmFyLXNpemUtKFtcXGRdKylwYy9pZywgJ3NpZGViYXItc2l6ZS0nICsgdiArICdwYycpO1xuICAgICAgICAgICAgc2lkZWJhci5vcGVuKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgICAgIHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmNsb3NlKCdzaWRlYmFyLW1lbnUnKTtcbiAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLXNpemUtcGMtZGVtb1wiXScpLnRrU2lkZWJhclNpemVQY0RlbW8oKTtcblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNraW4gPSAkLmNvb2tpZSgnc2tpbicpO1xuXG4gICAgaWYgKHR5cGVvZiBza2luID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNraW4gPSAnZGVmYXVsdCc7XG4gICAgfVxuICAgIHJldHVybiBza2luO1xufSk7IiwidmFyIGFzeW5jTG9hZGVyID0gcmVxdWlyZSgnLi9fYXN5bmMnKTtcblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhbmdlU2tpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNraW4gPSAkLmNvb2tpZShcInNraW5cIiksXG4gICAgICAgICAgICBmaWxlID0gJC5jb29raWUoXCJza2luLWZpbGVcIik7XG4gICAgICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYXN5bmNMb2FkZXIoWyAnY3NzLycgKyBmaWxlICsgJy5taW4uY3NzJyBdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5yZW1vdmVQcm9wKCdkaXNhYmxlZCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkKCdbZGF0YS1za2luXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcpKSByZXR1cm47XG5cbiAgICAgICAgJCgnW2RhdGEtc2tpbl0nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2xvYWRpbmcnKTtcblxuICAgICAgICAkLmNvb2tpZShcInNraW5cIiwgJCh0aGlzKS5kYXRhKCdza2luJykpO1xuXG4gICAgICAgICQuY29va2llKFwic2tpbi1maWxlXCIsICQodGhpcykuZGF0YSgnZmlsZScpKTtcblxuICAgICAgICBjaGFuZ2VTa2luKCk7XG5cbiAgICB9KTtcblxuICAgIHZhciBza2luID0gJC5jb29raWUoXCJza2luXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBza2luICE9ICd1bmRlZmluZWQnICYmIHNraW4gIT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIGNoYW5nZVNraW4oKTtcbiAgICB9XG5cbn0pKGpRdWVyeSk7Il19
