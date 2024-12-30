import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState([...movies]);

  return (
    <GlobalContext.Provider value={{ loading, setLoading, movies, setMovies }}>
      <Toaster />
      <HomePage />
    </GlobalContext.Provider>
  );
}
export default App;
