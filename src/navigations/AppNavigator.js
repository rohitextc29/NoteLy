import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import NavigationService from './NavigationService';
import NoteList from '../container/NoteList';
import EditNote from '../container/EditNote';
import NoteDetail from '../container/NoteDetail';

const {width, height} = Dimensions.get('window');
let _nav;
const headerLeft = (navigation) => {
	return(
		<TouchableOpacity style={{ width: 70, height:53, top: -2, ...ifIphoneX({ marginTop: -45 }, { marginTop: 0 }), flexDirection: 'row', borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da', }} onPress={() => goBack(navigation)} >
                <SimpleLineIcons name="plus" style={{padding: 17}} size={20} color="#fff" />
                <Text>Add Note</Text>
		</TouchableOpacity>
	)
}
// const headerRight = (navigation) => {
// 	return(
// 		<TouchableOpacity style={{ width: 70, height:53, top: -2, ...ifIphoneX({ marginTop: -45 }, { marginTop: 0 }) }} onPress={() => goBack(navigation)} >
//             <SimpleLineIcons name="arrow-left" style={{padding: 17}} size={20} color="#fff" />
//         </TouchableOpacity>
// 	)
// }
const goBack=(navigation)=>{
	if(_nav.state.routes[0].routes.length == 1 || navigation.state.routeName === 'Favourites'){
		NavigationService.reset('Home')
	}
	navigation.goBack(); 
}

const AppNavigator = createStackNavigator({
    NoteList: { screen: NoteList },
    EditNote: { screen: EditNote },
    NoteDetail: { screen: NoteDetail }
},
{
    headerMode: 'float',
    navigationOptions : ({ navigation }) => ({
        headerStyle: {
			backgroundColor: '#3c3d3c', borderBottomWidth: 0, borderBottomColor: '#ddd',
			...ifIphoneX({
				height: 10
			}, {
				height: (Platform.OS === 'ios') ? 35 : StatusBar.currentHeight + 35,
				paddingBottom: (Platform.OS === 'ios') ? 15 : StatusBar.currentHeight - 30
			}),
        },
        headerTitleStyle: {
			flex:1,
			textAlign: 'center',
			fontSize: 18,
			top: -2,
			...ifIphoneX({ marginTop: -40 }, { marginTop: 0 })
		},
        headerTintColor: 'white',
        headerLeftContainerStyle: {
			backgroundColor: '#3c3d3c'
        },
        // headerLeft: navigation.state.routeName === 'NoteList' ? null : (headerLeft(navigation)),
		// headerRight: navigation.state.routeName === 'Home' ? null : (headerRight(navigation))
    })
});

// const HamburgerMenu = createDrawerNavigator({
// 	DrawerMenu: { screen: AppNavigator	}
//   },
//   {
// 	contentComponent: ({ navigation }) => {
// 		_nav = navigation;
// 		return <DrawerMenuItem navigation={navigation}/>
// 	} ,
// 	drawerWidth: width-50
//   });
export default AppNavigator;