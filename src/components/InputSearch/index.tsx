import { Stack } from "@mui/system";
import sx from "./style.module.css";
import { Search, X } from "lucide-react";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/AppProvider";

export default function InputSearch({ value, onChange }) {
  const { handleChangeQueryMovie } = useContext(MoviesContext);

  return (
    <Stack
      className={sx.containerInput}
      direction="row"
      bgcolor="#3f3f46"
      width="100%"
      maxWidth="400px"
      px={3}
      py={1}
      borderRadius={10}
    >
      <input
        placeholder="Encontre seu filme..."
        className={sx.input}
        value={value}
        onChange={onChange}
      />

      <IconButton
        onClick={() => handleChangeQueryMovie("")}
        sx={{ width: 40, height: 40, padding: 0, marginLeft: "auto" }}
      >
        {value ? <X color="#fff" /> : <Search color="#fff" />}
      </IconButton>
    </Stack>
  );
}
