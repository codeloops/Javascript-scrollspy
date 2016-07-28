(function(){
  "use strict";

  var Menu = function() {

    if(Menu.instance) {
      return Menu.instance;
    }

    this.menulist = [];
    this.contentlist = [];
    this.fromTop = [];
    this.fromBottom = [];
    this.exists = false;
    this.currentDiv = "avaleht";
    this.runned = false;

    Menu.instance = this;

    this.init();
    };

    window.Menu = Menu;

    Menu.prototype = {
      init: function() {
        this.getMenuItems();
      },

      getMenuItems: function() {
        var items = document.querySelector("#my-menu").childNodes;

        for(var i = 0; i < items.length; i++) {
          if(items[i].nodeType !== Node.TEXT_NODE) {
            this.menulist.push(items[i]);
          }
        }
        this.getContentItems();
      },

      getContentItems: function() {
        var items = document.querySelector("#my-content").childNodes;

        for(var i = 0; i < items.length; i++) {
          if(items[i].nodeType !== Node.TEXT_NODE) {
            this.contentlist.push(items[i]);
          }
        }

        this.getItemsLocation();
      },

      getItemsLocation: function() {
        for(var i = 0; i < this.contentlist.length; i++) {
          this.fromTop.push(this.contentlist[i].offsetTop - 20);
          this.fromBottom.push(this.contentlist[i].offsetHeight + this.contentlist[i].offsetTop);
        }
        if(!this.exists) {
          document.querySelector("#my-content").addEventListener('scroll', this.listenScroll.bind(this));
          this.exists = true;
        }
      },

      listenScroll: function() {
        var content = document.querySelector("#my-content");
        var check = false;
        for(var i = 0; i < this.fromTop.length; i++) {

          if(this.fromTop[i] - 500 <= content.scrollTop && this.fromBottom[i] - 500 >= content.scrollTop) {
              this.removeOthers();
              this.menulist[i].childNodes[1].className += " item-active";
              this.menulist[i].childNodes[3].className = "active";
              check = true;
          }

        }

      },

      removeOthers: function() {
        var all_items = document.querySelectorAll(".item-active");
        var all_texts = document.querySelectorAll(".active");

        for(var i = 0; i < all_items.length; i++) {
          all_items[i].className = "menu-item";
          all_texts[i].className = "not-active";
        }
      }

    };

    window.onload = function() {
      var menu = new Menu();

    };

}) ();
