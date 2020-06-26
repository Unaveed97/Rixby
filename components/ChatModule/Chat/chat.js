import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit amet"},
        {id:2, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit amet"} ,
        {id:3, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:4, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:5, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:6, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"}, 
        {id:7, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"}, 
        {id:8, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
        {id:9, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
      ]
    };
  }

  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {date}
      </Text>
    );
  }

  render() {

    return (
      <View style={{ flex: 1 }}  >
      <LinearGradient start={{x: 0, y: 0}} end={{x:1.3, y: 0}} colors={['#008080', '#4c516d']} style={styles.gradient}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatList')} style={{paddingHorizontal:responsiveWidth(3), flex:1}}>
              <FontAwesome5 name={'arrow-left'} color={'#ffffff'} size={responsiveHeight(4)}/>
          </TouchableOpacity>
          <View style={{flexDirection:'row', flex:2, alignItems:'center'}}>
          <Image style={styles.iconCat} source={require('../../../Images/37.png')}/>
          </View>
          <View style={{flex:8, justifyContent:'center'}}>
          <Text style={{ fontSize:responsiveFontSize(2.5), color:'white', paddingHorizontal:responsiveWidth(2)}}>Jawad Hussain</Text>
          </View>
  </LinearGradient>
      <View style={styles.container}>
       
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={(message) => {
            console.log(item);
            const item = message.item;
            let inMessage = item.type === 'in';
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
                {!inMessage && this.renderDate(item.date)}
                <View style={[styles.balloon]}>
                  <Text>{item.message}</Text>
                </View>
                {inMessage && this.renderDate(item.date)}
              </View>
            )
          }}/>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'
                onChangeText={(name_address) => this.setState({name_address})}/>
          </View>

            <TouchableOpacity style={styles.btnSend}>
            <FontAwesome  name={'send'} color={'white'} size={responsiveHeight(3)}/>
            </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient:{
    flex:1,
    alignItems:'center',
    position:'relative', 
    zIndex:1,
    flexDirection:'row'
    },
    image:{
    backgroundColor:'white',
    height:responsiveHeight(7),
    width:responsiveWidth(14),
    borderRadius:50,

    },
    iconCat: {
    height:responsiveHeight(7),
    width:responsiveWidth(14),
    borderRadius:50,
    },
    container:{
        flex:9
    },
    list:{
        paddingHorizontal: 17,
    },
    footer:{
        flexDirection: 'row',
        justifyContent:'center',
        height:responsiveHeight(10),
        backgroundColor: '#eeeeee',
        padding:5,
        alignItems:'center',
    },
    btnSend:{
        backgroundColor:"#008080",
        height:responsiveHeight(6),
        width:responsiveWidth(12),
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    iconSend:{
        width:30,
        height:30,
        alignSelf:'center',

    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        padding:1,
        height:responsiveHeight(7),
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
    },
    inputs:{
        height:responsiveHeight(7),
        padding:5,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
    },
    itemIn: {
        alignSelf: 'flex-start'
    },
    itemOut: {
        alignSelf: 'flex-end'
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize:12,
        color:"#808080",
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor:"#eeeeee",
        borderRadius:300,
        padding:5,
    },
});  