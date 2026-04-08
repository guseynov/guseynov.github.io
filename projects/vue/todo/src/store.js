import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const STORAGE_KEY = "todo-app-state-v2";

const fallbackQuotes = [
  {
    content: "Small steps add up faster than grand plans.",
    author: "Todo"
  },
  {
    content: "Clear lists reduce friction. Friction kills momentum.",
    author: "Todo"
  },
  {
    content: "Finish the obvious thing first.",
    author: "Todo"
  }
];

const createDefaultCategories = () => ({
  misc: [],
  work: [],
  music: [],
  travel: [],
  study: [],
  home: [],
  art: [],
  shopping: []
});

const createDefaultState = () => ({
  username: "",
  usernameSaved: false,
  activeDialog: null,
  activeCategory: "all",
  quoteIndex: 0,
  categories: createDefaultCategories(),
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
  quote: fallbackQuotes[0],
  quoteLoading: false
});

const normalizeTask = task => ({
  id: task.id || `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: typeof task.title === "string" ? task.title.trim() : "",
  description: typeof task.description === "string" ? task.description.trim() : "",
  category: task.category,
  done: Boolean(task.done),
  createdAt: task.createdAt || new Date().toISOString()
});

const loadPersistedState = () => {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) {
      return createDefaultState();
    }

    const parsedState = JSON.parse(rawState);
    const defaultState = createDefaultState();
    const categories = createDefaultCategories();

    Object.keys(categories).forEach(category => {
      const hasPersistedCategory =
        parsedState.categories && Array.isArray(parsedState.categories[category]);
      const persistedTasks = hasPersistedCategory ? parsedState.categories[category] : [];
      categories[category] = persistedTasks
        .map(task => normalizeTask({ ...task, category }))
        .filter(task => task.title);
    });

    return {
      ...defaultState,
      username:
        typeof parsedState.username === "string" ? parsedState.username.trim() : "",
      usernameSaved: Boolean(parsedState.usernameSaved && parsedState.username),
      activeCategory:
        parsedState.activeCategory && parsedState.activeCategory in categories
          ? parsedState.activeCategory
          : "all",
      quoteIndex:
        typeof parsedState.quoteIndex === "number"
          ? parsedState.quoteIndex % fallbackQuotes.length
          : 0,
      categories,
      quote:
        parsedState.quote && parsedState.quote.content
          ? parsedState.quote
          : fallbackQuotes[0]
    };
  } catch (error) {
    return createDefaultState();
  }
};

const persistState = state => {
  if (typeof window === "undefined") {
    return;
  }

  const persistedState = {
    username: state.username,
    usernameSaved: state.usernameSaved,
    activeCategory: state.activeCategory,
    quoteIndex: state.quoteIndex,
    categories: state.categories,
    quote: state.quote
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
};

const store = new Vuex.Store({
  state: loadPersistedState(),
  mutations: {
    UPDATE_USERNAME(state, username) {
      state.username = username.replace(/^\s+/, "");
    },
    SAVE_USERNAME(state) {
      state.usernameSaved = Boolean(state.username.trim());
      state.username = state.username.trim();
    },
    ADD_TASK(state, task) {
      state.categories[task.category].unshift(normalizeTask(task));
    },
    DELETE_TASK(state, task) {
      state.categories[task.category] = state.categories[task.category].filter(
        currentTask => currentTask.id !== task.id
      );
    },
    SET_QUOTE_LOADING(state, isLoading) {
      state.quoteLoading = isLoading;
    },
    SET_QUOTE(state, quote) {
      state.quote = quote;
    },
    SET_QUOTE_INDEX(state, quoteIndex) {
      state.quoteIndex = quoteIndex;
    },
    OPEN_DIALOG(state, dialogName) {
      state.activeDialog = dialogName;
    },
    CLOSE_DIALOG(state) {
      state.activeDialog = null;
    },
    TOGGLE_TASK_STATUS(state, task) {
      const taskToUpdate = state.categories[task.category].find(
        currentTask => currentTask.id === task.id
      );

      if (taskToUpdate) {
        taskToUpdate.done = !taskToUpdate.done;
      }
    },
    SET_ACTIVE_CATEGORY(state, category) {
      state.activeCategory = category;
    }
  },
  actions: {
    updateUsername({ commit }, username) {
      commit("UPDATE_USERNAME", username);
    },
    saveUsername({ commit }) {
      commit("SAVE_USERNAME");
    },
    addTask({ commit }, task) {
      commit("ADD_TASK", task);
    },
    deleteTask({ commit }, task) {
      commit("DELETE_TASK", task);
    },
    loadQuote({ commit, state }) {
      commit("SET_QUOTE_LOADING", true);
      const nextIndex = (state.quoteIndex + 1) % fallbackQuotes.length;
      commit("SET_QUOTE_INDEX", nextIndex);
      commit("SET_QUOTE", fallbackQuotes[nextIndex]);
      commit("SET_QUOTE_LOADING", false);
    },
    openAddTask({ commit }) {
      commit("OPEN_DIALOG", "add-task");
    },
    openTasksForCategory({ commit }, category) {
      commit("SET_ACTIVE_CATEGORY", category);
      commit("OPEN_DIALOG", "tasks");
    },
    closeDialog({ commit }) {
      commit("CLOSE_DIALOG");
    },
    toggleTaskStatus({ commit }, task) {
      commit("TOGGLE_TASK_STATUS", task);
    },
    setActiveCategory({ commit }, category) {
      commit("SET_ACTIVE_CATEGORY", category);
    }
  },
  getters: {
    getUsername: state => state.username,
    getUsernameSaved: state => state.usernameSaved,
    getDummyNames: state => state.dummyNames,
    getQuote: state => state.quote,
    getQuoteLoading: state => state.quoteLoading,
    getTasks: state => {
      if (state.activeCategory === "all") {
        return Object.keys(state.categories)
          .flatMap(category => state.categories[category])
          .sort((firstTask, secondTask) =>
            firstTask.createdAt < secondTask.createdAt ? 1 : -1
          );
      }

      return state.categories[state.activeCategory] || [];
    },
    getCategories: state => state.categories,
    getAddTaskVisible: state => state.activeDialog === "add-task",
    getTasksCount: state =>
      Object.values(state.categories).reduce(
        (count, tasks) => count + tasks.length,
        0
      ),
    getTasksVisible: state => state.activeDialog === "tasks",
    getActiveCategory: state => state.activeCategory
  }
});

store.subscribe((mutation, state) => {
  if (mutation.type !== "SET_QUOTE_LOADING") {
    persistState(state);
  }
});

export default store;
