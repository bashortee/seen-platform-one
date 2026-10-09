import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { c as cn } from "./Misc-CtC884cP.js";
function DataTable({
  columns,
  rows,
  rowKey,
  caption,
  initialSort,
  empty,
  onRowClick
}) {
  const [sort, setSort] = useState(initialSort);
  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return rows;
    const get = col.sortValue;
    return [...rows].sort((a, b) => {
      const av = get(a);
      const bv = get(b);
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [rows, sort, columns]);
  function toggle(key) {
    setSort(
      (s) => s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" }
    );
  }
  if (rows.length === 0 && empty) return /* @__PURE__ */ jsx(Fragment, { children: empty });
  return /* @__PURE__ */ jsx("div", { className: "-mx-5 overflow-x-auto sm:-mx-6", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[560px] border-collapse text-sm", children: [
    /* @__PURE__ */ jsx("caption", { className: "sr-only", children: caption }),
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-white/[0.07]", children: columns.map((col) => {
      const active = sort?.key === col.key;
      const ariaSort = active ? sort.dir === "asc" ? "ascending" : "descending" : void 0;
      return /* @__PURE__ */ jsx(
        "th",
        {
          scope: "col",
          "aria-sort": ariaSort,
          className: cn(
            "px-5 py-2.5 text-[11px] font-medium tracking-wider whitespace-nowrap text-fg-3 uppercase first:pl-5 sm:first:pl-6 sm:last:pr-6",
            col.align === "right" ? "text-right" : "text-left",
            col.hideOnMobile && "hidden md:table-cell"
          ),
          children: col.sortValue ? /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle(col.key),
              className: cn(
                "inline-flex items-center gap-1 uppercase hover:text-fg",
                active && "text-fg-2"
              ),
              children: [
                col.header,
                active ? sort.dir === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-3 w-3", "aria-hidden": true }) : /* @__PURE__ */ jsx(ArrowDown, { className: "h-3 w-3", "aria-hidden": true }) : /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3 w-3 opacity-50", "aria-hidden": true })
              ]
            }
          ) : col.header
        },
        col.key
      );
    }) }) }),
    /* @__PURE__ */ jsx("tbody", { children: sorted.map((row) => /* @__PURE__ */ jsx(
      "tr",
      {
        onClick: onRowClick ? () => onRowClick(row) : void 0,
        className: cn(
          "border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.025]",
          onRowClick && "cursor-pointer"
        ),
        children: columns.map((col) => /* @__PURE__ */ jsx(
          "td",
          {
            className: cn(
              "px-5 py-3 text-fg-2 first:pl-5 sm:first:pl-6 sm:last:pr-6",
              col.align === "right" && "tabular text-right",
              col.hideOnMobile && "hidden md:table-cell",
              col.className
            ),
            children: col.cell(row)
          },
          col.key
        ))
      },
      rowKey(row)
    )) })
  ] }) });
}
export {
  DataTable as D
};
