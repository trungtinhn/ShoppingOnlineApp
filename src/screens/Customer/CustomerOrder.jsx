import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackTo from '../../components/Admin/BackTo'
//import { SearchIcon } from '../../CustomerView/assets/icons'
import { FlatList, ScrollView, } from 'react-native-gesture-handler'
import Status from '../../components/Admin/Status'
import CUSTOM_COLOR from '../../constants/color'
//import { Acount } from './OverView'
import PerSon from '../../components/Admin/PerSon'
//import { IM_MauAo } from '../assets/images'
import OneOrder from '../../components/Admin/OneOrder'
import { BackIcon } from '../../../assets/Customer/svgs'
import FONT_FAMILY from '../../constants/font'
import Button from '../../components/Customer/Button'

const url = 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-a20a4.appspot.com/o/images%2Fproducts%2Fproduct_2.jpg?alt=media&token=3d347bb8-2e49-49c5-b8c7-5ea6f7168f89'
export default function CustomerOrder({navigation, route}) {
    const [confirm, setConfirm] = useState(true)
    const [onWait, setOnWait] = useState(false)
    const [delivering, setDelivering] = useState(false)
    const [delivered, setDelivered] = useState(false)
    const [cancel, setCancel] = useState(false)

    //const [donHangConfirm, setDonHangConfirm] = useState([])
    const [donHangOnWait, setDonHangOnWait] = useState([])
    const [donHangDelivering, setDonHangDelivering] = useState([])
    const [donHangDelivered, setDonHangDelivered] = useState([])
    const [donHangCancel, setDonHangCancel] = useState([])
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
            MaDH: 'DH002'
        }
    ];
    
    const CancelDonHang = async (item) => {
    //     const confirmRef = doc(Firestore, "DONHANG", item.MaDH)

    //     await updateDoc(confirmRef, {
    //         TrangThai: "Cancel"
    //     })
    // }
    // const ConfirmDonHang = async (item) => {
    //     const confirmRef = doc(Firestore, "DONHANG", item.MaDH)

    //     await updateDoc(confirmRef, {
    //         TrangThai: "Confirm"
    //     })
    }

    const getUsers = async (item) => {
        // item = item.trim();

        // const docRef = doc(Firestore, "NGUOIDUNG", item);
        // const docSnap = await getDoc(docRef);

        // const user = {
        //     ...docSnap.data()
        // }

        // return user;
    }


    const getDatHang = async (item) => {
        // const q = query(collection(Firestore, "DATHANG"), where("MaDH", "==", item));

        // const querySnapshot = await getDocs(q);

        // const data = []
        // querySnapshot.forEach((doc) => {

        //     data.push(doc.data())
        //     //console.log(doc.id, " => ", doc.data());
        // });
        // return data
    }

    const getSanPham = async (item) => {
        // const docRef = doc(Firestore, "SANPHAM", item);

        // const docSnap = await getDoc(docRef);

        // const sanPham = {
        //     ...docSnap.data()
        // }

        // return sanPham;
    }

    const getDonHangCancel = () => {
        // const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Cancel")
        // ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        // const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        //     const promises = [];
        //     const promisesDatHang = [];
    
        //     querySnapshot.forEach((documentSnapshot) => {
        //         const promise = getUsers(documentSnapshot.data().MaND);
        //         const datHang = getDatHang(documentSnapshot.data().MaDH);
    
        //         promises.push(promise);
        //         promisesDatHang.push(datHang);
        //     });
    
        //     try {
        //         const dataUser = await Promise.all(promises);
        //         const dataDatHang = await Promise.all(promisesDatHang);
        //         const dataSanPham = [];
    
        //         for (const documentDatHang of dataDatHang) {
        //             const promises = [];
        //             for (const documentSanPham of documentDatHang) {
        //                 const promise = getSanPham(documentSanPham.MaSP);
        //                 promises.push(promise);
        //             }
        //             const promiseSanPham = await Promise.all(promises);
        //             dataSanPham.push(promiseSanPham);
        //         }
    
        //         dataDatHang.forEach((datHang, i) => {
        //             datHang.forEach((sanPham, index) => {
        //                 dataDatHang[i][index] = {
        //                     ...dataDatHang[i][index],
        //                     SanPham: dataSanPham[i][index]
        //                 };
        //             });
        //         });
    
        //         const data = dataUser.map((user, index) => {
        //             const documentSnapshot = querySnapshot.docs[index];
        //             return {
        //                 ...documentSnapshot.data(),
        //                 ...user,
        //                 DatHang: dataDatHang[index]
        //             };
        //         });
    
        //         setDonHangCancel(data);
        //     } catch (error) {
        //         console.log("Error getting data: ", error);
        //     }
        // });
    
        // return unsubscribe;
        // // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // // unsubscribe();
    };
    
          

      const getDonHangConfirm = () => {
        // const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Confirm")
        // ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        // const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        //     const promises = [];
        //     const promisesDatHang = [];
    
        //     querySnapshot.forEach((documentSnapshot) => {
        //         const promise = getUsers(documentSnapshot.data().MaND);
        //         const datHang = getDatHang(documentSnapshot.data().MaDH);
    
        //         promises.push(promise);
        //         promisesDatHang.push(datHang);
        //     });
    
        //     try {
        //         const dataUser = await Promise.all(promises);
        //         const dataDatHang = await Promise.all(promisesDatHang);
        //         const dataSanPham = [];
    
        //         for (const documentDatHang of dataDatHang) {
        //             const promises = [];
        //             for (const documentSanPham of documentDatHang) {
        //                 const promise = getSanPham(documentSanPham.MaSP);
        //                 promises.push(promise);
        //             }
        //             const promiseSanPham = await Promise.all(promises);
        //             dataSanPham.push(promiseSanPham);
        //         }
    
        //         dataDatHang.forEach((datHang, i) => {
        //             datHang.forEach((sanPham, index) => {
        //                 dataDatHang[i][index] = {
        //                     ...dataDatHang[i][index],
        //                     SanPham: dataSanPham[i][index]
        //                 };
        //             });
        //         });
    
        //         const data = dataUser.map((user, index) => {
        //             const documentSnapshot = querySnapshot.docs[index];
        //             return {
        //                 ...documentSnapshot.data(),
        //                 ...user,
        //                 DatHang: dataDatHang[index]
        //             };
        //         });
    
        //         setDonHangConfirm(data);
        //     } catch (error) {
        //         console.log("Error getting data: ", error);
        //     }
        // });
    
        // return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
    
      
      
    

    const getDonHangOnWait = () => {
        // const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "OnWait")
        // ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        // const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        //     const promises = [];
        //     const promisesDatHang = [];
    
        //     querySnapshot.forEach((documentSnapshot) => {
        //         const promise = getUsers(documentSnapshot.data().MaND);
        //         const datHang = getDatHang(documentSnapshot.data().MaDH);
    
        //         promises.push(promise);
        //         promisesDatHang.push(datHang);
        //     });
    
        //     try {
        //         const dataUser = await Promise.all(promises);
        //         const dataDatHang = await Promise.all(promisesDatHang);
        //         const dataSanPham = [];
    
        //         for (const documentDatHang of dataDatHang) {
        //             const promises = [];
        //             for (const documentSanPham of documentDatHang) {
        //                 const promise = getSanPham(documentSanPham.MaSP);
        //                 promises.push(promise);
        //             }
        //             const promiseSanPham = await Promise.all(promises);
        //             dataSanPham.push(promiseSanPham);
        //         }
    
        //         dataDatHang.forEach((datHang, i) => {
        //             datHang.forEach((sanPham, index) => {
        //                 dataDatHang[i][index] = {
        //                     ...dataDatHang[i][index],
        //                     SanPham: dataSanPham[i][index]
        //                 };
        //             });
        //         });
    
        //         const data = dataUser.map((user, index) => {
        //             const documentSnapshot = querySnapshot.docs[index];
        //             return {
        //                 ...documentSnapshot.data(),
        //                 ...user,
        //                 DatHang: dataDatHang[index]
        //             };
        //         });
    
        //         setDonHangOnWait(data);
        //     } catch (error) {
        //         console.log("Error getting data: ", error);
        //     }
        // });
    
        // return unsubscribe;
        // // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // // unsubscribe();
    };
      
    

    const getDonHangDelivered = () => {
        // const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Delivered")
        // ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        // const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        //     const promises = [];
        //     const promisesDatHang = [];
    
        //     querySnapshot.forEach((documentSnapshot) => {
        //         const promise = getUsers(documentSnapshot.data().MaND);
        //         const datHang = getDatHang(documentSnapshot.data().MaDH);
    
        //         promises.push(promise);
        //         promisesDatHang.push(datHang);
        //     });
        //     try {
        //         const dataUser = await Promise.all(promises);
        //         const dataDatHang = await Promise.all(promisesDatHang);
        //         const dataSanPham = [];
    
        //         for (const documentDatHang of dataDatHang) {
        //             const promises = [];
        //             for (const documentSanPham of documentDatHang) {
        //                 const promise = getSanPham(documentSanPham.MaSP);
        //                 promises.push(promise);
        //             }
        //             const promiseSanPham = await Promise.all(promises);
        //             dataSanPham.push(promiseSanPham);
        //         }
    
        //         dataDatHang.forEach((datHang, i) => {
        //             datHang.forEach((sanPham, index) => {
        //                 dataDatHang[i][index] = {
        //                     ...dataDatHang[i][index],
        //                     SanPham: dataSanPham[i][index]
        //                 };
        //             });
        //         });
    
        //         const data = dataUser.map((user, index) => {
        //             const documentSnapshot = querySnapshot.docs[index];
        //             return {
        //                 ...documentSnapshot.data(),
        //                 ...user,
        //                 DatHang: dataDatHang[index]
        //             };
        //         });
    
        //         setDonHangDelivered(data);
        //     } catch (error) {
        //         console.log("Error getting data: ", error);
        //     }
        // });
    
        // return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
    
    const getDonHangDelivering = () => {
        // const q = query(collection(Firestore, "DONHANG"), where("TrangThai", "==", "Delivering")
        // ,where('MaND', '==', firebase.auth().currentUser.uid));
    
        // const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        //     const promises = [];
        //     const promisesDatHang = [];
    
        //     querySnapshot.forEach((documentSnapshot) => {
        //         const promise = getUsers(documentSnapshot.data().MaND);
        //         const datHang = getDatHang(documentSnapshot.data().MaDH);
    
        //         promises.push(promise);
        //         promisesDatHang.push(datHang);
        //     });
    
        //     try {
        //         const dataUser = await Promise.all(promises);
        //         const dataDatHang = await Promise.all(promisesDatHang);
        //         const dataSanPham = [];
    
        //         for (const documentDatHang of dataDatHang) {
        //             const promises = [];
        //             for (const documentSanPham of documentDatHang) {
        //                 const promise = getSanPham(documentSanPham.MaSP);
        //                 promises.push(promise);
        //             }
        //             const promiseSanPham = await Promise.all(promises);
        //             dataSanPham.push(promiseSanPham);
        //         }
    
        //         dataDatHang.forEach((datHang, i) => {
        //             datHang.forEach((sanPham, index) => {
        //                 dataDatHang[i][index] = {
        //                     ...dataDatHang[i][index],
        //                     SanPham: dataSanPham[i][index]
        //                 };
        //             });
        //         });
    
        //         const data = dataUser.map((user, index) => {
        //             const documentSnapshot = querySnapshot.docs[index];
        //             return {
        //                 ...documentSnapshot.data(),
        //                 ...user,
        //                 DatHang: dataDatHang[index]
        //             };
        //         });
    
        //         setDonHangDelivering(data);
        //     } catch (error) {
        //         console.log("Error getting data: ", error);
        //     }
        // });
    
        // return unsubscribe;
        // Để ngừng lắng nghe thay đổi trong thời gian thực, gọi hàm unsubscribe:
        // unsubscribe();
    };
    
      




    useEffect(() => {
        getDonHangConfirm()
        getDonHangOnWait()
        getDonHangDelivering()
        getDonHangDelivered()
        getDonHangCancel()
    }, [donHangConfirm.length, donHangOnWait.length, donHangDelivering.length, donHangDelivered.length, donHangCancel.length])


    if (confirm == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                 <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <TouchableOpacity 
                        style={{padding: 12}}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <BackIcon></BackIcon>
                    </TouchableOpacity>

                    <Text style={{ height: 40, padding: 7, fontSize: 20, color: CUSTOM_COLOR.Black, fontFamily: FONT_FAMILY.Bold, fontWeight: 'bold',  }}>Product</Text>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.DarkOrange}
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setConfirm(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setConfirm(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setConfirm(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setConfirm(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View style={{
                    height: '85%'
                }}>

                    <FlatList
                        data={donHangConfirm}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View style={styles.background}>
                                    <View style={{margin: 10}}>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}

                                        renderItem={({ item }) => {

                                            console.log(item)
                                            return (
                                                <View>

                                                    <OneOrder
                                                        source={item.SanPham.HinhAnhSP[0]}
                                                        title={item.SanPham.TenSP}
                                                        price={item.SanPham.GiaSP}
                                                        number={item.SoLuong}
                                                        totalPrice={item.ThanhTien}
                                                        color={item.MauSac}
                                                        size={item.Size}
                                                        Code={item.MaDH}
                                                        onPress={() => {  }}
                                                        PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>
                                    <View style={{width: '40%', alignSelf: 'flex-end'}}>
                                    <Button
                                        title='Detail'
                                        color={CUSTOM_COLOR.FlushOrange}
                                        onPress={() => {
                                            navigation.navigate('DeliveryDetail')
                                        }}
                                        />
                                    </View>
                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginLeft: 35 ,fontWeight: 'bold'}}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <Button title='Cancel' color={CUSTOM_COLOR.DarkOrange} onPress={() => { }} />
                                    </View>
                                    </View>
                                </View>
                            )
                        }}
                    />


                </View>
            </SafeAreaView>
        )
    }
    if (onWait == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setOnWait(false) }}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='On Wait'
                        countProduct={donHangOnWait.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setOnWait(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setOnWait(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setOnWait(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View>

                    <FlatList
                        data={donHangOnWait}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View style = {{marginBottom: 10, backgroundColor: CUSTOM_COLOR.Red}}>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}
                                        renderItem={({ item }) => {

                                            console.log(item)
                                            return (
                                                <View>

                                                    <OneOrder
                                                         source={item.SanPham.HinhAnhSP[0]}
                                                         title={item.SanPham.TenSP}
                                                         price={item.SanPham.GiaSP}
                                                         number={item.SoLuong}
                                                         totalPrice={item.ThanhTien}
                                                         color={item.MauSac}
                                                         size={item.Size}
                                                         Code={item.MaDH}
                                                         onPress={() => {  }}
                                                         PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>
                                    <Button
                                        title='Detail'
                                        color={CUSTOM_COLOR.FlushOrange}
                                        onPress={() => {}}
                                        />

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginLeft: 35,fontWeight: 'bold' }}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />


                </View>

            </SafeAreaView>
        )
    }
    if (delivering == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setDelivering(false) }}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setDelivering(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}
                    >
                    </Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='Delivering'
                        countProduct={donHangDelivering.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setDelivering(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setDelivering(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View style={{
                    height: '85%'
                }}>

                    <FlatList
                        data={donHangDelivering}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}

                                        renderItem={({ item }) => {

                                            console.log(item)
                                            return (
                                                <View>

                                                    <OneOrder
                                                        source={item.SanPham.HinhAnhSP[0]}
                                                        title={item.SanPham.TenSP}
                                                        price={item.SanPham.GiaSP}
                                                        number={item.SoLuong}
                                                        totalPrice={item.ThanhTien}
                                                        color={item.MauSac}
                                                        size={item.Size}
                                                        Code={item.MaDH}
                                                        onPress={() => {  }}
                                                        PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>

                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginLeft: 35 ,fontWeight: 'bold'}}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>

                                </View>
                            )
                        }}
                    />


                </View>
            </SafeAreaView>
        )
    }
    if (delivered == true) {
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        title='Confirm'
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setDelivered(false) }}
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setDelivered(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setDelivered(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}
                    >
                    </Status>
                    <Status
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        Color={CUSTOM_COLOR.DarkOrange}
                        title='Delivered'
                        countProduct={donHangDelivered.length}
                    >
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setCancel(true), setDelivered(false) }}
                        title='Cancel'
                        countProduct={donHangCancel.length}>
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View>

                    <FlatList
                        data={donHangDelivered}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}
                                        renderItem={({ item }) => {
                                            console.log(item)
                                            return (
                                                <View>

                                                    <OneOrder
                                                         source={item.SanPham.HinhAnhSP[0]}
                                                         title={item.SanPham.TenSP}
                                                         price={item.SanPham.GiaSP}
                                                         number={item.SoLuong}
                                                         totalPrice={item.ThanhTien}
                                                         color={item.MauSac}
                                                         size={item.Size}
                                                         Code={item.MaDH}
                                                         onPress={() => {  }}
                                                         PressConfirm={() => { }}
                                                    ></OneOrder>

                                                </View>
                                            )
                                        }}
                                        keyExtractor={() => item.MaSP}
                                    ></FlatList>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black,fontWeight: 'bold', marginLeft: 35 }}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>

                                </View>
                            )
                        }}
                    />


                </View>
            </SafeAreaView>
        )
    }
    if(cancel == true){
        return (
            <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White }}>
                <View style={{ width: '100%', height: 30, flexDirection: 'row', marginTop: 5 }}>
                    <BackTo
                        onPress={() => navigation.goBack()}
                        Info='My Order'
                    ></BackTo>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setConfirm(true), setCancel(false) }}
                        title='Confirm'
                        countProduct={donHangConfirm.length}
                    ></Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setOnWait(true), setCancel(false) }}
                        title='On Wait'
                        countProduct={donHangOnWait.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivering(true), setCancel(false) }}
                        title='Delivering'
                        countProduct={donHangDelivering.length}>
                    </Status>
                    <Status
                        Color={CUSTOM_COLOR.Black}
                        onPress={() => { setDelivered(true), setCancel(false) }}
                        title='Delivered'
                        countProduct={donHangDelivered.length}>
                    </Status>
                    <Status
                        title='Cancel'
                        Color={CUSTOM_COLOR.DarkOrange}
                        botwidth={2}
                        borderColor={CUSTOM_COLOR.Red}
                        countProduct={donHangCancel.length}
                    >
                    </Status>
                </View>
                <View style={{ width: '100%', height: 10, backgroundColor: CUSTOM_COLOR.LightGray }}></View>
                <View style={{
                    height: '85%'
                }}>

                    <FlatList
                        data={donHangCancel}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item }) => {
                            //console.log(item)
                            return (
                                <View>
                                    <PerSon
                                        avartar={item.Avatar}
                                        name={item.TenND}
                                    />
                                    <FlatList
                                        data={item.DatHang}

                                        renderItem={({ item }) => {

                                            console.log(item)
                                            return (
                                                <View>

                                                    <OneOrder
                                                         source={item.SanPham.HinhAnhSP[0]}
                                                         title={item.SanPham.TenSP}
                                                         price={item.SanPham.GiaSP}
                                                         number={item.SoLuong}
                                                         totalPrice={item.ThanhTien}
                                                         color={item.MauSac}
                                                         size={item.Size}
                                                         Code={item.MaDH}
                                                         onPress={() => {  }}
                                                         PressConfirm={() => { }}
                                                    ></OneOrder>
                                                </View>

                                            )
                                        }}
                                    ></FlatList>

                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('DetailsDelivery', { item })}}
                                        style={{
                                            backgroundColor: CUSTOM_COLOR.DarkOrange, width: 100, marginLeft: 160,
                                            marginTop: 10, height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10
                                        }}
                                    >
                                        <Text style={{ color: CUSTOM_COLOR.White }}>Details</Text>
                                    </TouchableOpacity>

                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{color: CUSTOM_COLOR.Black,fontWeight: 'bold', marginLeft: 35 }}>Item Code</Text>
                                        <Text style={{color: CUSTOM_COLOR.Black, marginRight: 35 }}>#{item.MaDH}</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 30, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                ConfirmDonHang(item)
                                            }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: CUSTOM_COLOR.DarkOrange,
                                                paddingHorizontal: 20,
                                                alignSelf: 'center',

                                            }}
                                        >
                                            <Text style={{ color: CUSTOM_COLOR.White }}>ReOrder</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        }}
                    />


                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: CUSTOM_COLOR.White,
        borderColor: CUSTOM_COLOR.Alto,
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: CUSTOM_COLOR.Black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 5,
        margin: 10, 

    }
})