import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

/**
 * Product listing page with search, filters and pagination.
 */
const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async (pageToLoad = 1) => {
    const params = new URLSearchParams();
    params.set("page", pageToLoad);
    params.set("limit", 9);

    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);
    if (size) params.set("size", size);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    try {
      const res = await api.get(`/api/products?${params.toString()}`);
      setProducts(res.data.products);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyFilters = () => {
    fetchProducts(1);
  };

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchProducts(newPage);
  };

  return (
    <div className="page page-with-sidebar">
      <aside className="sidebar">
        <Filters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          size={size}
          setSize={setSize}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onApply={handleApplyFilters}
        />
      </aside>
      <section className="content">
        <h2>All Products</h2>
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {products.length === 0 && <p>No products found.</p>}
        </div>
        <div className="pagination">
          <button
            className="btn-outline"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="btn-outline"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default Products;
