import React from "react";

/**
 * Filter panel for category, size and price range.
 * All filter state is managed by parent component (controlled inputs).
 */
const Filters = ({
  search,
  setSearch,
  category,
  setCategory,
  size,
  setSize,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
}) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by name or description"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <div className="filter-row">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <button className="btn-secondary full-width" onClick={onApply}>
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
