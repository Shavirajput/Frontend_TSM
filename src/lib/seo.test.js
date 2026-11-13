import { getPageMetadata, getStructuredData, PUBLIC_ROUTES } from "./seo";

describe("route SEO metadata", () => {
  test.each(PUBLIC_ROUTES)("%s has a self-referencing canonical URL", (route) => {
    const metadata = getPageMetadata(route);
    const expectedUrl = route === "/" ? "https://tsmnexus.in/" : `https://tsmnexus.in${route}`;

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
    expect(metadata.canonical).toBe(expectedUrl);
    expect(metadata.url).toBe(expectedUrl);
    expect(metadata.robots).toBe("index, follow");
  });

  it("uses unique titles and descriptions for every public route", () => {
    const metadata = PUBLIC_ROUTES.map(getPageMetadata);

    expect(new Set(metadata.map((page) => page.title)).size).toBe(PUBLIC_ROUTES.length);
    expect(new Set(metadata.map((page) => page.description)).size).toBe(PUBLIC_ROUTES.length);
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

  it("adds a matching Article node only for the editorial field guide", () => {
    const guide = getStructuredData("/guide");
    const home = getStructuredData("/");
    const guideArticle = guide["@graph"].find((node) => node["@type"] === "Article");

    expect(guideArticle.headline).toBe("The Website Revenue Leak Field Guide");
    expect(guideArticle.mainEntityOfPage["@id"]).toBe("https://tsmnexus.in/guide#webpage");
    expect(home["@graph"].some((node) => node["@type"] === "Article")).toBe(false);
    expect(getStructuredData("/admin")).toBeNull();
  });
});
