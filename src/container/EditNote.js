import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Dimensions, TouchableHighlight} from 'react-native';
// import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import RadioGroup from 'react-native-radio-buttons-group';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { EDIT_NOTE, ADD_NOTE } from '../reducer/notelist';

const { width, height } = Dimensions.get('window');

class EditNote extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            titledesc: '',
            notetype: 'poem',
            favourite: false,
            hearted: false,
            radioButtons: [
                {
                  label: 'Poem',
                  value: 'poem',
                  checked: true,
                  color: '#484',
                  size: 14
                },
                {
                  label: 'Story',
                  value: 'story',
                  size: 14,
                  checked: false,
                  color: '#484',
                }
              ]
        }
        this.undoChanges = this.undoChanges.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
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
                <View style={{flexDirection: 'row'}}>
                    { params.screenType === undefined ?
                        <TouchableHighlight
                        onPress={() => params.handleUndo()}
                        underlayColor={'#444444'}
                        style={{paddingRight: 20}}>
                        <Text style={{color: '#ffffff', fontSize: 16}}>Undo</Text>
                    </TouchableHighlight> : null}
                    <TouchableHighlight
                        onPress={() => params.handleSave()}
                        underlayColor={'#444444'}
                        style={{paddingRight: 10}}>
                        <Text style={{color: '#ffffff', fontSize: 16}}>Save</Text>
                    </TouchableHighlight>
                </View>
            )
        }
    };

    saveChanges() {
        console.warn('saveChanges this.state ',this.state);
        var dateObject = new Date();
        var date = dateObject.getDate();
        var month = dateObject.getMonth();
        var year = dateObject.getFullYear();
        var hour = dateObject.getHours();
        var min = dateObject.getMinutes();
        var meridiem = 'AM';
        if(hour >= 12){
            meridiem = 'PM';
        }
        var noteObject = {
            title: this.state.title,
            titledesc: this.state.titledesc,
            favourite: this.state.favourite,
            hearted: this.state.hearted,
            notetype: this.state.notetype,
            month,
            year,
            hour,
            min,
            meridiem,
            date
        }
        if(this.props.navigation.state.params.screenType !== undefined){
            // add
            store.dispatch({type: ADD_NOTE, noteObject});
        }else{
            // update
            store.dispatch({type: EDIT_NOTE, noteObject, index: this.props.navigation.state.params.index});
        }
        this.props.navigation.navigate('NoteList');
    }

    undoChanges() {
        console.warn('undoChanges this.state ',this.state);
        var {title, titledesc, favourite, hearted, notetype} = this.props.navigation.state.params;
        this.setState({
            title,
            titledesc,
            favourite,
            hearted,
            notetype,
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleSave: this.saveChanges,
            handleUndo: this.undoChanges,
        });
        var screenType = this.props.navigation.state.params.screenType;
        if(screenType == undefined){
            // console.log('componentDidMount this.props.navigation.state.params ',this.props.navigation.state.params);
            var {title, titledesc, favourite, hearted, notetype} = this.props.navigation.state.params;
            this.setState({
                title,
                titledesc,
                favourite,
                hearted,
                notetype,
            });
        }
    }

    onSelect(index, value){
        this.setState({
            notetype: value
        })
      }

    render() {
        // console.log('this.props ', this.props);
        
        return (
          <View style={styles.container}>
          <Text style={{fontSize: 20}}>This is a</Text>
          <RadioGroup 
            color='#484'
            labelStyle={{fontSize: 14}}
            radioButtons={this.state.radioButtons}
            onPress={radioButtons => this.setState({radioButtons})}
            flexDirection='row'
            />
            <TextInput
                style={{height: height/4, borderColor: 'gray', borderWidth: 1, fontSize: 26}}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                placeholder='Enter title'
            />
            <TextInput
                style={{height: height/2, borderColor: 'gray', borderWidth: 1, fontSize: 20}}
                onChangeText={(titledesc) => this.setState({titledesc})}
                value={this.state.titledesc}
                placeholder='Enter description'
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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

export default EditNote;