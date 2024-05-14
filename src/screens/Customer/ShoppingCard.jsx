import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,FlatList } from "react-native";
import ProductCheckOut from "../../components/Customer/ProductCheckout";
import { PR_1, PR_2, PR_3, PR_4, PR_5 } from "../../../assets/Customer/images";

const ShoppingCard = ({navigation, route}) => {
    const { idUser } = route.params
    const [items, setItems] = useState([]);
    
    function getData(){
        const data = [
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
          setItems(data)
    }
    useEffect(() => {
        getData();
    }, [])
    return(
        <View style={styles.container}>
            <FlatList
                style={{
                    height: 470,
                    flexGrow: 0
                }}
                data={items}
                renderItem={({ item }) => {

                    return (

                        <ProductCheckOut
                            style={{
                                marginVertical: 10
                            }}
                            source={item.HinhAnhSP}
                            title={item.TenSP}
                            color={item.MauSac}
                            size={item.Size}
                            price={item.GiaTien}
                            number={item.SoLuong}
                            show={true}
                            onPress={() => updateCheck(item)}
                            checkSelect={item.checkSelect}
                            onPressUp={() => UpNumber(item)}
                            onPressDown={() => DownNumber(item)}
                            onPressDelete={() => DeleteProduct(item)}
                            onPressProduct={() => { GoToProduct(item) }}
                        />
                    )
                }}
            />
        </View>
    );
}
export default ShoppingCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});