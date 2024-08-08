"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Post = _interopRequireDefault(require("../../models/Post.js"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _promises = _interopRequireDefault(require("fs/promises"));
var _User = _interopRequireDefault(require("../../models/User.js"));
var _config = _interopRequireDefault(require("../../config.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _cloudinary = require("../../cloudinary.js");
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // * Importar el modelo de publicación
// * Importar multer para la gestión de archivos
// * Importar path para la gestión de rutas de archivos
// * Importar fs para operaciones de sistema de archivos
// * Importar el modelo de usuario
// * Importar la configuración
// * Importar jsonwebtoken para la autenticación JWT
// * Importar la función de carga de imágenes desde cloudinary
// * Importar la librería de fechas
// * Configurar el almacenamiento de multer en disco
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./temp");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + _path["default"].extname(file.originalname));
  }
});

// * Configurar multer con la configuración de almacenamiento
var upload = (0, _multer["default"])({
  storage: storage
});

// * Definir la clase PostController para manejar las publicaciones
var PostController = /*#__PURE__*/function () {
  function PostController() {
    _classCallCheck(this, PostController);
  }
  return _createClass(PostController, null, [{
    key: "getAll",
    value: (
    /**
     * @method getAll
     * @description Obtiene todas las publicaciones con la información del usuario.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Lista de publicaciones con detalles del usuario
     */
    function () {
      var _getAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
        var posts, userIds, users, userMap;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Post["default"].find({}).lean();
            case 3:
              posts = _context.sent;
              // ! Obtener los IDs de usuario de cada publicación
              userIds = posts.map(function (post) {
                return post.userId;
              }); // ! Buscar los usuarios correspondientes y obtener ciertos campos
              _context.next = 7;
              return _User["default"].find({
                _id: {
                  $in: userIds
                }
              }, "username fullname image").lean();
            case 7:
              users = _context.sent;
              // ! Crear un mapa de usuarios por ID
              userMap = {};
              users.forEach(function (user) {
                return userMap[user._id] = user;
              });

              // ! Asignar cada publicación a su respectivo usuario
              posts.forEach(function (post) {
                post.user = userMap[post.userId] || {}; // Añadir usuario si existe
              });

              // * Devolver las publicaciones con la información de usuario
              res.json(posts);
              _context.next = 17;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              // ! Manejar errores y devolver un error 500 con detalles
              res.status(500).json({
                Error: "Failed to read resources",
                Details: _context.t0
              });
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 14]]);
      }));
      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }
      return getAll;
    }()
    /**
     * @method getById
     * @description Obtiene una publicación específica por ID.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Información de la publicación
     */
    )
  }, {
    key: "getById",
    value: (function () {
      var _getById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
        var id, post;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return _Post["default"].findById(id).lean();
            case 4:
              post = _context2.sent;
              if (post) {
                res.json(post);
              } else {
                res.status(404).json({
                  Error: "Resource not found"
                });
              }
              _context2.next = 11;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              res.status(500).json({
                Error: "Failed to read unique resource",
                Details: _context2.t0
              });
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }));
      function getById(_x3, _x4) {
        return _getById.apply(this, arguments);
      }
      return getById;
    }()
    /**
     * @method getMyPosts
     * @description Obtiene todas las publicaciones del usuario autenticado.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Lista de publicaciones del usuario
     */
    )
  }, {
    key: "getMyPosts",
    value: (function () {
      var _getMyPosts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
        var token, decoded, userId, user, myPosts;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              token = req.headers["x-access-token"];
              decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
              userId = decoded.id;
              if (token) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return", res.status(401).json({
                error: "No token provided"
              }));
            case 6:
              _context3.next = 8;
              return _User["default"].findById(userId);
            case 8:
              user = _context3.sent;
              if (user) {
                _context3.next = 11;
                break;
              }
              return _context3.abrupt("return", res.status(401).json({
                error: "User not found"
              }));
            case 11:
              myPosts = user.posts;
              res.json(myPosts);
              _context3.next = 18;
              break;
            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](0);
              res.status(500).json({
                Error: "Failed to read resources",
                Details: _context3.t0
              });
            case 18:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 15]]);
      }));
      function getMyPosts(_x5, _x6) {
        return _getMyPosts.apply(this, arguments);
      }
      return getMyPosts;
    }()
    /**
     * @method getMySavedPosts
     * @description Obtiene todas las publicaciones guardadas del usuario autenticado.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Lista de publicaciones guardadas del usuario
     */
    )
  }, {
    key: "getMySavedPosts",
    value: (function () {
      var _getMySavedPosts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
        var token, decoded, userId, user, mySavedPosts;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              token = req.headers["x-access-token"];
              decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
              userId = decoded.id;
              if (token) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", res.status(401).json({
                error: "No token provided"
              }));
            case 6:
              _context4.next = 8;
              return _User["default"].findById(userId);
            case 8:
              user = _context4.sent;
              if (user) {
                _context4.next = 11;
                break;
              }
              return _context4.abrupt("return", res.status(401).json({
                error: "User not found"
              }));
            case 11:
              mySavedPosts = user.savedPosts;
              res.json(mySavedPosts);
              _context4.next = 18;
              break;
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              res.status(500).json({
                Error: "Failed to read resources",
                Details: _context4.t0
              });
            case 18:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 15]]);
      }));
      function getMySavedPosts(_x7, _x8) {
        return _getMySavedPosts.apply(this, arguments);
      }
      return getMySavedPosts;
    }()
    /**
     * @method savePost
     * @description Guarda una publicación en la lista de publicaciones guardadas del usuario autenticado.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Mensaje de éxito o error
     */
    )
  }, {
    key: "savePost",
    value: (function () {
      var _savePost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
        var postId, token, decoded, userId, user, post;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              postId = req.params.postId;
              token = req.headers["x-access-token"];
              decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
              userId = decoded.id;
              if (token) {
                _context5.next = 6;
                break;
              }
              return _context5.abrupt("return", res.status(401).json({
                error: "No token provided"
              }));
            case 6:
              _context5.next = 8;
              return _User["default"].findById(userId);
            case 8:
              user = _context5.sent;
              if (user) {
                _context5.next = 11;
                break;
              }
              return _context5.abrupt("return", res.status(401).json({
                error: "User not found"
              }));
            case 11:
              _context5.next = 13;
              return _Post["default"].findById(postId);
            case 13:
              post = _context5.sent;
              if (post) {
                _context5.next = 16;
                break;
              }
              return _context5.abrupt("return", res.status(404).json({
                error: "Post not found"
              }));
            case 16:
              if (!user.savedPosts.includes(postId)) {
                _context5.next = 18;
                break;
              }
              return _context5.abrupt("return", res.status(409).json({
                error: "Post already saved"
              }));
            case 18:
              _context5.prev = 18;
              user.savedPosts.push(postId);
              _context5.next = 22;
              return user.save();
            case 22:
              res.json({
                message: "Post saved successfully"
              });
              _context5.next = 28;
              break;
            case 25:
              _context5.prev = 25;
              _context5.t0 = _context5["catch"](18);
              res.status(500).json({
                Error: "Failed to read resources",
                Details: _context5.t0
              });
            case 28:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[18, 25]]);
      }));
      function savePost(_x9, _x10) {
        return _savePost.apply(this, arguments);
      }
      return savePost;
    }()
    /**
     * @method deleteSavedPost
     * @description Elimina una publicación de la lista de publicaciones guardadas del usuario autenticado.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Mensaje de éxito o error
     */
    )
  }, {
    key: "deleteSavedPost",
    value: (function () {
      var _deleteSavedPost = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
        var postId, token, decoded, userId, user, post;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              postId = req.params.postId;
              token = req.headers["x-access-token"];
              decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
              userId = decoded.id;
              if (token) {
                _context6.next = 6;
                break;
              }
              return _context6.abrupt("return", res.status(401).json({
                error: "No token provided"
              }));
            case 6:
              _context6.next = 8;
              return _User["default"].findById(userId);
            case 8:
              user = _context6.sent;
              if (user) {
                _context6.next = 11;
                break;
              }
              return _context6.abrupt("return", res.status(401).json({
                error: "User not found"
              }));
            case 11:
              _context6.next = 13;
              return _Post["default"].findById(postId);
            case 13:
              post = _context6.sent;
              if (post) {
                _context6.next = 16;
                break;
              }
              return _context6.abrupt("return", res.status(404).json({
                error: "Post not found"
              }));
            case 16:
              _context6.prev = 16;
              user.savedPosts.pull(postId);
              _context6.next = 20;
              return user.save();
            case 20:
              res.json({
                message: "Post deleted successfully"
              });
              _context6.next = 26;
              break;
            case 23:
              _context6.prev = 23;
              _context6.t0 = _context6["catch"](16);
              res.status(500).json({
                Error: "Failed to read resources",
                Details: _context6.t0
              });
            case 26:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[16, 23]]);
      }));
      function deleteSavedPost(_x11, _x12) {
        return _deleteSavedPost.apply(this, arguments);
      }
      return deleteSavedPost;
    }()
    /**
     * @method create
     * @description Crea una nueva publicación y la asocia al usuario autenticado.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Publicación creada o mensaje de error
     */
    )
  }, {
    key: "create",
    value: (function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
        var token, decoded, userId, user, postData, _req$files, post, result;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              token = req.headers["x-access-token"];
              decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
              userId = decoded.id;
              _context7.next = 5;
              return _User["default"].findById(userId);
            case 5:
              user = _context7.sent;
              if (user) {
                _context7.next = 8;
                break;
              }
              return _context7.abrupt("return", res.status(401).json({
                error: "User not found"
              }));
            case 8:
              postData = {
                userId: userId,
                content: req.body.content
              };
              _context7.prev = 9;
              post = new _Post["default"](postData);
              if (!((_req$files = req.files) !== null && _req$files !== void 0 && _req$files.image)) {
                _context7.next = 21;
                break;
              }
              _context7.next = 14;
              return (0, _cloudinary.uploadImage)(req.files.image.tempFilePath);
            case 14:
              result = _context7.sent;
              post.mediaUrl = {
                public_id: result.public_id,
                secure_url: result.secure_url
              };
              post.image = result.secure_url;
              _context7.next = 19;
              return _promises["default"].unlink(req.files.image.tempFilePath);
            case 19:
              _context7.next = 22;
              break;
            case 21:
              post.mediaUrl = null;
            case 22:
              user.posts.push(post);
              _context7.next = 25;
              return user.save();
            case 25:
              _context7.next = 27;
              return post.save();
            case 27:
              res.status(201).json(post);
              _context7.next = 33;
              break;
            case 30:
              _context7.prev = 30;
              _context7.t0 = _context7["catch"](9);
              res.status(500).json({
                error: "Internal Server Error"
              });
            case 33:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[9, 30]]);
      }));
      function create(_x13, _x14) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * @method delete
     * @description Elimina una publicación si el usuario es el propietario o tiene permisos de administrador o moderador.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Mensaje de éxito o error
     */
    )
  }, {
    key: "delete",
    value: (function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
        var id, token, decoded, userId, user, post;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              id = req.params.id;
              token = req.headers["x-access-token"];
              decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
              userId = decoded.id;
              _context8.next = 6;
              return _User["default"].findById(userId);
            case 6:
              user = _context8.sent;
              if (user) {
                _context8.next = 9;
                break;
              }
              return _context8.abrupt("return", res.status(401).json({
                error: "User not found"
              }));
            case 9:
              _context8.next = 11;
              return _Post["default"].findById(id);
            case 11:
              post = _context8.sent;
              if (post) {
                _context8.next = 14;
                break;
              }
              return _context8.abrupt("return", res.status(404).json({
                error: "Post not found"
              }));
            case 14:
              if (!(post.userId.toString() !== userId && user.role !== "admin" && user.role !== "moderator")) {
                _context8.next = 16;
                break;
              }
              return _context8.abrupt("return", res.status(403).json({
                error: "You are not authorized to delete this post"
              }));
            case 16:
              _context8.prev = 16;
              _context8.next = 19;
              return _Post["default"].findByIdAndDelete(id);
            case 19:
              res.json({
                Message: "Resource deleted successfully"
              });
              _context8.next = 25;
              break;
            case 22:
              _context8.prev = 22;
              _context8.t0 = _context8["catch"](16);
              res.status(500).json({
                Error: "Failed to delete resource",
                Details: _context8.t0
              });
            case 25:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[16, 22]]);
      }));
      function _delete(_x15, _x16) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
    /**
     * @method getAllUsersWithPosts
     * @description Obtiene todos los usuarios con sus publicaciones. Incluye detalles de la publicación como comentarios.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Información detallada de usuarios y sus publicaciones
     */
    )
  }, {
    key: "getAllUsersWithPosts",
    value: (function () {
      var _getAllUsersWithPosts = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
        var users, usersWithPosts;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _User["default"].find({}).populate({
                path: "posts",
                populate: {
                  path: "comments",
                  select: "content emoji userId createdAt"
                }
              }).lean();
            case 3:
              users = _context9.sent;
              usersWithPosts = users.map(function (user) {
                var _user$image;
                return {
                  id: user._id || null,
                  // ID del usuario
                  username: user.username || "No username",
                  // Nombre de usuario
                  email: user.email || "No email",
                  // Correo electrónico del usuario
                  role: user.role || "No role",
                  // Rol del usuario
                  status: user.status || "No status",
                  // Estado del usuario
                  fullname: user.fullname || "No fullname",
                  // Nombre completo del usuario
                  image: ((_user$image = user.image) === null || _user$image === void 0 ? void 0 : _user$image.secure_url) || null,
                  // URL de la imagen del usuario (null si no está disponible)
                  posts: user.posts.map(function (post) {
                    return {
                      id: post._id || null,
                      // ID de la publicación
                      content: post.content || "No content",
                      // Contenido de la publicación
                      mediaUrl: post.mediaUrl || null,
                      // URL del medio asociado a la publicación (null si no está disponible)
                      image: post.image || null,
                      // Imagen asociada a la publicación (null si no está disponible)
                      comments: post.comments || [],
                      // Comentarios de la publicación
                      createdAt: post.createdAt || "No creation date" // Fecha de creación de la publicación
                    };
                  })
                };
              });
              res.json(usersWithPosts);
              _context9.next = 11;
              break;
            case 8:
              _context9.prev = 8;
              _context9.t0 = _context9["catch"](0);
              res.status(500).json({
                Error: "Failed to read resources",
                Details: _context9.t0
              });
            case 11:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 8]]);
      }));
      function getAllUsersWithPosts(_x17, _x18) {
        return _getAllUsersWithPosts.apply(this, arguments);
      }
      return getAllUsersWithPosts;
    }()
    /**
     * @method getPostAnalytics
     * @description Obtiene datos para generar gráficos específicos sobre los posts de un usuario.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Datos necesarios para gráficos sobre los posts del usuario
     */
    )
  }, {
    key: "getPostAnalytics",
    value: (function () {
      var _getPostAnalytics = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
        var token, decoded, userId, user, posts, postsByMonth, commentsDistribution, commentsAndLikesAverage;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              token = req.headers["x-access-token"];
              decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
              userId = req.params.userId;
              if (userId) {
                _context10.next = 5;
                break;
              }
              return _context10.abrupt("return", res.status(400).json({
                Error: "User ID is required"
              }));
            case 5:
              if (decoded) {
                _context10.next = 7;
                break;
              }
              return _context10.abrupt("return", res.status(401).json({
                Error: "Invalid token"
              }));
            case 7:
              _context10.prev = 7;
              _context10.next = 10;
              return _User["default"].findById(userId).populate({
                path: "posts",
                populate: {
                  path: "comments",
                  select: "content emoji userId createdAt"
                }
              }).lean();
            case 10:
              user = _context10.sent;
              if (user) {
                _context10.next = 13;
                break;
              }
              return _context10.abrupt("return", res.status(404).json({
                Error: "User not found"
              }));
            case 13:
              posts = user.posts;
              if (!(!posts || posts.length === 0)) {
                _context10.next = 16;
                break;
              }
              return _context10.abrupt("return", res.status(404).json({
                Error: "No posts found for this user"
              }));
            case 16:
              // Gráfico 1: Número de posts por rango de tiempo
              postsByMonth = posts.reduce(function (acc, post) {
                var month = (0, _moment["default"])(post.createdAt).format("YYYY-MM");
                if (!acc[month]) acc[month] = 0;
                acc[month]++;
                return acc;
              }, {}); // Gráfico 2: Distribución de comentarios por publicación
              commentsDistribution = posts.map(function (post) {
                return {
                  postId: post._id,
                  numberOfComments: post.comments.length
                };
              }); // Gráfico 3: Promedio de comentarios y likes por publicación
              commentsAndLikesAverage = posts.reduce(function (acc, post) {
                acc.totalComments += post.comments.length;
                acc.totalLikes += post.likes.length; // Asegúrate de que `post.likes` existe en el modelo
                acc.totalPosts++;
                return acc;
              }, {
                totalComments: 0,
                totalLikes: 0,
                totalPosts: 0
              });
              if (commentsAndLikesAverage.totalPosts > 0) {
                commentsAndLikesAverage.averageComments = commentsAndLikesAverage.totalComments / commentsAndLikesAverage.totalPosts;
                commentsAndLikesAverage.averageLikes = commentsAndLikesAverage.totalLikes / commentsAndLikesAverage.totalPosts;
              } else {
                commentsAndLikesAverage.averageComments = 0;
                commentsAndLikesAverage.averageLikes = 0;
              }

              // Devolver los datos para los gráficos
              res.json({
                postsByMonth: postsByMonth,
                commentsDistribution: commentsDistribution,
                commentsAndLikesAverage: commentsAndLikesAverage
              });
              _context10.next = 26;
              break;
            case 23:
              _context10.prev = 23;
              _context10.t0 = _context10["catch"](7);
              res.status(500).json({
                Error: "Failed to retrieve analytics",
                Details: _context10.t0.message
              });
            case 26:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[7, 23]]);
      }));
      function getPostAnalytics(_x19, _x20) {
        return _getPostAnalytics.apply(this, arguments);
      }
      return getPostAnalytics;
    }()
    /**
     * @method getPlatformAnalytics
     * @description Obtiene datos analíticos de toda la plataforma sobre las publicaciones.
     * @param {Object} req - La solicitud HTTP
     * @param {Object} res - La respuesta HTTP
     * @returns {Object} - Datos analíticos de las publicaciones en la plataforma
     */
    )
  }, {
    key: "getPlatformAnalytics",
    value: (function () {
      var _getPlatformAnalytics = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
        var posts, postsByMonth, commentsDistribution, totalPosts, totalComments, totalLikes, averageComments, averageLikes, commentsAndLikesAverage;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return _Post["default"].find({}).populate("comments").lean();
            case 3:
              posts = _context11.sent;
              // Calcular el número total de publicaciones por mes
              postsByMonth = {};
              posts.forEach(function (post) {
                var month = (0, _moment["default"])(post.createdAt).format("YYYY-MM");
                postsByMonth[month] = (postsByMonth[month] || 0) + 1;
              });

              // Calcular la distribución de comentarios por publicación
              commentsDistribution = posts.map(function (post) {
                return {
                  postId: post._id,
                  numberOfComments: post.comments.length
                };
              }); // Calcular el promedio de comentarios y likes por publicación
              totalPosts = posts.length;
              totalComments = posts.reduce(function (sum, post) {
                return sum + post.comments.length;
              }, 0); // Asegúrate de que 'likes' sea un número y no una cadena o un objeto
              totalLikes = posts.reduce(function (sum, post) {
                return sum + (Number(post.likes) || 0);
              }, 0);
              averageComments = totalPosts > 0 ? totalComments / totalPosts : 0;
              averageLikes = totalPosts > 0 ? totalLikes / totalPosts : 0;
              commentsAndLikesAverage = {
                totalComments: totalComments,
                totalLikes: totalLikes,
                totalPosts: totalPosts,
                averageComments: averageComments,
                averageLikes: averageLikes
              }; // Devolver los datos analíticos
              res.json({
                postsByMonth: postsByMonth,
                commentsDistribution: commentsDistribution,
                commentsAndLikesAverage: commentsAndLikesAverage
              });
              _context11.next = 19;
              break;
            case 16:
              _context11.prev = 16;
              _context11.t0 = _context11["catch"](0);
              // Manejar errores y devolver un mensaje de error
              res.status(500).json({
                Error: "Failed to retrieve platform analytics",
                Details: _context11.t0.message
              });
            case 19:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 16]]);
      }));
      function getPlatformAnalytics(_x21, _x22) {
        return _getPlatformAnalytics.apply(this, arguments);
      }
      return getPlatformAnalytics;
    }())
  }]);
}(); // * Exportar el controlador de publicaciones
var _default = exports["default"] = PostController;