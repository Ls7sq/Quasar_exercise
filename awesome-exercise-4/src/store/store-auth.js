import { firebaseAuth, firebaseDb } from 'boot/firebase'

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
			console.log('error: ' ,error.message)
		})
	},
	loginUser({}, payload){
		firebaseAuth.signInWithEmailAndPassword(
			payload.email, payload.password)
		.then(response=>{
			console.log('register details: ' ,response)
		})
		.catch(error=>{
			console.log('error: ' ,error.message)
		})
	},
	handleAuthStateChange({commit}){
		firebaseAuth.onAuthStateChanged(user=>{
			if (user) {
				commit('setLoggedIn', true)
			}else{
				commit('setLoggedIn', false)
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