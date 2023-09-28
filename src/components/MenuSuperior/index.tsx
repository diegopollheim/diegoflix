import {Box, Paper, Stack, TextField} from "@mui/material";
import {useContext} from "react";
import {AppContext} from "../../contexts/AppProvider";
import Image from "next/image";
import InputSearch from "../InputSearch";

type MenuSuperiorTypes = {
  detailsRoute?: boolean;
};

export default function MenuSuperior({detailsRoute}: MenuSuperiorTypes) {
  const {searchMovie, handleChangeQueryMovie} = useContext(AppContext);

  return (
    <Stack
      position="fixed"
      top={0}
      width={"100%"}
      height="100px"
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      bgcolor="#121214"
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
        <Image src="/images/logo-header.png" alt="Logo Site" height={50} width={180} />
      </Box>
      {!detailsRoute && (
        <InputSearch onChange={(e) => handleChangeQueryMovie(e.target.value)} value={searchMovie} />
      )}

      <Box sx={{backgroundColor: "green"}} />
    </Stack>
  );
}
