"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.updateStatus = exports.unfollowUser = exports.searchUsers = exports.removeFriend = exports.getUsersByUsername = exports.getUsersById = exports.getFriends = exports.getFollowing = exports.getFollowers = exports.getAllUsers = exports.followUser = exports.deleteUser = exports.createUser = exports.changeRole = exports.addFriend = void 0;
var _User = _interopRequireDefault(require("../../models/User.js"));
var _deleteEmail = _interopRequireDefault(require("../../utils/emails/deleteEmail.js"));
var _updateStatusEmail = _interopRequireDefault(require("../../utils/emails/updateStatusEmail.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _Role = _interopRequireDefault(require("../../models/Role.js"));
var _config = _interopRequireDefault(require("../../config.js"));
var _cloudinary = require("../../cloudinary.js");
var _fsExtra = _interopRequireDefault(require("fs-extra"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createUser = exports.createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$files, _req$body, username, email, password, newUser, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          newUser = new _User["default"]({
            username: username,
            email: email,
            password: password
          });
          if (!((_req$files = req.files) !== null && _req$files !== void 0 && _req$files.image)) {
            _context.next = 10;
            break;
          }
          _context.next = 6;
          return (0, _cloudinary.uploadImage)(req.files.image.tempFilePath);
        case 6:
          result = _context.sent;
          newUser.image = {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
          _context.next = 10;
          return _fsExtra["default"].unlink(req.files.image.tempFilePath);
        case 10:
          _context.next = 12;
          return newUser.save();
        case 12:
          res.status(200).json({
            message: "User created successfully"
          });
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Admin
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var userId, user, email, username;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.params.userId;
          _context2.next = 4;
          return _User["default"].findById(userId);
        case 4:
          user = _context2.sent;
          email = user.email, username = user.username;
          _context2.next = 8;
          return _User["default"].findByIdAndDelete(userId);
        case 8:
          _context2.next = 10;
          return (0, _deleteEmail["default"])(email, username);
        case 10:
          res.status(204).json("user delete successfully");
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: "Error deleting user"
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function deleteUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var changeRole = exports.changeRole = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var token, decoded, _req$body2, userId, roleId, userToChange, role;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.headers["x-access-token"];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          if (!(decoded.role !== "admin")) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            error: "Only admin can change user role"
          }));
        case 5:
          _req$body2 = req.body, userId = _req$body2.userId, roleId = _req$body2.roleId;
          _context3.next = 8;
          return _User["default"].findById(userId);
        case 8:
          userToChange = _context3.sent;
          if (userToChange) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: "User not found"
          }));
        case 11:
          _context3.next = 13;
          return _Role["default"].findById(roleId);
        case 13:
          role = _context3.sent;
          if (role) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: "Role not found"
          }));
        case 16:
          userToChange.role = [role._id];
          _context3.next = 19;
          return userToChange.save();
        case 19:
          res.status(200).json({
            message: "User role changed successfully"
          });
          _context3.next = 25;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return function changeRole(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Moder or Admin
var getAllUsers = exports.getAllUsers = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var token, decoded, users;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          token = req.headers["x-access-token"];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret); // Obtén todos los usuarios excepto el que coincide con el ID del token
          _context4.next = 5;
          return _User["default"].find({
            _id: {
              $ne: decoded.id
            }
          }).populate("role", "name");
        case 5:
          users = _context4.sent;
          res.json(users);
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: "Error fetching users"
          });
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function getAllUsers(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getUsersById = exports.getUsersById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _User["default"].findById(req.params.userId);
        case 3:
          users = _context5.sent;
          res.json(users);
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: "Error fetching user by id"
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function getUsersById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getUsersByUsername = exports.getUsersByUsername = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var username, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          username = req.body.username;
          _context6.next = 4;
          return _User["default"].findOne({
            username: username
          });
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            error: "User not found"
          }));
        case 7:
          res.json(user);
          _context6.next = 13;
          break;
        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: "Error fetching user by username",
            message: _context6.t0.message
          });
        case 13:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 10]]);
  }));
  return function getUsersByUsername(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var userId, _req$body3, username, email, password, fullname, gender, phone_number, description;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.params.userId;
          _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, password = _req$body3.password, fullname = _req$body3.fullname, gender = _req$body3.gender, phone_number = _req$body3.phone_number, description = _req$body3.description;
          _context7.next = 5;
          return _User["default"].findByIdAndUpdate(userId, {
            username: username,
            email: email,
            password: password,
            fullname: fullname,
            gender: gender,
            phone_number: phone_number,
            description: description
          });
        case 5:
          res.status(200).json({
            message: "User updated successfully"
          });
          _context7.next = 11;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            error: "Error updating user"
          });
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function updateUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var updateStatus = exports.updateStatus = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var userId, status, user;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.params.userId;
          status = req.body.status; // Buscar el usuario y actualizar el estado
          _context8.next = 5;
          return _User["default"].findByIdAndUpdate(userId, {
            status: status
          }, {
            "new": true
          });
        case 5:
          user = _context8.sent;
          if (user) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            error: "User not found"
          }));
        case 8:
          _context8.prev = 8;
          _context8.next = 11;
          return (0, _updateStatusEmail["default"])(user.email, user.username, status);
        case 11:
          _context8.next = 17;
          break;
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](8);
          console.error("Error sending update status email:", _context8.t0);
          // Enviar respuesta con éxito a pesar de error en el envío de email
          return _context8.abrupt("return", res.status(200).json({
            message: "User status updated successfully, but failed to send email",
            user: user
          }));
        case 17:
          res.status(200).json({
            message: "User status updated successfully",
            user: user
          });
          _context8.next = 24;
          break;
        case 20:
          _context8.prev = 20;
          _context8.t1 = _context8["catch"](0);
          console.error("Error updating user status:", _context8.t1);
          res.status(500).json({
            error: "Error updating user status"
          });
        case 24:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 20], [8, 13]]);
  }));
  return function updateStatus(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

// User
var followUser = exports.followUser = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var token, decoded, userId, user, follower;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          token = req.headers["x-access-token"];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = req.params.userId;
          _context9.next = 6;
          return _User["default"].findById(userId);
        case 6:
          user = _context9.sent;
          _context9.next = 9;
          return _User["default"].findById(decoded.id);
        case 9:
          follower = _context9.sent;
          if (!(!user || !follower)) {
            _context9.next = 12;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "User or follower not found."
          }));
        case 12:
          if (!user.followers.includes(decoded.id)) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: "You are already following this user."
          }));
        case 14:
          user.followers.push(decoded.id);
          follower.following.push(userId);
          _context9.next = 18;
          return user.save();
        case 18:
          _context9.next = 20;
          return follower.save();
        case 20:
          res.json({
            message: "Follower added successfully."
          });
          _context9.next = 26;
          break;
        case 23:
          _context9.prev = 23;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            error: "Error following user"
          });
        case 26:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 23]]);
  }));
  return function followUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var unfollowUser = exports.unfollowUser = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var token, decoded, userId, user, follower;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          token = req.headers["x-access-token"];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = req.params.userId;
          _context10.next = 6;
          return _User["default"].findById(userId);
        case 6:
          user = _context10.sent;
          _context10.next = 9;
          return _User["default"].findById(decoded.id);
        case 9:
          follower = _context10.sent;
          if (!(!user || !follower)) {
            _context10.next = 12;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: "User or follower not found."
          }));
        case 12:
          user.followers = user.followers.filter(function (follower) {
            return follower.toString() !== decoded.id;
          });
          follower.following = follower.following.filter(function (user) {
            return user.toString() !== userId;
          });
          _context10.next = 16;
          return user.save();
        case 16:
          _context10.next = 18;
          return follower.save();
        case 18:
          res.json({
            message: "Follower removed successfully."
          });
          _context10.next = 24;
          break;
        case 21:
          _context10.prev = 21;
          _context10.t0 = _context10["catch"](0);
          res.status(500).json({
            error: "Error unfollowing user"
          });
        case 24:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 21]]);
  }));
  return function unfollowUser(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var getFollowers = exports.getFollowers = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _User["default"].findById(req.params.userId);
        case 3:
          users = _context11.sent;
          res.json(users.followers);
          _context11.next = 10;
          break;
        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          res.status(500).json({
            error: "Error fetching followers"
          });
        case 10:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return function getFollowers(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var getFollowing = exports.getFollowing = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return _User["default"].findById(req.params.userId);
        case 3:
          users = _context12.sent;
          res.json(users.following);
          _context12.next = 10;
          break;
        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          res.status(500).json({
            error: "Error fetching following"
          });
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function getFollowing(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var addFriend = exports.addFriend = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var token, decoded, userId, user, friend;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          token = req.headers["x-access-token"];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = req.params.userId;
          _context13.next = 6;
          return _User["default"].findById(userId);
        case 6:
          user = _context13.sent;
          _context13.next = 9;
          return _User["default"].findById(decoded.id);
        case 9:
          friend = _context13.sent;
          if (!(!user || !friend)) {
            _context13.next = 12;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: "User or friend not found."
          }));
        case 12:
          user.friends.push(decoded.id);
          friend.friends.push(userId);
          _context13.next = 16;
          return friend.save();
        case 16:
          _context13.next = 18;
          return user.save();
        case 18:
          res.json({
            message: "Friend added successfully."
          });
          _context13.next = 24;
          break;
        case 21:
          _context13.prev = 21;
          _context13.t0 = _context13["catch"](0);
          res.status(500).json({
            error: "Error adding friend"
          });
        case 24:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 21]]);
  }));
  return function addFriend(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var removeFriend = exports.removeFriend = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var token, decoded, userId, user, friend;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          token = req.headers["x-access-token"];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = req.params.userId;
          _context14.next = 6;
          return _User["default"].findById(userId);
        case 6:
          user = _context14.sent;
          _context14.next = 9;
          return _User["default"].findById(decoded.id);
        case 9:
          friend = _context14.sent;
          if (!(!user || !friend)) {
            _context14.next = 12;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            message: "User or friend not found."
          }));
        case 12:
          user.friends = user.friends.filter(function (f) {
            return f.toString() !== decoded.id;
          });
          friend.friends = friend.friends.filter(function (f) {
            return f.toString() !== userId;
          });
          _context14.next = 16;
          return user.save();
        case 16:
          _context14.next = 18;
          return friend.save();
        case 18:
          res.json({
            message: "Friend removed successfully."
          });
          _context14.next = 24;
          break;
        case 21:
          _context14.prev = 21;
          _context14.t0 = _context14["catch"](0);
          res.status(500).json({
            error: "Error removing friend"
          });
        case 24:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 21]]);
  }));
  return function removeFriend(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var getFriends = exports.getFriends = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return _User["default"].findById(req.params.userId);
        case 3:
          users = _context15.sent;
          res.json(users.friends);
          _context15.next = 10;
          break;
        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);
          res.status(500).json({
            error: "Error fetching friends"
          });
        case 10:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 7]]);
  }));
  return function getFriends(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
var searchUsers = exports.searchUsers = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var term, token, decoded, usuarios;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          term = req.body.term;
          token = req.headers["x-access-token"];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          if (term) {
            _context16.next = 5;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            message: "Falta término de búsqueda"
          }));
        case 5:
          _context16.prev = 5;
          _context16.next = 8;
          return _User["default"].find({
            $and: [{
              _id: {
                $ne: decoded.id
              }
            }, {
              $or: [{
                fullname: {
                  $regex: term,
                  $options: "i"
                }
              }, {
                username: {
                  $regex: term,
                  $options: "i"
                }
              }]
            }]
          }).populate("role", "name");
        case 8:
          usuarios = _context16.sent;
          res.json(usuarios);
          _context16.next = 15;
          break;
        case 12:
          _context16.prev = 12;
          _context16.t0 = _context16["catch"](5);
          res.status(500).json({
            error: "Error al buscar usuarios"
          });
        case 15:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[5, 12]]);
  }));
  return function searchUsers(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();