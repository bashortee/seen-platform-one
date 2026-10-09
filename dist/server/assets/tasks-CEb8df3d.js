import { s as setPreferences } from "./preferences-CDJjCwCs.js";
function addTask(task) {
  setPreferences((p) => ({
    tasks: [{ ...task, id: `k${Date.now().toString(36)}` }, ...p.tasks]
  }));
}
function addTaskFromOpportunity(o) {
  const due = /* @__PURE__ */ new Date();
  due.setDate(due.getDate() + 14);
  addTask({
    title: o.title,
    status: "todo",
    priority: o.impact,
    due: due.toISOString().slice(0, 10),
    category: o.category,
    opportunityId: o.id
  });
}
function updateTask(id, patch) {
  setPreferences((p) => ({
    tasks: p.tasks.map((t) => t.id === id ? { ...t, ...patch } : t)
  }));
}
function removeTask(id) {
  setPreferences((p) => ({ tasks: p.tasks.filter((t) => t.id !== id) }));
}
export {
  addTask as a,
  addTaskFromOpportunity as b,
  removeTask as r,
  updateTask as u
};
