import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ListingScreen from '../screens/ListingScreen'
import ListingDetailsScreen from '../screens/ListingDetailsScreen'

const Stack = createStackNavigator()

const FeedNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Listings" component={ListingScreen} options={{headerShown: false}}/>
        <Stack.Screen 
        name="ListingDetails" 
        component={ListingDetailsScreen}/>
    </Stack.Navigator>
)

export default FeedNavigator;
