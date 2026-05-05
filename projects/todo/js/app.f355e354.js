/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/projects/todo/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("56d7");


/***/ }),

/***/ "1ad2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("60cf");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "531e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("58d3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_List_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "56d7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/vue-headful/dist/vue-headful.js
var vue_headful = __webpack_require__("ec02");
var vue_headful_default = /*#__PURE__*/__webpack_require__.n(vue_headful);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.flat-map.js
var es_array_flat_map = __webpack_require__("5db7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat-map.js
var es_array_unscopables_flat_map = __webpack_require__("73d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__("07ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./src/store.js
























function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
var STORAGE_KEY = "todo-app-state-v2";
var fallbackQuotes = [{
  content: "Small steps add up faster than grand plans.",
  author: "Todo"
}, {
  content: "Clear lists reduce friction. Friction kills momentum.",
  author: "Todo"
}, {
  content: "Finish the obvious thing first.",
  author: "Todo"
}];

var createDefaultCategories = function createDefaultCategories() {
  return {
    misc: [],
    work: [],
    music: [],
    travel: [],
    study: [],
    home: [],
    art: [],
    shopping: []
  };
};

var createDefaultState = function createDefaultState() {
  return {
    username: "",
    usernameSaved: false,
    activeDialog: null,
    activeCategory: "all",
    quoteIndex: 0,
    categories: createDefaultCategories(),
    dummyNames: ["Ronald", "Jessica", "Deborah", "Howard", "Donald", "Kathy", "Jerry", "Stephanie", "Paul", "Anthony"],
    quote: fallbackQuotes[0],
    quoteLoading: false
  };
};

var normalizeTask = function normalizeTask(task) {
  return {
    id: task.id || "task-".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 8)),
    title: typeof task.title === "string" ? task.title.trim() : "",
    description: typeof task.description === "string" ? task.description.trim() : "",
    category: task.category,
    done: Boolean(task.done),
    createdAt: task.createdAt || new Date().toISOString()
  };
};

var loadPersistedState = function loadPersistedState() {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  try {
    var rawState = window.localStorage.getItem(STORAGE_KEY);

    if (!rawState) {
      return createDefaultState();
    }

    var parsedState = JSON.parse(rawState);
    var defaultState = createDefaultState();
    var categories = createDefaultCategories();
    Object.keys(categories).forEach(function (category) {
      var hasPersistedCategory = parsedState.categories && Array.isArray(parsedState.categories[category]);
      var persistedTasks = hasPersistedCategory ? parsedState.categories[category] : [];
      categories[category] = persistedTasks.map(function (task) {
        return normalizeTask(_objectSpread({}, task, {
          category: category
        }));
      }).filter(function (task) {
        return task.title;
      });
    });
    return _objectSpread({}, defaultState, {
      username: typeof parsedState.username === "string" ? parsedState.username.trim() : "",
      usernameSaved: Boolean(parsedState.usernameSaved && parsedState.username),
      activeCategory: parsedState.activeCategory && parsedState.activeCategory in categories ? parsedState.activeCategory : "all",
      quoteIndex: typeof parsedState.quoteIndex === "number" ? parsedState.quoteIndex % fallbackQuotes.length : 0,
      categories: categories,
      quote: parsedState.quote && parsedState.quote.content ? parsedState.quote : fallbackQuotes[0]
    });
  } catch (error) {
    return createDefaultState();
  }
};

var persistState = function persistState(state) {
  if (typeof window === "undefined") {
    return;
  }

  var persistedState = {
    username: state.username,
    usernameSaved: state.usernameSaved,
    activeCategory: state.activeCategory,
    quoteIndex: state.quoteIndex,
    categories: state.categories,
    quote: state.quote
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
};

var store = new vuex_esm["a" /* default */].Store({
  state: loadPersistedState(),
  mutations: {
    UPDATE_USERNAME: function UPDATE_USERNAME(state, username) {
      state.username = username.replace(/^\s+/, "");
    },
    SAVE_USERNAME: function SAVE_USERNAME(state) {
      state.usernameSaved = Boolean(state.username.trim());
      state.username = state.username.trim();
    },
    ADD_TASK: function ADD_TASK(state, task) {
      state.categories[task.category].unshift(normalizeTask(task));
    },
    DELETE_TASK: function DELETE_TASK(state, task) {
      state.categories[task.category] = state.categories[task.category].filter(function (currentTask) {
        return currentTask.id !== task.id;
      });
    },
    SET_QUOTE_LOADING: function SET_QUOTE_LOADING(state, isLoading) {
      state.quoteLoading = isLoading;
    },
    SET_QUOTE: function SET_QUOTE(state, quote) {
      state.quote = quote;
    },
    SET_QUOTE_INDEX: function SET_QUOTE_INDEX(state, quoteIndex) {
      state.quoteIndex = quoteIndex;
    },
    OPEN_DIALOG: function OPEN_DIALOG(state, dialogName) {
      state.activeDialog = dialogName;
    },
    CLOSE_DIALOG: function CLOSE_DIALOG(state) {
      state.activeDialog = null;
    },
    TOGGLE_TASK_STATUS: function TOGGLE_TASK_STATUS(state, task) {
      var taskToUpdate = state.categories[task.category].find(function (currentTask) {
        return currentTask.id === task.id;
      });

      if (taskToUpdate) {
        taskToUpdate.done = !taskToUpdate.done;
      }
    },
    SET_ACTIVE_CATEGORY: function SET_ACTIVE_CATEGORY(state, category) {
      state.activeCategory = category;
    }
  },
  actions: {
    updateUsername: function updateUsername(_ref, username) {
      var commit = _ref.commit;
      commit("UPDATE_USERNAME", username);
    },
    saveUsername: function saveUsername(_ref2) {
      var commit = _ref2.commit;
      commit("SAVE_USERNAME");
    },
    addTask: function addTask(_ref3, task) {
      var commit = _ref3.commit;
      commit("ADD_TASK", task);
    },
    deleteTask: function deleteTask(_ref4, task) {
      var commit = _ref4.commit;
      commit("DELETE_TASK", task);
    },
    loadQuote: function loadQuote(_ref5) {
      var commit = _ref5.commit,
          state = _ref5.state;
      commit("SET_QUOTE_LOADING", true);
      var nextIndex = (state.quoteIndex + 1) % fallbackQuotes.length;
      commit("SET_QUOTE_INDEX", nextIndex);
      commit("SET_QUOTE", fallbackQuotes[nextIndex]);
      commit("SET_QUOTE_LOADING", false);
    },
    openAddTask: function openAddTask(_ref6) {
      var commit = _ref6.commit;
      commit("OPEN_DIALOG", "add-task");
    },
    openTasksForCategory: function openTasksForCategory(_ref7, category) {
      var commit = _ref7.commit;
      commit("SET_ACTIVE_CATEGORY", category);
      commit("OPEN_DIALOG", "tasks");
    },
    closeDialog: function closeDialog(_ref8) {
      var commit = _ref8.commit;
      commit("CLOSE_DIALOG");
    },
    toggleTaskStatus: function toggleTaskStatus(_ref9, task) {
      var commit = _ref9.commit;
      commit("TOGGLE_TASK_STATUS", task);
    },
    setActiveCategory: function setActiveCategory(_ref10, category) {
      var commit = _ref10.commit;
      commit("SET_ACTIVE_CATEGORY", category);
    }
  },
  getters: {
    getUsername: function getUsername(state) {
      return state.username;
    },
    getUsernameSaved: function getUsernameSaved(state) {
      return state.usernameSaved;
    },
    getDummyNames: function getDummyNames(state) {
      return state.dummyNames;
    },
    getQuote: function getQuote(state) {
      return state.quote;
    },
    getQuoteLoading: function getQuoteLoading(state) {
      return state.quoteLoading;
    },
    getTasks: function getTasks(state) {
      if (state.activeCategory === "all") {
        return Object.keys(state.categories).flatMap(function (category) {
          return state.categories[category];
        }).sort(function (firstTask, secondTask) {
          return firstTask.createdAt < secondTask.createdAt ? 1 : -1;
        });
      }

      return state.categories[state.activeCategory] || [];
    },
    getCategories: function getCategories(state) {
      return state.categories;
    },
    getAddTaskVisible: function getAddTaskVisible(state) {
      return state.activeDialog === "add-task";
    },
    getTasksCount: function getTasksCount(state) {
      return Object.values(state.categories).reduce(function (count, tasks) {
        return count + tasks.length;
      }, 0);
    },
    getTasksVisible: function getTasksVisible(state) {
      return state.activeDialog === "tasks";
    },
    getActiveCategory: function getActiveCategory(state) {
      return state.activeCategory;
    }
  }
});
store.subscribe(function (mutation, state) {
  if (mutation.type !== "SET_QUOTE_LOADING") {
    persistState(state);
  }
});
/* harmony default export */ var src_store = (store);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=2f422085&
var Appvue_type_template_id_2f422085_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('vue-headful',{attrs:{"title":"Todo","description":"A minimal category-based todo app built with Vue"}}),_c('main',{staticClass:"app-shell"},[_c('section',{staticClass:"app-panel"},[(_vm.getUsernameSaved)?[_c('header',{staticClass:"app-header"},[_c('p',{staticClass:"eyebrow"},[_vm._v("Simple planning")]),_c('div',{staticClass:"app-header__row"},[_c('div',[_c('h1',{staticClass:"main-heading"},[_vm._v("Hello, "+_vm._s(_vm.getUsername)+".")]),_c('p',{staticClass:"app-copy"},[_vm._v(" Capture tasks quickly, keep categories tidy, and finish work without noise. ")])])])]),_c('Quote'),_c('List')]:_c('NewUser')],2)]),_c('transition',{attrs:{"name":"fade"}},[_c('AddTask',{directives:[{name:"show",rawName:"v-show",value:(_vm.getAddTaskVisible),expression:"getAddTaskVisible"}]})],1),_c('transition',{attrs:{"name":"fade"}},[_c('Tasks',{directives:[{name:"show",rawName:"v-show",value:(_vm.getTasksVisible),expression:"getTasksVisible"}]})],1),_c('Overlay')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=2f422085&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NewUser.vue?vue&type=template&id=60dc5b56&
var NewUservue_type_template_id_60dc5b56_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"new-user"},[_c('p',{staticClass:"eyebrow"},[_vm._v("Todo")]),_c('h1',{staticClass:"main-heading"},[_vm._v("A simple list, kept in order.")]),_c('p',{staticClass:"new-user__copy"},[_vm._v(" This project is a lightweight personal planner. Add your name once, then keep tasks grouped into clear buckets. ")]),_c('form',{staticClass:"new-user__form",on:{"submit":function($event){$event.preventDefault();return _vm.saveUsernameInStore($event)}}},[_c('label',{staticClass:"new-user__label",attrs:{"for":"username"}},[_vm._v("Your name")]),_c('div',{staticClass:"new-user__input-container"},[_c('div',{staticClass:"new-user__placeholders-container",class:{ 'new-user__placeholders-container--hidden': _vm.username },attrs:{"aria-hidden":"true"}},_vm._l((_vm.getDummyNames),function(dummyName){return _c('span',{key:dummyName,staticClass:"new-user__placeholder"},[_vm._v(" "+_vm._s(dummyName)+" ")])}),0),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.username),expression:"username",modifiers:{"trim":true}}],staticClass:"new-user__input",attrs:{"id":"username","required":"","type":"text","placeholder":_vm.username ? '' : _vm.placeholderName,"autocomplete":"name","maxlength":"40"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value.trim()},"blur":function($event){return _vm.$forceUpdate()}}})]),(_vm.errorMessage)?_c('p',{staticClass:"new-user__error",attrs:{"role":"alert"}},[_vm._v(" "+_vm._s(_vm.errorMessage)+" ")]):_vm._e(),_c('button',{staticClass:"btn btn--blue",attrs:{"type":"submit"}},[_vm._v(" Continue ")])])])}
var NewUservue_type_template_id_60dc5b56_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/NewUser.vue?vue&type=template&id=60dc5b56&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NewUser.vue?vue&type=script&lang=js&









function NewUservue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function NewUservue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { NewUservue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { NewUservue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var NewUservue_type_script_lang_js_ = ({
  name: "NewUser",
  data: function data() {
    return {
      username: "",
      errorMessage: ""
    };
  },
  computed: NewUservue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getDummyNames"]), {
    placeholderName: function placeholderName() {
      return this.getDummyNames[0] || "Alex";
    }
  }),
  methods: NewUservue_type_script_lang_js_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(["updateUsername", "saveUsername"]), {
    saveUsernameInStore: function saveUsernameInStore() {
      if (!this.username) {
        this.errorMessage = "A name is required so the app can personalize the workspace.";
        return;
      }

      this.updateUsername(this.username);
      this.saveUsername();
    }
  })
});
// CONCATENATED MODULE: ./src/components/NewUser.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_NewUservue_type_script_lang_js_ = (NewUservue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/NewUser.vue?vue&type=style&index=0&lang=stylus&
var NewUservue_type_style_index_0_lang_stylus_ = __webpack_require__("ff88");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/NewUser.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_NewUservue_type_script_lang_js_,
  NewUservue_type_template_id_60dc5b56_render,
  NewUservue_type_template_id_60dc5b56_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NewUser = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Quote.vue?vue&type=template&id=57660be0&
var Quotevue_type_template_id_57660be0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('blockquote',{staticClass:"quote"},[_c('div',[_c('p',{staticClass:"quote__eyebrow"},[_vm._v("Daily note")]),_c('p',{staticClass:"quote__text"},[_vm._v(" "+_vm._s(_vm.quoteText)+" ")]),_c('footer',{staticClass:"quote__author"},[_vm._v(_vm._s(_vm.quoteAuthor))])]),_c('button',{staticClass:"quote__refresh",attrs:{"type":"button","aria-busy":_vm.getQuoteLoading ? 'true' : 'false',"aria-label":"Load a new quote"},on:{"click":_vm.loadQuote}},[_c('font-awesome-icon',{attrs:{"icon":"sync-alt"}}),_c('span',[_vm._v(_vm._s(_vm.getQuoteLoading ? "Loading" : "Refresh"))])],1)])}
var Quotevue_type_template_id_57660be0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Quote.vue?vue&type=template&id=57660be0&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Quote.vue?vue&type=script&lang=js&









function Quotevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Quotevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Quotevue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Quotevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var Quotevue_type_script_lang_js_ = ({
  name: "Quote",
  computed: Quotevue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getQuote", "getQuoteLoading"]), {
    quoteText: function quoteText() {
      return this.getQuote.content || "Loading a short note...";
    },
    quoteAuthor: function quoteAuthor() {
      return this.getQuote.author || "Todo";
    }
  }),
  methods: Quotevue_type_script_lang_js_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(["loadQuote"])),
  mounted: function mounted() {
    this.loadQuote();
  }
});
// CONCATENATED MODULE: ./src/components/Quote.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Quotevue_type_script_lang_js_ = (Quotevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Quote.vue?vue&type=style&index=0&lang=stylus&
var Quotevue_type_style_index_0_lang_stylus_ = __webpack_require__("d68e");

// CONCATENATED MODULE: ./src/components/Quote.vue






/* normalize component */

var Quote_component = Object(componentNormalizer["a" /* default */])(
  components_Quotevue_type_script_lang_js_,
  Quotevue_type_template_id_57660be0_render,
  Quotevue_type_template_id_57660be0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Quote = (Quote_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/List.vue?vue&type=template&id=4be8af78&
var Listvue_type_template_id_4be8af78_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"tasks"},[_c('div',{staticClass:"tasks__topline"},[_vm._m(0),_c('button',{staticClass:"btn btn--blue tasks__cta",attrs:{"type":"button"},on:{"click":_vm.openAddTask}},[_c('font-awesome-icon',{attrs:{"icon":"plus"}}),_vm._v(" Add task ")],1)]),(_vm.getTasksCount === 0)?_c('div',{staticClass:"empty-state"},[_c('p',{staticClass:"empty-state__title"},[_vm._v("No tasks yet.")]),_c('p',{staticClass:"empty-state__copy"},[_vm._v(" Start with one small task and sort it into the category that fits best. ")]),_c('button',{staticClass:"btn btn--ghost",attrs:{"type":"button"},on:{"click":_vm.openAddTask}},[_vm._v(" Create the first task ")])]):_c('Categories')],1)}
var Listvue_type_template_id_4be8af78_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h2',{staticClass:"tasks__heading"},[_vm._v("Tasks by category")]),_c('p',{staticClass:"tasks__copy"},[_vm._v(" Open a category to review tasks, mark progress, or delete clutter. ")])])}]


// CONCATENATED MODULE: ./src/components/List.vue?vue&type=template&id=4be8af78&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Categories.vue?vue&type=template&id=826a59fe&
var Categoriesvue_type_template_id_826a59fe_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"categories-container",attrs:{"aria-label":"Task categories"}},[_c('button',{staticClass:"category",attrs:{"type":"button"},on:{"click":function($event){return _vm.openTasksForCategory('all')}}},[_c('font-awesome-icon',{staticClass:"category__icon",attrs:{"icon":_vm.categoryMeta.all.icon}}),_c('p',{staticClass:"category__title"},[_vm._v(_vm._s(_vm.categoryMeta.all.label))]),_c('span',{staticClass:"category__tasks-amount"},[_vm._v(_vm._s(_vm.getTasksCount)+" tasks total")])],1),_vm._l((_vm.filledCategories),function(category){return _c('button',{key:category.categoryName,staticClass:"category",attrs:{"type":"button"},on:{"click":function($event){return _vm.openTasksForCategory(category.categoryName)}}},[_c('font-awesome-icon',{staticClass:"category__icon",attrs:{"icon":_vm.categoryMeta[category.categoryName].icon}}),_c('p',{staticClass:"category__title"},[_vm._v(" "+_vm._s(_vm.categoryMeta[category.categoryName].label)+" ")]),_c('span',{staticClass:"category__tasks-amount"},[_vm._v(_vm._s(category.tasks.length)+" tasks")])],1)})],2)}
var Categoriesvue_type_template_id_826a59fe_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Categories.vue?vue&type=template&id=826a59fe&

// CONCATENATED MODULE: ./src/categoryMeta.js
var categoryMeta = {
  all: {
    label: "All tasks",
    icon: "clipboard"
  },
  misc: {
    label: "Misc",
    icon: "sticky-note"
  },
  work: {
    label: "Work",
    icon: "briefcase"
  },
  music: {
    label: "Music",
    icon: "music"
  },
  travel: {
    label: "Travel",
    icon: "plane"
  },
  study: {
    label: "Study",
    icon: "graduation-cap"
  },
  home: {
    label: "Home",
    icon: "home"
  },
  art: {
    label: "Art",
    icon: "palette"
  },
  shopping: {
    label: "Shopping",
    icon: "shopping-cart"
  }
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Categories.vue?vue&type=script&lang=js&










function Categoriesvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Categoriesvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Categoriesvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Categoriesvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Categoriesvue_type_script_lang_js_ = ({
  name: "Categories",
  data: function data() {
    return {
      categoryMeta: categoryMeta
    };
  },
  computed: Categoriesvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getCategories", "getTasksCount"]), {
    filledCategories: function filledCategories() {
      var _this = this;

      return Object.keys(this.getCategories).filter(function (category) {
        return _this.getCategories[category].length > 0;
      }).map(function (category) {
        return {
          categoryName: category,
          tasks: _this.getCategories[category]
        };
      });
    }
  }),
  methods: Categoriesvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(["openTasksForCategory"]))
});
// CONCATENATED MODULE: ./src/components/Categories.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Categoriesvue_type_script_lang_js_ = (Categoriesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Categories.vue?vue&type=style&index=0&lang=stylus&
var Categoriesvue_type_style_index_0_lang_stylus_ = __webpack_require__("a45c");

// CONCATENATED MODULE: ./src/components/Categories.vue






/* normalize component */

var Categories_component = Object(componentNormalizer["a" /* default */])(
  components_Categoriesvue_type_script_lang_js_,
  Categoriesvue_type_template_id_826a59fe_render,
  Categoriesvue_type_template_id_826a59fe_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Categories = (Categories_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/List.vue?vue&type=script&lang=js&









function Listvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Listvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Listvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Listvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Listvue_type_script_lang_js_ = ({
  name: "List",
  components: {
    Categories: Categories
  },
  computed: Listvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getTasksCount"])),
  methods: Listvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(["openAddTask"]))
});
// CONCATENATED MODULE: ./src/components/List.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Listvue_type_script_lang_js_ = (Listvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/List.vue?vue&type=style&index=0&lang=stylus&
var Listvue_type_style_index_0_lang_stylus_ = __webpack_require__("531e");

// CONCATENATED MODULE: ./src/components/List.vue






/* normalize component */

var List_component = Object(componentNormalizer["a" /* default */])(
  components_Listvue_type_script_lang_js_,
  Listvue_type_template_id_4be8af78_render,
  Listvue_type_template_id_4be8af78_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var List = (List_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AddTask.vue?vue&type=template&id=2ee025b8&
var AddTaskvue_type_template_id_2ee025b8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"dialog-shell",attrs:{"role":"dialog","aria-modal":"true","aria-labelledby":"add-task-title"}},[_c('form',{staticClass:"dialog-card add-task",on:{"submit":function($event){$event.preventDefault();return _vm.submitTask($event)}}},[_c('header',{staticClass:"dialog-header"},[_vm._m(0),_c('button',{staticClass:"dialog-close",attrs:{"type":"button","aria-label":"Close add task dialog"},on:{"click":_vm.closeDialog}},[_c('font-awesome-icon',{attrs:{"icon":"times"}})],1)]),_c('label',{staticClass:"field"},[_c('span',{staticClass:"field__label"},[_vm._v("Title")]),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.title),expression:"title",modifiers:{"trim":true}}],ref:"titleInput",staticClass:"field__input",attrs:{"type":"text","maxlength":"80","placeholder":"Ship portfolio refresh"},domProps:{"value":(_vm.title)},on:{"input":function($event){if($event.target.composing){ return; }_vm.title=$event.target.value.trim()},"blur":function($event){return _vm.$forceUpdate()}}})]),_c('label',{staticClass:"field"},[_c('span',{staticClass:"field__label"},[_vm._v("Notes")]),_c('textarea',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.description),expression:"description",modifiers:{"trim":true}}],staticClass:"field__input field__input--textarea",attrs:{"rows":"4","maxlength":"240","placeholder":"Optional details, context, or next step."},domProps:{"value":(_vm.description)},on:{"input":function($event){if($event.target.composing){ return; }_vm.description=$event.target.value.trim()},"blur":function($event){return _vm.$forceUpdate()}}})]),_c('label',{staticClass:"field"},[_c('span',{staticClass:"field__label"},[_vm._v("Category")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.category),expression:"category"}],staticClass:"field__input field__input--select",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.category=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{"value":"","disabled":"","hidden":""}},[_vm._v("Select a category")]),_vm._l((_vm.getCategories),function(value,categoryName){return _c('option',{key:categoryName,domProps:{"value":categoryName}},[_vm._v(" "+_vm._s(categoryName.replace(/^\w/, function (c) { return c.toUpperCase(); }))+" ")])})],2)]),(_vm.errorMessage)?_c('p',{staticClass:"dialog-error",attrs:{"role":"alert"}},[_vm._v(" "+_vm._s(_vm.errorMessage)+" ")]):_vm._e(),_c('footer',{staticClass:"dialog-actions"},[_c('button',{staticClass:"btn btn--ghost",attrs:{"type":"button"},on:{"click":_vm.closeDialog}},[_vm._v(" Cancel ")]),_c('button',{staticClass:"btn btn--blue",attrs:{"type":"submit"}},[_vm._v(" Add task ")])])])])}
var AddTaskvue_type_template_id_2ee025b8_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',{staticClass:"dialog-kicker"},[_vm._v("Create")]),_c('h2',{staticClass:"dialog-title",attrs:{"id":"add-task-title"}},[_vm._v("New task")])])}]


// CONCATENATED MODULE: ./src/components/AddTask.vue?vue&type=template&id=2ee025b8&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AddTask.vue?vue&type=script&lang=js&










function AddTaskvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function AddTaskvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { AddTaskvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { AddTaskvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var AddTaskvue_type_script_lang_js_ = ({
  name: "AddTask",
  data: function data() {
    return {
      title: "",
      description: "",
      category: "",
      errorMessage: ""
    };
  },
  computed: AddTaskvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getCategories", "getAddTaskVisible"])),
  methods: AddTaskvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(["addTask", "closeDialog"]), {
    resetForm: function resetForm() {
      this.title = "";
      this.description = "";
      this.category = "";
      this.errorMessage = "";
    },
    focusTitleInput: function focusTitleInput() {
      var _this = this;

      this.$nextTick(function () {
        if (_this.$refs.titleInput) {
          _this.$refs.titleInput.focus();
        }
      });
    },
    submitTask: function submitTask() {
      if (!this.title) {
        this.errorMessage = "Add a short title so the task can be recognized later.";
        this.focusTitleInput();
        return;
      }

      if (!this.category) {
        this.errorMessage = "Choose a category to keep the list structured.";
        return;
      }

      this.addTask({
        title: this.title,
        description: this.description,
        category: this.category,
        done: false
      });
      this.resetForm();
      this.closeDialog();
    }
  }),
  watch: {
    getAddTaskVisible: function getAddTaskVisible(isVisible) {
      if (isVisible) {
        this.focusTitleInput();
      } else {
        this.resetForm();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/AddTask.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_AddTaskvue_type_script_lang_js_ = (AddTaskvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/AddTask.vue?vue&type=style&index=0&lang=stylus&
var AddTaskvue_type_style_index_0_lang_stylus_ = __webpack_require__("e801");

// CONCATENATED MODULE: ./src/components/AddTask.vue






/* normalize component */

var AddTask_component = Object(componentNormalizer["a" /* default */])(
  components_AddTaskvue_type_script_lang_js_,
  AddTaskvue_type_template_id_2ee025b8_render,
  AddTaskvue_type_template_id_2ee025b8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AddTask = (AddTask_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Overlay.vue?vue&type=template&id=864f8f3e&
var Overlayvue_type_template_id_864f8f3e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.overlayClasses,attrs:{"aria-hidden":_vm.overlayActive ? 'false' : 'true'},on:{"click":_vm.closeDialog}})}
var Overlayvue_type_template_id_864f8f3e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Overlay.vue?vue&type=template&id=864f8f3e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Overlay.vue?vue&type=script&lang=js&









function Overlayvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Overlayvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Overlayvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Overlayvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//

/* harmony default export */ var Overlayvue_type_script_lang_js_ = ({
  name: "Overlay",
  computed: Overlayvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getAddTaskVisible", "getTasksVisible"]), {
    overlayActive: function overlayActive() {
      return this.getAddTaskVisible || this.getTasksVisible;
    },
    overlayClasses: function overlayClasses() {
      return this.overlayActive ? "overlay overlay--active" : "overlay";
    }
  }),
  methods: Overlayvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(["closeDialog"]))
});
// CONCATENATED MODULE: ./src/components/Overlay.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Overlayvue_type_script_lang_js_ = (Overlayvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Overlay.vue?vue&type=style&index=0&lang=stylus&
var Overlayvue_type_style_index_0_lang_stylus_ = __webpack_require__("b3d6");

// CONCATENATED MODULE: ./src/components/Overlay.vue






/* normalize component */

var Overlay_component = Object(componentNormalizer["a" /* default */])(
  components_Overlayvue_type_script_lang_js_,
  Overlayvue_type_template_id_864f8f3e_render,
  Overlayvue_type_template_id_864f8f3e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Overlay = (Overlay_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"10ee0e73-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Tasks.vue?vue&type=template&id=465338be&
var Tasksvue_type_template_id_465338be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"dialog-shell",attrs:{"role":"dialog","aria-modal":"true","aria-labelledby":"tasks-title"}},[_c('div',{staticClass:"dialog-card category-tasks"},[_c('header',{staticClass:"dialog-header category-tasks__header"},[_c('div',[_c('p',{staticClass:"dialog-kicker"},[_vm._v("Review")]),_c('h2',{staticClass:"dialog-title",attrs:{"id":"tasks-title"}},[_vm._v(" "+_vm._s(_vm.activeCategoryLabel)+" ")]),_c('p',{staticClass:"category-tasks__copy"},[_vm._v(" "+_vm._s(_vm.getTasks.length)+" "+_vm._s(_vm.getTasks.length === 1 ? "task" : "tasks")+" ")])]),_c('button',{staticClass:"dialog-close",attrs:{"type":"button","aria-label":"Close tasks dialog"},on:{"click":_vm.closeDialog}},[_c('font-awesome-icon',{attrs:{"icon":"times"}})],1)]),(_vm.getTasks.length === 0)?_c('p',{staticClass:"category-tasks__empty"},[_vm._v(" Nothing here yet. ")]):_c('ul',{staticClass:"category-tasks-list"},_vm._l((_vm.getTasks),function(task){return _c('li',{key:task.id,staticClass:"category-task",class:{ 'category-task--done': task.done }},[_c('div',{staticClass:"category-task__content"},[_c('div',{staticClass:"category-task__title-row"},[_c('p',{staticClass:"category-task__title"},[_vm._v(" "+_vm._s(task.title)+" ")]),(task.done)?_c('span',{staticClass:"category-task__badge"},[_vm._v(" Done ")]):_vm._e()]),(task.description)?_c('p',{staticClass:"category-task__description"},[_vm._v(" "+_vm._s(task.description)+" ")]):_vm._e()]),_c('div',{staticClass:"category-task__buttons"},[_c('button',{staticClass:"category-task__action category-task__action--status",attrs:{"type":"button","aria-pressed":task.done ? 'true' : 'false',"aria-label":task.done ? 'Mark task as incomplete' : 'Mark task as complete'},on:{"click":function($event){return _vm.toggleTaskStatusForTask(task)}}},[_c('font-awesome-icon',{attrs:{"icon":"check"}})],1),_c('button',{staticClass:"category-task__action category-task__action--delete",attrs:{"type":"button","aria-label":"Delete task"},on:{"click":function($event){return _vm.deleteTask(task)}}},[_c('font-awesome-icon',{attrs:{"icon":"trash"}})],1)])])}),0)])])}
var Tasksvue_type_template_id_465338be_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Tasks.vue?vue&type=template&id=465338be&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Tasks.vue?vue&type=script&lang=js&









function Tasksvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Tasksvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Tasksvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Tasksvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Tasksvue_type_script_lang_js_ = ({
  name: "Tasks",
  computed: Tasksvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getTasks", "getActiveCategory"]), {
    activeCategoryLabel: function activeCategoryLabel() {
      return categoryMeta[this.getActiveCategory].label;
    }
  }),
  methods: Tasksvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["b" /* mapActions */])(["deleteTask", "toggleTaskStatus", "closeDialog"]), {
    toggleTaskStatusForTask: function toggleTaskStatusForTask(task) {
      this.toggleTaskStatus(task);
    }
  })
});
// CONCATENATED MODULE: ./src/components/Tasks.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Tasksvue_type_script_lang_js_ = (Tasksvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Tasks.vue?vue&type=style&index=0&lang=stylus&
var Tasksvue_type_style_index_0_lang_stylus_ = __webpack_require__("1ad2");

// CONCATENATED MODULE: ./src/components/Tasks.vue






/* normalize component */

var Tasks_component = Object(componentNormalizer["a" /* default */])(
  components_Tasksvue_type_script_lang_js_,
  Tasksvue_type_template_id_465338be_render,
  Tasksvue_type_template_id_465338be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Tasks = (Tasks_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js&









function Appvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Appvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Appvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Appvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: "Todo",
  computed: Appvue_type_script_lang_js_objectSpread({}, Object(vuex_esm["c" /* mapGetters */])(["getUsername", "getUsernameSaved", "getAddTaskVisible", "getTasksVisible"])),
  methods: {
    handleEscapeKey: function handleEscapeKey(event) {
      if (event.key === "Escape" && (this.getAddTaskVisible || this.getTasksVisible)) {
        this.$store.dispatch("closeDialog");
      }
    }
  },
  mounted: function mounted() {
    window.addEventListener("keydown", this.handleEscapeKey);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("keydown", this.handleEscapeKey);
  },
  components: {
    NewUser: NewUser,
    Quote: Quote,
    List: List,
    AddTask: AddTask,
    Overlay: Overlay,
    Tasks: Tasks
  }
});
// CONCATENATED MODULE: ./src/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/App.vue?vue&type=style&index=0&lang=stylus&
var Appvue_type_style_index_0_lang_stylus_ = __webpack_require__("7faf");

// CONCATENATED MODULE: ./src/App.vue






/* normalize component */

var App_component = Object(componentNormalizer["a" /* default */])(
  src_Appvue_type_script_lang_js_,
  Appvue_type_template_id_2f422085_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (App_component.exports);
// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/index.es.js
var index_es = __webpack_require__("ecee");

// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.es.js
var free_solid_svg_icons_index_es = __webpack_require__("c074");

// EXTERNAL MODULE: ./node_modules/@fortawesome/vue-fontawesome/index.es.js
var vue_fontawesome_index_es = __webpack_require__("ad3d");

// CONCATENATED MODULE: ./src/main.js











index_es["d" /* library */].add(free_solid_svg_icons_index_es["m" /* faTimes */], free_solid_svg_icons_index_es["k" /* faStickyNote */], free_solid_svg_icons_index_es["a" /* faBriefcase */], free_solid_svg_icons_index_es["f" /* faMusic */], free_solid_svg_icons_index_es["h" /* faPlane */], free_solid_svg_icons_index_es["d" /* faGraduationCap */], free_solid_svg_icons_index_es["e" /* faHome */], free_solid_svg_icons_index_es["g" /* faPalette */], free_solid_svg_icons_index_es["j" /* faShoppingCart */], free_solid_svg_icons_index_es["i" /* faPlus */], free_solid_svg_icons_index_es["l" /* faSyncAlt */], free_solid_svg_icons_index_es["c" /* faClipboard */], free_solid_svg_icons_index_es["b" /* faCheck */], free_solid_svg_icons_index_es["n" /* faTrash */]);
index_es["a" /* config */].searchPseudoElements = true;
vue_runtime_esm["a" /* default */].component("font-awesome-icon", vue_fontawesome_index_es["a" /* FontAwesomeIcon */]);
index_es["b" /* dom */].watch();
vue_runtime_esm["a" /* default */].config.productionTip = false;
vue_runtime_esm["a" /* default */].component("vue-headful", vue_headful_default.a);
new vue_runtime_esm["a" /* default */]({
  store: src_store,
  render: function render(h) {
    return h(App);
  }
}).$mount("#app");

/***/ }),

/***/ "56e3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "58d3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "60cf":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7faf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b8ff");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9ee5":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a39e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a45c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9ee5");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Categories_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b18b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b3d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overlay_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fd05");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overlay_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overlay_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Overlay_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b8ff":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d68e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Quote_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a39e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Quote_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Quote_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Quote_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e801":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddTask_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b18b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddTask_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddTask_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddTask_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fd05":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ff88":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("56e3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_stylus_loader_index_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewUser_vue_vue_type_style_index_0_lang_stylus___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

/******/ });