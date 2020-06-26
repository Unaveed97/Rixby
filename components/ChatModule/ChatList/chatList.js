import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { responsiveHeight, responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../CommonModules/MainHeader/mainHeader'

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "Jawad Hussain",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Abdul Moeez",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Aima Biag",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "Ali Masood",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "Hania Amir",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "Danish Khattak", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "Adeel Shabir", status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "Asfar Ali",    status:"active", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "Sameed Ahmed",  status:"active", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "Meesum Raza",   status:"active", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
      ]
    };
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat')}>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.mblTxt}>Mobile</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
        <MainHeader flexSize={0.9} enableSearch={true} searchAction={() => this.props.navigation.navigate('Search')}/>

        <View style={{ flex: 7.2 }} >
          <FlatList 
            extraData={this.state}
            data={this.state.calls}
            keyExtractor = {(item) => {
              return item.id;
            }}
            renderItem={this.renderItem}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius:50,
    width:responsiveWidth(90),
    height:responsiveHeight(6)
  },
  searchIcon: {
    paddingLeft:responsiveWidth(2),
  },
  input: {
    flex: 1,
    fontSize:responsiveFontSize(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingHorizontal:responsiveWidth(1.5),
    paddingVertical:responsiveHeight(1.5)
  },
  pic: {
    borderRadius: responsiveHeight(100),
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    resizeMode:'contain',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(80),
  },
  nameTxt: {
    marginLeft: responsiveWidth(4),
    fontWeight: '600',
    color: '#222',
    fontSize: responsiveFontSize(2.5),
    width:responsiveWidth(50),
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: responsiveFontSize(1.5),
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: responsiveFontSize(1.5),
    marginLeft: responsiveWidth(4),
  }
}); 