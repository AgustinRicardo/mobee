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

export interface User {
  id: string;
  username: string;
  email: string;
  profile_picture_path: string | null;
  created_at: Date;
}

export interface WatchStatus {
  user_id: string;
  film_id: string;
  to_watch: boolean;
  watched: boolean;
}
