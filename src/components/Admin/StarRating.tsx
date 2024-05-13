import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IC_StartCorner, IC_StartFull, IC_financial } from "../../../assets/Admin/icons";



const StarRating = (props: any) =>{

    const [rating, setRating] = useState(props.fill); // Số sao được chọn

    // Hàm để xử lý sự kiện khi một sao được nhấn
    const handleStarPress = (selectedRating: any) => {
        setRating(selectedRating);
    };


    return(
        <View style={styles.container}>
            {[...Array(props.nums)].map((_, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => handleStarPress(index + 1)}>
                    <Image
                        source={index < rating ? IC_StartFull : IC_StartCorner}
                        style={styles.star}
                    />
                </TouchableWithoutFeedback>
            ))}
        </View>
    )
   
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    star: {
        width: 40,
        height: 40,
        margin: 5,
    },
});


export default StarRating