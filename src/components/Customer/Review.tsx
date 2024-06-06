import React from "react";
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, ViewComponent, FlatList } from "react-native";
import { IC_Clock } from "../../../assets/Customer/icons";
import CUSTOM_COLOR from "../../constants/color";
import StarRating from "./StartRating";
import { ScrollView } from "react-native-gesture-handler";


const Review = (props: any) =>{

  return(
    
     <View style = {{flex: 1}}>
        <View style = {{
            ...styles.flexRow,
            justifyContent: 'space-between',
            marginHorizontal: '4%',
            ...props.style
            
        }}>
            <View style ={{
                ...styles.flexRow
            }}>
                <Image source={{ uri : props.avatar}}
                    style = {{
                        width: 45,
                        height: 45,
                        borderRadius: 30,
                        marginRight: '5%'
                    }}
                />

                <View>
                    <Text style ={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: CUSTOM_COLOR.Black
                    }}>{props.name}</Text>

                    <View style ={{
                        ...styles.flexRow,
                    }}>
                        <Image source={IC_Clock}
                            style ={{
                                width: 15,
                                height: 15,
                                marginRight: '3%'
                            }}
                        />
                        <Text>{props.time}</Text>
                    </View>
                </View>

            </View>

            <View>
                <Text style ={{
                    alignSelf: 'flex-end',
                    fontSize: 16,
                    color: CUSTOM_COLOR.Black
                }}>{props.rating} rating</Text>
                <StarRating
                    maxStars={5}
                    rating = {props.rating}
                />
            </View>
        </View>

        <View style ={{
            marginHorizontal: '4%',
            marginVertical: '2%'
        }}>
            <Text style ={{
                fontSize: 16,

            }}>{props.content}</Text>
        </View>
        
        {props.images && props.images.length > 0 && (
        <View style={styles.container}>
            {props.images.map((image: any) => (
            <TouchableOpacity onPress={props.onPress}>
                <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, marginTop: 10, marginHorizontal: 5 }}
                key={image}
                />
            </TouchableOpacity>
            ))}
        </View>
      )}
     </View>
    
  )
   
};

  

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    container:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: "5%",
    }
})
export default Review