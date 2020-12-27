import * as React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
   
   constructor(){
       super();
       this.state = {
           hasCameraPermissions : null,
           scanned : false,
           scannedData : '',
           buttonState : 'normal'
       }
   }

   getCameraPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions : status === 'granted',
            buttonState : 'clicked',
            scanned : false
        })
   }

   handleBarCodeScanned = async ({type,data}) => {
        this.setState({
            scanned : true,
            scannedData : data,
            buttonState : 'normal'
        })
   }

    render(){

        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;   
        const buttonState = this.state.buttonState;   

        if(buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner
                style = {StyleSheet.absoluteFillObject}
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                />
            )
        }
        else if(buttonState === "normal"){
            return(
                <View style = {styles.container}>
                <Image
                    style = {{
                    width : 150,
                    height : 150,
                    marginLeft : 70,
                    marginTop : 10,
                    marginBottom : 50
                    }}

                    source = {require('../assets/Barcode-.jpg')}
                />
                <Text style = {styles.displayText2}> Bar Code Scanner </Text>
                <Text style = {styles.displayText}> 
                {hasCameraPermissions === true ? this.state.scannedData : 'Requesting For Camera Permissions'} </Text>

                <TouchableOpacity style = {styles.scanButton}
                onPress = {this.getCameraPermission}
                title = "Bar Code Scanner"
                >
                    <Text style = {styles.buttonText} > Scan QR Code </Text>
                </TouchableOpacity>
            </View>
            )
                }
        }
}

const styles = StyleSheet.create({
    container : {
        alignSelf : 'center',
        justifyContent : 'center',
        flex : 1
    },

    displayText : {
        fontSize : 20,
        textDecorationLine : 'underline',
        justifyContent : 'center',
        alignSelf : 'center'
    },

    displayText2 : {
        fontSize : 30,
        alignSelf : 'center'
    },


    scanButton : {
        backgroundColor : 'blue',
        margin : 20,
        width : 250,
        height : 50
    },
    buttonText : {
        color : 'white',
        fontSize : 20,
        alignSelf : 'center'
    },
    
})