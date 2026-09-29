import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { courses } from "./src/data/courses.js";
import { CourseDetail, Courses, Home, ThemeProvider } from "./dist-ssr/ssr-check.js";

/* react escapes &, <, >, ' and " in the emitted markup, so
   compare against decoded text. */
const decode = (html) =>
  html
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const at = (path) =>
  decode(
    renderToStaticMarkup(
      createElement(
        ThemeProvider,
        null,
        createElement(
          MemoryRouter,
          { initialEntries: [path] },
          createElement(
            Routes,
            null,
            createElement(Route, { path: "/", element: createElement(Home) }),
            createElement(Route, { path: "/courses", element: createElement(Courses) }),
            createElement(Route, {
              path: "/courses/:courseId",
              element: createElement(CourseDetail),
            }),
          ),
        ),
      ),
    ),
  );

let failures = 0;
const check = (label, cond) => {
  if (cond) console.log("  ok   " + label);
  else {
    failures++;
    console.log("  FAIL " + label);
  }
};

console.log("--- course list page ---");
const list = at("/courses");
check("renders all " + courses.length + " cards", courses.every((c) => list.includes(c.id)));
check("every card links to its own page", courses.every((c) => list.includes("/courses/" + c.id)));
check("shared action labels present", ["Start Course", "Continue Learning", "Review Course"].every((l) => list.includes(l)));
check("card CTA is an anchor, not a dead button", !/<button[^>]*class="card-action/.test(list));
check("card titles are links", (list.match(/card-title-link/g) || []).length === courses.length);
check("list keeps Courses active", list.includes('class="active" href="/courses"'));

console.log("--- one page per card (" + courses.length + ") ---");
for (const c of courses) {
  const html = at("/courses/" + c.id);
  const bad = [];
  if (!html.includes(c.title)) bad.push("title");
  if (!html.includes(c.language)) bad.push("language");
  if (!html.includes(c.description)) bad.push("description");
  if (!html.includes(c.project)) bad.push("project");
  if (!c.highlights.every((h) => html.includes(h))) bad.push("highlights");
  if (!c.requirements.every((r) => html.includes(r))) bad.push("requirements");
  if (!c.modules.every((m) => html.includes(m))) bad.push("modules");
  for (const s of ["What you will learn", "Course curriculum", "Capstone project", "Before you start"]) {
    if (!html.includes(s)) bad.push("panel:" + s);
  }
  if (html.includes("Course not found")) bad.push("wrongly-not-found");
  if (c.progress === 0 && html.includes("In progress")) bad.push("false-progress");
  if (c.progress === 100 && !html.includes("Course completed")) bad.push("completed-label");
  if (c.progress > 0 && c.progress < 100 && !html.includes("In progress")) bad.push("missing-progress");

  const triggers = (html.match(/curriculum-trigger/g) || []).length;
  if (triggers !== c.modules.length) bad.push("triggers=" + triggers);

  const expectedDone = Math.min(
    c.modules.length,
    Math.floor((c.progress / 100) * c.modules.length),
  );
  const done = (html.match(/curriculum-item is-done/g) || []).length;
  if (done !== expectedDone) bad.push("done=" + done + " want " + expectedDone);

  const expectedCurrent =
    c.progress === 100 ? 0 : c.progress > 0 ? 1 : 1;
  const current = (html.match(/curriculum-item is-current/g) || []).length;
  if (current !== expectedCurrent) bad.push("current=" + current + " want " + expectedCurrent);

  const related = (html.match(/related-card/g) || []).length;
  if (related !== 3) bad.push("related=" + related);

  console.log((bad.length ? "  FAIL " : "  ok   ") + c.id + (bad.length ? " -> " + bad.join(", ") : ""));
  if (bad.length) failures++;
}

console.log("--- unknown id ---");
const missing = at("/courses/does-not-exist");
check("shows not-found state", missing.includes("Course not found"));
check("links back to the library", missing.includes('href="/courses"'));
check("renders no curriculum", !missing.includes("curriculum-trigger"));
check("navbar still present", missing.includes('class="navbar"'));

console.log("--- nav integration ---");
const detail = at("/courses/react-development");
check("detail marks Courses active", detail.includes('class="active" href="/courses"'));
check("Home marks Home active", at("/").includes('class="active" href="/"'));
check("Home does not mark Courses active", !at("/").includes('class="active" href="/courses"'));
check("exactly one navbar per page", (detail.match(/class="navbar"/g) || []).length === 1);
check("auth links intact", detail.includes('href="/login"') && detail.includes('href="/register"'));
check("enroll CTA present", detail.includes("enroll-button"));
check("breadcrumb present", detail.includes("detail-breadcrumb"));

console.log("--- related links resolve ---");
let linkFails = 0;
const ids = new Set(courses.map((c) => c.id));
for (const c of courses) {
  const html = at("/courses/" + c.id);
  const hrefs = [...html.matchAll(/href="\/courses\/([a-z0-9-]+)"/g)].map((m) => m[1]);
  const bad = [...new Set(hrefs)].filter((h) => h === c.id || !ids.has(h));
  if (bad.length) {
    linkFails++;
    console.log("  FAIL " + c.id + " -> " + bad.join(","));
  }
}
check("all related links point at real courses, never itself", linkFails === 0);

console.log(failures === 0 ? "\nALL CHECKS PASSED" : "\n" + failures + " CHECK(S) FAILED");
process.exit(failures === 0 ? 0 : 1);
