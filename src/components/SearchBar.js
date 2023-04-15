import React, { useContext, useEffect, useState } from "react";
import PhotoContext from "../context/Photo/PhotoContext";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { tagSearch, getTagSearch } = useContext(PhotoContext);

  const navigate = useNavigate();

  const [inputSearch, setInputSearch] = useState("");

  const inputChange = (event) => {
    setInputSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputSearch) {
      await getTagSearch(inputSearch);
      navigate(`/tag/${inputSearch}`);
    }
  };
  useEffect(() => {
    if (tagSearch) {
      setInputSearch(tagSearch);
    }
  }, [tagSearch]);
  return (
    <div>
      <h4>Search by tag</h4>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          required
          className="form-control me-2"
          type="search"
          placeholder="Search tag"
          aria-label="Search"
          name="inputSearch"
          value={inputSearch}
          onChange={inputChange}
        />
        <button className="btn btn-info text-white" type="submit">
          Search
        </button>
      </form>
      <br />
      {tagSearch ? <h4>Results</h4> : <h4>Trending photos right now</h4>}
    </div>
  );
};

export default SearchBar;
