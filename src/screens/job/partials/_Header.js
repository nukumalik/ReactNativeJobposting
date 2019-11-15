/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Body, Container, Left, Right, Header, Button } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const _Header = props => {
	const [view, setView] = useState(false)
	return (
		<Header
			style={{
				backgroundColor: '#0091EA',
			}}>
			<Left>
				<TouchableOpacity onPress={props.pressed}>
					<Icon name="magnify" size={25} style={{ color: '#fff' }} />
				</TouchableOpacity>
			</Left>
			<Body>
				<Text
					style={{
						color: '#fff',
						fontSize: 18,
						fontWeight: 'bold',
						fontFamily: 'Comfortaa-Regular',
					}}>
					Jobfindout
				</Text>
			</Body>
			<Right>
				<TouchableOpacity onPress={props.added}>
					<Icon
						name="pencil-plus"
						size={20}
						style={{ color: '#fff', marginRight: 15 }}
					/>
				</TouchableOpacity>
				{props.view}
				{props.filtered}
			</Right>
		</Header>
	)
}

export default _Header
