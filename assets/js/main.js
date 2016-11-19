(function (doc) {
    'use strict';
    var navControl = {}
    doc.addEventListener("DOMContentLoaded", function () {
        var navs = doc.getElementsByClassName('scroll-nav-box');
        for (var i = 0; i < navs.length; i++) {
            var nav = navs[i],
                items = nav.getElementsByClassName('scroll-nav-section');

            navControl[nav.id] = {
                width: nav.scrollWidth,
                mouseX: 0,
                mouseXOld: 0,
                mousePress: false,
                posNew: 0
            };

            nav.addEventListener('mouseup', function (e) {
                navControl[e.currentTarget.id].mousePress = false
            });
            nav.addEventListener('mousedown', function (e) {
                navControl[e.currentTarget.id].mousePress = true
            });
            nav.addEventListener('mousemove', function (e) {
                var current = navControl[e.currentTarget.id]
                current.mouseX = e.pageX;
                if (current.mousePress) {
                    if (current.mouseXOld > current.mouseX)
                        current.posNew += 2;
                    else
                        current.posNew -= 2;
                    e.currentTarget.scrollLeft = current.posNew;
                }
                current.mouseXOld = current.mouseX;
            });

            for (var k = 0; k < items.length; k++) {
                items[k].addEventListener('click', function () {
                    var next = this.nextElementSibling,
                        previous = this.previousElementSibling;
                    while (next) {
                        next.classList.remove('active');
                        next = next.nextElementSibling;
                    }
                    while (previous) {
                        previous.classList.remove('active');
                        previous = previous.previousElementSibling;
                    }
                    this.classList.add('active');
                });
            }

        }
    });
})(document);

