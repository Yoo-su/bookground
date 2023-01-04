import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { lightTheme, darkTheme } from "styles/theme";
import useDarkMode from "use-dark-mode";

interface Prop {
    children: React.ReactNode
}

const CustomThemeProvider = ({ children }: Prop) => {
    const [mounted, setMounted] = useState(false);
    const { value } = useDarkMode();
    const [theme, setTheme] = useState(lightTheme);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (value) {
            setTheme(darkTheme)
        } else if (!value) {
            setTheme(lightTheme)
        }
    }, [value])

    const body = (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )

    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{body}</div>;
    }
    return body;
}

export default CustomThemeProvider;