import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		infoScreenIsActive: false,
		photos: [],
		hot: [],
		not_hot: [],
		ready: false,
		lastVerdict: undefined,
		currentlyVisible: 'first'
	},
	mutations: {
		ADD_PHOTO(state, payload) {
			/* 
      Add new photos to the start of the photos array,
      so we can still use the photos from the end of the array in our templates
       */
			state.photos.unshift(payload);
		},
		UPDATE_STATUS(state, isReady) {
			// Display loading screen when we're running out of images and state that the project is not yet ready for work
			state.ready = isReady;
		},
		PROCESS_CURRENT_PHOTO(state, isHot) {
			// Save the latest action
			state.lastVerdict = isHot;
			const currentPhoto = state.photos[state.photos.length - 1];
			// Log the action
			if (isHot) {
				state.hot.push(currentPhoto.id);
			} else {
				state.not_hot.push(currentPhoto.id);
			}
			// The CSS transition of a photo lasts for .5s, so I'm waiting for the animation to end to proceed with the necessary actions
			setTimeout(() => {
				// Change which of the photo containers are visible now
				state.currentlyVisible =
					state.currentlyVisible === 'first' ? 'second' : 'first';
				// Get rid of the photo, we already logged its ID
				state.photos.pop();
				URL.revokeObjectURL(currentPhoto.url);
				// Reset lastVerdict property so that no classes with CSS transforms are applied to photo containers
				state.lastVerdict = undefined;
			}, 500);
		},
		TOGGLE_INFO_SCREEN(state) {
			// Simply toggle the information screen visibility
			state.infoScreenIsActive = !state.infoScreenIsActive;
		}
	},
	actions: {
		addPhoto(context, photoObj) {
			context.commit('ADD_PHOTO', photoObj);
			if (context.state.photos.length >= 5) {
				// Hide the loading screen as we already loaded enough images
				context.commit('UPDATE_STATUS', true);
			} else {
				// Show the loading screen until we have loaded enough images
				context.commit('UPDATE_STATUS', false);
			}
		},
		makeVerdict(context, isHot) {
			context.commit('PROCESS_CURRENT_PHOTO', isHot);
		},
		toggleInfoScreen(context) {
			context.commit('TOGGLE_INFO_SCREEN');
		}
	}
});
