import React from 'react';
import { FlatList , StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import routes from '../navigation/routes';

const listings = [
    {
        id: 1,
        title: 'Chicken Treats for sale',
        price: 15,
        image: require('../assets/food.webp')
    },
    {
        id: 2,
        title: 'Dog collar for sale',
        price: 35,
        image: require('../assets/collar.webp')
    }
]

function ListingScreen({ navigation }) {
    return (
    <Screen style={styles.screen}>
       <FlatList
       data={listings}
       keyExtractor={listing => listing.id.toString()}
       renderItem={({item}) => 
    <Card
      title={item.title}
      subTitle={"$" + item.price}
      image={item.image} 
      onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}/>
    }
       />
       </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
      padding: 20,
      backgroundColor: colors.light,
    },
  });

export default ListingScreen;