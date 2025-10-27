import { useEffect, useState, useMemo } from "react";
import { generateCustomers } from "./data";
import "./App.css";

/**
 * Customers list page
 * - Generates mock customers
 * - Search (debounced)
 * - Sort by column (toggle asc/desc)
 * - Sticky header layout
 */
function App() {
  // Raw dataset
  const [customers, setCustomers] = useState([]);

  // Current search string after debounce
  const [query, setQuery] = useState("");

  // { key: "name" | "score" | "email" | "lastMessageAt" | "addedBy", direction: "asc" | "desc" }
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filters dropdown visibility
  const [showFilters, setShowFilters] = useState(false);

  // Input value we debounce into `query`
  const [searchTerm, setSearchTerm] = useState("");

  // -- 1) Load data once -------------------------------------------------------
  useEffect(() => {
    setCustomers(generateCustomers());
  }, []);

  // -- 2) Debounce the search input into `query` (250ms) -----------------------
  useEffect(() => {
    const t = setTimeout(() => setQuery(searchTerm), 250);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Format date like "September 15, 2025, 03:11 PM"
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return (
      d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) +
      ", " +
      d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );
  };

  // -- 3) Compute visible rows (filter + sort) --------------------------------
  // useMemo prevents recalculations unless dependencies change.
  const rows = useMemo(() => {
    let data = customers;

    // Filter by name or email (case-insensitive)
    if (query.trim()) {
      const q = query.toLowerCase();
      data = customers.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }

    // Apply sorting if a column is selected
    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      const dir = direction === "asc" ? 1 : -1;

      // Normalize values so numbers/dates/strings compare correctly
      const getVal = (c) =>
        key === "lastMessageAt"
          ? new Date(c.lastMessageAt).getTime()
          : typeof c[key] === "string"
          ? c[key].toLowerCase()
          : c[key];

      data = [...data].sort((a, b) => {
        const A = getVal(a);
        const B = getVal(b);
        if (A < B) return -1 * dir;
        if (A > B) return 1 * dir;
        return 0;
      });
    }

    return data;
  }, [customers, query, sortConfig]);

  // -- 4) Toggle sorting (click on header) -------------------------------------
  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } // toggle
        : { key, direction: "asc" } // new key starts asc
    );
  };

  // Tiny helper to render ▲ / ▼ next to the active sort column
  const sortArrow = (key) =>
    sortConfig.key === key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : "";

  // -- 5) UI -------------------------------------------------------------------
  return (
    <div className="page">
      {/* Brand bar (sticky) */}
      <div className="brandbar">
        <img src="/Doubletick Logo.png" alt="DoubleTick" className="brand-logo" />
      </div>

      {/* Title row (sticky) */}
      <div className="title-row">
        <h2>All Customers</h2>
        {/* Always reflect the count after search/sort */}
        <span className="count-badge">{rows.length.toLocaleString()}</span>
      </div>

      {/* Toolbar (sticky): search + filters */}
      <div className="toolbar">
        {/* Search box */}
        <div className="search-wrap">
          <img src="/test_Search-3.svg" alt="search" className="search-icon" />
          <input
            type="text"
            placeholder="Search Customers"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters button + dropdown (visual only) */}
        <div className="filters-wrap">
          <button className="filter-btn" onClick={() => setShowFilters((v) => !v)}>
            <img src="/test_Filter.svg" alt="filter" />
            Add Filters
          </button>
          {showFilters && (
            <div className="filters-menu">
              <div>Filter 1</div>
              <div>Filter 2</div>
              <div>Filter 3</div>
              <div>Filter 4</div>
            </div>
          )}
        </div>
      </div>

      {/* Data box with its own scrolling; header inside is sticky */}
      <div className="table-scroll">
        <table className="customers-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th onClick={() => handleSort("name")}>Customer{sortArrow("name")}</th>
              <th onClick={() => handleSort("score")}>Score{sortArrow("score")}</th>
              <th onClick={() => handleSort("email")}>Email{sortArrow("email")}</th>
              <th onClick={() => handleSort("lastMessageAt")}>
                Last message sent at{sortArrow("lastMessageAt")}
              </th>
              <th onClick={() => handleSort("addedBy")}>Added by{sortArrow("addedBy")}</th>
            </tr>
          </thead>

          <tbody>
            {rows.slice(0, 30).map((c) => (
              <tr key={c.id}>
                <td><input type="checkbox" /></td>

                {/* Customer cell: avatar + name + phone (subline) */}
                <td className="customer-cell">
                  <img src={c.avatar} alt="" className="avatar" />
                  <div>
                    <div className="cust-name">{c.name}</div>
                    <div className="cust-sub">{c.phone}</div>
                  </div>
                </td>

                <td>{c.score}</td>
                <td>{c.email}</td>
                <td>{formatDate(c.lastMessageAt)}</td>

                {/* Added by with icon */}
                <td className="added-by-cell">
                  <img src="/test_user-3.svg" alt="user" className="user-icon" />
                  <span>{c.addedBy}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
