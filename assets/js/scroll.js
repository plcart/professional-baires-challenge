(function(window, document) {
    'use strict';

    function scrollIt(element, duration = 200, easing = 'linear') {
        const easings = {
            linear(t) {
                return t;
            },
            easeInQuad(t) {
                return t * t;
            },
            easeOutQuad(t) {
                return t * (2 - t);
            },
            easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            easeInCubic(t) {
                return t * t * t;
            },
            easeOutCubic(t) {
                return (--t) * t * t + 1;
            },
            easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart(t) {
                return t * t * t * t;
            },
            easeOutQuart(t) {
                return 1 - (--t) * t * t * t;
            },
            easeInOutQuart(t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
            },
            easeInQuint(t) {
                return t * t * t * t * t;
            },
            easeOutQuint(t) {
                return 1 + (--t) * t * t * t * t;
            },
            easeInOutQuint(t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
            }
        };
        function checkBody() {
            document.documentElement.scrollTop += 1;
            const body = (document.documentElement.scrollTop !== 0) ? document.documentElement : document.body;
            document.documentElement.scrollTop -= 1;
            return body;
        }

        const body = checkBody();
        const start = body.scrollTop;
        const startTime = Date.now();
        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destination = documentHeight - element.offsetTop < windowHeight ? documentHeight - windowHeight : element.offsetTop;

        function scroll() {
            const now = Date.now();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easings[easing](time);
            body.scrollTop = (timeFunction * (destination - start)) + start;

            if (body.scrollTop === destination) {
                return;
            }
            requestAnimationFrame(scroll);
        }
        scroll();
    }

    document.addEventListener('DOMContentLoaded', function() {
        var btns = document.querySelectorAll('.js-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function() {
                var idLink = this.getAttribute('href');
                var section = document.querySelectorAll(idLink);
                scrollIt(section[0], 300, 'easeInQuad');
            });
        }
    });
})(window, document);