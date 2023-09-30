import {Container, Grid, Pagination, Stack, Typography} from "@mui/material";

import sx from "./styles.module.css";
import CardFilme from "../components/CardFilme";
import MenuSuperior from "../components/MenuSuperior";
import {useContext} from "react";
import {AppContext} from "../contexts/AppProvider";
import SkeletonCards from "../components/SkeletonCards";

export default function Home() {
  const {moviesData, isValidating, currentPage, handleCurrentPage} = useContext(AppContext);

  return (
    <>
      <MenuSuperior />
      <Container sx={{mt: 20}} maxWidth="lg">
        <Grid
          container
          spacing={{xs: 2, md: 3}}
          columns={{xs: 2, sm: 8, md: 12, lg: 12}}
          sx={{placeContent: "center"}}
        >
          {isValidating && !moviesData?.filmes ? (
            <SkeletonCards />
          ) : (
            moviesData.filmes?.map((film, index) => (
              <Grid item xs={2} sm={3} md={3} key={index}>
                <CardFilme filme={film} />
              </Grid>
            ))
          )}
        </Grid>
        {moviesData?.filmes?.length ? (
          <Stack alignItems="center" width="100%" pb={10} pt={5}>
            <Pagination
              className={sx.pagination}
              defaultPage={currentPage}
              color="primary"
              count={moviesData.totalPages}
              onChange={(e, pageNumber) => handleCurrentPage(pageNumber)}
            />
          </Stack>
        ) : (
          <Typography color="#fff" variant="body1">
            Nenhum resultado encontrado!
          </Typography>
        )}
      </Container>
    </>
  );
}
