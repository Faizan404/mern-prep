import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import useDebounce from "../hooks/useDebounce";
import { toast } from "react-hot-toast";

function Search() {
  const { setLoading, setMovies } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const updateRecentSearches = (term: string) => {
    setRecentSearches((prev) => {
      const updated = [term, ...prev.filter((t) => t !== term)].slice(0, 5);
      return updated;
    });
  };

  useEffect(
    function () {
      // if (!search) return;
      (async function () {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${debounceValue
              .split(" ")
              .join("+")}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  import.meta.env.VITE_MOVIEDB_READ_ACCESS_TOKEN
                }`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setMovies(data.results);
          // console.log(data);
        } catch (error) {
          toast.error("Failed to fetch movies");
          console.error(error);
        } finally {
          setLoading(false);
        }
      })();
      // console.log(debounceValue.split(" ").join("+"));
    },
    [debounceValue]
  );

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search your movie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="recent-searches">
        {recentSearches.map((term, index) => (
          <span key={index} className="badge badge-secondary m-1">
            {term}
          </span>
        ))}
      </div>
    </div>
  );
}
export default Search;
