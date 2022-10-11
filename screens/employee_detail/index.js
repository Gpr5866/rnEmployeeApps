import React, { Component, useEffect, useState } from 'react';
import {
    Text,
    Image,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import styles from "./style";
import { Divider } from 'react-native-paper'
import { currency } from '../currency_formater';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';


function DetailEmployee({ navigation }) {
    const idEmployee = navigation.getParam('id')
    const nameEmployee = navigation.getParam('name')
    const bdayEmployee = navigation.getParam('birthday')
    const addrEmployee = navigation.getParam('address')
    const nikEmployee = navigation.getParam('nik')
    const salaryEmployee = navigation.getParam('salary')
    const entryDateEmployee = navigation.getParam('entry')
    const UpdateDateEmployee = navigation.getParam('update')

    const [detailEmp, setDetailEmp] = useState([])
    const [ListEmployee, setListEmployee] = useState([])

    useEffect(() => {
        getData()
        setDetailArray()
    }, [])

    const setDetailArray = () => {
        let arrayEmployee = []
        arrayEmployee.push({
                "id": idEmployee,
                "name": nameEmployee,
                "birthday": bdayEmployee,
                "address": addrEmployee,
                "nik": nikEmployee,
                "salary": salaryEmployee,
                "entry_date": entryDateEmployee,
                "updated_date": UpdateDateEmployee
        })
        setDetailEmp(arrayEmployee)
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('test')
            const res = JSON.parse(jsonValue)
            setListEmployee(res)
        } catch (e) {
            console.log('errorget:', e);
        }
    }

    const removeData = async (id) => {
        let arr = ListEmployee.filter((item) => { return item.id != id })
        const arrJson = JSON.stringify(arr)
        await AsyncStorage.setItem('test', arrJson)
        navigation.pop()
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
                        Detail Employee
                    </Text>
                </View>
                <ScrollView>
                    <View style={styles.moviesList}>
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Name </Text>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>: </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 20 }}>{nameEmployee}</Text>
                            </View>
                        </View>
                        <Divider />
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Birth date </Text>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>: </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 20 }}>{moment(bdayEmployee).format('DD/MM/yyyy')}</Text>
                            </View>
                        </View>
                        <Divider />
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>NIK </Text>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>: </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 20 }}>{nikEmployee}</Text>
                            </View>
                        </View>
                        <Divider />
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Address </Text>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>: </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 20 }}>{addrEmployee}</Text>
                            </View>
                        </View>
                        <Divider />
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Salary </Text>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>: </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 20 }}>{currency(salaryEmployee)}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Entry date </Text>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>: </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 20 }}>{moment(entryDateEmployee).format('DD/MM/yyyy')}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Update date </Text>
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>: </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 20 }}>{moment(UpdateDateEmployee).format('DD/MM/yyyy')}</Text>
                            </View>
                        </View>
                        <Divider />
                        
                    </View>
                </ScrollView>
                <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-evenly', marginVertical: 10}}>
                    <View>
                    <TouchableOpacity
                            style={{ padding: 15, marginRight: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: "black", borderRadius: 10 }}
                            onPress={() => navigation.navigate("EditEmployee",{
                                arrayEmp: detailEmp,
                            })}
                        >
                            <Text style={{ color: 'black', fontSize: 18 }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity
                            style={{ padding: 15, marginRight: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: "red", borderRadius: 10 }}
                            onPress={() => {removeData(idEmployee)}}
                        >
                            <Text style={{ color: 'red', fontSize: 18 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default DetailEmployee