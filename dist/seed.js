"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Inserting a new user into the database...');
            _context.next = 3;
            return connection.manager.find(_Post.Post);

          case 3:
            post = _context.sent;

            if (post.length) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return connection.manager.save(Array(20).fill(1).map(function (_, index) {
              return new _Post.Post("Post".concat(index + 1), "My ".concat(index + 1, " post"));
            }));

          case 7:
            console.log('Seed database successfully.');

          case 8:
            _context.next = 10;
            return connection.close();

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});