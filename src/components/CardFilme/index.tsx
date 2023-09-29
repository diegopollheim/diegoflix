import {Box, Paper, Stack, Typography} from "@mui/material";
import {FilmeModel} from "../../model/filme";
import dayjs from "dayjs";
import {NoteFilme} from "./NoteFilme";
import Link from "next/link";
import sx from "./style.module.css";

type CardFilmeType = {
  filme: FilmeModel;
};

export default function CardFilme({filme}: CardFilmeType) {
  return (
    <Link href={`/filme/details/${filme.id}`} className={sx.card}>
      <Stack
        component={Paper}
        elevation={10}
        sx={{
          flex: 1,
          minWidth: "fit-content",
          width: "100%",
          height: [480, 380],
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Box
          className={sx.cardImage}
          sx={{
            height: "100%",
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${filme.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        />
        <Stack
          mt="auto"
          bgcolor="#fff"
          alignItems="start"
          px={2}
          py={3}
          sx={{borderTop: "1px solid #646464", position: "relative"}}
        >
          <NoteFilme value={filme.note} />
          <Typography variant="body1" sx={{fontWeight: "800", fontSize: 18}}>
            {filme.title}
          </Typography>
          <Typography variant="caption" sx={{fontStyle: "italic", fontSize: 14, fontWeight: "300"}}>
            {dayjs(filme.releaseDate).format("DD [de] MMM [de] YYYY")}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
