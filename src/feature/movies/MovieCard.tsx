import React from "react";
import { MovieProp } from "./MovieInterface";

export default function MovieCard({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
}: MovieProp) {
  return (
    <div className="w-fit shadow-md rounded box-border overflow-hidden">
      <div className="relative h-80 ">
        <MovieImage poster_path={poster_path} />
        <MovieRating vote_average={vote_average} />
      </div>
      <MovieDetails release_date={release_date} title={title} />
    </div>
  );
}

function MovieImage({ poster_path }: { poster_path: string }) {
  return (
    <img
      loading="lazy"
      className="w-full h-full object-cover"
      src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${poster_path}`}
      alt="movie image"
    />
  );
}

function MovieRating({ vote_average }: { vote_average: number }) {
  const progress = vote_average * 10; // Multiply by 10 to convert to percentage

  return (
    <div className="absolute bottom-[-1rem] left-1 w-10 h-10">
      {/* Circular progress bar */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full flex justify-center items-center border-gray-800"
        style={{
          background: `conic-gradient(rgb(1,180,228) ${progress}%, rgb(227,227,227) ${progress}% 100%)`,
        }}
      >
        <div className="flex justify-center items-center text-xs text-white w-8 h-8  bg-gray-800 rounded-full">
          {(vote_average * 10).toFixed(0) + "%"}
        </div>
      </div>
    </div>
  );
}

function MovieDetails({
  title,
  release_date,
}: {
  title: string;
  release_date: string;
}) {
  return (
    <div className="mt-5 px-2">
      <div>{title}</div>
      <div>{release_date}</div>
    </div>
  );
}
