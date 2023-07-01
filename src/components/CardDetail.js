import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const CardDetail = ({ totalPrice }) => {
  const route = useRoute()
  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={styles.titleDetail}>
        Billing Details
      </Text>
      <View style={styles.detailCard}>
        <View style={styles.viewItemDetail}>
          <Text style={styles.itemsDetail}>
            Item Total
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "400" }}>
            ${totalPrice}
          </Text>
        </View>

        <View style={styles.viewItemDetail}>
          <Text style={styles.itemsDetail}>
            Delivery Fee | 1.2KM
          </Text>
          <Text style={styles.dateDetail}>
            FREE
          </Text>
        </View>

        <View style={styles.viewItemDetail} >
          <Text style={styles.itemsDetail}>
            Free Delivery on Your order
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.viewItemDetail}>
          <Text style={styles.itemsDetail}>
            selected Date
          </Text>
          <Text
            style={styles.dateDetail}
          >
            {/* {route.params.pickUpDate} */}
          </Text>
        </View>

        <View style={styles.viewItemDetail}>
          <Text style={styles.itemsDetail}>
            No Of Days
          </Text>

          <Text style={styles.dateDetail}>
            {route.params.no_Of_days}
          </Text>
        </View>

        <View style={styles.viewItemDetail}>
          <Text style={styles.itemsDetail}>
            selected Pick Up Time
          </Text>

          <Text style={styles.dateDetail}>
            {route.params.selectedTime}
          </Text>
        </View>
        <View
          style={styles.divider}
        />

        <View style={styles.viewItemDetail}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            To Pay
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {totalPrice + 95}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default CardDetail

const styles = StyleSheet.create({
  titleDetail: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30
  },
  detailCard: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    marginTop: 15,
  },
  itemsDetail: {
    fontSize: 18,
    fontWeight: "400",
    color: "gray"
  },
  viewItemDetail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  divider: {
    borderColor: "gray",
    height: 1,
    borderWidth: 0.5,
    marginTop: 10,
  },
  dateDetail: {
    fontSize: 18,
    fontWeight: "400",
    color: "#088F8F",
  }
})