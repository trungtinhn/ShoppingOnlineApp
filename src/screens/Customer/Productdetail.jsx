import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Button, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import CUSTOM_COLOR from "../../constants/color";
import StarRating from "../../components/Customer/StartRating";
import { IC_Back, IC_Cancle, IC_Down, IC_Heart, IC_Heart_Red, IC_ShoppingCart, IC_User } from "../../../assets/Customer/icons";
import ColorPicker from "../../components/Customer/ColorPicker";
import { IM_AnhGiay1, IM_AnhGiay2, PR_1, PR_2, PR_3, PR_4, PR_5 } from "../../../assets/Customer/images";
import { Badge } from "react-native-elements";
import Swiper from "react-native-swiper";
import ProductView from "../../components/Customer/ProductView";
import { ScrollView } from "react-native-gesture-handler";
import { BackIcon } from "../../../assets/Customer/svgs";
import { getProductById } from "../../api/ProductApi";
import { addYears } from "date-fns";
import LoadingScreen from "../LoadingScreen";
  
function ProductDetail({ navigation, route }) {
    const { id } = route.params;
    const [dataSanPham, setDataSanPham] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [love, setLove] = useState(false);
    const [badgeCart, setBadgeCart] = useState(0);
    const [chooseColor, setChooseColor] = useState('');
    const [chooseSize, setChooseSize] = useState('');
    const [numProduct, setNumProduct] = useState(1);
    const [tb, setTb] = useState(4.5); // Giả sử tb là điểm đánh giá trung bình
    const [seeDetails, setSeeDetails] = useState(false);
    const [chooseStyle, setChooseStyle] = useState(false);

    const items = [
        {
          MaSP: 1,
          TenSP: 'San Pham 1',
          HinhAnhSP: PR_1,
          GiaSP: '10000'
        },
        {
          MaSP: 2,
          TenSP: 'San Pham 2',
          HinhAnhSP: PR_2,
          GiaSP: '10000'
        },
        {
          MaSP: 3,
          TenSP: 'San Pham 3',
          HinhAnhSP: PR_3,
          GiaSP: '10000'
        },
        {
          MaSP: 4,
          TenSP: 'San Pham 4',
          HinhAnhSP: PR_4,
          GiaSP: '10000'
        },
        {
          MaSP: 5,
          TenSP: 'San Pham 5',
          HinhAnhSP: PR_5,
          GiaSP: '10000'
        },
      ];

    const setDataYeuThich = () => {
        setLove(!love);
    };

    const setDataGioHang = () => {
        setBadgeCart(badgeCart + 1);
    };

    const getDataById = async (id) => {
        console.log(id);
        const res = await getProductById({productId: id});
        if(res.status === 200){
            setDataSanPham(res.data);
            setLoading(false);
            console.log(res.data);
        }else{
            console.log(res);
        }
    }

    const setBuyNow = () => {
        // Xử lý logic mua ngay
        navigation.navigate('Checkout')
    };

    useEffect(() => {
        getDataById(id);
    })

    if(isLoading){
        return (
            <LoadingScreen/>
        )
    }
    else
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{
            ...styles.container,
        }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                    <TouchableOpacity 
                        style={{padding: 12}}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <BackIcon width={20} height={20}></BackIcon>
                    </TouchableOpacity>

                    <Text style={{ height: 40, padding: 7, fontSize: 18, fontWeight: 'bold', color: CUSTOM_COLOR.Black }}>Product</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: 'center', marginRight: 10 }} >
                    <TouchableOpacity onPress={() => {
                        setDataYeuThich();
                    }}
                    >
                        {love ? (<Image
                            source={IC_Heart_Red}
                            style={{
                                margin: 10,
                                width: 33,
                                height: 33,

                            }}
                            resizeMode='contain'
                        />) :
                            (<Image
                                source={IC_Heart}
                                style={{
                                    margin: 10,
                                    width: 28,
                                    height: 28,
                                }}
                                resizeMode='contain'
                            />)
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 45,
                            height: 45,
                            alignItems: 'center',
                            justifyContent: 'center',
                            // marginVertical: 10,
                            // padding: 8,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            navigation.navigate('ShoppingCard', { item: dataSanPham[0] });
                        }}>
                        {badgeCart != 0 ? (
                            <Badge
                                value={badgeCart}
                                status="error"
                                containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                            />
                        ) : null}
                        <Image source={IC_ShoppingCart} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', height: 350, alignItems: 'center', justifyContent: 'center' }}>
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
                justifyContent: 'space-between'
            }}>
                <Text
                    style={{
                        margin: 5,
                        color: CUSTOM_COLOR.Black,
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginLeft: 40,
                        width: '50%'

                    }}>{dataSanPham.TenSP}</Text>

                <Text
                    style={{
                        marginHorizontal: 10,
                        fontSize: 20,
                        color: CUSTOM_COLOR.Sunglow,
                        fontWeight: 'bold',
                        width: '30%'

                    }}
                >{dataSanPham.GiaSP * numProduct} đ</Text>

            </View>

            <View style={{
                flexDirection: 'row',
                marginVertical: 20,
                marginHorizontal: 40,
                alignItems: 'center'
            }}>
                <Text style={{ marginRight: 10 }}>{tb}</Text>
                <StarRating
                    nums={5}
                    fill={tb}
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
                            backgroundColor: color.MaMau,
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
                            fontWeight: 'bold'
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
                            fontWeight: 'bold'
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
                    marginLeft: 35

                }}>Size</Text>

                <View style={{
                    flexDirection: 'row',

                }}>
                    {dataSanPham.Size.map((size, index) => (
                        <TouchableWithoutFeedback style={{
                            ...styles.sizeCircle,
                            width: 45,
                            marginHorizontal: 5,
                            borderWidth: chooseSize === size ? 1 : 0
                        }}
                            key={index}
                        >
                            <Text>{size.title}</Text>
                        </TouchableWithoutFeedback>
                    ))}

                </View>


            </View>

            <TouchableOpacity
                onPress={() => setChooseStyle(true)}
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
                    color: CUSTOM_COLOR.Black
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
                    color={CUSTOM_COLOR.Sunshade}
                    title='BUY NOW'
                    onPress={() => setBuyNow()}
                />
            </View>



            {chooseStyle ?

                <View style={{
                    position: 'absolute',
                    width: '80%',
                    height: '40%',
                    backgroundColor: CUSTOM_COLOR.White,
                    alignSelf: 'center',
                    top: '30%',
                    borderRadius: 30,
                    borderWidth: 1
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: '5%',
                        marginVertical: '2%'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR.Black
                        }}>Choose your style</Text>

                        <TouchableOpacity
                            onPress={() => setChooseStyle(false)}
                        >
                            <Image style={{
                                width: 15,
                                height: 15
                            }}
                                source={IC_Cancle}
                            />

                        </TouchableOpacity>
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
                                    return item.checked == true ? (
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
                                    ) :
                                        <View></View>
                                }
                                }
                                numColumns={2}
                            />




                        </View>


                    </View>

                    <View style={{ ...styles.flexRow }}>
                        <Text style={{
                            ...styles.textLarge,
                            fontWeight: 'normal',
                            marginHorizontal: '10%',
                            marginVertical: '3%'
                        }}>Size</Text>

                        <View>
                            <FlatList
                                data={dataSanPham.Size}
                                numColumns={3}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => {
                                    return item.checked == true ?
                                        <TouchableOpacity style={{
                                            ...styles.sizeCircle,
                                            width: 45,
                                            marginVertical: 5,

                                            borderWidth: chooseSize === item ? 1 : 0

                                        }}
                                            onPress={() => setChooseSize(item)}
                                        >
                                            <Text>{item.title}</Text>
                                        </TouchableOpacity>
                                        : <View></View>
                                }}

                            />

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
                            onPress={() => setChooseStyle(false)}
                        />

                    </View>

                </View>
                : null}
        <Text style={styles.textView}>Sản phẩm gợi ý</Text>
         <FlatList
                windowSize={10}
                horizontal={true}
                data={items}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: -10,
                    }}
                    onPress={() => {
                      navigation.navigate('ProductDetail', { item });
                    }}>
                    <ProductView
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
        backgroundColor: CUSTOM_COLOR.Alto,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    btnCount: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CUSTOM_COLOR.Alto,
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
    }

})


export default ProductDetail