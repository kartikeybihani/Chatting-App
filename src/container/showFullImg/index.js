import React, { useLayoutEffect, Fragment, useContext, useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import { globalStyle, color } from "../../utility";
import { LOADING_STOP, LOADING_START } from "../../context/actions/types";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ActionSheet from 'react-native-action-sheet'
import { UpdateUser } from "../../Network";
import { Store } from "../../context/store";
import { senderMsg, recieverMsg } from "../../Network";
import { uuid } from "../../utility/constants";

const ShowFullImg = ({ route, navigation }) => {
    const { params } = route;
    const { name, img, imgText } = params;

    const globalState = useContext(Store)
    const { dispatchLoaderAction } = globalState

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        profileImg: ''
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: <Text>{name}</Text>,
            headerRight: () => (
                <FontAwesome5
                    name="user-edit"
                    size={20}
                    style={{ marginRight: 10 }}
                    onPress={() => selectPhotoTapped()}
                    color="white"
                />
            )
        })
    }, [navigation]);

    const selectPhotoTapped = () => {
        const options = ['Select from Gallery', 'Camera', 'Remove Profile Photo', 'Cancel']
        const cancelButtonIndex = 2

        ActionSheet.showActionSheetWithOptions(
            { options, cancelButtonIndex },
            buttonIndex => {

                if (buttonIndex == 0) {
                    launchImageLibrary({ mediaType: "photo", includeBase64: true, maxHeight: 10000, maxWidth: 10000 }, (response) => {

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

                            dispatchLoaderAction({ type: LOADING_START });
                            UpdateUser(uuid, source)
                                .then(() => {
                                    setUserDetail({
                                        ...userDetail,
                                        profileImg: source,
                                    });
                                    dispatchLoaderAction({ type: LOADING_STOP });
                                })
                                .catch((err) => {
                                    alert(err);
                                    dispatchLoaderAction({ type: LOADING_STOP });
                                });
                        }
                    })
                }

                else if (buttonIndex == 2) {
                    let source = ""
                    // console.log(response)

                    dispatchLoaderAction({ type: LOADING_START });
                    UpdateUser(uuid, source)
                        .then(() => {
                            setUserDetail({
                                ...userDetail,
                                profileImg: source,
                            });
                            dispatchLoaderAction({ type: LOADING_STOP });
                        })
                        .catch((err) => {
                            alert(err);
                            dispatchLoaderAction({ type: LOADING_STOP });
                        });
                }

                else if (buttonIndex == 1) {
                    launchCamera({ mediaType: "photo", includeBase64: true, maxHeight: 10000, maxWidth: 10000 }, (response) => {

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

                            dispatchLoaderAction({ type: LOADING_START });
                            UpdateUser(uuid, source)
                                .then(() => {
                                    setUserDetail({
                                        ...userDetail,
                                        profileImg: source,
                                    });
                                    dispatchLoaderAction({ type: LOADING_STOP });
                                })
                                .catch((err) => {
                                    alert(err);
                                    dispatchLoaderAction({ type: LOADING_STOP });
                                });
                        }
                    })
                }

            }
        )
    }

    return (
        <Fragment>
            {img ? (
                <Image
                    source={{ uri: img }}
                    style={{ flex: 1 }}
                    resizeMode='cover'
                />
            ) : (
                <View style={[globalStyle.containerCentered, { backgroundColor: color.BLACK, height: Dimensions.get("window").height }]}>
                    <Text style={styles.text}>{imgText}</Text>
                </View>
            )}
        </Fragment>
    );
};

export default ShowFullImg

const styles = StyleSheet.create({
    text: { color: color.WHITE, fontSize: 200, fontWeight: "bold" },
});