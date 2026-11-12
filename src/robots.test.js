const fs = require("fs");
const path = require("path");

describe("public robots.txt", () => {
  let contents;

  beforeAll(() => {
    contents = fs.readFileSync(path.resolve(process.cwd(), "public", "robots.txt"), "utf8");
  });

  test("contains valid crawler directives rather than an application document", () => {
    expect(contents).toMatch(/^User-agent: \*$/m);
    expect(contents).toMatch(/^Disallow:\s*$/m);
    expect(contents).not.toMatch(/<html|<!doctype/i);
  });

  test("does not invent a sitemap URL or expose application paths", () => {
    expect(contents).not.toMatch(/^Sitemap:/im);
    expect(contents).not.toMatch(/^Disallow: \/(?:admin|api)(?:\/|$)/im);
  });
});
