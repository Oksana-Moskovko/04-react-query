import css from "../SearchBar/SearchBar.module.css";
import toast from "react-hot-toast";
// import { fetchMovies } from "../../services/movieService";

interface SearchBarProps {
        onSubmit: (value: string) => void;
    }

export default function SearchBar({onSubmit}: SearchBarProps) {
    // const [query, setQuery] = useSate("");

    // const handleInputChange = (e) => {
    //     setQuery(e.target.value);
    // };
    const handleSubmit = (formData: FormData) => {
        const query = formData.get("query") as string;
        if (!query) {
            toast.error("Please enter your search query")
            return 
        }
        // if (!query) {
        //     return console.log("No movies found for your request.")
        // }
        onSubmit(query)
    };

    

  return (
      <>
        <header className={css.header}>
            <div className={css.container}>
                  <a
                    className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={css.form} action={handleSubmit}>
                    <input
                        className={css.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={css.button} type="submit" >
                        Search
                    </button>
                </form>
            </div>
        </header>
    </>
  )
}

