import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList , StyleSheet, Text } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import {firestore, collection, query, onSnapshot, doc, USERS, getDoc, getDocs, orderBy} from '../firebase/Config'

function ListingScreen({ navigation }) {

const [listings, setListings] = useState([])
const [error, setError] = useState(false)
const [loaded, setLoaded] = useState(false)

useEffect(()=>{
loadListings()   
      }, [])

      const loadListings = () => {
        const q = query(collection(firestore, "ilmoitukset"))
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            const data = []
  
            querySnapshot.forEach((doc)=>{
                data.push({
                    id: doc.id,
                    title: doc.data().title,
                    price: doc.data().price,
                    image: require('../assets/collar.webp'),
                    description: doc.data().description,
                })
            })
               setListings(data)
               setLoaded(true)
               console.log("LOADED ", data)
            },
            (error) => {
              console.error("Error fetching data from Firestore:", error);
              setError(true);
                      })
            return () =>{
                unsubscribe()
            }
      }

/* const loadListings = async () => {
  const response = await listingsApi.getListings()
  if(!response.ok) return setError(true)
  setError(false)
  setListings(response.data)
} */

   if (error) return <Screen><AppText>Error fetching data</AppText><AppButton title="Retry" onPress={loadListings}/></Screen>
   if(!loaded) return <Screen><ActivityIndicator animating={true} size="large" color={colors.primary}/></Screen>

    return (
    <Screen style={styles.screen}>
       <FlatList
       data={listings}
       keyExtractor={listing => listing.id.toString()}
       showsVerticalScrollIndicator={false}
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