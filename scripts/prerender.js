const fs = require("fs");
const path = require("path");
const Module = require("module");

process.env.NODE_ENV = "production";

const projectRoot = path.resolve(__dirname, "..");
const sourceDirectory = path.join(projectRoot, "src");
const buildDirectory = path.join(projectRoot, "build");
const deploymentDirectory = path.join(projectRoot, "hostinger-frontend");
const babel = require("@babel/core");
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  const resolvedRequest = request.startsWith("@/")
    ? path.join(sourceDirectory, request.slice(2))
    : request;
  return originalResolveFilename.call(this, resolvedRequest, parent, isMain, options);
};

function compileSource(module, filename) {
  const result = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    presets: [[require.resolve("babel-preset-react-app"), { runtime: "automatic" }]],
    sourceType: "unambiguous",
  });
  module._compile(result.code, filename);
}

const originalJsLoader = require.extensions[".js"];
require.extensions[".js"] = (module, filename) => {
  if (filename.startsWith(sourceDirectory + path.sep)) {
    compileSource(module, filename);
    return;
  }
  originalJsLoader(module, filename);
};
require.extensions[".jsx"] = compileSource;
require.extensions[".css"] = () => {};

const React = require("react");
const { renderToString } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
const { QueryClient, QueryClientProvider } = require("@tanstack/react-query");
const { AppRoutes } = require(path.join(sourceDirectory, "App.js"));
const { PUBLIC_ROUTES, getPageMetadata, getStructuredData } = require(path.join(
  sourceDirectory,
  "lib",
  "seo.js",
));

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function createHeadMetadata(metadata) {
  const tags = [
    `<meta name="description" content="${escapeAttribute(metadata.description)}" />`,
  ];

  if (metadata.robots) {
    tags.push(`<meta name="robots" content="${escapeAttribute(metadata.robots)}" />`);
  }
  if (metadata.canonical) {
    tags.push(`<link rel="canonical" href="${escapeAttribute(metadata.canonical)}" />`);
  }
  if (metadata.type) {
    tags.push(`<meta property="og:type" content="${escapeAttribute(metadata.type)}" />`);
  }
  if (metadata.title) {
    tags.push(`<meta property="og:title" content="${escapeAttribute(metadata.title)}" />`);
  }
  if (metadata.description) {
    tags.push(
      `<meta property="og:description" content="${escapeAttribute(metadata.description)}" />`,
    );
  }
  if (metadata.url) {
    tags.push(`<meta property="og:url" content="${escapeAttribute(metadata.url)}" />`);
  }
  if (metadata.image) {
    tags.push(`<meta property="og:image" content="${escapeAttribute(metadata.image)}" />`);
    tags.push(`<meta property="og:image:alt" content="${escapeAttribute(metadata.imageAlt)}" />`);
  }
  if (metadata.siteName) {
    tags.push(`<meta property="og:site_name" content="${escapeAttribute(metadata.siteName)}" />`);
  }
  if (metadata.twitterCard) {
    tags.push(`<meta name="twitter:card" content="${escapeAttribute(metadata.twitterCard)}" />`);
    tags.push(`<meta name="twitter:title" content="${escapeAttribute(metadata.title)}" />`);
    tags.push(
      `<meta name="twitter:description" content="${escapeAttribute(metadata.description)}" />`,
    );
    if (metadata.image) {
      tags.push(`<meta name="twitter:image" content="${escapeAttribute(metadata.image)}" />`);
    }
  }

  return tags.join("\n        ");
}

function renderDocument(template, route) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false,
      },
    },
  });
  const app = React.createElement(
    StaticRouter,
    { location: route },
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(AppRoutes),
    ),
  );
  const markup = renderToString(app);
  const metadata = getPageMetadata(route);
  const rootMarkup = `<div id="root">${markup}</div>`;
  const structuredData = getStructuredData(route);

  if (!template.includes('<div id="root"></div>')) {
    throw new Error("The build HTML template does not contain an empty root element.");
  }
  const metadataPlaceholder =
    /<meta name="route-metadata-placeholder" content="replace-at-build"\s*\/?>/;
  if (!metadataPlaceholder.test(template)) {
    throw new Error("The build HTML template is missing the route metadata marker.");
  }
  const structuredDataPlaceholder =
    /<meta name="route-structured-data-placeholder" content="replace-at-build"\s*\/?>/;
  if (!structuredDataPlaceholder.test(template)) {
    throw new Error("The build HTML template is missing the structured data marker.");
  }
  const structuredDataTag = structuredData
    ? `<script id="tsm-nexus-jsonld" type="application/ld+json">${JSON.stringify(
        structuredData,
      ).replace(/</g, "\\u003c")}</script>`
    : "";

  return template
    .replace('<div id="root"></div>', rootMarkup)
    .replace(metadataPlaceholder, createHeadMetadata(metadata))
    .replace(structuredDataPlaceholder, structuredDataTag)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(metadata.title)}</title>`);
}

function writeRoute(template, route) {
  const html = renderDocument(template, route);
  const routeDirectory = route === "/"
    ? buildDirectory
    : path.join(buildDirectory, route.slice(1));
  const outputPath = path.join(routeDirectory, "index.html");
  fs.mkdirSync(routeDirectory, { recursive: true });
  fs.writeFileSync(outputPath, html);
  return outputPath;
}

const templatePath = path.join(buildDirectory, "index.html");
if (!fs.existsSync(templatePath)) {
  throw new Error(`Build HTML template not found: ${templatePath}`);
}

const template = fs.readFileSync(templatePath, "utf8");
const renderedRoutes = [...PUBLIC_ROUTES, "/admin", "/404"];

for (const route of renderedRoutes) {
  writeRoute(template, route);
}

fs.copyFileSync(
  path.join(buildDirectory, "404", "index.html"),
  path.join(buildDirectory, "404.html"),
);
fs.cpSync(buildDirectory, deploymentDirectory, { recursive: true });
console.log(
  `Pre-rendered ${renderedRoutes.length} routes and updated build/ and hostinger-frontend/.`,
);
