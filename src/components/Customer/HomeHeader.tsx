import React from 'react';
import {
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';
import { IC_Search } from '../../../assets/Admin/icons';

const HomeHeader = () => {

    return (
        <View style={styles.container}>
            <View style={styles.wallet}>
                <Image source={require('../../../assets/Customer/icons/wallet.png')}></Image>
                <Text style={styles.textView}> Your Wallet</Text>
            </View>
            <View style={styles.wallet}>
                <Image source={require('../../../assets/Customer/icons/point.png')}></Image>
                <Text style={styles.textView}> Point</Text>
            </View>
            <View style={styles.wallet}>
                <Image source={require('../../../assets/Customer/icons/voucher.png')}></Image>
                <Text style={styles.textView}> Discount </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: CUSTOM_COLOR.AliceBlue,
        gap: 5,

    },
    wallet: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: CUSTOM_COLOR.Alto,
    },
    textView: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#9AA5BB',
    },
    input: {
        marginLeft: 10,
        padding: 8,
        fontSize: 13,
        width: '75%',
        height: '100%',
        justifyContent: 'center',
    },
    button: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 2,
    },
});

export default HomeHeader;
