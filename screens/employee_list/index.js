import React, { useCallback, useEffect, useState } from 'react';
import {
    Text,
    Image,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    RefreshControl
} from 'react-native';
import styles from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';


function ListEmployee({ navigation, route }) {

    const [ListEmployee, setListEmployee] = useState([])
    const [trigger, setTrigger] = useState(true)
    const [refresh, setRefresh] = useState(false)

    const setItem = async () => {
        let value = [
            {
                "id": 1,
                "name": 'joni',
                "birthday": new Date,
                "address": 'test1',
                "nik": "123456789012345",
                "salary": 1500000,
                "entry_date": new Date,
                "updated_date": new Date
            },
            {
                "id": 2,
                "name": 'joni2',
                "birthday": new Date,
                "address": 'test2',
                "nik": "123456789012345",
                "salary": 1500000,
                "entry_date": new Date,
                "updated_date": new Date
            },
            {
                "id": 3,
                "name": 'joni3',
                "birthday": new Date,
                "address": 'test3',
                "nik": "123456789012345",
                "salary": 1500000,
                "entry_date": new Date,
                "updated_date": new Date
            },
            {
                "id": 4,
                "name": 'joni4',
                "birthday": new Date,
                "address": 'test4',
                "nik": "123456789012345",
                "salary": 1500000,
                "entry_date": new Date,
                "updated_date": new Date
            },
            {
                "id": 5,
                "name": 'joni5',
                "birthday": new Date,
                "address": 'test5',
                "nik": "123456789012345",
                "salary": 1500000,
                "entry_date": new Date,
                "updated_date": new Date
            },

        ]
        const jsonValue = JSON.stringify(value)

        try {
            await AsyncStorage.setItem('test', jsonValue)
        } catch (e) {
            console.log('err:', e);
        }
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
        setListEmployee(arr)
        onRefresh()
    }

    useEffect(() => {
        setItem()
        getData()
    }, [trigger])

    function renderListEmployee() {
        return ListEmployee.map((item) => {
            // console.log('emp', item);
            return (
                <View style={styles.employee} key={item.id}>
                    <TouchableOpacity

                        onPress={() => {
                            navigation.navigate("DetailEmployee", {
                                id: item.id,
                                name: item.name,
                                birthday: item.birthday,
                                address: item.address,
                                nik: item.nik,
                                salary: item.salary,
                                entry: item.entry_date,
                                update: item.updated_date
                            })
                        }}
                    >
                        <View >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                                <View style={{ padding: 10, flexDirection: 'column', }}>
                                    <Text style={{ color: 'black', fontSize: 18 }}>Name : {item.name}</Text>
                                    <Text style={{ color: 'black', fontSize: 18 }}>Address : {item.address}</Text>
                                    <Text style={{ color: 'black', fontSize: 18 }}>NIK : {item.nik}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            style={{ padding: 5, marginRight: 5, borderWidth: StyleSheet.hairlineWidth, borderColor: "red", borderRadius: 10 }}
                            onPress={() => { removeData(item.id) }}
                        >
                            <Text style={{ color: 'red', fontSize: 18 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )
        })
    }

    function onRefresh() {
        setRefresh(true)
        // loadListEmployee()
        getData()
        setTimeout(() => {
            setRefresh(false)
        }, 1000);
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
                        List Employee
                    </Text>
                </View>
                <View style={{ marginHorizontal: 15, marginVertical: 5, padding: 5 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('CreateEmployee') }}>
                        <Text style={{ color: 'green', fontSize: 18 }}>Add new employee</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => onRefresh()}
                        />
                    }
                >
                    <View style={styles.moviesList}>
                        {renderListEmployee()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ListEmployee