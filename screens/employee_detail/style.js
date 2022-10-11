import {
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

export default StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    safeAreaIOS: {
        backgroundColor: "#06283D"
    },
    statusBar: {
        width: width,
        height: StatusBar.currentHeight,
        backgroundColor: "#06283D"
    },
    titleBarContainer: {
        width: width,
        height: 61,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleBarContainerIos: {
        width: width,
        height: 61,
        backgroundColor: 'white',
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleBarText: {
        fontSize: 16,
        // fontFamily: Fonts.Roboto.RobotoBold,
        color: "black",
        lineHeight: 18.75,
    },
    arrowIcon: {
        position: 'absolute',
        left: 16,
        top: 19,
    },
    buttonChange:{
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#4CAB54',
        // fontFamily: Fonts.Roboto.RobotoRegular,
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
    },
    moviesList:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    imageItem: {
        width: 200,
        height: 300,
        borderRadius: 15,
    },
    

})