import React from "react";
import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { MovieProp } from "./MovieInterface";
import "@testing-library/jest-dom";

describe("MovieCard Component", () => {
  const mockMovie: MovieProp = {
    id: 1,
    title: "Inception",
    poster_path: "inception.jpg",
    vote_average: 8.8,
    release_date: "2010-07-16",
    overview: "A mind-bending thriller by Christopher Nolan.",
  };

  it("should render the MovieCard component with the correct props", () => {
    render(<MovieCard {...mockMovie} />);

    // Check if the title is displayed
    expect(screen.getByText("Inception")).toBeInTheDocument();

    // Check if the release date is displayed
    expect(screen.getByText("2010-07-16")).toBeInTheDocument();

    // Check if the image renders with the correct src and alt attributes
    const img = screen.getByRole("img", { name: "movie image" });
    expect(img).toHaveAttribute(
      "src",
      "https://media.themoviedb.org/t/p/w440_and_h660_face/inception.jpg"
    );
    expect(img).toHaveAttribute("alt", "movie image");

    // Check if the rating percentage is displayed correctly
    expect(screen.getByText("88%")).toBeInTheDocument();
  });

  it("should render a circular progress bar with the correct styles", () => {
    render(<MovieCard {...mockMovie} />);

    const progressBar = screen.getByText("88%").parentElement?.parentElement;
    expect(progressBar).toHaveStyle({
      background: "conic-gradient(rgb(1,180,228) 88%, rgb(227,227,227) 88% 100%)",
    });
  });

  it("should handle missing poster_path gracefully", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: "" };

    render(<MovieCard {...movieWithoutPoster} />);

    const img = screen.getByRole("img", { name: "movie image" });
    expect(img).toHaveAttribute(
      "src",
      "https://media.themoviedb.org/t/p/w440_and_h660_face/"
    );
  });
});
