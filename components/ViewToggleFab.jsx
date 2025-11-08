import { Fab } from "@mui/material";
import { FaThLarge, FaListUl } from "react-icons/fa";

const ViewToggleFab = ({ isGridView, onToggle }) => {
  return (
    <Fab
      color="primary"
      aria-label="toggle view"
      onClick={onToggle}
      sx={{
        position: "fixed",
        top: 84, // Para que quede debajo del header
        right: 16,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
        },
        zIndex: 1000,
      }}
    >
      {isGridView ? <FaListUl /> : <FaThLarge />}
    </Fab>
  );
};

export default ViewToggleFab; 