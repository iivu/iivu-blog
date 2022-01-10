"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

var _User = require("./entity/User");

var _Comment = require("./entity/Comment");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, u1, post1, c1;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('Running seed...');
            manager = connection.manager;
            u1 = new _User.User();
            u1.username = 'Leo Cheung';
            u1.passwordDigest = 'xxx';
            _context.next = 7;
            return manager.save(u1);

          case 7:
            post1 = new _Post.Post();
            post1.title = 'Post 1';
            post1.content = 'My first Post';
            post1.author = u1;
            _context.next = 13;
            return manager.save(post1);

          case 13:
            c1 = new _Comment.Comment();
            c1.user = u1;
            c1.post = post1;
            c1.content = 'Awesome!';
            _context.next = 19;
            return manager.save(c1);

          case 19:
            _context.next = 21;
            return connection.close();

          case 21:
            console.log('Seed ran successfully!!');

          case 22:
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