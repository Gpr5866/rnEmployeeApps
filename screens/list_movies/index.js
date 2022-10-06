import React, { useEffect, useState } from 'react';
import {
    Text,
    Image,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import styles from "./style";

function ListMovies({ navigation, route }) {
    const [listMovies, setListMovies] = useState([])

    async function loadListMovies() {
        let url = 'https://api.themoviedb.org/3/discover/movie?api_key=04ff32e26fd7c38f0b859e7c734d01ff&page=1'
        await fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setListMovies(responseJson.results)
            })
    }

    useEffect(() => {
        loadListMovies()
    }, [])

    function renderListMovies() {
        return listMovies.map((item) => {
            console.log('film', item);
            return (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        navigation.navigate("DetailMovies", {
                            idMovie: item.id,
                            nameMovie: item.original_title
                        })
                    }}
                >
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                            <View style={{ margin: 10 }}>
                                <Image style={styles.imageItem} source={{ uri: `https://image.tmdb.org/t/p/original/${item.backdrop_path}` }} />
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'black', fontSize: 18 }}>{item.original_title}</Text>
                                <Text style={{ color: 'black', fontSize: 18 }}>Rating : {item.vote_average}</Text>
                                <Text style={{ color: 'black', fontSize: 18 }}>Total voter : {item.vote_count}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            )
        })
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
                        List Movies
                    </Text>
                </View>
                <ScrollView>
                    <View style={styles.moviesList}>
                        {renderListMovies()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ListMovies