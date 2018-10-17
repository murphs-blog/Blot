describe("template", function() {
  require("./setup")({ createTemplate: true });

  var update = require("../update");

  it("updates a template", function(done) {
    var description = this.fake.random.word();
    update(this.template.id, { description: description }, function(
      err,
      template
    ) {
      if (err) return done.fail(err);
      expect(template.description).toEqual(description);
      done();
    });
  });

  it("returns an error if you update a template which does not exist", function(done) {
    update(this.fake.random.word(), {}, function(err) {
      expect(err instanceof Error).toEqual(true);
      done();
    });
  });
});