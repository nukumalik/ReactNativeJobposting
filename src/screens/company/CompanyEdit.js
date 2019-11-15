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
import { allCompany, updateCompany } from '../../redux/action/company'

const CompanyAdd = props => {
	const [name, setName] = useState('')
	const [logo, setLogo] = useState('')
	const [location, setLocation] = useState('')
	const [description, setDescription] = useState('')

	const goSubmit = () => {
		if (!name && !logo && !location && !description) return
		props.dispatch(
			updateCompany(props.navigation.getParam('id'), {
				name,
				logo,
				location,
				description,
			}),
		)
		props.dispatch(allCompany())
		props.navigation.navigate('CompanyList')
	}

	useEffect(() => {
		if (props.company.data) {
			const companyData = props.company.data.filter(
				o => o.id === props.navigation.getParam('id'),
			)[0]
			setName(companyData.name)
			setLogo(companyData.logo)
			setLocation(companyData.location)
			setDescription(companyData.description)
		}
	}, [])

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
										value={name}
										onChangeText={text =>
											setName(text || name)
										}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Item floatingLabel>
									<Label style={text}>Logo</Label>
									<Input
										value={logo}
										onChangeText={text =>
											setLogo(text || logo)
										}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Item floatingLabel>
									<Label style={text}>Location</Label>
									<Input
										value={location}
										onChangeText={text =>
											setLocation(text || location)
										}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Textarea
									defaultValue={description}
									onChangeText={text =>
										setDescription(text || description)
									}
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
										Update
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
