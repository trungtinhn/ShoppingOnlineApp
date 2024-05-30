import { ActivityIndicator, View } from "react-native"
import CUSTOM_COLOR from "../constants/color"


export default function LoadingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={CUSTOM_COLOR.Gray} />
        </View>
    )
}