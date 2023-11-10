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
        //source={require("../assets/kisspng-dog-tag-cat-pet-pet-footprints-logo-5a8e35a8a6ea37.1082524815192692886837.png")}
        source={require("../assets/paw.png")}
        />
        <Text style={styles.tagline}>Place for all dog owners to connect!</Text>
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
        fontSize: 17,
        fontWeight: "600",
        paddingVertical: 50
    }
})

export default WelcomeScreen;
