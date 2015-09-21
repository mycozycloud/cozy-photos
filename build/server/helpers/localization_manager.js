// Generated by CoffeeScript 1.9.2
var LocalizationManager, Polyglot, cozydb;

Polyglot = require('node-polyglot');

cozydb = require('cozydb');

LocalizationManager = (function() {
  function LocalizationManager() {}

  LocalizationManager.prototype.polyglot = null;

  LocalizationManager.prototype.initialize = function(callback) {
    if (callback == null) {
      callback = function() {};
    }
    return this.ensureReady(callback);
  };

  LocalizationManager.prototype.setRenderer = function(renderer) {
    return this.renderer = renderer;
  };

  LocalizationManager.prototype.retrieveLocale = function(callback) {
    return cozydb.api.getCozyLocale(function(err, locale) {
      if ((err != null) || !locale) {
        locale = 'en';
      }
      return callback(null, locale);
    });
  };

  LocalizationManager.prototype.ensureReady = function(callback) {
    if (this.polyglot) {
      return callback(null, this.polyglot);
    }
    return this.retrieveLocale((function(_this) {
      return function(err, locale) {
        var phrases;
        if (err) {
          return callback(err);
        }
        phrases = (function() {
          try {
            return require("../locales/" + locale);
          } catch (_error) {
            err = _error;
            return require('../locales/en');
          }
        })();
        _this.polyglot = new Polyglot({
          locale: locale,
          phrases: phrases
        });
        return callback(null, _this.polyglot);
      };
    })(this));
  };

  LocalizationManager.prototype.t = function(key, params) {
    var ref;
    if (params == null) {
      params = {};
    }
    return (ref = this.polyglot) != null ? ref.t(key, params) : void 0;
  };

  LocalizationManager.prototype.render = function(name, options, callback) {
    return this.ensureReady((function(_this) {
      return function(err) {
        var viewName;
        if (err) {
          return callback(err);
        }
        viewName = _this.polyglot.currentLocale + "_" + name;
        return _this.renderer(viewName, options, callback);
      };
    })(this));
  };

  return LocalizationManager;

})();

module.exports = new LocalizationManager();
