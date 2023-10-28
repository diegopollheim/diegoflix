import { Box, Stack } from "@mui/material";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/AppProvider";
import Image from "next/image";
import InputSearch from "../InputSearch";

type MenuSuperiorTypes = {
  detailsRoute?: boolean;
};

export default function MenuSuperior({ detailsRoute }: MenuSuperiorTypes) {
  const { searchMovie, handleChangeQueryMovie } = useContext(MoviesContext);

  return (
    <Stack
      position="fixed"
      top={0}
      width={"100%"}
      height="100px"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="#0D0D0D"
      px={2}
      zIndex={99}
    >
      <Box
        component="a"
        href="/"
        sx={{
          width: [100, 180],
          maxWidth: 180,
          display: [`${detailsRoute ? "block" : "none"}`, "block"],
        }}
      >
        <Image
          src="/images/logo-header.png"
          alt="Logo Site"
          height={45}
          width={140}
        />
      </Box>
      {!detailsRoute && (
        <InputSearch
          onChange={(e) => handleChangeQueryMovie(e.target.value)}
          value={searchMovie}
        />
      )}

      <Box sx={{ backgroundColor: "green" }} />
    </Stack>
  );
}
