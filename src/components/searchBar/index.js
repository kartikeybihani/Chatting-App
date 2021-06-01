import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
    return (
        <View style={styles.searchBarContainer}>
            <Icon
                style={{ marginLeft: '3%' }}
                name={'ios-search'}
                color={'black'}
                size={25}
            />
            <TextInput
                style={styles.searchBar}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={
                    props.placeholder ? props.placeholder : 'Start Searching...'
                }
            />
            {props.editing ? (
                <TouchableOpacity onPress={props.onClear} style={{ marginRight: '7%' }}>
                    <Text style={{ color: 'black' }}>Clear</Text>
                </TouchableOpacity>
            ) : null}
            {props.loading ? (
                <ActivityIndicator
                    style={{ marginRight: '1%' }}
                    size={'small'}
                    animating={true}
                    color={'black'}
                />
            ) : null}
        </View>
    );
};

SearchBar.propType = {
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    searchBar: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 25,
        fontWeight: '300',
        backgroundColor: 'grey',
    },
    searchBarContainer: {
        borderColor: '#909194',
        backgroundColor: 'grey',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 50,
        alignSelf: 'center',
        marginTop: 5,
        borderRadius: 60,
        marginBottom: 10
    },
});
export default SearchBar;
