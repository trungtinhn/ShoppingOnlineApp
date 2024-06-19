import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, Modal, Alert, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import CUSTOM_COLOR from "../../constants/color";
import StarRating from "../../components/Customer/StartRating";
import { IC_Back, IC_Cancle, IC_Down, IC_Heart, IC_Heart_Red, IC_ShoppingCart, IC_User } from "../../../assets/Customer/icons";
import ColorPicker from "../../components/Customer/ColorPicker";
import { Badge } from "react-native-elements";
import Swiper from "react-native-swiper";
import ProductView from "../../components/Customer/ProductView";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { BackIcon, HeartFillIcon, HeartIcon, ShoppingCartIcon } from "../../../assets/Customer/svgs";
import { getProductById } from "../../api/ProductApi";
import LoadingScreen from "../LoadingScreen";
import FONT_FAMILY from "../../constants/font";
import Button from "../../components/Customer/Button";
import {firebase} from '../../../firebase/firebase'
import { addProductToCart } from "../../api/CartApi";
import { OrderContext } from "../../context/OrderContext";
import { get } from "mongoose";
import { addLike, checkLike, deleteLike } from "../../api/LikeApi";
const url = 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.jpg';
function ProductDetail({ navigation, route }) {
    const { id } = route.params;
    const userId = firebase.auth().currentUser.uid;
    const [dataSanPham, setDataSanPham] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingCart, setLoadingCart] = useState(false);
    const [love, setLove] = useState(true);
    const [badgeCart, setBadgeCart] = useState(1);
    const [chooseColor, setChooseColor] = useState('');
    const [chooseSize, setChooseSize] = useState('');
    const [numProduct, setNumProduct] = useState(1);
    const [seeDetails, setSeeDetails] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const {product, setProduct} = useContext(OrderContext);
    const getDataLove = async () => {
        const res = await checkLike({data: {MaND: userId, _id: id}});
        if (res.status === 200) {
            const data = res.data.isFavorited;
            setLove(data);
        }else{
            console.log(res)
            setLove(false);
        }
    };
    const setDataLove = async () => {
        if(love){
            const res = await deleteLike({data: {MaND: userId, _id: id}});
            if (res.status === 200) {
                setLove(false);
            }else{
                console.log(res)
            }
        }else{
            const res = await addLike({data: {MaND: userId, _id: id}});
            if (res.status === 200) {
                setLove(true);
            }else{
                console.log(res)
            }
        }
    };
    const itemsRe = [
        {
          MaSP: 1,
          TenSP: 'San Pham 1',
          HinhAnhSP: url,
          GiaSP: '10000'
        },
        {
          MaSP: 2,
          TenSP: 'San Pham 2',
          HinhAnhSP: url,
          GiaSP: '10000'
        },
        {
          MaSP: 3,
          TenSP: 'San Pham 3',
          HinhAnhSP: url,
          GiaSP: '10000'
        },
        {
          MaSP: 4,
          TenSP: 'San Pham 4',
          HinhAnhSP: url,
          GiaSP: '10000'
        },
        {
          MaSP: 5,
          TenSP: 'San Pham 5',
          HinhAnhSP: url,
          GiaSP: '10000'
        },
      ];

    const setDataGioHang = async () => {
        if(chooseColor === '' || chooseSize === ''){
            Alert.alert("Thông báo",'Vui lòng chọn màu sắc và kích cỡ');
        }else{
            setLoadingCart(true);
            const data = {
                userId: firebase.auth().currentUser.uid,
                productId: id,
                name: dataSanPham.TenSP,
                image: dataSanPham.HinhAnhSP,
                quantity: numProduct,
                size: chooseSize,
                color: chooseColor,
                price: dataSanPham.GiaGiam,
                totalPrice: dataSanPham.GiaGiam * numProduct
            }
            console.log(data);
            const res = await addProductToCart({data: data});
            if(res.status === 200){
                setLoadingCart(false);
                Alert.alert('Thông báo','Sản phẩm đã thêm vào giỏ hàng');
                resetType();
                setBadgeCart(badgeCart + 1);
            }else{
                console.log(res);
            }
        }
    };

    const resetType = () => {
        setChooseColor('');
        setChooseSize('');
    }

    const getDataById = async (id) => {
        await getDataLove(id);
        try{
            const res = await getProductById({productId: id});
            if(res.status === 200){
                setDataSanPham(res.data);
                setLoading(false);
                resetType();
            }else{
                console.log(res);
            }
        }catch(error){
            console.log(error);
        }
        
    }
    const setBuyNow = () => {
        if(chooseColor === '' || chooseSize === ''){
            Alert.alert("Thông báo",'Vui lòng chọn màu sắc và kích cỡ');
        }else{
            const data = [{
                productId: id,
                name: dataSanPham.TenSP,
                image: dataSanPham.HinhAnhSP,
                quantity: numProduct,
                size: chooseSize,
                color: chooseColor,
                price: dataSanPham.GiaGiam,
                totalPrice: dataSanPham.GiaGiam * numProduct
            }]
            setProduct(data);
            navigation.navigate('Checkout');
        }
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        Promise.all([getDataById(id)])
          .then(() => setRefreshing(false))
          .catch(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getDataById(id);
    }, []);

    if(isLoading){
        return (
            <LoadingScreen/>
        )
    }
    else{
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        <View style={{
            ...styles.container,
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <TouchableOpacity 
                        style={{padding: 12}}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <BackIcon fill={CUSTOM_COLOR.FlushOrange}></BackIcon>
                    </TouchableOpacity>

                    <Text style={{ height: 40, padding: 7, fontSize: 20, color: CUSTOM_COLOR.Black, fontFamily: FONT_FAMILY.Bold, fontWeight: 'bold',  }}>Product</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: 'center', marginRight: 10 }} >
                    <TouchableOpacity onPress={() => {
                        setDataLove();
                    }}
                    >
                        {love ? (<HeartFillIcon fill={CUSTOM_COLOR.FlushOrange}
                        />) :
                            <HeartIcon/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 45,
                            height: 45,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            navigation.navigate('ShoppingCard', { item: dataSanPham });
                        }}>
                        {badgeCart != 0 ? (
                            <Badge
                                value={badgeCart}
                                status="error"
                                containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                            />
                        ) : null}
                        <ShoppingCartIcon />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', height: 350, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <Swiper
                    loop
                    autoplay
                >
                    {dataSanPham.HinhAnhSP.map((image, index) => (

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                            key={index}
                        >
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: 300,
                                    height: 300, borderRadius: 20
                                }}
                            />

                        </View>
                    ))}

                </Swiper>

            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{ color: CUSTOM_COLOR.FlushOrange,  marginLeft: 40, fontFamily: FONT_FAMILY.CeraPro, fontSize: 20 }}>đ</Text>
                    <Text
                        style={{
                            color: CUSTOM_COLOR.FlushOrange,
                            fontFamily: FONT_FAMILY.Semibold,
                            fontSize: 25,
                        }}>{dataSanPham.GiaGiam}</Text>
                </View>

                <Text
                    style={{
                        marginHorizontal: 10,
                        fontSize: 12,
                        color: CUSTOM_COLOR.Sunglow,
                        fontFamily: FONT_FAMILY.CeraPro,
                        textDecorationLine: 'line-through'
                    }}
                >-đ{dataSanPham.GiaGoc}</Text>
                <View style={{backgroundColor: CUSTOM_COLOR.Yellow, borderRadius: 5,}}>
                    <Text style={{color: CUSTOM_COLOR.Red, fontWeight: 'bold', margin: 4}}>
                        -{dataSanPham.TiLeKM}%
                    </Text>
                </View>

            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                        margin: 5,
                        color: CUSTOM_COLOR.Black,
                        fontFamily: FONT_FAMILY.Semibold,
                        
                        fontSize: 20,
                        marginLeft: 40,
                        marginRight: 40,

                    }}>{dataSanPham.TenSP}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                marginVertical: 20,
                marginHorizontal: 40,
                alignItems: 'center'
            }}>
                <Text style={{ marginRight: 10, fontFamily: FONT_FAMILY.SemiBoldItalic, fontSize: 15, color: CUSTOM_COLOR.FlushOrange }}>{dataSanPham.Rating}</Text>
                <StarRating
                    maxStars={5}
                    rating={dataSanPham.Rating}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Review', { dataSanPham: dataSanPham })}
                >
                    <Text style={{
                        marginHorizontal: 40,
                        fontStyle: 'italic'
                    }}>
                        See reviews
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >


            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: '1%'

            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    <Text style={{
                        marginLeft: 35,
                        marginRight: 20,
                        ...styles.textLarge

                    }}>Color</Text>



                    {dataSanPham.MauSac.map(color => (
                        <View style={{
                            ...styles.colorCicle,
                            backgroundColor: color.code,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            key={color.code}
                        >
                            {chooseColor === color.name ?
                                <View style={{
                                    ...styles.colorCicle,
                                    width: 10,
                                    height: 10,
                                    backgroundColor: CUSTOM_COLOR.White,
                                    borderWidth: 0
                                }}>

                                </View> : null}

                        </View>
                    ))}






                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >

                    <TouchableOpacity style={{
                        ...styles.btnCount
                    }}
                        onPress={() => numProduct > 1 ? setNumProduct(numProduct - 1) : null}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR.White
                        }}>-</Text>

                    </TouchableOpacity>

                    <Text>{numProduct}</Text>

                    <TouchableOpacity style={{
                        ...styles.btnCount
                    }}
                        onPress={() => setNumProduct(numProduct + 1)}
                    >
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR.White
                        }}>+</Text>

                    </TouchableOpacity>
                </View>

            </View>


            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 10,
                marginVertical: '1%'
            }}>
                <Text style={{
                    ...styles.textLarge,
                    marginLeft: 35,
                    marginRight: 20

                }}>Size</Text>

                <View style={{
                    flexDirection: 'row',

                }}>
                    {dataSanPham.Size.map((size, index) => (
                        <View style={{
                            ...styles.sizeCircle,
                            width: 45,
                            marginHorizontal: 5,
                            borderWidth: chooseSize === size ? 1 : 0
                        }}
                            key={index}
                        >
                            <Text>{size}</Text>
                        </View>
                    ))}

                </View>


            </View>

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ alignSelf: 'flex-end', marginHorizontal: 20 }}
            >
                <Text style={{
                    fontStyle: 'italic'
                }}>How can I choose my size?</Text>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', marginVertical: 10,
                    marginHorizontal: 35
                }}
            >
                <Text style={{
                    color: CUSTOM_COLOR.Black,
                    fontFamily: FONT_FAMILY.SemiBoldItalic
                }}>
                    See product details
                </Text>

                <TouchableOpacity styles={{

                }}
                    onPress={() => setSeeDetails(!seeDetails)}
                >
                    <Image source={IC_Down} />
                </TouchableOpacity>
            </View>
            {seeDetails ?
                <View>
                    <Text style={{
                        marginHorizontal: 35
                    }}>{dataSanPham.MoTaSP}</Text>
                </View>
                :
                null}
            <View style={{
                flexDirection: 'row', justifyContent: 'space-around',
                marginVertical: '3%'
            }}>
                <Button
                    color={CUSTOM_COLOR.Carnation}
                    title='ADD TO CARD'
                    style={{
                        paddingVertical: '3%'
                    }}
                    onPress={() => setDataGioHang()}
                />

                <Button
                    color={CUSTOM_COLOR.FlushOrange}
                    title='BUY NOW'
                    onPress={() => setBuyNow()}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: '5%',
                            marginVertical: '2%'
                        }}>
                            <Text style={{
                                fontSize: 25,
                                fontFamily: FONT_FAMILY.Semibold,
                                color: CUSTOM_COLOR.Black
                            }}>Choose your style</Text>
                    </View>
                    
                    <View style={{
                        ...styles.flexRow,
                        marginHorizontal: '10%',
                        marginVertical: '3%'
                    }}>
                        <Text style={{ ...styles.textLarge, fontWeight: 'normal' }}>Color</Text>

                        <View>

                            <FlatList
                                data={dataSanPham.MauSac}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            ...styles.flexRow,
                                            marginHorizontal: '5%',
                                            marginVertical: 3

                                        }}>
                                            <TouchableOpacity style={{
                                                ...styles.colorCicle,
                                                backgroundColor: item.code,
                                                borderWidth: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'

                                            }}
                                                onPress={() => setChooseColor(item.name)}
                                            >
                                                {chooseColor === item.name ?
                                                    <View style={{
                                                        ...styles.colorCicle,
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: CUSTOM_COLOR.White,
                                                        borderWidth: 0
                                                    }}>

                                                    </View> : null}

                                            </TouchableOpacity>
                                            <Text style={{ ...styles.textSmall }}>{item.name}</Text>
                                        </View>
                                    ) 
                                }
                                }
                                numColumns={2}
                            />

                        </View>


                    </View>

                    <View style={{ ...styles.flexRow,  marginHorizontal: '10%',
                        marginVertical: '3%' }}>
                        <Text style={{
                            ...styles.textLarge,
                            fontWeight: 'normal',
                            marginHorizontal: '10%',
                            marginVertical: '3%'
                        }}>Size</Text>

                        <View style={{ flexDirection: 'row' }}>
                            {dataSanPham.Size.map((size, index) => (
                                <TouchableOpacity style={{
                                    ...styles.sizeCircle,
                                    width: 45,
                                    marginHorizontal: 5,
                                    borderWidth: chooseSize === size ? 1 : 0
                                }}
                                    key={index}
                                    onPress={() => setChooseSize(size)}
                                >
                                    <Text>{size}</Text>
                                </TouchableOpacity>
                            ))}
                            {/* <FlatList
                                data={dataSanPham.Size}
                                numColumns={3}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => {
                                        // <TouchableOpacity style={{
                                        //     ...styles.sizeCircle,
                                        //     width: 45,
                                        //     marginVertical: 5,
                                        //     backgroundColor: chooseSize === item ? CUSTOM_COLOR.Carnation : CUSTOM_COLOR.White,
                                        //     borderWidth: chooseSize === item ? 1 : 0

                                        // }}
                                        //     
                                        // >
                                        //     <Text>{item}hh</Text>
                                        // </TouchableOpacity>
                                        <Text>jjjj</Text>
                                }}

                            /> */}

                        </View>


                    </View>

                    <View style={{
                        ...styles.flexRow,
                        justifyContent: 'center',
                        marginVertical: '6%'
                    }}>
                        <Button
                            title='DONE'
                            color={CUSTOM_COLOR.Carnation}
                            onPress={() => setModalVisible(false)}
                        />
                    </View>

                    </View>
                </View>

            </Modal>
        {isLoadingCart && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        )}


                   
                
        <Text style={styles.textView}>Có thể bạn sẽ thích</Text>
        <FlatList
                windowSize={10}
                horizontal={true}
                data={itemsRe}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: -10,
                    }}
                    onPress={() => {
                      navigation.navigate('ProductDetail', { item });
                    }}>
                    <ProductView
                      quantity={1000}
                      source={item.HinhAnhSP}
                      title={item.TenSP}
                      price={item.GiaSP} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.MaSP} />
        </View>
    </ScrollView>

    );
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White
    },
    textLarge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.Black
    },
    colorCicle: {
        height: 20,
        width: 20,
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 5,
    },
    textSmall: {
        color: CUSTOM_COLOR.Black,
        marginHorizontal: '2%'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sizeCircle: {
        width: 25,
        height: 25,
        borderWidth: 1,
        backgroundColor: CUSTOM_COLOR.LightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    btnCount: {
        width: 30,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CUSTOM_COLOR.FlushOrange,
        marginHorizontal: 15
    },
    textView: {
        marginHorizontal: 18,
        marginVertical: 15,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.Black,
        fontSize: 20,
    },
    btnSize: {
        width: 25,
        height: 25,
        backgroundColor: CUSTOM_COLOR.Alto,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: CUSTOM_COLOR.White,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default ProductDetail