import React, {Component} from 'react'
import {View, Button, Picker, Image, Slider, Switch} from 'react-native'

export default class UserInterface extends Component {
    static navigationOptions = {
        title: 'UserInterface',
    };

    constructor(props) {
        super(props);
        this.state = {language : "java"}
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Button
                    title="Go to home's BasicComponents"
                    onPress={() =>
                      navigate('BasicComponents', { name: 'home' })
                    }
                />
                <Picker
                    selectedValue={this.state.language}
                    style={{height:50, width:200}}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
                >
                    <Picker.Item label="java" value="java"/>
                    <Picker.Item label="javascript" value="js"/>
                </Picker>
                <Image
                    style={{width: 66, height: 58}}
                    source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
                />
                <Slider>
                </Slider>
                <Switch/>
            </View>
        )
    }

}
