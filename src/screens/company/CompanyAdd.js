/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Picker,
} from 'react-native'
import {
	Container,
	Item,
	Input,
	Label,
	Form,
	Button,
	Thumbnail,
	Textarea,
	Header,
	Left,
	Right,
	Body,
} from 'native-base'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Action
import { allCompany, addCompany } from '../../redux/action/company'

const CompanyAdd = props => {
	const [name, setName] = useState('')
	const [logo, setLogo] = useState('')
	const [location, setLocation] = useState('')
	const [description, setDescription] = useState('')

	const goSubmit = () => {
		if (!name && !logo && !location && !description) return
		props.dispatch(
			addCompany({
				name,
				logo,
				location,
				description,
			}),
		)
		props.dispatch(allCompany())
		props.navigation.navigate('CompanyList')
	}

	const {
		button,
		container,
		formGroup,
		thumbnailWrapper,
		wrapper,
		text,
	} = style

	console.log({
		name,
		logo,
		location,
		description,
	})

	return (
		<>
			<Header
				style={{
					backgroundColor: '#0091EA',
				}}>
				<Left>
					<Button
						transparent
						onPress={() =>
							props.navigation.navigate('CompanyList')
						}>
						<Icon
							name="arrow-left"
							size={20}
							style={{ color: '#fff' }}
						/>
					</Button>
				</Left>
				<Body>
					<Text style={{ fontWeight: 'bold', color: '#fff' }}>
						Add Company
					</Text>
				</Body>
				<Right></Right>
			</Header>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Container style={container}>
						<View style={wrapper}>
							<View style={formGroup}>
								<Item floatingLabel>
									<Label style={text}>Name</Label>
									<Input
										onChangeText={text => setName(text)}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Item floatingLabel>
									<Label style={text}>Logo</Label>
									<Input
										onChangeText={text => setLogo(text)}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Item floatingLabel>
									<Label style={text}>Location</Label>
									<Input
										onChangeText={text => setLocation(text)}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Textarea
									onChangeText={text => setDescription(text)}
									rowSpan={5}
									bordered
									placeholder="Description"
									style={{
										width: widthPercentageToDP('72%'),
									}}
								/>
							</View>
							<View style={formGroup}>
								<Button
									style={button}
									onPress={() => goSubmit()}>
									<Text style={{ color: '#fff' }}>
										Add Company
									</Text>
								</Button>
							</View>
						</View>
					</Container>
				</ScrollView>
			</View>
		</>
	)
}

const style = {
	container: {
		backgroundColor: '#ededed',
		alignItems: 'center',
		paddingTop: 20,
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
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: 20,
	},
	text: {
		fontSize: 13,
	},
}

const mapStateToProps = state => ({
	category: state.category,
	company: state.company,
})

export default connect(mapStateToProps)(CompanyAdd)
