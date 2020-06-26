import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Navbar from './navbar'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MainHeader from '../../CommonModules/MainHeader/mainHeader'
import { FloatingAction } from "react-native-floating-action";

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <TouchableOpacity>
        <View style={styles.menuBoxCat}>
          <Image style={styles.iconCat} source={this.props.logo} />
          <Text style={styles.info}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filePath: {},
    };
    this.actions = [
      {
        text: "New Electronic Device",
        icon: <MaterialIcons name={'speaker'} color={'white'} size={responsiveHeight(3)} />,
        name: "Electronic Device",
        position: 2,
        color: '#008080',
        textBackground: '#4c516d',
        textColor: 'white'
      },
      {
        text: "New Hardware",
        icon: <Octicons name={'tools'} color={'white'} size={responsiveHeight(2.6)} />,
        name: "Hardware",
        position: 1,
        color: '#008080',
        textBackground: '#4c516d',
        textColor: 'white'
      },
      {
        text: "New House",
        icon: <Ionicons name={'ios-home'} color={'white'} size={responsiveHeight(3)} />,
        name: "NewHouseAd",
        position: 3,
        color: '#008080',
        textBackground: '#4c516d',
        textColor: 'white'
      },
      {
        text: "New Vehicle",
        icon: <Fontisto name={'car'} color={'white'} size={responsiveHeight(3)} />,
        name: "NewVehicleAd",
        position: 4,
        color: '#008080',
        textBackground: '#4c516d',
        textColor: 'white'
      }
    ];
  }

  gotoAd = (adObj, reviewObj, myReview, updateReviews, pageType) => {
    this.props.navigation.navigate('Ads', {
      'adObj': adObj,
      'reviewObj': reviewObj,
      'myReview': myReview,
      'updateReviews':updateReviews,
      'pageType':pageType,
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ParallaxScrollView
          backgroundColor="white"
          contentBackgroundColor="transparent"
          parallaxHeaderHeight={responsiveHeight(30)}
          stickyHeaderHeight={responsiveHeight(9.9)}
          contentContainerStyle={{ flex: 1 }}
          renderForeground={() => (
            <View style={{ flex: 1, justifyContent: 'center', paddingVertical: responsiveHeight(1), marginTop: responsiveHeight(10) }}>
              <Text style={styles.categoriesHeading}>Categories</Text>
              <View style={{ flexDirection: 'row', flex: 4, alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Category name={'Vehicles'} logo={require('../../../Images/35.png')} />
                <Category name={'Houses'} logo={require('../../../Images/36.png')} />
                <Category name={'Electronics'} logo={require('../../../Images/37.png')} />
                <Category name={'Hardware'} logo={require('../../../Images/38.png')} />
              </View>
            </View>
          )}
          renderFixedHeader={() => (
            <MainHeader
              flexSize={1}
              enableBroadcast={true}
              enableSearch={true}
              broadcastAction={() => this.props.navigation.navigate('Broadcast')}
              searchAction={() => this.props.navigation.navigate('Search')}
            />
          )}
        >
          <View style={{ flex: 1 }}>
            <Navbar screenProps={{ 'navFun': this.gotoAd }} />
          </View>

        </ParallaxScrollView>

        <FloatingAction
          buttonSize={responsiveHeight(8)}
          style={styles.floatingDock}
          color={'#008080'}
          actions={this.actions}
          onPressItem={name => {
            if (name == 'Electronic Device' || name == 'Hardware')
              this.props.navigation.navigate('NewElectronicHardwareAd', { 'category': name })
            else
              this.props.navigation.navigate(name)
          }}
          distanceToEdge={responsiveWidth(5)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  floatingDock: {
    backgroundColor: '#008080',
    position: 'absolute',
    width: responsiveWidth(14.5),
    height: responsiveHeight(7.5),
    borderRadius: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
    top: responsiveHeight(80),
    left: responsiveWidth(81),
  },
  floatingDockContent: {
    backgroundColor: '#008080',
    position: 'absolute',
    width: responsiveWidth(14.5),
    height: responsiveHeight(7.5),
    borderRadius: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesHeading: {
    flex: 1,
    paddingLeft: responsiveWidth(4),
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#008080'
  },
  menuBoxCat: {
    backgroundColor: "white",
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: .2,
    borderRadius: 50,
    shadowOffset: {
      height: 2,
      width: -2
    },
    elevation: 4,
  },
  iconCat: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
  },
  info: {
    paddingVertical: responsiveHeight(0.5),
    fontSize: responsiveFontSize(1.5),
  },
})