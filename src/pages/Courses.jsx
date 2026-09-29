import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  Users,
  Layers,
  Play,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";

import {
  courses,
  CATEGORIES,
  LEVELS,
  SORT_OPTIONS,
  selectCourses,
  getCourseActionLabel,
  formatStudents,
} from "../data/courses";

import SiteNavbar from "../components/SiteNavbar";

import "./Courses.css";

const DEFAULT_FILTERS = {
  search: "",
  category: CATEGORIES[0],
  level: LEVELS[0],
  sort: SORT_OPTIONS[0].value,
};

function Courses() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const visibleCourses = useMemo(
    () => selectCourses(filters),
    [filters],
  );

  const isFiltered =
    filters.search.trim() !== "" ||
    filters.category !== CATEGORIES[0] ||
    filters.level !== LEVELS[0];

  function updateFilter(key, value) {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0,
  );

  return (
    <div className="codearena courses-page">


      {/* ================= NAVBAR ================= */}

      <SiteNavbar active="courses" />


      {/* ================= PAGE HEADER ================= */}

      <section className="courses-header">

        <div className="header-glow glow-one"></div>
        <div className="header-glow glow-two"></div>

        <div className="courses-header-inner">

          <span className="courses-eyebrow">
            <BookOpen size={15} />
            Course Library
          </span>

          <h2 className="courses-title">
            Structured Courses for
            <br />
            <span>Every Language</span>
          </h2>

          <p className="courses-subtitle">
            Pick a track, follow it module by module and turn
            what you learn into working code. Every course is
            built for computer students and freshers — no
            prior experience required.
          </p>

          <div className="courses-stats">

            <div className="stat-item">
              <BookOpen size={19} />
              <strong>{courses.length}</strong>
              <span>Courses</span>
            </div>

            <div className="stat-item">
              <Layers size={19} />
              <strong>
                {CATEGORIES.length - 1}
              </strong>
              <span>Categories</span>
            </div>

            <div className="stat-item">
              <Users size={19} />
              <strong>
                {formatStudents(totalStudents)}
              </strong>
              <span>Learners</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= TOOLBAR ================= */}

      <section
        className={`courses-toolbar${
          showFilters ? " filters-open" : ""
        }`}
      >

        <div className="search-wrapper">

          <Search size={18} />

          <input
            id="course-search"
            className="search-input"
            type="search"
            placeholder="Search courses, languages or topics…"
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            aria-label="Search courses"
          />

        </div>

        <div className="toolbar-controls">

          <label className="select-wrapper">

            <SlidersHorizontal size={16} />

            <select
              className="select-input"
              value={filters.category}
              onChange={(event) =>
                updateFilter("category", event.target.value)
              }
              aria-label="Filter by category"
            >
              {CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

          </label>

          <label className="select-wrapper">

            <Layers size={16} />

            <select
              className="select-input"
              value={filters.level}
              onChange={(event) =>
                updateFilter("level", event.target.value)
              }
              aria-label="Filter by level"
            >
              {LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

          </label>

          <label className="select-wrapper">

            <SlidersHorizontal size={16} />

            <select
              className="select-input"
              value={filters.sort}
              onChange={(event) =>
                updateFilter("sort", event.target.value)
              }
              aria-label="Sort courses"
            >
              {SORT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

          </label>

          {isFiltered && (
            <button
              type="button"
              className="clear-button"
              onClick={resetFilters}
            >
              <X size={15} />
              Clear
            </button>
          )}

        </div>

      </section>


      {/* ================= RESULT COUNT ================= */}

      <div className="result-summary">
        <p>
          Showing{" "}
          <strong>{visibleCourses.length}</strong>{" "}
          {visibleCourses.length === 1
            ? "course"
            : "courses"}
        </p>

        <button
          type="button"
          className="mobile-filter-button"
          onClick={() =>
            setShowFilters((visible) => !visible)
          }
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>


      {/* ================= COURSE GRID ================= */}

      {visibleCourses.length > 0 ? (

        <section className="course-list-grid">

          {visibleCourses.map((course) => (
            <article
              className="course-list-card"
              key={course.id}
            >

              {/* ---------- CARD TOP ---------- */}

              <div className="card-top">

                <div
                  className={`card-icon ${course.className}`}
                >
                  {course.icon}
                </div>

                <div className="card-badges">

                  <span className="level-badge">
                    {course.level}
                  </span>

                  <span className="category-badge">
                    {course.category}
                  </span>

                </div>

              </div>


              {/* ---------- CARD BODY ---------- */}

              <h3 className="card-title">
                <Link
                  className="card-title-link"
                  to={`/courses/${course.id}`}
                >
                  {course.title}
                </Link>
              </h3>

              <p className="card-description">
                {course.description}
              </p>


              {/* ---------- META ---------- */}

              <div className="card-meta">

                <span>
                  <Layers size={14} />
                  {course.lessons} Lessons
                </span>

                <span>
                  <Clock size={14} />
                  {course.hours}h
                </span>

                <span>
                  <Users size={14} />
                  {formatStudents(course.students)}
                </span>

                <span className="card-rating">
                  <Star size={14} fill="currentColor" />
                  {course.rating}
                </span>

              </div>


              {/* ---------- PROGRESS ---------- */}

              {course.progress > 0 && (
                <div className="card-progress">
                  <div className="progress-labels">
                    <span>
                      {course.progress === 100
                        ? "Completed"
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
                </div>
              )}


              {/* ---------- MODULES ---------- */}

              <ul className="card-modules">

                {course.modules.slice(0, 3).map(
                  (module) => (
                    <li key={module}>
                      <CheckCircle2 size={13} />
                      {module}
                    </li>
                  ),
                )}

                {course.modules.length > 3 && (
                  <li className="module-more">
                    +{course.modules.length - 3} more modules
                  </li>
                )}

              </ul>


              {/* ---------- CARD ACTION ---------- */}

              <Link
                className={`card-action${
                  course.progress === 100
                    ? " is-done"
                    : ""
                }`}
                to={`/courses/${course.id}`}
              >
                {course.progress === 100 ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <Play size={17} fill="white" />
                )}

                {getCourseActionLabel(course)}

                <ArrowRight size={17} />
              </Link>

            </article>
          ))}

        </section>

      ) : (

        /* ---------- EMPTY STATE ---------- */

        <section className="courses-empty">

          <div className="empty-icon">
            <Search size={30} />
          </div>

          <h3>No courses found</h3>

          <p>
            Nothing matches those filters just yet. Try a
            different search or clear the filters to see
            every course.
          </p>

          <button
            type="button"
            className="empty-reset"
            onClick={resetFilters}
          >
            Reset Filters
          </button>

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

export default Courses;
