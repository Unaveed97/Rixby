import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Linking,
    KeyboardAvoidingView
} from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class AdFooter extends Component {
    constructor(props) {
        super(props)
    }

    styles = StyleSheet.create({
        iconContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    renderDelivery = () => {
        return (
            <TouchableOpacity style={[this.styles.iconContainer, { backgroundColor: '#006666' }]}>
                <MaterialCommunityIcons name={'truck-delivery'} color={'white'} size={responsiveHeight(4.5)} />
            </TouchableOpacity>
        )
    }

    renderOutlet = () => {
        return (
            <TouchableOpacity style={[this.styles.iconContainer, { backgroundColor: '#004c4c' }]}>
                <MaterialIcons name={'store'} color={'white'} size={responsiveHeight(4.5)} />
            </TouchableOpacity>
        )
    }

    render() {
        let delivery, outlet;
        if (this.props.enableDelivery)
            delivery = this.renderDelivery()
        if (this.props.enableOutlet != '')
            outlet = this.renderOutlet()
        return (
            <KeyboardAvoidingView style={{ flex: this.props.flexSize, flexDirection: 'row' }}>
                {outlet}
                {delivery}
                <TouchableOpacity onPress={this.props.onChatPress} style={[this.styles.iconContainer, { backgroundColor: '#008080' }]}>
                    <MaterialIcons name={'chat'} color={'white'} size={responsiveHeight(4.5)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${this.props.phoneNumber}`)} style={[this.styles.iconContainer, { backgroundColor: '#66b2b2' }]}>
                    <Ionicons name={'ios-call'} color={'white'} size={responsiveHeight(4.5)} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}