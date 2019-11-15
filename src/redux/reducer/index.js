import { combineReducers } from 'redux'

import job from './job'
import company from './company'
import category from './category'
import user from './user'

const appReducer = combineReducers({ job, company, category, user })

export default appReducer
