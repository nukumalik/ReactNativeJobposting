import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	AsyncStorage,
} from 'react-native'
import {
	Container,
	Item,
	Input,
	Label,
	Form,
	Button,
	Thumbnail,
} from 'native-base'
import { widthPercentageToDP } from 'react-native-responsive-screen'

// Action
import { loginUser } from '../../redux/action/user'

const Login = props => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const goSubmit = async () => {
		if (!email && !password) {
			return
		} else {
			await props.dispatch(loginUser({ email, password }))
			await props.navigation.navigate('Dashboard')
		}
	}

	const {
		button,
		bottomWrapper,
		container,
		formGroup,
		thumbnailWrapper,
		wrapper,
		text,
	} = style
	return (
		<ScrollView>
			<Container style={container}>
				<View style={thumbnailWrapper}>
					<Thumbnail
						large
						source={{
							uri: 'https://img.icons8.com/clouds/2x/user.png',
						}}
					/>
				</View>
				<View style={wrapper}>
					<View style={formGroup}>
						<Item floatingLabel>
							<Label style={text}>Email</Label>
							<Input
								onChangeText={text => setEmail(text)}
								style={text}
							/>
						</Item>
					</View>
					<View style={formGroup}>
						<Item floatingLabel>
							<Label style={text}>Password</Label>
							<Input
								secureTextEntry
								onChangeText={text => setPassword(text)}
								style={text}
							/>
						</Item>
					</View>
					<View style={formGroup}>
						<Button style={button} onPress={() => goSubmit()}>
							<Text style={{ color: '#fff' }}>Login</Text>
						</Button>
					</View>
				</View>
				<View style={bottomWrapper}>
					<Text>Do you not have an account?</Text>
					<Button
						transparent
						onPress={() => props.navigation.navigate('Register')}>
						<Text style={{ color: '#0091EA' }}>Register now</Text>
					</Button>
				</View>
			</Container>
		</ScrollView>
	)
}

const style = {
	container: {
		backgroundColor: '#ededed',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		margin: 10,
		paddingHorizontal: 20,
		paddingVertical: 20,
		width: 300,
		borderRadius: 10,
	},
	formGroup: {
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#0091EA',
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		borderRadius: 25,
		elevation: 0,
	},
	bottomWrapper: {
		height: 150,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 20,
	},
	thumbnailWrapper: {
		padding: 10,
		backgroundColor: '#fff',
		borderTopStartRadius: widthPercentageToDP('50%'),
		borderTopEndRadius: widthPercentageToDP('50%'),
		marginBottom: -40,
	},
	text: {
		fontSize: 13,
	},
}

const mapStateToProps = state => ({
	user: state.user,
})

export default connect(mapStateToProps)(Login)
