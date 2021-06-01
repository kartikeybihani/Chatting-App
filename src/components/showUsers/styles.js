import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
    cardStyle: {
        backgroundColor: color.SEMI_TRANSPARENT,
    },
    cardItemStyle: {
        backgroundColor: color.SEMI_TRANSPARENT,
    },

    logoContainer: {
        height: 45,
        width: 45,
        borderColor: color.WHITE,
        borderWidth: 2,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.DARK_GRAY,
    },
    thumbnailName: { fontSize: 25, color: color.WHITE, fontWeight: "bold" },
    profileName: { fontSize: 20, color: color.WHITE, fontWeight: "bold", marginLeft: 10 },
});