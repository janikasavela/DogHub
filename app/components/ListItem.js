import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
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
            <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
        {subTitle && <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>}
        </View>
        <MaterialCommunityIcons name="chevron-right"
        size={25}
        color={colors.medium}/>
       </View>
       </TouchableHighlight>
       </Swipeable>
       </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    }

})

export default ListItem;