import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function Card({ title, subTitle, image, onPress, images, id }) {
    const [imageUrl, setImageUrl] = useState();
    const storage = getStorage(); // Alusta Firebase Storage

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const ilmRef = ref(storage, `ilmoitukset/${id}/${images[0]}`);
                const url = await getDownloadURL(ilmRef);
                setImageUrl(url);
            } catch (error) {
                console.log("ERROR", error);
            }
        };

        if (images.length > 0) {
            fetchImageUrl();
        }
    }, [id, images, storage]);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                {imageUrl ? (
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                ) : (
                    <Image style={styles.image} source={image} />
                )}
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
});

export default Card;
