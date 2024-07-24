"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChat = exports.joinChat = exports.getChatById = exports.getAllChatsForCharts = exports.getAllChats = exports.deleteChat = exports.createChat = void 0;
var _Chat = _interopRequireDefault(require("../../models/Chat.js"));
var _Message = _interopRequireDefault(require("../../models/Message.js"));
var _User = _interopRequireDefault(require("../../models/User.js"));
var _index = require("../../index.js");
var _config = _interopRequireDefault(require("../../config.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var createChat = exports.createChat = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var token, decoded, userId, _req$body, users, name, participants, usernames, chatName, existingChat, newChat;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.headers['x-access-token'];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = decoded.id;
          _req$body = req.body, users = _req$body.users, name = _req$body.name;
          if (!name) {
            _context.next = 10;
            break;
          }
          if (!(users.length < 3)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'At least three users are required to create a named chat'
          }));
        case 8:
          _context.next = 12;
          break;
        case 10:
          if (!(users.length !== 2)) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'Exactly two users are required to create a chat'
          }));
        case 12:
          if (users.includes(userId)) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'User ID must be one of the participants'
          }));
        case 14:
          _context.next = 16;
          return _User["default"].find({
            _id: {
              $in: users
            }
          }, 'username');
        case 16:
          participants = _context.sent;
          if (!(participants.length !== users.length)) {
            _context.next = 19;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            error: 'One or more users not found'
          }));
        case 19:
          usernames = participants.map(function (user) {
            return user.username;
          });
          chatName = name || usernames.join(', ');
          _context.next = 23;
          return _Chat["default"].findOne({
            name: chatName,
            participants: {
              $all: users
            }
          });
        case 23:
          existingChat = _context.sent;
          if (!existingChat) {
            _context.next = 26;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'A chat with the same name and participants already exists'
          }));
        case 26:
          newChat = new _Chat["default"]({
            name: chatName,
            participants: users,
            users: users
          });
          _context.next = 29;
          return newChat.save();
        case 29:
          _context.next = 31;
          return _User["default"].updateMany({
            _id: {
              $in: users
            }
          }, {
            $push: {
              chats: newChat._id
            }
          });
        case 31:
          _index.io.emit('newChat', newChat);
          res.status(201).json(newChat);
          _context.next = 38;
          break;
        case 35:
          _context.prev = 35;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: 'Internal Server Error',
            errorMessage: _context.t0.message
          });
        case 38:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 35]]);
  }));
  return function createChat(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAllChats = exports.getAllChats = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var token, decoded, userId, chats;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = req.headers['x-access-token'];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = decoded.id;
          _context2.next = 6;
          return _Chat["default"].find({
            users: userId
          });
        case 6:
          chats = _context2.sent;
          res.json(chats);
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error("Error getting all chats:", _context2.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getAllChats(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var joinChat = exports.joinChat = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var userId, chatId, user, chat, userInChat;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.userId;
          chatId = req.params.chatid;
          _context3.next = 5;
          return _User["default"].findById(userId);
        case 5:
          user = _context3.sent;
          if (user) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));
        case 8:
          _context3.next = 10;
          return _Chat["default"].findById(chatId).populate('messages');
        case 10:
          chat = _context3.sent;
          if (chat) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: 'Chat not found'
          }));
        case 13:
          userInChat = chat.users.includes(userId);
          if (userInChat) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            error: 'User is not a member of this chat'
          }));
        case 16:
          _index.io.emit('userJoined', {
            chatId: chatId,
            userId: userId
          });
          res.status(200).json({
            message: 'Joined chat successfully',
            chat: chat
          });
          _context3.next = 24;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.error("Error joining chat:", _context3.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function joinChat(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getChatById = exports.getChatById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var chatId, chat, chatWithMessages;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          chatId = req.params.id;
          _context4.next = 4;
          return _Chat["default"].findById(chatId);
        case 4:
          chat = _context4.sent;
          if (chat) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: 'Chat not found'
          }));
        case 7:
          _context4.next = 9;
          return _Chat["default"].findById(chatId).populate('messages');
        case 9:
          chatWithMessages = _context4.sent;
          res.json(chatWithMessages);
          _context4.next = 17;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error("Error getting chat by ID:", _context4.t0);
          res.status(500).json({
            error: 'Internal Server Error'
          });
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function getChatById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var updateChat = exports.updateChat = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var token, decoded, userId, chatId, name, chat;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          token = req.headers['x-access-token'];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = decoded.id;
          chatId = req.params.chatId;
          name = req.body.name;
          _context5.next = 8;
          return _Chat["default"].findById(chatId);
        case 8:
          chat = _context5.sent;
          if (chat) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'Chat not found'
          }));
        case 11:
          if (chat.users.includes(userId)) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            error: 'You are not a member of this chat'
          }));
        case 13:
          if (!(chat.users.length < 3)) {
            _context5.next = 15;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            error: 'This chat does not allow editing unless it has at least 3 participants'
          }));
        case 15:
          chat.name = name;
          _context5.next = 18;
          return chat.save();
        case 18:
          res.status(200).json({
            message: 'Chat name updated successfully'
          });
          _context5.next = 25;
          break;
        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](0);
          console.error("Error updating chat:", _context5.t0);
          res.status(500).json({
            error: 'Internal Server Error',
            errorMessage: _context5.t0.message
          });
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 21]]);
  }));
  return function updateChat(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteChat = exports.deleteChat = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var token, decoded, userId, chatId, chat;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          token = req.headers['x-access-token'];
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          userId = decoded.id;
          chatId = req.params.id;
          _context6.next = 7;
          return _Chat["default"].findById(chatId);
        case 7:
          chat = _context6.sent;
          if (chat) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            error: 'Chat not found'
          }));
        case 10:
          if (chat.users.includes(userId)) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(403).json({
            error: 'You are not authorized to delete this chat'
          }));
        case 12:
          _context6.next = 14;
          return _Chat["default"].findByIdAndDelete(chatId);
        case 14:
          _index.io.emit('chatDeleted', chatId);
          res.json({
            message: 'Chat deleted successfully'
          });
          _context6.next = 22;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          console.error("Error deleting chat:", _context6.t0);
          res.status(500).json({
            error: 'Internal Server Error',
            errorMessage: _context6.t0.message
          });
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function deleteChat(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getAllChatsForCharts = exports.getAllChatsForCharts = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var token, decoded, chats, allMessages, _loop, i;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          token = req.headers['x-access-token'];
          if (token) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(401).json({
            error: 'Unauthorized: Token missing'
          }));
        case 4:
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].secret);
          _context8.next = 7;
          return _Chat["default"].find().select('_id messages createdAt');
        case 7:
          chats = _context8.sent;
          allMessages = [];
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var chat, chatId, messages;
            return _regeneratorRuntime().wrap(function _loop$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  chat = chats[i];
                  chatId = chat._id;
                  _context7.next = 4;
                  return _Message["default"].find({
                    _id: {
                      $in: chat.messages
                    }
                  }).select('createdAt');
                case 4:
                  messages = _context7.sent;
                  console.log("Messages for chat " + chatId + ":", messages);
                  allMessages = allMessages.concat(messages.map(function (message) {
                    return {
                      createdAt: message.createdAt,
                      chat: chatId
                    };
                  }));
                case 7:
                case "end":
                  return _context7.stop();
              }
            }, _loop);
          });
          i = 0;
        case 11:
          if (!(i < chats.length)) {
            _context8.next = 16;
            break;
          }
          return _context8.delegateYield(_loop(), "t0", 13);
        case 13:
          i++;
          _context8.next = 11;
          break;
        case 16:
          res.json({
            totalChats: chats.length,
            chats: chats.map(function (chat) {
              return {
                _id: chat._id,
                createdAt: chat.createdAt,
                messages: allMessages.filter(function (message) {
                  return message.chat.toString() === chat._id.toString();
                })
              };
            })
          });
          _context8.next = 23;
          break;
        case 19:
          _context8.prev = 19;
          _context8.t1 = _context8["catch"](0);
          console.error("Error getting all chats for charts:", _context8.t1);
          res.status(500).json({
            error: 'Internal Server Error'
          });
        case 23:
        case "end":
          return _context8.stop();
      }
    }, _callee7, null, [[0, 19]]);
  }));
  return function getAllChatsForCharts(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();