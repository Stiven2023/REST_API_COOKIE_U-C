"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Role = require("../models/Role.js");
var checkRoleExisted = function checkRoleExisted(req, res, next) {
  if (req.body.role) {
    for (var i = 0; i < req.body.role.length; i++) {
      if (!_Role.ROLES.includes(req.body.role[i])) {
        return res.status(400).json({
          message: "Role ".concat(req.body.role[i], " does not exist")
        });
      }
    }
  }
  next();
};
var _default = exports["default"] = checkRoleExisted;