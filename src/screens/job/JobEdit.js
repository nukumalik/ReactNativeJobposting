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
	ActivityIndicator,
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
import { allJob, updateJob } from '../../redux/action/job'
import { allCategory } from '../../redux/action/category'
import { allCompany } from '../../redux/action/company'

const JobEdit = props => {
	const [name, setName] = useState('')
	const [id_category, setIDCategory] = useState('')
	const [location, setLocation] = useState('')
	const [salary, setSalary] = useState('')
	const [id_company, setIDCompany] = useState('')
	const [description, setDescription] = useState('')

	const goSubmit = () => {
		if (
			!name ||
			!id_category ||
			!location ||
			!salary ||
			!id_company ||
			!description
		)
			return
		props.dispatch(
			updateJob(props.navigation.getParam('id'), {
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
		if (props.job.data) {
			const data = props.job.data.filter(
				job => job.id === props.navigation.getParam('id'),
			)[0]
			setName(data.jobs)
			if (props.category.data) {
				const categoryData = props.category.data.filter(
					o => o.name === data.categories,
				)[0]
				setIDCategory(categoryData.id)
			}
			if (props.company.data) {
				const companyData = props.company.data.filter(
					o => o.name === data.companies,
				)[0]
				setIDCompany(companyData.id)
			}
			setLocation(data.location)
			setSalary(data.salary)
			setDescription(data.description)
		}
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
					marginTop: 20,
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
					{props.job.isLoading && !props.job.data && (
						<View style={style.wrapperLoading}>
							<ActivityIndicator size="large" color="#0091EA" />
						</View>
					)}
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
											) =>
												setIDCategory(
													itemValue || id_category,
												)
											}>
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
										value={location}
										onChangeText={text =>
											setLocation(text || location)
										}
										style={text}
									/>
								</Item>
							</View>
							<View style={formGroup}>
								<Item floatingLabel>
									<Label style={text}>Salary</Label>
									<Input
										value={salary.toString()}
										onChangeText={text =>
											setSalary(text || salary)
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
											) =>
												setIDCompany(
													itemValue || id_company,
												)
											}>
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
									<Text
										style={{
											color: '#fff',
										}}>
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
	wrapperLoading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
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
	job: state.job,
})

export default connect(mapStateToProps)(JobEdit)
