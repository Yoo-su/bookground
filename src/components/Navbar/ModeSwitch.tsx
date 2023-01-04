import useDarkMode from 'use-dark-mode';
import IconButton from "@mui/material/IconButton";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

const ModeSwitch = () => {
    const { toggle, value } = useDarkMode();
    const [mode, setMode] = useState("light");

    useEffect(() => {
        const currentMode = localStorage.getItem("darkMode");

        if (currentMode && currentMode === "true") {
            setMode("dark");
        }
        else if (currentMode && currentMode === "false") {
            setMode("light");
        }
        else {
            setMode("light");
        }
    }, [value])
    return (
        <Box className="switchBox">
            {mode === "dark" ? (
                <IconButton onClick={toggle}>
                    <LightModeIcon sx={{
                        color: "#fdb813",
                        backgroundColor: "#e7f5fe",
                        borderRadius: "50%",
                        padding: "0.2rem"
                    }} />
                </IconButton>
            ) :
                (
                    <IconButton onClick={toggle}>
                        <DarkModeIcon sx={{
                            color: "#fde8ac",
                            backgroundColor: "#22303c",
                            borderRadius: "50%",
                            padding: "0.2rem"
                        }} />
                    </IconButton>
                )}
        </Box>
    )
}

export default ModeSwitch