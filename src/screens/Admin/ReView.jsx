import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import { da } from 'date-fns/locale';
import { IC_Back, IC_Review } from '../../../assets/Admin/icons';
import StarRating from '../../components/Admin/StarRating';
import CUSTOM_COLOR from '../../constants/color';
import Review from '../../components/Admin/Review';
import ReviewDe from '../../components/Admin/ReViewDe';
function ReviewScreen({navigation, route}) {
  const [RemoveReview, setRemoveReview] = useState(false);
  const {item} = route.params
  const [image, setImage] = useState('')
  const [data, setdata] = useState([])
  const [tong, settong] = useState()
  const [tb, settb] = useState()
  const [Check, setCheck] = useState()
  const getdataReview = () =>{
    try{
        
    }catch(error){
        console.log(error);
    }
    
}
  const DeleteReView = () =>{
    data.map(async (sanpham) =>{
    //   if(sanpham.check == true){
    //     try {
    //       const collectionRef = collection(Firestore, 'DANHGIA');
    //       const q = query(collectionRef
    //           , where('MaDG', '==', sanpham.MaDG));
    //       const querySnapshot = await getDocs(q);
    //       querySnapshot.forEach((doc) => {
    //           deleteDoc(doc.ref).then(() => {
    //               console.log('Xóa tài liệu thành công');
    //               getdataReview()
    //           }).catch((error) => {
    //               console.error('Lỗi khi xóa tài liệu:', error);
    //           });
    //       });
    //       } catch(error){
    //           console.log(error);
    //       }
    //   }
    })
    setRemoveReview(false)
  }
  const updateLaiData = () =>{

  }
  const updateCheck = (item) =>{
    // const updateItem = data.map((product) => {
    //   if (product.MaDG === item.MaDG) {
    //       product.check = !item.check;
    //   }
    //   return product
    // })
    // setdata(updateItem)
  }
  useEffect(() =>{
    getdataReview()
  }, [])
  if( RemoveReview == false){
    return (
      <View style = {{
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White
    }}>
        <View style ={{
            flexDirection: 'row', 
            alignItems: 'center',
        
        }}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <Image
                    source={IC_Back}
                    style = {{
                        width: 10, 
                        height: 20,
                        marginHorizontal: 20,
                        marginVertical: 15
                    }}
                    resizeMode = 'cover'
                />  
            </TouchableOpacity>
                
          
            <Text style ={{
                fontSize: 20,
                color: CUSTOM_COLOR.Black, 
                fontWeight: 'bold'
            }}>Review</Text>
        </View>
  
        <View style = {{
            flexDirection: 'row',
            marginHorizontal: '5%',
            justifyContent: 'space-between'
        }}>
            <View>
                <Text style ={{
                    fontSize: 17,
                    color: CUSTOM_COLOR.Black
                }}>{tong} Reviews</Text>
                <View style = {{
                    flexDirection: 'row'
                }}>
                    <Text style = {{
                        fontSize: 17,
                        color: CUSTOM_COLOR.Black,
                        marginRight: '5%'
                    }}>{tb}</Text>
                    <StarRating
                        nums = {5}
                        fill = {tb}
                    />
                </View>
            </View>
  
            
            <View>
                <TouchableOpacity style ={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: CUSTOM_COLOR.FlushOrange,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8
                }}
                    onPress = {() => setRemoveReview(true)}
                >
                    <Image source={IC_Review}/>
                    <Text style ={{
                        fontSize: 15,
                        marginLeft: 10,
                        fontWeight: 'bold',
                        color: CUSTOM_COLOR.White
                    }}>Remove Review</Text>
                </TouchableOpacity>
  
            </View>
  
        </View>
  
        <ScrollView>
            {data.map((review, index) =>(
                
                <View style = {{
                    marginVertical: '3%',
                    borderBottomWidth: 1,
                    borderBottomColor: CUSTOM_COLOR.Alto,
                    paddingBottom: '2%'
                }}>
                    <Review
                        key = {review.id}
                        avatar = {review.Avatar}
                        name = {review.TenND}
                        time = {review.NgayDG}
                        rating = {review.Rating}
                        content = {review.NDDG}
                        image = {review.AnhDG}
                    />
  
                </View>
            ))}
        </ScrollView>
        </View>
      )
      }else{
        return (
          <View style = {{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White
        }}>
            <View style ={{
                flexDirection: 'row', 
                alignItems: 'center',
            
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={IC_Back}
                        style = {{
                            width: 10, 
                            height: 20,
                            marginHorizontal: 20,
                            marginVertical: 15
                        }}
                        resizeMode = 'cover'
                    />  
                </TouchableOpacity>
                    
              
                <Text style ={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black, 
                    fontWeight: 'bold'
                }}>Review</Text>
            </View>
      
            <View style = {{
                flexDirection: 'row',
                marginHorizontal: '5%',
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text style ={{
                        fontSize: 17,
                        color: CUSTOM_COLOR.Black
                    }}>{tong} Reviews</Text>
                    <View style = {{
                        flexDirection: 'row'
                    }}>
                        <Text style = {{
                            fontSize: 17,
                            color: CUSTOM_COLOR.Black,
                            marginRight: '5%'
                        }}>{tb}</Text>
                        <StarRating
                            nums = {5}
                            fill = {tb}
                        />
                    </View>
                </View>
      
                
                <View>
                    <TouchableOpacity style ={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: CUSTOM_COLOR.FlushOrange,
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        paddingVertical: 8
                    }}
                        onPress = {DeleteReView}
                    >
                        <Image source={IC_Review}/>
                        <Text style ={{
                            fontSize: 15,
                            marginLeft: 10,
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR.White
                        }}>OK</Text>
                    </TouchableOpacity>
      
                </View>
      
            </View>
      
            <ScrollView>
                {data.map((review, index) =>(
                    <View style = {{
                        marginVertical: '3%',
                        borderBottomWidth: 1,
                        borderBottomColor: CUSTOM_COLOR.Alto,
                        paddingBottom: '2%'
                    }}>
                        <ReviewDe
                            key = {review.id}
                            avatar = {review.Avatar}
                            name = {review.TenND}
                            time = {review.NgayDG}
                            rating = {review.Rating}
                            content = {review.NDDG}
                            image = {review.AnhDG}
                            value = {review.check}
                            change = { () => updateCheck(review)}
                        />
      
                    </View>
                ))}
            </ScrollView>
            </View>
        )
      }
    }
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReviewScreen;
