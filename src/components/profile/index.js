import React from "react";
import { Image, View, Text, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import { globalStyle, color } from "../../utility";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import { Divider } from 'react-native-elements'
// import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ img, name, onImgTap }) => {
    return (
        <>
            <View style={[globalStyle.sectionCentered, styles.container]}>
                <View style={styles.imgContainer}>
                    <TouchableOpacity onPress={onImgTap} activeOpacity={0.8}>
                        {img ? (
                            <Image source={{ uri: img }} style={styles.img} resizeMode="cover" />
                        ) :
                            (<View style={[
                                globalStyle.sectionCentered, styles.img, { backgroundColor: color.DARK_GRAY },
                            ]}><Text style={{ fontSize: 50, color: color.WHITE, fontWeight: "bold", alignSelf: 'center' }}>{name.charAt(0)}</Text></View>)}
                    </TouchableOpacity>
                </View>
                <Text style={styles.welcome}>{name}</Text>
            </View>
        </>
    );
}