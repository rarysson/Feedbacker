import { reactive } from "vue";

const state = reactive({
  currentUser: {},
});

export default state;

export function setCurrentUser(user) {
  state.currentUser = user;
}

export function clearCurrentUser() {
  state.currentUser = {};
}

export function setApiKey(apiKey) {
  const user = { ...state.currentUser, apiKey };
  state.currentUser = user;
}
