import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import BackTo from '../../components/Admin/BackTo';
import Status from '../../components/Admin/Status';
import CUSTOM_COLOR from '../../constants/color';
import PerSon from '../../components/Admin/PerSon';
import OneOrder from '../../components/Admin/OneOrder';
import { BackIcon } from '../../../assets/Customer/svgs';
import FONT_FAMILY from '../../constants/font';
import Button from '../../components/Customer/Button';
import { Icon } from 'react-native-elements';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import { formatCurrency } from '../../utils/helpers';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const url = 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-a20a4.appspot.com/o/images%2Fproducts%2Fproduct_2.jpg?alt=media&token=3d347bb8-2e49-49c5-b8c7-5ea6f7168f89';

const CustomerOrder = ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'confirm', title: 'Confirm' },
        { key: 'onWait', title: 'On Wait' },
        { key: 'delivering', title: 'Delivering' },
        { key: 'delivered', title: 'Delivered' },
        { key: 'cancel', title: 'Cancel' },
    ]);

    const donHangConfirm = [
        {
            Avatar: url,
            TenND: 'John Doe',
            DatHang: [
                {
                    SanPham: {
                        HinhAnhSP: [url],
                        TenSP: 'Product 1',
                        GiaSP: 100,
                    },
                    SoLuong: 2,
                    ThanhTien: 200,
                    MauSac: 'Red',
                    Size: 'M',
                    MaDH: 'DH001'
                },
                {
                    SanPham: {
                        HinhAnhSP: [url],
                        TenSP: 'Product 2',
                        GiaSP: 150,
                    },
                    SoLuong: 1,
                    ThanhTien: 150,
                    MauSac: 'Blue',
                    Size: 'L',
                    MaDH: 'DH002'
                }
            ],
            TongTien: 1000000,
            MaDH: 'DH001'
        },
        {
            Avatar: url,
            TenND: 'Jane Smith',
            DatHang: [
                {
                    SanPham: {
                        HinhAnhSP: [url],
                        TenSP: 'Product 3',
                        GiaSP: 200,
                    },
                    SoLuong: 3,
                    ThanhTien: 600,
                    MauSac: 'Green',
                    Size: 'S',
                    MaDH: 'DH003'
                }
            ],
            TongTien: 3000000,
            MaDH: 'DH002'
        }
    ];

    const donHangOnWait = [];
    const donHangDelivering = [];
    const donHangDelivered = [];
    const donHangCancel = [];

    const renderOrderList = (data) => (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={styles.background}>
                    <View style={styles.separatorLine}/>
                    <PerSon avartar={item.Avatar} name={item.TenND} />
                    <Text style={styles.labelFocus}>Purchased Products</Text>
                    <FlatList
                        data={item.DatHang}
                        renderItem={({ item }) => (
                            <OneOrder
                                source={item.SanPham.HinhAnhSP[0]}
                                title={item.SanPham.TenSP}
                                price={item.SanPham.GiaSP}
                                number={item.SoLuong}
                                totalPrice={item.ThanhTien}
                                color={item.MauSac}
                                size={item.Size}
                                Code={item.MaDH}
                                onPress={() => {}}
                                PressConfirm={() => {}}
                            />
                        )}
                    />
                    <View style={styles.itemCodeContainer}>
                        <Text style={styles.itemCode}>$Total: </Text>
                        <Text style={styles.itemCodeText}>{formatCurrency(item.TongTien)} VND</Text>
                    </View>
                </View>
            )}
        />
    );

    const renderOrderConfirm = (data) => (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => {navigation.navigate('DeliveryDetail')}}>
                <View style={styles.background}>
                    <View style={styles.separatorLine}/>
                    <PerSon avartar={item.Avatar} name={item.TenND} />
                    <Text style={styles.labelFocus}>Purchased Products</Text>
                    <FlatList
                        data={item.DatHang}
                        renderItem={({ item }) => (
                            <OneOrder
                                source={item.SanPham.HinhAnhSP[0]}
                                title={item.SanPham.TenSP}
                                price={item.SanPham.GiaSP}
                                number={item.SoLuong}
                                totalPrice={item.ThanhTien}
                                color={item.MauSac}
                                size={item.Size}
                                Code={item.MaDH}
                                onPress={() => {}}
                                PressConfirm={() => {}}
                            />
                        )}
                    />
                    <View style={styles.itemCodeContainer}>
                        <Text style={styles.itemCode}>$Total: </Text>
                        <Text style={styles.itemCodeText}>{formatCurrency(item.TongTien)} VND</Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'flex-end', marginBottom: 10}}>
                        <Button title="Cancel" color={CUSTOM_COLOR.FlushOrange} onPress={() => {}}/>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            )}
        />
    ) 

    const renderOrderCancel = (data) => (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => {navigation.navigate('DeliveryDetail')}}>
                <View style={styles.background}>
                    <View style={styles.separatorLine}/>
                    <PerSon avartar={item.Avatar} name={item.TenND} />
                    <Text style={styles.labelFocus}>Purchased Products</Text>
                    <FlatList
                        data={item.DatHang}
                        renderItem={({ item }) => (
                            <OneOrder
                                source={item.SanPham.HinhAnhSP[0]}
                                title={item.SanPham.TenSP}
                                price={item.SanPham.GiaSP}
                                number={item.SoLuong}
                                totalPrice={item.ThanhTien}
                                color={item.MauSac}
                                size={item.Size}
                                Code={item.MaDH}
                                onPress={() => {}}
                                PressConfirm={() => {}}
                            />
                        )}
                    />
                    <View style={styles.itemCodeContainer}>
                        <Text style={styles.itemCode}>$Total: </Text>
                        <Text style={styles.itemCodeText}>{formatCurrency(item.TongTien)} VND</Text>
                    </View>
                    <View style={{width: '100%', alignItems: 'flex-end', marginBottom: 10}}>
                        <Button title="Re Order" color={CUSTOM_COLOR.FlushOrange} onPress={() => {}}/>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            )}
        />
    )

    const renderScene = SceneMap({
        confirm: () => renderOrderConfirm(donHangConfirm),
        onWait: () => renderOrderList(donHangOnWait),
        delivering: () => renderOrderList(donHangDelivering),
        delivered: () => renderOrderList(donHangDelivered),
        cancel: () => renderOrderCancel(donHangCancel),
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
            activeColor={CUSTOM_COLOR.DarkOrange}
            inactiveColor={CUSTOM_COLOR.Black}
            renderLabel={({ route, focused }) => (
                <Text style={{ color: focused ? CUSTOM_COLOR.DarkOrange : CUSTOM_COLOR.Black, fontWeight: 'bold' }}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <BackIcon fill={CUSTOM_COLOR.FlushOrange} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Product</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    separatorLine: {
        width: '100%',
        height: 10,
        backgroundColor: CUSTOM_COLOR.LightGray,
    },
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 12,
    },
    headerText: {
        fontSize: 20,
        color: CUSTOM_COLOR.Black,
        fontWeight: '700',
        fontFamily: FONT_FAMILY.CeraPro,
    },
    tabbar: {
        backgroundColor: CUSTOM_COLOR.White,
        width: '100%',
    },
    indicator: {
        backgroundColor: CUSTOM_COLOR.DarkOrange,
    },
    labelFocus: {
        color: CUSTOM_COLOR.FlushOrange,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginLeft: 20,
    },
    label: {
        color: CUSTOM_COLOR.Black,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    orderContainer: {
        marginBottom: 10,
        backgroundColor: CUSTOM_COLOR.White,
    },
    detailsButton: {
        backgroundColor: CUSTOM_COLOR.DarkOrange,
        width: 100,
        marginLeft: 160,
        marginTop: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'flex-center',
        marginBottom: 10,
    },
    detailsButtonText: {
        color: CUSTOM_COLOR.White,
    },
    itemCodeContainer: {
        width: '100%',
        height: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 35,
        marginVertical: 10,
    },
    itemCode: {
        fontSize: 16,
    },
    itemCodeText: {
        color: CUSTOM_COLOR.DarkOrange,
        fontWeight: 'bold',
        fontSize: 16,
    },
    background: {
        backgroundColor: CUSTOM_COLOR.White,
    }
});

export default CustomerOrder;
