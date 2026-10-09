const demoArtist = {
  name: "Halcyon Reed"
};
const demoRoster = [
  { id: "halcyon-reed", name: "Halcyon Reed", genre: "Alt-soul" },
  { id: "the-quiet-ferns", name: "The Quiet Ferns", genre: "Indie folk" },
  { id: "ozi-marr", name: "Ozi Marr", genre: "UK garage" }
];
const releases = [
  { id: "r1", title: "Low Tide Static", type: "Album", status: "Released", date: "2025-03-14", upc: "DEMO-0000-0141", artwork: ["#1c2a4a", "#2f6fed"], metadataScore: 92 },
  { id: "r2", title: "Paper Lanterns", type: "EP", status: "Released", date: "2024-06-21", upc: "DEMO-0000-0087", artwork: ["#3a2a1f", "#ec835a"], metadataScore: 78 },
  { id: "r3", title: "Northbound", type: "Single", status: "Released", date: "2025-09-05", upc: "DEMO-0000-0163", artwork: ["#1c2a3d", "#3987e5"], metadataScore: 64 },
  { id: "r4", title: "Saltwater Hymn", type: "Single", status: "Released", date: "2023-11-10", upc: "DEMO-0000-0052", artwork: ["#2d2433", "#b9a7e6"], metadataScore: 88 },
  { id: "r5", title: "Glasshouse", type: "Single", status: "Scheduled", date: "2026-11-20", upc: "DEMO-0000-0190", artwork: ["#1f302b", "#199e70"], metadataScore: 41 },
  { id: "r6", title: "Untitled demos (vol. 2)", type: "EP", status: "Draft", date: "2027-02-01", upc: "—", artwork: ["#262624", "#8d8b84"], metadataScore: 18 }
];
const tracks = [
  { id: "t1", title: "Low Tide Static", releaseId: "r1", durationSec: 224, isrc: "DEMO-25-00011", streams: 412873, saveRate: 7.4, trend: 3.2, explicit: false },
  { id: "t2", title: "Ferris Wheel at Dusk", releaseId: "r1", durationSec: 198, isrc: "DEMO-25-00012", streams: 286119, saveRate: 9.1, trend: 11.8, explicit: false },
  { id: "t3", title: "Copper Wire", releaseId: "r1", durationSec: 251, isrc: "DEMO-25-00013", streams: 97402, saveRate: 4.2, trend: -6.3, explicit: true },
  { id: "t4", title: "Somewhere in Salford", releaseId: "r1", durationSec: 189, isrc: "DEMO-25-00014", streams: 143788, saveRate: 6.7, trend: 1.4, explicit: false },
  { id: "t5", title: "Hollow Bell", releaseId: "r1", durationSec: 276, isrc: "DEMO-25-00015", streams: 61930, saveRate: 3.8, trend: -2.1, explicit: false },
  { id: "t6", title: "Paper Lanterns", releaseId: "r2", durationSec: 207, isrc: "DEMO-24-00031", streams: 318455, saveRate: 8.3, trend: -1.7, explicit: false },
  { id: "t7", title: "Kite String", releaseId: "r2", durationSec: 183, isrc: "DEMO-24-00032", streams: 122006, saveRate: 5.9, trend: 0.6, explicit: false },
  { id: "t8", title: "Night Bus 86", releaseId: "r2", durationSec: 239, isrc: "DEMO-24-00033", streams: 88214, saveRate: 4.6, trend: 4.9, explicit: true },
  { id: "t9", title: "Northbound", releaseId: "r3", durationSec: 212, isrc: "DEMO-25-00041", streams: 174562, saveRate: 10.2, trend: 22.4, explicit: false },
  { id: "t10", title: "Saltwater Hymn", releaseId: "r4", durationSec: 245, isrc: "DEMO-23-00007", streams: 529317, saveRate: 6.1, trend: -3.9, explicit: false },
  { id: "t11", title: "Glasshouse", releaseId: "r5", durationSec: 201, isrc: "DEMO-26-00002", streams: 0, saveRate: 0, trend: 0, explicit: false }
];
function releaseById(id) {
  return releases.find((r) => r.id === id);
}
const weeks = [
  "Jul 7",
  "Jul 14",
  "Jul 21",
  "Jul 28",
  "Aug 4",
  "Aug 11",
  "Aug 18",
  "Aug 25",
  "Sep 1",
  "Sep 8",
  "Sep 15",
  "Sep 22",
  "Sep 29",
  "Oct 6"
];
const streamsBySource = {
  "Listener libraries": [21340, 22018, 21772, 22905, 23411, 23096, 24270, 24811, 26904, 28337, 29015, 29640, 30182, 31027],
  "Algorithmic playlists": [9812, 10407, 9955, 11284, 12036, 11570, 12948, 13402, 17885, 19206, 18731, 19954, 20418, 21302],
  "Editorial playlists": [4105, 3982, 3870, 3611, 3544, 3390, 3302, 3187, 5942, 6310, 5874, 5201, 4770, 4388]
};
const performanceRanges = {
  "4w": 4,
  "8w": 8,
  "14w": 14
};
const performanceKpis = [
  { label: "Streams (14 weeks)", value: 812604, delta: 14.6, hint: "vs previous 14 weeks" },
  { label: "Monthly listeners", value: 61418, delta: 9.3, hint: "rolling 28 days" },
  { label: "Save rate", value: 7.2, unit: "%", delta: 0.8, hint: "saves ÷ unique listeners" },
  { label: "Skip rate (first 30s)", value: 23.9, unit: "%", delta: -1.6, hint: "lower is better" }
];
const listenerFunnel = [
  { stage: "Reached", value: 248310 },
  { stage: "Listened 30s+", value: 141772 },
  { stage: "Saved a track", value: 18204 },
  { stage: "Followed artist", value: 6391 }
];
const citySignals = [
  { city: "Manchester", country: "United Kingdom", region: "Europe", listeners: 8412, growth: 4.1, signal: "Steady" },
  { city: "London", country: "United Kingdom", region: "Europe", listeners: 7965, growth: 6.8, signal: "Rising" },
  { city: "Berlin", country: "Germany", region: "Europe", listeners: 3288, growth: 27.4, signal: "Breakout" },
  { city: "Mexico City", country: "Mexico", region: "Latin America", listeners: 2947, growth: 41.2, signal: "Breakout" },
  { city: "Toronto", country: "Canada", region: "North America", listeners: 2603, growth: 8.7, signal: "Rising" },
  { city: "Dublin", country: "Ireland", region: "Europe", listeners: 2118, growth: -3.2, signal: "Cooling" },
  { city: "Melbourne", country: "Australia", region: "Asia-Pacific", listeners: 1874, growth: 12.9, signal: "Rising" },
  { city: "New York", country: "United States", region: "North America", listeners: 1806, growth: 2.3, signal: "Steady" },
  { city: "Lagos", country: "Nigeria", region: "Africa", listeners: 1212, growth: 33.6, signal: "Breakout" },
  { city: "Glasgow", country: "United Kingdom", region: "Europe", listeners: 1189, growth: -1.1, signal: "Steady" },
  { city: "São Paulo", country: "Brazil", region: "Latin America", listeners: 1043, growth: 18.5, signal: "Rising" },
  { city: "Amsterdam", country: "Netherlands", region: "Europe", listeners: 987, growth: -7.4, signal: "Cooling" }
];
const ageBands = [
  { band: "18–24", share: 31.4 },
  { band: "25–34", share: 38.9 },
  { band: "35–44", share: 17.2 },
  { band: "45–54", share: 8.1 },
  { band: "55+", share: 4.4 }
];
const listenerTypes = [
  { label: "Active (3+ plays / week)", share: 22.6 },
  { label: "Casual", share: 51.8 },
  { label: "Lapsed (no play 28d)", share: 25.6 }
];
const socialChannels = [
  { id: "instagram", name: "Instagram", handle: "@halcyonreed", followers: 23814, growth: 3.4, engagementRate: 4.7, postsPer30d: 11, lastPostDaysAgo: 2 },
  { id: "tiktok", name: "TikTok", handle: "@halcyon.reed", followers: 18409, growth: 12.1, engagementRate: 7.9, postsPer30d: 6, lastPostDaysAgo: 9 },
  { id: "youtube", name: "YouTube", handle: "Halcyon Reed", followers: 6172, growth: 1.8, engagementRate: 3.1, postsPer30d: 2, lastPostDaysAgo: 18 },
  { id: "x", name: "X", handle: "@halcyonreed", followers: 4027, growth: -0.9, engagementRate: 1.2, postsPer30d: 4, lastPostDaysAgo: 26 }
];
const weeklyEngagement = {
  Instagram: [612, 588, 701, 655, 742, 690, 803, 774, 921, 1012, 958, 987, 1044, 1103],
  TikTok: [402, 455, 390, 618, 1207, 843, 760, 712, 1588, 1962, 1404, 1210, 1302, 1455],
  YouTube: [140, 152, 133, 161, 158, 149, 172, 168, 201, 214, 197, 189, 203, 208]
};
const contentMix = [
  { format: "Short-form video", posts: 14, avgEngagement: 6.8 },
  { format: "Photo / carousel", posts: 9, avgEngagement: 4.1 },
  { format: "Studio / behind the scenes", posts: 5, avgEngagement: 5.6 },
  { format: "Live session clip", posts: 3, avgEngagement: 7.3 },
  { format: "Text / announcement", posts: 7, avgEngagement: 1.9 }
];
const opportunities = [
  { id: "o1", title: "Route a Berlin show into the spring tour", category: "Live", impact: "High", effort: "Medium", rationale: "Berlin is the fastest-growing European city in the sample, with no live date listed there.", evidence: "Berlin listeners +27.4% (demo)" },
  { id: "o2", title: 'Pitch "Glasshouse" to editorial four weeks ahead', category: "Playlisting", impact: "High", effort: "Low", rationale: "Editorial streams spike after each release, then decay within six weeks. An early pitch lengthens the window.", evidence: "Editorial share dropped 31% after week 9 (demo)" },
  { id: "o3", title: 'Recut "Northbound" as a 20-second vertical clip', category: "Social", impact: "Medium", effort: "Low", rationale: "Northbound has the highest save rate in the catalogue and short-form video is the strongest content format.", evidence: "Save rate 10.2%, short-form engagement 6.8% (demo)" },
  { id: "o4", title: "Add Spanish-language bio and captions", category: "Audience", impact: "Medium", effort: "Low", rationale: "Mexico City and São Paulo are both rising, but no profile copy is localised.", evidence: "Latin America listeners +33% combined (demo)" },
  { id: "o5", title: "Complete songwriter and producer credits", category: "Metadata", impact: "Medium", effort: "Low", rationale: "Missing credits weaken royalty matching and discovery on credit-based playlists.", evidence: "3 releases below 80% metadata score (demo)" },
  { id: "o6", title: "Re-engage lapsed listeners with a stripped session", category: "Audience", impact: "Low", effort: "Medium", rationale: "A quarter of the audience has not played a track in 28 days.", evidence: "Lapsed share 25.6% (demo)" }
];
const careerGaps = [
  { id: "g1", title: "Release cadence gap", severity: "serious", detail: "The next scheduled release is 11 weeks after the last one. Momentum from Northbound may fade before then.", fix: "Plan an interim acoustic version or remix." },
  { id: "g2", title: "No pre-save campaign set up", severity: "critical", detail: "Glasshouse is scheduled with no pre-release activity planned.", fix: "Create a pre-save link and a three-post teaser schedule." },
  { id: "g3", title: "YouTube channel under-used", severity: "warning", detail: "Two uploads in 30 days, compared with eleven on Instagram.", fix: "Repurpose live session clips as YouTube Shorts." },
  { id: "g4", title: "Incomplete metadata on draft EP", severity: "warning", detail: "Untitled demos (vol. 2) has an 18% metadata score.", fix: "Add ISRCs, credits and genre tags before delivery." }
];
const demoTasks = [
  { id: "k1", title: "Draft editorial pitch for Glasshouse", status: "doing", priority: "High", due: "2026-10-16", category: "Playlisting", opportunityId: "o2" },
  { id: "k2", title: "Set up Glasshouse pre-save link", status: "todo", priority: "High", due: "2026-10-20", category: "Release" },
  { id: "k3", title: "Cut 20s vertical clip of Northbound", status: "todo", priority: "Medium", due: "2026-10-23", category: "Social", opportunityId: "o3" },
  { id: "k4", title: "Email Berlin promoters shortlist", status: "todo", priority: "Medium", due: "2026-11-02", category: "Live", opportunityId: "o1" },
  { id: "k5", title: "Add producer credits to Low Tide Static", status: "done", priority: "Medium", due: "2026-10-05", category: "Metadata", opportunityId: "o5" },
  { id: "k6", title: "Translate bio into Spanish", status: "done", priority: "Low", due: "2026-10-03", category: "Audience", opportunityId: "o4" },
  { id: "k7", title: "Book stripped session studio day", status: "todo", priority: "Low", due: "2026-11-14", category: "Audience", opportunityId: "o6" }
];
const assistantPrompts = [
  {
    id: "p1",
    prompt: "Which city should I prioritise next?",
    reply: "In the demo dataset, Berlin and Mexico City show the strongest growth (+27.4% and +41.2%). Berlin is closer to your existing European base and has no live date listed, so it is the lower-effort test. Suggested next step: shortlist three Berlin venues under 300 capacity and add a task to the Action planner."
  },
  {
    id: "p2",
    prompt: "Why did streams jump in September?",
    reply: "In the demo data, the September lift lines up with the Northbound single (released 5 Sep). Algorithmic playlist streams rose about 33% week-on-week, while editorial streams spiked and then faded. That pattern usually means listeners are saving the track, not just sampling it."
  },
  {
    id: "p3",
    prompt: "What should I post this week?",
    reply: "Based on the demo content mix, short-form video and live session clips perform best (6.8% and 7.3% engagement). A 20-second vertical cut of Northbound, plus one studio clip teasing Glasshouse, would fit both patterns. Avoid text-only announcements — they average 1.9%."
  },
  {
    id: "p4",
    prompt: "Summarise my biggest career gap.",
    reply: "The most urgent gap in the demo workspace: Glasshouse is scheduled for 20 November with no pre-save or teaser plan. Releases without pre-release activity tend to lose their first-week algorithmic push. Fix it by creating a pre-save link and three teaser posts over the next fortnight."
  }
];
export {
  demoArtist as a,
  performanceRanges as b,
  citySignals as c,
  demoRoster as d,
  socialChannels as e,
  assistantPrompts as f,
  ageBands as g,
  releaseById as h,
  careerGaps as i,
  listenerFunnel as j,
  weeklyEngagement as k,
  listenerTypes as l,
  contentMix as m,
  demoTasks as n,
  opportunities as o,
  performanceKpis as p,
  releases as r,
  streamsBySource as s,
  tracks as t,
  weeks as w
};
