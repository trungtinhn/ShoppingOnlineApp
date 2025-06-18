import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';
import CustomHeader from '../../components/Admin/CustomHeader';
import FONT_FAMILY from '../../constants/font';
import ButtonDetail from '../../components/Admin/ButtonDetail';
import { upDateRankRule } from '../../api/RankRulesApi';

function EditRankRule({route, navigation}) {
  const {item} = route.params;
  const [rank, setRank] = useState(item.rank);
  const [itemBenefits, setBenefits] = useState(item.benefits);
  const [minValue, setMinOrderValue] = useState(item.minOrderValue.toString());
  const [maxValue, setMaxOrderValue] = useState(item.maxOrderValue.toString());
  const [description, setDescription] = useState(item.description || '');
  const [lengthName, setLengthName] = useState(item.rank.length);
  const [showNewBenefitInput, setShowNewBenefitInput] = useState(false);
  const [newBenefit, setNewBenefit] = useState('');

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...itemBenefits, newBenefit.trim()]);
      setNewBenefit('');
      setShowNewBenefitInput(false);
    }
  };

  const validateInput = () => {
    return (
      rank.length > 0 &&
      minValue.length > 0 &&
      maxValue.length > 0 &&
      description.length > 0
    );
  };

  const setData = async () => {
    if (!validateInput()) {
      Alert.alert(
        'Notification',
        'Please fill in the information completely and accurately!',
        [{text: 'OK', style: 'cancel'}],
      );
      return;
    }
    const dataNewRankRule = {
      rank: rank,
      benefits: itemBenefits,
      minOrderValue: minValue,
      maxOrderValue: maxValue,
      description: description,
    };
    const res = await upDateRankRule({rank: rank, data: dataNewRankRule});
    if (res.status === 200) {
      Alert.alert('Notification', 'Successfully updated rank rule!', [
        {text: 'OK', onPress: () => navigation.goBack(), style: 'cancel'},
      ]);
    } else {
      console.log(res);
      Alert.alert('Error', 'Failed to update rank rule');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', height: 10}} />
      <>
        <View style={styles.headerContainer}>
          <CustomHeader onPress={() => navigation.goBack()} title="Edit Rank" />
        </View>
      </>
      <>
        <View style={styles.bodyContainer}>
          <ScrollView style={{width: '100%', height: '100%'}}>
            <View style={styles.spaceContainer} />

            <>
              <View style={[styles.inputContainer, {height: 90}]}>
                <View style={{width: '100%', height: 10}} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-start'},
                    ]}>
                    <View style={{width: '10%', height: '100%'}} />
                    <Text style={styles.titleInputStyle}>The Rank</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        {color: CUSTOM_COLOR.Red},
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-end'},
                    ]}>
                    <Text style={styles.titleInputStyle}>{lengthName}/100</Text>
                    <View style={{width: '10%', height: '100%'}} />
                  </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <View style={{width: '5%', height: '100%'}} />
                  <TextInput
                    style={{flex: 1, fontSize: 17}}
                    onChangeText={text => {
                      if (text.length < 100) {
                        setRank(text);
                        setLengthName(text.length);
                      }
                    }}
                    value={rank}
                  />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View style={styles.spaceContainer} />
            <>
              <View style={[styles.inputContainer, {height: 90}]}>
                <View style={{width: '100%', height: 10}} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-start'},
                    ]}>
                    <View style={{width: '10%', height: '100%'}} />
                    <Text style={styles.titleInputStyle}>Min Order Value</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        {color: CUSTOM_COLOR.Red},
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <View style={{width: '5%', height: '100%'}} />
                  <TextInput
                    style={{flex: 1, fontSize: 17}}
                    onChangeText={text => setMinOrderValue(text)}
                    keyboardType="numeric"
                    value={minValue}
                    placeholder="Enter min order value"
                  />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View style={styles.spaceContainer} />
            <>
              <View style={[styles.inputContainer, {height: 90}]}>
                <View style={{width: '100%', height: 10}} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-start'},
                    ]}>
                    <View style={{width: '10%', height: '100%'}} />
                    <Text style={styles.titleInputStyle}>Max Order Value</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        {color: CUSTOM_COLOR.Red},
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <View style={{width: '5%', height: '100%'}} />
                  <TextInput
                    style={{flex: 1, fontSize: 17}}
                    onChangeText={text => setMaxOrderValue(text)}
                    keyboardType="numeric"
                    value={maxValue}
                    placeholder="Enter max order value"
                  />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View style={styles.spaceContainer} />
            <>
              <View style={[styles.inputContainer, {height: 90}]}>
                <View style={{width: '100%', height: 10}} />
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      {justifyContent: 'flex-start'},
                    ]}>
                    <View style={{width: '10%', height: '100%'}} />
                    <Text style={styles.titleInputStyle}>Description</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        {color: CUSTOM_COLOR.Red},
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                </View>
                <View style={{flex: 2, flexDirection: 'row'}}>
                  <View style={{width: '5%', height: '100%'}} />
                  <TextInput
                    style={{flex: 1, fontSize: 17}}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder="Enter description"
                  />
                  <View style={{width: '5%', height: '100%'}} />
                </View>
              </View>
            </>
            <View style={styles.spaceContainer} />
            <View style={styles.inputContainer}>
              <View style={styles.benefitsContainer}>
                <View style={styles.benefitsHeader}>
                  <Text style={styles.label}>Benefits</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowNewBenefitInput(!showNewBenefitInput)}>
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>

                {itemBenefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newBenefits = itemBenefits.filter(
                          (_, i) => i !== index,
                        );
                        setBenefits(newBenefits);
                      }}
                      style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {showNewBenefitInput && (
                  <View style={styles.newBenefitContainer}>
                    <TextInput
                      style={styles.benefitInput}
                      value={newBenefit}
                      onChangeText={setNewBenefit}
                      placeholder="Enter new benefit"
                      autoFocus
                      onSubmitEditing={handleAddBenefit}
                      onBlur={() => {
                        if (!newBenefit.trim()) {
                          setShowNewBenefitInput(false);
                        }
                      }}
                    />
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleAddBenefit}>
                      <Text style={styles.submitButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.spaceContainer} />
            <>
              <View style={styles.buttonContainer}>
                <ButtonDetail
                  style={{width: '100%', height: 50}}
                  title={'Save'}
                  color={CUSTOM_COLOR.DarkOrange}
                  onPress={() => setData()}
                />
              </View>
            </>

            <View style={{width: '100%', height: 10}} />
          </ScrollView>
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  headerContainer: {
    width: '90%',
    height: 70,
    marginHorizontal: '5%',
  },
  bodyContainer: {
    width: '90%',
    height: '85%',
    marginHorizontal: '5%',
  },
  addImageContainer: {
    width: '100%',
    height: 100,
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: CUSTOM_COLOR.Red,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: CUSTOM_COLOR.White,
    fontSize: 12,
    fontWeight: 'bold',
  },
  icAddStyle: {
    color: CUSTOM_COLOR.FlushOrange,
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 50,
  },
  addImageTextStyles: {
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
  },
  spaceContainer: {
    width: '100%',
    height: 10,
  },
  inputContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'column',
  },
  unitTitleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitsContainer: {
    marginVertical: 10,
    padding: 10,
  },
  benefitsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitsList: {
    maxHeight: 200,
  },
  benefitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONT_FAMILY.regular,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: CUSTOM_COLOR.Black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    color: CUSTOM_COLOR.Red,
    fontSize: 16,
    fontWeight: 'bold',
  },
  newBenefitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  benefitInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    padding: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EditRankRule;
