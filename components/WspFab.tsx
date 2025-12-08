//fab icon para whatsapp
import { Fab } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";
import { trackWhatsAppClick } from "@/utils/analytics";
import { useTenant } from "@/context/TenantContext";

const WspFab = () => {
  const { tenantId } = useTenant();

  const handleClick = () => {
    trackWhatsAppClick({
      tenant: tenantId,
    });
  };

  return (
    <Fab color="primary" aria-label="whatsapp" onClick={handleClick}>
      <FaWhatsapp />
    </Fab>
  );
};

export default WspFab;