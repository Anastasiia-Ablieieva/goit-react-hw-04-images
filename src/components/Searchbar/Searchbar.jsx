import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { FcSearch } from "react-icons/fc";
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
 
  const handleChange = e => {
    const { value } = e.target;
    setQuery(value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(!query) {
      return toast.error('Enter text for search.');
    }
    onSubmit(query);
    setQuery('');
  }

    return (
      <section className={css.searchBar}>
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <FcSearch size="25px" />
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            query={query}
          />
        </form>
      </section>
    );
}