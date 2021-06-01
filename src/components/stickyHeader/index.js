import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import styles from "./styles";

export default ({ name, img, onImgTap }) => {
    return (
        <Card style={styles.cardStyle} transparent>
            <CardItem style={styles.cardItemStyle}>
                <Left>
                    <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
                        {img ? (
                            <Text>hello</Text>
                        ) : (
                            <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
                        )}
                    </TouchableOpacity>

                    <Body style={{ alignItems: 'center' }}>
                        <Text style={styles.profileName}>{name}</Text>
                    </Body>
                </Left>
            </CardItem>
        </Card>
    );
};
