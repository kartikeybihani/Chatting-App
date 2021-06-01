import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, FlatList, Image } from 'react-native'
import { clearAsyncStorage } from '../../asyncStorage'
import { LogOutUser } from '../../Network'
import { LOADING_STOP, LOADING_START } from "../../context/actions/types";
import { Icon } from 'react-native-elements'
import { Profile } from "../../components";
import { Store } from "../../context/store";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import firebase from '../../firebase/config'
import { globalStyle } from '../../utility';
import { color, appStyle } from '../../utility';
import { Divider } from 'react-native-elements';

const Settings = ({ navigation }) => {

    const globalState = useContext(Store)
    const { dispatchLoaderAction } = globalState

    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => { navigation.replace("Login") })
            })
            .catch((err) => alert(err))
    }

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        profileImg: ''
    })

    useEffect(() => {
        dispatchLoaderAction({ type: LOADING_START })
        try {
            firebase
                .database()
                .ref("users")
                .on("value", (dataSnapshot) => {
                    let users = [];
                    let currentUser = {
                        id: "",
                        name: "",
                        profileImg: "",
                    };
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name
                            currentUser.profileImg = child.val().profileImg
                        } else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                profileImg: child.val().profileImg
                            })
                        }
                    });
                    setUserDetail(currentUser);
                    setAllUsers(users);
                    dispatchLoaderAction({ type: LOADING_STOP });
                });
        }
        catch (err) {
            dispatchLoaderAction({ type: LOADING_STOP }); alert(err)
        }

    }, [])

    const { profileImg, name } = userDetail;
    const [allUsers, setAllUsers] = useState([]);

    const imgTap = () => {
        if (!profileImg) {
            // Alert.alert("Oops!", "Looks like " + name + " has no Profile photo")
            navigation.navigate("ShowFullImg", { name, img: profileImg, imgText: name.charAt(0) });
        } else {
            navigation.navigate("ShowFullImg", { name, img: profileImg });
        }
    };

    return (
        <View>
            <View style={{ alignSelf: 'flex-start', marginTop: 10, }}>
                <Text style={{ fontWeight: 'bold', fontSize: 28, paddingLeft: 20 }}>Settings</Text>
                {/* <View style={{ paddingRight: 30 }}> */}
                {/* </View> */}
                <Divider style={{ height: 3, marginVertical: 10, marginLeft: 20 }} />

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => imgTap()} activeOpacity={0.8} >
                        {profileImg ? (<Image source={{ uri: profileImg }} style={{ height: 90, width: 90, borderRadius: 60, }} resizeMode="cover" />) : (<View style={{ justifyContent: 'center', marginTop: 40 }}><Text style={{ fontSize: 50, color: 'white', fontWeight: "bold", alignSelf: 'center' }}>{name.charAt(0)}</Text></View>)}
                    </TouchableOpacity>
                    <Text style={{
                        color: 'black',
                        fontSize: 24,
                        fontWeight: '700',
                        padding: 10,
                    }}>{name}</Text>
                </View>


                <Icon type="font-awesome"
                    onPress={() =>
                        Alert.alert(
                            "Logout", "Are you sure to log out",
                            [{ text: "Yes", onPress: () => logout() }, { text: "No" }],
                            { cancelable: false }
                        )
                    }
                    name="sign-out" size={26} color='black' style={{ right: 10 }}
                />
            </View>
        </View>
    )
}


export default Settings

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})