export interface Film {
  title: string;
  backdrop_path: string;
  genres: [{ name: string }];
  overview: string;
  poster_path: string;
  tagline: string;
  release_date: string;
  runtime: string;
  credits: {
    cast: [{ name: string; character: string }];
    crew: [{ job: string; name: string }];
  };
}
