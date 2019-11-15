import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
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
import { registerUser } from '../../redux/action/user'

const Register = props => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const goSubmit = () => {
		if (!name && !email && !password) return
		props.dispatch(registerUser({ name, email, password }))
		props.navigation.navigate('Login')
	}

	const {
		button,
		bottomWrapper,
		container,
		formGroup,
		text,
		thumbnailWrapper,
		wrapper,
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
						<Item>
							<Input
								onChangeText={text => setName(text)}
								placeholder="Name"
								style={text}
							/>
						</Item>
					</View>
					<View style={formGroup}>
						<Item>
							<Input
								onChangeText={text => setEmail(text)}
								placeholder="Email"
								style={text}
							/>
						</Item>
					</View>
					<View style={formGroup}>
						<Item>
							<Input
								secureTextEntry
								onChangeText={text => setPassword(text)}
								placeholder="Password"
								style={text}
							/>
						</Item>
					</View>
					<View style={formGroup}>
						<Button style={button} onPress={() => goSubmit()}>
							<Text style={{ color: '#fff' }}>Register</Text>
						</Button>
					</View>
				</View>
				<View style={bottomWrapper}>
					<Text>Do you have an account?</Text>
					<Button
						transparent
						onPress={() => props.navigation.navigate('Login')}>
						<Text style={{ color: '#0091EA' }}>Login now</Text>
					</Button>
				</View>
			</Container>
		</ScrollView>
	)
}

const style = {
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
	container: {
		backgroundColor: '#ededed',
		justifyContent: 'center',
		alignItems: 'center',
	},
	thumbnailWrapper: {
		padding: 10,
		backgroundColor: '#fff',
		borderTopStartRadius: widthPercentageToDP('50%'),
		borderTopEndRadius: widthPercentageToDP('50%'),
		marginBottom: -40,
	},
	bottomWrapper: {
		height: 150,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 20,
	},
	text: {
		fontSize: 13,
	},
}

const mapStateToProps = state => ({
	user: state.user,
})

export default connect(mapStateToProps)(Register)
