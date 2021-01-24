import React, { Component } from 'react';
import { TouchableOpacity, Text,View, StyleSheet, FlatList, RefreshControl, Modal,DeviceInfo} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../model/TimeSpan';

const TimeSpans = [new TimeSpan('今天', 'since=daily'), new TimeSpan('本周', 'since=weekly')]

export default class LtDialog extends Component {
    //初始化state 提供两种方式
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         visible: false,
    //     }
    // }
    state = {
        visible: true,
    };
    
    show(){
        this.setState({
            visible: true,
        })
    };
    
    dismiss() {
        this.setState({
            visible: false,
        })
    }

    render() {
        const {onClose, onSelect} = this.props;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={() => onClose}
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => this.dismiss()}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                    />
                    <View style={styles.content}>
                        {TimeSpans.map((item, i, arr) => {
                            console.log(item);
                            return <TouchableOpacity
                                onPress={() => onSelect(arr[i])}
                            >
                                <View style={styles.text_container}>
                                    <Text style={styles.Text}>{arr[i].showText}</Text>
                                    {
                                        i!==TimeSpans.length-1 ? 
                                        <View style={styles.line}/> : null
                                    }
                                </View>
                            </TouchableOpacity>
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    arrow: {
        marginTop: 40,
        color: 'white',
        padding: 0,
        margin: -15
    },
    content: {
        width:100,
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight:3,
    },
    text_container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})