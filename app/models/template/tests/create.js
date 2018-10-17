describe("template", function() {
  require("./setup")();

  var create = require("../create");

  it("creates a template", function(done) {
    create(this.blog.id, this.fake.random.word(), {}, done);
  });

  it("returns an error if you try to create a template with no name", function(done) {
    create(this.blog.id, null, null, function(err) {
      expect(err instanceof TypeError).toBe(true);
      done();
    });
  });

  it("returns an error if you try to create a template which already exists", function(done) {
    var name = this.fake.random.word();
    var ctx = this;
    create(this.blog.id, name, {}, function(err) {
      if (err) return done.fail(err);
      create(ctx.blog.id, name, {}, function(err) {
        expect(err instanceof Error).toEqual(true);
        done();
      });
    });
  });

  it("creates a template from an existing template", function(done) {
    var ctx = this;
    var blogID = ctx.blog.id;
    var original = this.fake.random.word();
    var cloned = this.fake.random.word();
    var description = this.fake.random.word();

    create(blogID, original, { description: description }, function(
      err,
      originalTemplate
    ) {
      if (err) return done.fail(err);

      create(blogID, cloned, { cloneFrom: originalTemplate.id }, function(
        err,
        clonedTemplate
      ) {
        if (err) return done.fail(err);

        expect(originalTemplate.description).toEqual(
          clonedTemplate.description
        );
        done();
      });
    });
  });

  it("returns an error if you try to clone a template that does not exist", function(done) {
    create(
      this.blog.id,
      this.fake.random.word(),
      { cloneFrom: this.fake.random.word() },
      function(err) {
        expect(err instanceof Error).toBe(true);
        done();
      }
    );
  });
});