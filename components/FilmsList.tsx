import { getUser } from "@/lib/functions";
import FilmPoster from "./FilmPoster";

interface Props {
  url: string;
}

interface Film {
  poster_path: string;
  title: string;
  id: string;
}

export default async function FilmList({ url }: Props) {
  const user = await getUser();
  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    const res = await fetch(url, options);
    const { results } = await res.json();

    return results;
  }

  const filmList = await fetchData();

  const renderFilm = (film: Film, index: number) => {
    return (
      <li key={index}>
        <FilmPoster
          userId={user?.id!}
          src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
          alt={film.title}
          id={film.id}
          className="rounded-md border-2 border-beeBrownLight min-w-full shadow-md hover:cursor-pointer"
        />
      </li>
    );
  };

  return (
    <ul className="grid grid-cols-5 gap-6 overflow-x-hidden py-6">
      {filmList.map((film: Film, index: number) => renderFilm(film, index))}
    </ul>
  );
}
