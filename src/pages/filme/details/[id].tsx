"use client";

import React, { createContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FilmeDetailsModel } from "../../../model/filme";
import MenuSuperior from "../../../components/MenuSuperior";
import ActionsInfoMovie from "../../../components/ActionsInfoMovie";

export type MovieDetailsTypes = {
  playingTrailer: boolean;
  currentFilme: FilmeDetailsModel,
  tooglePlayOrpauseTrailer: () => void;
};

export const MovieDetaisContext = createContext<MovieDetailsTypes | null>(null);

export default function Novo() {
  const [muted, setMuted] = useState(false);
  const [playingTrailer, setPlayingTrailer] = useState(false);
  const [showCaption, setShowCaption] = useState(true);

  const { query } = useRouter();
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movieDetails/${query.id}`
  );

  let currentFilme: FilmeDetailsModel = data;

  let imgCapaFilm = currentFilme?.imageCapa
    ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${currentFilme.imageCapa}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnVuZG8lMjBjaW5lbWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";

  const handleMouseOverCaption = () => {
    setShowCaption(true);
  };

  const tooglePlayOrpauseTrailer = () => {
    setPlayingTrailer(!playingTrailer);
  };

  useEffect(() => {
    if (showCaption) {
      setTimeout(() => {
        setShowCaption(false);
      }, 3000);
    }
  }, [showCaption]);

  return (
    <MovieDetaisContext.Provider
      value={{ playingTrailer, tooglePlayOrpauseTrailer, currentFilme }}
    >
      <MenuSuperior detailsRoute />
      <Stack onMouseMove={handleMouseOverCaption} position="relative">
        <Stack
          id="caption-movie"
          bgcolor="#0000008f"
          height="100vh"
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          top={0}
          px={[2,2,10]}
          justifyContent="center"
          sx={{
            transition: "all 900ms",
            opacity: showCaption || !playingTrailer ? 1 : 0,
          }}
        >
          <Stack spacing={3}>
            <Stack width={["100%","68%", "38%"]} spacing={3}>
              <Typography color="#fff" variant="h2" fontSize={['2rem', '2.875rem', '3.875rem']}>
                {currentFilme?.title}
                <Typography ml={1} component='span'>({currentFilme?.year})</Typography>
              </Typography>
              <Typography color="#fff" fontSize={16}>
                {currentFilme?.sinopse}
              </Typography>
            </Stack>
            <ActionsInfoMovie />
          </Stack>
        </Stack>

        <ReactPlayer
          light={!playingTrailer && imgCapaFilm}
          playing={playingTrailer}
          playIcon={<></>}
          loop
          muted={muted}
          url={`https://www.youtube.com/watch?v=${currentFilme?.trailerKey}`}
          width="100%"
          height="100vh"
          style={{
            display: muted ? "none" : "block",
          }}
        />
      </Stack>
    </MovieDetaisContext.Provider>
  );
}
