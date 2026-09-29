/* =====================================================
   CODEARENA - COURSE CATALOG
   Single source of truth for the courses shown on the
   Courses page. Replace the static arrays below with an
   API response once the backend is wired up.
   ===================================================== */

export const CATEGORIES = [
  "All Categories",
  "Programming Basics",
  "Web Development",
  "Frontend",
  "Backend",
  "Databases",
];

export const LEVELS = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "az", label: "A – Z" },
  { value: "shortest", label: "Shortest First" },
];

/* `className` matches the language colour helpers already
   defined in Home.css, so the icons stay on brand. */
export const courses = [
  {
    id: "c-programming",
    title: "C Programming Fundamentals",
    language: "C",
    icon: "C",
    className: "c",
    category: "Programming Basics",
    level: "Beginner",
    description:
      "Start from the very first line of code. Learn variables, loops, functions and pointers the way C was designed to be taught.",
    lessons: 42,
    hours: 9,
    students: 12480,
    rating: 4.8,
    progress: 0,
    modules: [
      "Getting Started with C",
      "Variables & Data Types",
      "Loops & Conditionals",
      "Functions & Arrays",
      "Pointers & Memory",
      "Mini Project: Student Records",
    ],
    highlights: [
      "Write, compile and run a C program from a blank file",
      "Control flow with loops, conditionals and switch cases",
      "Split a problem into reusable functions and arrays",
      "Read and write pointers without the usual confusion",
    ],
    requirements: [
      "A C compiler — GCC, Clang or any online editor",
      "No prior programming experience required",
    ],
    project:
      "Build a student record system that stores, searches and updates entries in a text file.",
  },
  {
    id: "cpp-programming",
    title: "C++ Programming Mastery",
    language: "C++",
    icon: "C++",
    className: "cpp",
    category: "Programming Basics",
    level: "Intermediate",
    description:
      "Move from procedural C into OOP. Build on the STL, templates, file handling and clean program design.",
    lessons: 56,
    hours: 12,
    students: 9340,
    rating: 4.7,
    progress: 35,
    modules: [
      "C++ vs C Recap",
      "Classes & Objects",
      "Inheritance & Polymorphism",
      "Templates & Generics",
      "Standard Template Library",
      "File Handling & Exceptions",
    ],
    highlights: [
      "Move from procedural C to classes, objects and encapsulation",
      "Use inheritance, polymorphism and operator overloading with intent",
      "Pick the right STL container and write generic templates",
      "Handle errors with exceptions and read files safely",
    ],
    requirements: [
      "Comfortable with C — variables, loops, functions and arrays",
      "A C++17 compiler or an IDE such as VS Code",
    ],
    project:
      "Ship a library management app built on classes, STL containers and file-based storage.",
  },
  {
    id: "dsa-cpp",
    title: "Data Structures & Algorithms",
    language: "C++",
    icon: "C++",
    className: "cpp",
    category: "Programming Basics",
    level: "Advanced",
    description:
      "Ace the placement interview. Arrays, linked lists, trees, graphs and dynamic programming with visual walkthroughs.",
    lessons: 68,
    hours: 16,
    students: 7210,
    rating: 4.9,
    progress: 0,
    modules: [
      "Complexity Analysis",
      "Stacks, Queues & Deques",
      "Linked Lists",
      "Trees & Binary Search Trees",
      "Graphs & Shortest Paths",
      "Dynamic Programming",
    ],
    highlights: [
      "Judge code with Big-O and choose the right complexity up front",
      "Implement arrays, linked lists, stacks, queues and hash tables by hand",
      "Traverse trees and graphs with BFS, DFS and shortest paths",
      "Spot dynamic programming patterns and reuse them",
    ],
    requirements: [
      "Solid grasp of functions, recursion and arrays in C++",
      "Comfort with modular arithmetic and algebra",
    ],
    project:
      "Complete a placement question bank of 60 curated problems with a runnable test harness.",
  },
  {
    id: "java-programming",
    title: "Java OOP & Backend Development",
    language: "Java",
    icon: "☕",
    className: "java",
    category: "Programming Basics",
    level: "Intermediate",
    description:
      "Master classes, interfaces and collections, then wire it all up to a database with a clean layered backend.",
    lessons: 61,
    hours: 14,
    students: 11050,
    rating: 4.8,
    progress: 0,
    modules: [
      "Java Syntax & Setup",
      "Classes, Objects & Interfaces",
      "Collections Framework",
      "Exception Handling",
      "Working with Databases",
      "REST API Project",
    ],
    highlights: [
      "Model real domains with classes, interfaces and SOLID principles",
      "Choose between List, Set and Map instead of guessing",
      "Design an exception strategy that still works at scale",
      "Connect Java to a database and expose it over REST",
    ],
    requirements: [
      "Any prior programming language — concepts start from scratch",
      "JDK 17 or newer and an IDE such as IntelliJ IDEA",
    ],
    project:
      "Build a layered REST API for a library system backed by a real database.",
  },
  {
    id: "python-programming",
    title: "Python for Absolute Beginners",
    language: "Python",
    icon: "🐍",
    className: "python",
    category: "Programming Basics",
    level: "Beginner",
    description:
      "The friendliest way into programming. Clear explanations, tiny exercises and automation projects from day one.",
    lessons: 38,
    hours: 7,
    students: 18620,
    rating: 4.9,
    progress: 60,
    modules: [
      "Python Setup & First Program",
      "Strings & Data Types",
      "Lists, Tuples & Dictionaries",
      "Loops & Functions",
      "Files & Modules",
      "Project: Expense Tracker",
    ],
    highlights: [
      "Read Python confidently — indentation, types and slicing",
      "Write functions that take arguments and return values",
      "Work with lists, tuples and dictionaries for real tasks",
      "Automate small daily chores with files and modules",
    ],
    requirements: [
      "A Python 3 interpreter — lessons run on any OS",
      "No prior programming experience required",
    ],
    project:
      "Build a command line expense tracker that saves and summarises spending by month.",
  },
  {
    id: "html-structure",
    title: "HTML5 from Scratch",
    language: "HTML",
    icon: "5",
    className: "html",
    category: "Frontend",
    level: "Beginner",
    description:
      "Build semantic, accessible page structures and learn the HTML5 elements that modern frameworks still rely on.",
    lessons: 24,
    hours: 4,
    students: 15760,
    rating: 4.6,
    progress: 100,
    modules: [
      "Document Structure",
      "Text & Semantic Tags",
      "Links & Navigation",
      "Images, Audio & Video",
      "Forms & Inputs",
      "Accessibility Basics",
    ],
    highlights: [
      "Structure documents with semantic tags instead of div soup",
      "Build forms with labels, validation and helpful error text",
      "Embed images, audio and video with correct fallbacks",
      "Apply the accessibility and SEO habits reviewers check",
    ],
    requirements: [
      "Any text editor and a modern browser",
      "No coding experience required",
    ],
    project:
      "Build a semantic, accessible portfolio page with a fully validated contact form.",
  },
  {
    id: "css-styling",
    title: "Modern CSS & Layouts",
    language: "CSS",
    icon: "3",
    className: "css",
    category: "Frontend",
    level: "Intermediate",
    description:
      "Flexbox, Grid, animations and responsive design. Stop fighting CSS and start enjoying it.",
    lessons: 51,
    hours: 11,
    students: 14890,
    rating: 4.8,
    progress: 0,
    modules: [
      "Selectors & Specificity",
      "The Box Model",
      "Flexbox",
      "CSS Grid",
      "Transitions & Animations",
      "Responsive Project",
    ],
    highlights: [
      "Predict any layout from the box model and specificity",
      "Build responsive rows and grids with Flexbox and CSS Grid",
      "Animate interfaces that react to the user's intent",
      "Organise styles with custom properties and modern CSS",
    ],
    requirements: [
      "Basic HTML — the HTML5 from Scratch course covers this",
      "A browser with developer tools open",
    ],
    project:
      "Recreate a complete responsive landing page from a design reference using only CSS.",
  },
  {
    id: "react-development",
    title: "React Development Bootcamp",
    language: "React",
    icon: "⚛",
    className: "react",
    category: "Frontend",
    level: "Intermediate",
    description:
      "Components, props, state and hooks, then router, data fetching and a dashboard you can actually ship.",
    lessons: 64,
    hours: 15,
    students: 19740,
    rating: 4.9,
    progress: 0,
    modules: [
      "Components & JSX",
      "Props & Composition",
      "State with useState",
      "Effects & Data Fetching",
      "Context & Custom Hooks",
      "React Router Project",
    ],
    highlights: [
      "Split an interface into components that compose cleanly",
      "Hold state, lift it up and pass data down with props",
      "Fetch, cache and render async data with effects and hooks",
      "Build multi page apps with React Router",
    ],
    requirements: [
      "Comfortable with modern JavaScript and ES6 syntax",
      "Node.js installed for the project lessons",
    ],
    project:
      "Ship a dashboard with routing, data fetching, search and reusable components.",
  },
  {
    id: "node-backend",
    title: "Node.js & Express Backend",
    language: "Node.js",
    icon: "⬡",
    className: "node",
    category: "Backend",
    level: "Intermediate",
    description:
      "Go full stack. Design REST APIs, wire up authentication and connect a real database to a production-style server.",
    lessons: 58,
    hours: 14,
    students: 10230,
    rating: 4.7,
    progress: 0,
    modules: [
      "Node Runtime & Modules",
      "Your First Express Server",
      "REST API Design",
      "Middleware & Error Handling",
      "Authentication & JWT",
      "Deploying to Production",
    ],
    highlights: [
      "Design REST APIs that are predictable and easy to consume",
      "Write middleware for logging, auth and error handling",
      "Authenticate users with hashed passwords and JWT",
      "Deploy a server with environment variables and a database",
    ],
    requirements: [
      "JavaScript fundamentals and a little HTTP knowledge",
      "Node.js 18 or newer installed locally",
    ],
    project:
      "Deploy a production style API with JWT auth, validation and a live database.",
  },
  {
    id: "sql-database",
    title: "SQL for Absolute Beginners",
    language: "SQL",
    icon: "▤",
    className: "sql",
    category: "Databases",
    level: "Beginner",
    description:
      "Ask databases questions in plain English and get the answers back as clean, efficient queries.",
    lessons: 33,
    hours: 6,
    students: 13980,
    rating: 4.7,
    progress: 0,
    modules: [
      "Databases & Tables",
      "SELECT, WHERE, ORDER BY",
      "INSERT, UPDATE, DELETE",
      "Joins & Relationships",
      "GROUP BY & Aggregates",
      "Subqueries & Views",
    ],
    highlights: [
      "Create tables with keys and constraints that protect your data",
      "Filter, sort and limit results with WHERE, ORDER BY and LIMIT",
      "Write safe INSERT, UPDATE and DELETE statements",
      "Join tables and summarise data with GROUP BY",
    ],
    requirements: [
      "Any SQL sandbox — SQLite and MySQL both work",
      "No database experience required",
    ],
    project:
      "Design a shop database and answer 25 real business questions with queries.",
  },
  {
    id: "mongodb",
    title: "MongoDB with Node.js",
    language: "MongoDB",
    icon: "◆",
    className: "mongodb",
    category: "Databases",
    level: "Intermediate",
    description:
      "Model documents, write practical queries and connect MongoDB to an Express app with Mongoose.",
    lessons: 41,
    hours: 9,
    students: 8940,
    rating: 4.6,
    progress: 0,
    modules: [
      "Documents vs Rows",
      "CRUD Operations",
      "Querying & Filtering",
      "Aggregation Pipeline",
      "Mongoose Schemas",
      "Connecting to Express",
    ],
    highlights: [
      "Model data as documents and pick sensible collections",
      "Write CRUD operations and expressive query filters",
      "Summarise data with the aggregation pipeline",
      "Connect MongoDB to Express through Mongoose schemas",
    ],
    requirements: [
      "Node.js basics and a local or cloud MongoDB instance",
      "Comfort reading JSON documents",
    ],
    project:
      "Build a contact manager API with Mongoose schemas, validation and search.",
  },
  {
    id: "postgresql",
    title: "PostgreSQL Advanced Queries",
    language: "PostgreSQL",
    icon: "🐘",
    className: "postgres",
    category: "Databases",
    level: "Advanced",
    description:
      "Window functions, CTEs, indexing strategy and query tuning — the SQL that separates developers from database users.",
    lessons: 49,
    hours: 11,
    students: 6120,
    rating: 4.9,
    progress: 0,
    modules: [
      "Advanced Joins",
      "Window Functions",
      "Common Table Expressions",
      "Indexes & Query Plans",
      "Transactions & Locking",
      "Performance Tuning",
    ],
    highlights: [
      "Write advanced joins and window functions for reporting",
      "Structure large queries with common table expressions",
      "Read query plans and design indexes that actually help",
      "Tune performance and reason about transactions and locking",
    ],
    requirements: [
      "Solid SQL fundamentals including joins and GROUP BY",
      "Access to a PostgreSQL instance for the exercises",
    ],
    project:
      "Optimise a slow e-commerce dataset down to a measured runtime target.",
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    language: "JavaScript",
    icon: "JS",
    className: "javascript",
    category: "Web Development",
    level: "Beginner",
    description:
      "The language of the web, taught properly. Variables, functions, the DOM and async — no hand-waving.",
    lessons: 47,
    hours: 10,
    students: 21340,
    rating: 4.9,
    progress: 0,
    modules: [
      "Variables, Types & Scope",
      "Functions & Closures",
      "Arrays & Objects",
      "The DOM",
      "Events & Forms",
      "Fetch & Async/Await",
    ],
    highlights: [
      "Understand types, coercion and scope without guesswork",
      "Write functions that compose, including closures",
      "Manipulate the DOM and handle events and form submission",
      "Call APIs with fetch, async/await and real error handling",
    ],
    requirements: [
      "A modern browser and a text editor",
      "No prior programming experience required",
    ],
    project:
      "Build a live weather dashboard that fetches data and handles failure states.",
  },
];

/**
 * Narrows the catalog down using the current search
 * term, category, level and sort order.
 */
export function selectCourses({
  search,
  category,
  level,
  sort,
}) {
  const term = search.trim().toLowerCase();

  const filtered = courses.filter((course) => {
    const matchesSearch =
      !term ||
      course.title.toLowerCase().includes(term) ||
      course.language.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term);

    const matchesCategory =
      category === CATEGORIES[0] ||
      course.category === category;

    const matchesLevel =
      level === LEVELS[0] || course.level === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sorters = {
    popular: (a, b) => b.students - a.students,
    rating: (a, b) => b.rating - a.rating,
    az: (a, b) => a.title.localeCompare(b.title),
    shortest: (a, b) => a.hours - b.hours,
  };

  return [...filtered].sort(
    sorters[sort] ?? sorters.popular,
  );
}

/** Formats 12480 as "12.4k" for the student count. */
export function formatStudents(count) {
  return count >= 1000
    ? `${(count / 1000).toFixed(1)}k`
    : String(count);
}

/**
 * Looks a course up by the :courseId route param.
 * Returns null so the page can render a not-found state.
 */
export function getCourseById(id) {
  return courses.find((course) => course.id === id) ?? null;
}

/**
 * Courses shown at the bottom of a detail page: same
 * category first, then same language, never the course
 * itself. Keeps the suggestions useful on a small catalog.
 */
export function getRelatedCourses(course, limit = 3) {
  if (!course) {
    return [];
  }

  return courses
    .filter((item) => item.id !== course.id)
    .sort((a, b) => {
      const score = (item) => {
        if (item.category === course.category) {
          return 2;
        }

        return item.language === course.language ? 1 : 0;
      };

      return score(b) - score(a);
    })
    .slice(0, limit);
}

/**
 * Spreads a course's lesson count across its modules and
 * flags each one as done / current / locked based on the
 * stored progress, so the detail page needs no extra data.
 */
export function buildCurriculum(course) {
  const moduleCount = course.modules.length;
  const doneCount = Math.min(
    moduleCount,
    Math.floor((course.progress / 100) * moduleCount),
  );

  return course.modules.map((title, index) => {
    const lessons = Math.max(
      1,
      Math.round(course.lessons / moduleCount),
    );
    const minutes = Math.max(
      10,
      Math.round((course.hours * 60) / moduleCount),
    );

    return {
      id: `${course.id}-module-${index}`,
      number: index + 1,
      title,
      lessons,
      minutes,
      status:
        index < doneCount
          ? "done"
          : index === doneCount && course.progress < 100
            ? "current"
            : "locked",
    };
  });
}

/**
 * One label for the main call to action so the course card
 * and the detail page never disagree about it.
 */
export function getCourseActionLabel(course) {
  if (course.progress === 100) {
    return "Review Course";
  }

  return course.progress > 0
    ? "Continue Learning"
    : "Start Course";
}
