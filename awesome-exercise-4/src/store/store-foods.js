import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseAuth, firebaseDb} from 'boot/firebase'

const state = {
	foods: {
		// 'id1': {
		// 	name: 'Burger',
		// 	description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
		// 	imageUrl: 'https://i.imgur.com/0umadnY.jpg',
		// 	rating: 4
		// },
		// 'id2': {
		// 	name: 'Pizza',
		// 	description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
		// 	imageUrl: 'https://i.imgur.com/b9zDbyb.jpg',
		// 	rating: 5
		// },
		// 'id3': {
		// 	name: 'Sprouts',
		// 	description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
		// 	imageUrl: 'https://i.imgur.com/RbKjUjB.jpg',
		// 	rating: 1
		// }	
	}
}

const mutations = {
	deleteFood(state, id) {
		Vue.delete(state.foods, id)
	},
	addFood(state, payload) {
		Vue.set(state.foods, payload.id, payload.food)
	},
	updateFood(state, payload) {
		Object.assign(state.foods[payload.id], payload.updates)
	},
	clearFoods(state){
		state.foods = {}
	}
}

const actions = {
	deleteFood({ dispatch }, id) {
		dispatch('fbDeleteFood', id)
	},
	addFood({ dispatch }, food) {
		let newId = uid()
		let payload = {
			id: newId,
			food: food
		}
		dispatch('fbAddFood', payload)
	},
	updateFood({ dispatch }, payload) {
		dispatch('fbUpdateFood', payload)
	},
	fbReadData({ commit }){
		let userId = firebaseAuth.currentUser.uid
		//userId="J3G8AA3KWJZ3oiu1kfuZzoC3zpE2"
		let foodsRef = firebaseDb.ref('foods/' + userId)
		
		foodsRef.on('child_added', snapshot=>{
			let id = snapshot.key,
				food = snapshot.val(),
				payload = {
				id: id,
				food: food
			}
			commit('addFood', payload)
		},error=>{
			Notify.create(error.message)
		})

		foodsRef.on('child_changed', snapshot=>{
			let id = snapshot.key,
				food = snapshot.val(),
				payload = {
				id: id,
				updates: food
			}
			commit('updateFood', payload)
		})

		foodsRef.on('child_removed', snapshot=>{
			let id = snapshot.key
			commit('deleteFood', id)
		})
	},
	fbAddFood({},payload){
		//console.log(payload)
		let userId = firebaseAuth.currentUser.uid
		let foodsRef = firebaseDb.ref('foods/' + userId + '/' + payload.id)
		foodsRef.set(payload.food)
			.catch(error=>{
				Notify.create(error.message)
			})
	},
	fbUpdateFood({},payload){
		//console.log(payload)
		let userId = firebaseAuth.currentUser.uid
		let foodsRef = firebaseDb.ref('foods/' + userId + '/' + payload.id)
		foodsRef.update(payload.updates)
			.catch(error=>{
				Notify.create(error.message)
			})
	},
	fbDeleteFood({},foodId){
		//console.log(payload)
		let userId = firebaseAuth.currentUser.uid
		let foodsRef = firebaseDb.ref('foods/' + userId + '/' + foodId)
		foodsRef.remove()
			.catch(error=>{
				Notify.create(error.message)
			})
	},
}

const getters = {
	foods: (state) => {
		return state.foods
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}