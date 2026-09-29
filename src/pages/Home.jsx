import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Gamepad2,
  Trophy,
  Play,
  Grid2X2,
  BarChart3,
  Users,
  Code2,
  ChevronRight,
} from "lucide-react";

import SiteNavbar from "../components/SiteNavbar";

import "./Home.css";

const languages = [
  { name: "React", icon: "⚛", className: "react" },
  { name: "Node.js", icon: "⬡", className: "node" },
  { name: "Java", icon: "☕", className: "java" },
  { name: "C", icon: "C", className: "c" },
  { name: "C++", icon: "C++", className: "cpp" },
  { name: "Python", icon: "🐍", className: "python" },
  { name: "HTML", icon: "5", className: "html" },
  { name: "CSS", icon: "3", className: "css" },
  { name: "JavaScript", icon: "JS", className: "javascript" },
  { name: "SQL", icon: "▤", className: "sql" },
  { name: "MongoDB", icon: "◆", className: "mongodb" },
  { name: "PostgreSQL", icon: "🐘", className: "postgres" },
];

const floatingLanguages = [
  { name: "C", icon: "C", position: "float-c" },
  { name: "C++", icon: "C++", position: "float-cpp" },
  { name: "Java", icon: "☕", position: "float-java" },
  { name: "Python", icon: "🐍", position: "float-python" },
  { name: "JS", icon: "JS", position: "float-js" },
  { name: "HTML", icon: "5", position: "float-html" },
  { name: "CSS", icon: "3", position: "float-css" },
  { name: "React", icon: "⚛", position: "float-react" },
  { name: "Node", icon: "⬡", position: "float-node" },
  { name: "SQL", icon: "▤", position: "float-sql" },
];

const features = [
  {
    icon: <BookOpen size={28} />,
    title: "Structured Courses",
    description:
      "Step-by-step learning paths from basics to advanced.",
    className: "feature-purple",
  },
  {
    icon: <Gamepad2 size={28} />,
    title: "Fun Coding Games",
    description:
      "Learn through quizzes, challenges and real-time tests.",
    className: "feature-green",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Track Progress",
    description:
      "Monitor your performance and level up your skills.",
    className: "feature-blue",
  },
  {
    icon: <Users size={28} />,
    title: "Beginner Friendly",
    description:
      "Designed for computer students and freshers.",
    className: "feature-pink",
  },
  {
    icon: <Trophy size={28} />,
    title: "Leaderboards",
    description:
      "Compete with others and showcase your skills.",
    className: "feature-yellow",
  },
];

function Home() {
  return (
    <div className="codearena">

      {/* ================= NAVBAR ================= */}

      <SiteNavbar active="home" />


      {/* ================= HERO ================= */}

      <section className="hero" id="home">

        <div className="hero-background-glow glow-one"></div>
        <div className="hero-background-glow glow-two"></div>

        <div className="hero-content">

          <div className="hero-badge">
            <span>⚡</span>
            Your Journey to Becoming a Better Developer Starts Here
          </div>

          <h2 className="hero-title">
            Learn to Code,
            <br />

            <span>
              Build Your Future
            </span>
          </h2>

          <p className="hero-description">
            CodeArena is a modern learning platform for computer
            students. Learn programming, solve real problems, play
            coding games and track your progress — all in one place.
          </p>

          <div className="hero-buttons">

            <button className="primary-button">
              <Play size={20} fill="white" />
              Start Learning
            </button>

            <Link
              to="/courses"
              className="secondary-button"
            >
              <Grid2X2 size={20} />
              View Courses
            </Link>

          </div>

        </div>


        {/* ================= HERO VISUAL ================= */}

        <div className="hero-visual">

          <div className="code-window">

            <div className="window-header">

              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span>CodeArena Editor</span>

            </div>

            <div className="code-content">

              <div>
                <span className="line-number">01</span>
                <span className="purple-code">const</span>{" "}
                <span className="blue-code">developer</span>{" "}
                = {"{"}
              </div>

              <div>
                <span className="line-number">02</span>
                &nbsp;&nbsp;name:{" "}
                <span className="green-code">
                  "CodeArena"
                </span>
              </div>

              <div>
                <span className="line-number">03</span>
                &nbsp;&nbsp;skills: [
              </div>

              <div>
                <span className="line-number">04</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="orange-code">
                  "React"
                </span>,
              </div>

              <div>
                <span className="line-number">05</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="orange-code">
                  "Node.js"
                </span>,
              </div>

              <div>
                <span className="line-number">06</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="orange-code">
                  "Python"
                </span>
              </div>

              <div>
                <span className="line-number">07</span>
                &nbsp;&nbsp;]
              </div>

              <div>
                <span className="line-number">08</span>
                {"}"};
              </div>

            </div>

            <div className="editor-message">
              <span>Think</span>
              <span>Code</span>
              <span>Create</span>
              <Code2 size={22} />
            </div>

          </div>


          {/* Floating Programming Icons */}

          {floatingLanguages.map((language) => (
            <div
              key={language.name}
              className={`floating-language ${language.position}`}
            >
              {language.icon}
            </div>
          ))}

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        {features.map((feature) => (

          <div
            className="feature-card"
            key={feature.title}
          >

            <div
              className={`feature-icon ${feature.className}`}
            >
              {feature.icon}
            </div>

            <h3>
              {feature.title}
            </h3>

            <p>
              {feature.description}
            </p>

          </div>

        ))}

      </section>


      {/* ================= COURSES ================= */}

      <section
        className="courses-section"
        id="courses"
      >

        <div className="section-heading">

          <div className="heading-left">

            <Code2 size={30} />

            <h2>
              Popular Learning Paths
            </h2>

          </div>

          <Link to="/courses" className="view-all">
            View All Courses
            <ChevronRight size={18} />
          </Link>

        </div>


        <div className="course-grid">

          {languages.map((language) => (

            <Link
              className="course-card"
              to="/courses"
              key={language.name}
            >

              <div
                className={`course-icon ${language.className}`}
              >
                {language.icon}
              </div>

              <span>
                {language.name}
              </span>

            </Link>

          ))}

        </div>

      </section>


      {/* ================= BOTTOM ================= */}

      <div className="bottom-message">

        <span></span>

        <p>
          SKILLS TODAY&nbsp;&nbsp;•&nbsp;&nbsp;
          OPPORTUNITIES TOMORROW
        </p>

        <span></span>

      </div>

    </div>
  );
}

export default Home;