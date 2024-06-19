import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import {
    IC_Logout,
    IC_User,
} from '../../../assets/Customer/icons'
import CUSTOM_COLOR from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from '../../components/LoadingComponent';
import {firebase} from '../../../firebase/firebase'
import { CalendarIcon, CreditIcon, DeliveryIcon, GiftIcon, LockIcon, NextRight, OrderIcon, ProfileIcon } from '../../../assets/Customer/svgs';
import { getUserType } from '../../api/UserApi';

function AccountScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        const res = await getUserType({ MaND: firebase.auth().currentUser.uid });
        if (res.status === 200) {
            setUserData(res.data);
            setIsLoading(true);
        }else{
            console.log(res)
        }
    }
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <>
                    <View style={styles.container}>
                        <View
                            style={{
                                width: '100%',
                                height: '18%',
                                backgroundColor: CUSTOM_COLOR.MineShaft,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: '5%',
                                }}>
                                {userData.Avatar ? (
                                    <Image
                                        source={{uri: userData.Avatar}}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                            borderColor: CUSTOM_COLOR.Black,
                                            borderWidth: 1,
                                        }}
                                    />
                                ) : (
                                    <Image
                                        source={IC_User}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                            borderColor: CUSTOM_COLOR.Black,
                                            borderWidth: 1,
                                        }}
                                    />
                                )}

                                <View
                                    style={{
                                        marginHorizontal: '6%',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: CUSTOM_COLOR.White,
                                            fontWeight: '500',
                                        }}>
                                        {userData.TenND}
                                    </Text>

                                    <Text
                                        style={{
                                            color: CUSTOM_COLOR.White,
                                            fontStyle: 'italic',
                                            fontSize: 15,
                                        }}>
                                        Thành Viên VIP
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <TouchableOpacity
                            style={{
                                height: '8%',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                marginVertical: '2%',
                                borderBottomWidth: 1,
                                paddingBottom: 10,
                                borderBottomColor: CUSTOM_COLOR.Alto,
                            }}
                            onPress={() => navigation.navigate('MyOrder')}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <OrderIcon style={styles.iconOption}/>
                               

                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: CUSTOM_COLOR.Black,
                                    }}>
                                    Your order
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: CUSTOM_COLOR.Black,
                                        fontStyle: 'italic',
                                    }}>
                                    View purchase history
                                </Text>
                                <NextRight/>
                            </View>
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                borderBottomWidth: 1,
                                paddingTop: 10,
                                paddingBottom: 15,
                                borderBottomColor: CUSTOM_COLOR.Alto,
                            }}>
                            <TouchableOpacity>
                                <CreditIcon/>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <GiftIcon/>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <DeliveryIcon/>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <CalendarIcon/>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ChangeProfile');
                            }}
                            style={{
                                ...styles.option,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <ProfileIcon style={styles.iconOption} fill={CUSTOM_COLOR.Black} />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: CUSTOM_COLOR.Black,
                                    }}>
                                    Profile
                                </Text>
                            </View>

                            <NextRight/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ChangePassword');
                            }}
                            style={{
                                ...styles.option,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <LockIcon style={styles.iconOption} fill={CUSTOM_COLOR.Black} />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: CUSTOM_COLOR.Black,
                                    }}>
                                    Change Password
                                </Text>
                            </View>

                            <NextRight/>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => {
                                firebase.auth().signOut();
                            }}
                            style={{
                                ...styles.option,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={IC_Logout}
                                    style={{
                                        ...styles.iconOption,
                                        marginLeft: 5,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: CUSTOM_COLOR.Black,
                                    }}>
                                    Log out
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                
                    <LoadingComponent/>
                
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
    },

    option: {
        // height: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '8%',
        marginVertical: '4%',
    },
    iconOption: {
        height: 25,
        width: 25,
        marginRight: 20,
    },
});

export default AccountScreen;
