"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MasMenu = (function() {
  function MasMenu(options) {
    _classCallCheck(this, MasMenu);

    if (!options) options = {};

    // Selectors
    this.$menu = options.el;
    this.$menu =
      typeof this.$menu == "string"
        ? document.querySelector(this.$menu)
        : this.$menu;
    this.$menuItems = Array.from(this.$menu.children);

    // Options
    (this.randomMode = options.randomMode || false),
      (this.speedPerLetterMs = options.speedPerLetterMs || 100);

    // State
    this.menu = {};
    this.intervals = {};

    // Initialization
    this.init();
  }

  /**
   * Menu
   */

  _createClass(MasMenu, [
    {
      key: "setDataFromDOM",
      value: function setDataFromDOM() {
        var _this = this;

        this.$menuItems.forEach(function(item) {
          _this.menu[item.innerHTML] = _this.replacedSpaces(
            item.innerHTML.split("")
          );
        });
      }
    },
    {
      key: "replacedSpaces",
      value: function replacedSpaces(array) {
        return array.map(function(item, index) {
          if (item === " ") {
            return "\xa0&nbsp;";
          } else {
            return item;
          }
        });
      }
    },
    {
      key: "setDefaultMenu",
      value: function setDefaultMenu() {
        var _this2 = this;

        this.objectLoop(this.menu, function(objectKey) {
          _this2.menu[objectKey] = objectKey.split("");
        });
        this.updateMenuUI();
      }
    },
    {
      key: "updateMenuUI",
      value: function updateMenuUI() {
        var _this3 = this;

        this.objectLoop(this.menu, function(objectKey, index) {
          _this3.$menuItems[index].innerHTML = _this3.menu[objectKey].join("");
        });
      }
    },
    {
      key: "animateMenuItems",
      value: function animateMenuItems(exeptMenuItemIndex) {
        var _this4 = this;

        this.objectLoop(this.menu, function(objectKey, index) {
          if (index === exeptMenuItemIndex) return false;

          var shuff = _this4.shuffler(objectKey, _this4.menu[objectKey]);

          _this4.intervals[objectKey] = setInterval(function() {
            shuff(_this4.intervals[objectKey]);
          }, _this4.speedPerLetterMs);
        });
      }
    },
    {
      key: "clearIntervals",
      value: function clearIntervals() {
        var _this5 = this;

        this.objectLoop(this.intervals, function(objectKey) {
          clearInterval(_this5.intervals[objectKey]);
        });
        this.setDefaultMenu();
      }
    },
    {
      key: "shuffler",
      value: function shuffler(key, value) {
        var _this6 = this;

        var length = value.length;
        var counter = 0;
        var clonedArray = value;

        return function(intervalID) {
          if (counter === length) {
            clearInterval(intervalID);
            return false;
          } else {
            var shuffledArray = _this6.shuffleArray(
              clonedArray.slice(counter, length)
            );

            while (_this6.compareArrays(clonedArray, shuffledArray)) {
              shuffledArray = _this6.shuffleArray(
                clonedArray.slice(counter, length)
              );
            }
            if (_this6.randomMode) {
              clonedArray = clonedArray.slice(0, counter).concat(shuffledArray);
              _this6.menu[key] = clonedArray;
            } else {
              _this6.menu[key] = clonedArray
                .slice(0, counter)
                .concat(shuffledArray);
            }

            _this6.updateMenuUI();
            counter++;
            return true;
          }
        };
      }

      /**
       * Helpers
       */
    },
    {
      key: "shuffleArray",
      value: function shuffleArray(arr) {
        return arr
          .map(function(a) {
            return [Math.random(), a];
          })
          .sort(function(a, b) {
            return a[0] - b[0];
          })
          .map(function(a) {
            return a[1];
          });
      }
    },
    {
      key: "compareArrays",
      value: function compareArrays(array1, array2) {
        var state = true;
        array1.forEach(function(item) {
          array2.forEach(function(itemCompare) {
            if (item === itemCompare) state = false;
          });
        });
        return state;
      }
    },
    {
      key: "objectLoop",
      value: function objectLoop(object, fn) {
        Object.keys(object).forEach(fn);
      }

      /**
       * Event listeners
       */
    },
    {
      key: "setEvents",
      value: function setEvents() {
        var _this7 = this;

        this.$menuItems.forEach(function(item, i) {
          item.addEventListener("mouseenter", function() {
            _this7.animateMenuItems(i);
          });
          item.addEventListener("mouseleave", function() {
            _this7.clearIntervals();
          });
        });
      }

      /**
       * Initialization
       */
    },
    {
      key: "init",
      value: function init() {
        this.setDataFromDOM();
        this.setEvents();
      }
    }
  ]);

  return MasMenu;
})();
