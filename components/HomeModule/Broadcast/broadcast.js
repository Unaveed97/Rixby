import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { GoogleSignin } from '@react-native-community/google-signin';
import * as firebase from 'firebase'
import * as Animatable from 'react-native-animatable'

import ReverseInternalHeader from '../../CommonModules/InternalHeader/reverseInternalHeader'
import UploadPictures from '../../CommonModules/UploadPictures/uploadPictures';
import DescriptionSection from '../../CommonModules/DescriptionSection/descriptionSection'
import PostButton from '../../CommonModules/PostButton/postButton';
import SelectedImage from '../../CommonModules/SelectedImage/selectedImage'
import DialogBox from '../../CommonModules/DialogBox/dialogBox'
import CategoryRadioButtons from '../../CommonModules/CategoryRadioButton/categoryRadioButton'

export default class Broadcast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imagePath: null,
      description: '',
      category:'',
      formEmptyDialog: false
    }
    this.initState = this.state
  }

  isFormEmpty = () => {
    if (this.state.imagePath && this.state.description != '' && this.state.category)
      return false
    this.setState({ formEmptyDialog: true })
    return true
  }

  broadcast = async () => {
    if (!this.isFormEmpty()) {
      let uid;
      var userId = await firebase.auth().currentUser.uid;
      const googleUserId = await GoogleSignin.getCurrentUser().uid;
      if (userId)
        uid = userId
      else if (googleUserId)
        uid = googleUserId
      let broadcastObj={'uid':uid, 'Description':this.state.description, 'Category':this.state.category}
      await firebase.firestore().collection('Broadcasts').doc().set(broadcastObj).then(docRef => {
        //get all the marketeer of the selected category and send them the broadcast
      })
      this.props.navigation.navigate('Dashboard')
    }
  }

  render() {
    let img;
    if (this.state.imagePath)
      img = <SelectedImage resetParent={() => this.setState({ imagePath: null })} flexSize={4} filepath={this.state.imagePath} />
    else
      img = <UploadPictures flexSize={4} updateParent={(img) => this.setState({ imagePath: img })} />
    return (
      <Animatable.View animation={'slideInRight'} duration={400} style={{ flex: 1 }}>
        <DialogBox resetState={() => this.setState({ formEmptyDialog: false })} showDialog={this.state.formEmptyDialog} title={'Broadcast Failed'} description={'Please upload a picture and enter the description order to continue'} />
        <ReverseInternalHeader name={'Broadcast'} flexSize={1.5} action={() => { this.setState(this.initState); this.props.navigation.navigate('Dashboard') }} />
        {img}
        <CategoryRadioButtons flexSize={3} value={this.state.category} updateParent={(val) => this.setState({category:val})} />
        <DescriptionSection value={this.state.description} label={'Description'} height={responsiveHeight(20)} updateParent={(text) => this.setState({ description: text })} flexSize={4} />
        <PostButton flexSize={2} buttonText={'BROADCAST'} action={this.broadcast} />
      </Animatable.View>
    )
  }
}