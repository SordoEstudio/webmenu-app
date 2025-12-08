import { Fab } from "@mui/material";
import { FaInfo } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { trackAboutClick } from "@/utils/analytics";
import { useTenant } from "@/context/TenantContext";

const AboutFab = () => {
    const router = useRouter();
    const { tenantId } = useTenant();

    const handleClick = () => {
        trackAboutClick({ tenant: tenantId });
        router.push('/about');
    };

    return (
        <Fab color="primary" aria-label="about" onClick={handleClick}
        sx={{position: 'fixed', bottom: 86, right: 16, zIndex: 1000}}>
            <FaInfo color="white" />
        </Fab>
    );
};

export default AboutFab;