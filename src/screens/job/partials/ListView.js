import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Col, Row } from 'native-base'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NumberFormat from 'react-number-format'

const ListView = props => {
	const {
		left,
		description,
		main,
		meta,
		subtitle,
		thumbnailWrapper,
		thumbnail,
		title,
		wrapper,
	} = style
	return (
		<View style={wrapper}>
			<Row style={{ height: 60 }}>
				<Col style={left}>
					<View style={thumbnailWrapper}>
						<TouchableOpacity onPress={props.pressed}>
							<Image style={thumbnail} source={props.thumbnail} />
						</TouchableOpacity>
					</View>
				</Col>
				<Col style={main}>
					<TouchableOpacity onPress={props.pressed}>
						<Text style={title}>{props.title}</Text>
					</TouchableOpacity>
					<Text style={subtitle}>{props.subtitle}</Text>
					<Text style={description}>{props.description}</Text>
					<NumberFormat
						value={props.salary}
						displayType={'text'}
						thousandSeparator={true}
						prefix={'Rp. '}
						renderText={value => (
							<Text style={{ fontSize: 12 }}>{value}</Text>
						)}
					/>
				</Col>
				<Col style={meta}>
					<TouchableOpacity onPress={props.pressed}>
						<Icon name="arrow-right" size={20} />
					</TouchableOpacity>
				</Col>
			</Row>
		</View>
	)
}

const style = {
	wrapper: {
		backgroundColor: '#fff',
		borderRadius: widthPercentageToDP('1%'),
		marginHorizontal: 10,
		marginVertical: 5,
		paddingHorizontal: 10,
		paddingVertical: 15,
	},
	left: {
		width: widthPercentageToDP('25%'),
	},
	thumbnailWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	thumbnail: {
		width: 50,
		height: 50,
	},
	main: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 14,
	},
	subtitle: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#6d6d6d',
	},
	description: { fontSize: 13 },
	meta: {
		width: widthPercentageToDP('10%'),
		paddingTop: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	salary: {
		fontSize: 11,
		marginBottom: 8,
	},
	button: {
		backgroundColor: '#0091EA',
		flex: 1,
		justifyContent: 'center',
		width: 80,
		height: 20,
		borderRadius: widthPercentageToDP('50%'),
		elevation: 0,
	},
	buttonText: {
		color: '#fff',
		fontSize: 11,
		fontWeight: 'bold',
	},
}

export default ListView
