/*global describe:true,it:true, after:true,before:true,afterEach:true,beforeEach:true */
describe("while", function() {

    it("while - promises", function() {

        // https://stackoverflow.com/questions/29375100/while-loop-using-bluebird-promises
        const job = () => Promise.resolve(Math.random() < 0.5 ? "done" : "not-done");

        function promiseWhile(predicate, action, value) {
            return Promise.resolve(value).then(predicate).then(function(condition) {
                if (condition)
                    return promiseWhile(predicate, action, action());
            });
        }
        return promiseWhile((result) => result != "done", job);
    });

    
});