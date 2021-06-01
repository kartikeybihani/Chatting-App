import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Login, Signup, Dashboard, Splash, ShowFullImg, Chat, ForgotPassword, ShowFullImg1 } from '../container';
import TabContainer from './tabContainer'

const Stack = createStackNavigator()

function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: true, headerStyle: { backgroundColor: 'rgb(46, 46, 46)' }, headerTintColor: 'white', headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold', fontSize: 20 } }} >
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Dashboard" component={TabContainer} options={{ headerLeft: null, headerShown: false }} />
                <Stack.Screen name="ShowFullImg" component={ShowFullImg} options={{ headerBackTitle: null }} />
                <Stack.Screen name="ShowFullImg1" component={ShowFullImg1} options={{ headerBackTitle: null }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerBackTitle: null }} />
                <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{ headerBackTitle: null }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavContainer