import { firebaseAuth, firebaseDb } from 'boot/firebase'
import { LocalStorage, Notify } from 'quasar'

const state = {
	loggedIn: false
}

const mutations = {
	setLoggedIn(state, value){
		state.loggedIn = value
	}
}

const actions = {
	registerUser({}, payload){
		firebaseAuth.createUserWithEmailAndPassword(
			payload.email, payload.password)
		.then(response=>{
			console.log('register details: ' ,response)
		})
		.catch(error=>{
			Notify.create(error.message)
		})
	},
	loginUser({}, payload){
		firebaseAuth.signInWithEmailAndPassword(
			payload.email, payload.password)
		.then(response=>{
			console.log('register details: ' ,response)
		})
		.catch(error=>{
			Notify.create(error.message)
		})
	},
	logoutUser(){
		firebaseAuth.signOut()
	},
	handleAuthStateChange({commit, dispatch}){
		firebaseAuth.onAuthStateChanged(user=>{
			if (user) {
				commit('setLoggedIn', true)
				LocalStorage.set('loggedIn',true)
				this.$router.push('/')
				dispatch('foods/fbReadData', null, {root:true})
			}else{
				commit('setLoggedIn', false)
				commit('foods/clearFoods', null, {root:true})
				LocalStorage.set('loggedIn',false)
				this.$router.replace('/auth')
			}
		})
	}
}

const getters = {
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}