import React, { useState, useContext } from "react";
import {
    Text,
    SafeAreaView,
    View,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import firebase from "../../firebase/config";
import { InputField, RoundCornerButton, Logo } from "../../components";
import { globalStyle, color } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_STOP, LOADING_START } from "../../context/actions/types";
import { setAsyncStorage, keys } from "../../asyncStorage";
import {
    setUniqueValue,
    keyboardVerticalOffset,
} from "../../utility/constants";
import { SignUpRequest, AddUser } from "../../Network";

const Signup = ({ navigation }) => {

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [showLogo, toggleLogo] = useState(true)

    const [credentials, setcredentials] = useState({
        name: '', email: '', phone: '', password: '', confirmPassword: '',
    })

    const { name, email, phone, password, confirmPassword } = credentials

    const onSignupPress = () => {
        Keyboard.dismiss();
        if (!name) { alert("Name is required") }
        if (!email) { alert("Email is required") }
        else if (!password) { alert("Password is required"); }
        else if (password !== confirmPassword) { Alert.alert("Password", "Password did not match"); }
        else {
            dispatchLoaderAction({ type: LOADING_START });
            SignUpRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) {
                        dispatchLoaderAction({ type: LOADING_STOP, });
                        alert(res);
                        return;
                    }
                    let uid = firebase.auth().currentUser.uid;
                    let profileImg = "";
                    AddUser(name, email, uid, profileImg)
                        .then(() => {
                            setAsyncStorage(keys.uuid, uid);
                            setUniqueValue(uid);
                            dispatchLoaderAction({ type: LOADING_STOP, });
                            navigation.replace("Dashboard");
                        })
                        .catch((err) => {
                            dispatchLoaderAction({ type: LOADING_STOP, });
                            alert(err);
                        });
                })
                .catch((err) => {
                    dispatchLoaderAction({ type: LOADING_STOP });
                    alert(err);
                });
        }
    }


    const handleOnChange = (name, value) => {
        setcredentials({
            ...credentials,
            [name]: value
        })
    }

    // * ON INPUT FOCUS
    const handleFocus = () => {
        setTimeout(() => {
            toggleLogo(false);
        }, 200);
    };

    // * ON INPUT BLUR
    const handleBlur = () => {
        setTimeout(() => {
            toggleLogo(true);
        }, 200);
    };

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
                    {showLogo && (<View style={[globalStyle.containerCentered]}>
                        <Logo />
                    </View>)}
                    <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                        <InputField
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => handleOnChange("name", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Email"
                            value={email}
                            keyboardType="email-address"
                            onChangeText={(text) => handleOnChange("email", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Phone Number"
                            keyboardType="number-pad"
                            value={phone}
                            onChangeText={(text) => handleOnChange("phone", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Password"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => handleOnChange("password", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />
                        <InputField
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            secureTextEntry={true}
                            onChangeText={(text) => handleOnChange("confirmPassword", text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <RoundCornerButton title="Signup" onPress={() => onSignupPress()} />

                        <Text style={{ color: 'white', marginTop: 20 }}>Already have an account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.LIGHT_GREEN }}>
                                Login
                        </Text>
                        </TouchableOpacity>

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Signup