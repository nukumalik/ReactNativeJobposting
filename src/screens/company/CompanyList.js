/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import {
	ActivityIndicator,
	View,
	SafeAreaView,
	FlatList,
	Text,
	ScrollView,
} from 'react-native'
import { Container, Header, Left, Body, Right } from 'native-base'

// Action
import { allCompany } from '../../redux/action/company'

// Partial
import CompanyItem from './partials/CompanyItem'
import _Header from '../job/partials/_Header'
import _Search from '../job/partials/_Search'

const CompanyList = props => {
	const [search, setSearch] = useState('')
	const [isSearch, setIsSearch] = useState('')

	useEffect(() => {
		props.dispatch(allCompany())
	}, [])

	const goDetail = id => {
		props.navigation.navigate('CompanyDetail', { id })
	}

	const goAdd = () => {
		props.navigation.navigate('CompanyAdd')
	}

	return (
		<>
			{!isSearch ? (
				<_Header
					pressed={() => setIsSearch(true)}
					added={() => goAdd()}
				/>
			) : (
				<_Search
					pressed={() => setIsSearch(false)}
					changed={text => {
						setSearch(text)
					}}
				/>
			)}
			<Container style={{ padding: 5, backgroundColor: '#F0F1F3' }}>
				{props.company.isLoading && !props.company.data && (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<ActivityIndicator size="large" color="#0091EA" />
					</View>
				)}
				<SafeAreaView>
					{!props.company.isLoading &&
						props.company.data &&
						search.length >= 1 && (
							<FlatList
								data={props.company.data.filter(o =>
									o.name.includes(search),
								)}
								renderItem={({ item }) => (
									<>
										<CompanyItem
											logo={item.logo}
											title={item.name}
											location={item.location}
											pressed={() => goDetail(item.id)}
										/>
									</>
								)}
								numColumns={2}
								keyExtractor={(item, index) => index.toString()}
							/>
						)}
					{!props.company.isLoading && !search && (
						<FlatList
							data={props.company.data}
							renderItem={({ item }) => (
								<>
									<CompanyItem
										logo={item.logo}
										title={item.name}
										location={item.location}
										pressed={() => goDetail(item.id)}
									/>
								</>
							)}
							numColumns={2}
							keyExtractor={(item, index) => index.toString()}
						/>
					)}
				</SafeAreaView>
			</Container>
		</>
	)
}

const mapStateToProps = state => ({
	job: state.job,
	company: state.company,
})

export default connect(mapStateToProps)(CompanyList)
