(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    !function n(s, r, o) {
        function a(i, t) {
            if (!r[i]) {
                if (!s[i]) {
                    var e = "function" == typeof require && require;
                    if (!t && e) return e(i, !0);
                    if (h) return h(i, !0);
                    throw (e = new Error("Cannot find module '" + i + "'")).code = "MODULE_NOT_FOUND", 
                    e;
                }
                e = r[i] = {
                    exports: {}
                }, s[i][0].call(e.exports, (function(t) {
                    return a(s[i][1][t] || t);
                }), e, e.exports, n, s, r, o);
            }
            return r[i].exports;
        }
        for (var h = "function" == typeof require && require, t = 0; t < o.length; t++) a(o[t]);
        return a;
    }({
        1: [ function(t, i, e) {
            "use strict";
            window.SlotMachine = t("./slot-machine");
        }, {
            "./slot-machine": 3
        } ],
        2: [ function(t, i, e) {
            "use strict";
            var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            i.exports = function(t) {
                setTimeout((function() {
                    return n(t);
                }), 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            };
        }, {} ],
        3: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            var r = t("./timer"), o = t("./raf"), a = {
                active: 0,
                delay: 200,
                auto: !1,
                spins: 5,
                randomize: null,
                onComplete: null,
                inViewport: !0,
                direction: "up",
                transition: "ease-in-out"
            }, h = "slotMachineNoTransition", u = "slotMachineBlurFast", c = "slotMachineBlurMedium", l = "slotMachineBlurSlow", f = "slotMachineBlurTurtle", d = "slotMachineGradient", v = d;
            n = (n(g, [ {
                key: "changeSettings",
                value: function(i) {
                    var e = this;
                    Object.keys(i).forEach((function(t) {
                        e[t] = i[t];
                    }));
                }
            }, {
                key: "_wrapTiles",
                value: function() {
                    var i = this;
                    this.container = document.createElement("div"), this.container.classList.add("slotMachineContainer"), 
                    this.container.style.transition = "1s ease-in-out", this.element.appendChild(this.container), 
                    this._fakeFirstTile = this.tiles[this.tiles.length - 1].cloneNode(!0), this.container.appendChild(this._fakeFirstTile), 
                    this.tiles.forEach((function(t) {
                        i.container.appendChild(t);
                    })), this._fakeLastTile = this.tiles[0].cloneNode(!0), this.container.appendChild(this._fakeLastTile);
                }
            }, {
                key: "_setBounds",
                value: function() {
                    var t = this.getTileOffset(this.active), i = this.getTileOffset(this.tiles.length), e = this.getTileOffset(this.tiles.length);
                    this._bounds = {
                        up: {
                            key: "up",
                            initial: t,
                            first: 0,
                            last: e,
                            to: this._maxTop,
                            firstToLast: e,
                            lastToFirst: 0
                        },
                        down: {
                            key: "down",
                            initial: t,
                            first: i,
                            last: 0,
                            to: this._minTop,
                            firstToLast: e,
                            lastToFirst: 0
                        }
                    };
                }
            }, {
                key: "_changeTransition",
                value: function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.delay, i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.transition;
                    this.container.style.transition = t / 1e3 + "s " + i;
                }
            }, {
                key: "_changeTransform",
                value: function(t) {
                    this.container.style.transform = "matrix(1, 0, 0, 1, 0, " + t + ")";
                }
            }, {
                key: "_isGoingBackward",
                value: function() {
                    return this.nextActive > this.active && 0 === this.active && this.nextActive === this.tiles.length - 1;
                }
            }, {
                key: "_isGoingForward",
                value: function() {
                    return this.nextActive <= this.active && this.active === this.tiles.length - 1 && 0 === this.nextActive;
                }
            }, {
                key: "getTileOffset",
                value: function(t) {
                    for (var i = 0, e = 0; e < t; e++) i += this.tiles[e].offsetHeight;
                    return this._minTop - i;
                }
            }, {
                key: "_resetPosition",
                value: function(t) {
                    this.container.classList.toggle(h), this._changeTransform(isNaN(t) ? this.bounds.initial : t), 
                    this.container.offsetHeight, this.container.classList.toggle(h);
                }
            }, {
                key: "prev",
                value: function() {
                    return this.nextActive = this.prevIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "next",
                value: function() {
                    return this.nextActive = this.nextIndex, this.running = !0, this.stop(), this.nextActive;
                }
            }, {
                key: "_getDelayFromSpins",
                value: function(t) {
                    var i = this.delay;
                    switch (this.transition = "linear", t) {
                      case 1:
                        i /= .5, this.transition = "ease-out", this._animationFX = f;
                        break;

                      case 2:
                        i /= .75, this._animationFX = l;
                        break;

                      case 3:
                        i /= 1, this._animationFX = c;
                        break;

                      case 4:
                        i /= 1.25, this._animationFX = c;
                        break;

                      default:
                        i /= 1.5, this._animationFX = u;
                    }
                    return i;
                }
            }, {
                key: "shuffle",
                value: function(i, e) {
                    var t, n = this;
                    return "function" == typeof i && (e = i), this.running = !0, this.visible || !0 !== this.inViewport ? (t = this._getDelayFromSpins(i), 
                    this._changeTransition(t), this._changeTransform(this.bounds.to), o((function() {
                        var t;
                        !n.stopping && n.running && (t = i - 1, n._resetPosition(n.bounds.first), 1 < t ? n.shuffle(t, e) : n.stop(e));
                    }), t)) : this.stop(e), this.nextActive;
                }
            }, {
                key: "stop",
                value: function(t) {
                    var i = this;
                    if (!this.running || this.stopping) return this.nextActive;
                    this.running = !0, this.stopping = !0, Number.isInteger(this.nextActive) || (this.nextActive = this.custom), 
                    this._isGoingBackward() ? this._resetPosition(this.bounds.firstToLast) : this._isGoingForward() && this._resetPosition(this.bounds.lastToFirst), 
                    this.active = this.nextActive;
                    var e = this._getDelayFromSpins(1);
                    return this._changeTransition(e), this._animationFX = v, this._changeTransform(this.getTileOffset(this.active)), 
                    o((function() {
                        i.stopping = !1, i.running = !1, i.nextActive = null, "function" == typeof i.onComplete && i.onComplete(i.active), 
                        "function" == typeof t && t.apply(i, [ i.active ]);
                    }), e), this.active;
                }
            }, {
                key: "run",
                value: function() {
                    var t = this;
                    this.running || (this._timer = new r((function() {
                        t.visible || !0 !== t.inViewport ? t.shuffle(t.spins, (function() {
                            t._timer.reset();
                        })) : o((function() {
                            t._timer.reset();
                        }), 500);
                    }), this.auto));
                }
            }, {
                key: "destroy",
                value: function() {
                    var i = this;
                    this._fakeFirstTile.remove(), this._fakeLastTile.remove(), this.tiles.forEach((function(t) {
                        i.element.appendChild(t);
                    })), this.container.remove();
                }
            }, {
                key: "active",
                get: function() {
                    return this._active;
                },
                set: function(t) {
                    ((t = Number(t)) < 0 || t >= this.tiles.length || isNaN(t)) && (t = 0), this._active = t;
                }
            }, {
                key: "direction",
                get: function() {
                    return this._direction;
                },
                set: function(t) {
                    this.running || (this._direction = "down" === t ? "down" : "up");
                }
            }, {
                key: "bounds",
                get: function() {
                    return this._bounds[this._direction];
                }
            }, {
                key: "transition",
                get: function() {
                    return this._transition;
                },
                set: function(t) {
                    this._transition = t || "ease-in-out";
                }
            }, {
                key: "visibleTile",
                get: function() {
                    var t = this.tiles[0].offsetHeight, i = this.container.style.transform || "";
                    i = parseInt(i.replace(/^matrix\(-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?-?\d+,\s?(-?\d+)\)$/, "$1"), 10);
                    return Math.abs(Math.round(i / t)) - 1;
                }
            }, {
                key: "random",
                get: function() {
                    return Math.floor(Math.random() * this.tiles.length);
                }
            }, {
                key: "custom",
                get: function() {
                    var t;
                    return this.randomize ? (((t = this.randomize(this.active)) < 0 || t >= this.tiles.length) && (t = 0), 
                    t) : this.random;
                }
            }, {
                key: "_prevIndex",
                get: function() {
                    var t = this.active - 1;
                    return t < 0 ? this.tiles.length - 1 : t;
                }
            }, {
                key: "_nextIndex",
                get: function() {
                    var t = this.active + 1;
                    return t < this.tiles.length ? t : 0;
                }
            }, {
                key: "prevIndex",
                get: function() {
                    return "up" === this.direction ? this._nextIndex : this._prevIndex;
                }
            }, {
                key: "nextIndex",
                get: function() {
                    return "up" === this.direction ? this._prevIndex : this._nextIndex;
                }
            }, {
                key: "visible",
                get: function() {
                    var t = this.element.getBoundingClientRect(), i = window.innerHeight || document.documentElement.clientHeight, e = window.innerWidth || document.documentElement.clientWidth;
                    i = t.top <= i && 0 <= t.top + t.height, t = t.left <= e && 0 <= t.left + t.width;
                    return i && t;
                }
            }, {
                key: "_animationFX",
                set: function(i) {
                    var t = this, e = this.delay / 4;
                    o((function() {
                        [].concat(function(t) {
                            if (Array.isArray(t)) {
                                for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
                                return e;
                            }
                            return Array.from(t);
                        }(t.tiles), [ t._fakeLastTile, t._fakeFirstTile ]).forEach((function(t) {
                            t.classList.remove(u, c, l, f), i !== v && t.classList.add(i);
                        })), i === v ? t.container.classList.remove(d) : t.container.classList.add(d);
                    }), e);
                }
            } ]), g);
            function g(t, i) {
                !function(t) {
                    if (!(t instanceof g)) throw new TypeError("Cannot call a class as a function");
                }(this), this.element = t, this.tiles = [].slice.call(this.element.children), this.running = !1, 
                this.stopping = !1, this.element.style.overflow = "hidden", this._wrapTiles(), this._minTop = -this._fakeFirstTile.offsetHeight, 
                this._maxTop = -this.tiles.reduce((function(t, i) {
                    return t + i.offsetHeight;
                }), 0), this.changeSettings(Object.assign({}, a, i)), this._setBounds(), this._resetPosition(), 
                !1 !== this.auto && this.run();
            }
            i.exports = n;
        }, {
            "./raf": 2,
            "./timer": 4
        } ],
        4: [ function(t, i, e) {
            "use strict";
            var n = function(t, i, e) {
                return i && s(t.prototype, i), e && s(t, e), t;
            };
            function s(t, i) {
                for (var e = 0; e < i.length; e++) {
                    var n = i[e];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                    Object.defineProperty(t, n.key, n);
                }
            }
            function r(t, i) {
                return function(t) {
                    if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
                }(this), this.cb = t, this.initialDelay = i, this.delay = i, this.startTime = null, 
                this.timer = null, this.running = !1, this.resume(), this;
            }
            i.exports = (n(r, [ {
                key: "_start",
                value: function() {
                    var t = this;
                    this.timer = setTimeout((function() {
                        t.running = !1, t.cb(t);
                    }), this.delay);
                }
            }, {
                key: "cancel",
                value: function() {
                    this.running = !1, clearTimeout(this.timer);
                }
            }, {
                key: "pause",
                value: function() {
                    this.running && (this.delay -= (new Date).getTime() - this.startTime, this.cancel());
                }
            }, {
                key: "resume",
                value: function() {
                    this.running || (this.running = !0, this.startTime = (new Date).getTime(), this._start());
                }
            }, {
                key: "reset",
                value: function() {
                    this.cancel(), this.delay = this.initialDelay, this._start();
                }
            }, {
                key: "add",
                value: function(t) {
                    this.pause(), this.delay += t, this.resume();
                }
            } ]), r);
        }, {} ]
    }, {}, [ 1 ]);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const hammer = document.querySelector(".bonus-main__hammer");
    let money = document.querySelector(".money");
    let timerId;
    let move_right;
    if (document.querySelector(".bonus")) timerId = setInterval((() => {
        create_ice_cub();
    }), 3e3);
    if (sessionStorage.getItem("money")) {
        if (money) money.textContent = sessionStorage.getItem("money");
    } else sessionStorage.setItem("money", 1e4);
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".bottom-bonus__button")) {
            minus_money(10);
            move_hammer();
            hold_button(".bottom-bonus__button", 1200);
            setTimeout((() => {
                let block = get_elem_for_coord(150);
                if (block.closest(".bonus-main__cub")) {
                    block.closest(".bonus-main__cub").classList.add("_anim");
                    let bonus_rand = get_random_bonus();
                    if (73 == bonus_rand) {
                        get_bonus_cherry();
                        get_bonus_text(1e3);
                        add_money(1e3);
                    } else if (0 == bonus_rand) get_bonus_text(0); else {
                        get_bonus_text(bonus_rand);
                        get_bonus_money();
                        add_money(bonus_rand);
                    }
                }
                get_ways_mini_game();
                let cub_box = document.querySelectorAll(".bonus-main__cub");
                console.log(cub_box);
                cub_box.forEach((el => {}));
            }), 1e3);
        }
    }));
    function minus_money(count) {
        money.textContent = +sessionStorage.getItem("money") - count;
        sessionStorage.setItem("money", money.innerHTML);
        money.classList.add("_minus-money");
        setTimeout((() => {
            money.classList.remove("_minus-money");
        }), 1e3);
    }
    function add_money(count) {
        money.textContent = +sessionStorage.getItem("money") + count;
        sessionStorage.setItem("money", money.innerHTML);
        money.classList.add("_add-money");
        setTimeout((() => {
            money.classList.remove("_add-money");
        }), 1e3);
    }
    function move_hammer() {
        hammer.classList.add("_anim");
        setTimeout((() => {
            hammer.classList.remove("_anim");
        }), 1500);
    }
    function hold_button(block, time) {
        document.querySelector(block).classList.add("_hold");
        setTimeout((() => {
            document.querySelector(block).classList.remove("_hold");
        }), time);
    }
    function create_ice_cub() {
        let ice_cub = document.createElement("div");
        ice_cub.classList.add("bonus-main__ice-box");
        let cub = document.createElement("div");
        cub.classList.add("bonus-main__cub");
        cub.innerHTML = '<svg width="64" height="54" viewBox="0 0 64 54" fill="none" xmlns="http://www.w3.org/2000/svg">\t<path class="piece piece_1"\td="M0.937044 8.95088L30.0845 19.7513L32.6928 53.1203L10.6857 49.1613C10.6753 49.1613 0.574062 25.0351 0.937044 8.95088Z"\tfill="#2FD3CF" />\t<path class="piece piece_2"\td="M30.0793 19.7567L63.3544 7.87471C63.3544 7.87471 54.4648 45.4434 54.4648 51.2085L32.6876 53.1257L30.0793 19.7567Z"\tfill="#52EFEA" />\t\t<path class="piece piece_3"\td="M34.8707 23.2861C34.8707 23.2861 34.8914 23.3896 34.9225 23.581C34.9536 23.7725 35.0158 24.052 35.0625 24.4142C35.1559 25.1284 35.3322 26.1531 35.4618 27.3847C35.5344 28.0006 35.607 28.663 35.664 29.372C35.7263 30.0758 35.7989 30.821 35.8455 31.5869C35.8922 32.358 35.9648 33.1498 35.9959 33.9623C36.0322 34.7696 36.0737 35.5924 36.11 36.4153C36.1307 37.2381 36.1515 38.0609 36.1722 38.8683C36.1981 39.6756 36.1826 40.4725 36.1878 41.2436C36.1981 42.0147 36.1774 42.7599 36.1618 43.4689C36.1566 44.1779 36.1255 44.8455 36.0996 45.4613C36.0581 46.6982 35.9544 47.728 35.9129 48.4525C35.8922 48.8148 35.8507 49.0994 35.8351 49.2909C35.8144 49.4824 35.804 49.5859 35.804 49.5859L35.7159 49.591C35.7159 49.591 35.4618 43.0187 35.2025 36.4463C34.9899 29.874 34.7773 23.2964 34.7773 23.2964L34.8707 23.2861Z"\tfill="#D7F9F8" />\t\t<path class="piece piece_4"\td="M0.937744 8.95099C0.937744 8.95099 15.2963 1.36949 35.504 0.412099L63.3603 7.87458L30.08 19.7566L0.937744 8.95099Z" fill="#87F9F0" /><path class="piece piece_5" opacity="0.4"\td="M10.6755 49.1615L32.6878 53.1204L30.3854 23.6172L8.30057 42.9514C9.66953 46.755 10.6755 49.1615 10.6755 49.1615Z"\tfill="#37E2E2" />\t<path class="piece piece_6" opacity="0.4"\td="M32.6873 53.1254L54.104 50.4886C54.104 47.306 57.256 31.1209 59.6568 21.7954C52.4957 27.224 39.2158 37.2948 31.8887 42.889L32.6873 53.1254Z"\tfill="#52EFEA" />\t<path class="piece piece_7" opacity="0.4"\td="M35.1097 0.432705C15.1146 1.4729 0.937561 8.9509 0.937561 8.9509C0.854594 12.708 1.34203 16.8998 2.1354 21.1227C14.3938 17.8417 31.5784 11.3884 35.1097 0.432705Z"\tfill="#C1F7F3" />\t<path class="piece piece_8" opacity="0.4"\td="M13.0504 23.5964C14.1445 22.7891 15.3735 22.344 16.6854 22.8305C17.9143 23.2911 18.8114 24.3727 20.0352 24.7763C20.8286 25.0402 22.4361 25.2783 23.1931 24.7556C24.1058 24.1294 23.8102 23.1669 23.9813 22.2871C24.2873 20.6932 26.1229 21.1382 27.3104 21.5367C28.3423 21.8834 29.3638 21.899 30.2246 21.5678L30.0846 19.7513L0.937153 8.95088C0.771218 16.2529 2.76762 25.2162 4.99218 32.8287C5.95668 32.8908 6.89006 32.8443 7.65232 32.6735C12.3555 31.5971 9.70576 26.0494 13.0504 23.5964Z"\tfill="#D7F9F8" />\t<path class="piece piece_9" opacity="0.6"\td="M30.0793 19.7565L30.2401 21.8162C30.6808 23.0996 31.4742 24.0674 32.4231 25.2576C34.6633 28.0677 39.7657 30.1015 43.3022 28.7664C46.7609 27.4622 44.5104 21.604 48.5032 20.8381C50.2456 20.5017 50.9456 21.5678 52.2679 22.3544C53.2376 22.934 54.7776 23.2135 55.571 22.1785C56.5822 20.8588 56.3385 18.7733 57.0229 17.3087C58.0186 15.1869 59.4342 15.72 61.1506 16.0408C62.4158 11.2642 63.3544 7.86417 63.3544 7.86417L30.0793 19.7565Z"\tfill="#D7F9F8" />\t</svg>';
        ice_cub.append(cub);
        move_cub(cub);
        document.querySelector(".bonus-main__body").append(ice_cub);
        setTimeout((() => {
            ice_cub.remove();
        }), 6e3);
    }
    function move_cub(elem) {
        let start_position = -60;
        elem.style.right = `${start_position}px`;
        move_right = setInterval((() => {
            start_position += 5;
            elem.style.right = `${start_position}px`;
        }), getRandomArbitrary(25, 70));
    }
    function get_elem_for_coord(x, y = 450) {
        let block = document.elementFromPoint(x, y);
        console.log(block);
        return block;
    }
    function get_random_bonus() {
        let rand_arr = [ 0, 100, 10, 0, 50, 150, 10, 10, 250, 500, 73, 15 ];
        return rand_arr[Math.floor(Math.random() * (12 - 0) + 0)];
    }
    function get_ways_mini_game() {
        document.querySelector(".bottom-bonus__count-ways").textContent = Math.floor(+money.innerHTML / 10);
    }
    function get_bonus_money() {
        let block = document.createElement("div");
        block.classList.add("bonus-main__monets");
        let monet_1 = document.createElement("img");
        let monet_2 = document.createElement("img");
        let monet_3 = document.createElement("img");
        let monet_4 = document.createElement("img");
        monet_1.setAttribute("src", "img/mini-game/cent-1.svg");
        monet_2.setAttribute("src", "img/mini-game/cent-2.svg");
        monet_3.setAttribute("src", "img/mini-game/cent-3.svg");
        monet_4.setAttribute("src", "img/mini-game/cent-4.svg");
        block.append(monet_1, monet_2, monet_3, monet_4);
        document.querySelector(".bonus-main").append(block);
        setTimeout((() => {
            block.remove();
        }), 1500);
    }
    function get_bonus_text(num) {
        let block = document.createElement("div");
        block.classList.add("bonus-main__text");
        if (0 != num) block.textContent = `+${num}`; else block.textContent = 0;
        document.querySelector(".bonus-main").append(block);
        setTimeout((() => {
            block.remove();
        }), 1500);
    }
    function get_bonus_cherry() {
        let block = document.createElement("div");
        block.classList.add("bonus-main__cherry");
        let cherry = document.createElement("img");
        cherry.setAttribute("src", "img/mini-game/cherry.svg");
        block.append(cherry);
        document.querySelector(".bonus-main").append(block);
        setTimeout((() => {
            block.remove();
        }), 1500);
    }
    var minTime = 500;
    var maxTime = 2e3;
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var casino1 = document.querySelector("#slot1");
    var casino2 = document.querySelector("#slot2");
    var casino3 = document.querySelector("#slot3");
    if (casino1 && casino2 && casino3) {
        let a, b, c;
        var mcasino1 = new SlotMachine(casino1, {
            active: 0,
            delay: 300,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) add_money(5e3);
            }
        });
        var mcasino2 = new SlotMachine(casino2, {
            active: 2,
            delay: 300,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) add_money(5e3);
            }
        });
        var mcasino3 = new SlotMachine(casino3, {
            active: 1,
            delay: 300,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c) if (a == b && b == c) add_money(5e3);
            }
        });
        function gameSlotOne() {
            if (+money.innerHTML >= 500) {
                mcasino1.shuffle(9999);
                mcasino2.shuffle(9999);
                mcasino3.shuffle(9999);
                setTimeout((() => mcasino1.stop()), getRandomArbitrary(minTime, maxTime));
                setTimeout((() => mcasino2.stop()), getRandomArbitrary(minTime, maxTime));
                setTimeout((() => mcasino3.stop()), getRandomArbitrary(minTime, maxTime));
                minus_money(500);
            } else {
                money.classList.add("_no-money");
                setTimeout((() => {
                    money.classList.remove("_no-money");
                }), 1e3);
            }
        }
        if (document.querySelector(".footer-game__button-play")) document.querySelector(".footer-game__button-play").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            if (casino1 && casino2 && casino3 && +money.innerHTML >= 500) {
                clearInterval(casinoAutoSpin);
                gameSlotOne();
                hold_button(".footer-game__button-play", 2e3);
            } else {
                money.classList.add("_no-money");
                setTimeout((() => {
                    money.classList.remove("_no-money");
                }), 1e3);
            }
        }));
    }
    var casino4 = document.querySelector("#slot4");
    var casino5 = document.querySelector("#slot5");
    var casino6 = document.querySelector("#slot6");
    var casino7 = document.querySelector("#slot7");
    if (casino4 && casino5 && casino6 && casino7) {
        let a, b, c, d;
        var mcasino4 = new SlotMachine(casino4, {
            active: 0,
            delay: 300,
            onComplete: function(active) {
                a = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d) if (a == b && b == c && c == d) add_money(7500);
            }
        });
        var mcasino5 = new SlotMachine(casino5, {
            active: 2,
            delay: 300,
            onComplete: function(active) {
                b = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d) if (a == b && b == c && c == d) add_money(7500);
            }
        });
        var mcasino6 = new SlotMachine(casino6, {
            active: 1,
            delay: 300,
            onComplete: function(active) {
                c = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d) if (a == b && b == c && c == d) add_money(7500);
            }
        });
        var mcasino7 = new SlotMachine(casino7, {
            active: 1,
            delay: 300,
            onComplete: function(active) {
                d = this.active;
                if (666 != a && 666 != b && 666 != c && 666 != d) if (a == b && b == c && c == d) add_money(7500);
            }
        });
        function gameSlotTwo() {
            mcasino4.shuffle(9999);
            mcasino5.shuffle(9999);
            mcasino6.shuffle(9999);
            mcasino7.shuffle(9999);
            setTimeout((() => mcasino4.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino5.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino6.stop()), getRandomArbitrary(minTime, maxTime));
            setTimeout((() => mcasino7.stop()), getRandomArbitrary(minTime, maxTime));
            minus_money(500);
        }
        var casinoAutoSpin;
        if (document.querySelector(".footer2-game__button-spin")) document.querySelector(".footer2-game__button-spin").addEventListener("click", (() => {
            a = 666;
            b = 666;
            c = 666;
            d = 666;
            if (casino4 && casino5 && casino6 && casino7 && +money.innerHTML >= 500) {
                clearInterval(casinoAutoSpin);
                gameSlotTwo();
                hold_button(".footer2-game__button-spin", 2e3);
            } else {
                money.classList.add("_no-money");
                setTimeout((() => {
                    money.classList.remove("_no-money");
                }), 1e3);
            }
        }));
        if (document.querySelector(".footer2-game__button-auto")) document.querySelector(".footer2-game__button-auto").addEventListener("click", (() => {
            if (casino4 && casino5 && casino6 && casino7 && +money.innerHTML >= 500) {
                document.querySelector(".footer2-game__button-auto").classList.add("_hold");
                document.querySelector(".footer2-game__button-spin").classList.add("_hold");
                gameSlotTwo();
                let casinoAutoSpinCount = 0;
                casinoAutoSpin = setInterval((function() {
                    casinoAutoSpinCount++;
                    if (casinoAutoSpinCount < 10 && +money.innerHTML >= 500) gameSlotTwo(); else if (casinoAutoSpinCount >= 10 && +money.innerHTML >= 500) {
                        clearInterval(casinoAutoSpin);
                        document.querySelector(".footer2-game__button-auto").classList.remove("_hold");
                        document.querySelector(".footer2-game__button-spin").classList.remove("_hold");
                    } else if (+money.innerHTML <= 500) {
                        clearInterval(casinoAutoSpin);
                        document.querySelector(".footer2-game__button-auto").classList.remove("_hold");
                        document.querySelector(".footer2-game__button-spin").classList.remove("_hold");
                        money.classList.add("_no-money");
                        setTimeout((() => {
                            money.classList.remove("_no-money");
                        }), 1e3);
                    }
                }), 4e3);
            } else {
                money.classList.add("_no-money");
                setTimeout((() => {
                    money.classList.remove("_no-money");
                }), 1e3);
            }
        }));
    }
    window["FLS"] = true;
    isWebp();
})();