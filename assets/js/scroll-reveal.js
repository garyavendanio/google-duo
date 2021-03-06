var ScrollReveal = function() {
    "use strict";

    function e(i) { for (var r = [], o = arguments.length - 1; o-- > 0;) r[o] = arguments[o + 1]; if (t(i)) return n(r, function(r) { n(r, function(n, r) { t(n) ? (i[r] && t(i[r]) || (i[r] = {}), e(i[r], n)) : i[r] = n }) }), i; throw new TypeError("Expected an object literal.") }

    function t(e) { return null !== e && "object" == typeof e && (e.constructor === Object || "[object Object]" === Object.prototype.toString.call(e)) }

    function n(e, n) {
        if (t(e))
            for (var i = Object.keys(e), r = 0; r < i.length; r++) n(e[i[r]], i[r], e);
        else { if (!Array.isArray(e)) throw new TypeError("Expected either an array or object literal."); for (var o = 0; o < e.length; o++) n(e[o], o, e) }
    }

    function i(e) { return void 0 === e && (e = navigator.userAgent), /Android|iPhone|iPad|iPod/i.test(e) }

    function r(e) { return "object" == typeof window.Node ? e instanceof window.Node : null !== e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName }

    function o(e) {
        var t = Object.prototype.toString.call(e),
            n = /^\[object (HTMLCollection|NodeList|Object)\]$/;
        return "object" == typeof window.NodeList ? e instanceof window.NodeList : "object" == typeof e && "number" == typeof e.length && n.test(t) && (0 === e.length || r(e[0]))
    }

    function s() { var e = document.documentElement.style; return "transform" in e || "WebkitTransform" in e }

    function a() { var e = document.documentElement.style; return "transition" in e || "WebkitTransition" in e }

    function l(e) {
        var t = this.store.containers[e.containerId],
            n = Math.max(0, Math.min(1, e.config.viewFactor)),
            i = e.config.viewOffset,
            r = { top: e.geometry.bounds.top + e.geometry.height * n, right: e.geometry.bounds.right - e.geometry.width * n, bottom: e.geometry.bounds.bottom - e.geometry.height * n, left: e.geometry.bounds.left + e.geometry.width * n },
            o = { top: t.geometry.bounds.top + t.scroll.top + i.top, right: t.geometry.bounds.right + t.scroll.left - i.right, bottom: t.geometry.bounds.bottom + t.scroll.top - i.bottom, left: t.geometry.bounds.left + t.scroll.left + i.left };
        return r.top < o.bottom && r.right > o.left && r.bottom > o.top && r.left < o.right || "fixed" === e.styles.position
    }

    function c(e, t) {
        var n = t ? e.node.clientHeight : e.node.offsetHeight,
            i = t ? e.node.clientWidth : e.node.offsetWidth,
            r = 0,
            o = 0,
            s = e.node;
        do { isNaN(s.offsetTop) || (r += s.offsetTop), isNaN(s.offsetLeft) || (o += s.offsetLeft), s = s.offsetParent } while (s);
        return { bounds: { top: r, right: o + i, bottom: r + n, left: o }, height: n, width: i }
    }

    function u(e, t) { void 0 === t && (t = document); var n = null; if ("string" == typeof e) { try { n = t.querySelector(e) } catch (t) { throw new Error('"' + e + '" is not a valid selector.') } if (!n) throw new Error('The selector "' + e + '" matches 0 elements.') } return r(e) ? e : n }

    function d(e, t) { if (void 0 === t && (t = document), e instanceof Array) return e; if (r(e)) return [e]; if (o(e)) return Array.prototype.slice.call(e); if ("string" == typeof e) { var n; try { n = t.querySelectorAll(e) } catch (t) { throw new Error('"' + e + '" is not a valid selector.') } return Array.prototype.slice.call(n) } }

    function f(e) { return e.node === document.documentElement ? { top: window.pageYOffset, left: window.pageXOffset } : { top: e.node.scrollTop, left: e.node.scrollLeft } }

    function h(e) {
        for (var t = [], n = arguments.length - 1; n-- > 0;) t[n] = arguments[n + 1];
        if (this.constructor.debug && console) {
            var i = "%cScrollReveal: " + e;
            t.forEach(function(e) { return i += "\n — " + e }), console.log(i, "color: #ea654b;")
        }
    }

    function p() {
        var e = this,
            t = { active: [], stale: [] },
            i = { active: [], stale: [] },
            r = { active: [], stale: [] };
        try {
            n(d("[data-sr-id]"), function(e) {
                var n = parseInt(e.getAttribute("data-sr-id"));
                t.active.push(n)
            })
        } catch (e) { throw e }
        n(this.store.elements, function(e) {-1 === t.active.indexOf(e.id) && t.stale.push(e.id) }), n(t.stale, function(t) { return delete e.store.elements[t] }), n(this.store.elements, function(e) {-1 === i.active.indexOf(e.containerId) && i.active.push(e.containerId), e.hasOwnProperty("sequence") && -1 === r.active.indexOf(e.sequence.id) && r.active.push(e.sequence.id) }), n(this.store.containers, function(e) {-1 === i.active.indexOf(e.id) && i.stale.push(e.id) }), n(i.stale, function(t) { e.store.containers[t].node.removeEventListener("scroll", e.delegate), e.store.containers[t].node.removeEventListener("resize", e.delegate), delete e.store.containers[t] }), n(this.store.sequences, function(e) {-1 === r.active.indexOf(e.id) && r.stale.push(e.id) }), n(r.stale, function(t) { return delete e.store.sequences[t] })
    }

    function y(e) {
        var t, i = this;
        try {
            n(d(e), function(e) {
                var n = e.getAttribute("data-sr-id");
                null !== n && (t = !0, e.setAttribute("style", i.store.elements[n].styles.inline), e.removeAttribute("data-sr-id"), delete i.store.elements[n])
            })
        } catch (e) { return h.call(this, "Clean failed.", e.stack || e.message) }
        if (t) try { p.call(this) } catch (e) { return h.call(this, "Clean failed.", e.stack || e.message) }
    }

    function m() {
        var e = this;
        n(this.store.elements, function(e) { e.node.setAttribute("style", e.styles.inline), e.node.removeAttribute("data-sr-id") }), n(this.store.containers, function(t) { t.node === document.documentElement ? (window.removeEventListener("scroll", e.delegate), window.removeEventListener("resize", e.delegate)) : (t.node.removeEventListener("scroll", e.delegate), t.node.removeEventListener("resize", e.delegate)) }), this.store = { containers: {}, elements: {}, history: [], sequences: {} }
    }

    function v(e) { if (e.constructor !== Array) throw new TypeError("Expected array."); if (16 === e.length) return e; if (6 === e.length) { var t = g(); return t[0] = e[0], t[1] = e[1], t[4] = e[2], t[5] = e[3], t[12] = e[4], t[13] = e[5], t } throw new RangeError("Expected array with either 6 or 16 values.") }

    function g() { for (var e = [], t = 0; t < 16; t++) t % 5 == 0 ? e.push(1) : e.push(0); return e }

    function b(e, t) {
        for (var n = v(e), i = v(t), r = [], o = 0; o < 4; o++)
            for (var s = [n[o], n[o + 4], n[o + 8], n[o + 12]], a = 0; a < 4; a++) {
                var l = 4 * a,
                    c = [i[l], i[l + 1], i[l + 2], i[l + 3]],
                    u = s[0] * c[0] + s[1] * c[1] + s[2] * c[2] + s[3] * c[3];
                r[o + l] = u
            }
        return r
    }

    function w(e) { if ("string" == typeof e) { var t = e.match(/matrix(3d)?\(([^)]+)\)/); if (t) { return v(t[2].split(", ").map(function(e) { return parseFloat(e) })) } } return g() }

    function E(e) {
        var t = Math.PI / 180 * e,
            n = g();
        return n[5] = n[10] = Math.cos(t), n[6] = n[9] = Math.sin(t), n[9] *= -1, n
    }

    function k(e) {
        var t = Math.PI / 180 * e,
            n = g();
        return n[0] = n[10] = Math.cos(t), n[2] = n[8] = Math.sin(t), n[2] *= -1, n
    }

    function T(e) {
        var t = Math.PI / 180 * e,
            n = g();
        return n[0] = n[5] = Math.cos(t), n[1] = n[4] = Math.sin(t), n[4] *= -1, n
    }

    function j(e, t) { var n = g(); return n[0] = e, n[5] = t || e, n }

    function x(e) { var t = g(); return t[12] = e, t }

    function O(e) { var t = g(); return t[13] = e, t }

    function R(e) {
        var t = window.getComputedStyle(e.node),
            n = t.position,
            i = e.config,
            r = /.+[^;]/g,
            o = e.node.getAttribute("style") || "",
            s = r.exec(o),
            a = s ? s[0] + ";" : ""; - 1 === a.indexOf("visibility: visible") && (a += a.length ? " " : "", a += "visibility: visible;");
        var l = parseFloat(t.opacity),
            c = isNaN(parseFloat(i.opacity)) ? parseFloat(t.opacity) : parseFloat(i.opacity),
            u = { computed: l !== c ? "opacity: " + l + ";" : "", generated: l !== c ? "opacity: " + c + ";" : "" },
            d = [];
        if (parseFloat(i.distance)) {
            var f = "top" === i.origin || "bottom" === i.origin ? "Y" : "X",
                h = i.distance;
            "top" !== i.origin && "left" !== i.origin || (h = /^-/.test(h) ? h.substr(1) : "-" + h);
            var p = h.match(/(^-?\d+\.?\d?)|(em$|px$|\%$)/g),
                y = p[0];
            switch (p[1]) {
                case "em":
                    h = parseInt(t.fontSize) * y;
                    break;
                case "px":
                    h = y;
                    break;
                case "%":
                    h = "Y" === f ? e.node.getBoundingClientRect().height * y / 100 : e.node.getBoundingClientRect().width * y / 100;
                    break;
                default:
                    throw new RangeError("Unrecognized or missing distance unit.")
            }
            "Y" === f ? d.push(O(h)) : d.push(x(h))
        }
        i.rotate.x && d.push(E(i.rotate.x)), i.rotate.y && d.push(k(i.rotate.y)), i.rotate.z && d.push(T(i.rotate.z)), 1 !== i.scale && (0 === i.scale ? d.push(j(2e-4)) : d.push(j(i.scale)));
        var m = {};
        if (d.length) {
            m.property = J("transform"), m.computed = { raw: t[m.property], matrix: w(t[m.property]) }, d.unshift(m.computed.matrix);
            var v = d.reduce(b);
            m.generated = { initial: m.property + ": matrix3d(" + v.join(", ") + ");", final: m.property + ": matrix3d(" + m.computed.matrix.join(", ") + ");" }
        } else m.generated = { initial: "", final: "" };
        var g = {};
        if (u.generated || m.generated.initial) {
            g.property = J("transition"), g.computed = t[g.property], g.fragments = [];
            var R = i.delay,
                A = i.duration,
                L = i.easing;
            u.generated && g.fragments.push({ delayed: "opacity " + A / 1e3 + "s " + L + " " + R / 1e3 + "s", instant: "opacity " + A / 1e3 + "s " + L + " 0s" }), m.generated.initial && g.fragments.push({ delayed: m.property + " " + A / 1e3 + "s " + L + " " + R / 1e3 + "s", instant: m.property + " " + A / 1e3 + "s " + L + " 0s" }), g.computed && !g.computed.match(/all 0s/) && g.fragments.unshift({ delayed: g.computed, instant: g.computed });
            var q = g.fragments.reduce(function(e, t, n) { return e.delayed += 0 === n ? t.delayed : ", " + t.delayed, e.instant += 0 === n ? t.instant : ", " + t.instant, e }, { delayed: "", instant: "" });
            g.generated = { delayed: g.property + ": " + q.delayed + ";", instant: g.property + ": " + q.instant + ";" }
        } else g.generated = { delayed: "", instant: "" };
        return { inline: a, opacity: u, position: n, transform: m, transition: g }
    }

    function A() {
        var e = this;
        p.call(this), n(this.store.elements, function(e) {
            var t = [e.styles.inline];
            e.visible ? (t.push(e.styles.opacity.computed), t.push(e.styles.transform.generated.final)) : (t.push(e.styles.opacity.generated), t.push(e.styles.transform.generated.initial)), e.node.setAttribute("style", t.filter(function(e) { return "" !== e }).join(" "))
        }), n(this.store.containers, function(t) { t.node === document.documentElement ? (window.addEventListener("scroll", e.delegate), window.addEventListener("resize", e.delegate)) : (t.node.addEventListener("scroll", e.delegate), t.node.addEventListener("resize", e.delegate)) }), this.delegate(), this.initTimeout = null
    }

    function L(e, t) {
        void 0 === t && (t = {});
        var n = t.pristine || this.pristine,
            i = "always" === e.config.useDelay || "onload" === e.config.useDelay && n || "once" === e.config.useDelay && !e.seen,
            r = e.visible && !e.revealed,
            o = !e.visible && e.revealed && e.config.reset;
        return r || t.reveal ? q.call(this, e, i) : o || t.reset ? I.call(this, e) : void 0
    }

    function q(e, t) {
        var n = [e.styles.inline, e.styles.opacity.computed, e.styles.transform.generated.final];
        t ? n.push(e.styles.transition.generated.delayed) : n.push(e.styles.transition.generated.instant), e.revealed = e.seen = !0, e.node.setAttribute("style", n.filter(function(e) { return "" !== e }).join(" ")), P.call(this, e, t)
    }

    function I(e) {
        var t = [e.styles.inline, e.styles.opacity.generated, e.styles.transform.generated.initial, e.styles.transition.generated.instant];
        e.revealed = !1, e.node.setAttribute("style", t.filter(function(e) { return "" !== e }).join(" ")), P.call(this, e)
    }

    function P(e, t) {
        var n = this,
            i = t ? e.config.duration + e.config.delay : e.config.duration,
            r = e.revealed ? e.config.beforeReveal : e.config.beforeReset,
            o = e.revealed ? e.config.afterReveal : e.config.afterReset,
            s = 0;
        e.callbackTimer && (s = Date.now() - e.callbackTimer.start, window.clearTimeout(e.callbackTimer.clock)), r(e.node), e.callbackTimer = { start: Date.now(), clock: window.setTimeout(function() { o(e.node), e.callbackTimer = null, e.revealed && !e.config.reset && y.call(n, e.node) }, i - s) }
    }

    function z(e, t) {
        void 0 === t && (t = this.pristine);
        var n = this.store.sequences[e.sequence.id],
            i = e.sequence.index;
        if (n) {
            var r = new N("visible", n, this.store),
                o = new N("revealed", n, this.store);
            if (n.models = { visible: r, revealed: o }, !o.body.length) {
                var s = n.members[r.body[0]],
                    a = this.store.elements[s];
                return a ? (F.call(this, n, r.body[0], -1, t), F.call(this, n, r.body[0], 1, t), n.lastReveal = r.body[0], L.call(this, a, { reveal: !0, pristine: t })) : L.call(this, e)
            }
            if (!e.visible && e.revealed && e.config.reset) return n.lastReset = i, L.call(this, e, { reset: !0 });
            if (!n.headblocked && i === [].concat(o.head).pop() && i >= [].concat(r.body).shift()) return F.call(this, n, i, -1, t), n.lastReveal = i, L.call(this, e, { reveal: !0, pristine: t });
            if (!n.footblocked && i === [].concat(o.foot).shift() && i <= [].concat(r.body).pop()) return F.call(this, n, i, 1, t), n.lastReveal = i, L.call(this, e, { reveal: !0, pristine: t })
        }
    }

    function M(e) {
        if ("number" != typeof e) return null;
        if (!(e >= 16)) throw new RangeError("Sequence interval must be at least 16ms.");
        this.id = G(), this.interval = e, this.members = [], this.headblocked = !0, this.footblocked = !0, this.lastReveal = null, this.lastReset = null, this.models = {}
    }

    function N(e, t, i) {
        var r = this;
        this.head = [], this.body = [], this.foot = [], n(t.members, function(t, n) { i.elements[t][e] && r.body.push(n) }), this.body.length && n(t.members, function(t, n) { i.elements[t][e] || (n < r.body[0] ? r.head.push(n) : r.foot.push(n)) })
    }

    function F(e, t, n, i) {
        var r = this,
            o = ["headblocked", null, "footblocked"][1 + n],
            s = e.members[t + n],
            a = this.store.elements[s];
        e[o] = !0, setTimeout(function() { e[o] = !1, a && z.call(r, a, i) }, e.interval)
    }

    function S(t, r, o, s) {
        var a = this,
            l = [];
        "number" == typeof r ? (o = parseInt(r), r = {}) : (o = parseInt(o), r = r || {});
        var c, f;
        try { c = d(t), f = o ? new M(o) : null } catch (e) { return h.call(this, "Reveal failed.", e.stack || e.message) }
        try {
            n(c.reduce(function(t, n) {
                var o = {},
                    s = n.getAttribute("data-sr-id");
                s ? (e(o, a.store.elements[s]), o.node.setAttribute("style", o.styles.inline)) : (o.id = G(), o.node = n, o.seen = !1, o.revealed = !1, o.visible = !1);
                var c, d = e({}, o.config || a.defaults, r);
                if (null == c && (c = !d.mobile && i() || !d.desktop && !i()), c) return s && y.call(a, o), t;
                var h, p = u(d.container);
                if (!p) throw new Error("Invalid container.");
                return p.contains(n) ? (null == (h = D(p, l, a.store.containers)) && (h = G(), l.push({ id: h, node: p })), o.config = d, o.containerId = h, o.styles = R(o), f && (o.sequence = { id: f.id, index: f.members.length }, f.members.push(o.id)), t.push(o), t) : t
            }, []), function(e) { a.store.elements[e.id] = e, e.node.setAttribute("data-sr-id", e.id) })
        } catch (e) { return h.call(this, "Reveal failed.", e.stack || e.message) }
        n(l, function(e) { a.store.containers[e.id] = { id: e.id, node: e.node } }), f && (this.store.sequences[f.id] = f), s || (this.store.history.push({ target: t, options: r, interval: o }), this.initTimeout && window.clearTimeout(this.initTimeout), this.initTimeout = window.setTimeout(A.bind(this), 0))
    }

    function D(e) { for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1]; var r = null; return n(t, function(t) { n(t, function(t) { null == r && t.node === e && (r = t.id) }) }), r }

    function C() {
        var e = this;
        n(this.store.history, function(t) { S.call(e, t.target, t.options, t.interval, !0) }), A.call(this)
    }

    function W(e, t) {
        var i = this;
        void 0 === e && (e = { type: "init" }), void 0 === t && (t = this.store.elements), Q(function() { var r = i.store.containers; "init" !== e.type && "resize" !== e.type || (n(r, function(e) { return e.geometry = c.call(i, e, !0) }), n(t, function(e) { return e.geometry = c.call(i, e) })), n(r, function(e) { return e.scroll = f.call(i, e) }), n(t, function(e) { return e.visible = l.call(i, e) }), n(t, function(e) { return e.sequence ? z.call(i, e) : L.call(i, e) }), i.pristine = !1 })
    }

    function Y(t) { var n = this; if (void 0 === t && (t = {}), void 0 === this || Object.getPrototypeOf(this) !== Y.prototype) return new Y(t); if (!Y.isSupported()) return h.call(this, "Instantiation aborted.", "This browser is not supported."), X; var r; try { r = $ ? e({}, $, t) : e({}, U, t) } catch (e) { return h.call(this, "Instantiation failed.", "Invalid configuration.", e.message), X } try { if (!u(r.container)) throw new Error("Invalid container.") } catch (e) { return h.call(this, "Instantiation failed.", e.message), X } return $ = r, Object.defineProperty(this, "defaults", { get: function() { return $ } }), this.defaults.mobile !== i() && this.defaults.desktop !== !i() || (document.documentElement.classList.add("sr"), document.addEventListener("DOMContentLoaded", function() { window.setTimeout(function() { return document.body.style.height = "100%" }, 0) })), this.store = { containers: {}, elements: {}, history: [], sequences: {} }, this.pristine = !0, Object.defineProperty(this, "delegate", { get: function() { return W.bind(n) } }), Object.defineProperty(this, "version", { get: function() { return V } }), Object.defineProperty(this, "noop", { get: function() { return !1 } }), B || (B = this) }
    var $, H, B, U = { delay: 0, distance: "0", duration: 600, easing: "cubic-bezier(0.6, 0.2, 0.1, 1)", opacity: 0, origin: "bottom", rotate: { x: 0, y: 0, z: 0 }, scale: 1, container: document.documentElement, desktop: !0, mobile: !0, reset: !1, useDelay: "always", viewFactor: 0, viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }, afterReset: function() {}, afterReveal: function() {}, beforeReset: function() {}, beforeReveal: function() {} },
        X = { clean: function() {}, destroy: function() {}, reveal: function() {}, sync: function() {}, get noop() { return !0 } },
        G = function() { var e = 0; return function() { return e++ } }(),
        J = function() {
            function e(e, i) { if (void 0 === i && (i = n), e && "string" == typeof e) { if (t[e]) return t[e]; if ("string" == typeof i[e]) return t[e] = e; if ("string" == typeof i["-webkit-" + e]) return t[e] = "-webkit-" + e; throw new RangeError('Unable to find "' + e + '" style property.') } throw new TypeError("Expected a string.") }
            var t = {},
                n = document.documentElement.style;
            return e.clearCache = function() { return t = {} }, e
        }(),
        K = function() {
            var e = Date.now();
            return function(t) {
                var n = Date.now();
                n - e > 16 ? (e = n, t(n)) : setTimeout(function() { return K(t) }, 0)
            }
        }(),
        Q = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || K,
        V = "4.0.0-beta.13";
    return Y.isSupported = function() { return s() && a() }, Object.defineProperty(Y, "debug", { get: function() { return H || !1 }, set: function(e) { "boolean" == typeof e && (H = e) } }), Y.prototype.clean = y, Y.prototype.destroy = m, Y.prototype.reveal = S, Y.prototype.sync = C, Y
}();