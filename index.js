var React = require('react-native');

var {
    PixelRatio,
    View,
    Animated,
    TouchableOpacity,
    } = React;

var TouchableRipple = React.createClass({

    getInitialState(){

        return {wrapStyle: {}};

    },

    componentWillMount(){
        this.animate = new Animated.Value(0);
        this.srcViewSize = {width: 0, height: 0}
    },

    _onPress(e){
        this.animate.setValue(0);
        //this.setState({wrapStyle:{}});
        this.props.onPress && this.props.onPress(e);
    },
    _onPressIn(e){
        //this.setState({wrapStyle: this._wrapStyle(e.nativeEvent)});
        //this._rippe();

        this.refs.res.measure((ox, oy, width, height, px, py)=> {
            this.srcViewSize = {ox, oy, width, height, px, py};
            this.setState({wrapStyle: this._wrapStyle(e.nativeEvent)});
            this._rippe();
        });


        this.props.onPressIn && this.props.onPressIn(e);
    },
    _onPressOut(e){
        this.animate.setValue(0);
        //this.setState({wrapStyle:{}});
        this.props.onPressOut && this.props.onPressOut(e);
    },
    _onLayout(e){
        //{nativeEvent: {layout: {x, y, width, height}}}

        //this.srcViewSize = e.nativeEvent.layout;
        //this.refs.res.measure((ox, oy, width, height, px, py)=> {
        //    this.srcViewSize ={ox, oy, width, height, px, py};
        //});


    },

    _rippe(){
        Animated.timing(
            this.animate,
            {
                toValue: 1,
                duration: this.props.durationTime || 200
            }
        ).start(()=> {

                //let style={
                //    sty
                //}
                //
                //this.setState({wrapStyle:this.props.style})
            })
    },

    _wrapStyle(location){

        if (location == null) {
            return;
        }

        let {pageY,pageX}=location;


        let descStyle = {
            width: this.srcViewSize.width,
            height: this.srcViewSize.height,
            borderRadius: this.props.style.borderRadius || 0,
        };

        console.log("_wrapStyle", location.touches[0])

        //return {
        //    top:0,
        //    left:locationX,
        //    width:200,
        //    height:50,
        //    backgroundColor:'#ff0000'
        //}

        let startY = pageY - this.srcViewSize.py;
        let startX = pageX - this.srcViewSize.px;
        let startRadius = Math.max(descStyle.height, descStyle.width);
        //console.log("startX", startX, "startY", startY, this.srcViewSize.width / 2, this.srcViewSize.height / 2)
        //let centerX = startX > this.srcViewSize.width / 2 ? startX : this.srcViewSize.width - startX;
        //let centerY = startY > this.srcViewSize.height / 2 ? startY : this.srcViewSize.height - startY;


        //let circleSize = Math.max(centerX * 3, centerY * 3);
        //let radius = circleSize / 2;

        return {
            top: this.animate.interpolate({
                inputRange: [0, 1],
                outputRange: [startY - descStyle.height / 2, 0]

            }),
            left: this.animate.interpolate({
                inputRange: [0, 1],
                outputRange: [startX, 0]

            }),
            width: this.animate.interpolate({
                inputRange: [0, 1],
                outputRange: [0, descStyle.width]

            }),
            height: this.animate.interpolate({
                inputRange: [0, 1],
                outputRange: [descStyle.height, descStyle.height]

            }),


            borderRadius: this.animate.interpolate({
                inputRange: [0, 1],
                outputRange: [startRadius, descStyle.borderRadius]
            }),
        }

        //return {
        //    top: startY - centerY * 3 / 2,
        //        left: this.animate.interpolate({
        //        inputRange: [0, 1],
        //        outputRange: [startX, startX - radius]
        //
        //    }),
        //        width: this.animate.interpolate({
        //        inputRange: [0, 1],
        //        outputRange: [0, center]
        //
        //    }),
        //        height: centerY * 3,
        //
        //
        //        borderRadius: this.animate.interpolate({
        //        inputRange: [0, 1],
        //        outputRange: [0, center]
        //    }),
        //}
    },

    render(){


        let bgColor = this.props.underlayColor || "#000000";
        let alpha = this.props.activeOpacity || 0.5;

        return <TouchableOpacity activeOpacity={1} onPress={this._onPress}
                                 onPressIn={this._onPressIn} onPressOut={this._onPressOut}>

            <View ref="res" onLayout={this._onLayout} style={[this.props.style,{overflow:'hidden'}]}>

                {
                    this.props.children
                }
                {
                    <Animated.View
                        style={[{position:'absolute',opacity:alpha,backgroundColor:bgColor},this.state.wrapStyle]}></Animated.View>
                }
            </View>
        </TouchableOpacity>;

    }
})

module.exports = TouchableRipple;