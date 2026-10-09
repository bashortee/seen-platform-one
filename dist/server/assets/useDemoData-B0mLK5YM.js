import { useState, useEffect } from "react";
import { u as usePreferences } from "./preferences-CDJjCwCs.js";
function useDemoData(key = "default", delay = 550) {
  const { showDemoData } = usePreferences();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!showDemoData) return;
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), delay);
    return () => window.clearTimeout(t);
  }, [key, delay, showDemoData]);
  if (!showDemoData) return "off";
  return loading ? "loading" : "ready";
}
export {
  useDemoData as u
};
