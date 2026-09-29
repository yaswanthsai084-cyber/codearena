import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { CourseDetail, ThemeProvider } from "./dist-ssr/ssr-check.js";

const html = renderToStaticMarkup(
  createElement(
    ThemeProvider,
    null,
    createElement(
      MemoryRouter,
      { initialEntries: ["/courses/html-structure"] },
      createElement(CourseDetail),
    ),
  ),
);

const nav = html.slice(html.indexOf("<nav"), html.indexOf("</nav>") + 6);
console.log("NAV MARKUP:\n" + nav.replace(/></g, ">\n<") + "\n");

console.log("is-done occurrences:");
for (const m of html.matchAll(/class="[^"]*is-done[^"]*"/g)) {
  console.log("  " + m[0]);
}
