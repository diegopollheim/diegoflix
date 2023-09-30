import {useRouter} from "next/router";
import MenuSuperior from "../../../components/MenuSuperior";
import {Chip, Container, Stack, Typography} from "@mui/material";
import useSWR from "swr";
import {FilmeDetailsModel} from "../../../model/filme";

export default function FilmeDetails() {
  const {query} = useRouter();
  const {data, isLoading, isValidating} = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/movieDetails/${query.id}`);
  
  let currentFilme: FilmeDetailsModel = data;

  if (!data) return;

  return (
    <>
      <MenuSuperior detailsRoute />
      <Stack
        sx={{
          py: 5,
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${currentFilme.imageThumb})`,
          backgroundSize: "cover",
        }}
      >
        <Container sx={{mt: 20}} maxWidth="lg">
          <Stack
            direction={["column", "row"]}
            sx={{
              columnGap: 3,
            }}
          >
            <Stack
              flex={2}
              sx={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${currentFilme.imageCapa})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />

            <Stack
              flex={3}
              spacing={4}
              sx={{
                backgroundColor: "#2b2b2ba3",
                borderRadius: 8,
                padding: [3, 8],
              }}
            >
              <Stack spacing={1}>
                <Typography color="#fff" variant="h4" sx={{fontWeight: "700"}}>
                  {currentFilme.title}
                  <Typography color="#fff" component="span" variant="body1">
                    ({currentFilme.year})
                  </Typography>
                </Typography>
                <Chip
                  size="small"
                  sx={{maxWidth: "fit-content"}}
                  label={`Popularidade - ${currentFilme.popularity}`}
                  color="success"
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h5" color="#fff" sx={{fontWeight: "700", fontSize: "1.2rem"}}>
                  Sinopse
                </Typography>
                <Typography color="#fff" variant="body1">
                  {currentFilme.sinopse}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
}
