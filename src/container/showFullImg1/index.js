import React, { useLayoutEffect, Fragment } from "react";
import { Image, Text, View, StyleSheet, Dimensions, Animated } from "react-native";
import { globalStyle, color } from "../../utility";
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const ShowFullImg1 = ({ route, navigation }) => {
    const { params } = route;
    const { name, img, imgText } = params;

    const scale = new Animated.Value(1)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{name}</Text>
        })
    }, [navigation]);

    const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
        useNativeDriver: true,
    });

    const onPinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 1,
            }).start();
        }
    };

    return (
        <>
            {img ? (
                <PinchGestureHandler
                    onGestureEvent={onPinchEvent}
                    onHandlerStateChange={(event) => onPinchStateChange(event)}
                >
                    <Animated.Image
                        source={{ uri: img }}
                        style={{ flex: 1, transform: [{ scale: scale }] }}
                        resizeMode='cover'
                    />
                </PinchGestureHandler>
            ) : (
                <View
                    style={[globalStyle.containerCentered, { backgroundColor: color.BLACK, height: Dimensions.get("window").height }]}>
                    <Text style={styles.text}>{imgText}</Text>
                </View>
            )}
        </>
    );
};

export default ShowFullImg1

const styles = StyleSheet.create({
    text: { color: color.WHITE, fontSize: 200, fontWeight: "bold" },
});