import React from 'react';
import { Image, ImageBackground , StyleSheet , Text, View} from 'react-native';
import AppButton from '../components/AppButton';

function WelcomeScreen(props) {
    return (
       <ImageBackground
       style={styles.background}
       source={require("../assets/photo-1529472119196-cb724127a98e.webp")}>
        <View style={styles.logoContainer}>
        <Image
        style={styles.logo}
        source={require("../assets/kisspng-dog-tag-cat-pet-pet-footprints-logo-5a8e35a8a6ea37.1082524815192692886837.png")}/>
        <Text style={styles.tagline}>Place for all pet owners to connect!</Text>
        <Text style={styles.tagline2}>Buy and sell pet products, chat, </Text>
        <Text style={styles.tagline2}>find new friends and a lot more!</Text>
        </View>
        <View style={styles.buttonsContainer}>
        <AppButton title="Login"/>
        <AppButton title="Register" color="secondary"/>
        </View>
       </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    buttonsContainer: {
     padding: 20,
     width: "100%"
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    },
    tagline: {
        fontSize: 15,
        fontWeight: "600",
        paddingVertical: 10
    },
    tagline2: {
        fontSize: 15,
        fontWeight: "600",
        paddingVertical: 5
    }
})

export default WelcomeScreen;
