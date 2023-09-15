import SearchIcon from "./icons/SearchIcon";

export function SearchBar() {
  return (
    <form
      id="search-bar"
      className="relative flex flex-row items-center font-inter text-sm"
    >
      <input
        type="text"
        className="h-7 rounded-sm text-beeBrownBackground bg-beeBeig placeholder:text-beeBrownBackground pl-2 placeholder:opacity-50"
        placeholder="Search"
      />
      <SearchIcon />
    </form>
  );
}
