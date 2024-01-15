import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import colors from '../config/colors';
import AppText from './AppText';

function Card({title, subTitle, image, onPress, images, id}) {

    const [imageUrl, setImageUrl] = useState()
    const listing = {title: title, subTitle: subTitle, images:images, id: id}
    const storage = getStorage()
    const ilmRef = ref(storage, "ilmoitukset")
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
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
           { imageUrl ? (
   <Image style={styles.image} source={{uri: imageUrl}}/>
) : ( <Image 
            style={styles.image}
            source={image}/>)} 
            <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
            <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden"
    },
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        marginBottom: 7,
        color: colors.black
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: "bold"
    }
})

export default Card;