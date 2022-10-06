import React, { Component, useEffect, useState } from 'react';
import {
    Text,
    Image,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
} from 'react-native';
import styles from "./style";
import { Divider } from 'react-native-paper'
import { currency } from '../currency_formater';

function DetailMovies({ navigation }) {
    const idMovie = navigation.getParam('idMovie')
    console.log('id:', idMovie);

    const [detailMovie, setDetailMovie] = useState([])
    const [genreMovie, setGenreMovie] = useState([])
    const [compMovie, setCompMovie] = useState([])
    const [voteAverage, setVoteAverage] = useState()

    useEffect(() => {
        loadDetailMovie(idMovie)
    }, [])

    async function loadDetailMovie(id) {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=04ff32e26fd7c38f0b859e7c734d01ff`;
        console.log('url:', url);
        await fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('response:', JSON.stringify(responseJson, null, 2));
                setDetailMovie(responseJson)
                setVoteAverage(responseJson.vote_average.toFixed(1))
                setGenreMovie(responseJson.genres)
                setCompMovie(responseJson.production_companies)
            })
    }
    
    function rendergenre(genre) {
        console.log('genre:', genre);
        let arrItem = []
        for (let i = 0; i < genre.length; i++) {
            if (i == genre.length - 1) {
                arrItem.push(
                    <Text key={genre[i].id} style={{ color: 'black' }} >{genre[i].name}</Text>
                )
            } else {
                arrItem.push(
                    <Text key={genre[i].id} style={{ marginHorizontal: 2, color: 'black' }} >{genre[i].name + ' \u25CF '}</Text>
                )
            }
        }
        return arrItem
    }

    function prodCompanies(comp) {
        console.log('genre:', comp);
        let arrItem = []
        for (let i = 0; i < comp.length; i++) {
            if (i == comp.length - 1) {
                arrItem.push(
                    <Text key={comp[i].id} style={{ color: 'black' }} >{comp[i].name}</Text>
                )
            } else {
                arrItem.push(
                    <Text key={comp[i].id} style={{ marginHorizontal: 2, color: 'black' }} >{comp[i].name + ' \u25CF '}</Text>
                )
            }
        }
        return arrItem
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
                        Detail Movies
                    </Text>
                </View>
                <ScrollView>
                    <View style={styles.moviesList}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={styles.imageItem} source={{ uri: `https://image.tmdb.org/t/p/original/${detailMovie.poster_path}` }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <Text style={{ color: 'black', fontSize: 24 }}>{detailMovie.original_title}</Text>
                        </View>
                        <Divider />
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Overview </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 12 }}>{detailMovie.overview}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Production Company </Text>
                            <View style={{flexWrap: 'wrap'}}>
                                <Text style={{ color: 'black', fontSize: 12 }}>{prodCompanies(compMovie)}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Genre </Text>
                            <View style={{flexWrap: 'wrap'}}>
                                <Text style={{ color: 'black', fontSize: 12 }}>{rendergenre(genreMovie)}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Status </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 12 }}>{detailMovie.status}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Runtime </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 12 }}>{detailMovie.runtime} Minutes</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Revenue </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 12 }}>{currency(detailMovie.revenue)} </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Rating </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 12 }}>{voteAverage} / 10 </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Home Page </Text>
                            <View >
                                <Text style={{ color: 'black', fontSize: 12 }}>{detailMovie.homepage} </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default DetailMovies