import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
    chatContainer: { backgroundColor: color.WHITE, borderTopRightRadius: 17 },
    chatTxt: {
        color: color.BLACK,
        fontSize: 16.8,
        marginTop: 2,
        fontWeight: "500",
        paddingHorizontal: 12,
        paddingTop: 5
    },
    chatTxt1: {
        color: color.BLACK,
        fontSize: 11,
        fontWeight: "500",
        paddingHorizontal: 12,
        paddingBottom: 4
    },
});