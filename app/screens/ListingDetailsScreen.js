import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';

function ListingDetailsScreen({ route }) {

const listing = route.params
const [imageUrl, setImageUrl] = useState()
const storage = getStorage()
const ilmRef = ref(storage, "ilmoitukset/"+listing.id)
const filename = listing.images[0] ? ref(ilmRef, listing.images[0]) : null;
const filePath = filename ? filename.fullPath : null;

if (filePath) {
    console.log("FILEPATH: " ,filePath)
    getDownloadURL(ref(storage, filePath))
    .then((url) => {
        setImageUrl(url)
        console.log("IMAGEURL", imageUrl)
        console.log("IMAGE", listing.images[0])
    }).catch((error) => { console.log("ERROR", error)})
}

    return (
        <View>
{imageUrl &&
   <Image style={styles.image} source={{uri: imageUrl}}/>
}
 <View style={styles.detailsContainer}>
 <AppText style={styles.title}>{listing.title}</AppText>
 <AppText style={styles.desc}>{listing.description}</AppText>
 <AppText style={styles.price}>{listing.price}$</AppText>
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
    },
    desc: {
        marginTop: 5
    }
})

export default ListingDetailsScreen;