import { View, SafeAreaView, StyleSheet, Text, Image } from "react-native";
import { IMG_mditickcircle } from "../../../assets/Login_SignUp/images";
import CUSTOM_COLOR from "../../constants/color";
import FONT_FAMILY from "../../constants/font";
import CustomButton from "../../components/Login_SignUp/CustomButton";


function ThankScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
      <View style={styles.containerCenter}>
        <Image
          source={IMG_mditickcircle}
          style={{width: '60%', height: '60%', resizeMode: 'contain'}}
        />

        <View style={styles.textView}>
          <Text style={styles.topText}>SUCCESSFULLY!</Text>
          <Text style={styles.botText}>Your order is completed.</Text>
        </View>
      </View>

      <View style={styles.containerBot}>
        <View style={styles.button}>
          <CustomButton
            type="primary"
            text="Continue"
            onPress={() => navigation.navigate('CustomerHomeScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White
      },
      containerCenter: {
        width: '90%',
        height: '40%',
        top: '20%',
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textView: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      topText: {
        fontFamily: FONT_FAMILY.Semibold,
        fontSize: 30,
        color: CUSTOM_COLOR.Black,
        fontWeight: 'bold',
      },
      botText: {
        fontFamily: FONT_FAMILY.CeraPro,
        fontSize: 15,
        color: CUSTOM_COLOR.Black,
      },
      containerBot: {
        width: '100%',
        height: '10%',
        bottom: '-40%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: '150%',
        height: '100%',
      },

})

export default ThankScreen;