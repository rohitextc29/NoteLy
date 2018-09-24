import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { ifIphoneX } from 'react-native-iphone-x-helper';

class NoteDetail extends Component{
    constructor(props){
        super(props);
        this.navigateToEdit = this.navigateToEdit.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return{
            headerTitle: (
                <View style={{ flex: 1, marginTop: 0, ...ifIphoneX({ marginTop: -40 }, { marginTop: 0 })}}>
                  <Text style={{ alignSelf:'center', color:'#fff', fontSize:18, fontWeight:'bold'}}>NoteLy</Text>
                </View>
              ),
            headerRight: (
                <View>
                    <TouchableHighlight
                        onPress={() => params.handleEdit()}
                        underlayColor={'#444444'}
                        style={{paddingRight: 10}}>
                        <Text style={{color: '#ffffff', fontSize: 16}}>Edit</Text>
                    </TouchableHighlight>
                </View>
            )
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({
            handleEdit: this.navigateToEdit
        });
    }

    navigateToEdit(){
        console.log('this.props.navigation.state.params ',this.props.navigation.state.params);
        var {title, titledesc, favourite, hearted, notetype, month, year, hour, min, meridiem, date, index} = this.props.navigation.state.params;
        console.log('navigateToEdit title ',title);
        var noteObject = {
            title,titledesc,favourite,hearted,notetype,month,year,hour,min,meridiem,date,index
        }
        this.props.navigation.navigate('EditNote', noteObject);
    }

    render() {
        console.log('this.props.navigation.state.params ', this.props.navigation.state.params);
        var {title, titledesc, favourite, hearted, notetype, month, year, hour, min, meridiem, date, index} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
              <Text style={{color: '#000000', fontSize: 26}}>{title}</Text>
              <Text style={{color: '#000000', fontSize: 20}}>{titledesc}</Text>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    title: {
      fontSize: 26,
      textAlign: 'center',
      fontFamily: 'Cochin',
      fontWeight: 'bold',
      padding: 5,
    },
    titledesc: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Cochin',
    padding: 5,
    },
});

export default NoteDetail;