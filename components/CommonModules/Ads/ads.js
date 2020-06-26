import React, { Component } from 'react'
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  YellowBox,
  KeyboardAvoidingView
} from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ImageView from "react-native-image-viewing";

import AdHeading from '../AdHeading/adHeading'
import AdHeader from '../AdHeader/adHeader'
import StickyHeader from '../AdStickyHeader/adStickyHeader'
import AdFooter from '../AdFooter/adFooter'
import AdDescription from '../AdDescription/adDescription'
import RatingAndReviewCard from '../RatingAndReviewCard/ratingAndReviewCard'
import UserRatingAndReview from '../UserRatingAndReview/userRatingAndReview'
import DefaultAdCard from '../DefaultAdCard/defaultAdCard'
import RatingButton from '../RatingButton/ratingButton'
import FeatureSection from '../InAdFeatureSection/inAdFeatureSection'
import LocationViewer from '../LocationViewer/locationViewer'

import { getUserFirestoreObj, getFirestoreUserByUid } from '../../Utility/utility'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class HouseAd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      features: null, pageType: this.props.navigation.getParam('pageType'),
      ratingsAndReviews: this.props.navigation.getParam('reviewObj'),
      userFirestoreObj: null,
      adUserFirestoreObj: null,
      userReviewObj: this.props.navigation.getParam('myReview'),
      adObj: this.props.navigation.getParam('adObj')
    }
    this.updateParentReviews = this.props.navigation.getParam('updateReviews')
    this.updateAdList = this.props.navigation.getParam('updateAdList')
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.disableYellowBox = true;
  }

  componentWillMount = async () => {
    if (!this.updatePrentReviews)
      this.updatePrentReviews = () => console.log('updateParentReview()')
    if (!this.updateAdList)
      this.updateAdList = () => console.log('updateAdList()')
    await getUserFirestoreObj().then(user => this.setState({ userFirestoreObj: user[1] }))
    await getFirestoreUserByUid(this.state.adObj['uid']).then(async user => {
      this.setState({ adUserFirestoreObj: user[1] })
    }).catch(err => console.log(err))
  }

  updateRating = (obj, type) => {
    if (this.state.pageType != 'normal')
      return
    let tempArr = this.state.ratingsAndReviews
    if (type == 'add') {
      tempArr.unshift(obj)
    }
    else if (type == 'delete') {
      tempArr = tempArr.filter(ele => { return ele.reviewID != obj.reviewID })
    }
    else if (type == 'edit') {
      tempArr = tempArr.filter(ele => { return ele.reviewID != obj.reviewID })
      tempArr.unshift(obj)
    }
    this.setUserReviewObj(obj, type)
    this.setState({ ratingsAndReviews: tempArr })
  }

  setUserReviewObj = (obj, type) => {
    if (type == 'edit' || type == 'add') {
      if (obj.reviewData.userID == this.state.userFirestoreObj.userID)
        this.setState({ userReviewObj: obj })
    }
    else if (type == 'delete')
      this.setState({ userReviewObj: null })
  }

  renderImage = () => {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => this.setState({ displayImage: true })}>
          <Image source={{ uri: this.state.adObj["imageUrl"], width: responsiveWidth(100), height: responsiveHeight(35) }} />
        </TouchableWithoutFeedback>
      </View>
    )
  }

  renderRatingAndReviewSection = () => {
    return (
      <View style={{ flex: 1 }}>
        <AdHeading fontSize={3} name={'Ratings and Reviews'} margin={responsiveHeight(2)} />
        <RatingAndReviewCard reviewObj={this.state.ratingsAndReviews} />
        <FlatList
          data={this.state.ratingsAndReviews.slice(0, 2)}
          extraData={this.state.ratingsAndReviews.slice(0, 2)}
          renderItem={({ item }) =>
            <UserRatingAndReview
              name={item.reviewData.name}
              rating={item.reviewData.rating}
              review={item.reviewData.review}
              imageUrl={item.reviewData.imageUrl}
              date={item.reviewData.date}
              reviewID={item.reviewID}
              userID={item.reviewData.userID}
            />}
          keyExtractor={item => item.reviewID}
        />
        <Text onPress={() => this.props.navigation.navigate('RatingsAndReviews', { ratingsAndReviews: this.state.ratingsAndReviews })} style={{ marginVertical: responsiveHeight(2), color: '#008080', fontWeight: 'bold', fontSize: responsiveFontSize(2.2) }}>See all reviews</Text>
      </View>
    )
  }

  onBackPress = async () => {
    if (this.state.pageType == 'normal') {
      await this.updateParentReviews()
    }
    this.props.navigation.goBack()
  }

  onChatPress = () => {
    this.props.navigation.navigate('Chat', { adUser: this.state.adUserFirestoreObj })
  }

  render() {
    let number = "", ratingAndReviewSection = null;
    if (this.state.adUserFirestoreObj)
      number = this.state.adUserFirestoreObj["phoneNumber"]
    if (this.state.ratingsAndReviews.length)
      ratingAndReviewSection = this.renderRatingAndReviewSection()
    else
      ratingAndReviewSection = null
    return (
      <View style={{ flex: 1 }}>

        <Modal presentationStyle={'overFullScreen'} visible={this.state.displayImage} transparent={false}>
          <ImageView images={[{ uri: this.state.adObj["imageUrl"] }]} imageIndex={0} visible={this.state.displayImage} onRequestClose={() => this.setState({ displayImage: false })} presentationStyle={'overFullScreen'} animationType={'fade'} />
        </Modal>

        <Modal visible={!this.state.displayImage} style={{ flex: 1 }} presentationStyle={'fullScreen'}>
          <View style={{ flex: 12 }}>
            <ParallaxScrollView
              ref={ref => this.scrollListReftop = ref}
              parallaxHeaderHeight={responsiveHeight(35)}
              stickyHeaderHeight={responsiveHeight(8)}
              renderForeground={this.renderImage}
              renderStickyHeader={() =>
                <StickyHeader
                  action={this.onBackPress}
                  scrollToTop={() => this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: true })}
                />}
            >
              <View style={{ flex: 1, paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(2) }}>
                <AdHeader type={this.state.adObj["Type"]} adID={this.state.adObj["adID"]} price={this.state.adObj["Price"]} title={this.state.adObj["Title"]} />

                <AdHeading fontSize={3} name={'Description'} margin={responsiveHeight(1)} />
                <AdDescription description={this.state.adObj["Description"]} />

                <FeatureSection adObj={this.state.adObj} />

                <RatingButton
                  updateParent={this.updateRating}
                  adID={this.state.adObj["adID"]}
                  reviewObj={this.state.userReviewObj}
                />

                {ratingAndReviewSection}

                <AdHeading fontSize={3} name={'Location'} margin={responsiveHeight(1)} />
                <LocationViewer height={responsiveHeight(30)} width={responsiveWidth(90)} latlong={this.state.adObj['Location']} />

              </View>
            </ParallaxScrollView>
          </View>

          <AdFooter
            onChatPress={this.onChatPress}
            phoneNumber={number}
            enableOutlet={this.state.adObj['outletID']}
            enableDelivery={this.state.adObj['Deliverable']}
            flexSize={1}
          />

        </Modal>
      </View>
    )
  }
}





/*<AdHeading fontSize={3} name={'Recommendations'} margin={responsiveHeight(2)} />
                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
                <DefaultAdCard radius={responsiveHeight(2.9)} margin={responsiveHeight(2)} thumbnailWidth={responsiveWidth(85)} width={responsiveWidth(86)} name={'Ace Hardware'} price={'25000'} rating={'3.4'} cover={require('../../../Images/st.jpg')} />
              */