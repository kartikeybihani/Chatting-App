import React, { useLayoutEffect, useState, useEffect, Fragment, useContext } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Dimension, Image } from "react-native";
import { Thumbnail } from 'native-base'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyle, color, appStyle } from "../../utility";
import styles from "./styles";
import { ChatInput, ChatBox } from "../../components";
import firebase from "../../firebase/config";
import { senderMsg, recieverMsg } from "../../Network";
import { deviceHeight } from "../../utility/style/appStyle";
import { smallDeviceHeight } from "../../utility/constants";
import { Icon } from "react-native-elements";
import ActionSheet from 'react-native-action-sheet'
import { LOADING_START, LOADING_STOP } from "../../context/actions/types";
import { Store } from "../../context/store";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const Chat = ({ route, navigation }) => {
    const { params } = route;
    const { name, img, imgText, guestUserId, currentUserId } = params;
    const [msgValue, setMsgValue] = useState("");
    const [messeges, setMesseges] = useState([]);

    const globalState = useContext(Store)
    const { dispatchLoaderAction } = globalState

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ marginLeft: 10, marginRight: 15 }}>
                        <Icon onPress={() => navigation.navigate("Dashboard")} name="arrow-left" type="font-awesome" color="white" size={25} style={{ marginRight: 10 }} />
                    </View>
                    {img ? (<TouchableOpacity onPress={() => navigation.navigate("ShowFullImg", { name, img: img })}><Thumbnail style={{ width: 50, height: 50, marginRight: 5 }} source={{ uri: img }} resizeMode="cover" /></TouchableOpacity>) : (<View style={{ borderWidth: 0.6, justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderRadius: 70, width: 40, height: 40, marginRight: 6 }}><Icon name="user" type="font-awesome" color="white" size={26} /></View>)}
                    <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}>{name}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="video-camera" type="font-awesome" color="white" size={22} style={{ marginRight: 18 }} />
                    <Icon name="phone" type="font-awesome" color="white" size={22} style={{ marginRight: 18 }} />
                    <View style={{ marginRight: 0 }}>
                        <TouchableOpacity onPress={() => threeDot()}>
                            <Icon name="ellipsis-v" type="font-awesome" color="white" size={22} style={{ paddingRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            ),
            headerTitle: () => null
        });
    }, [navigation]);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    const threeDot = (props) => {
        const options = ['Clear Chat', 'Chat Search', 'Settings']
        const cancelButtonIndex = 2

        ActionSheet.showActionSheetWithOptions(
            { options, cancelButtonIndex },
            buttonIndex => {
                if (buttonIndex == 0) { }
                if (buttonIndex == 1) { }
                if (buttonIndex == 2) { navigation.navigate('Settings') }
                else { null }
            }
        )
    }

    useEffect(() => {
        try {
            firebase
                .database()
                .ref("messeges")
                .child(currentUserId)
                .child(guestUserId)
                .on("value", (dataSnapshot) => {
                    let msgs = [];
                    dataSnapshot.forEach((child) => {
                        msgs.push({
                            sendBy: child.val().messege.sender,
                            recievedBy: child.val().messege.reciever,
                            msg: child.val().messege.msg,
                            img: child.val().messege.img,
                        });
                    });
                    setMesseges(msgs.reverse());
                });
        } catch (error) {
            alert(error);
        }

    }, []);

    const handleCamera = () => {
        const options = ['Select from Gallery', 'Camera', 'Cancel']
        const cancelButtonIndex = 2

        ActionSheet.showActionSheetWithOptions(
            { options, cancelButtonIndex },
            buttonIndex => {

                if (buttonIndex == 0) {

                    launchImageLibrary({ mediaType: "photo", includeBase64: true, maxHeight: 100000, maxWidth: 100000 }, (response) => {

                        if (response.didCancel) {
                            console.log("User cancelled photo picker");
                        } else if (response.error) {
                            console.log("ImagePicker Error: ", response.error);
                        } else if (response.customButton) {
                            console.log("User tapped custom button: ", response.customButton);
                        } else {
                            // Base 64 image:

                            let source = "data:image/jpeg;base64," + response.base64
                            // console.log(response)

                            senderMsg(msgValue, currentUserId, guestUserId, source)
                                .then(() => { })
                                .catch((err) => alert(err));

                            // * guest user

                            recieverMsg(msgValue, currentUserId, guestUserId, source)
                                .then(() => { })
                                .catch((err) => alert(err));
                        }
                    })

                }

                else if (buttonIndex == 1) {
                    launchCamera({ mediaType: "photo", includeBase64: true, maxHeight: 10000000, maxWidth: 10000000 }, (response) => {

                        if (response.didCancel) {
                            console.log("User cancelled photo picker");
                        } else if (response.error) {
                            console.log("ImagePicker Error: ", response.error);
                        } else if (response.customButton) {
                            console.log("User tapped custom button: ", response.customButton);
                        } else {
                            // Base 64 image:

                            let source = "data:image/jpeg;base64," + response.base64
                            // console.log(response)
                            senderMsg(msgValue, currentUserId, guestUserId, source)
                                .then(() => { })
                                .catch((err) => alert(err));

                            // * guest user

                            dispatchLoaderAction({ type: LOADING_START })

                            recieverMsg(msgValue, currentUserId, guestUserId, source)
                                .then(() => { })
                                .catch((err) => alert(err));

                            dispatchLoaderAction({ type: LOADING_STOP })
                        }
                    })
                }

            }
        )
    };

    const handleSend = () => {
        setMsgValue("");
        if (msgValue) {
            senderMsg(msgValue, currentUserId, guestUserId, "")
                .then(() => { })
                .catch((err) => alert(err));

            // dispatchLoaderAction({ type: LOADING_START })
            // * guest user

            recieverMsg(msgValue, currentUserId, guestUserId, "")
                .then(() => { })
                .catch((err) => alert(err));

        }
    };

    const handleOnChange = (text) => {
        setMsgValue(text);
    };

    const imgTap = (chatImg) => {
        navigation.navigate("ShowFullImg1", { name, img: chatImg });
    };

    // console.log(messeges)

    return (
        <SafeAreaView style={{ backgroundColor: color.BLACK, flex: 1 }}>
            <KeyboardAvoidingView keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ backgroundColor: color.BLACK, flex: 1 }}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    <Fragment>
                        <FlatList
                            inverted
                            // data={messeges.slice(0, 1)}
                            data={messeges}
                            style={{ marginLeft: 10, marginRight: 10 }}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <ChatBox
                                    msg={item.msg}
                                    userId={item.sendBy}
                                    img={item.img}
                                    onImgTap={() => imgTap(item.img)}
                                />
                            )}
                        />

                        {/* Send Message */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                            <ChatInput
                                placeholder="Type your message"
                                numberOfLines={10}
                                inputStyle={styles.input}
                                value={msgValue}
                                onChangeText={(text) => handleOnChange(text)}
                            />
                            <View style={styles.sendBtnContainer}>
                                <MaterialCommunityIcons
                                    name="camera"
                                    color="#d4ccb8"
                                    size={30}
                                    style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
                                    onPress={() => handleCamera()}
                                />
                                <MaterialCommunityIcons
                                    name="send-circle"
                                    color="#d4ccb8"
                                    size={40}
                                    style={{ marginLeft: 5, marginRight: 10 }}
                                    onPress={() => handleSend()}
                                />
                            </View>
                        </View>

                    </Fragment>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default Chat