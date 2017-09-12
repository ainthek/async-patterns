/*global describe:true,it:true,	after:true,before:true,afterEach:true,beforeEach:true */
describe("do-while", function() {

    it("promises - ad hoc", function() {

        const job = () => Promise.resolve(Math.random() < 0.5 ? "done" : "not-done");
        const loop = () => job().then((result) => result != 'done' ? loop() : result);

        return loop();
    });
    it("callbacks - async module", function(done) {

        const { doWhilst } = require('async');

        doWhilst(
            function _do(callback) {
                callback(null, Math.random() < 0.5 ? "done" : "not-done");
            },
            function _while(result) {
                return result != 'done';
            },
            function _done(err, result) {
                done(err, result);
            }
        );
    });

    it("promises - doWhilst", function(done) {

        const job = () => Promise.resolve(Math.random() < 0.5 ? "done" : "not-done");
        const doWhilst = (job, test) => job().then((result) => test(result) ? doWhilst(job, test) : result);

        doWhilst(
            function _do() {
                return Promise.resolve(Math.random() < 0.5 ? "done" : "not-done");
            },
            function _while(result) {
                return result != 'done';
            }
        ).then(
            function _done(result) {
                console.log(result);
                done();
            },
            function _err(err) {
                done(err)
            }
        );

    });


});