/* =====================================================
   CODEARENA - C FUNDAMENTALS PATH
   -----------------------------------------------------
   The shape of the course, drawn as a path: five stages
   covering twelve levels and twenty-one topics, with a
   clear start and finish so a student always knows where
   they are in the journey.

   Topics are titles only. Add `theory`, `example` or
   `practice` to a topic and the curriculum renders it.
   ===================================================== */

export const cPath = {
  id: "c-fundamentals-path",
  courseId: "c-programming",

  /* The five stages the twelve levels roll up into. */
  phases: [
    {
      number: 1,
      title: "Foundations",
      tone: "green",
      levels: [1, 2],
      goal: "Write a program and make it choose.",
    },
    {
      number: 2,
      title: "Logic & Structure",
      tone: "yellow",
      levels: [3, 4],
      goal: "Repeat, draw patterns and split code into parts.",
    },
    {
      number: 3,
      title: "Working with Data",
      tone: "orange",
      levels: [5, 6],
      goal: "Store many values and handle text.",
    },
    {
      number: 4,
      title: "Memory",
      tone: "red",
      levels: [7, 8],
      goal: "Understand how memory really works.",
    },
    {
      number: 5,
      title: "Advanced C",
      tone: "purple",
      levels: [9, 10, 11, 12],
      goal: "Model real problems and build real programs.",
    },
  ],

  /* Where the student starts. */
  start: {
    label: "Start here",
    detail:
      "No prior coding experience needed — a text editor " +
      "and a C compiler is all you require.",
  },

  /* Where the student ends up. */
  finish: {
    label: "Where this takes you",
    detail:
      "You can write complete C programs that read and " +
      "write files, manage their own memory, group data " +
      "into structures and organise a large project the " +
      "way professional C is organised.",
    skills: [
      "Write full programs from a blank file",
      "Build console apps, games and file-backed tools",
      "Debug memory bugs instead of guessing",
      "Read and extend real C codebases",
    ],
  },

  levels: [
    {
      number: 1,
      title: "C Fundamentals",
      tone: "green",
      summary: "Meet the language and learn to talk to the user.",
      topics: [
        { title: "Introduction to C" },
        { title: "Variables & Data Types" },
        { title: "Input & Output" },
      ],
    },
    {
      number: 2,
      title: "Operators & Decision Making",
      tone: "green",
      summary: "Give your program arithmetic and the ability to choose.",
      topics: [
        { title: "Operators" },
        { title: "Conditional Statements" },
      ],
    },
    {
      number: 3,
      title: "Loops & Patterns",
      tone: "yellow",
      summary: "Stop repeating yourself, one line at a time.",
      topics: [
        { title: "Loops" },
        { title: "Pattern Programming" },
      ],
    },
    {
      number: 4,
      title: "Functions",
      tone: "yellow",
      summary: "Break a big program into small, testable pieces.",
      topics: [
        { title: "Functions" },
        { title: "Recursion" },
      ],
    },
    {
      number: 5,
      title: "Arrays",
      tone: "orange",
      summary: "Store many values of one kind in a row.",
      topics: [
        { title: "One-Dimensional Arrays" },
        { title: "Two-Dimensional Arrays" },
      ],
    },
    {
      number: 6,
      title: "Strings",
      tone: "orange",
      summary: "C has no string type — only char arrays.",
      topics: [
        { title: "Strings" },
      ],
    },
    {
      number: 7,
      title: "Pointers",
      tone: "red",
      summary: "A pointer is a note saying the value lives over there.",
      topics: [
        { title: "Pointer Fundamentals" },
        { title: "Advanced Pointers" },
      ],
    },
    {
      number: 8,
      title: "Memory Management",
      tone: "red",
      summary: "Ask the heap for memory, then give it back.",
      topics: [
        { title: "Dynamic Memory Allocation" },
      ],
    },
    {
      number: 9,
      title: "Structures & Unions",
      tone: "red",
      summary: "Group related values into one meaningful unit.",
      topics: [
        { title: "Structures" },
        { title: "Union" },
        { title: "Enum" },
      ],
    },
    {
      number: 10,
      title: "Storage Classes",
      tone: "red",
      summary: "Who can see a variable, and how long it lives.",
      topics: [
        { title: "Storage Classes" },
      ],
    },
    {
      number: 11,
      title: "File Handling",
      tone: "purple",
      summary: "Data that survives after the program ends.",
      topics: [
        { title: "Files" },
      ],
    },
    {
      number: 12,
      title: "Preprocessor",
      tone: "purple",
      summary: "The tool that rewrites your code before the compiler sees it.",
      topics: [
        { title: "Preprocessor Directives" },
      ],
    },
  ],
};

/** Total number of topics across every level. */
export function countTopics(path) {
  return path.levels.reduce(
    (total, level) => total + level.topics.length,
    0,
  );
}
