// add semicon here avoid if other code doesnt finish the semicolons out properly
// it will still run fine

;(function(global){

    var Blocstart = function(node, settings) {
        this.settings = extend({}, this.defaultSettings, settings);
        this.node = document.querySelectorAll(node) || false;

        console.log(this.node);
    }

    Blocstart.prototype.defaultSettings = {}

    // find childeren

    // create childeren
    // var Blocstart = function(node) {
    //     // Return a new object then use a function constructor to generate the property
    //     return new Blocstart.init(node); // this will return new object with an method init
    // }

    // get width

    // get height

    //  This is an object Literal
    // prototype holds method (to save memory space) to THIS object that is been created
    Blocstart.prototype = {

        getNode: function() {
            // document.querySelector();

        },

        newChild: function() {

        }


        // return = {}
    }

    // all of those objects created to point all methods on this prototype chain
    // Blocstart.init.prototype = Blocstart.prototype;

    global.Blocstart = Blocstart;

}(window));

