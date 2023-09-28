import {Grid, Skeleton} from "@mui/material";

export default function SkeletonCards() {
  return (
    <>
      {Array(20)
        .fill(null)
        .map((item, index) => (
          <Grid item xs={2} sm={3} md={3} key={index}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width="100%"
              sx={{height: [400, 300]}}
            ></Skeleton>
            <Skeleton animation="wave" variant="text" sx={{fontSize: "1.125rem"}} width={150} />
            <Skeleton animation="wave" variant="text" sx={{fontSize: "0.875rem"}} width={100} />
          </Grid>
        ))}
    </>
  );
}
