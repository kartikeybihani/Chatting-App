import React from 'react';
import { View, FlatList, Text } from 'react-native';

const VideoList = (props) => {
    return (
        <FlatList
            extraData={props}
            ItemSeparatorComponent={() => (
                <View style={{ height: 5, backgroundColor: 'blue' }} />
            )}
            keyExtractor={(_, index) => index.toString()}
            data={props.data}
            renderItem={(data) => {
                return (
                    <View style={{ backgroundColor: 'grey', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}>
                            {data.item.name}
                        </Text>
                    </View>
                );
            }}
        />
    );
};

export default VideoList;
