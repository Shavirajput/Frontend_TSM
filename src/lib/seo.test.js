import { getPageMetadata, PUBLIC_ROUTES } from "./seo";

describe("route SEO metadata", () => {
  test.each(PUBLIC_ROUTES)("%s has a self-referencing canonical URL", (route) => {
    const metadata = getPageMetadata(route);
    const expectedUrl = route === "/" ? "https://tsmnexus.in/" : `https://tsmnexus.in${route}`;

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
    expect(metadata.canonical).toBe(expectedUrl);
    expect(metadata.url).toBe(expectedUrl);
  });

  it("keeps admin pages out of search indexes", () => {
    const metadata = getPageMetadata("/admin/");

    expect(metadata.robots).toBe("noindex, nofollow");
    expect(metadata.canonical).toBeNull();
  });

  it("marks unknown routes as non-indexable not-found pages", () => {
    const metadata = getPageMetadata("/missing");

    expect(metadata.robots).toBe("noindex, nofollow");
    expect(metadata.canonical).toBeNull();
  });
});
