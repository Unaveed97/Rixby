import React, { Component } from 'react'
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet
} from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import DefaultAdCard from '../../CommonModules/DefaultAdCard/defaultAdCard'

export default class HouseAd extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
          <DefaultAdCard
            updateAdList={() => console.log('no need to update')}
            updateReviews={() => console.log('no need to update')}
            radius={responsiveHeight(3)}
            thumbnailWidth={responsiveWidth(52.5)}
            width={responsiveWidth(54)}
            type={'test'}
            action={() => console.log('card press')}
            enableDelete={true}
            onDeletePress={() => console.log('ahah')}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  price: {
    fontSize: responsiveFontSize(3),
    color: '#008080',
    fontWeight: 'bold'
  },
  title: {
    fontSize: responsiveFontSize(3.5),
    color: 'black',
    fontWeight: 'bold'
  }
});  