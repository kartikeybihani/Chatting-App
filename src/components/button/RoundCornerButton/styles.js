import { StyleSheet } from 'react-native';
import { appStyle } from '../../../utility';

const styles = StyleSheet.create({
    btn: {
        backgroundColor: appStyle.fieldBgColor,
        width: '90%',
        height: appStyle.btnHeight,
        borderRadius: appStyle.btnBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: appStyle.btnMarginVertical,
    },
    text: { fontSize: 22, fontWeight: 'bold', color: 'white' },
});

export default styles