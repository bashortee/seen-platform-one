import { useSyncExternalStore } from "react";
import { n as demoTasks } from "./demo-C1AcIFzz.js";
const STORAGE_KEY = "seen.preferences.v1";
const defaults = {
  role: null,
  showDemoData: true,
  displayName: "",
  tasks: demoTasks
};
let state = defaults;
let hydrated = false;
const listeners = /* @__PURE__ */ new Set();
function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...defaults, ...JSON.parse(raw) };
  } catch {
    state = defaults;
  }
}
function emit() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
  }
  listeners.forEach((l) => l());
}
function setPreferences(patch) {
  hydrate();
  const next = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...next };
  emit();
}
function resetPreferences() {
  state = { ...defaults, tasks: demoTasks.map((t) => ({ ...t })) };
  emit();
}
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function getSnapshot() {
  hydrate();
  return state;
}
function getServerSnapshot() {
  return defaults;
}
function usePreferences() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
const roleLabels = {
  artist: "Artist",
  manager: "Manager",
  label: "Label"
};
export {
  resetPreferences as a,
  roleLabels as r,
  setPreferences as s,
  usePreferences as u
};
