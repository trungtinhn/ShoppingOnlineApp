import { useState, useEffect } from "react"
import { View, TouchableOpacity, Text, ScrollView, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native"
import Review from "../../components/Customer/Review"
import StarRating from "../../components/Customer/StartRating"
import CUSTOM_COLOR from "../../constants/color"
import { BackIcon, DeleteIcon, Pen, StarFullIcon, StarIcon } from "../../../assets/Customer/svgs"
import FONT_FAMILY from "../../constants/font"
import ImageView from "react-native-image-viewing";
import { addReviewApi, getReviewById } from "../../api/ReviewApi"
import { formatDate } from "../../utils/helpers"
import { RefreshControl } from "react-native-gesture-handler"
import Button from "../../components/Customer/Button"
import { border_add } from "../../../assets/Admin/images"
import { ImageBackground } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import { Storage, firebase } from "../../../firebase/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { checkDeliveredProduct } from "../../api/OrderApi"
import { getUserType } from "../../api/UserApi"
import LoadingComponent from "../../components/LoadingComponent"


function ReviewScreen({navigation, route}) {
    const {dataSanPham} = route.params;
    const userId = firebase.auth().currentUser.uid;
    const [loading, setLoading] = useState(true);
    const [data, setdata] = useState([]);
    const [tong, settong] = useState();
    const [tb, settb] = useState(5);
    const [visible, setIsVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [addReview, setAddReview] = useState(false);
    const [imageRe, setImageRe] = useState([])
    const [dataUser, setdataUser] = useState([])
    const [ngayDG, setNgayDG] = useState('')
    const [content, setND] = useState('')
    const [defaultRating, setDefaultRating] = useState(2);
    const [click, setClick] = useState(false);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [check, setCheck] = useState(false);
    const [isLoadingReview, setIsLoadingReview] = useState(false);
  
    const getdataReview = async () =>{
        const id = dataSanPham._id;
        const res = await getReviewById({id: id});
        if(res.status === 200){
            setdata(res.data)
        }else{
           console.log(res)
        }
    }
    const getCheck = async () =>{
        const res = await checkDeliveredProduct({userId: userId, productId: dataSanPham._id});
        if(res.status === 200){
            setCheck(res.data.delivered);
            setLoading(false);
        }else{
           console.log(res)
        }
    }
    const getUser = async () =>{
        const res = await getUserType({userId: userId});
        if(res.status === 200){
            setdataUser(res.data)
        }else{
           console.log(res)
        }
    }
    const selectImage = () => {
        const options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          multiple: true,
          selectionLimit: 0,
          quality: 1,
        };
    
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const selectedImages = response.assets.map(asset => asset.uri);
            setImageRe(selectedImages);
            setClick(true);
          }
        });
      };
    const UploadFile = async (image) => {
        try {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
          });
          const storageRef = ref(Storage, `images/review/image-${Date.now()}`);
          const snapshot = await uploadBytes(storageRef, blob);
          console.log("Upload successfully!");
          const url = await getDownloadURL(snapshot.ref);
          console.log("Get URL successfully");
          return url;
        } catch (error) {
          console.log(error);
        }
    };
    const handleAddReview = async () => {
        setIsLoadingReview(true);
        // Upload tất cả hình ảnh và lấy danh sách URL
        const imageUrls = await Promise.all(imageRe.map(image => UploadFile(image)));
        const data = {
            userId: userId,
            productId: dataSanPham._id,
            content: content,
            reviewDate: new Date(),
            rating: defaultRating,
            images: imageUrls,
        };
        const res = await addReviewApi({data: data});
        if(res.status === 200){
            setIsLoadingReview(false);
            setAddReview(false);
            Alert.alert('Thông báo', 'Đánh giá thành công');
        }else{
           console.log(res)
        }
    }
    useEffect(() => {
        getdataReview();
        getUser();
        getCheck();
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
            {loading ? 
            <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LoadingComponent/> 
            </View>
            : 
            <>
            <View style = {{
                flexDirection: 'row',
                marginHorizontal: '5%',
                justifyContent: 'space-between',

            }}>
                {!check ? 
                    <>
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
                            rating={dataSanPham.rating}
                        />
                    </View>
                    </>
                    :
                    <>
                    <View style = {{flexDirection: 'column'}}>
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
                            }}>{dataSanPham.rating}/5</Text>
                            <StarRating
                                maxStars = {5}
                                rating={dataSanPham.rating}
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
                            onPress = {() => setAddReview(true)}
                        >
                            <Pen/>
                            <Text style ={{
                                fontSize: 15,
                                marginLeft: 10,
                                fontWeight: 'bold',
                                color: CUSTOM_COLOR.White
                            }}>Add Review</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                }

            </View>


            <ScrollView refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => {getdataReview(); getCheck(); getUser() } } />
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
                            avatar = {review.avatar}
                            name = {review.userName}
                            time = {formatDate(review.reviewDate)}
                            rating = {review.rating}
                            content = {review.content}
                            images = {review.images}
                            onPress = {() => {
                                setImages(review.images);
                                setIsVisible(true);
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
            </> 
            }
            {addReview ? 

            <View style ={{
                position: 'absolute',
                width: '80%',
                height: 350,
                backgroundColor: CUSTOM_COLOR.White,
                borderRadius: 20,
                elevation: 5,
                alignSelf: 'center',
                top: '25%'
            }}>

                <View style ={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginHorizontal: '3%',
                    marginTop: '2%'
                }}>
                    <TouchableOpacity
                        onPress={() => setAddReview(false)}
                    >
                        <DeleteIcon/>

                    </TouchableOpacity>
                </View>

                <View style ={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: '5%'
                }}> 
                    <Image source={{uri: dataUser.avatar}}
                        style = {{
                            width: 45,
                            height: 45,
                            borderRadius: 30,

                        }}
                    />
                    <Text style= {{
                        fontSize: 17,
                        marginHorizontal: '3%',
                        fontFamily: FONT_FAMILY.CeraPro,
                        color: CUSTOM_COLOR.Black,
                    }}>{dataUser.userName}</Text>
                </View>

                <View style ={{
                    ...styles.flexRow,
                    marginHorizontal: '5%',
                    marginVertical: '3%'
                }}>
                    <Text style ={{
                        fontSize: 17,
                        marginRight: '5%',
                        fontFamily: FONT_FAMILY.CeraPro,
                    }}>Rating</Text>
                <View style={styles.customRatingBarStyle}>
                        {maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            {item <= defaultRating ?
                                <StarFullIcon fill={CUSTOM_COLOR.FlushOrange} width={20} height={20} /> :
                                <StarIcon fill={CUSTOM_COLOR.FlushOrange} width={20} height={20}/>
                            }
                            </TouchableOpacity>
                        );
                        })}
                    </View>
                </View>

                <View style = {{
                    width: '90%',
                    height: '30%',
                    backgroundColor: CUSTOM_COLOR.Gallery,
                    alignSelf: 'center',
                    borderRadius: 20
                }}>
                    <TextInput
                        placeholder= 'Write something...'
                        multiline
                        numberOfLines={1}
                        style ={{
                            paddingHorizontal: 10
                        }}
                        onChangeText={setND}
                        value={content}
                    />
                </View>

                <View style = {{
                    ...styles.flexRow,
                    marginVertical: 10,
                    marginHorizontal: 10
                }}>
                    <TouchableOpacity
                        onPress={selectImage}
                    >
                        {click ? (
                        <View style = {{
                            flexDirection: 'row',
                        }}>
                            {imageRe.map((imgUri, index) => (
                            <Image
                                key={index}
                                source={{ uri: imgUri }}
                                style={{
                                width: 55,
                                height: 55,
                                marginRight: 10,
                                }}
                            />
                            ))}
                        </View>)
                        :(
                            <View style = {{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <ImageBackground source={border_add}
                                    style = {{
                                    width: 45,
                                    height: 45,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style = {{color: CUSTOM_COLOR.Black, fontSize: 20}}>+</Text>
                                </ImageBackground>
                                <Text>Upload your image or video</Text>
                            </View>
                            
                        )}
                        
                    
                    </TouchableOpacity>

                </View>

                <View style ={{
                    ...styles.flexRow,
                    justifyContent: 'center'
                }}> 
                    {isLoadingReview ? <ActivityIndicator size = 'large' color = {CUSTOM_COLOR.FlushOrange}/> :
                    <Button
                        title = 'Add Review'
                        color = {CUSTOM_COLOR.FlushOrange}
                        style = {{
                            width: '40%'
                        }}
                        onPress = {handleAddReview}
                    />
                    }
                </View>

            </View> : null }
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
const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    starImageStyle: {
        width: 17,
        height: 17,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default ReviewScreen