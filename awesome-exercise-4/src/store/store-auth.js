import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {

}

const mutations = {
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