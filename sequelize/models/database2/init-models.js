var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _charts = require("./charts");
var _content_moderation = require("./content_moderation");
var _content_moderations = require("./content_moderations");
var _features = require("./features");
var _global_question_edit = require("./global_question_edit");
var _image_redirect = require("./image_redirect");
var _notifications = require("./notifications");
var _permissions = require("./permissions");
var _role_permissions = require("./role_permissions");
var _roles = require("./roles");
var _user_features = require("./user_features");
var _user_permissions = require("./user_permissions");
var _users = require("./users");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var charts = _charts(sequelize, DataTypes);
  var content_moderation = _content_moderation(sequelize, DataTypes);
  var content_moderations = _content_moderations(sequelize, DataTypes);
  var features = _features(sequelize, DataTypes);
  var global_question_edit = _global_question_edit(sequelize, DataTypes);
  var image_redirect = _image_redirect(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var role_permissions = _role_permissions(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var user_features = _user_features(sequelize, DataTypes);
  var user_permissions = _user_permissions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    SequelizeMeta,
    charts,
    content_moderation,
    content_moderations,
    features,
    global_question_edit,
    image_redirect,
    notifications,
    permissions,
    role_permissions,
    roles,
    user_features,
    user_permissions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
