import * as React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard, Settings } from '../container';
import { color } from '../utility'

const Tab = createBottomTabNavigator();

const TabContainer = () => {
    return (
        <Tab.Navigator initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    if (route.name === 'Chats') {
                        return (
                            <Icon
                                type="font-awesome"
                                name="comment"
                                size={30}
                                color={color}
                            />
                        )
                    }
                    else if (route.name === 'Settings') {
                        return (
                            <Icon
                                type="font-a wesome"
                                name="settings"
                                size={30}
                                color={color}
                            />
                        )
                    }
                    else if (route.name === 'Calls') {
                        return (
                            <Icon
                                type="font-awesome"
                                name="phone"
                                size={30}
                                color={color}
                            />
                        )
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: '#1d3896',
                inactiveTintColor: 'black',
                activeBackgroundColor: '#797d7b',
                inactiveBackgroundColor: '#8c968f',
            }}>
            <Tab.Screen name="Chats" component={Dashboard} options={{}} />
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="Calls" component={Settings} />
        </Tab.Navigator>
    );
}

export default TabContainer