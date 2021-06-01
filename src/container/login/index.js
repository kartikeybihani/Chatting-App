import React, { useContext, useState } from "react";
import {
    Text,
    SafeAreaView,
    View,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import { InputField, RoundCornerButton, Logo } from "../../components";
import { globalStyle, color } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/types";
import { setAsyncStorage, keys } from "../../asyncStorage";
import {
    setUniqueValue,
    keyboardVerticalOffset,
} from "../../utility/constants";
import { LoginRequest } from "../../Network";

const Login = ({ navigation }) => {
    const globalState = useContext(Store)
    const { dispatchLoaderAction } = globalState

    const [showLogo, toggleLogo] = useState(true)

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    })

    const { email, password } = credentials

    const handleOnChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const onLoginPress = () => {
        Keyboard.dismiss();
        if (!email) { alert("Email is required") }
        else if (!password) { alert("Password is required") }
        else {
            dispatchLoaderAction({ type: LOADING_START });
            LoginRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) {
                        dispatchLoaderAction({ type: LOADING_STOP });
                        alert(res);
                        return;
                    }
                    setAsyncStorage(keys.uuid, res.user.uid);
                    setUniqueValue(res.user.uid);
                    dispatchLoaderAction({ type: LOADING_STOP });
                    navigation.navigate("Dashboard");
                })
                .catch((err) => {
                    dispatchLoaderAction({ type: LOADING_STOP });
                    alert(err);
                });
        }
    };

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
                            placeholder="Email"
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                            value={email}
                            onChangeText={(text) => handleOnChange('email', text)}
                        />
                        <InputField
                            placeholder="Password"
                            value={password}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                            secureTextEntry={true}
                            onChangeText={(text1) => handleOnChange('password', text1)}
                        />

                        <RoundCornerButton title="Login" onPress={() => onLoginPress()} />

                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")}>
                                <Text style={{ color: 'white' }}>Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                            <Text style={{ color: 'white' }}>Don't have an account ?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                                <Text style={{ color: 'white', fontSize: 20, color: 'lightgreen' }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


export default Login
