import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';

function ListingDetailsScreen({ route }) {
    const listing = route.params;
    const [imageUrl, setImageUrl] = useState(null);
    const storage = getStorage();

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                if (listing.images[0]) {
                    const ilmRef = ref(storage, "ilmoitukset/" + listing.id + "/" + listing.images[0]);
                    const url = await getDownloadURL(ilmRef);
                    setImageUrl(url);
                }
            } catch (error) {
                console.log("ERROR", error);
            }
        };

        fetchImageUrl();
    }, [listing.id, listing.images, storage]);

    return (
        <View>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
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
});

export default ListingDetailsScreen;
