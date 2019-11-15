import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Header, Item, Input, Button, Form } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const _Search = props => {
	return (
		<Form onSubmit={props.submited}>
			<Header searchBar style={{ backgroundColor: '#fff' }}>
				<Item>
					<TouchableOpacity onPress={props.pressed}>
						<Icon
							name="close"
							size={25}
							style={{ color: 'gray' }}
						/>
					</TouchableOpacity>
					<Input placeholder="Search" onChangeText={props.changed} />
					{props.filter}
				</Item>
			</Header>
		</Form>
	)
}

export default _Search
