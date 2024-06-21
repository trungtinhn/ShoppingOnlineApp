import { useState, useEffect } from "react"
import { View, TouchableOpacity, Text, ScrollView } from "react-native"
import Review from "../../components/Customer/Review"
import StarRating from "../../components/Customer/StartRating"
import CUSTOM_COLOR from "../../constants/color"
import { BackIcon } from "../../../assets/Customer/svgs"
import FONT_FAMILY from "../../constants/font"
import ImageView from "react-native-image-viewing";
import { getReviewById } from "../../api/ReviewApi"
import { formatDate } from "../../utils/helpers"
import { RefreshControl } from "react-native-gesture-handler"

function ReviewScreen({navigation, route}) {
    const {dataSanPham} = route.params
    const [data, setdata] = useState([])
    const [tong, settong] = useState()
    const [tb, settb] = useState(5)
    const [visible, setIsVisible] = useState(false);
    const [images, setImages] = useState([]);
  // To set the max number of Stars
    const getdataReview = async () =>{
        const id = dataSanPham._id;
        const res = await getReviewById({id: id});
        if(res.status === 200){
            setdata(res.data)
            console.log(res.data)
        }else{
           console.log(res)
        }
    }
    const getUser = async () =>{
        
    }
    useEffect(() => {
        getdataReview()
        getUser()
    }, [])
    return(
        <View style = {{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White
        }}>
            <View style ={{
                flexDirection: 'row', 
                alignItems: 'center',
            }}>
                <TouchableOpacity 
                    style = {{
                        padding: 20,
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <BackIcon></BackIcon>
                </TouchableOpacity>
              
                <Text style ={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black, 
                    fontFamily: FONT_FAMILY.Bold,
                }}>Review</Text>
            </View>

            <View style = {{
                flexDirection: 'row',
                marginHorizontal: '5%',
                justifyContent: 'space-between',

            }}>
                    <Text style ={{
                        fontFamily: FONT_FAMILY.Semibold,
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: CUSTOM_COLOR.Black
                    }}>{data.length} Reviews</Text>
                    <View style = {{
                        flexDirection: 'row'
                    }}>
                        <Text style = {{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: CUSTOM_COLOR.Black,
                            marginRight: '5%'
                        }}>{dataSanPham.Rating}/5</Text>
                        <StarRating
                            maxStars = {5}
                            rating={dataSanPham.Rating}
                        />
                    </View>

            </View>

            <ScrollView refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => getdataReview()} />
            }>
                {data.map((review) =>(
                    <View style = {{
                        marginVertical: '3%',
                        borderBottomWidth: 1,
                        borderBottomColor: CUSTOM_COLOR.Alto,
                        paddingBottom: '2%'
                    }}
                    key={review._id}
                    >
                        <Review
                            key = {review._id}
                            avatar = {review.Avatar}
                            name = {review.TenND}
                            time = {formatDate(review.NgayDG)}
                            rating = {review.Rating}
                            content = {review.NDDG}
                            images = {review.AnhDG}
                            onPress = {() => {
                                setImages(review.AnhDG);
                                setIsVisible(true);
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
            <ImageView
                images={
                    images.map((image) => ({
                        uri: image
                    }))
                }
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </View>
        
    )
}


export default ReviewScreen