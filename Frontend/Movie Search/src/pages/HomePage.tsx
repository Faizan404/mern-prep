import { useContext, useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Search from "../components/Search";
import { GlobalContext } from "../App";
import Spinner from "../components/Spinner";

function HomePage() {
  const { loading, movies } = useContext(GlobalContext);
  const [pagination, setPagination] = useState(movies);
  const upto = useRef(4);

  useEffect(() => {
    setPagination([]);
    if (pagination.length === 0) setPagination(movies.slice(0, 4));
  }, [movies]);

  useEffect(() => {
    function handleInfiniteScroll() {
      const totalScrollHeight = document.documentElement.scrollHeight;
      const viewportVisibalHight = window.innerHeight;
      const scrollFormTopHeight = document.documentElement.scrollTop;

      if (scrollFormTopHeight + viewportVisibalHight >= totalScrollHeight) {
        if (upto.current <= movies.length) upto.current += 4;
        setPagination(movies.slice(0, upto.current));
      }
    }
    window.addEventListener("scroll", handleInfiniteScroll);
  }, [movies]);

  return (
    <>
      <Header />
      <main className="p-12">
        <Search />
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Your Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[40vh]">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {movies.length > 0 &&
                  pagination.map((movie) => (
                    <Card
                      key={movie.id}
                      title={movie.original_title}
                      release={movie.release_date}
                      src={movie.poster_path}
                    />
                  ))}

                {movies.length === 0 && (
                  <p className="text-3xl font-semibold text-slate-400">
                    <span> No Movies Found </span>
                    <br />
                    <span className="text-6xl">404</span>
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default HomePage;
