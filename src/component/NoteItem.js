import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Octicons from 'react-native-vector-icons/Octicons';
import { EDIT_NOTE, DELETE_NOTE } from '../reducer/notelist';

const { height, width } = Dimensions.get('window');

// Buttons



var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

var dateObject = new Date();

favouriteArticle = (item, index) => {
    var noteObject = {...item, favourite: true};
    store.dispatch({type: EDIT_NOTE, noteObject, index});
}

heartArticle = (item, index) => {
    var noteObject = {...item, hearted: true};
    store.dispatch({type: EDIT_NOTE, noteObject, index});
}

navigateToDetails = (item, index, navigation) => {
    console.log('{...item, index} ',{...item, index});
    navigation.navigate('NoteDetail', {...item, index});
}

const NoteItem = ({item, index, navigation}) => {
    console.log('NoteItem item ',item);
    console.log('NoteItem index ',index);
    var date = dateObject.getDate();
    var month = dateObject.getMonth();
    var year = dateObject.getFullYear();
    
    var hour = dateObject.getHours();
    var min = dateObject.getMinutes();

    var timeTitle = '';
    if(date == item.date && month == item.month && year == item.year){
        timeTitle = 'Today at ' + ("0" + item.hour).slice(-2) + ':' + ("0" + item.min).slice(-2) + ' ' + item.meridiem;
    }else{
        timeTitle = monthArray[item.month] + ("0" + item.date).slice(-2) + ' at ' + ("0" + item.hour).slice(-2) + ':' + ("0" + item.min).slice(-2) + ' ' + item.meridiem;
    }
    var swipeoutBtns = [
        {
            text: "Delete",
          right: [
            {
            text: "Delete",
              component: <View style={{backgroundColor: 'red'}}><Octicons name="trashcan" size={20} color="#fff" />
              <Text>Delete</Text></View>,
              onPress: () => { 
                  console.log('index ',index);
                  store.dispatch({type: DELETE_NOTE, index});
                 },
              type: 'primary',
            }
          ],
          backgroundColor: 'red'
        }
    ]
    return (
        <Swipeout right={swipeoutBtns} style={{width}}>
            <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                    onPress={() => navigateToDetails(item, index, navigation)}
                    style={{flex: 2/3}}
                    underlayColor={'#444444'}>
                    <View>
                    <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold'}}>{item.title}</Text>
                    <Text style={{color: '#A9A9A9', fontSize: 18}}>{item.titledesc}</Text>
                    <Text style={{color: '#A9A9A9', fontSize: 18}}>{timeTitle}</Text>
                    </View>
                </TouchableHighlight>
                <View style={{flex: 1/3, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableHighlight
                    onPress={() => favouriteArticle(item, index)}
                    underlayColor={'#444444'}
                    style={{flexDirection: 'row', paddingLeft: 10}}>
                    <Octicons name="star" size={30} color={(item.favourite) ? "yellow" : "#fff"} style={{paddingLeft: 10}}/>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => heartArticle(item, index)}
                    underlayColor={'#444444'}
                    style={{flexDirection: 'row', paddingRight: 10}}>
                    <Octicons name="heart" size={30} color={(item.hearted) ? "red" : "#fff"} style={{paddingRight: 10}}/>
                </TouchableHighlight>
                </View>
            </View>
        </Swipeout>
    )
}
const styles = StyleSheet.create({ 
    titleContainer: {
        flex: 1, 
        justifyContent: 'center',
        position: 'absolute',
        top: 200,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'OpenSans-Bold',
    },
    imgTransparentLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    readMoreBtn: {
        color: '#00a25e',
        fontFamily: 'OpenSans',
        fontSize:15,
        paddingTop: 10,
        paddingBottom: 10
    }
});
export default NoteItem;
