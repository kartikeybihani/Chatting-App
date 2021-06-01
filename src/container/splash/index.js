import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { globalStyle, appStyle, color } from '../../utility';
import { getAsyncStorage, keys } from '../../asyncStorage';
import { setUniqueValue } from '../../utility/constants';
import { Logo } from '../../components';
import { uuid } from '../../utility/constants'

const Splash = ({ navigation }) => {
    useEffect(() => {
        const redirect = setTimeout(() => {
            getAsyncStorage(keys.uuid)
                .then((uuid) => {
                    if (uuid) {
                        setUniqueValue(uuid);
                        navigation.replace('Dashboard');
                    } else {
                        navigation.replace('Login');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    navigation.replace('Login');
                });
        }, 500);
        return () => clearTimeout(redirect);
    }, [navigation]);
    return (
        <View
            style={[globalStyle.containerCentered, { backgroundColor: color.BLACK, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('window').height }]}>
            <Logo />
        </View>
    );
};

export default Splash