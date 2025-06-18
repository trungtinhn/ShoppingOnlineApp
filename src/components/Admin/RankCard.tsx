import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';

const RankCard = (props: any) => {
  type Rank = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

  const {rank, minOrderValue, maxOrderValue, benefits, description} = props;

  const rankColors: Record<Rank, string> = {
    Bronze: '#ad6a28', // Bronze: Màu đồng
    Silver: '#a9a9a9', // Silver: Màu bạc
    Gold: '#efbf04', // Gold: Màu vàng ánh kim
    Platinum: '#50c878', // Platinum: Màu xanh lá
    Diamond: '#4e545c', // Diamond: Màu đen/xám đậm
  };

  const rankTranslations: Record<Rank, string> = {
    Bronze: 'Đồng',
    Silver: 'Bạc',
    Gold: 'Vàng',
    Platinum: 'Bạch kim',
    Diamond: 'Kim cương',
  };

  const getRankColor = (rank: Rank): string => rankColors[rank];
  const getRankTranslation = (rank: Rank): string => rankTranslations[rank];

  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Text style={styles.rank}>{getRankTranslation(rank)}</Text>
        <View
          style={[styles.rankColor, {backgroundColor: getRankColor(rank)}]}
        />
      </View>
      <Text style={styles.orderRange}>
        Chi tiêu từ ${minOrderValue} đến ${maxOrderValue ?? '~'}
      </Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.benefitsHeader}>Quyền lợi:</Text>
      <FlatList
        data={benefits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text style={styles.benefit}>- {item}</Text>}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.FlushOrange,
  },
  rankColor: {
    height: 30,
    width: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  orderRange: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  benefitsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  benefit: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default RankCard;
