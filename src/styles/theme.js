import { rem } from "polished";
import { css } from "styled-components";

const theme = {
  color: {
    sidebar: "#343947",
    mainColor: "#F0F0F0",

    white: "#FFFFFF",
    whiteA100: "#FFFFFFFF",
    whiteA050: "#FFFFFF80",
    whiteA000: "#FFFFFF00",

    gray900: "#464d52",
    gray800: "#5a5a5a",
    gray700: "#868686",
    gray600: "#999999",
    gray500: "#C3C3C3",
    gray400: "#D8D8D8",
    gray300: "#ECECEC",
    gray200: "#F2F4F6",
    gray100: "#F5F5F5",

    grayA100: "#D8D8D8FF",
    grayA050: "#D8D8D850",
    grayA000: "#D8D8D800",

    blue500: "#5673EB",
    blue400: "#95A7EE",
    blue300: "#CAD3F8",
    blue200: "#D5DBF3",
    blue100: "#EFF2FF",

    blueA100: "#5673EBFF",
    blueA050: "#5673EB50",
    blueA000: "#5673EB00",

    red500: "#EB5374",
    red100: "#FDEAEE",

    pink500: "#BF2E70",
    pink100: "#F7E5ED",

    background: "#FFFFFF",

    douzone100: "#F0F7FE",
    douzone300: "#458EF3",
    douzone500: "#3574D1",
    douzone700: "#2558A6",

    amaranth: "#4CA7EA",

    icon: "#666666",
    hoverIcon: "#858891",
    activeIcon: "#FFFFFF",
  },

  typo: {
    heading1: () => ({
      fontSize: rem(28),
      fontWeight: 700,
    }),
    heading2: () => ({
      fontSize: rem(18),
      fontWeight: 700,
    }),
    heading3: () => ({
      fontSize: rem(16),
      fontWeight: 700,
    }),
    subtitle1: () => ({
      fontSize: rem(15),
      fontWeight: 700,
    }),
    subtitle2: () => ({
      fontSize: rem(14),
      fontWeight: 700,
    }),
    subtitle3: () => ({
      fontSize: rem(13),
      fontWeight: 700,
    }),
    xxl: rem(14),
    xl: rem(13),
    lg: rem(12),
    md: rem(11),
    sm: rem(10),
  },

  ui: {
    gnbSidebar: "100px",
    lnbSidebar: "120px",
    header: "80px",
    moduleTitle: "40px",
  },
};

export default theme;
