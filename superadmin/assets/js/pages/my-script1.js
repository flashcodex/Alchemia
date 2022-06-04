/*! jQuery UI - v1.12.1 - 2021-04-08
 * http://jqueryui.com
 * Includes: widget.js, data.js, scroll-parent.js, widgets/draggable.js, widgets/mouse.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

!(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (b) {
  b.ui = b.ui || {};
  b.ui.version = "1.12.1";
  var o,
    s = 0,
    a = Array.prototype.slice;
  (b.cleanData =
    ((o = b.cleanData),
      function (t) {
        for (var e, s, i = 0; null != (s = t[i]); i++)
          try {
            (e = b._data(s, "events")) && e.remove && b(s).triggerHandler("remove");
          } catch (t) { }
        o(t);
      })),
    (b.widget = function (t, s, e) {
      var i,
        o,
        n,
        r = {},
        a = t.split(".")[0],
        l = a + "-" + (t = t.split(".")[1]);
      return (
        e || ((e = s), (s = b.Widget)),
        b.isArray(e) && (e = b.extend.apply(null, [{}].concat(e))),
        (b.expr[":"][l.toLowerCase()] = function (t) {
          return !!b.data(t, l);
        }),
        (b[a] = b[a] || {}),
        (i = b[a][t]),
        (o = b[a][t] = function (t, e) {
          if (!this._createWidget) return new o(t, e);
          arguments.length && this._createWidget(t, e);
        }),
        b.extend(o, i, { version: e.version, _proto: b.extend({}, e), _childConstructors: [] }),
        ((n = new s()).options = b.widget.extend({}, n.options)),
        b.each(e, function (e, i) {
          function o() {
            return s.prototype[e].apply(this, arguments);
          }
          function n(t) {
            return s.prototype[e].apply(this, t);
          }
          b.isFunction(i)
            ? (r[e] = function () {
              var t,
                e = this._super,
                s = this._superApply;
              return (this._super = o), (this._superApply = n), (t = i.apply(this, arguments)), (this._super = e), (this._superApply = s), t;
            })
            : (r[e] = i);
        }),
        (o.prototype = b.widget.extend(n, { widgetEventPrefix: (i && n.widgetEventPrefix) || t }, r, { constructor: o, namespace: a, widgetName: t, widgetFullName: l })),
        i
          ? (b.each(i._childConstructors, function (t, e) {
            var s = e.prototype;
            b.widget(s.namespace + "." + s.widgetName, o, e._proto);
          }),
            delete i._childConstructors)
          : s._childConstructors.push(o),
        b.widget.bridge(t, o),
        o
      );
    }),
    (b.widget.extend = function (t) {
      for (var e, s, i = a.call(arguments, 1), o = 0, n = i.length; o < n; o++)
        for (e in i[o]) (s = i[o][e]), i[o].hasOwnProperty(e) && void 0 !== s && (b.isPlainObject(s) ? (t[e] = b.isPlainObject(t[e]) ? b.widget.extend({}, t[e], s) : b.widget.extend({}, s)) : (t[e] = s));
      return t;
    }),
    (b.widget.bridge = function (n, e) {
      var r = e.prototype.widgetFullName || n;
      b.fn[n] = function (s) {
        var t = "string" == typeof s,
          i = a.call(arguments, 1),
          o = this;
        return (
          t
            ? this.length || "instance" !== s
              ? this.each(function () {
                var t,
                  e = b.data(this, r);
                return "instance" === s
                  ? ((o = e), !1)
                  : e
                    ? b.isFunction(e[s]) && "_" !== s.charAt(0)
                      ? (t = e[s].apply(e, i)) !== e && void 0 !== t
                        ? ((o = t && t.jquery ? o.pushStack(t.get()) : t), !1)
                        : void 0
                      : b.error("no such method '" + s + "' for " + n + " widget instance")
                    : b.error("cannot call methods on " + n + " prior to initialization; attempted to call method '" + s + "'");
              })
              : (o = void 0)
            : (i.length && (s = b.widget.extend.apply(null, [s].concat(i))),
              this.each(function () {
                var t = b.data(this, r);
                t ? (t.option(s || {}), t._init && t._init()) : b.data(this, r, new e(s, this));
              })),
          o
        );
      };
    }),
    (b.Widget = function () { }),
    (b.Widget._childConstructors = []),
    (b.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { classes: {}, disabled: !1, create: null },
      _createWidget: function (t, e) {
        (e = b(e || this.defaultElement || this)[0]),
          (this.element = b(e)),
          (this.uuid = s++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = b()),
          (this.hoverable = b()),
          (this.focusable = b()),
          (this.classesElementLookup = {}),
          e !== this &&
          (b.data(e, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === e && this.destroy();
              },
            }),
            (this.document = b(e.style ? e.ownerDocument : e.document || e)),
            (this.window = b(this.document[0].defaultView || this.document[0].parentWindow))),
          (this.options = b.widget.extend({}, this.options, this._getCreateOptions(), t)),
          this._create(),
          this.options.disabled && this._setOptionDisabled(this.options.disabled),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: function () {
        return {};
      },
      _getCreateEventData: b.noop,
      _create: b.noop,
      _init: b.noop,
      destroy: function () {
        var s = this;
        this._destroy(),
          b.each(this.classesElementLookup, function (t, e) {
            s._removeClass(e, t);
          }),
          this.element.off(this.eventNamespace).removeData(this.widgetFullName),
          this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
          this.bindings.off(this.eventNamespace);
      },
      _destroy: b.noop,
      widget: function () {
        return this.element;
      },
      option: function (t, e) {
        var s,
          i,
          o,
          n = t;
        if (0 === arguments.length) return b.widget.extend({}, this.options);
        if ("string" == typeof t)
          if (((n = {}), (t = (s = t.split(".")).shift()), s.length)) {
            for (i = n[t] = b.widget.extend({}, this.options[t]), o = 0; o < s.length - 1; o++) (i[s[o]] = i[s[o]] || {}), (i = i[s[o]]);
            if (((t = s.pop()), 1 === arguments.length)) return void 0 === i[t] ? null : i[t];
            i[t] = e;
          } else {
            if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
            n[t] = e;
          }
        return this._setOptions(n), this;
      },
      _setOptions: function (t) {
        for (var e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return "classes" === t && this._setOptionClasses(e), (this.options[t] = e), "disabled" === t && this._setOptionDisabled(e), this;
      },
      _setOptionClasses: function (t) {
        var e, s, i;
        for (e in t) (i = this.classesElementLookup[e]), t[e] !== this.options.classes[e] && i && i.length && ((s = b(i.get())), this._removeClass(i, e), s.addClass(this._classes({ element: s, keys: e, classes: t, add: !0 })));
      },
      _setOptionDisabled: function (t) {
        this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"));
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _classes: function (o) {
        var n = [],
          r = this;
        function t(t, e) {
          for (var s, i = 0; i < t.length; i++)
            (s = r.classesElementLookup[t[i]] || b()),
              (s = o.add ? b(b.unique(s.get().concat(o.element.get()))) : b(s.not(o.element).get())),
              (r.classesElementLookup[t[i]] = s),
              n.push(t[i]),
              e && o.classes[t[i]] && n.push(o.classes[t[i]]);
        }
        return (
          (o = b.extend({ element: this.element, classes: this.options.classes || {} }, o)),
          this._on(o.element, { remove: "_untrackClassesElement" }),
          o.keys && t(o.keys.match(/\S+/g) || [], !0),
          o.extra && t(o.extra.match(/\S+/g) || []),
          n.join(" ")
        );
      },
      _untrackClassesElement: function (s) {
        var i = this;
        b.each(i.classesElementLookup, function (t, e) {
          -1 !== b.inArray(s.target, e) && (i.classesElementLookup[t] = b(e.not(s.target).get()));
        });
      },
      _removeClass: function (t, e, s) {
        return this._toggleClass(t, e, s, !1);
      },
      _addClass: function (t, e, s) {
        return this._toggleClass(t, e, s, !0);
      },
      _toggleClass: function (t, e, s, i) {
        i = "boolean" == typeof i ? i : s;
        var o = "string" == typeof t || null === t,
          t = { extra: o ? e : s, keys: o ? t : e, element: o ? this.element : t, add: i };
        return t.element.toggleClass(this._classes(t), i), this;
      },
      _on: function (o, n, t) {
        var r,
          a = this;
        "boolean" != typeof o && ((t = n), (n = o), (o = !1)),
          t ? ((n = r = b(n)), (this.bindings = this.bindings.add(n))) : ((t = n), (n = this.element), (r = this.widget())),
          b.each(t, function (t, e) {
            function s() {
              if (o || (!0 !== a.options.disabled && !b(this).hasClass("ui-state-disabled"))) return ("string" == typeof e ? a[e] : e).apply(a, arguments);
            }
            "string" != typeof e && (s.guid = e.guid = e.guid || s.guid || b.guid++);
            var i = t.match(/^([\w:-]*)\s*(.*)$/),
              t = i[1] + a.eventNamespace,
              i = i[2];
            i ? r.on(t, i, s) : n.on(t, s);
          });
      },
      _off: function (t, e) {
        (e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace),
          t.off(e).off(e),
          (this.bindings = b(this.bindings.not(t).get())),
          (this.focusable = b(this.focusable.not(t).get())),
          (this.hoverable = b(this.hoverable.not(t).get()));
      },
      _delay: function (t, e) {
        var s = this;
        return setTimeout(function () {
          return ("string" == typeof t ? s[t] : t).apply(s, arguments);
        }, e || 0);
      },
      _hoverable: function (t) {
        (this.hoverable = this.hoverable.add(t)),
          this._on(t, {
            mouseenter: function (t) {
              this._addClass(b(t.currentTarget), null, "ui-state-hover");
            },
            mouseleave: function (t) {
              this._removeClass(b(t.currentTarget), null, "ui-state-hover");
            },
          });
      },
      _focusable: function (t) {
        (this.focusable = this.focusable.add(t)),
          this._on(t, {
            focusin: function (t) {
              this._addClass(b(t.currentTarget), null, "ui-state-focus");
            },
            focusout: function (t) {
              this._removeClass(b(t.currentTarget), null, "ui-state-focus");
            },
          });
      },
      _trigger: function (t, e, s) {
        var i,
          o,
          n = this.options[t];
        if (((s = s || {}), ((e = b.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase()), (e.target = this.element[0]), (o = e.originalEvent))) for (i in o) i in e || (e[i] = o[i]);
        return this.element.trigger(e, s), !((b.isFunction(n) && !1 === n.apply(this.element[0], [e].concat(s))) || e.isDefaultPrevented());
      },
    }),
    b.each({ show: "fadeIn", hide: "fadeOut" }, function (n, r) {
      b.Widget.prototype["_" + n] = function (e, t, s) {
        var i;
        "string" == typeof t && (t = { effect: t });
        var o = t ? (!0 !== t && "number" != typeof t && t.effect) || r : n;
        "number" == typeof (t = t || {}) && (t = { duration: t }),
          (i = !b.isEmptyObject(t)),
          (t.complete = s),
          t.delay && e.delay(t.delay),
          i && b.effects && b.effects.effect[o]
            ? e[n](t)
            : o !== n && e[o]
              ? e[o](t.duration, t.easing, s)
              : e.queue(function (t) {
                b(this)[n](), s && s.call(e[0]), t();
              });
      };
    });
  b.widget,
    b.extend(b.expr[":"], {
      data: b.expr.createPseudo
        ? b.expr.createPseudo(function (e) {
          return function (t) {
            return !!b.data(t, e);
          };
        })
        : function (t, e, s) {
          return !!b.data(t, s[3]);
        },
    }),
    (b.fn.scrollParent = function (t) {
      var e = this.css("position"),
        s = "absolute" === e,
        i = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        t = this.parents()
          .filter(function () {
            var t = b(this);
            return (!s || "static" !== t.css("position")) && i.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"));
          })
          .eq(0);
      return "fixed" !== e && t.length ? t : b(this[0].ownerDocument || document);
    }),
    (b.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
  var n = !1;
  b(document).on("mouseup", function () {
    n = !1;
  });
  b.widget("ui.mouse", {
    version: "1.12.1",
    options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 },
    _mouseInit: function () {
      var e = this;
      this.element
        .on("mousedown." + this.widgetName, function (t) {
          return e._mouseDown(t);
        })
        .on("click." + this.widgetName, function (t) {
          if (!0 === b.data(t.target, e.widgetName + ".preventClickEvent")) return b.removeData(t.target, e.widgetName + ".preventClickEvent"), t.stopImmediatePropagation(), !1;
        }),
        (this.started = !1);
    },
    _mouseDestroy: function () {
      this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function (t) {
      if (!n) {
        (this._mouseMoved = !1), this._mouseStarted && this._mouseUp(t), (this._mouseDownEvent = t);
        var e = this,
          s = 1 === t.which,
          i = !("string" != typeof this.options.cancel || !t.target.nodeName) && b(t.target).closest(this.options.cancel).length;
        return s && !i && this._mouseCapture(t)
          ? ((this.mouseDelayMet = !this.options.delay),
            this.mouseDelayMet ||
            (this._mouseDelayTimer = setTimeout(function () {
              e.mouseDelayMet = !0;
            }, this.options.delay)),
            this._mouseDistanceMet(t) && this._mouseDelayMet(t) && ((this._mouseStarted = !1 !== this._mouseStart(t)), !this._mouseStarted)
              ? (t.preventDefault(), !0)
              : (!0 === b.data(t.target, this.widgetName + ".preventClickEvent") && b.removeData(t.target, this.widgetName + ".preventClickEvent"),
                (this._mouseMoveDelegate = function (t) {
                  return e._mouseMove(t);
                }),
                (this._mouseUpDelegate = function (t) {
                  return e._mouseUp(t);
                }),
                this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate),
                t.preventDefault(),
                (n = !0)))
          : !0;
      }
    },
    _mouseMove: function (t) {
      if (this._mouseMoved) {
        if (b.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button) return this._mouseUp(t);
        if (!t.which)
          if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
          else if (!this.ignoreMissingWhich) return this._mouseUp(t);
      }
      return (
        (t.which || t.button) && (this._mouseMoved = !0),
        this._mouseStarted
          ? (this._mouseDrag(t), t.preventDefault())
          : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t)), this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
      );
    },
    _mouseUp: function (t) {
      this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate),
        this._mouseStarted && ((this._mouseStarted = !1), t.target === this._mouseDownEvent.target && b.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)),
        this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
        (this.ignoreMissingWhich = !1),
        (n = !1),
        t.preventDefault();
    },
    _mouseDistanceMet: function (t) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
    },
    _mouseDelayMet: function () {
      return this.mouseDelayMet;
    },
    _mouseStart: function () { },
    _mouseDrag: function () { },
    _mouseStop: function () { },
    _mouseCapture: function () {
      return !0;
    },
  }),
    (b.ui.plugin = {
      add: function (t, e, s) {
        var i,
          o = b.ui[t].prototype;
        for (i in s) (o.plugins[i] = o.plugins[i] || []), o.plugins[i].push([e, s[i]]);
      },
      call: function (t, e, s, i) {
        var o,
          n = t.plugins[e];
        if (n && (i || (t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))) for (o = 0; o < n.length; o++) t.options[n[o][0]] && n[o][1].apply(t.element, s);
      },
    }),
    (b.ui.safeActiveElement = function (e) {
      var s;
      try {
        s = e.activeElement;
      } catch (t) {
        s = e.body;
      }
      return (s = s || e.body).nodeName || (s = e.body), s;
    }),
    (b.ui.safeBlur = function (t) {
      t && "body" !== t.nodeName.toLowerCase() && b(t).trigger("blur");
    });
  b.widget("ui.draggable", b.ui.mouse, {
    version: "1.12.1",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null,
    },
    _create: function () {
      "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit();
    },
    _setOption: function (t, e) {
      this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName());
    },
    _destroy: function () {
      (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0) : (this._removeHandleClassName(), this._mouseDestroy());
    },
    _mouseCapture: function (t) {
      var e = this.options;
      return (
        !(this.helper || e.disabled || 0 < b(t.target).closest(".ui-resizable-handle").length) &&
        ((this.handle = this._getHandle(t)), !!this.handle && (this._blurActiveElement(t), this._blockFrames(!0 === e.iframeFix ? "iframe" : e.iframeFix), !0))
      );
    },
    _blockFrames: function (t) {
      this.iframeBlocks = this.document.find(t).map(function () {
        var t = b(this);
        return b("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0];
      });
    },
    _unblockFrames: function () {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
    },
    _blurActiveElement: function (t) {
      var e = b.ui.safeActiveElement(this.document[0]);
      b(t.target).closest(e).length || b.ui.safeBlur(e);
    },
    _mouseStart: function (t) {
      var e = this.options;
      return (
        (this.helper = this._createHelper(t)),
        this._addClass(this.helper, "ui-draggable-dragging"),
        this._cacheHelperProportions(),
        b.ui.ddmanager && (b.ui.ddmanager.current = this),
        this._cacheMargins(),
        (this.cssPosition = this.helper.css("position")),
        (this.scrollParent = this.helper.scrollParent(!0)),
        (this.offsetParent = this.helper.offsetParent()),
        (this.hasFixedAncestor =
          0 <
          this.helper.parents().filter(function () {
            return "fixed" === b(this).css("position");
          }).length),
        (this.positionAbs = this.element.offset()),
        this._refreshOffsets(t),
        (this.originalPosition = this.position = this._generatePosition(t, !1)),
        (this.originalPageX = t.pageX),
        (this.originalPageY = t.pageY),
        e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
        this._setContainment(),
        !1 === this._trigger("start", t)
          ? (this._clear(), !1)
          : (this._cacheHelperProportions(), b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), b.ui.ddmanager && b.ui.ddmanager.dragStart(this, t), !0)
      );
    },
    _refreshOffsets: function (t) {
      (this.offset = { top: this.positionAbs.top - this.margins.top, left: this.positionAbs.left - this.margins.left, scroll: !1, parent: this._getParentOffset(), relative: this._getRelativeOffset() }),
        (this.offset.click = { left: t.pageX - this.offset.left, top: t.pageY - this.offset.top });
    },
    _mouseDrag: function (t, e) {
      if ((this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), (this.position = this._generatePosition(t, !0)), (this.positionAbs = this._convertPositionTo("absolute")), !e)) {
        e = this._uiHash();
        if (!1 === this._trigger("drag", t, e)) return this._mouseUp(new b.Event("mouseup", t)), !1;
        this.position = e.position;
      }
      return (this.helper[0].style.left = this.position.left + "px"), (this.helper[0].style.top = this.position.top + "px"), b.ui.ddmanager && b.ui.ddmanager.drag(this, t), !1;
    },
    _mouseStop: function (t) {
      var e = this,
        s = !1;
      return (
        b.ui.ddmanager && !this.options.dropBehaviour && (s = b.ui.ddmanager.drop(this, t)),
        this.dropped && ((s = this.dropped), (this.dropped = !1)),
        ("invalid" === this.options.revert && !s) || ("valid" === this.options.revert && s) || !0 === this.options.revert || (b.isFunction(this.options.revert) && this.options.revert.call(this.element, s))
          ? b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
            !1 !== e._trigger("stop", t) && e._clear();
          })
          : !1 !== this._trigger("stop", t) && this._clear(),
        !1
      );
    },
    _mouseUp: function (t) {
      return this._unblockFrames(), b.ui.ddmanager && b.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.trigger("focus"), b.ui.mouse.prototype._mouseUp.call(this, t);
    },
    cancel: function () {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new b.Event("mouseup", { target: this.element[0] })) : this._clear(), this;
    },
    _getHandle: function (t) {
      return !this.options.handle || !!b(t.target).closest(this.element.find(this.options.handle)).length;
    },
    _setHandleClassName: function () {
      (this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element), this._addClass(this.handleElement, "ui-draggable-handle");
    },
    _removeHandleClassName: function () {
      this._removeClass(this.handleElement, "ui-draggable-handle");
    },
    _createHelper: function (t) {
      var e = this.options,
        s = b.isFunction(e.helper),
        t = s ? b(e.helper.apply(this.element[0], [t])) : "clone" === e.helper ? this.element.clone().removeAttr("id") : this.element;
      return (
        t.parents("body").length || t.appendTo("parent" === e.appendTo ? this.element[0].parentNode : e.appendTo),
        s && t[0] === this.element[0] && this._setPositionRelative(),
        t[0] === this.element[0] || /(fixed|absolute)/.test(t.css("position")) || t.css("position", "absolute"),
        t
      );
    },
    _setPositionRelative: function () {
      /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
    },
    _adjustOffsetFromHelper: function (t) {
      "string" == typeof t && (t = t.split(" ")),
        b.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }),
        "left" in t && (this.offset.click.left = t.left + this.margins.left),
        "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
        "top" in t && (this.offset.click.top = t.top + this.margins.top),
        "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top);
    },
    _isRootNode: function (t) {
      return /(html|body)/i.test(t.tagName) || t === this.document[0];
    },
    _getParentOffset: function () {
      var t = this.offsetParent.offset(),
        e = this.document[0];
      return (
        "absolute" === this.cssPosition && this.scrollParent[0] !== e && b.contains(this.scrollParent[0], this.offsetParent[0]) && ((t.left += this.scrollParent.scrollLeft()), (t.top += this.scrollParent.scrollTop())),
        this._isRootNode(this.offsetParent[0]) && (t = { top: 0, left: 0 }),
        { top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
      );
    },
    _getRelativeOffset: function () {
      if ("relative" !== this.cssPosition) return { top: 0, left: 0 };
      var t = this.element.position(),
        e = this._isRootNode(this.scrollParent[0]);
      return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft()) };
    },
    _cacheMargins: function () {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
      };
    },
    _cacheHelperProportions: function () {
      this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
    },
    _setContainment: function () {
      var t,
        e,
        s,
        i = this.options,
        o = this.document[0];
      (this.relativeContainer = null),
        i.containment
          ? "window" !== i.containment
            ? "document" !== i.containment
              ? i.containment.constructor !== Array
                ? ("parent" === i.containment && (i.containment = this.helper[0].parentNode),
                  (s = (e = b(i.containment))[0]) &&
                  ((t = /(scroll|auto)/.test(e.css("overflow"))),
                    (this.containment = [
                      (parseInt(e.css("borderLeftWidth"), 10) || 0) + (parseInt(e.css("paddingLeft"), 10) || 0),
                      (parseInt(e.css("borderTopWidth"), 10) || 0) + (parseInt(e.css("paddingTop"), 10) || 0),
                      (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) -
                      (parseInt(e.css("borderRightWidth"), 10) || 0) -
                      (parseInt(e.css("paddingRight"), 10) || 0) -
                      this.helperProportions.width -
                      this.margins.left -
                      this.margins.right,
                      (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) -
                      (parseInt(e.css("borderBottomWidth"), 10) || 0) -
                      (parseInt(e.css("paddingBottom"), 10) || 0) -
                      this.helperProportions.height -
                      this.margins.top -
                      this.margins.bottom,
                    ]),
                    (this.relativeContainer = e)))
                : (this.containment = i.containment)
              : (this.containment = [0, 0, b(o).width() - this.helperProportions.width - this.margins.left, (b(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top])
            : (this.containment = [
              b(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
              b(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
              b(window).scrollLeft() + b(window).width() - this.helperProportions.width - this.margins.left,
              b(window).scrollTop() + (b(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top,
            ])
          : (this.containment = null);
    },
    _convertPositionTo: function (t, e) {
      e = e || this.position;
      var s = "absolute" === t ? 1 : -1,
        t = this._isRootNode(this.scrollParent[0]);
      return {
        top: e.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.offset.scroll.top : t ? 0 : this.offset.scroll.top) * s,
        left: e.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.offset.scroll.left : t ? 0 : this.offset.scroll.left) * s,
      };
    },
    _generatePosition: function (t, e) {
      var s,
        i = this.options,
        o = this._isRootNode(this.scrollParent[0]),
        n = t.pageX,
        r = t.pageY;
      return (
        (o && this.offset.scroll) || (this.offset.scroll = { top: this.scrollParent.scrollTop(), left: this.scrollParent.scrollLeft() }),
        e &&
        (this.containment &&
          ((s = this.relativeContainer ? ((s = this.relativeContainer.offset()), [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : this.containment),
            t.pageX - this.offset.click.left < s[0] && (n = s[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < s[1] && (r = s[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > s[2] && (n = s[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > s[3] && (r = s[3] + this.offset.click.top)),
          i.grid &&
          ((t = i.grid[1] ? this.originalPageY + Math.round((r - this.originalPageY) / i.grid[1]) * i.grid[1] : this.originalPageY),
            (r = !s || t - this.offset.click.top >= s[1] || t - this.offset.click.top > s[3] ? t : t - this.offset.click.top >= s[1] ? t - i.grid[1] : t + i.grid[1]),
            (t = i.grid[0] ? this.originalPageX + Math.round((n - this.originalPageX) / i.grid[0]) * i.grid[0] : this.originalPageX),
            (n = !s || t - this.offset.click.left >= s[0] || t - this.offset.click.left > s[2] ? t : t - this.offset.click.left >= s[0] ? t - i.grid[0] : t + i.grid[0])),
          "y" === i.axis && (n = this.originalPageX),
          "x" === i.axis && (r = this.originalPageY)),
        {
          top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : o ? 0 : this.offset.scroll.top),
          left: n - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : o ? 0 : this.offset.scroll.left),
        }
      );
    },
    _clear: function () {
      this._removeClass(this.helper, "ui-draggable-dragging"),
        this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
        (this.helper = null),
        (this.cancelHelperRemoval = !1),
        this.destroyOnClear && this.destroy();
    },
    _trigger: function (t, e, s) {
      return (
        (s = s || this._uiHash()),
        b.ui.plugin.call(this, t, [e, s, this], !0),
        /^(drag|start|stop)/.test(t) && ((this.positionAbs = this._convertPositionTo("absolute")), (s.offset = this.positionAbs)),
        b.Widget.prototype._trigger.call(this, t, e, s)
      );
    },
    plugins: {},
    _uiHash: function () {
      return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs };
    },
  }),
    b.ui.plugin.add("draggable", "connectToSortable", {
      start: function (e, t, s) {
        var i = b.extend({}, t, { item: s.element });
        (s.sortables = []),
          b(s.options.connectToSortable).each(function () {
            var t = b(this).sortable("instance");
            t && !t.options.disabled && (s.sortables.push(t), t.refreshPositions(), t._trigger("activate", e, i));
          });
      },
      stop: function (e, t, s) {
        var i = b.extend({}, t, { item: s.element });
        (s.cancelHelperRemoval = !1),
          b.each(s.sortables, function () {
            var t = this;
            t.isOver
              ? ((t.isOver = 0),
                (s.cancelHelperRemoval = !0),
                (t.cancelHelperRemoval = !1),
                (t._storedCSS = { position: t.placeholder.css("position"), top: t.placeholder.css("top"), left: t.placeholder.css("left") }),
                t._mouseStop(e),
                (t.options.helper = t.options._helper))
              : ((t.cancelHelperRemoval = !0), t._trigger("deactivate", e, i));
          });
      },
      drag: function (s, i, o) {
        b.each(o.sortables, function () {
          var t = !1,
            e = this;
          (e.positionAbs = o.positionAbs),
            (e.helperProportions = o.helperProportions),
            (e.offset.click = o.offset.click),
            e._intersectsWith(e.containerCache) &&
            ((t = !0),
              b.each(o.sortables, function () {
                return (
                  (this.positionAbs = o.positionAbs),
                  (this.helperProportions = o.helperProportions),
                  (this.offset.click = o.offset.click),
                  this !== e && this._intersectsWith(this.containerCache) && b.contains(e.element[0], this.element[0]) && (t = !1),
                  t
                );
              })),
            t
              ? (e.isOver ||
                ((e.isOver = 1),
                  (o._parent = i.helper.parent()),
                  (e.currentItem = i.helper.appendTo(e.element).data("ui-sortable-item", !0)),
                  (e.options._helper = e.options.helper),
                  (e.options.helper = function () {
                    return i.helper[0];
                  }),
                  (s.target = e.currentItem[0]),
                  e._mouseCapture(s, !0),
                  e._mouseStart(s, !0, !0),
                  (e.offset.click.top = o.offset.click.top),
                  (e.offset.click.left = o.offset.click.left),
                  (e.offset.parent.left -= o.offset.parent.left - e.offset.parent.left),
                  (e.offset.parent.top -= o.offset.parent.top - e.offset.parent.top),
                  o._trigger("toSortable", s),
                  (o.dropped = e.element),
                  b.each(o.sortables, function () {
                    this.refreshPositions();
                  }),
                  (o.currentItem = o.element),
                  (e.fromOutside = o)),
                e.currentItem && (e._mouseDrag(s), (i.position = e.position)))
              : e.isOver &&
              ((e.isOver = 0),
                (e.cancelHelperRemoval = !0),
                (e.options._revert = e.options.revert),
                (e.options.revert = !1),
                e._trigger("out", s, e._uiHash(e)),
                e._mouseStop(s, !0),
                (e.options.revert = e.options._revert),
                (e.options.helper = e.options._helper),
                e.placeholder && e.placeholder.remove(),
                i.helper.appendTo(o._parent),
                o._refreshOffsets(s),
                (i.position = o._generatePosition(s, !0)),
                o._trigger("fromSortable", s),
                (o.dropped = !1),
                b.each(o.sortables, function () {
                  this.refreshPositions();
                }));
        });
      },
    }),
    b.ui.plugin.add("draggable", "cursor", {
      start: function (t, e, s) {
        var i = b("body"),
          s = s.options;
        i.css("cursor") && (s._cursor = i.css("cursor")), i.css("cursor", s.cursor);
      },
      stop: function (t, e, s) {
        s = s.options;
        s._cursor && b("body").css("cursor", s._cursor);
      },
    }),
    b.ui.plugin.add("draggable", "opacity", {
      start: function (t, e, s) {
        (e = b(e.helper)), (s = s.options);
        e.css("opacity") && (s._opacity = e.css("opacity")), e.css("opacity", s.opacity);
      },
      stop: function (t, e, s) {
        s = s.options;
        s._opacity && b(e.helper).css("opacity", s._opacity);
      },
    }),
    b.ui.plugin.add("draggable", "scroll", {
      start: function (t, e, s) {
        s.scrollParentNotHidden || (s.scrollParentNotHidden = s.helper.scrollParent(!1)),
          s.scrollParentNotHidden[0] !== s.document[0] && "HTML" !== s.scrollParentNotHidden[0].tagName && (s.overflowOffset = s.scrollParentNotHidden.offset());
      },
      drag: function (t, e, s) {
        var i = s.options,
          o = !1,
          n = s.scrollParentNotHidden[0],
          r = s.document[0];
        n !== r && "HTML" !== n.tagName
          ? ((i.axis && "x" === i.axis) ||
            (s.overflowOffset.top + n.offsetHeight - t.pageY < i.scrollSensitivity
              ? (n.scrollTop = o = n.scrollTop + i.scrollSpeed)
              : t.pageY - s.overflowOffset.top < i.scrollSensitivity && (n.scrollTop = o = n.scrollTop - i.scrollSpeed)),
            (i.axis && "y" === i.axis) ||
            (s.overflowOffset.left + n.offsetWidth - t.pageX < i.scrollSensitivity
              ? (n.scrollLeft = o = n.scrollLeft + i.scrollSpeed)
              : t.pageX - s.overflowOffset.left < i.scrollSensitivity && (n.scrollLeft = o = n.scrollLeft - i.scrollSpeed)))
          : ((i.axis && "x" === i.axis) ||
            (t.pageY - b(r).scrollTop() < i.scrollSensitivity
              ? (o = b(r).scrollTop(b(r).scrollTop() - i.scrollSpeed))
              : b(window).height() - (t.pageY - b(r).scrollTop()) < i.scrollSensitivity && (o = b(r).scrollTop(b(r).scrollTop() + i.scrollSpeed))),
            (i.axis && "y" === i.axis) ||
            (t.pageX - b(r).scrollLeft() < i.scrollSensitivity
              ? (o = b(r).scrollLeft(b(r).scrollLeft() - i.scrollSpeed))
              : b(window).width() - (t.pageX - b(r).scrollLeft()) < i.scrollSensitivity && (o = b(r).scrollLeft(b(r).scrollLeft() + i.scrollSpeed)))),
          !1 !== o && b.ui.ddmanager && !i.dropBehaviour && b.ui.ddmanager.prepareOffsets(s, t);
      },
    }),
    b.ui.plugin.add("draggable", "snap", {
      start: function (t, e, s) {
        var i = s.options;
        (s.snapElements = []),
          b(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function () {
            var t = b(this),
              e = t.offset();
            this !== s.element[0] && s.snapElements.push({ item: this, width: t.outerWidth(), height: t.outerHeight(), top: e.top, left: e.left });
          });
      },
      drag: function (t, e, s) {
        for (var i, o, n, r, a, l, h, p, c, f = s.options, u = f.snapTolerance, d = e.offset.left, g = d + s.helperProportions.width, m = e.offset.top, v = m + s.helperProportions.height, _ = s.snapElements.length - 1; 0 <= _; _--)
          (l = (a = s.snapElements[_].left - s.margins.left) + s.snapElements[_].width),
            (p = (h = s.snapElements[_].top - s.margins.top) + s.snapElements[_].height),
            g < a - u || l + u < d || v < h - u || p + u < m || !b.contains(s.snapElements[_].item.ownerDocument, s.snapElements[_].item)
              ? (s.snapElements[_].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, b.extend(s._uiHash(), { snapItem: s.snapElements[_].item })), (s.snapElements[_].snapping = !1))
              : ("inner" !== f.snapMode &&
                ((i = Math.abs(h - v) <= u),
                  (o = Math.abs(p - m) <= u),
                  (n = Math.abs(a - g) <= u),
                  (r = Math.abs(l - d) <= u),
                  i && (e.position.top = s._convertPositionTo("relative", { top: h - s.helperProportions.height, left: 0 }).top),
                  o && (e.position.top = s._convertPositionTo("relative", { top: p, left: 0 }).top),
                  n && (e.position.left = s._convertPositionTo("relative", { top: 0, left: a - s.helperProportions.width }).left),
                  r && (e.position.left = s._convertPositionTo("relative", { top: 0, left: l }).left)),
                (c = i || o || n || r),
                "outer" !== f.snapMode &&
                ((i = Math.abs(h - m) <= u),
                  (o = Math.abs(p - v) <= u),
                  (n = Math.abs(a - d) <= u),
                  (r = Math.abs(l - g) <= u),
                  i && (e.position.top = s._convertPositionTo("relative", { top: h, left: 0 }).top),
                  o && (e.position.top = s._convertPositionTo("relative", { top: p - s.helperProportions.height, left: 0 }).top),
                  n && (e.position.left = s._convertPositionTo("relative", { top: 0, left: a }).left),
                  r && (e.position.left = s._convertPositionTo("relative", { top: 0, left: l - s.helperProportions.width }).left)),
                !s.snapElements[_].snapping && (i || o || n || r || c) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, b.extend(s._uiHash(), { snapItem: s.snapElements[_].item })),
                (s.snapElements[_].snapping = i || o || n || r || c));
      },
    }),
    b.ui.plugin.add("draggable", "stack", {
      start: function (t, e, s) {
        var i,
          s = s.options,
          s = b.makeArray(b(s.stack)).sort(function (t, e) {
            return (parseInt(b(t).css("zIndex"), 10) || 0) - (parseInt(b(e).css("zIndex"), 10) || 0);
          });
        s.length &&
          ((i = parseInt(b(s[0]).css("zIndex"), 10) || 0),
            b(s).each(function (t) {
              b(this).css("zIndex", i + t);
            }),
            this.css("zIndex", i + s.length));
      },
    }),
    b.ui.plugin.add("draggable", "zIndex", {
      start: function (t, e, s) {
        (e = b(e.helper)), (s = s.options);
        e.css("zIndex") && (s._zIndex = e.css("zIndex")), e.css("zIndex", s.zIndex);
      },
      stop: function (t, e, s) {
        s = s.options;
        s._zIndex && b(e.helper).css("zIndex", s._zIndex);
      },
    });
  b.ui.draggable;
});

("use strict");
var APPHANDLER = (function () {
  //apphandlerglobal

  var package_price = [];
  var package_cost = [];
  var tagifyTo;

  var packages = 6;
  var option = "MONTH";

  //PRODUCT
  var product_id;
  var invalidStock = ["-", "+", "e", "."];
  var invalidPrice = ["-", "+", "e"];
  var addr = [];
  var available;
  var index = "new";
  var product_type = "ITEM";

  //CATEGORY
  var cat_index;
  var cat_id;
  var subcat_index;
  var subcat_id;
  //apphandlerglobal

  var _init = async function () {
    _check_url(window.location.pathname);

    $(window).on("popstate", function (e) {
      e.preventDefault();
      location.reload();
    });

    Array.from($(".menu-link,.logout,.profile")).forEach(function (element) {
      if (element.getAttribute("href")) {
        element.addEventListener("click", function (e) {
          e.preventDefault();
          $(".menu-item").removeClass("menu-item-active  menu-item-open");
          $("." + element.getAttribute("href")).addClass("menu-item-active menu-item-open");
          $(element).parent().addClass("menu-item-active menu-item-open");
          _loadpage(element.getAttribute("href"));
          // if($('#kt_aside').hasClass('aside-on')){
          //   $('#kt_aside').removeClass('aside-on');
          //   $('.aside-overlay').remove();
          //   $('#kt_body').removeAttr('data-offcanvas-aside');
          // }
          // $('#kt_aside_mobile_toggle').trigger('click');
        });
      }
    });
    // for settings
    $("#confirm_admin_password").on("click", function () {
      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["settings", "check_admin", $("#admin_password_check").val()]));
      $("#admin_password_check").val("");
    });
  };

  var _getParams = async function (url) {
    var params = {};
    var parser = document.createElement("a");
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  };
  var _sessionStorage = function (session, val) {
    // Check browser support
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem(session, val);
    } else {
      console.log("Sorry, your browser does not support Web Storage...");
    }
  };
  var _getItem = function (session) {
    return sessionStorage.getItem(session);
  };
  var _check_url = async function (url) {
    //fulfillment
    // _sessionStorage('fulfillment_table','tbl_fulfillment_request');
    // _sessionStorage('fulfillment_type','REQUEST');
    let check = await _getParams(url);
    $(".menu-item").removeClass("menu-item-active menu-item-open");

    if (check.view) {
      view = check.view;

      if (url.split("/")[2] == "superadmin") {
        _loadpage(url.split("/")[3], view);
        $("." + url.split("/")[3]).addClass("menu-item-active menu-item-open");
      } else {
        _loadpage(url.split("/")[4], view);
        $(".dashboard").addClass("menu-item-active menu-item-open");
      }
    } else {
      //alert(url);
      if (url.split("/")[2] == "superadmin") {
        if (url.split("/")[3] == "") {
          _loadpage("dashboard");
          $(".dashboard").addClass("menu-item-active menu-item-open");
        } else {
          _loadpage(url.split("/")[3]);
          $("." + url.split("/")[3]).addClass("menu-item-active menu-item-open");
        }
      } else if (url.split("/")[1] == "superadmin") {
        _loadpage(url.split("/")[2]);
        $("." + url.split("/")[2]).addClass("menu-item-active menu-item-open");
      } else {
        _loadpage("dashboard");
        $(".dashboard").addClass("menu-item-active menu-item-open");
      }
    }
  };

  var _modal_image = function () {
    $("body").delegate(".tba_image", "click", function () {
      let modal = document.getElementById("TopupModal");
      let img = document.getElementsByTagName("img");
      let modalImg = document.getElementById("img01");

      modal.style.display = "block";

      if (this.src) {
        modalImg.src = this.src;
      } else {
        modalImg.src = $(this)
          .css("background-image")
          .replace(/^url\(['"]?/, "")
          .replace(/['"]?\)$/, "");
      }
      $("#caption").empty().append($(this).attr("alt"));
    });
    $("body").delegate(".close,#TopupModal", "click", function () {
      let modal = document.getElementById("TopupModal");
      modal.style.display = "none";
    });
  };
  var _showToast = function (type, message) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer), toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({ icon: type, title: message });
  };
  var _showSwal = function (type, message) {
    swal.fire({
      text: message,
      icon: type,
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      customClass: {
        confirmButton: "btn font-weight-bold btn-light-primary",
      },
    });
  };
  var _ShowHidePassword = function (id) {
    $("#" + id + " span").on("click", function (e) {
      e.preventDefault();
      if ($("#" + id + " input").attr("type") == "text") {
        $("#" + id + " input").attr("type", "password");
        $("#" + id + " i").addClass("fa-eye-slash");
        $("#" + id + " i").removeClass("fa-eye");
      } else if ($("#" + id + " input").attr("type") == "password") {
        $("#" + id + " input").attr("type", "text");
        $("#" + id + " i").removeClass("fa-eye-slash");
        $("#" + id + " i").addClass("fa-eye");
      }
    });
  };
  var animateValueDecimal = function (obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = parseFloat(progress * (end - start) + start)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  var animateValue = function (obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  var _getlastpath = function (url) {
    let lastpath = url.split("/").pop();
    if (lastpath == "shop") {
      return false;
    } else if (lastpath == null || lastpath == "") {
      return false;
    } else {
      return lastpath;
    }
  };
  var _initAddr = function () {
    $('select[name="region"]').on("change", function (e) {
      e.preventDefault();
      $('select[name="province"]').empty().append('<option value="">Select Province</option>');
      $('select[name="city"]').empty().append('<option value="">Select Province first</option>');
      $('select[name="brgy"]').empty().append('<option value="">Select City first</option>');
      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["address", "fetch_province", this.value]));
    });
    $('select[name="province"]').on("change", function (e) {
      e.preventDefault();
      $('select[name="city"]').empty().append('<option value="">Select City</option>');
      $('select[name="brgy"]').empty().append('<option value="">Select City first</option>');
      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["address", "fetch_city", this.value]));
    });
    $('select[name="city"]').on("change", function (e) {
      e.preventDefault();
      $('select[name="brgy"]').empty().append('<option value="">Select Barangay</option>');
      _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Processing..."), _constructForm(["address", "fetch_barangay", this.value]));
    });
  };

  var _loadpage = function (page) {
    if (page.split("_")[1]) {
      val = page.split("_")[1];
    } else {
      val = false;
    }
    $.ajax({
      url: "controller/controller.php",
      type: "POST",
      data: {
        page: page,
      },
      dataType: "html",
      beforeSend: function () {
        window.history.pushState(null, null, page);
        KTApp.blockPage({
          overlayColor: "#000000",
          state: "primary",
          message: "Loading...",
        });
        $(".offcanvas-close, .offcanvas-overlay").trigger("click");
      },
      complete: function () {
        $("#kt_content").fadeIn(3000);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $("head > title")
          .empty()
          .append("Alchemia | " + page.split("_")[0].charAt(0).toUpperCase() + page.split("_")[0].slice(1));
        KTApp.unblockPage();
      },
      success: async function (response) {
        if (response) {
          $("#kt_content").empty();
          $("#kt_content")
            .append(response)
            .promise()
            .done(function () {
              _initview(page.split("_")[0], val);
            });
        } else {
        }
      },
      error: function (xhr, status, error) {
        if (xhr.status == 200) {
          Swal.fire("Ops!", "Check your internet connection.", "error");
        } else if (xhr.status == 500) {
          Swal.fire("Ops!", "Internal error: " + xhr.responseText, "error");
        } else if (status == "error") {
          Swal.fire({
            title: "Oopps!",
            text: "Your account was signed-out.",
            icon: "info",
            showCancelButton: false,
            confirmButtonText: "Ok, Got it",
            reverseButtons: true,
          }).then(function (result) {
            window.location.replace("login");
          });
        } else {
          console.log(xhr);
          console.log(status);
          Swal.fire("Ops!", "Something went wrong..", "error");
        }
      },
    });
  };

  var _initview = async function (view, val) {
    // _remove_Unwanted_Elements(["body > div.zoomContainer"]);
    _modal_image();
    if (!$(".modal.in").length) {
      $(".modal-dialog").css({
        top: 0,
        left: 0,
      });
    }
    $("#myModal").modal({
      backdrop: false,
      show: true,
    });

    $(".modal-dialog").draggable({
      handle: ".modal-header",
    });
    switch (String(view)) {
      case "dashboard": {
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["dashboard", "dashboard_count"]));

        break;
      }
      case "profile": {
        KTFormControls.init();
        KTProfile.init();
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["profile", "profile"]));
        break;
      }
      case "useraccount": {
        KTFormControls.init();
        //KTProfile.init();
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["useraccount", "users"]));
        break;
      }
      case "adminprofile": {
        KTFormControls.init();
        //KTProfile.init();
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["admin", "usersadmin"]));

        profile_avatar.onchange = (evt) => {
          const [file] = profile_avatar.files;
          if (file) {
            $(".profile_avatar").attr("src", URL.createObjectURL(file));
          }
        };

        $("body").delegate("#profile_avatar", "change", function (e) {
          e.stopImmediatePropagation();
          let element = $(this);
          let data_id = $('input[name="data_id"]').val();
          if (data_id !== "") {
            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["profile_admin", "profile_admin_img", $("#profile_avatar")[0].files[0], data_id]));
          }
        });
        $("#admin_profile_save").on("reset", function (e) {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["admin", "usersadmin"]));
        });
        $("body").delegate(".edit_admin", "click", function (e) {
          e.stopImmediatePropagation();
          let element = $(this);
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["admin", "usersadmin_account", element.attr("data_id")]));
        });
        $("body").delegate(".remove_admin", "click", function (e) {
          e.stopImmediatePropagation();
          let element = $(this);
          Swal.fire({
            text: "Do you want to remove this Account? ",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["admin", "usersadmin_remove", element.attr("data_id")]));
            }
          });
        });
        break;
      }

      case "learningmaterial": {
        KTFormControls.init();

        function all_material() {
          var search = $(".search_material").val();

          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Learning Material..."), _constructForm(["learningmaterial", "all_material", "", search]));
        }
        all_material();
        $("body").delegate(".search_material", "keyup", function (e) {
          e.preventDefault();
          all_material();
          //all_material();
        });
        $("body").delegate("#learningmaterial_form", "reset", function (e) {
          all_material();
        });
        $("body").delegate(".publish_material", "click", function (e) {
          let element = $(this);
          Swal.fire({
            text: "Do you want to publish this learning material? ",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial", "publish_material", element.attr("data-id")]));
              all_material();
            }
          });
        });

        $("body").delegate(".remove_material", "click", function (e) {
          let element = $(this);
          Swal.fire({
            text: "Do you want to remove this learning material? Note: this will permenantly deleted ",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-warning",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial", "remove_material", element.attr("data-id")]));
              all_material();
            }
          });
        });

        $("body").delegate(".unpublish_material", "click", function (e) {
          let element = $(this);
          Swal.fire({
            text: "Do you want to remove this learning material? Note: this will permenantly deleted ",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial", "unpublish_material", element.attr("data-id")]));
              all_material();
            }
          });
        });

        $("body").delegate(".edit_material", "click", function (e) {
          let element = $(this);
          e.stopImmediatePropagation();
          location.href = "editmaterial_" + element.attr("data-id");
          //_loadpage("editmaterial_"+element.attr('data-id'));
        });

        break;
      }
      case "editmaterial": {
        let id = val;
        KTFormControls.init();
        KTProfile.init();
        KTCardDraggable.init();
        KTDropzoneDemo.init();
        KTSummernoteDemo.init("setting");

        $("body").delegate(".texttospeech", "click", function (e) {
          let element = $(this);
          $synthes = new SpeechSynthesisUtterance(element.attr("data_content"));
          speechSynthesis.speak($synthes);
        });
        $("body").delegate(".texttospeechstop", "click", function (e) {
          let element = $(this);
          speechSynthesis.cancel();
        });

        function retrieve_main_page_setting() {
          var page = $(".cover_page").attr("data_page");
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Learning Material..."), _constructForm(["edit_setting_main", "retrieving_setting_main", id, page]));
        }
        retrieve_main_page_setting();

        $("body").delegate(".btn_cover_page", "click", function (e) {
          //e.preventDefault();
          $("#bgimage").removeClass("active");
          $("#bgcolor").removeClass("active");
          $("#cover_page").addClass("active");
          $(".cover_page").empty();
          $(".page_header").empty();
          $(".page_header").append("Material > Coverpage");
          $(".cover_page").attr("data_page", "main_page");
          dropitem();
          retrieve_material();
          retrieve_main_page_setting();
        });

        $("body").delegate(".material_name", "change", function (e) {
          let element = $(this);
          e.stopImmediatePropagation();
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["save_material_page", "save_main_page", id, element.val(), ""]));
        });
        $("body").delegate(".btn_hide", "click", function (e) {
          let element = $(this);
          $(".dropitem").empty();
        });
        // $("body").delegate(".btn_show", "click", function(e){
        //  	dropitem();
        // })

        $("body").delegate(".bg_set_color", "change", function (e) {
          let element = $(this);
          $(".colorpreset").empty();
          $(".colorpreset").css("background-color", element.val());
          $(".colorpreset").append("<h1>" + element.val() + "</h1>");
        });
        $("body").delegate(".font_set_color", "change", function (e) {
          let element = $(this);
          $(".colorpreset").css("color", element.val());
        });

        $("body").delegate(".update_bg_img", "click", function (e) {
          let element = $(this);
          var page = $(".cover_page").attr("data_page");
          var color = $("#bg_image_color").val();
          Swal.fire({
            text: "Do you want to set this as default back ground image and font color in page",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["save_material_page", "save_bg_img", id, element.attr("data_name"), page, color]));
              //all_material();
            }
          });
        });
        $("body").delegate(".save_scheme", "click", function (e) {
          let element = $(this);
          e.stopImmediatePropagation();
          var page = $(".cover_page").attr("data_page");
          Swal.fire({
            text: "Do you want to set this as default back ground and font color in all page",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest(
                "controller/controller.php",
                "POST",
                _constructBlockUi("blockPage", false, "Loading..."),
                _constructForm(["save_material_page", "save_scheme", id, $(".bg_set_color").val(), page, $(".font_set_color").val()])
              );
              //all_material();
            }
          });
        });

        $("body").delegate(".publish_material", "click", function (e) {
          let element = $(this);
          Swal.fire({
            text: "Do you want to publish this learning material? ",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial", "publish_material", val]));
              all_material();
            }
          });
        });

        //             $(".draggable").dblclick(function() {
        //   //code executed on jQuery double click rather than mouse double click
        //   alert('dblclick');
        // });
        // $(".draggable").click(function() {
        //   alert('click');
        //   $(this).dblclick();
        // });
        $("body").delegate(".draggable", "click", function (e) {
          let element = $(this);
          var data_action = element.attr("data_action");
          var page = $(".cover_page").attr("data_page");
          if (data_action == "add") {
            var drag_items = $(".cover_page .draggable");
            a = 0;
            drag_items.each(function (i) {
              $(this).attr("data_arrange", i);

              if ($(this).attr("data_id") == "") {
              }
              a = i + 1;
            });
            _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["add_material_details", element.attr("data_type"), val, a, page]));
            retrieve_material();
          } else if (data_action == "rearrange") {
            if (element.attr("data_type") == "heading") {
              $("#" + element.attr("data_type") + ' input[name="content"]').val(element.attr("data_content"));
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "spacer") {
              $("#" + element.attr("data_type") + ' input[name="content"]').val(element.attr("data_content"));
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "phrase") {
              $("#" + element.attr("data_type") + ' textarea[name="content"]').empty();
              $("#" + element.attr("data_type") + ' textarea[name="content"]').summernote("code", element.attr("data_content"));
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "audio") {
              $("#" + element.attr("data_type") + ' textarea[name="content"]').empty();
              $("#" + element.attr("data_type") + ' textarea[name="content"]').val(element.attr("data_content"));
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "image") {
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "video") {
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "identify") {
              $("#" + element.attr("data_type") + ' input[name="content"]').val(element.attr("data_content"));
              $("#" + element.attr("data_type") + ' input[name="ans"]').val(element.attr("data_ans"));
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "tof") {
              $("#" + element.attr("data_type") + ' input[name="content"]').val(element.attr("data_content"));
              $("#" + element.attr("data_type") + ' input[name="ans"]').val(element.attr("data_ans"));
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            } else if (element.attr("data_type") == "mc") {
              $("#" + element.attr("data_type") + ' input[name="content"]').val(element.attr("data_content"));
              $("#" + element.attr("data_type") + ' select[name="ans"]')
                .val(element.attr("data_ans"))
                .change();
              var choices = element.attr("data_choices").split(",");
              $("#" + element.attr("data_type") + ' input[name="qa"]').val(choices[0]);
              $("#" + element.attr("data_type") + ' input[name="qb"]').val(choices[1]);
              $("#" + element.attr("data_type") + ' input[name="qc"]').val(choices[2]);
              $("#" + element.attr("data_type") + ' input[name="qd"]').val(choices[3]);
              $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));
              $("#" + element.attr("data_type")).modal("show");
            }
          }
        });

        $("body").delegate(".btn_add_page", "click", function (e) {
          let element = $(this);
          Swal.fire({
            text: "Write something interesting:",
            icon: "question",
            input: "text",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Save",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["add_new_page", "add_new_page_material", val, result.value]));
              // /all_material();
            }
          });
        });

        $("body").delegate(".btn_retrieve_page", "click", function (e) {
          let element = $(this);
          $("#bgimage").removeClass("active");
          $("#bgcolor").removeClass("active");
          $("#cover_page").addClass("active");
          $(".cover_page").empty();
          $(".page_header").empty();
          $(".page_header").append("Material > " + element.attr("data_name"));
          $(".cover_page").attr("data_page", element.attr("data_id"));
          var page = $(".cover_page").attr("data_page");
          // alert('page : ' + page);
          // alert('val : ' + val);

          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial_edit", "retrieve_material", val, page]));

          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial_edit", "retrieve_detail", val, page]));

          retrieve_main_page_setting();

          //  alert(page);
          //  $('#topic_id').val(page);

          //  $('#add-quiz').removeClass('d-none');
          //  alert(page);
        });
        $("body").delegate(".btn_remove_material", "click", function (e) {
          let element = $(this);
          var form = element.attr("data_type");

          var data_id = $("#" + form).attr("data_id");

          Swal.fire({
            text: "Do you want to delete this  material? ",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["delete_material", "delete_material_id", data_id, form]));
            }
          });
        });

        $("body").delegate("#heading", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#spacer", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#phrase", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#audio", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#image", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#video", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#identify", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#tof", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });
        $("body").delegate("#mc", "hide.bs.modal", function (e) {
          retrieve_material();
          retrieve_main_page_setting();
        });

        $("body").delegate(".select_img", "click", function (e) {
          let element = $(this);
          var content = $('#image_form input[name="content"]').val();
          var value = content.split(",");
          if (value.length == 4) {
            _showToast("info", "cant add anymore");
          } else {
            if (content == "") {
              $('#image_form input[name="content"]').val(element.attr("data_name"));
            } else {
              $('#image_form input[name="content"]').val(content + "," + element.attr("data_name"));
            }
          }
        });

        function retrieve_img() {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["save_material_page", "retrieve_main_page_img", val, ""]));
        }

        retrieve_img();

        $("body").delegate(".btn_all_image", "click", function (e) {
          retrieve_img();
        });

        function retrieve_material() {
          var page = $(".cover_page").attr("data_page");
          $(".cover_page").empty();
          // $('.cover_page').append('<div class="card-header ribbon ribbon-clip ribbon-right">\
          //                          <div class="ribbon-target" style="top: 12px;">\
          //                           <span class="ribbon-inner bg-info"></span>'+page+'\
          //                          </div>\
          //                        </div>');
          // alert(val);
          // alert(page);

          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial_edit", "retrieve_material", val, page]));
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial_edit", "retrieve_pages", val, page]));
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial_edit", "retrieve_detail", val, page]));
        }
        retrieve_material();

        function dropitem() {
          // alert('drop item');
          $(".dropitem").empty();
          $(".dropitem").append(
            '<div class="row p-b-10">\
                                <!--<div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="heading" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center">\
                                                <i class="fas fa-heading display2 display3-lg" ></i><br>Heading\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>-->\
                                <div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"   data_type="spacer" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center">\
                                                <i class="fas fa-grip-lines display2 display3-lg" ></i><br>Spacer\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="phrase" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fab fa-stack-exchange display2 display3-lg"></i><br>Text and Image\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <!--<div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="image" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center"  >\
                                                <i class="fas fa-image display2 display3-lg"></i><br>Image\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>-->\
                                <div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="audio" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="far fa-file-audio display2 display3-lg"></i><br>Audio\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="video" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fas fa-video display2 display3-lg"></i><br>Video Link\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="tof" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fas fa-check-circle display2 display3-lg"></i><br>True or False\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="mc" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="far fa-list-alt display2 display3-lg"></i><br>Multiple Choice\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class="col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="identify" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fas fa-question display2 display3-lg"></i><br>Identification\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div id="add-quiz" class="d-none col-md-6 col-4 p-1" >\
                                    <div class="bg-gray-200 rounded-sm p-5" >\
                                        <div class="draggable"  data_type="identify" data_action="add" data_id="" data_arrange="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fas fa-file display2 display3-lg"></i><br>Quiz\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                          '
          );
        }
        dropitem();

        $(".cover_page").bind("DOMSubtreeModified", function () {
          if ($(".draggable").hasClass("draggable-source--is-dragging")) {
            var c_action = $(".draggable-source--is-dragging").attr("data_action");
            var c_type = $(".draggable-source--is-dragging").attr("data_type");
            $(".drag_material_item").attr("data_form", c_action);
            // if(c_action=="rearrange"){
            // 	alert(c_action);
            // }
          } else {
            var c_material = $(".drag_material_item").attr("data_form");
            $(".cover_page .draggable").attr("data_action", "rearrange");
            dropitem();

            if (c_material == "") {
            } else if (c_material == "rearrange") {
              // if($('.draggable').hasClass("draggable-original")){

              // }else{
              // 	//alert();
              // }

              var page = $(".cover_page").attr("data_page");
              var drag_items = $(".cover_page .draggable");
              drag_items.each(function (i) {
                $(this).attr("data_arrange", i);
                //alert(i);
                _ajaxrequest(
                  "controller/controller.php",
                  "POST",
                  _constructBlockUi("blockPage", false, "Rearranging..."),
                  _constructForm(["rearrange_material_details", $(this).attr("data_type"), val, i, page, $(this).attr("data_id")])
                );
              });
            } else {
              var page = $(".cover_page").attr("data_page");

              var drag_items = $(".cover_page .draggable");
              drag_items.each(function (i) {
                $(this).attr("data_arrange", i);
                if ($(this).attr("data_id") == "") {
                  _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["add_material_details", $(this).attr("data_type"), val, i, page]));
                }
              });
              drag_items.each(function (i) {
                $(this).attr("data_arrange", i);
                //alert(i);
                _ajaxrequest(
                  "controller/controller.php",
                  "POST",
                  _constructBlockUi("blockPage", false, "Rearranging..."),
                  _constructForm(["rearrange_material_details", $(this).attr("data_type"), val, i, page, $(this).attr("data_id")])
                );
              });

              $(".drag_material_item").attr("data_form", "");
            }
          }
        });

        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["retrieve_setting", "requisite_quiz", val]));
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["retrieve_setting", "requisite_prop", val]));

        $("body").delegate(".save_setting", "click", function (e) {
          if ($('#requisite_quiz_form input[name="quiz_item"]').val() != "" && $('#requisite_quiz_form input[name="passing_grade"]').val()) {
            _ajaxrequest(
              "controller/controller.php",
              "POST",
              _constructBlockUi("blockPage", false, "Loading..."),
              _constructForm([
                "save_setting",
                "save_setting_requisite",
                val,
                $('#requisite_quiz_form select[name="material_id"]').val(),
                $('#requisite_quiz_form input[name="quiz_item"]').val(),
                $('#requisite_quiz_form input[name="passing_grade"]').val(),
              ])
            );
          } else {
            alert("please complete form");
          }

          //retrieve_img();
        });

        break;
      }
      case "quiz": {
        KTFormControls.init();
        KTDropzoneDemo.init();
        function material_header() {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["all_material_header", "material_id"]));
        }
        function tbl_quiz() {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Quizes..."), _constructForm(["all_quiz", "tbl_quiz"]));
        }

        material_header();
        tbl_quiz();

        $("body").delegate("#quiz", "hide.bs.modal", function (e) {
          tbl_quiz();
        });
        $("body").delegate("#tof", "hide.bs.modal", function (e) {
          tbl_quiz();
        });
        $("body").delegate("#idnf", "hide.bs.modal", function (e) {
          tbl_quiz();
        });
        $("body").delegate("#mc", "hide.bs.modal", function (e) {
          tbl_quiz();
        });
        $("body").delegate("#mci", "hide.bs.modal", function (e) {
          tbl_quiz();
        });

        $("body").delegate(".edit_quiz", "click", function (e) {
          let element = $(this);
          $("#" + element.attr("data_type")).modal("show");
          $("#" + element.attr("data_type")).attr("data_id", element.attr("data_id"));

          if (element.attr("data_type") == "tof") {
            $("#" + element.attr("data_type") + '_quiz_update input[name="question"]').val(element.attr("data_question"));
            $("#" + element.attr("data_type") + '_quiz_update select[name="ans"]')
              .val(element.attr("data_answer"))
              .change();
          } else if (element.attr("data_type") == "idnf") {
            $("#" + element.attr("data_type") + '_quiz_update input[name="question"]').val(element.attr("data_question"));
            $("#" + element.attr("data_type") + '_quiz_update input[name="ans"]').val(element.attr("data_answer"));
          } else if (element.attr("data_type") == "mc") {
            var choices = element.attr("data_choices").split(",");
            $("#" + element.attr("data_type") + '_quiz_update input[name="question"]').val(element.attr("data_question"));
            $("#" + element.attr("data_type") + '_quiz_update input[name="qa"]').val(choices[0]);
            $("#" + element.attr("data_type") + '_quiz_update input[name="qb"]').val(choices[1]);
            $("#" + element.attr("data_type") + '_quiz_update input[name="qc"]').val(choices[2]);
            $("#" + element.attr("data_type") + '_quiz_update input[name="qd"]').val(choices[3]);
            $("#" + element.attr("data_type") + '_quiz_update select[name="ans"]').val(element.attr("data_answer"));
          } else if (element.attr("data_type") == "mci") {
            var choices = element.attr("data_choices").split(",");
            $("#" + element.attr("data_type") + '_quiz_update input[name="question"]').val(element.attr("data_question"));
            $("#" + element.attr("data_type") + '_quiz_update input[name="qa"]').val(choices[0]);
            $("#" + element.attr("data_type") + '_quiz_update input[name="qb"]').val(choices[1]);
            $("#" + element.attr("data_type") + '_quiz_update input[name="qc"]').val(choices[2]);
            $("#" + element.attr("data_type") + '_quiz_update input[name="qd"]').val(choices[3]);
            $("#" + element.attr("data_type") + '_quiz_update select[name="ans"]').val(element.attr("data_answer"));
          }
          _ajaxrequest(
            "controller/controller.php",
            "POST",
            _constructBlockUi("blockPage", false, "Preparing Editor..."),
            _constructForm(["save_material_page", "retrieve_quiz_pages", element.attr("data_header_id"), element.attr("data_page_id")])
          );

          //alert(element.attr('data_page_id'));
          //$('.page_quiz option[value="'+element.attr('data_page_id')+'"]').prop("selected", true).change();
          //$(".page_quiz").val(element.attr('data_page_id')).change();
        });

        $("body").delegate(".remove_quiz", "click", function (e) {
          let element = $(this);
          var data_id = element.attr("data_id");
          Swal.fire({
            text: "Do you want to delete this  Quiz? ",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: "Yes, proceed!",
            cancelButtonText: "No, cancel",
            customClass: {
              confirmButton: "btn font-weight-bold btn-primary",
              cancelButton: "btn font-weight-bold btn-default",
            },
          }).then(function (result) {
            if (result.value) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["delete_quiz", "delete_quiz_id", data_id]));
              tbl_quiz();
            }
          });
        });

        function retrieve_img_quiz() {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["save_material_page", "retrieve_quiz_img", "", ""]));
        }

        $("body").delegate(".select_input_img", "click", function (e) {
          $("#input_img").modal("show");
          let element = $(this);
          retrieve_img_quiz();
          var name = element.attr("name");
          $("#mci_quiz_update").attr("data_name", name);
        });

        $("body").delegate(".select_this_img", "click", function (e) {
          let image = $(this);
          var name = $("#mci_quiz_update").attr("data_name");
          $('#mci_quiz_update input[name="' + name + '"]').val(image.attr("data_name"));
          $("#input_img").modal("hide");
        });

        $("body").delegate("#kt_tab_pane_1", "click", function (e) {
          retrieve_img_quiz();
        });
        $("body").delegate(".retrieve_pages", "change", function (e) {
          let element = $(this);
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["save_material_page", "retrieve_quiz_pages", element.val(), ""]));
        });
        break;
      }
      case "report": {
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["report", "report_quiz"]));
      }

      //END ABOUT PRODUCT
      default:
        break;
    }
  };
  var _initContent = function (type) {
    switch (type) {
      case "overview": {
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["product_item_info", "fetch_overview", product_id]));
        index = "old";
        break;
      }
      case "availability": {
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["product_item_option", "fetch_availability", product_id]));
        $("#region").select2({
          placeholder: "Select a Region",
          width: "100%",
        });
        $("#province").select2({
          placeholder: "Select a Province",
          width: "100%",
        });
        $("#city").select2({
          placeholder: "Select a City",
          width: "100%",
        });
        $("#barangay").select2({
          placeholder: "Select a Barangay",
          width: "100%",
        });
        break;
      }
      case "gallery": {
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["product_item_info", "fetch_gallery", product_id]));
        break;
      }
      case "pricing": {
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["product_item_info", "fetch_pricing", product_id]));
        break;
      }
      case "items": {
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Preparing Editor..."), _constructForm(["product_item_info", "fetch_items", product_id]));

        break;
      }
      default:
        break;
    }
  };
  var _initAddress = function (type, response, value) {
    if (response) {
      $("#" + type).empty();
      for (let i = 0; i < response.length; i++) {
        $("#" + type).append('<option value="' + response[i].code + '">' + response[i].location + "</option>");
      }
      if (value) {
        if (value.constructor !== Array) {
          value = value.split(",");
        }
        $("#" + type)
          .val(value)
          .change();
        addr[type] = value;
      } else {
        addr[type] = null;
      }
    }
  };
  var _initAddress2 = function (type, response) {
    if (response) {
      // $('select[name="'+type+'"]').empty();
      for (let i = 0; i < response.length; i++) {
        $('select[name="' + type + '"]').append('<option value="' + response[i].code + '">' + response[i].location + "</option>");
      }
    }
  };
  // start making formdata
  var _constructForm = function (args) {
    let formData = new FormData();
    for (var i = 1; args.length + 1 > i; i++) {
      formData.append("data" + i, args[i - 1]);
    }
    return formData;
  };

  var _constructBlockUi = function (type, element, message) {
    let formData = new FormData();
    formData.append("type", type);
    formData.append("element", element);
    formData.append("message", message);
    if (formData) {
      return formData;
    }
  };

  var _construct = async function (response, type, element, object) {
    // alert(JSON.stringify(response));
    switch (type) {
      case "profile": {
        if (response != false) {
          if (response.country) {
            let optgroup = '<optgroup label="Other countries">';
            for (let i = 0; i < response.country.length; i++) {
              if (response.country[i].iso == "PH" || response.country[i].iso == "US" || response.country[i].iso == "GB") {
                $('select[name="country"]').append('<option phonecode="' + response.country[i].phonecode + '" value="' + response.country[i].iso + '">' + response.country[i].country_name + "</option>");
              } else {
                optgroup += '<option phonecode="' + response.country[i].phonecode + '" value="' + response.country[i].iso + '">' + response.country[i].country_name + "</option>";
              }
            }
            $('select[name="country"]').append(optgroup + "</optgroup>");
          }
          if (response.country) {
            let optgroup = '<optgroup label="Others">';
            for (let i = 0; i < response.country.length; i++) {
              if (response.country[i].iso == "PH") {
                $('select[name="phonecode"]').append('<option value="' + response.country[i].phonecode + '">+' + response.country[i].phonecode + "</option>");
              } else {
                optgroup += '<option value="' + response.country[i].phonecode + '">+' + response.country[i].phonecode + "</option>";
              }
            }
            $('select[name="phonecode"]').append(optgroup + "</optgroup>");
          }
          $("#kt_profile_avatar").on("change", function (e) {
            e.preventDefault();
            alert($("#profile_avatar")[0].files[0]);
            if ($("#profile_avatar")[0].files[0]) {
              _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Saving..."), _constructForm(["profile", "save_profile_image", $("#profile_avatar")[0].files[0]]));
            }
          });

          if (response.profile) {
            $('input[name="fname"]').val(response.profile.fname);
            $('input[name="mname"]').val(response.profile.mname);
            $('input[name="lname"]').val(response.profile.lname);
            $("#kt_profile_avatar").css("background-image", "url(../images/admin_images/" + response.profile.profile_img + ")");
            $('select[name="country"] option[value="' + response.profile.country + '"]')
              .prop("selected", true)
              .change();
            $('select[name="phonecode"] option[value="' + response.profile.phone_code + '"]')
              .prop("selected", true)
              .change();
            $('input[name="city"]').val(response.profile.city);
            $('input[name="mobile"]').val(response.profile.phone);
            $('input[name="email"]').val(response.profile.email);
            $('input[name="username"]').val(response.profile.username);
            //nav_bar
            $(".username").text(response.profile.username);
            $(".e-mail").text(response.profile.email);
            // sidebar
            $(".full_name").text(response.profile.fname + " " + response.profile.lname);
            $(".user_type").text(response.profile.username);
            $(".image")
              .empty()
              .append(
                response.profile.profile_img == "default.png"
                  ? '<span class="font-size-h3 symbol-label font-weight-boldest text-uppercase">' + response.profile.fname[0] + "</span>"
                  : '<div class="symbol-label"  style="background-image:url(../images/admin_images/' + response.profile.profile_img + ')"><i class="symbol-badge symbol-badge-bottom bg-success"></div>'
              );
          }
        }
        break;
      }
      case "save_profile_image": {
        _showToast(response.type, response.message);
        if (response.result != false) {
          $("#kt_profile_avatar > div").css("background-image", "url(../)");
          $("#kt_header_mobile_topbar_toggle > span > div").css("background-image", "url(../images/admin_images/" + response.profile_img + ")");
          $("#kt_profile_avatar").css("background-image", "url(../images/admin_images/" + response.profile_img + ")");
          $("#kt_quick_user > div.offcanvas-content.pr-5.mr-n5.scroll > div.d-flex.align-items-center.mt-5 > div.symbol.symbol-100.mr-5.symbol-light-primary,#kt_quick_user_toggle > span")
            .empty()
            .append('<div class="symbol-label" style="background-image:url(../images/admin_images/' + response.profile_img + ')"></div>');
          $(".image")
            .empty()
            .append('<div class="symbol-label" style="background-image:url(../images/admin_images/' + response.profile_img + ')"></div>');
        }
        break;
      }

      case "users": {
        //alert(response[0].mobile);
        KTDatatablesDataSourceAjaxClient.init("tbl_users", response);
        break;
      }
      case "usersadmin": {
        //alert(response);
        KTDatatablesDataSourceAjaxClient.init("tbl_usersadmin", response);
        break;
      }
      case "usersadmin_account": {
        $('input[name="fname"]').val(response.fname);
        $('input[name="mname"]').val(response.mname);
        $('input[name="lname"]').val(response.lname);
        $('input[name="email"]').val(response.email);
        $('input[name="phone"]').val(response.phone);
        $('input[name="username"]').val(response.username);
        $('input[name="data_id"]').val(response.id);
        $(".profile_avatar").attr("src", response.profile_img);
        $("#admin_profile_save").attr("data-id", response.id);
        $("#exampleSelect1")
          .find("option[value=" + response.role + "]")
          .attr("selected", "selected");
        if (response.status == 0) {
          $('input[name="profile_status"]').prop("checked", false);
        } else {
          $('input[name="profile_status"]').prop("checked", true);
        }
        $("#adminmodal").modal("show");

        break;
      }
      case "usersadmin_remove": {
        if (response.type == true) {
          _showToast(response.type, response.message);
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Profile..."), _constructForm(["admin", "usersadmin"]));
        } else {
          _showToast(response.type, response.message);
        }
      }
      case "profile_admin_img": {
        _showToast(response.type, response.message);
        break;
      }
      case "all_material": {
        if (response.length) {
          $(".learningmaterial_not_publish").empty();
          $(".learningmaterial_published").empty();
          for (var i = 0; i < response.length; i++) {
            var color = response[i].setting.split(";");
            if (response[i].status == "0") {
              $(".learningmaterial_not_publish").append(
                '\
              					<div class="col-lg-3 col-sm-6 col-md-4" style="height:300px;">\
					                <div class="card card-custom bg-light card-stretch gutter-b" style=\'' +
                response[i].setting +
                '\'">\
					                	<div class="btn-group" role="group" aria-label="Button group with nested dropdown">\
				                            <button type="button" class="btn btn-dark font-weight-bold edit_material" data-id="' +
                response[i].id +
                '"><i class="fa fa-edit"></i> Edit</button>\
				                            <button type="button" class="btn btn-primary font-weight-bold publish_material" data-id="' +
                response[i].id +
                '" ><i class="fa fa-check"></i> Publish</button>\
				                    	</div>\
					                    <div class="card-body" >\
					                        <span class="card-title font-weight-bolder  font-size-h2 mb-0 mt-6 d-block text-hover-info" style="' +
                color[0] +
                '">' +
                response[i].number +
                " : " +
                response[i].name +
                '</span>\
					                        <span class="font-weight-bold font-size-sm" style="' +
                color[0] +
                '">Pages(' +
                response[i].pages +
                ')</span><br><span class="font-weight-bold  font-size-sm" style="' +
                color[0] +
                '">' +
                response[i].date_created +
                '</span><hr>\
					                        </div>\
				                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">\
				                            <button type="button" class="btn btn-danger font-weight-bold text-white remove_material" data-id="' +
                response[i].id +
                '">Remove</button>\
				                    	</div>\
					                </div>\
					            </div>'
              );
            }
            if (response[i].status == "1") {
              $(".learningmaterial_published").append(
                '\
              					<div class="col-lg-3 col-sm-6 col-md-4" style="height:300px;">\
					                <div class="card card-custom bg-light card-stretch gutter-b" style=\'' +
                response[i].setting +
                '\'">\
					                	<div class="btn-group" role="group" aria-label="Button group with nested dropdown">\
				                            <button type="button" class="btn btn-dark font-weight-bold edit_material" data-id="' +
                response[i].id +
                '"><i class="fa fa-edit"></i> Edit</button>\
				                            <button type="button" class="btn btn-success font-weight-bold unpublish_material" data-id="' +
                response[i].id +
                '" ><i class="fa fas fa-arrow-up"></i> Unpublish</button>\
				                    	</div>\
					                    <div class="card-body">\
					                        <span class="card-title font-weight-bolder font-size-h2 mb-0 mt-6 d-block text-hover-info" style="' +
                color[0] +
                '">' +
                response[i].number +
                " : " +
                response[i].name +
                '</span>\
					                        <span class="font-weight-bold font-size-sm" style="' +
                color[0] +
                '">Pages(' +
                response[i].pages +
                ')</span><br><span class="font-weight-bold font-size-sm" style="' +
                color[0] +
                '">' +
                response[i].date_created +
                '</span><hr>\
					                        </div>\
				                        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">\
				                            <button type="button" class="btn btn-danger font-weight-bold text-white remove_material" data-id="' +
                response[i].id +
                '">Remove</button>\
				                    	</div>\
					                </div>\
					            </div>'
              );
            }
          }
        }
        break;
      }
      case "publish_material":
      case "remove_material":
      case "unpublish_material": {
        _showToast(response.type, response.message);
        break;
      }

      case "retrieve_material": {
        $(".material_name").empty();
        $(".material_name").attr("value", response.name);
        break;
      }
      case "retrieve_pages": {
        if (response.length) {
          $("#pages").empty();
          $("#pages").append('<a data-toggle="tab" href="#cover_page" class="topic-0 btn_cover_page btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 btn-block active">Cover page</a>');
          for (var i = 0; i <= response.length - 1; i++) {
            if (response[i].name !== "main_page") {
              // alert(response[i].page_id);
              $("#pages").append(
                '<a data-toggle="tab" class="topic-' +
                response[i].page_id +
                ' btn_retrieve_page btn_show btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 btn-block" href="#cover_page" data_name="' +
                response[i].name +
                '" data_id="' +
                response[i].page_id +
                '">' +
                response[i].name +
                "</a>"
              );
            }
          }
        } else {
          $("#pages").empty();
          $("#pages").append('<a data-toggle="tab" href="#cover_page" class="btn_cover_page btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 btn-block active">Cover page</a>');
        }

        Material.addEvents();
        break;
      }
      case "save_scheme":
      case "save_bg_img":
      case "save_main_page": {
        _showToast(response.type, response.message);
        break;
      }

      case "retrieve_main_page_img": {
        if (response.length) {
          $(".page_img").empty();
          for (var i = 0; i < response.length; i++) {
            $(".page_img").append(
              '<div class="col-md-3 col-6 p-3">\
                            <img src="../images/packages/' +
              response[i].img_name +
              '" data_name="' +
              response[i].img_name +
              '" class="img-thumbnail  update_bg_img" width="100%" style="height:200px;" alt="' +
              response[i].img_name +
              '">\
                        </div>'
            );
          }
          $(".img_selection").empty();
          for (var i = 0; i < response.length; i++) {
            $(".img_selection").append(
              '<div class="col-md-3 col-6 p-5">\
                            <img src="../images/packages/' +
              response[i].img_name +
              '" data_name="' +
              response[i].img_name +
              '" class="img-thumbnail  select_img" width="100%" style="height:200px;" alt="' +
              response[i].img_name +
              '">\
                        </div>'
            );
          }
        }
        break;
      }
      case "retrieve_quiz_img": {
        if (response.length) {
          $(".page_img").empty();
          for (var i = 0; i < response.length; i++) {
            $(".page_img").append(
              '<div class="col-md-3 col-6 p-3">\
                            <img src="../images/packages/' +
              response[i].img_name +
              '" data_name="' +
              response[i].img_name +
              '" class="img-thumbnail  select_this_img" width="100%" style="height:200px;" alt="' +
              response[i].img_name +
              '">\
                        </div>'
            );
          }
        }
        break;
      }
      case "retrieving_setting_main": {
        //alert(response.setting);
        $(".cover_page").attr("style", response.setting);

        break;
      }
      case "phrase":
      case "image":
      case "audio":
      case "video":
      case "spacer":
      case "identify":
      case "tof":
      case "mc":
      case "heading": {
        //_showToast(response.type,response.message);
        $('.cover_page [data_arrange="' + response.data_arrange + '"]').attr("data_id", response.data_id);

        break;
      }
      case "retrieve_detail": {
        if (response.length) {
          for (var i = 0; i <= response.length - 1; i++) {
            var type = response[i].setting;
            var h_color = response[i].h_setting;
            var p_color = response[i].p_setting;

            if (p_color == null && h_color != null) {
              var color = h_color.split(";");
              var color = color[0];
            } else if (h_color == null && p_color != null) {
              var color = p_color.split(";");
              var color = color[0];
            } else {
              var color = "color:white";
            }
            // alert(i);

            if (response[i].data_type == "heading") {
              if (response[i].content !== null) {
                var array = type.split(",");

                // /alert(type);
                $(".cover_page").append(
                  '\
                                <div class="draggable"  data_type="heading" data_action="rearrange" data_content="' +
                  response[i].content +
                  '" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                    <div class="draggable-handle ' +
                  array[1] +
                  '">\
                                        <' +
                  array[0] +
                  ">" +
                  response[i].content +
                  "</" +
                  array[0] +
                  ">\
                                    </div>\
                                </div>"
                );
              } else {
                $(".cover_page").append(
                  '\
                                <div class="draggable"  data_type="heading" data_action="rearrange" data_content="" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                    <div class="draggable-handle text-center">\
                                        <i class="fas fa-heading display2 display3-lg" ></i><br>Heading\
                                    </div>\
                                </div>'
                );
              }
            } else if (response[i].data_type == "spacer") {
              if (response[i].setting !== null) {
                $(".cover_page").append(
                  '\
                                <div class="draggable " style="border:1px dashed black;"  data_type="spacer" data_action="rearrange" data_content="' +
                  response[i].content +
                  '" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                    <div class="draggable-handle text-left p-' +
                  type +
                  '" style="bor">\
                                    </div>\
                                </div>'
                );
              } else {
                $(".cover_page").append(
                  '\
                                <div class="draggable"   data_type="spacer" data_action="rearrange" data_content=""  data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                    <div class="draggable-handle text-center">\
                                        <i class="fas fa-grip-lines display2 display3-lg" ></i><br>Spacer\
                                    </div>\
                                </div>'
                );
              }
            } else if (response[i].data_type == "audio") {
              if (response[i].setting !== null) {
                $(".cover_page").append(
                  '\
                                <div class="draggable "  data_type="audio" data_action="rearrange" data_content="' +
                  response[i].content +
                  '" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                    <div class="draggable-handle text-left p-3"  style="border:1px dashed black;">\
                                    ' +
                  response[i].content +
                  '\
                                    </div>\
                                    <button class="texttospeech btn btn-primary" data_content="' +
                  response[i].content +
                  '"><i class="fas fa-play"></i> Play Sound</button>\
                                    <button class="texttospeechstop btn btn-danger"><i class="fas fa-stop-circle"></i> Stop</button>\
                                </div>'
                );
              } else {
                $(".cover_page").append(
                  '\
                                <div class="draggable"   data_type="audio" data_action="rearrange" data_content=""  data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                    <div class="draggable-handle text-center">\
                                        <i class="far fa-file-audio display2 display3-lg" ></i><br>Audio\
                                    </div>\
                                </div>'
                );
              }
            } else if (response[i].data_type == "phrase") {
              if (response[i].content !== null) {
                var content = response[i].content.replace("'", "");

                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="phrase" data_action="rearrange" data_content=\'' +
                  content +
                  "' data_id=\"" +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                            <div class="draggable-handle ' +
                  type +
                  '" >\
                                                ' +
                  content +
                  "\
                                            </div>\
                                        </div>"
                );
              } else {
                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="phrase" data_action="rearrange" data_content="" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fab fa-stack-exchange display2 display3-lg"></i><br>Text and Image\
                                            </div>\
                                        </div>'
                );
              }
            } else if (response[i].data_type == "identify") {
              if (response[i].content !== null) {
                //var array = type.split(",");
                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="identify" data_action="rearrange" data_content="' +
                  response[i].content +
                  '" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '" data_ans="' +
                  response[i].data_ans +
                  '">\
                                            <div class="draggable-handle ' +
                  type +
                  '" >\
                                            	<div class="form-group row ">\
												    <div class="col-4 col-md-2">\
												     <input class="form-control  form-control-solid" type="text" value="' +
                  response[i].data_ans +
                  '" id="example-text-input"/>\
												    </div>\
												    <label  class="col-8 col-md-10 col-form-label" style="' +
                  color +
                  '">' +
                  response[i].content +
                  "</label>\
											</div>\
                                        </div>"
                );
              } else {
                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="identify" data_action="rearrange" data_content="" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '" data_ans="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fas fa-question display2 display3-lg"></i><br>Identification\
                                            </div>\
                                        </div>'
                );
              }
            } else if (response[i].data_type == "tof") {
              if (response[i].content !== null) {
                //var array = type.split(",");
                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="tof" data_action="rearrange" data_content="' +
                  response[i].content +
                  '" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '" data_ans="' +
                  response[i].data_ans +
                  '">\
                                            <div class="draggable-handle ' +
                  type +
                  '" >\
                                            	<div class="form-group row ">\
												    <div class="col-4 col-md-2">\
												     <input class="form-control  form-control-solid" type="text" value="' +
                  response[i].data_ans +
                  '" id="example-text-input"/>\
												    </div>\
												    <label  class="col-8 col-md-10 col-form-label" style="' +
                  color +
                  '">' +
                  response[i].content +
                  "</label>\
											</div>\
                                        </div>"
                );
              } else {
                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="tof" data_action="rearrange" data_content="" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '" data_ans="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="fas fa-check-circle display2 display3-lg"></i><br>True or False\
                                            </div>\
                                        </div>'
                );
              }
            } else if (response[i].data_type == "mc") {
              if (response[i].content !== null) {
                var choices = response[i].setting.split(",");
                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="mc" data_action="rearrange" data_content="' +
                  response[i].content +
                  '" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '" data_choices="' +
                  response[i].setting +
                  '" data_ans="' +
                  response[i].data_ans +
                  '">\
                                            <div class="draggable-handle " >\
                                            	<div class="form-group row ">\
												    <div class="col-4 col-md-2">\
												     <input class="form-control  form-control-solid" type="text" value="' +
                  response[i].data_ans +
                  '" id="example-text-input"/>\
												    </div>\
												    <label  class="col-8 col-md-10 col-form-label" style="' +
                  color +
                  '">' +
                  response[i].content +
                  '</label>\
												    <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                  color +
                  '">a.) ' +
                  choices[0] +
                  '</label>\
												    <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                  color +
                  '">b.) ' +
                  choices[1] +
                  '</label>\
												    <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                  color +
                  '">c.) ' +
                  choices[2] +
                  '</label>\
												    <label  class="col-12 col-md-6 col-form-label text-center" style="' +
                  color +
                  '">d.) ' +
                  choices[3] +
                  "</label>\
												</div>\
                                        </div>"
                );
              } else {
                $(".cover_page").append(
                  '\
                               <div class="draggable"  data_type="mc" data_action="rearrange" data_content="" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '" data_choices="" data_ans="">\
                                            <div class="draggable-handle text-center" >\
                                                <i class="far fa-list-alt display2 display3-lg"></i><br>Multiple Choices\
                                            </div>\
                                        </div>'
                );
              }
            } else if (response[i].data_type == "video") {
              if (response[i].content !== null) {
                var link = response[i].content;
                var link = link.split("/");

                if (link[2] == "www.youtube.com") {
                  var link = link[3].replace("watch?v=", "");
                  $(".cover_page").append(
                    '\
	                               <div class="draggable"  data_type="video" data_action="rearrange" data_content="' +
                    response[i].content +
                    '" data_id="' +
                    response[i].data_id +
                    '" data_arrange="' +
                    response[i].data_arrange +
                    '">\
	                                            <div class="draggable-handle ' +
                    type +
                    ' bg-white p-3" >\
	                                            <div class="embed-responsive embed-responsive-16by9 ">\
	                                            	<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' +
                    link +
                    '?rel=0" allowfullscreen></iframe>\
												</div>\
	                                            </div>\
	                                        </div>'
                  );
                }
              } else {
                $(".cover_page").append(
                  '\
	                               <div class="draggable"  data_type="video" data_action="rearrange" data_content="" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
	                                            <div class="draggable-handle text-center" >\
	                                                <i class="fa fa-video display2 display3-lg"></i><br>Video\
	                                            </div>\
	                                        </div>'
                );
              }
            } else if (response[i].data_type == "image") {
              if (response[i].content !== null) {
                var array = response[i].content.split(",");

                if (array.length == 1) {
                  $(".cover_page").append(
                    '\
                               <div class="draggable"  data_type="image" data_action="rearrange" data_content="" data_id="' +
                    response[i].data_id +
                    '" data_arrange="' +
                    response[i].data_arrange +
                    '">\
                                            <div class="draggable-handle " >\
                                                <div class="row"><div class="col-md-12"><img src="../images/packages/' +
                    array[0] +
                    '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                  );
                } else if (array.length == 2) {
                  $(".cover_page").append(
                    '\
                               <div class="draggable"  data_type="image" data_action="rearrange" data_content="" data_id="' +
                    response[i].data_id +
                    '" data_arrange="' +
                    response[i].data_arrange +
                    '">\
                                            <div class="draggable-handle " >\
                                                <div class="row"><div class="col-md-6 col-6"><img src="../images/packages/' +
                    array[0] +
                    '" class="img-thumbnail " width="100%" ></div><div class="col-md-6 col-6"><img src="../images/packages/' +
                    array[1] +
                    '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                  );
                } else if (array.length == 3) {
                  $(".cover_page").append(
                    '\
                               <div class="draggable"  data_type="image" data_action="rearrange" data_content="" data_id="' +
                    response[i].data_id +
                    '" data_arrange="' +
                    response[i].data_arrange +
                    '">\
                                            <div class="draggable-handle " >\
                                                <div class="row"><div class="col-md-4 col-6"><img src="../images/packages/' +
                    array[0] +
                    '" class="img-thumbnail " width="100%" ></div><div class="col-md-4 col-6"><img src="../images/packages/' +
                    array[1] +
                    '" class="img-thumbnail " width="100%" ></div><div class="col-md-4 col-6"><img src="../images/packages/' +
                    array[2] +
                    '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                  );
                } else if (array.length == 4) {
                  $(".cover_page").append(
                    '\
                               <div class="draggable"  data_type="image" data_action="rearrange" data_content="" data_id="' +
                    response[i].data_id +
                    '" data_arrange="' +
                    response[i].data_arrange +
                    '">\
                                            <div class="draggable-handle " >\
                                                <div class="row"><div class="col-md-3 col-6"><img src="../images/packages/' +
                    array[0] +
                    '" class="img-thumbnail " width="100%" ></div><div class="col-md-3 col-6"><img src="../images/packages/' +
                    array[1] +
                    '" class="img-thumbnail " width="100%" ></div><div class="col-md-3 col-6"><img src="../images/packages/' +
                    array[2] +
                    '" class="img-thumbnail " width="100%" ></div><div class="col-md-3 col-6"><img src="../images/packages/' +
                    array[3] +
                    '" class="img-thumbnail " width="100%" ></div></div>\
                                            </div>\
                                        </div>'
                  );
                }

                //
              } else {
                $(".cover_page").append(
                  '\
	                               <div class="draggable"  data_type="image" data_action="rearrange" data_content="" data_id="' +
                  response[i].data_id +
                  '" data_arrange="' +
                  response[i].data_arrange +
                  '">\
	                                            <div class="draggable-handle text-center" >\
	                                                <i class="fa fa-image display2 display3-lg"></i><br>Image\
	                                            </div>\
	                                        </div>'
                );
              }
            }
          }
        } else {
          $(".cover_page").empty();
        }

        var page = $(".cover_page").attr("data_page");
        // alert(' page : ' + page);
        $("#topic_id").val(page);
        if (page > 0) {
          $("#add-quiz").removeClass("d-none");
        } else {
          $("#add-quiz").addClass("d-none");
        }

        break;
      }

      case "add_new_page_material": {
        _showToast(response.type, response.message);
        _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading..."), _constructForm(["learningmaterial_edit", "retrieve_pages", val]));
        break;
      }
      case "delete_material_id": {
        _showToast(response.type, response.message);
        if (response.type == "success") {
          $("#" + response.form).modal("hide");
        }
        break;
      }
      case "material_id": {
        if (response.length) {
          $('#quiz_form select[name="material_id"]').empty();
          $('#quiz_form select[name="material_id"]').append("<option></option>");
          for (var i = 0; i < response.length; i++) {
            $('#quiz_form select[name="material_id"]').append('<option value="' + response[i].id + '">' + response[i].name + "</option>");
          }
        }
        break;
      }
      case "requisite_quiz": {
        if (response.length) {
          $(".material_header_id_selector").empty();
          $(".material_header_id_selector").append("<option></option>");
          for (var i = 0; i < response.length; i++) {
            $(".material_header_id_selector").append('<option value="' + response[i].id + '">' + response[i].name + "</option>");
          }
        }
        break;
      }
      case "requisite_prop": {
        $(".material_header_id_selector").val(response.requisite).change();
        $('#requisite_quiz_form input[name="quiz_item"]').val(response.quiz_item);
        $('#requisite_quiz_form input[name="passing_grade"]').val(response.passing_grade);
        break;
      }
      case "retrieve_quiz_pages": {
        //alert(response.length);
        if (response.length) {
          $(".page_quiz").empty();
          $(".page_quiz").append("<option></option>");
          for (var i = 0; i < response.length; i++) {
            //alert(i);
            $(".page_quiz").append('<option value="' + response[i].id + '">' + response[i].name + "</option>");
            if (response[i].page_id != "" || response[i].page_id != 0) {
              //alert(response[i].page_id);
              $(".page_quiz").val(response[i].page_id).change();
            }
          }
        }
        break;
      }
      case "tbl_quiz": {
        if (response.length) {
          KTDatatablesDataSourceAjaxClient.init("tbl_quiz", response);
        }
        break;
      }
      case "save_setting_requisite": {
        //alert(response.type);
        _showToast(response.type, response.message);
        break;
      }
      case "report_quiz": {
        KTDatatablesDataSourceAjaxClient.init("tbl_report", response);
        break;
      }
      case "dashboard_count": {
        $("#total-admin").empty();
        $("#total-user").empty();
        $("#total-quiz").empty();
        $("#total-record").empty();

        $("#total-admin").append(response.admin);
        $("#total-user").append(response.user);
        $("#total-quiz").append(response.quiz);
        $("#total-record").append(response.record);
        break;
      }
      default:
        // code block
        break;
    }
  };
  var _ajaxrequest = async function (thisurl, ajaxtype, blockUi, formData) {
    return new Promise((resolve, reject) => {
      let y = true;
      $.ajax({
        url: thisurl,
        type: ajaxtype,
        data: formData,
        contentType: false,
        processData: false,
        dataType: "json",
        beforeSend: function () {
          if (blockUi.get("type") == "blockPage") {
            if (blockUi.get("message") != "false") {
              KTApp.blockPage({
                overlayColor: "#000000",
                state: "primary",
                message: blockUi.get("message"),
              });
            } else {
              KTApp.blockPage();
            }
          } else if (blockUi.get("type") == "blockContent") {
            KTApp.block(blockUi.get("element"));
          } else {
          }
        },
        complete: function () {
          if (blockUi.get("type") == "blockPage") {
            KTApp.unblockPage();
          } else if (blockUi.get("type") == "blockContent") {
            KTApp.unblock(blockUi.get("element"));
          } else {
          }
          resolve(y);
        },
        success: function (res) {
          // alert(JSON.stringify(res));
          if (res.status == "success") {
            if (window.atob(res.payload) != false) {
              _construct(JSON.parse(window.atob(res.payload)), formData.get("data2"));
            } else {
              _construct(res.message, formData.get("data2"));
            }
          } else if (res.status == "not_found") {
            Swal.fire("Ops!", res.message, "info");
          } else {
            Swal.fire("Ops!", res.message, "info");
          }
        },
        error: function (xhr, status, error) {
          if (xhr.status == 200) {
            Swal.fire("Ops!", "Server Error: " + xhr.responseText, "error");
          } else if (xhr.status == 500) {
            Swal.fire("Ops!", "Internal error: " + xhr.responseText, "error");
          } else {
            console.log(xhr);
            console.log(status);
            Swal.fire("Ops!", "Something went wrong..", "error");
          }
        },
      });
    });
  };

  return {
    callFunction: function (type, val1, val2, val3) {
      switch (type) {
        case "reload_products": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Products..."), _constructForm(["products", "fetch_products", "ITEM"]));
          break;
        }
        case "reload_packages": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Packages..."), _constructForm(["products", "fetch_packages", "PACKAGE"]));
          break;
        }
        case "reload_bundle": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Packages..."), _constructForm(["products", "fetch_bundle", "BUNDLE"]));
          break;
        }
        case "gallery": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Saving changes..."), _constructForm(["product_item_save", val1, val2, val3]));
          break;
        }
        case "reload_supplier": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Supplier..."), _constructForm(["supplier", "fetch_suppliers"]));
          break;
        }
        case "reload_category": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Category..."), _constructForm(["category", "fetch_category"]));
          break;
        }
        case "reload_sub_category": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi("blockPage", false, "Loading Sub-category..."), _constructForm(["sub_category", "sub_category", cat_id]));
          break;
        }
        case "reload_fulfillment": {
          _ajaxrequest("controller/controller.php", "POST", _constructBlockUi(false, false, false), _constructForm(["fulfillment", "count_fulfillment"]));
          break;
        }
        case "cat_index": {
          return cat_index;
          break;
        }
        case "cat_id": {
          return cat_id;
          break;
        }
        case "subcat_index": {
          return subcat_index;
          break;
        }
        case "subcat_id": {
          return subcat_id;
          break;
        }

        default:
          // code block
          break;
      }
    },
    init: function () {
      _init();
    },
  };
})();
$(document).ready(function () {
  APPHANDLER.init();
});
