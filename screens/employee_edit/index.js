import React, { Component, useEffect, useState } from 'react';
import {
    Text,
    Image,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
    TextInput,
    StyleSheet,
    ToastAndroid
} from 'react-native';
import styles from "./style";
import { Divider } from 'react-native-paper'
import { currency } from '../currency_formater';
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


function EditEmployee({ navigation }) {
    const arrDetail = navigation.getParam('arrayEmp')
    const [name, setName] = useState( arrDetail[0].name)
    const [addr, setAddr] = useState(arrDetail[0].address)
    const [bday, setBday] = useState(new Date)
    const [nik, setNik] = useState(arrDetail[0].nik)
    const [salary, setSalary] = useState(arrDetail[0].salary.toString())
    const [entry, setEntry] = useState(moment(new Date))
    const [update, setUpdate] = useState(new Date)

    const [dataEmployee, setDataEmployee] = useState([])

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('test')
            const res = JSON.parse(jsonValue)
            setDataEmployee(res)
        } catch (e) {
            console.log('errorget:', e);
        }
    }

    function showToast(message) {
        // console.log("masuk toast");
        ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    function checkInput() {
        let verified = true
        const age = getAgeDifferential()

        
        if (age < 15) {
            showToast("Umur belum menucukupi")
            verified = false
        }

        if (verified == true) {
            patchData(arrDetail[0].id)
        }
    }

    async function patchData(id) {
        let arrDb = dataEmployee
        let body = {
            "id": id,
            "name": name,
            "birthday": bday,
            "address": addr,
            "nik": nik,
            "salary": parseInt(salary),
            "entry_date": entry,
            "updated_date": update
        }
        console.log("body:",body);
        let arrDbFind = arrDb.filter((item) => {return item.id != id})
        arrDbFind.push(body)
        arrDbFind.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });
        let res = JSON.stringify(arrDbFind)
        console.log('hasil', res);
        await AsyncStorage.setItem('test', res)
        navigation.pop(2)
    }

    function getAgeDifferential() {
        let today = moment().format('yyyy')
        let birthYear = moment(bday).format('yyyy')
        return today - birthYear
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar backgroundColor='transparent' translucent />
                <View style={styles.statusBar} />
                <View
                    style={[
                        Platform.OS == 'ios'
                            ? styles.titleBarContainerIos
                            : styles.titleBarContainer,
                    ]}>
                    <Text style={styles.titleBarText}>
                        Edit Employee
                    </Text>
                </View>
                <ScrollView>
                    <View style={{ marginVertical: 5 }}>
                        <Text style={{ marginHorizontal: 10, color: 'black' }}>Name</Text>
                        <View style={{ marginHorizontal: 10, marginVertical: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: 'black', padding: 10 }}>
                            <TextInput
                                style={{ color: 'black' }}
                                value={name}
                                onChangeText={data => {
                                    setName(data)
                                }}
                                placeholder={'Name'}
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <Text style={{ marginHorizontal: 10, color: 'black' }}>Address</Text>
                        <View style={{ marginHorizontal: 10, marginVertical: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: 'black', padding: 10 }}>
                            <TextInput
                                style={{ color: 'black' }}
                                value={addr}
                                multiline={true}
                                onChangeText={data => {
                                    setAddr(data)
                                }}
                                placeholder={'Address'}
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <Text style={{ marginHorizontal: 10, color: 'black' }}>Birth date</Text>
                        <View style={{ display: 'flex', padding: 10 }}>
                            {/* <TouchableOpacity>
                            <Text style={{ marginHorizontal: 10, color: 'gray' }} onPress={() => {setOpen(true)}}>Birthday</Text>
                            </TouchableOpacity> */}
                            <DatePicker textColor='black' mode='date' maximumDate={new Date} date={bday} onDateChange={setBday} />
                        </View>
                        <Text style={{ marginHorizontal: 10, color: 'black' }}>Salary</Text>
                        <View style={{ marginHorizontal: 10, marginVertical: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: 'black', padding: 10 }}>
                            <TextInput
                                style={{ color: 'black' }}
                                keyboardType={'numeric'}
                                value={salary}
                                onChangeText={data => {
                                    setSalary(data)
                                }}
                                placeholder={'Salary'}
                                placeholderTextColor={'gray'}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginVertical: 10 }}>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', padding: 15, marginHorizontal: 10, borderWidth: StyleSheet.hairlineWidth, borderColor: "green", borderRadius: 10 }}
                        onPress={() => { checkInput() }}
                    >
                        <Text style={{ color: 'green', fontSize: 18 }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default EditEmployee