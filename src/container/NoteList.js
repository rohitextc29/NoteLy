import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, Modal, Alert, Dimensions, FlatList} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import CheckBox from 'react-native-check-box';
import NoteItem from '../component/NoteItem';

const { width, height } = Dimensions.get('window');

const mapStateToProps = (state) => {
    console.log('mapStateToProps state ',state);
	const { notelist } = state;
	return { notelist }
};

const filterCheck = [
    {
        title: 'Hearted',
        value: 'heart'
    },
    {
        title: 'Favourite',
        value: 'favourite'
    },
    {
        title: 'Poems',
        value: 'poem'
    },
    {
        title: 'Story',
        value: 'story'
    }
];

const mapDispatchToProps = (dispatch) => {};

function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }
  
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
      return false;
    }
  
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
  
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }
    return true;
}

function shallowCompare(instance, nextProps, nextState) {
    return !shallowEqual(instance.props, nextProps);
}

class NoteList extends Component{
    constructor(props){
        super(props);
        this.state = {
            filterVisible: false,
            filteredArray: [],
            list: []
        }
        this.toggleFilterModal = this.toggleFilterModal.bind(this);
    }

    toggleFilterModal() {
        this.setState({filterVisible: !this.state.filterVisible});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps ', nextProps);
        this.setState({list: nextProps.notelist.list});
    }

    componentDidMount() {
        this.props.navigation.setParams({
            handleThis: this.toggleFilterModal
        });
        this.setState({list: this.props.notelist.list});
    }
    
    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;
        return{
            headerTitle: (
                <View style={{ flex: 1, marginTop: 0, ...ifIphoneX({ marginTop: -40 }, { marginTop: 0 })}}>
                  <Text style={{ alignSelf:'center', color:'#fff', fontSize:18, fontWeight:'bold'}}>NoteLy</Text>
                </View>
              ),
            headerLeft: (
                <TouchableHighlight
                    onPress={() => navigation.navigate('EditNote', {screenType: 'new'})}
                    underlayColor={'#444444'}
                    style={{paddingLeft: 10}}
                    >
                        <View style={{flexDirection: 'row',borderRadius: 8,
                        borderWidth: 0.5,
                        borderColor: '#d6d7da'}}>
                            <SimpleLineIcons name="plus" size={20} color="#fff" />
                            <Text style={{color: '#ffffff', fontSize: 18}}>Add Note</Text>
                        </View>
                </TouchableHighlight>
            ),
            headerRight: (
                <TouchableHighlight
                    onPress={() => params.handleThis()}
                    underlayColor={'#444444'}
                    style={{flexDirection: 'row', paddingRight: 10}}>
                    <Foundation name="filter" size={20} color="#fff" />
                </TouchableHighlight>
            )
        }
    };
    
    // static navigationOptions = ({ navigation }) => ({
    //     headerTitle: (
    //       <View style={{ flex: 1, marginTop: 0, ...ifIphoneX({ marginTop: -40 }, { marginTop: 0 })}}>
    //         <Text style={{ alignSelf:'center', color:'#fff', fontSize:18, fontWeight:'bold'}}>WHO ROAD SAFETY</Text>
    //       </View>
    //     )
    //   });

    _renderItem = (item, index) => (
        <NoteItem
          item={item}
          index={index}
          navigation={this.props.navigation}
        />
      );

      _keyExtractor = (item, index) => index;

    render() {
        console.log('this.props ', this.props);
        console.warn('this.state ',this.state);
        const { list } = this.props.notelist;
        console.log('list ',list);
        return (
          <View style={styles.container}>
          <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.filterVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          >
          <View style={{marginTop: 22, width: (width/2) - 10, flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'space-between', alignSelf: 'flex-end'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, flexWrap: 'wrap'}}>
              <Text style={{color: '#ffffff', fontSize: 18}}>Filter</Text>
              <TouchableHighlight
                onPress={() => this.toggleFilterModal()}
                underlayColor={'#444444'}
                >
                <Foundation name="x" size={20} color="#fff" />
            </TouchableHighlight>
            </View>
            <View>
                {
                    filterCheck.map((filter) => {
                        return(
                            <CheckBox
                                style={{flex: 1, padding: 10}}
                                onClick={()=>{
                                this.setState({
                                    isChecked:!this.state.isChecked
                                })
                                }}
                                isChecked={this.state.isChecked}
                                leftText={"CheckBox"}
                            />
                        );
                    })
                }
            </View>
            <View style={{backgroundColor: 'red'}}>
            <TouchableHighlight
                onPress={() => this.toggleFilterModal()}
                underlayColor={'#444444'}
                style={{alignItems: 'center'}}>
                <Text style={{color: '#ffffff', fontSize: 18}}>Apply</Text>
            </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <FlatList
            data={list}
            renderItem={({item, index}) => this._renderItem(item, index)}
            extraData={this.state}
        />      
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
});

export default connect(mapStateToProps) (NoteList);