class MasMenu {
  constructor(options) {
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
  setDataFromDOM() {
    this.$menuItems.forEach(item => {
      this.menu[item.innerHTML] = this.replacedSpaces(item.innerHTML.split(""));
    });
  }

  replacedSpaces(array) {
    return array.map((item, index) => {
      if (item === " ") {
        return "\xa0&nbsp;";
      } else {
        return item;
      }
    });
  }

  setDefaultMenu() {
    this.objectLoop(this.menu, objectKey => {
      this.menu[objectKey] = objectKey.split("");
    });
    this.updateMenuUI();
  }

  updateMenuUI() {
    this.objectLoop(this.menu, (objectKey, index) => {
      this.$menuItems[index].innerHTML = this.menu[objectKey].join("");
    });
  }

  animateMenuItems(exeptMenuItemIndex) {
    this.objectLoop(this.menu, (objectKey, index) => {
      if (index === exeptMenuItemIndex) return false;

      let shuff = this.shuffler(objectKey, this.menu[objectKey]);

      this.intervals[objectKey] = setInterval(() => {
        shuff(this.intervals[objectKey]);
      }, this.speedPerLetterMs);
    });
  }

  clearIntervals() {
    this.objectLoop(this.intervals, objectKey => {
      clearInterval(this.intervals[objectKey]);
    });
    this.setDefaultMenu();
  }

  shuffler(key, value) {
    let length = value.length;
    let counter = 0;
    let clonedArray = value;

    return intervalID => {
      if (counter === length) {
        clearInterval(intervalID);
        return false;
      } else {
        let shuffledArray = this.shuffleArray(
          clonedArray.slice(counter, length)
        );

        while (this.compareArrays(clonedArray, shuffledArray)) {
          shuffledArray = this.shuffleArray(clonedArray.slice(counter, length));
        }
        if (this.randomMode) {
          clonedArray = clonedArray.slice(0, counter).concat(shuffledArray);
          this.menu[key] = clonedArray;
        } else {
          this.menu[key] = clonedArray.slice(0, counter).concat(shuffledArray);
        }

        this.updateMenuUI();
        counter++;
        return true;
      }
    };
  }

  /**
   * Helpers
   */
  shuffleArray(arr) {
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  compareArrays(array1, array2) {
    let state = true;
    array1.forEach(item => {
      array2.forEach(itemCompare => {
        if (item === itemCompare) state = false;
      });
    });
    return state;
  }

  objectLoop(object, fn) {
    Object.keys(object).forEach(fn);
  }

  /**
   * Event listeners
   */
  setEvents() {
    this.$menuItems.forEach((item, i) => {
      item.addEventListener("mouseenter", () => {
        this.animateMenuItems(i);
      });
      item.addEventListener("mouseleave", () => {
        this.clearIntervals();
      });
    });
  }

  /**
   * Initialization
   */
  init() {
    this.setDataFromDOM();
    this.setEvents();
  }
}
