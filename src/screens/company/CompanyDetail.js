/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { connect } from 'react-redux'
import {
	Image,
	Text,
	View,
	ScrollView,
	ImageBackground,
	Alert,
} from 'react-native'
import { Col, Container, Row, Button, Header, Left, Right } from 'native-base'
import {
	widthPercentageToDP,
	heightPercentageToDP,
} from 'react-native-responsive-screen'
import NumberFormat from 'react-number-format'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Action
import { allCompany, deleteCompany } from '../../redux/action/company'

const CompanyDetail = props => {
	const goEdit = id => {
		props.navigation.navigate('CompanyEdit', { id })
	}

	const goDelete = id => {
		Alert.alert('Delete', 'Are you sure for deleting the company?', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancle'),
				style: 'cancle',
			},
			{
				text: 'OK',
				onPress: () => {
					props.dispatch(deleteCompany(id))
					props.dispatch(allCompany())
					props.navigation.navigate('CompanyList')
				},
			},
		])
	}

	const {
		button,
		buttonText,
		description,
		headerImage,
		meta,
		title,
		thumbnailWrapper,
		wrapper,
	} = style
	const headerImageURI =
		'http://www.juegofriv10.com/wp-content/uploads/2018/05/50-Beautiful-and-Minimalist-Presentation-Backgrounds-040.jpg'
	return (
		<Container>
			<ScrollView>
				{props.company.isLoading && !props.company.data && (
					<Text>Loading...</Text>
				)}
				{!props.company.isLoading &&
					props.company.data
						.filter(o => o.id === props.navigation.getParam('id'))
						.map((v, i) => (
							<View key={i.toString()} style={wrapper}>
								<ImageBackground
									style={headerImage}
									source={{ uri: headerImageURI }}>
									<Header
										transparent
										style={{
											width: widthPercentageToDP('100%'),
											marginTop: -110,
										}}>
										<Left>
											<TouchableOpacity
												onPress={() =>
													props.navigation.navigate(
														'CompanyList',
														{},
													)
												}>
												<Icon
													name="arrow-left"
													size={20}
													style={{ color: 'gray' }}
												/>
											</TouchableOpacity>
										</Left>
										<Right>
											<TouchableOpacity
												onPress={() => goEdit(v.id)}>
												<Icon
													name="pencil-outline"
													size={20}
													style={{
														color: 'gray',
														marginRight: 10,
													}}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => goDelete(v.id)}>
												<Icon
													name="delete-outline"
													size={20}
													style={{ color: 'gray' }}
												/>
											</TouchableOpacity>
										</Right>
									</Header>
									<Text style={title}>{v.name}</Text>
								</ImageBackground>
								<View style={thumbnailWrapper}>
									<Image
										style={{ width: 50, height: 50 }}
										source={{ uri: v.logo }}
									/>
								</View>
								<View style={meta}>
									<Text style={{ fontWeight: 'bold' }}>
										Location
									</Text>
									<Text>{v.location}</Text>
								</View>
								<View style={description}>
									<Text>{v.description}</Text>
								</View>
							</View>
						))}
			</ScrollView>
		</Container>
	)
}

const mapStateToProps = state => ({
	company: state.company,
})

const style = {
	wrapper: {
		borderRadius: 20,
		alignItems: 'center',
		paddingBottom: 20,
	},
	headerImage: {
		borderRadius: 50,
		width: widthPercentageToDP('100%'),
		height: 250,
		justifyContent: 'center',
		alignItems: 'center',
	},
	meta: {
		alignItems: 'center',
		marginBottom: 5,
	},
	description: {
		marginTop: 20,
		paddingHorizontal: 15,
		paddingBottom: 20,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	thumbnailWrapper: {
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 25,
		marginTop: -45,
		borderRadius: widthPercentageToDP('50%'),
	},
	button: {
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0091ea',
	},
	buttonText: {
		color: '#fff',
	},
}

export default connect(mapStateToProps)(CompanyDetail)
