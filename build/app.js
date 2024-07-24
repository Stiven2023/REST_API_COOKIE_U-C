"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _cors = _interopRequireDefault(require("cors"));
var _database = _interopRequireDefault(require("./database.js"));
var _initialSetup = require("./libs/initialSetup.js");
var _authRoutes = _interopRequireDefault(require("./routes/user/auth.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user/user.routes.js"));
var _profileRoutes = _interopRequireDefault(require("./routes/user/profile.routes.js"));
var _ChatRoutes = _interopRequireDefault(require("./routes/chat/ChatRoutes.js"));
var _MessageRoutes = _interopRequireDefault(require("./routes/chat/MessageRoutes.js"));
var _Post = _interopRequireDefault(require("./routes/Post/Post.js"));
var _Comments = _interopRequireDefault(require("./routes/Post/Comments.js"));
var _Likes = _interopRequireDefault(require("./routes/Post/Likes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _database["default"])();
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();

// Configura CORS para permitir cualquier origen
app.use((0, _cors["default"])({
  origin: "*",
  // Permite cualquier origen
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "./tmp"
}));

// Rutas
app.get("/", function (req, res) {
  res.json({
    message: "API is running"
  });
});
app.use("/api/auth", _authRoutes["default"]);
app.use("/api/users", _userRoutes["default"]);
app.use("/api/profile", _profileRoutes["default"]);
app.use("/api/chat", _ChatRoutes["default"]);
app.use("/api/chat/messages", _MessageRoutes["default"]);
app.use("/api/posts", _Post["default"]);
app.use("/api/posts", _Comments["default"]);
app.use("/api/posts", _Likes["default"]);
var _default = exports["default"] = app;