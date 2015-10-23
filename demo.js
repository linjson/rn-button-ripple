var React = require('react-native');
var TouchableRipple=require('react-native-touchable-ripple')
var {
    PixelRatio,
    View,
    Animated,
    TouchableOpacity,
    } = React;


var test=React.createClass({
    render(){
        return <View>
            <TouchableRipple activeOpacity={0.4} underlayColor={"red"} durationTime={200} onPress={} onPressIn={} onPressOut={}>
                <Text style={{height:100}}>Click</Text>
            </TouchableRipple>
        </View>
    }
})



module.exports = TouchableRipple;