import { ThemeConfig } from "antd";

export const customizeTheme: ThemeConfig = {
  token: {
    fontFamily: 'Pretendard, sans-serif',
    colorLink: "#463DC8",
    colorPrimary: "#5046E4",
  },
  components: {
    Button: {
      fontWeight: 600,
    },
    Typography: {
      fontSizeHeading1: 36,
      titleMarginBottom: 0,
    },
    Input: {
      controlHeight: 44,
      paddingBlock: 10,
      paddingInline: 14,
      addonBg: "#5046E4",
      colorTextPlaceholder: "#717680"
    },
    Card: {
      bodyPadding: 0,
    },
    Menu: {
      itemColor: "#FFFFFF",
      itemSelectedColor: "#FFFFFF",
      itemSelectedBg: 'transparent',
    },
    Badge: {
      dotSize: 12,
    },
    Table: {
      borderColor: "#F5F5F5",
      headerBorderRadius: 20,
      headerColor: "#717680",
      colorText: "#181D27",

    },
    Pagination: {
      itemActiveBg: "#FAFAFA",
      colorPrimary: "#181D27",
      colorBorder: "#D5D7DA",
    },
    Form: {
      itemMarginBottom: 16,
    },
    Tabs: {
      itemColor: "#717680",
    },
    Modal: {
      paddingContentHorizontalLG: 16
    }

  },
};
