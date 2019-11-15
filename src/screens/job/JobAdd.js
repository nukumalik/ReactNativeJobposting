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
import { allJob, addJob } from '../../redux/action/job'
import { allCategory } from '../../redux/action/category'
import { allCompany } from '../../redux/action/company'

const JobAdd = props => {
	const [name, setName] = useState('')
	const [id_category, setIDCategory] = useState('')
	const [location, setLocation] = useState('')
	const [salary, setSalary] = useState('')
	const [id_company, setIDCompany] = useState('')
	const [description, setDescription] = useState('')

	const goSubmit = () => {
		if (
			!name &&
			!id_category &&
			!location &&
			!salary &&
			!id_company &&
			!description
		)
			return
		props.dispatch(
			addJob({
				name,
				id_category,
				location,
				salary,
				description,
				id_company,
			}),
		)
		props.dispatch(allJob())
		props.navigation.navigate('JobList')
	}

	const getCategory = async () => {
		await props.dispatch(allCategory())
	}

	const getCompany = async () => {
		await props.dispatch(allCompany())
	}

	useEffect(() => {
		getCategory()
		getCompany()
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
		id_category,
		location,
		salary,
		id_company,
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
						onPress={() => props.navigation.navigate('JobList')}>
						<Icon
							name="arrow-left"
							size={20}
							style={{ color: '#fff' }}
						/>
					</Button>
				</Left>
				<Body>
					<Text style={{ fontWeight: 'bold', color: '#fff' }}>
						Add Vacancy
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
								{props.category.isLoading &&
									!props.category.data && (
										<Text>Loading...</Text>
									)}
								{!props.category.isLoading &&
									props.category.data && (
										<Picker
											selectedValue={id_category}
											style={{
												height: 50,
												width: widthPercentageToDP(
													'75%',
												),
											}}
											onValueChange={(
												itemValue,
												itemIndex,
											) => setIDCategory(itemValue)}>
											<Picker.Item
												label="Select Category"
												value=""
											/>
											{!props.category.isLoading &&
												props.category.data.map(
													(v, i) => (
														<Picker.Item
															key={i.toString()}
															label={v.name}
															value={v.id}
														/>
													),
												)}
										</Picker>
									)}
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
								<Item floatingLabel>
									<Label style={text}>Salary</Label>
									<Input
										onChangeText={text => setSalary(text)}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Textarea
									onChangeText={text => setDescription(text)}
									rowSpan={5}
									bordered
									style={{
										width: widthPercentageToDP('72%'),
									}}
								/>
								{/* <Item floatingLabel>
									<Label style={text}>Description</Label>
									<TextInput
										onChangeText={text =>
											setDescription(text)
										}
										style={text}
										multiline={true}
										numberOfLines={5}
									/>
								</Item> */}
							</View>
							<View style={formGroup}>
								{props.company.isLoading &&
									!props.company.data && (
										<Text>Loading...</Text>
									)}
								{!props.company.isLoading &&
									props.company.data && (
										<Picker
											selectedValue={id_company}
											style={{
												height: 50,
												width: widthPercentageToDP(
													'75%',
												),
											}}
											onValueChange={(
												itemValue,
												itemIndex,
											) => setIDCompany(itemValue)}>
											<Picker.Item
												label="Select Company"
												value=""
											/>
											{!props.company.isLoading &&
												props.company.data.map(
													(v, i) => (
														<Picker.Item
															key={i.toString()}
															label={v.name}
															value={v.id}
														/>
													),
												)}
										</Picker>
									)}
							</View>
							<View style={formGroup}>
								<Button
									style={button}
									onPress={() => goSubmit()}>
									<Text style={{ color: '#fff' }}>
										Add Vacancy
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

export default connect(mapStateToProps)(JobAdd)
