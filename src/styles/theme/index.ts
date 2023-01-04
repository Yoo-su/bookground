interface ThemeType {
    BG_COLOR: string;
    TEXT_COLOR: string;
    BORDER_COLOR: string;
    COMMENT_BG_COLOR: string;
    CARD_BG_COLOR: string;
    PLACEHOLDER_COLOR: string;

    NAVBAR_BG_COLOR: string;
    NAVBAR_SCROLL_BG_COLOR: string;

    LOGO1_COLOR: string;
    LOGO2_COLOR: string;

    SEARCHBOX_BG_COLOR: string;
    SEARCHBOX_BORDER_COLOR: string;
    SEARCHBTN_BG_COLOR: string;

    BOOK_BG_COLOR: string;

    PATTERN1_COLOR: string;
    PATTERN2_COLOR: string;

    RATING_BG_COLOR: string;
}

export const lightTheme: ThemeType = {
    BG_COLOR: "#fff",
    TEXT_COLOR: "#000",
    BORDER_COLOR: "rgba(0,0,0,0.3)",
    COMMENT_BG_COLOR: "#FFF",
    CARD_BG_COLOR: "#FFF",
    PLACEHOLDER_COLOR: "#b4b4b4",

    NAVBAR_BG_COLOR: "rgba(188,158,130,1)",
    NAVBAR_SCROLL_BG_COLOR: "rgba(188,158,130,0.7)",

    LOGO1_COLOR: "#495e35",
    LOGO2_COLOR: "#4b371c",

    SEARCHBOX_BG_COLOR: "#fff",
    SEARCHBOX_BORDER_COLOR: "none",
    SEARCHBTN_BG_COLOR: "linear-gradient(to bottom, #6CA0DC, #e39ff6)",

    BOOK_BG_COLOR: "rgba(250,253,246,1)",

    PATTERN1_COLOR: "#CDCDCD",
    PATTERN2_COLOR: "#5F6D7A",

    RATING_BG_COLOR: "rgba(229,229,201,0.3)",
}

export const darkTheme: ThemeType = {
    BG_COLOR: "#404258",
    TEXT_COLOR: "#d9dddc",
    BORDER_COLOR: "#d9dddc",
    COMMENT_BG_COLOR: "#000",
    CARD_BG_COLOR: "#000",
    PLACEHOLDER_COLOR: "#909090",

    NAVBAR_BG_COLOR: "rgba(56,57,62,1)",
    NAVBAR_SCROLL_BG_COLOR: "rgba(56,57,62,0.7)",

    LOGO1_COLOR: "#fff",
    LOGO2_COLOR: "#fff",

    SEARCHBOX_BG_COLOR: "#88807B",
    SEARCHBOX_BORDER_COLOR: "1px solid #fff",
    SEARCHBTN_BG_COLOR: "#393E46",

    BOOK_BG_COLOR: "#48494b",

    PATTERN1_COLOR: "#3C2A21",
    PATTERN2_COLOR: "#D5CEA3",

    RATING_BG_COLOR: "rgba(255,255,255,0.4)",
}

