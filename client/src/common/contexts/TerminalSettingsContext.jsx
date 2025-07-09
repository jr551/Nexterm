import { createContext, useContext, useState, useEffect } from "react";

const TerminalSettingsContext = createContext({});

export const useTerminalSettings = () => useContext(TerminalSettingsContext);

const DEFAULT_TERMINAL_THEMES = {
    default: {
        name: "Default",
        background: "#13181C",
        foreground: "#F5F5F5",
        brightWhite: "#FFFFFF",
        cursor: "#F5F5F5",
        black: "#000000",
        red: "#E25A5A",
        green: "#7FBF7F",
        yellow: "#FFBF7F",
        blue: "#7F7FBF",
        magenta: "#BF7FBF",
        cyan: "#7FBFBF",
        white: "#BFBFBF",
        brightBlack: "#404040",
        brightRed: "#FF6B6B",
        brightGreen: "#9ECEFF",
        brightYellow: "#FFD93D",
        brightBlue: "#9D9DFF",
        brightMagenta: "#FF9DFF",
        brightCyan: "#9DFFFF",
    },
    light: {
        name: "Light",
        background: "#F3F3F3",
        foreground: "#000000",
        brightWhite: "#464545",
        cursor: "#000000",
        black: "#000000",
        red: "#CC0000",
        green: "#4E9A06",
        yellow: "#C4A000",
        blue: "#3465A4",
        magenta: "#75507B",
        cyan: "#06989A",
        white: "#D3D7CF",
        brightBlack: "#555753",
        brightRed: "#EF2929",
        brightGreen: "#8AE234",
        brightYellow: "#FCE94F",
        brightBlue: "#729FCF",
        brightMagenta: "#AD7FA8",
        brightCyan: "#34E2E2",
    },
    dracula: {
        name: "Dracula",
        background: "#282A36",
        foreground: "#F8F8F2",
        brightWhite: "#FFFFFF",
        cursor: "#F8F8F2",
        black: "#21222C",
        red: "#FF5555",
        green: "#50FA7B",
        yellow: "#F1FA8C",
        blue: "#BD93F9",
        magenta: "#FF79C6",
        cyan: "#8BE9FD",
        white: "#F8F8F2",
        brightBlack: "#6272A4",
        brightRed: "#FF6E6E",
        brightGreen: "#69FF94",
        brightYellow: "#FFFFA5",
        brightBlue: "#D6ACFF",
        brightMagenta: "#FF92DF",
        brightCyan: "#A4FFFF",
    },
    monokai: {
        name: "Monokai",
        background: "#272822",
        foreground: "#F8F8F2",
        brightWhite: "#F8F8F2",
        cursor: "#F8F8F0",
        black: "#272822",
        red: "#F92672",
        green: "#A6E22E",
        yellow: "#F4BF75",
        blue: "#66D9EF",
        magenta: "#AE81FF",
        cyan: "#A1EFE4",
        white: "#F8F8F2",
        brightBlack: "#75715E",
        brightRed: "#F92672",
        brightGreen: "#A6E22E",
        brightYellow: "#F4BF75",
        brightBlue: "#66D9EF",
        brightMagenta: "#AE81FF",
        brightCyan: "#A1EFE4",
    },
    solarizedDark: {
        name: "Solarized Dark",
        background: "#002B36",
        foreground: "#839496",
        brightWhite: "#FDF6E3",
        cursor: "#93A1A1",
        black: "#073642",
        red: "#DC322F",
        green: "#859900",
        yellow: "#B58900",
        blue: "#268BD2",
        magenta: "#D33682",
        cyan: "#2AA198",
        white: "#EEE8D5",
        brightBlack: "#002B36",
        brightRed: "#CB4B16",
        brightGreen: "#586E75",
        brightYellow: "#657B83",
        brightBlue: "#839496",
        brightMagenta: "#6C71C4",
        brightCyan: "#93A1A1",
    },
    nord: {
        name: "Nord",
        background: "#2E3440",
        foreground: "#D8DEE9",
        brightWhite: "#ECEFF4",
        cursor: "#D8DEE9",
        black: "#3B4252",
        red: "#BF616A",
        green: "#A3BE8C",
        yellow: "#EBCB8B",
        blue: "#81A1C1",
        magenta: "#B48EAD",
        cyan: "#88C0D0",
        white: "#E5E9F0",
        brightBlack: "#4C566A",
        brightRed: "#BF616A",
        brightGreen: "#A3BE8C",
        brightYellow: "#EBCB8B",
        brightBlue: "#81A1C1",
        brightMagenta: "#B48EAD",
        brightCyan: "#8FBCBB",
    },
    cyberpunk: {
        name: "Cyberpunk",
        background: "#0A0A0A",
        foreground: "#00FF41",
        brightWhite: "#FFFFFF",
        cursor: "#FF0080",
        black: "#0A0A0A",
        red: "#FF0080",
        green: "#00FF41",
        yellow: "#FFFF00",
        blue: "#0080FF",
        magenta: "#FF0080",
        cyan: "#00FFFF",
        white: "#C0C0C0",
        brightBlack: "#404040",
        brightRed: "#FF4080",
        brightGreen: "#40FF80",
        brightYellow: "#FFFF80",
        brightBlue: "#4080FF",
        brightMagenta: "#FF40FF",
        brightCyan: "#40FFFF",
    },
    ocean: {
        name: "Ocean",
        background: "#001122",
        foreground: "#A3D5FF",
        brightWhite: "#FFFFFF",
        cursor: "#00CCFF",
        black: "#001122",
        red: "#FF6B6B",
        green: "#4ECDC4",
        yellow: "#FFE66D",
        blue: "#5DADE2",
        magenta: "#BB8FCE",
        cyan: "#76D7C4",
        white: "#BDC3C7",
        brightBlack: "#34495E",
        brightRed: "#FF8A80",
        brightGreen: "#80CBC4",
        brightYellow: "#FFF176",
        brightBlue: "#81D4FA",
        brightMagenta: "#CE93D8",
        brightCyan: "#A7FFEB",
    },
    sunset: {
        name: "Sunset",
        background: "#2D1B69",
        foreground: "#FFE4B5",
        brightWhite: "#FFFFFF",
        cursor: "#FF6B35",
        black: "#2D1B69",
        red: "#FF6B35",
        green: "#F7931E",
        yellow: "#FFE135",
        blue: "#FF1744",
        magenta: "#E91E63",
        cyan: "#FF5722",
        white: "#FFE4B5",
        brightBlack: "#673AB7",
        brightRed: "#FF8A65",
        brightGreen: "#FFB74D",
        brightYellow: "#FFF176",
        brightBlue: "#FF5252",
        brightMagenta: "#F06292",
        brightCyan: "#FF8A50",
    },
    forest: {
        name: "Forest",
        background: "#0F2027",
        foreground: "#A8E6CF",
        brightWhite: "#FFFFFF",
        cursor: "#7FFFD4",
        black: "#0F2027",
        red: "#D2691E",
        green: "#228B22",
        yellow: "#DAA520",
        blue: "#4682B4",
        magenta: "#8B4513",
        cyan: "#20B2AA",
        white: "#A8E6CF",
        brightBlack: "#2F4F4F",
        brightRed: "#CD853F",
        brightGreen: "#32CD32",
        brightYellow: "#FFD700",
        brightBlue: "#87CEEB",
        brightMagenta: "#D2B48C",
        brightCyan: "#AFEEEE",
    },
    neon: {
        name: "Neon",
        background: "#0C0C0C",
        foreground: "#E0E0E0",
        brightWhite: "#FFFFFF",
        cursor: "#FF073A",
        black: "#0C0C0C",
        red: "#FF073A",
        green: "#39FF14",
        yellow: "#FFFF33",
        blue: "#0066FF",
        magenta: "#FF00FF",
        cyan: "#00FFFF",
        white: "#E0E0E0",
        brightBlack: "#333333",
        brightRed: "#FF4D6D",
        brightGreen: "#66FF66",
        brightYellow: "#FFFF66",
        brightBlue: "#3399FF",
        brightMagenta: "#FF66FF",
        brightCyan: "#66FFFF",
    },
    cherry: {
        name: "Cherry",
        background: "#1A0B1A",
        foreground: "#FFB6C1",
        brightWhite: "#FFFFFF",
        cursor: "#FF1493",
        black: "#1A0B1A",
        red: "#DC143C",
        green: "#FF69B4",
        yellow: "#FFB6C1",
        blue: "#DA70D6",
        magenta: "#FF1493",
        cyan: "#FF6347",
        white: "#FFB6C1",
        brightBlack: "#8B008B",
        brightRed: "#FF69B4",
        brightGreen: "#FFB6C1",
        brightYellow: "#FFCCCB",
        brightBlue: "#DDA0DD",
        brightMagenta: "#FF69B4",
        brightCyan: "#FF7F50",
    },
    matrix: {
        name: "Matrix",
        background: "#000000",
        foreground: "#00FF00",
        brightWhite: "#FFFFFF",
        cursor: "#00FF00",
        black: "#000000",
        red: "#008000",
        green: "#00FF00",
        yellow: "#ADFF2F",
        blue: "#32CD32",
        magenta: "#90EE90",
        cyan: "#98FB98",
        white: "#00FF00",
        brightBlack: "#006400",
        brightRed: "#228B22",
        brightGreen: "#7FFF00",
        brightYellow: "#CCFF99",
        brightBlue: "#66FF66",
        brightMagenta: "#B3FFB3",
        brightCyan: "#E0FFE0",
    },
};

const DEFAULT_FONTS = [
    { name: "Monospace", value: "monospace" },
    { name: "Fira Code", value: "'Fira Code', monospace" },
    { name: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
    { name: "Source Code Pro", value: "'Source Code Pro', monospace" },
    { name: "Inconsolata", value: "Inconsolata, monospace" },
    { name: "Ubuntu Mono", value: "'Ubuntu Mono', monospace" },
    { name: "Roboto Mono", value: "'Roboto Mono', monospace" },
    { name: "Hack", value: "Hack, monospace" },
];

const CURSOR_STYLES = [
    { name: "Block", value: "block" },
    { name: "Underline", value: "underline" },
    { name: "Bar", value: "bar" },
];

export const TerminalSettingsProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(() => {
        const saved = localStorage.getItem("terminal-theme");
        return saved && DEFAULT_TERMINAL_THEMES[saved] ? saved : "default";
    });

    const [selectedFont, setSelectedFont] = useState(() => {
        const saved = localStorage.getItem("terminal-font");
        const validFont = DEFAULT_FONTS.find(font => font.value === saved);
        return validFont ? saved : "monospace";
    });

    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem("terminal-font-size");
        const parsedSize = saved ? parseInt(saved) : 16;
        return parsedSize >= 10 && parsedSize <= 32 ? parsedSize : 16;
    });

    const [cursorStyle, setCursorStyle] = useState(() => {
        const saved = localStorage.getItem("terminal-cursor-style");
        const validStyle = CURSOR_STYLES.find(style => style.value === saved);
        return validStyle ? saved : "block";
    });

    const [cursorBlink, setCursorBlink] = useState(() => {
        const saved = localStorage.getItem("terminal-cursor-blink");
        return saved ? saved === "true" : true;
    });

    useEffect(() => {
        localStorage.setItem("terminal-theme", selectedTheme);
    }, [selectedTheme]);

    useEffect(() => {
        localStorage.setItem("terminal-font", selectedFont);
    }, [selectedFont]);

    useEffect(() => {
        localStorage.setItem("terminal-font-size", fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem("terminal-cursor-style", cursorStyle);
    }, [cursorStyle]);

    useEffect(() => {
        localStorage.setItem("terminal-cursor-blink", cursorBlink.toString());
    }, [cursorBlink]);

    const getTerminalTheme = (theme) => DEFAULT_TERMINAL_THEMES[theme] || DEFAULT_TERMINAL_THEMES.default;
    const getCurrentTheme = () => getTerminalTheme(selectedTheme);
    const getAvailableThemes = () => Object.keys(DEFAULT_TERMINAL_THEMES).map(key => ({ key, ...DEFAULT_TERMINAL_THEMES[key] }));
    const getAvailableFonts = () => DEFAULT_FONTS;
    const getCursorStyles = () => CURSOR_STYLES;

    return (
        <TerminalSettingsContext.Provider value={{
            selectedTheme, setSelectedTheme, selectedFont, setSelectedFont,
            fontSize, setFontSize, cursorStyle, setCursorStyle, cursorBlink, setCursorBlink,
            getCurrentTheme, getTerminalTheme, getAvailableThemes, getAvailableFonts, getCursorStyles,
        }}>
            {children}
        </TerminalSettingsContext.Provider>
    );
};
