import React from 'react'
import { Text } from 'react-native'
import { Footer, FooterTab, Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const _Footer = props => {
	const handlePress = screen => {
		props.navigation.navigate(screen, {})
	}

	const { icon, text, wrapper } = style
	return (
		<Footer>
			<FooterTab style={wrapper}>
				<Button vertical onPress={() => handlePress('Home')}>
					<Icon name="home" size={25} style={icon} />
					<Text style={text}>Home</Text>
				</Button>
				<Button vertical onPress={() => handlePress('JobList')}>
					<Icon name="briefcase" size={21} style={icon} />
					<Text style={text}>Jobs</Text>
				</Button>
				<Button vertical onPress={() => handlePress('BookmarkList')}>
					<Icon name="book-outline" size={23} style={icon} />
					<Text style={text}>Marked</Text>
				</Button>
				<Button vertical onPress={() => handlePress('CompanyList')}>
					<Icon name="office-building" size={23} style={icon} />
					<Text style={text}>Companies</Text>
				</Button>
				<Button vertical onPress={() => handlePress('Profile')}>
					<Icon name="account" size={25} style={icon} />
					<Text style={text}>Profile</Text>
				</Button>
			</FooterTab>
		</Footer>
	)
}

const style = {
	wrapper: {
		backgroundColor: '#f9f9f9',
		borderTopWidth: 1,
		borderTopColor: '#f0f0f0',
	},
	icon: {
		color: '#4d4d4d',
	},
	text: {
		fontSize: 12,
	},
}

export default _Footer
