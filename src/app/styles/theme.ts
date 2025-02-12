"use client";
import { purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
});

const theme = createTheme({
    palette:{
        primary:{
            main:"#fefefe",
        },
        secondary:purple
    },
    typography:{
        fontFamily: quicksand.style.fontFamily
    }
})

export default theme;