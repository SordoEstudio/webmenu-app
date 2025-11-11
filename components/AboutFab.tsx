import { Fab } from "@mui/material";
import { FaInfo } from "react-icons/fa";
import { useRouter } from "next/navigation";
const AboutFab = () => {
    const router = useRouter()
    return (
        <Fab color="primary" aria-label="about" onClick={() => router.push('/about')}
        sx={{position: 'fixed', bottom: 86, right: 16, zIndex: 1000}}>
            <FaInfo color="white" />
        </Fab>
    );
};

export default AboutFab;