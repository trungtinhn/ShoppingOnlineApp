import { useState, useEffect } from "react"
import { View, TouchableOpacity, Text, ScrollView } from "react-native"
import Review from "../../components/Customer/Review"
import StarRating from "../../components/Customer/StartRating"
import CUSTOM_COLOR from "../../constants/color"
import { BackIcon } from "../../../assets/Customer/svgs"
import FONT_FAMILY from "../../constants/font"
import ImageView from "react-native-image-viewing";
import { getReviewById } from "../../api/ReviewApi"

function ReviewScreen({navigation, route}) {
    const {id} = route.params
    const [data, setdata] = useState([])
    const [tong, settong] = useState()
    const [tb, settb] = useState(5)
    const [visible, setIsVisible] = useState(false);
    const [images, setImages] = useState([]);
  // To set the max number of Stars
    const getdataReview = async () =>{
        const res = getReviewById({id: id})
        if(res.status === 200){
            setdata(res.data)
        }else{
            console.log(res)
        }
        
    }
    const getUser = async () =>{
        
    }
    const currentDay = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const date = day + '/' + month + '/' + year;
        //setNgayDG(date);
    }
    useEffect(() => {
        getdataReview()
        getUser()
        currentDay()
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
                marginVertical: 20,
                justifyContent: 'space-between',

            }}>
                
                    <Text style ={{
                        fontFamily: FONT_FAMILY.Semibold,
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: CUSTOM_COLOR.Black
                    }}>4 Reviews</Text>
                    <View style = {{
                        flexDirection: 'row'
                    }}>
                        <Text style = {{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: CUSTOM_COLOR.Black,
                            marginRight: '5%'
                        }}>4.5/5</Text>
                        <StarRating
                            maxStars = {5}
                            rating={4.5}
                        />
                    </View>

            </View>

            <ScrollView>
                {data.map((review) =>(
                    <View style = {{
                        marginVertical: '3%',
                        borderBottomWidth: 1,
                        borderBottomColor: CUSTOM_COLOR.Alto,
                        paddingBottom: '2%'
                    }}
                    key={review.id}
                    >
                        <Review
                            key = {review.id}
                            avatar = {review.Avatar}
                            name = {review.TenND}
                            time = {review.NgayDG}
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