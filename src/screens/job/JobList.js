/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	RefreshControl,
} from 'react-native'
import {
	Container,
	Item,
	Input,
	Label,
	Row,
	Col,
	Left,
	Right,
	Button,
	Picker,
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
	heightPercentageToDP,
	widthPercentageToDP,
} from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage'

// Action
import { allJob } from '../../redux/action/job'

// Partials
import ListView from './partials/ListView'
import GridView from './partials/GridView'
import _Header from './partials/_Header'
import _Search from './partials/_Search'
import { Header } from 'react-navigation-stack'

const JobList = props => {
	const [search, setSearch] = useState('')
	const [isSearch, setIsSearch] = useState(false)
	const [name, setName] = useState('')
	const [company, setCompany] = useState('')
	const [grid, setGrid] = useState(false)
	const [filtered, setFiltered] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const [ordeby, setOrdeby] = useState()
	const [limit, setLimit] = useState()

	useEffect(() => {
		checkLogin()
		props.dispatch(allJob())
	}, [])

	const checkLogin = async () => {
		const auth = await AsyncStorage.getItem('Authorization')
		console.log(AsyncStorage.getItem('Authorization'))
		if (auth) {
			return
		} else {
			props.navigation.navigate('Login')
		}
	}

	const goDetail = id => {
		props.navigation.navigate('JobDetail', { id })
	}

	const goSetFilterView = () => {
		return (
			<>
				<TouchableOpacity
					onPress={() => {
						if (!filtered) {
							setFiltered(true)
						} else {
							setFiltered(false)
						}
					}}>
					<Icon
						name="filter-outline"
						size={23}
						style={{ color: '#fff' }}
					/>
				</TouchableOpacity>
			</>
		)
	}

	const goView = () => {
		return (
			<>
				{!grid && (
					<TouchableOpacity onPress={() => setGrid(true)}>
						<Icon
							name="view-grid"
							size={21}
							style={{ color: '#fff', marginRight: 15 }}
						/>
					</TouchableOpacity>
				)}
				{grid && (
					<TouchableOpacity onPress={() => setGrid(false)}>
						<Icon
							name="view-list"
							size={21}
							style={{ color: '#fff', marginRight: 15 }}
						/>
					</TouchableOpacity>
				)}
			</>
		)
	}

	const goAdd = () => {
		props.navigation.navigate('JobAdd')
	}

	const goFilter = async () => {
		await props.dispatch(
			allJob(
				name || '',
				company || '',
				limit || 5,
				ordeby || 'updated_at',
			),
		)
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		props.dispatch(allJob())
		setRefreshing(false)
	}, [refreshing])

	return (
		<>
			{!isSearch ? (
				<_Header
					pressed={() => setIsSearch(true)}
					filtered={goSetFilterView()}
					view={goView()}
					added={() => goAdd()}
				/>
			) : (
				<_Search
					pressed={() => setIsSearch(false)}
					changed={text => {
						setName(text)
						if (name.length >= 2) {
							goFilter()
						} else {
							props.dispatch(allJob())
						}
					}}
				/>
			)}
			{filtered && (
				<View style={{ padding: 15, height: 200 }}>
					<View style={{}}>
						<Item floatingLabel>
							<Label style={{ fontWeight: 'bold' }}>Limit</Label>
							<Input onChangeText={text => setLimit(text)} />
						</Item>
					</View>
					<View style={{ width: 100 }}>
						<Picker
							selectedValue={ordeby}
							style={{
								height: 50,
								width: widthPercentageToDP('75%'),
							}}
							onValueChange={(itemValue, itemIndex) =>
								setOrdeby(itemValue)
							}>
							<Picker.Item label="Select Category" value="" />
							<Picker.Item label="Newest" value="updated_at" />
							<Picker.Item label="Name A-Z" value="natoz" />
							<Picker.Item label="Name Z-A" value="nztoa" />
							<Picker.Item label="Company A-Z" value="natoz" />
							<Picker.Item label="Company Z-A" value="nztoa" />
						</Picker>
					</View>
					<Button
						onPress={() => goFilter()}
						style={{
							backgroundColor: '#0091ea',
							justifyContent: 'center',
						}}>
						<Text style={{ color: '#fff' }}>Filter</Text>
					</Button>
				</View>
			)}
			<Container
				style={{ padding: 5, backgroundColor: '#F0F1F3' }}
				onPress={() => setIsSearch(false)}>
				<SafeAreaView style={{ paddingVertical: 5 }}>
					{props.job.isLoading && !props.job.data && (
						<View style={style.wrapperLoading}>
							<ActivityIndicator size="large" color="#0091EA" />
						</View>
					)}
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
							/>
						}>
						{!props.job.isLoading &&
							!grid &&
							props.job.data.map((v, i) => (
								<Fragment key={i.toString()}>
									<ListView
										thumbnail={{ uri: v.logo }}
										title={v.jobs}
										subtitle={v.companies}
										description={v.categories}
										salary={v.salary}
										pressed={() => goDetail(v.id)}
									/>
								</Fragment>
							))}
					</ScrollView>
					{!props.job.isLoading && grid && (
						<FlatList
							data={props.job.data}
							renderItem={({ item }) => (
								<GridView
									logo={item.logo}
									title={item.jobs}
									salary={item.salary}
									company={item.companies}
									category={item.categories}
									pressed={() => goDetail(item.id)}
								/>
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

const style = {
	wrapperLoading: {
		height: heightPercentageToDP('100%'),
		justifyContent: 'center',
		alignItems: 'center',
	},
}

const mapStateToProps = state => ({
	job: state.job,
})

export default connect(mapStateToProps)(JobList)
