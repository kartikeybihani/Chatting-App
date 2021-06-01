import React, { useContext } from 'react'
import { Dimensions } from 'react-native'
import { Text, View, StyleSheet, Keyboard, Alert } from 'react-native'
import { InputField, RoundCornerButton } from '../../components'
import { globalStyle, color } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/types";
import { forgotPassword } from '../../Network'

const ForgotPassword = ({ navigation }) => {

    const globalState = useContext(Store)
    const { dispatchLoaderAction } = globalState

    const [credentials, setCredentials] = React.useState({ email: '' })

    const { email } = credentials

    const handleOnChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const onForgotPassword = () => {
        Keyboard.dismiss();
        if (!email) { alert("Email is required") }
        else {
            dispatchLoaderAction({ type: LOADING_START });
            forgotPassword(email)
                .then((res) => {
                    dispatchLoaderAction({ type: LOADING_STOP });
                    Alert.alert("Forgot Password", "Reset Password email has been sent to you")
                    navigation.navigate("Login");
                })
                .catch((err) => {
                    dispatchLoaderAction({ type: LOADING_STOP });
                    alert(err);
                });
        }
    };

    return (
        <View style={{ backgroundColor: color.BLACK, height: Dimensions.get("window").height, alignItems: 'center', paddingTop: 40 }}>
            <InputField
                placeholder="Email"
                value={email}
                onChangeText={(text) => handleOnChange('email', text)}
            />

            <RoundCornerButton title="Reset Password" onPress={() => onForgotPassword()} />
        </View>
    )
}


export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})