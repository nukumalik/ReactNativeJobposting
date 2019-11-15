import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import { Thumbnail, Container, Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const Dashboard = props => {
	useEffect(() => {
		checkLogin()
	}, [])

	const checkLogin = async () => {
		const auth = await AsyncStorage.getItem('Authorization')
		console.log(AsyncStorage.getItem('Authorization'))
		if (auth) {
			return
		} else {
			props.navigation.navigate('Login')
		}
	}

	const goLogout = async () => {
		await AsyncStorage.removeItem('Authorization')
		await props.navigation.navigate('Login')
	}

	return (
		<>
			<Container style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
				<View style={{ flex: 1, backgroundColor: '#fff' }}>
					<ImageBackground
						source={{
							uri:
								'https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg',
						}}
						style={{ height: 200 }}></ImageBackground>
					<View
						style={{
							backgroundColor: '#fff',
							padding: 20,
							borderRadius: 5,
						}}>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: -80,
							}}>
							<Thumbnail
								source={{
									uri:
										'https://scontent.fcgk18-2.fna.fbcdn.net/v/t1.0-9/19732306_2034190836607208_5850476020328077902_n.jpg?_nc_cat=110&_nc_oc=AQmXG4sYK6Nv8InMQ2rSfZPRkxUiZ-2eqk5jHXWAkvL88v0_c0HzuK2WMeCdcjWwIYo&_nc_ht=scontent.fcgk18-2.fna&oh=bc0a6f295a0e2af06fee07db94be2928&oe=5E8898E2',
								}}
								large
								style={{
									borderColor: '#fff',
									borderWidth: 4,
									width: 130,
									height: 130,
									borderRadius: widthPercentageToDP('50%'),
								}}
							/>
						</View>
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<Text style={{ fontWeight: 'bold', marginTop: 10 }}>
								Name
							</Text>
							<Text>Nuku Malik Sanjaya Kusuma</Text>
							<Text style={{ fontWeight: 'bold', marginTop: 10 }}>
								Born
							</Text>
							<Text>7-July-1996</Text>
							<Text style={{ fontWeight: 'bold', marginTop: 10 }}>
								Location
							</Text>
							<Text>Bogor</Text>
						</View>
						<View
							style={{
								height: 120,
								justifyContent: 'flex-end',
								alignItems: 'center',
							}}>
							<Button
								onPress={() => goLogout()}
								style={{
									backgroundColor: '#0091ea',
									elevation: 0,
									alignItems: 'center',
									justifyContent: 'center',
									width: widthPercentageToDP('30%'),
								}}>
								<Text
									style={{
										color: '#fff',
										fontWeight: 'bold',
									}}>
									Logout
								</Text>
							</Button>
						</View>
					</View>
				</View>
			</Container>
		</>
	)
}

export default Dashboard
