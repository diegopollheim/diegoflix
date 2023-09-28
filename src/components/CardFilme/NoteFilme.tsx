import {Box} from "@mui/material";
import {Flat} from "@alptugidin/react-circular-progress-bar";
import sx from "./style.module.css";

type NoteFilmeProps = {
  value: number;
};

export function NoteFilme({value}: NoteFilmeProps) {
  const percentage = (value * 1000) / 100;

  return (
    <Box width={45} height={45} position="absolute" top={-20} right={20} className={sx.percentage}>
      <Flat
        progress={percentage}
        showMiniCircle={false}
        sx={{
          strokeColor: "#1dbb11",
          barWidth: 10,
          bgColor: {value: "#000000", transparency: "20"},
          valueWeight: "bold",
          valueColor: "#ffffff",
          textColor: "#ffffff",
          miniCircleColor: "#39bb02",
        }}
      />
    </Box>
  );
}
