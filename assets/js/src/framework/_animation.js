const BezierEasing = require('./_animation-easing.js');

var _requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;                           

var LLAnimation = {}; 

LLAnimation.init = function(item) {

  return Object.assign({}, LLAnimation);
}

LLAnimation.animate = function(item) {

    var self = this;

    this.options = {
        duration: 500,
        ease: false,
        bezier: null,
        waiting: false,
        delay: false
    }

    this.prevPromise = this.prevPromise || null;

    const promise = new Promise((resolve, reject) => self.resolve = resolve );

    Object.assign(self.options, item.options);

    if (typeof this.options.ease === "object") {
      let [a,b,c,d] = this.options.ease;
      this.options.bezier = BezierEasing(a,b,c,d);
    }
  
    this.step = () => {

        let current = +new Date(),
            remaining = self.end - current;

        if(remaining < 50) {

          item.run(1);  //1 = progress is at 100%
          self.resolve();
          return;
        } 
        else {

          let rate = remaining / self.options.duration;

          if (typeof this.options.bezier === "function") {
            rate = this.options.bezier( 1 - rate );
          }
          else if ( self.options.ease) { rate = Math.sqrt((1-rate) *(2-(1-rate))); }
          else { rate = 1 - rate; } 

          item.run(rate);
        }

        _requestAnimationFrame(self.step);
    }

    this.start = () => {

        if (self.options.delay) {
          
          setTimeout(() => {
            self.end = +new Date() + this.options.duration;
            self.step();
          }, self.options.delay);
        }
        else {

          self.end = +new Date() + this.options.duration;
          self.step();
        }

    }

    if (self.prevPromise) {

        if (self.options.waiting) { 

          self.prevPromise.then(() => self.start() ); 
        }
        else {
          
          self.start();
        }
    }
    else {

      self.start();
    }

    let nextAnimation = Object.assign({}, LLAnimation);
    nextAnimation.prevPromise = promise;

    return nextAnimation;
}



LLAnimation.scrollTo = function(item) {

    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop

    let scrollBy = item.to.getBoundingClientRect().top;

    let options = {
        duration: 500,
        ease: false
    }

    Object.assign(options, item.options)

    LLAnimation.animate({
      options : options,
      run: function(rate) { 
          window.scrollTo(0, scrollTop + scrollBy*rate);
      }
    })
}


LLAnimation.animateStaggered = function(items) { 

    var obj =  Object.assign({}, LLAnimation);

    [].forEach.call(items.elements, el => {

        obj = obj.animate({
          options : items.options,
          run: function(rate) { 
                el.style[items.attribute] = 1-rate;
            }
        });
    }); 

    return obj;
};

// var objScrollAni = LLAnimation.init();

// setTimeout(function() { 
//   objScrollAni.scrollTo({
//      options : { duration : 400, ease : true },
//      to : document.querySelector("#two")
//   });
// }, 1000);

// setTimeout(function() {

//   var obj1 = LLAnimation.init();
//   var obj2 = LLAnimation.init();
//   obj1.animate({
//     options : { duration : 500, ease : false },
//     run: function(rate) { 
//           document.querySelector("h1").style.transform = "translateY("+ (100 * rate) + "px)";
//       }
//     }).animate({
//     options : { duration : 500, ease : true, waiting : true },
//     run: function(rate) { 
//           document.querySelector("h1").style.transform = "translateY(100px) translateX("+ (100 * rate) + "px)";
//       }
//     }).animate({
//     options : { duration : 500, ease : true, delay : 500 },
//     run: function(rate) { 
//           document.querySelector("h1").style.opacity = 1-rate;
//       }
//   });

//   obj2.animateStaggered({
//     options : { duration : 200, ease : true, delay : 500, waiting : true },
//     elements : document.querySelectorAll("p"), 
//     attribute : "opacity"
//   }).animate({
//     options : { duration : 500, ease : false, waiting : true },
//     run: function(rate) { 
//           document.querySelector("h1").style.opacity = rate;
//       }
//   });  

// },1000);

module.exports = LLAnimation;
