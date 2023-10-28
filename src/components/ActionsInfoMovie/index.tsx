import { Stack, Typography } from "@mui/material";
import { Info, Pause, Play } from "lucide-react";
import { useContext } from "react";
import {
  MovieDetailsTypes,
  MovieDetaisContext,
} from "../../pages/filme/details/[id]";

export default function ActionsInfoMovie() {
  return (
    <Stack direction="row" spacing={2}>
      <ActionBtnAssistir />
      <ActionBtnInfo />
    </Stack>
  );
}

function ActionBtnAssistir() {
  const {
    tooglePlayOrpauseTrailer,
    playingTrailer,
    currentFilme,
  }: MovieDetailsTypes = useContext(MovieDetaisContext);

  return (
    <Stack
      onClick={currentFilme?.trailerKey && tooglePlayOrpauseTrailer}
      spacing={2}
      direction="row"
      sx={{
        px: "20px",
        cursor: "pointer",
        py: 1,
        borderRadius: "4px",
        backgroundColor: "#fff",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.75)",
        },
      }}
    >
      {currentFilme?.trailerKey && <>{playingTrailer ? <Pause /> : <Play />}</>}

      <Typography fontWeight={600}>
        {currentFilme?.trailerKey ? (
          <>{playingTrailer ? "Parar" : "Assistir Trailer"}</>
        ): 'Trailer não disponível'}
      </Typography>
    </Stack>
  );
}
function ActionBtnInfo() {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{
        color: "#fff",
        px: "20px",
        cursor: "pointer",
        py: 1,
        borderRadius: "4px",
        backgroundColor: "#6d6d6eb3",
        "&:hover": {
          backgroundColor: "rgba(109, 109, 110, 0.4)",
        },
      }}
    >
      <Info />
      <Typography fontWeight={600}>Mais informações</Typography>
    </Stack>
  );
}
