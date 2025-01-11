import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { firebase } from '../../../firebase/firebase';

const StoreProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{uri: 'https://via.placeholder.com/80'}}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <Text style={styles.username}>qdSBH6t2</Text>
          <Text style={styles.sellerID}>Seller ID: VN348SK5RY</Text>
        </View>
      </View>

      {/* Promotion Button */}
      <TouchableOpacity style={styles.banner}>
        <Text style={styles.bannerText}>Start your business right now!</Text>
      </TouchableOpacity>

      {/* Shop Buttons */}
      <View style={styles.shopSection}>
        <TouchableOpacity style={styles.shopButton}>
          <Text>🏠 Shop homepage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shopButton}>
          <Text>🔗 Share Shop</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <View style={styles.menuSection}>
        <MenuItem title="Account Setting" />
        <MenuItem title="Account Health" />
        <MenuItem title="General Information" />
        <MenuItem title="Facebook" />
      </View>

      <View style={styles.menuSection}>
        <MenuItem title="Contact Official Agent" help />
        <MenuItem title="Feedback" />
        <MenuItem title="Seller Help Center" />
      </View>

      <View style={styles.menuSection}>
        <MenuItem title="My Income" />
        <MenuItem title="Notifications" />
        <MenuItem title="Chat" />
        <MenuItem title="Language" />
        <MenuItem title="Lazada University" />
        <MenuItem title="About" />
      </View>

      {/* Other Options */}
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerText}>Other Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => {
          firebase.auth().signOut();
        }}>
        <Text style={styles.footerText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Component for Menu Item
const MenuItem = ({title, help}) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>{title}</Text>
    {help && <Text style={styles.helpText}>Get Help</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerText: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sellerID: {
    fontSize: 12,
    color: 'gray',
  },
  banner: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  shopSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  shopButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  menuSection: {
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 1,
  },
  menuItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  helpText: {
    fontSize: 12,
    color: '#007BFF',
  },
  footerButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
  },
  footerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default StoreProfileScreen;
