import React from 'react'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import store from './src/redux/store'

// Job Screens
import JobList from './src/screens/job/JobList'
import JobDetail from './src/screens/job/JobDetail'
import JobAdd from './src/screens/job/JobAdd'
import JobEdit from './src/screens/job/JobEdit'

// Company Screens
import CompanyList from './src/screens/company/CompanyList'
import CompanyAdd from './src/screens/company/CompanyAdd'
import CompanyDetail from './src/screens/company/CompanyDetail'
import CompanyEdit from './src/screens/company/CompanyEdit'

// User Screens
import Dashboard from './src/screens/user/Dashboard'
import Login from './src/screens/user/Login'
import Register from './src/screens/user/Register'

// Partial
// import _Footer from './src/screens/partials/_Footer'

function App() {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	)
}

const JobStack = createStackNavigator(
	{
		JobList,
		JobDetail,
		JobAdd,
		JobEdit,
	},
	{
		defaultNavigationOptions: {
			header: null,
		},
	},
)

const CompanyStack = createStackNavigator(
	{
		CompanyList,
		CompanyDetail,
		CompanyAdd,
		CompanyEdit,
	},
	{
		defaultNavigationOptions: {
			header: null,
		},
	},
)

const UserStack = createStackNavigator(
	{
		Dashboard,
		Login,
		Register,
	},
	{
		defaultNavigationOptions: {
			header: null,
		},
	},
)

const BottomTabNavigation = createBottomTabNavigator(
	{
		Jobs: JobStack,
		Companies: CompanyStack,
		Profile: UserStack,
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state
				let IconComponent = Icon
				let iconName
				if (routeName === 'Jobs') {
					iconName = 'briefcase' + (focused ? '' : '-outline')
				} else if (routeName === 'Companies') {
					iconName = 'office-building'
				} else if (routeName === 'Profile') {
					iconName = 'account' + (focused ? '' : '-outline')
				}

				return (
					<IconComponent
						name={iconName}
						size={20}
						color={tintColor}
					/>
				)
			},
		}),
		tabBarOptions: {
			activeTintColor: '#0091ea',
			inactiveTintColor: 'gray',
		},
	},
)

const AppContainer = createAppContainer(BottomTabNavigation)

export default App
