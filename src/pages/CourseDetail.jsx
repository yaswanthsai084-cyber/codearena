import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Star,
  Clock,
  Users,
  Layers,
  Play,
  CheckCircle2,
  Check,
  Lock,
  ArrowRight,
  Target,
  Wrench,
  Lightbulb,
  Trophy,
  SearchX,
  Award,
  Signal,
} from "lucide-react";

import {
  getCourseById,
  getRelatedCourses,
  buildCurriculum,
  getCourseActionLabel,
  formatStudents,
} from "../data/courses";

import { cPath, countTopics } from "../data/syllabus-c.js";

import SiteNavbar from "../components/SiteNavbar";

import "./CourseDetail.css";

/**
 * Detail page for a single course card, mounted at
 * /courses/:courseId. Everything shown here is derived from
 * the catalog entry, so adding a course to data/courses.js
 * automatically gives it a full page.
 */
function CourseDetail() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);

  /* Modules are collapsible; keep a single open index and
     let null mean "all closed". */
  const [openModule, setOpenModule] = useState(null);

  /* Each course is its own document, so reset the scroll
     position and the browser title when the id changes. */
  useEffect(() => {
    window.scrollTo(0, 0);

    document.title = course
      ? `${course.title} | CodeArena`
      : "Course not found | CodeArena";
  }, [courseId, course]);

  if (!course) {
    return <CourseNotFound />;
  }

  const curriculum = buildCurriculum(course);
  const related = getRelatedCourses(course);
  const actionLabel = getCourseActionLabel(course);
  const isDone = course.progress === 100;

  /* C ships a full path, so its curriculum is drawn as a
     graph. Every other course uses the flat module list. */
  const path = course.id === cPath.courseId ? cPath : null;

  const doneCount = path
    ? Math.floor((course.progress / 100) * countTopics(path))
    : curriculum.filter(
        (module) => module.status === "done",
      ).length;

  const totalUnits = path ? countTopics(path) : curriculum.length;

  function toggleModule(index) {
    setOpenModule((current) =>
      current === index ? null : index,
    );
  }

  return (
    <div className="codearena course-detail-page">

      <SiteNavbar active="courses" />


      {/* ================= BREADCRUMB ================= */}

      <nav className="detail-breadcrumb" aria-label="Breadcrumb">

        <Link to="/">
          <ChevronRight size={14} />
          Home
        </Link>

        <Link to="/courses">
          <ChevronRight size={14} />
          Courses
        </Link>

        <span aria-current="page">
          {course.title}
        </span>

      </nav>


      {/* ================= HERO ================= */}

      <section className="detail-hero">

        <div className="detail-glow glow-one"></div>
        <div className="detail-glow glow-two"></div>

        <div className="detail-hero-inner">

          <div className={`detail-icon ${course.className}`}>
            {course.icon}
          </div>

          <div className="detail-hero-body">

            <div className="detail-badges">

              <span className="level-badge">
                {course.level}
              </span>

              <span className="category-badge">
                {course.category}
              </span>

              <span className="language-badge">
                {course.language}
              </span>

            </div>

            <h1 className="detail-title">
              {course.title}
            </h1>

            <p className="detail-description">
              {course.description}
            </p>

            <div className="detail-meta">

              <span>
                <Layers size={15} />
                {course.lessons} Lessons
              </span>

              <span>
                <Clock size={15} />
                {course.hours} Hours
              </span>

              <span>
                <Users size={15} />
                {formatStudents(course.students)} Learners
              </span>

              <span className="detail-rating">
                <Star size={15} fill="currentColor" />
                {course.rating}
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BODY ================= */}

      <div className="detail-layout">

        <div className="detail-main">

          {/* ---------- PROGRESS ---------- */}

          {course.progress > 0 && (
            <section className="detail-panel progress-panel">

              <div className="progress-labels">
                <span>
                  {isDone
                    ? "Course completed"
                    : "In progress"}
                </span>
                <span>
                  {course.progress}%
                </span>
              </div>

              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={course.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${course.title} progress`}
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${course.progress}%`,
                  }}
                ></div>
              </div>

              <p className="progress-caption">
                {doneCount} of {totalUnits}{" "}
                {path ? "topics" : "modules"} finished
              </p>

            </section>
          )}


          {/* ---------- WHAT YOU WILL LEARN ---------- */}

          <section className="detail-panel">

            <div className="panel-heading">
              <Target size={19} />
              <h2>What you will learn</h2>
            </div>

            <ul className="detail-outcomes">
              {course.highlights.map((highlight) => (
                <li key={highlight}>
                  <Check size={15} />
                  {highlight}
                </li>
              ))}
            </ul>

          </section>


          {/* ---------- CURRICULUM ---------- */}

          <section className="detail-panel">

            <div className="panel-heading">
              <Layers size={19} />
              <h2>Course curriculum</h2>
            </div>

            {path ? (
              <>
                <p className="panel-subtitle">
                  {path.levels.length} levels ·{" "}
                  {countTopics(path)} topics ·{" "}
                  {path.phases.length} stages
                </p>

                <p className="panel-text graph-lede">
                  The whole path drawn in one picture — from
                  your very first line of C to the end.
                </p>

                <figure className="roadmap-figure">
                  <img
                    src="/images/c-roadmap.png"
                    alt={`C Programming learning roadmap: ${path.levels.length} levels across ${path.phases.length} stages, from ${path.start.label} to ${path.finish.label}`}
                    width="1000"
                    height="1812"
                    loading="lazy"
                  />

                  <figcaption>
                    Open the full size image to study the path
                    in detail.
                  </figcaption>
                </figure>
              </>
            ) : (
              <>
                <p className="panel-subtitle">
                  {curriculum.length} modules ·{" "}
                  {course.lessons} lessons ·{" "}
                  {course.hours} hours in total
                </p>

                <ul className="curriculum-list">

              {curriculum.map((module, index) => {
                const isOpen = openModule === index;

                return (
                  <li
                    className={`curriculum-item is-${module.status}${
                      isOpen ? " is-open" : ""
                    }`}
                    key={module.id}
                  >

                    <button
                      type="button"
                      className="curriculum-trigger"
                      onClick={() => toggleModule(index)}
                      aria-expanded={isOpen}
                    >

                      <span className="curriculum-status">
                        {module.status === "done" ? (
                          <CheckCircle2 size={17} />
                        ) : module.status ===
                          "current" ? (
                          <Play
                            size={15}
                            fill="currentColor"
                          />
                        ) : (
                          <Lock size={15} />
                        )}
                      </span>

                      <span className="curriculum-name">
                        <span className="curriculum-number">
                          Module {module.number}
                        </span>
                        {module.title}
                      </span>

                      <span className="curriculum-meta">
                        {module.lessons} lessons ·{" "}
                        {module.minutes} min
                        <ChevronRight size={15} />
                      </span>

                    </button>

                    {isOpen && (
                      <div className="curriculum-body">
                        <p>
                          Work through{" "}
                          <strong>{module.title}</strong>{" "}
                          with guided examples, graded exercises
                          and a checkpoint quiz before moving
                          on to the next module.
                        </p>

                        <ul className="curriculum-topics">
                          <li>
                            Concept walkthrough with live code
                          </li>
                          <li>
                            Practice problems with hints
                          </li>
                          <li>
                            Module checkpoint quiz
                          </li>
                        </ul>
                      </div>
                    )}

                  </li>
                );
              })}
                </ul>
              </>
            )}

          </section>


          {/* ---------- CAPSTONE ---------- */}

          <section className="detail-panel">

            <div className="panel-heading">
              <Trophy size={19} />
              <h2>Capstone project</h2>
            </div>

            <p className="panel-text">
              {course.project}
            </p>

          </section>


          {/* ---------- REQUIREMENTS ---------- */}

          <section className="detail-panel">

            <div className="panel-heading">
              <Wrench size={19} />
              <h2>Before you start</h2>
            </div>

            <ul className="detail-requirements">
              {course.requirements.map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>

            <p className="panel-note">
              <Lightbulb size={15} />
              New to coding? Every CodeArena course starts from
              the very basics, so you can begin here without any
              prior experience.
            </p>

          </section>

        </div>


        {/* ================= SIDEBAR ================= */}

        <aside className="detail-aside">

          <div className="enroll-card">

            <span className="enroll-eyebrow">
              <Signal size={14} />
              Free access
            </span>

            <h3>
              {isDone
                ? "Revisit this course"
                : "Start learning today"}
            </h3>

            <p className="enroll-text">
              Full lifetime access to every lesson, project
              and future update.
            </p>

            <ul className="enroll-list">
              <li>
                <Check size={14} />
                {course.lessons} video lessons
              </li>
              <li>
                <Check size={14} />
                {curriculum.length} hands-on modules
              </li>
              <li>
                <Check size={14} />
                Certificate of completion
              </li>
            </ul>

            <Link
              to="/register"
              className={`enroll-button${
                isDone ? " is-done" : ""
              }`}
            >
              {isDone ? (
                <CheckCircle2 size={17} />
              ) : (
                <Play size={17} fill="white" />
              )}
              {actionLabel}
            </Link>

            <Link
              to="/login"
              className="enroll-secondary"
            >
              Already enrolled? Sign in
            </Link>

            <div className="enroll-rating">
              <Award size={16} />
              <strong>{course.rating}</strong>
              <span>
                from {formatStudents(course.students)}{" "}
                learners
              </span>
            </div>

          </div>

        </aside>

      </div>


      {/* ================= RELATED ================= */}

      {related.length > 0 && (
        <section className="detail-related">

          <div className="section-heading">

            <div className="heading-left">
              <Layers size={28} />
              <h2>You may also like</h2>
            </div>

            <Link to="/courses" className="view-all">
              View All Courses
              <ChevronRight size={18} />
            </Link>

          </div>

          <div className="related-grid">

            {related.map((item) => (
              <Link
                className="related-card"
                to={`/courses/${item.id}`}
                key={item.id}
              >

                <div
                  className={`related-icon ${item.className}`}
                >
                  {item.icon}
                </div>

                <div className="related-body">

                  <span className="related-meta">
                    {item.level} · {item.category}
                  </span>

                  <h3>{item.title}</h3>

                  <span className="related-stats">
                    <Layers size={13} />
                    {item.lessons} Lessons
                    <Star
                      size={13}
                      fill="currentColor"
                    />
                    {item.rating}
                  </span>

                </div>

                <ArrowRight size={17} />

              </Link>
            ))}

          </div>

        </section>
      )}


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


/**
 * Rendered when /courses/:courseId does not match anything in
 * the catalog — a stale bookmark rather than a crash.
 */
function CourseNotFound() {
  return (
    <div className="codearena course-detail-page">

      <SiteNavbar active="courses" />

      <section className="detail-missing">

        <div className="empty-icon">
          <SearchX size={30} />
        </div>

        <h2>Course not found</h2>

        <p>
          That course is no longer in the catalog, or the
          link was mistyped. Browse the full library to find
          your next track.
        </p>

        <Link to="/courses" className="empty-reset">
          Back to all courses
        </Link>

      </section>

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

export default CourseDetail;
