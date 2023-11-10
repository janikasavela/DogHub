import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import AppText from './AppText';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

import colors from '../config/colors';

function ListItem({title, subTitle, image, IconComponent, onPress, renderRightActions}) {
    return (
        <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
       <TouchableHighlight
       onPress={onPress}
       underlayColor={colors.light
    }
       >
       <View style={styles.container}>
        {IconComponent}
       { image && <Image source={image}
        style={styles.image}/>}
        <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
        {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>
       </View>
       </TouchableHighlight>
       </Swipeable>
       </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: colors.white
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    title: {
        fontWeight: '500',
    },
    subTitle: {
        color: colors.medium
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: 'center'
    }

})

export default ListItem;