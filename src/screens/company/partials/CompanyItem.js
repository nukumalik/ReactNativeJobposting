/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Item, Right, Row, Col, Button } from 'native-base'
import NumberFormat from 'react-number-format'

const CompanyItem = props => {
	const { description, thumbnail, title, wrapper } = style
	return (
		<View style={wrapper}>
			<TouchableOpacity onPress={props.pressed}>
				<Image source={{ uri: props.logo }} style={thumbnail} />
			</TouchableOpacity>
			<Text style={title}>{props.title}</Text>
			<Text
				style={{
					fontSize: 13,
					fontWeight: 'bold',
					color: '#6d6d6d',
				}}>
				{props.location}
			</Text>
			<Button
				onPress={props.pressed}
				style={{
					backgroundColor: '#0091EA',
					borderRadius: 4,
					justifyContent: 'center',
					alignItems: 'center',
					elevation: 0,
					marginTop: 10,
				}}>
				<Text style={{ color: '#fff' }}>Show</Text>
			</Button>
		</View>
	)
}

const style = {
	wrapper: {
		backgroundColor: '#fff',
		borderRadius: widthPercentageToDP('1%'),
		marginHorizontal: 5,
		marginVertical: 5,
		paddingHorizontal: 10,
		paddingVertical: 15,
	},
	thumbnail: {
		width: 145,
		height: 130,
	},
	title: {
		fontWeight: 'bold',
	},
	description: {
		fontSize: 13,
	},
}

export default CompanyItem
