import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';

function ListingDetailsScreen(props) {
    return (
        <View>
 <Image style={styles.image} source={require('../assets/food.webp')}/>
 <View style={styles.detailsContainer}>
 <AppText style={styles.title}>Chicken Treats For Sale</AppText>
 <AppText style={styles.price}>15$</AppText>
 <View style={styles.userContainer}>
 <ListItem 
 image={require("../assets/person.webp")}
 title="Jaana Juntunen"
 subTitle="5 Listings"
 />
 </View>
 </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: '500'
    },
    image: {
        width: '100%',
        height: 300
    },
    price: {
     color: colors.secondary,
     fontWeight: 'bold',
     fontSize: 20,
     marginVertical: 10
    },
    userContainer: {
        marginVertical: 40
    }
})

export default ListingDetailsScreen;