import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    CheckBox
} from 'react-native-elements';

export default class DiaryDtlCheckBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            good : false,
            notBad : false,
            bad : false
        }
    }

     componentDidMount() {
        let good = this.props.code == 'good' ? true : false;
        let notBad = this.props.code == 'notBad' ? true : false;
        let bad = this.props.code == 'bad' ? true : false;

        this.setState({
            good : good,
            notBad : notBad,
            bad : bad
        })
     }

     setGood(){
         this.setState({
             good : !this.state.good,
             notBad : false,
             bad : false
         })
         //this.props.setCode('good');
     }

     setNotBad(){
          this.setState({
              good : false,
              notBad : !this.state.notBad,
              bad : false
          })
     }

     setBad(){
          this.setState({
              good : false,
              notBad : false,
              bad : !this.state.bad
          })
     }

    render(){
        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                <CheckBox
                    title='좋음'
                    size={20}
                    checkedColor={'#33cc33'}
                    containerStyle={styles.checkBox}
                    checked={this.state.good}
                    textStyle={{fontSize: 15, fontWeight:'100'}}
                    onPress={() => this.setGood(this)}
                />
                <CheckBox
                    title='보통'
                    size={20}
                    checkedColor={'#ff8c00'}
                    containerStyle={styles.checkBox}
                    checked={this.state.notBad}
                    textStyle={{fontSize: 15, fontWeight:'100'}}
                    onPress={() => this.setNotBad(this)}
                />
                <CheckBox
                    title='나쁨'
                    size={20}
                    checkedColor={'#ff471a'}
                    containerStyle={styles.checkBox}
                    checked={this.state.bad}
                    textStyle={{fontSize: 15, fontWeight:'100'}}
                    onPress={() => this.setBad(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    checkBox : {
        width:69,
        alignItems : 'center',
        backgroundColor:'white',
        margin:0,
        borderWidth:0
    }
})
