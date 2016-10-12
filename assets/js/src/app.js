const cats = require('./cats.js');
console.log(cats());


const LLAnimation = require('./framework/_animation.js');

const obj1 = LLAnimation.init();

obj1.animate({
    options : { duration : 500, ease : [ 0.89,0.1,0.99,0.12 ] },
    run: function(rate) { 
          console.log(rate);
    }
});