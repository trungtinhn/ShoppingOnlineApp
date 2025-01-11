import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";

const StoreHomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Seller Center</Text>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.userIcon}
          />
          <Text style={styles.userName}>qdSBH6t2</Text>
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order</Text>
        <View style={styles.orderStats}>
          {["To Process", "Shipping", "Return", "Review"].map((item, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Business Setup */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Start your business right now!</Text>
        {["Add Email", "Add Warehouse Address", "Add ID & Bank documents", "Upload Products"].map(
          (item, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Growth Center */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Growth Center</Text>
        <Text style={styles.subtitle}>Task (0/1)</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Become a Live Seller</Text>
        </TouchableOpacity>
      </View>

      {/* Business Advisor */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Business Advisor</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Product Ranking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Traffic Source Ranking</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Upload */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add 3 Products to get traffic bonus</Text>
        <View style={styles.row}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <TouchableOpacity key={index} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* Lazada University */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lazada University</Text>
        {[
          "Cách tham gia Chương trình khuyến mãi",
          "Đầu tư và thu nhiều lợi nhuận",
          "Am hiểu chỉ số kinh doanh",
          "Khuyến mãi lớn, truy cập khung giờ vàng",
        ].map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
  },
  smallButtonText: {
    textAlign: "center",
    color: "#333",
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
});

export default StoreHomeScreen;
