import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		failedToFetch: false,
		groups: []
	},
	mutations: {
		FETCH_FAIL(state) {
			state.failedToFetch = true;
		},
		FETCH_SUCCESS(state, data) {
			state.groups = data.tarifs;
			const sort = (a, b) => {
				return a.ID - b.ID;
			};
			state.groups.forEach(group => {
				group.tarifs.sort(sort);
			});
		}
	},
	actions: {
		failedtoFetch(context) {
			context.commit("FETCH_FAIL");
		},
		successfulFetch(context, data) {
			context.commit("FETCH_SUCCESS", data);
		}
	}
});
