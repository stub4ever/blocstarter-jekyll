class Greet {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log('Hello there, you are using ' + this.name);
    }
}

// target parent folder name > ref to cons
module.exports = Greet;
// add objects methods of Greet
// exports.example = function() { };
// exports.exmaple1 = 'Exmaple 1';

