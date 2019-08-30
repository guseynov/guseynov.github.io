import Vue from "vue";
import Router from "vue-router";
import Groups from "./views/Groups.vue";
import Group from "./views/Group.vue";
import Plan from "./views/Plan.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "Groups",
			component: Groups
		},
		{
			path: "/group/:index",
			name: "Group",
			component: Group
		},
		{
			path: "/group/:groupIndex/plan/:planIndex",
			name: "Plan",
			component: Plan
		}
	]
});
