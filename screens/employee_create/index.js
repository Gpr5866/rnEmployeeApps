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


function CreateEmployee({ navigation }) {
    const [dataEmployee, setDataEmployee] = useState([])

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('test')
            const res = JSON.parse(jsonValue)
            console.log('res:', JSON.stringify(res, null, 2));
            setDataEmployee(res)
        } catch (e) {
            console.log('errorget:', e);
        }
    }

    const [name, setName] = useState('')
    const [addr, setAddr] = useState('')
    const [bday, setBday] = useState(new Date)
    const [open, setOpen] = useState(false)
    const [nik, setNik] = useState('')
    const [salary, setSalary] = useState('')
    const [entry, setEntry] = useState(new Date)
    const [update, setUpdate] = useState(new Date)

    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    function checkInput() {
        console.log(bday);

        let checkId = checkLatestId()
        let verified = true
        const age = getAgeDifferential()

        if (nik.length < 16) {
            showToast("NIK kurang dari 16 karakter")
            verified = false
        } else if (age < 15) {
            showToast("Umur belum menucukupi")
            verified = false
        }

        if (verified == true) {
            postData(checkId)
        }
    }

    function checkLatestId() {
        let arrId = []
        dataEmployee.map((item) => {
            arrId.push(item.id)
        })
        const max = Math.max(...arrId)
        return max+1
    }

    async function postData(id) {
        // let url = 'http://localhost:5193/api/Employees'
        let arrDb = dataEmployee
        let body = {
            "id": id,
            "name": name,
            "birthday": bday,
            "address": addr,
            "nik": nik,
            "salary": salary,
            "entry_date": entry,
            "updated_date": update
        }
        arrDb.push(body)
        let arrRes = JSON.stringify(arrDb)
        await AsyncStorage.setItem('test', arrRes).then(navigation.pop());
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
                        Create Employee
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
                        <Text style={{ marginHorizontal: 10, color: 'black' }}>NIK</Text>
                        <View style={{ marginHorizontal: 10, marginVertical: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: 'black', padding: 10 }}>
                            <TextInput
                                style={{ color: 'black' }}
                                keyboardType={'numeric'}
                                value={nik}
                                onChangeText={data => {
                                    setNik(data)
                                }}
                                placeholder={'NIK'}
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
                        <Text style={{ color: 'green', fontSize: 18 }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default CreateEmployee