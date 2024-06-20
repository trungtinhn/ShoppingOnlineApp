import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, useWindowDimensions, ScrollView, RefreshControl } from 'react-native';
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
import { get } from 'mongoose';
import { firebase } from '../../../firebase/firebase';
import LoadingComponent from '../../components/LoadingComponent';
import { getOrdersByUserIdAndStatus, updateOrderStatus } from '../../api/OrderApi';
const CustomerOrder = ({ navigation }) => {
    const userId = firebase.auth().currentUser.uid;
    const layout = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const [handle, setHandle] = useState(false);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'confirm', title: 'Confirm' },
        { key: 'onWait', title: 'On Wait' },
        { key: 'delivering', title: 'Delivering' },
        { key: 'delivered', title: 'Delivered' },
        { key: 'cancel', title: 'Cancel' },
    ]);

    const [donHangConfirm, setDonHangConfirm] = useState([]);
    const [donHangOnWait, setDonHangOnWait] = useState([]);
    const [donHangDelivering, setDonHangDelivering] = useState([]);
    const [donHangDelivered, setDonHangDelivered] = useState([]);
    const [donHangCancel, setDonHangCancel] = useState([]);

    const fetchOrders = async () => {
        try {
            const [confirmRes, onWaitRes, deliveringRes, deliveredRes, cancelRes] = await Promise.all([
                getOrdersByUserIdAndStatus({ userId, status: 'Confirm' }),
                getOrdersByUserIdAndStatus({ userId, status: 'On Wait' }),
                getOrdersByUserIdAndStatus({ userId, status: 'Delivering' }),
                getOrdersByUserIdAndStatus({ userId, status: 'Delivered' }),
                getOrdersByUserIdAndStatus({ userId, status: 'Cancel' })
            ]);

            if (confirmRes.status === 200) setDonHangConfirm(confirmRes.data);
            if (onWaitRes.status === 200) setDonHangOnWait(onWaitRes.data);
            if (deliveringRes.status === 200) setDonHangDelivering(deliveringRes.data);
            if (deliveredRes.status === 200) setDonHangDelivered(deliveredRes.data);
            if (cancelRes.status === 200) setDonHangCancel(cancelRes.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const renderOrderList = (data) => (
        loading ?
        <LoadingComponent/> 
        :
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrders} />}>
        {data.map(item => (
            <View key={item._id} style={styles.background}>
                <TouchableOpacity onPress={() => navigation.navigate('DeliveryDetail', { item })}>
                    <View style={styles.separatorLine} />
                    <PerSon avartar={item.Avatar} name={item.TenND} />
                    <Text style={styles.labelFocus}>Purchased Products</Text>
                    {item.products.map(product => (
                        <OneOrder
                            key={product._id}
                            source={product.image[0]}
                            title={product.name}
                            price={product.price}
                            number={product.quantity}
                            totalPrice={product.price * product.quantity}
                            color={product.color}
                            size={product.size}
                            Code={product._id}
                            onPress={() => {}}
                            PressConfirm={() => {}}
                        />
                    ))}
                </TouchableOpacity>
                <View style={styles.itemCodeContainer}>
                    <Text style={styles.itemCode}>$Total: </Text>
                    <Text style={styles.itemCodeText}>{formatCurrency(item.totalPrice)} VND</Text>
                </View>
            </View>
        ))}
        </ScrollView>
    );

    const renderOrderConfirm = (data) => (
        loading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LoadingComponent/> 
        </View>
        :
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrders} />}>
        {data.map(item => (
            <View key={item._id} style={styles.background}>
                <TouchableOpacity onPress={() => navigation.navigate('DeliveryDetail', { item })}>
                    <View style={styles.separatorLine} />
                    <PerSon avartar={item.Avatar} name={item.TenND} />
                    <Text style={styles.labelFocus}>Purchased Products</Text>
                    {item.products.map(product => (
                        <OneOrder
                            key={product._id}
                            source={product.image[0]}
                            title={product.name}
                            price={product.price}
                            number={product.quantity}
                            totalPrice={product.price * product.quantity}
                            color={product.color}
                            size={product.size}
                            Code={product._id}
                            onPress={() => {}}
                            PressConfirm={() => {}}
                        />
                    ))}
                </TouchableOpacity>
                <View style={styles.itemCodeContainer}>
                    <Text style={styles.itemCode}>$Total: </Text>
                    <Text style={styles.itemCodeText}>{formatCurrency(item.totalPrice)} VND</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'flex-end', marginBottom: 10 }}>
                    <Button
                        title="Cancel"
                        color={CUSTOM_COLOR.FlushOrange}
                        onPress={async () => {
                            setHandle(true);
                            const res = await updateOrderStatus({ id: item._id, status: 'Cancel' });
                            if (res.status === 200) {
                                fetchOrders();
                                setHandle(false);
                            } else {
                                console.log(res);
                            }
                        }}
                    />
                </View>
            </View>
        ))}
        </ScrollView>
    ) 

    const renderOrderCancel = (data) => (
        loading ? <LoadingComponent/> :
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchOrders} />}>
        {data.map(item => (
            <View key={item._id} style={styles.background}>
                <TouchableOpacity onPress={() => navigation.navigate('DeliveryDetail', { item })}>
                    <View style={styles.separatorLine} />
                    <PerSon avartar={item.Avatar} name={item.TenND} />
                    <Text style={styles.labelFocus}>Purchased Products</Text>
                    {item.products.map(product => (
                        <OneOrder
                            key={product._id}
                            source={product.image[0]}
                            title={product.name}
                            price={product.price}
                            number={product.quantity}
                            totalPrice={product.price * product.quantity}
                            color={product.color}
                            size={product.size}
                            Code={product._id}
                            onPress={() => {}}
                            PressConfirm={() => {}}
                        />
                    ))}
                </TouchableOpacity>
                <View style={styles.itemCodeContainer}>
                    <Text style={styles.itemCode}>$Total: </Text>
                    <Text style={styles.itemCodeText}>{formatCurrency(item.totalPrice)} VND</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'flex-end', marginBottom: 10 }}>
                    <Button
                        title="Re Order"
                        color={CUSTOM_COLOR.FlushOrange}
                        onPress={async () => {
                            setHandle(true);
                            const res = await updateOrderStatus({ id: item._id, status: 'Confirm' });
                            if (res.status === 200) {
                                fetchOrders();
                                setHandle(false);
                            } else {
                                console.log(res);
                            }
                        }}
                    />
                </View>
               
            </View>
        ))}
        </ScrollView>
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
             {handle && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={CUSTOM_COLOR.FlushOrange} />
                </View>
                )}
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
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomerOrder;
