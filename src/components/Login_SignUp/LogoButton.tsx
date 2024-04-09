import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FaceBookLogo from '../../../assets/Login_SignUp/svg/FbLogo.svg'
import GoogleLogo from '../../../assets/Login_SignUp/svg/GgLogo.svg'
import TwitterLogo from '../../../assets/Login_SignUp/svg/TwLogo.svg'
import CUSTOM_COLOR from '../../constants/color'

const LogoButton = (props: any) => {
    const renderLogo = () => {
        switch(props.type){
            case 'facebook':
                return <FaceBookLogo/>;
            case 'twitter':
                return <TwitterLogo/>;
            case 'google':
                return <GoogleLogo/>
            default:
                return <View/>
        }
    };

    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        {renderLogo()}
      </TouchableOpacity>
    </View>
  )
}

export default LogoButton

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        backgroundColor: CUSTOM_COLOR.AliceBlue,
        padding: 20
    }
})