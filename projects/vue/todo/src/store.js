/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: undefined,
    usernameSaved: false,
    addTaskVisible: false,
    tasksVisible: false,
    activeCategory: undefined,
    categories: {
      misc: [],
      work: [],
      music: [],
      travel: [],
      study: [],
      home: [],
      art: [],
      shopping: []
    },
    dummyNames: [
      "Ronald",
      "Jessica",
      "Deborah",
      "Howard",
      "Donald",
      "Kathy",
      "Jerry",
      "Stephanie",
      "Paul",
      "Anthony"
    ],
    quote: {},
    tasksCounter: 0
  },
  mutations: {
    UPDATE_USERNAME(state, username) {
      state.username = username;
    },
    SAVE_USERNAME(state) {
      state.usernameSaved = true;
    },
    ADD_TASK(state, task) {
      const newTaskTitle = task.title;
      const newTaskDescription = task.description;
      const newTaskCategory = task.category;
      state.categories[newTaskCategory].push({
        title: newTaskTitle,
        description: newTaskDescription,
        category: newTaskCategory,
        done: false,
        index: state.categories[newTaskCategory].length
      });
      state["tasksCounter"] += 1;
    },
    DELETE_TASK(state, task) {
      state.categories[task.category].splice(task.index, 1);
      state["tasksCounter"] -= 1;
    },
    LOAD_QUOTE(state) {
      fetch("https://api.quotable.io/random")
        .then(resp => resp.json())
        .then(quoteJSON => {
          state.quote = quoteJSON;
        })
        .catch(function() {
          Swal.fire({
            title: "The API is down!",
            text:
              "The API looks to be down at the moment, so no new quotes for you, sorry",
            icon: "error",
            confirmButtonText: "Whatever"
          });
        });
    },
    TOGGLE_ADD_TASK_VISIBILITY(state) {
      state.addTaskVisible = !state.addTaskVisible;
    },
    TOGGLE_TASK_STATUS(state, task) {
      const currentStatus = state.categories[task.category][task.index]["done"];
      state.categories[task.category][task.index]["done"] = !currentStatus;
    },
    SET_ACTIVE_CATEGORY(state, category) {
      state.activeCategory = category;
    },
    TOGGLE_TASKS_VISIBILITY(state) {
      state.tasksVisible = !state.tasksVisible;
    }
  },
  actions: {
    updateUsername(context, username) {
      context.commit("UPDATE_USERNAME", username);
    },
    saveUsername(context) {
      context.commit("SAVE_USERNAME");
    },
    addTask(context, task) {
      context.commit("ADD_TASK", task);
    },
    deleteTask(context, task) {
      context.commit("DELETE_TASK", task);
    },
    loadQuote(context) {
      context.commit("LOAD_QUOTE");
    },
    toggleAddTaskVisibility(context) {
      context.commit("TOGGLE_ADD_TASK_VISIBILITY");
    },
    toggleTaskStatus(context, task) {
      context.commit("TOGGLE_TASK_STATUS", task);
    },
    setActiveCategory(context, category) {
      context.commit("SET_ACTIVE_CATEGORY", category);
    },
    toggleTasksVisibility(context) {
      context.commit("TOGGLE_TASKS_VISIBILITY");
    }
  },
  getters: {
    getUsername: state => {
      return state.username;
    },
    getUsernameSaved: state => {
      return state.usernameSaved;
    },
    getDummyNames: state => {
      return state.dummyNames;
    },
    getQuote: state => {
      return state.quote;
    },
    getTasks: state => {
      if (state.activeCategory === "all") {
        let tasksArr = [];
        for (const category in state.categories) {
          if (state.categories[category].length > 0) {
            state.categories[category].forEach(element => {
              tasksArr.push({ ...element, category: category });
            });
          }
        }
        return tasksArr;
      } else {
        return state.categories[state.activeCategory];
      }
    },
    getCategories: state => {
      return state.categories;
    },
    getAddTaskVisible: state => {
      return state.addTaskVisible;
    },
    getTasksCount: state => {
      return state.tasksCounter;
    },
    getTasksVisible: state => {
      return state.tasksVisible;
    },
    getActiveCategory: state => {
      return state.activeCategory;
    },
    getTaskStatus: state => task => {
      return state.categories[task.category][task.index].done;
    }
  }
});
