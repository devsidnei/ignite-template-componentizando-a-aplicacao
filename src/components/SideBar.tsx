import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import { GenreResponseProps } from "../interfaces/GenreResponseProps";

import "../styles/sidebar.scss";
interface SideBarProps {
  selectedGenreId: number;
  handleClickButton: CallableFunction;
  setSelectedGenre: CallableFunction;
}

export function SideBar({
  selectedGenreId,
  handleClickButton,
  setSelectedGenre,
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
