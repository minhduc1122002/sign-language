import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

export const COLORS = {
    primary: "#F9DCC4",
    secondary: "#FCD5CE",
    accent: "#FEC89A",

    success: "#00C851",
    error: "#FF4444",

    black: "#171717",
    white: "#FFFFFF",
    background: "#F8EDEB"
}

export const SIZES = {
    base: 10,
    width,
    height
}