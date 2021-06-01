import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, Alert, Text, View, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Profile, ShowUsers, SearchBar } from "../../components";
import firebase from "../../firebase/config";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/types";
import { uuid, smallDeviceHeight } from "../../utility/constants";
import { clearAsyncStorage } from "../../asyncStorage";
import { LogOutUser } from "../../Network";
import { Icon } from "react-native-elements";

const Dashboard = ({ route, navigation }) => {

    // const { params } = route;
    const { lastMsg } = route;

    const globalState = useContext(Store)
    const { dispatchLoaderAction } = globalState

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        profileImg: ''
    })

    const { profileImg, name } = userDetail;
    const [allUsers, setAllUsers] = useState([]);

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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Icon type="font-awesome"
                    onPress={() =>
                        Alert.alert(
                            "Logout", "Are you sure to log out",
                            [{ text: "Yes", onPress: () => logout() }, { text: "No" }],
                            { cancelable: false }
                        )
                    }
                    name="sign-out" size={26} color='white' style={{ right: 10 }}
                />
            )
        });
    }, [navigation]);

    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => { navigation.replace("Login") })
            })
            .catch((err) => alert(err))
    }

    const imgTap = (profileImg, name) => {
        if (!profileImg) {
            // Alert.alert("Oops!", "Looks like " + name + " has no Profile photo")
            navigation.navigate("ShowFullImg", { name, imgText: name.charAt(0) });
        } else {
            navigation.navigate("ShowFullImg", { name, img: profileImg });
        }
    };

    const imgTap1 = (profileImg, name) => {
        if (!profileImg) {
            // Alert.alert("Oops!", "Looks like " + name + " has no Profile photo")
            navigation.navigate("ShowFullImg1", { name, imgText: name.charAt(0) });
        } else {
            navigation.navigate("ShowFullImg1", { name, img: profileImg });
        }
    };

    const nameTap = (profileImg, name, guestUserId) => {
        if (!profileImg) {
            navigation.navigate("Chat", {
                name,
                guestUserId,
                currentUserId: uuid,
            });
        } else {
            navigation.navigate("Chat", {
                name,
                img: profileImg,
                guestUserId,
                currentUserId: uuid,
            });
        }
    };

    function getFields(input, field) {
        var output = [];
        for (var i = 0; i < input.length; ++i)
            output.push(input[i][field]);
        return output;
    }

    const [searching, setsearching] = useState(false);
    const [search, setsearch] = useState('');
    const [filteredVideos, setfilteredVideos] = useState(allUsers);
    const [videos, setvideos] = useState(allUsers); // allusers, setallUsers

    const onClear = () => {
        setsearching(false);
        setsearch('');
        setfilteredVideos(videos);
    };

    const onSearch = (value) => {
        if (value === '') {
            setsearch()
            setsearching(false)
            setfilteredVideos(allUsers)
        }

        setsearching(true);
        setsearch(value);
        setTimeout(() => {
            const searchedUsers = allUsers.filter(
                (video) => video.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            );
            setsearching(false);
            setfilteredVideos(searchedUsers);
        }, 400);
    };

    // const nameForSearch = getFields(allUsers, "name"); // returns [ 1, 3, 5 ]
    // console.log(nameForSearch)
    // console.log(allUsers)

    return (
        <SafeAreaView style={{ backgroundColor: 'rgb(0,0,0)', flex: 1 }}>

            <SearchBar
                onChangeText={(val) => onSearch(val)}
                value={search}
                editing={search !== ''}
                loading={searching}
                onClear={onClear}
            />

            {/*All Users*/}
            <View style={{ marginHorizontal: 10 }}>
                <FlatList
                    alwaysBounceVertical={true}
                    data={filteredVideos}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        <Profile
                            name={name}
                            img={profileImg}
                            onImgTap={() => imgTap(profileImg, name)}
                        />}
                    ListEmptyComponent={
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50, }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>Sorry, No users Found</Text>
                        </View>
                    }

                    renderItem={({ item }) => (
                        <ShowUsers
                            name={item.name}
                            onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
                            onImgTap={() => imgTap1(item.profileImg, item.name)}
                            img={item.profileImg}
                        />
                    )}
                />

            </View>

        </SafeAreaView>
    )
}


export default Dashboard