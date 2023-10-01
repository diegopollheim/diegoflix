import { useRouter } from "next/router";
import MenuSuperior from "../../../components/MenuSuperior";
import { Chip, Container, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { FilmeDetailsModel } from "../../../model/filme";

export default function FilmeDetails() {
  const { query } = useRouter();
  const { data, isLoading, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movieDetails/${query.id}`
  );

  let currentFilme: FilmeDetailsModel = data;

  let imgCapaFilm = currentFilme?.imageCapa
    ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${currentFilme.imageCapa}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnVuZG8lMjBjaW5lbWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";

  let imgThumb = currentFilme?.imageThumb
    ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${currentFilme.imageCapa}`
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTriI9KbKHFhSHNjSF9QYxPeZF-X7ODqSaGYg&usqp=CAU";

  if (!data) return;

  return (
    <>
      <MenuSuperior detailsRoute />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <Stack
          sx={{
            py: 5,
            backgroundImage: `url(${imgCapaFilm})`,
            backgroundSize: "cover",
            borderRadius: "16px",
            zIndex: 99,
            maxHeight: "70%",
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction={["column", "row"]}
              sx={{
                columnGap: 3,
              }}
            >
              <Stack
                flex={2}
                sx={{
                  backgroundImage: `url(${imgThumb})`,
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
                <Stack
                  spacing={1}
                  sx={{
                    maxHeight: 102,
                    justifyContent: "center",
                    padding: 2,
                  }}
                >
                  <Typography
                    color="#fff"
                    variant="h4"
                    sx={{ fontWeight: "700" }}
                  >
                    {currentFilme.title}
                    <Typography color="#fff" component="span" variant="body1">
                      ({currentFilme.year})
                    </Typography>
                  </Typography>
                  <Chip
                    size="small"
                    sx={{ maxWidth: "fit-content" }}
                    label={`Popularidade - ${currentFilme.popularity}`}
                    color="success"
                  />
                </Stack>

                <Stack spacing={1}>
                  <Typography
                    variant="h5"
                    color="#fff"
                    sx={{ fontWeight: "700", fontSize: "1.2rem" }}
                  >
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
      </div>
    </>
  );
}
