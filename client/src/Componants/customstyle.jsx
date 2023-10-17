import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#FFF", // Label text color
          },
          "& fieldset": {
            borderColor: "#0DBADE", // Border color
            borderRadius: "15px", // Border radius
          },
          "& input": {
            color: "#FFFF", // Text (typing) color
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#FFF", // Label text color
          },
          "& fieldset": {
            borderColor: "#0DBADE", // Border color
            borderRadius: "15px", // Border radius
          },
          "& input": {
            color: "#FFF", // Text (typing) color
          },
        },
      },
    },
  },
});

export default customTheme;
