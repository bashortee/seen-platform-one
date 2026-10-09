import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Plus, Check, CalendarDays, Trash2 } from "lucide-react";
import { C as Card } from "./Card-DHBEemWN.js";
import { P as PageHeader, a as ProgressBar, c as cn, B as Badge } from "./Misc-CtC884cP.js";
import { B as Button } from "./Button-BRatFXcr.js";
import { T as TextField, S as SelectField } from "./Field-B-owlbUR.js";
import { a as EmptyState } from "./States-BNdbGBv0.js";
import { T as Tabs } from "./Tabs-B0kATxvx.js";
import { u as usePreferences, a as resetPreferences } from "./preferences-CDJjCwCs.js";
import { u as updateTask, r as removeTask, a as addTask } from "./tasks-CEb8df3d.js";
import "@tanstack/react-router";
import "./demo-C1AcIFzz.js";
const statusLabels = {
  todo: "To do",
  doing: "In progress",
  done: "Done"
};
const priorityTone = {
  High: "critical",
  Medium: "warning",
  Low: "neutral"
};
const categories = ["Release", "Audience", "Playlisting", "Social", "Live", "Metadata"];
function dueLabel(iso) {
  const d = /* @__PURE__ */ new Date(iso + "T00:00:00");
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((d.getTime() - today.getTime()) / 864e5);
  const date = d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
  if (days < 0) return {
    text: `${date} · overdue`,
    overdue: true
  };
  if (days === 0) return {
    text: "Today",
    overdue: false
  };
  if (days === 1) return {
    text: "Tomorrow",
    overdue: false
  };
  return {
    text: date,
    overdue: false
  };
}
function Actions() {
  const {
    tasks
  } = usePreferences();
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const counts = useMemo(() => ({
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    doing: tasks.filter((t) => t.status === "doing").length,
    done: tasks.filter((t) => t.status === "done").length
  }), [tasks]);
  const progress = tasks.length ? counts.done / tasks.length * 100 : 0;
  const visible = tasks.filter((t) => filter === "all" || t.status === filter);
  const highOpen = tasks.filter((t) => t.priority === "High" && t.status !== "done").length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Act", title: "Action planner", demo: false, description: "Turn insights into tasks and track them through to done. Tasks are saved in this browser only for now.", actions: /* @__PURE__ */ jsxs(Button, { onClick: () => setShowForm((s) => !s), "aria-expanded": showForm, children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4", "aria-hidden": true }),
      " New task"
    ] }) }),
    /* @__PURE__ */ jsxs("section", { "aria-label": "Progress", className: "grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-fg-3", children: "Overall progress" }),
          /* @__PURE__ */ jsxs("p", { className: "tabular text-sm text-fg-2", children: [
            counts.done,
            " of ",
            counts.all,
            " done"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 font-display text-5xl leading-none", children: [
          Math.round(progress),
          "%"
        ] }),
        /* @__PURE__ */ jsx(ProgressBar, { value: progress, label: "Tasks completed", className: "mt-4" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-fg-3", children: "In progress" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 font-display text-5xl leading-none", children: counts.doing })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/[0.07] bg-ink-900/80 p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-fg-3", children: "High priority open" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 font-display text-5xl leading-none", children: highOpen })
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsx(NewTaskForm, { onDone: () => setShowForm(false) }),
    /* @__PURE__ */ jsxs(Card, { className: "mt-4", bodyClassName: "p-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5", children: [
        /* @__PURE__ */ jsx(Tabs, { label: "Filter tasks", value: filter, onChange: setFilter, options: [{
          value: "all",
          label: "All",
          count: counts.all
        }, {
          value: "todo",
          label: "To do",
          count: counts.todo
        }, {
          value: "doing",
          label: "In progress",
          count: counts.doing
        }, {
          value: "done",
          label: "Done",
          count: counts.done
        }] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: resetPreferences, className: "text-xs text-fg-3 hover:text-fg", children: "Reset to sample tasks" })
      ] }),
      visible.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(EmptyState, { icon: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5", "aria-hidden": true }), title: filter === "all" ? "No tasks yet" : `Nothing ${statusLabels[filter].toLowerCase()}`, description: "Add a task, or send one over from Opportunities & gaps.", action: /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => setShowForm(true), children: "New task" }) }) }) : /* @__PURE__ */ jsx("ul", { className: "divide-y divide-white/[0.05]", children: visible.map((t) => /* @__PURE__ */ jsx(TaskRow, { task: t }, t.id)) })
    ] })
  ] });
}
function TaskRow({
  task
}) {
  const due = dueLabel(task.due);
  const done = task.status === "done";
  return /* @__PURE__ */ jsxs("li", { className: "group flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("button", { type: "button", role: "checkbox", "aria-checked": done, "aria-label": `Mark "${task.title}" as ${done ? "not done" : "done"}`, onClick: () => updateTask(task.id, {
      status: done ? "todo" : "done"
    }), className: cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors", done ? "border-signal bg-signal text-signal-ink" : "border-white/25 hover:border-signal"), children: done && /* @__PURE__ */ jsx(Check, { className: "h-3 w-3", strokeWidth: 3 }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: cn("text-sm", done ? "text-fg-3 line-through" : "text-fg"), children: task.title }),
      /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-fg-3", children: [
        /* @__PURE__ */ jsx("span", { children: task.category }),
        /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "·" }),
        /* @__PURE__ */ jsxs("span", { className: cn("inline-flex items-center gap-1", due.overdue && !done && "text-critical"), children: [
          /* @__PURE__ */ jsx(CalendarDays, { className: "h-3 w-3", "aria-hidden": true }),
          " ",
          due.text
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Badge, { tone: priorityTone[task.priority], children: task.priority }),
    /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: `status-${task.id}`, children: "Status" }),
    /* @__PURE__ */ jsx("select", { id: `status-${task.id}`, value: task.status, onChange: (e) => updateTask(task.id, {
      status: e.target.value
    }), className: "h-8 rounded-full border border-white/10 bg-ink-850 px-3 text-xs text-fg-2", children: Object.entries(statusLabels).map(([v, l]) => /* @__PURE__ */ jsx("option", { value: v, children: l }, v)) }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeTask(task.id), "aria-label": `Delete "${task.title}"`, className: "grid h-8 w-8 place-items-center rounded-full text-fg-3 opacity-100 hover:bg-critical/10 hover:text-critical sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
  ] });
}
function NewTaskForm({
  onDone
}) {
  const defaultDue = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState(defaultDue);
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Release");
  const [error, setError] = useState();
  function submit(e) {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError("Give the task a short, clear title (at least 3 characters).");
      return;
    }
    addTask({
      title: title.trim(),
      due,
      priority,
      category,
      status: "todo"
    });
    onDone();
  }
  return /* @__PURE__ */ jsx(Card, { className: "rise mt-4", title: "New task", children: /* @__PURE__ */ jsxs("form", { noValidate: true, onSubmit: submit, className: "grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-start", children: [
    /* @__PURE__ */ jsx(TextField, { label: "Task", placeholder: "e.g. Send Glasshouse to three blogs", value: title, onChange: (e) => {
      setTitle(e.target.value);
      setError(void 0);
    }, error, autoFocus: true }),
    /* @__PURE__ */ jsx(TextField, { label: "Due", type: "date", value: due, onChange: (e) => setDue(e.target.value) }),
    /* @__PURE__ */ jsxs(SelectField, { label: "Priority", value: priority, onChange: (e) => setPriority(e.target.value), children: [
      /* @__PURE__ */ jsx("option", { children: "High" }),
      /* @__PURE__ */ jsx("option", { children: "Medium" }),
      /* @__PURE__ */ jsx("option", { children: "Low" })
    ] }),
    /* @__PURE__ */ jsx(SelectField, { label: "Area", value: category, onChange: (e) => setCategory(e.target.value), children: categories.map((c) => /* @__PURE__ */ jsx("option", { children: c }, c)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 md:pt-[26px]", children: [
      /* @__PURE__ */ jsx(Button, { type: "submit", children: "Add" }),
      /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: onDone, children: "Cancel" })
    ] })
  ] }) });
}
export {
  Actions as component
};
