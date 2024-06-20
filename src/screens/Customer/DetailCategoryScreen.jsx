import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import { IC_Back } from '../../../assets/Customer/icons';
import ProductView from '../../components/Customer/ProductView';
import SearchInput from '../../components/Customer/SearchInput';
import SortDropdown from '../../components/Customer/SortDropDown';
import CUSTOM_COLOR from '../../constants/color';
import { BackIcon, ShoppingCartIcon } from '../../../assets/Customer/svgs';
import { getProductByCategory } from '../../api/ProductApi';
import LoadingComponent from '../../components/LoadingComponent';
import { OrderContext } from '../../context/OrderContext';
import { Badge } from 'react-native-elements';

function DetailCategoryScreen({navigation, route}) {
  const {item} = route.params;
  const {numCart, setNumCart} = React.useContext(OrderContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [isLoading, setLoading] = useState(true);

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };
  const handleSort = type => {
    setSortType(type);
  };
  const [items, setItems ]= useState([]);

  const getDataCategory = async () => {
    const res = await getProductByCategory({MaDM: item._id});
    if(res.status === 200){
      setItems(res.data);
      setLoading(false);
      console.log(res.data);
    }else{
      console.log(res);
    }
  };
  useEffect(() => {
    getDataCategory();
  }, []); // Gọi lại hàm getDataCategory khi component được tạo lần đầu

  useEffect(() => {
    getDataCategory();
  }, [searchTerm, sortType]); // Gọi lại hàm getDataCategory mỗi khi searchTerm thay đổi
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
            <BackIcon/>
        </TouchableOpacity>
        <View style={{width: '75%', height: '70%'}}>
          <SearchInput onSearch={handleSearch} />
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            borderRadius: 10,
          }}>
             {numCart != 0 ? (
                <Badge
                  value={numCart}
                  status="error"
                  containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                />
              ) : null}
          <ShoppingCartIcon/>
        </TouchableOpacity>
        <View style={{width: '1%', height: '100%'}} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 30,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {item.name}
        </Text>

        <Text
          style={{
            fontSize: 17,
            marginHorizontal: 20,
            fontWeight: 'bold',
            marginBottom: 0,
          }}>
          {item.numProduct} products
        </Text>
      </View>
      <SortDropdown onChangeText={handleSort} />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingComponent />
          </View>
      ) : (
        <View
        style={{
          height: '100%',
        }}>
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  margin: 0
                }}
                onPress={() => {
                  navigation.navigate('ProductDetail', {id: item._id});
                }}>
                <ProductView
                  quantity={item.SoLuongDaBan}
                  source={item.HinhAnhSP[0]}
                  title={item.TenSP}
                  price={item.GiaGiam}
                />
              </TouchableOpacity>
            );
          }}
          numColumns={2}
          //keyExtractor={(item) => item.MASP}
        />
      </View>
      )}
    </View>
  );
}

export default DetailCategoryScreen;
