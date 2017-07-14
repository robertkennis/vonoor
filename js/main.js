function ajaxRequest(t, e, n, o) {
    var i = new XMLHttpRequest;
    i.open(n ? "POST" : "GET", t, !0), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), i.onreadystatechange = function() {
        if (4 == i.readyState)
            if (200 == i.status) {
                var t = JSON.parse(i.responseText);
                e && e(t)
            } else o ? o(i) : console.error(i)
    };
    var a = [];
    if (n)
        for (var r in n) a.push(r + "=" + encodeURIComponent(n[r]));
    i.send(n ? a.join("&") : "")
}

function getOffset(t) {
    var e = {
        top: 0,
        left: 0
    };
    return t.getBoundingClientRect && (e = t.getBoundingClientRect()), {
        top: e.top + window.pageYOffset,
        left: e.left + window.pageXOffset
    }
}

function isInViewport(t, e) {
    e = e || !1;
    var n = t.getBoundingClientRect(),
        o = document.documentElement;
    return e !== !1 ? n.top >= 0 && n.left >= 0 && n.bottom <= (window.innerHeight || o.clientHeight) && n.right <= (window.innerWidth || o.clientWidth) : n.bottom >= 0 && n.right >= 0 && n.top <= (window.innerHeight || o.clientHeight) && n.left <= (window.innerWidth || o.clientWidth)
}

function scrollToY(t, e, n) {
    return null !== t && void 0 !== t && (t ? "object" == typeof t && 1 === t.nodeType ? t = getOffset(t).top - (n ? window.innerHeight / 6 : 0) : n && (t -= window.innerHeight / 6) : t = 0, void TinyAnimate.animate(window.scrollY, t < 0 ? 0 : t, e ? e : 250, function(t) {
        window.scrollTo(0, t)
    }, "easeOutQuart"))
}

function eScrollToX(t, e, n, o) {
    return !(!t || "object" != typeof t || 1 !== t.nodeType) && void TinyAnimate.animate(t.scrollLeft, e, n ? n : 250, function(e) {
        t.scrollLeft = e
    }, "easeOutQuart", o ? o : function() {})
}

function submitContactForm() {
    var t = document.getElementById("inputFullname"),
        e = document.getElementById("inputEmail"),
        n = document.getElementById("inputPhone"),
        o = document.getElementById("inputMessage"),
        i = document.getElementById("formSuccessStatus");
    return window.contactFormInProgress !== !0 && (window.contactFormInProgress = !0, i.className = "contact__sent is-active is-in-progress", setTimeout(function() {
        window.contactFormInProgress === !0 && (i.className = "contact__sent is-active is-in-progress is-fadein")
    }, 25), void ajaxRequest(window.location.pathname + "?ajax=sendMail", function(t) {
        if (!t || !t.status) return !1;
        if ("success" == t.status) {
            i.className = "contact__sent is-active is-done is-fadein", setTimeout(function() {
                i.className = "contact__sent is-active is-done", setTimeout(function() {
                    i.className = "contact__sent"
                }, 210)
            }, 5e3), document.getElementById("contactForm").reset();
            for (var e = document.getElementsByClassName("contact__input"), n = 0; n < e.length; n++)
                if (document.createEvent && e[n].dispatchEvent) {
                    var o = document.createEvent("HTMLEvents");
                    o.initEvent("change", !0, !0), e[n].dispatchEvent(o)
                } else ctrl.fireEvent && e[n].fireEvent("onchange")
        } else alert(t.message), i.className = "contact__sent";
        window.contactFormInProgress = !1
    }, {
        fullname: t.value,
        email: e.value,
        phone: n.value,
        message: o.value
    }))
}
"undefined" == typeof XMLHttpRequest && (XMLHttpRequest = function() {
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    } catch (t) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    } catch (t) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP")
    } catch (t) {}
    throw new Error("This browser does not support XMLHttpRequest.")
});
var animationHandler = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
        setTimeout(t, 1e3 / 60)
    },
    BackToTop = {
        init: function() {
            for (var t = document.getElementsByClassName("back-to-top"), e = 0; e < t.length; e++) t[e].addEventListener("click", this.callback)
        },
        callback: function() {
            window.scrollY > 0 && scrollToY(0, Math.round(window.scrollY / window.innerHeight * 250))
        }
    };
document.addEventListener("DOMContentLoaded", function() {
    BackToTop.init()
}, !1), HomePageClass = function() {
    this.headerElement = document.getElementById("header1"), this.homepageContainerElement = document.getElementById("homepage_container"), this.mottoElement = document.getElementById("motto"), this.mottoWordElement = document.getElementById("motto_word"), this.screenWidth = window.innerWidth, this.mottoSpacing = 100, this.mottoWords = ["DESIGN", "APPS", "PRODUCTS "], this.mottoCurrentWord = -1, this.mottoRemovingSpeed = 1.9, this.mottoChangeSpeed = 120, this.mottoChangeSleep = 2e3, this.setHeight = function() {
        var t = window.innerHeight - this.headerElement.offsetHeight;
        t < this.mottoElement.offsetHeight + 2 * this.mottoSpacing && (t = this.mottoElement.offsetHeight + 2 * this.mottoSpacing), this.homepageContainerElement.style.height = t + "px"
    }, this.mottoChangeWord = function() {
        var t, e = 0,
            n = this,
            o = 0,
            i = function() {
                n.mottoRemoveLetter()
            },
            a = function() {
                n.mottoAddLetter()
            };
        if (this.mottoCurrentWord++, this.mottoCurrentWord == this.mottoWords.length && (this.mottoCurrentWord = 0), this.mottoWordElement.className = this.mottoWordElement.className.replace(/is\-animating/, "is-writing"), "" !== this.mottoWordElement.innerText)
            for (e = 0; e < this.mottoWordElement.innerText.length; e++) o += this.mottoChangeSpeed / this.mottoRemovingSpeed, setTimeout(i, o);
        for (t = 0; t < this.mottoWords[this.mottoCurrentWord].length; t++) o += this.mottoChangeSpeed + (Math.floor(Math.random() * this.mottoChangeSleep / 30) + this.mottoChangeSleep / 70), setTimeout(a, o);
        var r = function() {
            n.mottoWordElement.className = n.mottoWordElement.className.replace(/is\-writing/, "is-animating")
        };
        setTimeout(r, o);
        var s = function() {
            n.mottoChangeWord()
        };
        setTimeout(s, o + this.mottoChangeSleep)
    }, this.mottoRemoveLetter = function() {
        return this.mottoWordElement.innerText = this.mottoWordElement.innerText.slice(0, -1), !0
    }, this.mottoAddLetter = function() {
        var t = this.mottoWords[this.mottoCurrentWord],
            e = this.mottoWordElement.innerText;
        return this.mottoWordElement.innerText += t.substr(e.length, 1), !0
    }, this.setHeight(), this.mottoChangeWord();
    var t = this;
    window.addEventListener("resize", function() {
        return window.innerWidth != t.screenWidth && (t.screenWidth = window.innerWidth, t.setHeight()), !0
    })
}, document.addEventListener("DOMContentLoaded", function() {
    new HomePageClass
}, !1);
var placeHolders = {
    labels: null,
    init: function() {
        this.labels = document.getElementsByClassName("placeholder__label");
        for (var t = this, e = function() {
                t.blur(this)
            }, n = function() {
                t.focus(this)
            }, o = null, i = 0; i < this.labels.length; i++) this.labels[i].tagName && "label" === this.labels[i].tagName.toLowerCase() && (o = this.labels[i].getElementsByClassName("placeholder__input")[0], o && ("" !== o.value && this.setActive(this.labels[i]), o.addEventListener("focus", n), o.addEventListener("blur", e), o.addEventListener("change", e)))
    },
    focus: function(t) {
        this.setActive(t.parentElement)
    },
    blur: function(t) {
        t.parentElement;
        "" !== t.value ? this.setActive(t.parentElement) : "" === t.value && this.setInactive(t.parentElement)
    },
    setActive: function(t) {
        var e = 0,
            n = t.getElementsByClassName("placeholder__text");
        for (e = 0; e < n.length; e++) /(^|\s)is\-active(\s|$)/.test(n[e].className) || (n[e].className = n[e].className + " is-active", t.className = t.className + " is-active");
        return !0
    },
    setInactive: function(t) {
        var e = 0,
            n = t.getElementsByClassName("placeholder__text");
        for (e = 0; e < n.length; e++) /(^|\s)is\-active(\s|$)/.test(n[e].className) && (n[e].className = n[e].className.replace(/\s*is\-active/, ""), t.className = t.className.replace(/\s*is\-active/, ""));
        return !0
    }
};
document.addEventListener("DOMContentLoaded", function() {
        placeHolders.init()
    }, !1), document.addEventListener("DOMContentLoaded", function() {
        document.getElementsByClassName("homepage__swipe")[0].addEventListener("click", function() {
            scrollToY(document.getElementsByClassName("about")[0], 350)
        })
    }), document.addEventListener("DOMContentLoaded", function() {
        var t = document.getElementById("contact_button"),
            e = document.getElementById("close_popup"),
            n = document.getElementById("popup");
        return !(!t || !e) && ("undefined" != typeof n.style.opacity && (n.className += " is-opacity"), t.addEventListener("click", function() {
            n && (n.className += " is-active")
        }), void e.addEventListener("click", function() {
            n && (n.className = n.className.replace(/\s?is\-active/, ""))
        }))
    }, !1),
    function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Rellax = e()
    }(this, function() {
        var t = function(e, n) {
            "use strict";
            var o = Object.create(t.prototype),
                i = 0,
                a = 0,
                r = [],
                s = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
                    setTimeout(t, 1e3 / 60)
                };
            if (o.options = {
                    speed: -2
                }, n && Object.keys(n).forEach(function(t) {
                    o.options[t] = n[t]
                }), o.options.speed < -10 ? o.options.speed = -10 : o.options.speed > 10 && (o.options.speed = 10), e || (e = ".rellax"), document.getElementsByClassName(e.replace(".", ""))) o.elems = document.getElementsByClassName(e.replace(".", ""));
            else {
                if (document.querySelector(e) === !1) throw new Error("The elements you're trying to select don't exist.");
                o.elems = querySelector(e)
            }
            var u = function() {
                    a = window.innerHeight, l();
                    for (var t = 0; t < o.elems.length; t++) {
                        var e = c(o.elems[t]);
                        r.push(e)
                    }
                    window.addEventListener("resize", function() {
                        f()
                    }), m(), f()
                },
                c = function(t) {
                    var e = 0,
                        n = t.getAttribute("data-rellax-start") ? parseInt(t.getAttribute("data-rellax-start")) : e + t.getBoundingClientRect().top,
                        i = t.clientHeight || t.offsetHeight || t.scrollHeight,
                        r = (e - n + a) / (i + a),
                        s = t.getAttribute("data-rellax-speed") ? t.getAttribute("data-rellax-speed") : o.options.speed,
                        u = d(r, s),
                        c = t.style.cssText.slice(11),
                        l = null;
                    return "function" == typeof document.querySelectorAll && t.getAttribute("data-rellax-id") && (l = document.querySelectorAll("[data-rellax-related='" + t.getAttribute("data-rellax-id") + "']")), {
                        base: u,
                        top: n,
                        height: i,
                        speed: s,
                        style: c,
                        related: l
                    }
                },
                l = function() {
                    var t = i;
                    return i = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, t != i
                },
                d = function(t, e) {
                    var n = e * (100 * (1 - t));
                    return Math.round(n)
                },
                m = function() {
                    l() && f(), s(m)
                },
                f = function() {
                    for (var t = 0; t < o.elems.length; t++) {
                        var e = (i - r[t].top) / a,
                            n = d(e, r[t].speed) - r[t].base,
                            s = "translate3d(0," + n + "px,0)";
                        o.elems[t].style.cssText = "-webkit-transform:" + s + ";-moz-transform:" + s + ";transform:" + s + ";";
                        var u = 0;
                        if (r[t].related && r[t].related.length)
                            for (u; u < r[t].related.length; u++) r[t].related[u].style.cssText = "-webkit-transform:" + s + ";-moz-transform:" + s + ";transform:" + s + ";"
                    }
                };
            return u(), Object.freeze(), o
        };
        return t
    }), document.addEventListener("DOMContentLoaded", function() {
        new Rellax(".parallax__item")
    }, !1), document.addEventListener("DOMContentLoaded", function() {
        for (var t = document.querySelectorAll("[data-email][data-domain][data-tld]"), e = 0; e < t.length; e++) t[e].innerHTML = "<a href='mailto:" + t[e].getAttribute("data-email") + "@" + t[e].getAttribute("data-domain") + "." + t[e].getAttribute("data-tld") + "'>" + (t[e].getAttribute("data-text") ? t[e].getAttribute("data-text") : t[e].getAttribute("data-email") + "@" + t[e].getAttribute("data-domain") + "." + t[e].getAttribute("data-tld")) + "</a>"
    }, !1), window.contactFormInProgress = !1, document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("contactForm").addEventListener("submit", submitContactForm)
    }, !1),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["exports"], function(n) {
            e(t.TinyAnimate = n)
        }) : e("object" == typeof exports ? exports : t.TinyAnimate = {})
    }(this, function(t) {
        t.animate = function(t, n, o, i, a, r) {
            function s(e) {
                var d = (e || +new Date) - l;
                i(a(d, t, c, o)), d >= o ? (i(n), r()) : u(s)
            }
            if ("number" == typeof t && "number" == typeof n && "number" == typeof o && "function" == typeof i) {
                "string" == typeof a && e[a] && (a = e[a]), "function" != typeof a && (a = e.linear), "function" != typeof r && (r = function() {});
                var u = window.requestAnimationFrame || function(t) {
                        window.setTimeout(t, 1e3 / 60)
                    },
                    c = n - t;
                i(t);
                var l = window.performance && window.performance.now ? window.performance.now() : +new Date;
                u(s)
            }
        }, t.animateCSS = function(e, n, o, i, a, r, s, u) {
            var c = function(t) {
                e.style[n] = t + o
            };
            t.animate(i, a, r, c, s, u)
        };
        var e = t.easings = {};
        e.linear = function(t, e, n, o) {
            return n * t / o + e
        }, e.easeInQuad = function(t, e, n, o) {
            return n * (t /= o) * t + e
        }, e.easeOutQuad = function(t, e, n, o) {
            return -n * (t /= o) * (t - 2) + e
        }, e.easeInOutQuad = function(t, e, n, o) {
            return (t /= o / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e
        }, e.easeInCubic = function(t, e, n, o) {
            return n * (t /= o) * t * t + e
        }, e.easeOutCubic = function(t, e, n, o) {
            return n * ((t = t / o - 1) * t * t + 1) + e
        }, e.easeInOutCubic = function(t, e, n, o) {
            return (t /= o / 2) < 1 ? n / 2 * t * t * t + e : n / 2 * ((t -= 2) * t * t + 2) + e
        }, e.easeInQuart = function(t, e, n, o) {
            return n * (t /= o) * t * t * t + e
        }, e.easeOutQuart = function(t, e, n, o) {
            return -n * ((t = t / o - 1) * t * t * t - 1) + e
        }, e.easeInOutQuart = function(t, e, n, o) {
            return (t /= o / 2) < 1 ? n / 2 * t * t * t * t + e : -n / 2 * ((t -= 2) * t * t * t - 2) + e
        }, e.easeInQuint = function(t, e, n, o) {
            return n * (t /= o) * t * t * t * t + e
        }, e.easeOutQuint = function(t, e, n, o) {
            return n * ((t = t / o - 1) * t * t * t * t + 1) + e
        }, e.easeInOutQuint = function(t, e, n, o) {
            return (t /= o / 2) < 1 ? n / 2 * t * t * t * t * t + e : n / 2 * ((t -= 2) * t * t * t * t + 2) + e
        }, e.easeInSine = function(t, e, n, o) {
            return -n * Math.cos(t / o * (Math.PI / 2)) + n + e
        }, e.easeOutSine = function(t, e, n, o) {
            return n * Math.sin(t / o * (Math.PI / 2)) + e
        }, e.easeInOutSine = function(t, e, n, o) {
            return -n / 2 * (Math.cos(Math.PI * t / o) - 1) + e
        }, e.easeInExpo = function(t, e, n, o) {
            return 0 === t ? e : n * Math.pow(2, 10 * (t / o - 1)) + e
        }, e.easeOutExpo = function(t, e, n, o) {
            return t == o ? e + n : n * (-Math.pow(2, -10 * t / o) + 1) + e
        }, e.easeInOutExpo = function(t, e, n, o) {
            return 0 === t ? e : t == o ? e + n : (t /= o / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + e : n / 2 * (-Math.pow(2, -10 * --t) + 2) + e
        }, e.easeInCirc = function(t, e, n, o) {
            return -n * (Math.sqrt(1 - (t /= o) * t) - 1) + e
        }, e.easeOutCirc = function(t, e, n, o) {
            return n * Math.sqrt(1 - (t = t / o - 1) * t) + e
        }, e.easeInOutCirc = function(t, e, n, o) {
            return (t /= o / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + e : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
        }, e.easeInElastic = function(t, e, n, o) {
            var i = 0,
                a = n;
            if (0 === t) return e;
            if (1 == (t /= o)) return e + n;
            i || (i = .3 * o);
            var r = null;
            return a < Math.abs(n) ? (a = n, r = i / 4) : r = i / (2 * Math.PI) * Math.asin(n / a), -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * o - r) * (2 * Math.PI) / i)) + e
        }, e.easeOutElastic = function(t, e, n, o) {
            var i = 0,
                a = n;
            if (0 === t) return e;
            if (1 == (t /= o)) return e + n;
            i || (i = .3 * o);
            var r = null;
            return a < Math.abs(n) ? (a = n, r = i / 4) : r = i / (2 * Math.PI) * Math.asin(n / a), a * Math.pow(2, -10 * t) * Math.sin((t * o - r) * (2 * Math.PI) / i) + n + e
        }, e.easeInOutElastic = function(t, e, n, o) {
            var i = 0,
                a = n;
            if (0 === t) return e;
            if (2 == (t /= o / 2)) return e + n;
            i || (i = o * (.3 * 1.5));
            var r = null;
            return a < Math.abs(n) ? (a = n, r = i / 4) : r = i / (2 * Math.PI) * Math.asin(n / a), t < 1 ? -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * o - r) * (2 * Math.PI) / i)) + e : a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * o - r) * (2 * Math.PI) / i) * .5 + n + e
        }, e.easeInBack = function(t, e, n, o, i) {
            return void 0 === i && (i = 1.70158), n * (t /= o) * t * ((i + 1) * t - i) + e
        }, e.easeOutBack = function(t, e, n, o, i) {
            return void 0 === i && (i = 1.70158), n * ((t = t / o - 1) * t * ((i + 1) * t + i) + 1) + e
        }, e.easeInOutBack = function(t, e, n, o, i) {
            return void 0 === i && (i = 1.70158), (t /= o / 2) < 1 ? n / 2 * (t * t * (((i *= 1.525) + 1) * t - i)) + e : n / 2 * ((t -= 2) * t * (((i *= 1.525) + 1) * t + i) + 2) + e
        }, e.easeInBounce = function(t, n, o, i) {
            return o - e.easeOutBounce(i - t, 0, o, i) + n
        }, e.easeOutBounce = function(t, e, n, o) {
            return (t /= o) < 1 / 2.75 ? n * (7.5625 * t * t) + e : t < 2 / 2.75 ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
        }, e.easeInOutBounce = function(t, n, o, i) {
            return t < i / 2 ? .5 * e.easeInBounce(2 * t, 0, o, i) + n : .5 * e.easeOutBounce(2 * t - i, 0, o, i) + .5 * o + n
        }
    });
    
//# sourceMappingURL=main.js.map

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginRight = "250px";
    document.getElementById("main").style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.getElementById("main").style.backgroundColor = "white";
}