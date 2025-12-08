import { Fab, InputBase, Box, useTheme } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { FaSearch,FaTimes } from "react-icons/fa";
import { useSearch } from "@/context/SearchContext";
import { useTenant } from "@/context/TenantContext";
import { trackSearch } from "@/utils/analytics";

const FAB_HEIGHT = 56;
const FAB_WIDTH = 56;
const EXTENDED_WIDTH = 230;

const SearchFab = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const fabRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useTheme();
  const { searchTerm, setSearchTerm } = useSearch();

  // Focus input when open
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Toggle: abre si está cerrado, cierra si está abierto
  const handleToggle = (e) => {
    e.stopPropagation(); // Prevenir que el click se propague
    setOpen((prev) => {
      // Limpiar búsqueda al cerrar
      if (prev) {
        setSearchTerm("");
      }
      return !prev;
    });
  };

  // Cerrar al hacer click fuera del componente
  /*   useEffect(() => {
    function handleClickOutside(event) {
      // Verificar que el click no sea dentro del contenedor completo
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setSearchTerm(""); // Limpiar búsqueda al cerrar
      }
    }
    if (open) {
      // Usar un pequeño delay para evitar conflictos con el click del Fab
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]); */

  return (
    <Box
      ref={containerRef}
      sx={{
        zIndex: 1200,
        position: "fixed",
        top: 84, // Debajo del header, consistente con ViewToggleFab
        left: 16,
        height: FAB_HEIGHT,
        display: "flex",
        alignItems: "center",
        // Prevent user-select on icon to avoid blue highlight during transitions
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          height: FAB_HEIGHT,
          width: open ? EXTENDED_WIDTH : FAB_WIDTH,
          borderRadius:  FAB_HEIGHT / 2, // círculo en left y right (50%)
          
          bgcolor: "background.paper",
          boxShadow: open ? theme.shadows[5] : theme.shadows[3],
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          transition:
            "width 0.35s cubic-bezier(0.4,0,0.2,1), 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s, background 0.25s"
        }}
      >
        {/* Botón de buscar */}
        <Fab
          ref={fabRef}
          color="primary"
          aria-label="buscar"
          onClick={handleToggle}
          sx={{
            minHeight: FAB_HEIGHT,
            minWidth: FAB_WIDTH,
            height: FAB_HEIGHT,
            width: FAB_WIDTH,
            boxShadow: "none",
            transition: "background 0.3s, transform 0.33s",
            position: "relative",
    
            zIndex: 2,
          }}
        >
        {open ? <FaTimes />: <FaSearch />}
        </Fab>
        {/* Input de búsqueda mostrado si está 'open' */}
        <Box
          sx={{
            width: open ? EXTENDED_WIDTH - FAB_WIDTH : 0,
            opacity: open ? 1 : 0,
            transition: "width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s",
            overflow: "hidden",
            ml: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            inputRef={inputRef}
            sx={{
              width: "100%",
              fontSize: 16,
              px: 1.5,
            }}
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // Presionar Esc cierra
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchTerm("");
                setOpen(false);
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchFab;
