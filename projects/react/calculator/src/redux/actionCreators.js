export function clear() {
  return {
    type: "CLEAR"
  };
}

export function write(content) {
  return {
    type: "WRITE",
    payload: content
  };
}

export function setAction(actionName) {
  return {
    type: "SET_ACTION",
    payload: actionName
  };
}

export function equals() {
  return {
    type: "EQUALS"
  };
}

export function changeColors() {
  return {
    type: "CHANGE_COLORS"
  };
}
