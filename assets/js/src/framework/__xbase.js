
var Llaneza = function() {

    var mergeNodeLists = (a, b) => {

      let slice = Array.prototype.slice;
      return slice.call(a).concat(slice.call(b));
    };


    var closest = (elem, find) => {

        var firstChar = find.charAt(0);

        while (elem && elem !== document) {

            elem = elem.parentNode;
            // If selector is a class
            if ( firstChar === '.' ) {
                if (elem.classList.contains(find.substr(1))) { return elem; }
            }
            // If selector is an id
            if ( firstChar === '#' ) {

                if (elem.id === find.substr(1)) { return elem; }
            } 
            // If selector is a tag
            if ( elem.tagName.toLowerCase() === find ) { return elem; }
        }
        return false;
    };

    
    var all = (name) => {

        return document.querySelectorAll(name);
    };
    
    var one = (name) => {

        return document.querySelector(name);
    };

    var getElem = (name) => {

        let con = new Llaneza.DomContainer();
        con.elements = document.querySelectorAll(name);
        return con
    }
    
    return { 
        all: all, 
        one: one, 
        getElem: getElem, 
        mergeNodeLists: mergeNodeLists, 
        closest: closest 
    };
}

Llaneza.prototype.DomContainer = function() {

    this.elements = null;

    this.on = (event, fn) => {

        Array.from(this.elements).forEach(el => {

            el.addEventListener(event, fn, false);
        });

        return this;
    };

    this.off = (event, fn) => {

        Array.from(this.elements).forEach(el => {

            el.removeEventListener(event, fn);
        });

        return this;
    };

    this.addClass = (cl) => {

        Array.from(this.elements).forEach(el => {

            el.classList.add(cl);
        });

        return this;
    };

    this.removeClass = (cl) => {

        Array.from(this.elements).forEach(el => {

            el.classList.remove(cl);
        });

        return this;
    };
}

module.exports = Llaneza;



