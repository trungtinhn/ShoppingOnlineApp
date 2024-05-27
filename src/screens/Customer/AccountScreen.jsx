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
    IC_Delivery,
    IC_Gift,
    IC_Lock,
    IC_Logout,
    IC_Next,
    IC_Order,
    IC_Profile,
    IC_Question,
    IC_Revote,
    IC_Theme,
    IC_Wallet,
    IC_User,
} from '../../../assets/Customer/icons'
//Test App
import CUSTOM_COLOR from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from '../../components/LoadingComponent';
import { Default_Avatar } from '../../../assets/Customer/images';
import {firebase} from '../../../firebase/firebase'
function AccountScreen() {
    const navigation = useNavigation();
    const hanleSignOut = () => { };
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const getUserData = async () => {
        
    }
    useEffect(() => {
        const userData = [
            {
                TenND: 'Tien Phat',
                LoaiND: 'VIP'
            }
        ];
        setUserData(userData)
        setImageUrl(Default_Avatar);
        // fetchUserData(firebase.auth().currentUser.uid);
        // fetchImageUrl(firebase.auth().currentUser.uid, 'Avatar').then(url =>
        //   setImageUrl(url),
        // );
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            {true ? (
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
                                {imageUrl ? (
                                    <Image
                                        source={imageUrl}
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
                                        Trần Tiến Phát
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

                            {/* <Text
                style={{
                  marginHorizontal: '5%',
                  color: CUSTOM_COLOR.White,
                }}>
                Following: 3
              </Text> */}
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
                                <Image
                                    source={IC_Order}
                                    style={{
                                        marginHorizontal: '10%',
                                        tintColor: CUSTOM_COLOR.Black,
                                    }}
                                    resizeMode="stretch"
                                />

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
                                <Image
                                    source={IC_Next}
                                    style={{
                                        marginLeft: '5%',
                                    }}
                                />
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
                                <Image
                                    source={IC_Wallet}
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    source={IC_Gift}
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    source={IC_Delivery}
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    source={IC_Revote}
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* <TouchableOpacity
              style={{
                ...styles.option,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={IC_Question}
                  style={{
                    ...styles.iconOption,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: CUSTOM_COLOR.Black,
                  }}>
                  Help center
                </Text>
              </View>

              <Image source={IC_Next} />
            </TouchableOpacity> */}

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
                                <Image
                                    source={IC_Profile}
                                    style={{
                                        ...styles.iconOption,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: CUSTOM_COLOR.Black,
                                    }}>
                                    Profile
                                </Text>
                            </View>

                            <Image source={IC_Next} />
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
                                <Image
                                    source={IC_Lock}
                                    style={{
                                        ...styles.iconOption,
                                    }}
                                />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: CUSTOM_COLOR.Black,
                                    }}>
                                    Change Password
                                </Text>
                            </View>

                            <Image source={IC_Next} />
                        </TouchableOpacity>

                        {/* <TouchableOpacity
              style={{
                ...styles.option,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={IC_Theme}
                  style={{
                    ...styles.iconOption,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: CUSTOM_COLOR.Black,
                  }}>
                  Theme color
                </Text>
              </View>

              <Image source={IC_Next} />
            </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => {
                                firebase.auth().signOut();
                                // navigation.navigate('Login');
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
                <LoadingComponent text="Loading data..." />
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
