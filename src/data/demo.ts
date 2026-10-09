/**
 * DEMO DATA — every value in this file is fictional sample data used to
 * preview the SEEN interface. None of it describes a real artist, release,
 * platform account or audience. No music platform or social network is
 * connected. A later milestone replaces this module with real, user-connected
 * data sources (see PLAN.md).
 */

export const DEMO_NOTICE =
  'Sample figures for a fictional artist. Not real performance data — no platforms are connected.'

export const demoArtist = {
  name: 'Halcyon Reed',
  genre: 'Alt-soul / downtempo',
  base: 'Manchester, UK',
  fictional: true,
}

export const demoRoster = [
  { id: 'halcyon-reed', name: 'Halcyon Reed', genre: 'Alt-soul' },
  { id: 'the-quiet-ferns', name: 'The Quiet Ferns', genre: 'Indie folk' },
  { id: 'ozi-marr', name: 'Ozi Marr', genre: 'UK garage' },
]

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export type ReleaseType = 'Single' | 'EP' | 'Album'
export type ReleaseStatus = 'Released' | 'Scheduled' | 'Draft'

export interface Track {
  id: string
  title: string
  releaseId: string
  durationSec: number
  isrc: string
  streams: number
  saveRate: number
  trend: number
  explicit: boolean
}

export interface Release {
  id: string
  title: string
  type: ReleaseType
  status: ReleaseStatus
  date: string
  upc: string
  artwork: [string, string]
  metadataScore: number
}

export const releases: Release[] = [
  { id: 'r1', title: 'Low Tide Static', type: 'Album', status: 'Released', date: '2025-03-14', upc: 'DEMO-0000-0141', artwork: ['#1c2a4a', '#2f6fed'], metadataScore: 92 },
  { id: 'r2', title: 'Paper Lanterns', type: 'EP', status: 'Released', date: '2024-06-21', upc: 'DEMO-0000-0087', artwork: ['#3a2a1f', '#ec835a'], metadataScore: 78 },
  { id: 'r3', title: 'Northbound', type: 'Single', status: 'Released', date: '2025-09-05', upc: 'DEMO-0000-0163', artwork: ['#1c2a3d', '#3987e5'], metadataScore: 64 },
  { id: 'r4', title: 'Saltwater Hymn', type: 'Single', status: 'Released', date: '2023-11-10', upc: 'DEMO-0000-0052', artwork: ['#2d2433', '#b9a7e6'], metadataScore: 88 },
  { id: 'r5', title: 'Glasshouse', type: 'Single', status: 'Scheduled', date: '2026-11-20', upc: 'DEMO-0000-0190', artwork: ['#1f302b', '#199e70'], metadataScore: 41 },
  { id: 'r6', title: 'Untitled demos (vol. 2)', type: 'EP', status: 'Draft', date: '2027-02-01', upc: '—', artwork: ['#262624', '#8d8b84'], metadataScore: 18 },
]

export const tracks: Track[] = [
  { id: 't1', title: 'Low Tide Static', releaseId: 'r1', durationSec: 224, isrc: 'DEMO-25-00011', streams: 412_873, saveRate: 7.4, trend: 3.2, explicit: false },
  { id: 't2', title: 'Ferris Wheel at Dusk', releaseId: 'r1', durationSec: 198, isrc: 'DEMO-25-00012', streams: 286_119, saveRate: 9.1, trend: 11.8, explicit: false },
  { id: 't3', title: 'Copper Wire', releaseId: 'r1', durationSec: 251, isrc: 'DEMO-25-00013', streams: 97_402, saveRate: 4.2, trend: -6.3, explicit: true },
  { id: 't4', title: 'Somewhere in Salford', releaseId: 'r1', durationSec: 189, isrc: 'DEMO-25-00014', streams: 143_788, saveRate: 6.7, trend: 1.4, explicit: false },
  { id: 't5', title: 'Hollow Bell', releaseId: 'r1', durationSec: 276, isrc: 'DEMO-25-00015', streams: 61_930, saveRate: 3.8, trend: -2.1, explicit: false },
  { id: 't6', title: 'Paper Lanterns', releaseId: 'r2', durationSec: 207, isrc: 'DEMO-24-00031', streams: 318_455, saveRate: 8.3, trend: -1.7, explicit: false },
  { id: 't7', title: 'Kite String', releaseId: 'r2', durationSec: 183, isrc: 'DEMO-24-00032', streams: 122_006, saveRate: 5.9, trend: 0.6, explicit: false },
  { id: 't8', title: 'Night Bus 86', releaseId: 'r2', durationSec: 239, isrc: 'DEMO-24-00033', streams: 88_214, saveRate: 4.6, trend: 4.9, explicit: true },
  { id: 't9', title: 'Northbound', releaseId: 'r3', durationSec: 212, isrc: 'DEMO-25-00041', streams: 174_562, saveRate: 10.2, trend: 22.4, explicit: false },
  { id: 't10', title: 'Saltwater Hymn', releaseId: 'r4', durationSec: 245, isrc: 'DEMO-23-00007', streams: 529_317, saveRate: 6.1, trend: -3.9, explicit: false },
  { id: 't11', title: 'Glasshouse', releaseId: 'r5', durationSec: 201, isrc: 'DEMO-26-00002', streams: 0, saveRate: 0, trend: 0, explicit: false },
]

export function releaseById(id: string) {
  return releases.find((r) => r.id === id)
}

/* ------------------------------------------------------------------ */
/* Performance                                                         */
/* ------------------------------------------------------------------ */

export const weeks = [
  'Jul 7', 'Jul 14', 'Jul 21', 'Jul 28', 'Aug 4', 'Aug 11', 'Aug 18',
  'Aug 25', 'Sep 1', 'Sep 8', 'Sep 15', 'Sep 22', 'Sep 29', 'Oct 6',
]

/** Weekly streams split by discovery source — same unit, one axis. */
export const streamsBySource = {
  'Listener libraries': [21_340, 22_018, 21_772, 22_905, 23_411, 23_096, 24_270, 24_811, 26_904, 28_337, 29_015, 29_640, 30_182, 31_027],
  'Algorithmic playlists': [9_812, 10_407, 9_955, 11_284, 12_036, 11_570, 12_948, 13_402, 17_885, 19_206, 18_731, 19_954, 20_418, 21_302],
  'Editorial playlists': [4_105, 3_982, 3_870, 3_611, 3_544, 3_390, 3_302, 3_187, 5_942, 6_310, 5_874, 5_201, 4_770, 4_388],
}

export const performanceRanges = {
  '4w': 4,
  '8w': 8,
  '14w': 14,
} as const
export type PerformanceRange = keyof typeof performanceRanges

export const performanceKpis = [
  { label: 'Streams (14 weeks)', value: 812_604, delta: 14.6, hint: 'vs previous 14 weeks' },
  { label: 'Monthly listeners', value: 61_418, delta: 9.3, hint: 'rolling 28 days' },
  { label: 'Save rate', value: 7.2, unit: '%', delta: 0.8, hint: 'saves ÷ unique listeners' },
  { label: 'Skip rate (first 30s)', value: 23.9, unit: '%', delta: -1.6, hint: 'lower is better' },
]

export const listenerFunnel = [
  { stage: 'Reached', value: 248_310 },
  { stage: 'Listened 30s+', value: 141_772 },
  { stage: 'Saved a track', value: 18_204 },
  { stage: 'Followed artist', value: 6_391 },
]

/* ------------------------------------------------------------------ */
/* Audience & geography                                                */
/* ------------------------------------------------------------------ */

export interface CitySignal {
  city: string
  country: string
  region: 'Europe' | 'North America' | 'Latin America' | 'Asia-Pacific' | 'Africa'
  listeners: number
  growth: number
  signal: 'Breakout' | 'Rising' | 'Steady' | 'Cooling'
}

export const citySignals: CitySignal[] = [
  { city: 'Manchester', country: 'United Kingdom', region: 'Europe', listeners: 8_412, growth: 4.1, signal: 'Steady' },
  { city: 'London', country: 'United Kingdom', region: 'Europe', listeners: 7_965, growth: 6.8, signal: 'Rising' },
  { city: 'Berlin', country: 'Germany', region: 'Europe', listeners: 3_288, growth: 27.4, signal: 'Breakout' },
  { city: 'Mexico City', country: 'Mexico', region: 'Latin America', listeners: 2_947, growth: 41.2, signal: 'Breakout' },
  { city: 'Toronto', country: 'Canada', region: 'North America', listeners: 2_603, growth: 8.7, signal: 'Rising' },
  { city: 'Dublin', country: 'Ireland', region: 'Europe', listeners: 2_118, growth: -3.2, signal: 'Cooling' },
  { city: 'Melbourne', country: 'Australia', region: 'Asia-Pacific', listeners: 1_874, growth: 12.9, signal: 'Rising' },
  { city: 'New York', country: 'United States', region: 'North America', listeners: 1_806, growth: 2.3, signal: 'Steady' },
  { city: 'Lagos', country: 'Nigeria', region: 'Africa', listeners: 1_212, growth: 33.6, signal: 'Breakout' },
  { city: 'Glasgow', country: 'United Kingdom', region: 'Europe', listeners: 1_189, growth: -1.1, signal: 'Steady' },
  { city: 'São Paulo', country: 'Brazil', region: 'Latin America', listeners: 1_043, growth: 18.5, signal: 'Rising' },
  { city: 'Amsterdam', country: 'Netherlands', region: 'Europe', listeners: 987, growth: -7.4, signal: 'Cooling' },
]

export const ageBands = [
  { band: '18–24', share: 31.4 },
  { band: '25–34', share: 38.9 },
  { band: '35–44', share: 17.2 },
  { band: '45–54', share: 8.1 },
  { band: '55+', share: 4.4 },
]

export const listenerTypes = [
  { label: 'Active (3+ plays / week)', share: 22.6 },
  { label: 'Casual', share: 51.8 },
  { label: 'Lapsed (no play 28d)', share: 25.6 },
]

/* ------------------------------------------------------------------ */
/* Social presence                                                     */
/* ------------------------------------------------------------------ */

export interface SocialChannel {
  id: string
  name: string
  handle: string
  followers: number
  growth: number
  engagementRate: number
  postsPer30d: number
  lastPostDaysAgo: number
}

export const socialChannels: SocialChannel[] = [
  { id: 'instagram', name: 'Instagram', handle: '@halcyonreed', followers: 23_814, growth: 3.4, engagementRate: 4.7, postsPer30d: 11, lastPostDaysAgo: 2 },
  { id: 'tiktok', name: 'TikTok', handle: '@halcyon.reed', followers: 18_409, growth: 12.1, engagementRate: 7.9, postsPer30d: 6, lastPostDaysAgo: 9 },
  { id: 'youtube', name: 'YouTube', handle: 'Halcyon Reed', followers: 6_172, growth: 1.8, engagementRate: 3.1, postsPer30d: 2, lastPostDaysAgo: 18 },
  { id: 'x', name: 'X', handle: '@halcyonreed', followers: 4_027, growth: -0.9, engagementRate: 1.2, postsPer30d: 4, lastPostDaysAgo: 26 },
]

export const weeklyEngagement = {
  Instagram: [612, 588, 701, 655, 742, 690, 803, 774, 921, 1_012, 958, 987, 1_044, 1_103],
  TikTok: [402, 455, 390, 618, 1_207, 843, 760, 712, 1_588, 1_962, 1_404, 1_210, 1_302, 1_455],
  YouTube: [140, 152, 133, 161, 158, 149, 172, 168, 201, 214, 197, 189, 203, 208],
}

export const contentMix = [
  { format: 'Short-form video', posts: 14, avgEngagement: 6.8 },
  { format: 'Photo / carousel', posts: 9, avgEngagement: 4.1 },
  { format: 'Studio / behind the scenes', posts: 5, avgEngagement: 5.6 },
  { format: 'Live session clip', posts: 3, avgEngagement: 7.3 },
  { format: 'Text / announcement', posts: 7, avgEngagement: 1.9 },
]

/* ------------------------------------------------------------------ */
/* Opportunities & gaps                                                */
/* ------------------------------------------------------------------ */

export type Impact = 'High' | 'Medium' | 'Low'
export type OpportunityCategory =
  | 'Release'
  | 'Audience'
  | 'Playlisting'
  | 'Social'
  | 'Live'
  | 'Metadata'

export interface Opportunity {
  id: string
  title: string
  category: OpportunityCategory
  impact: Impact
  effort: Impact
  rationale: string
  evidence: string
}

export const opportunities: Opportunity[] = [
  { id: 'o1', title: 'Route a Berlin show into the spring tour', category: 'Live', impact: 'High', effort: 'Medium', rationale: 'Berlin is the fastest-growing European city in the sample, with no live date listed there.', evidence: 'Berlin listeners +27.4% (demo)' },
  { id: 'o2', title: 'Pitch "Glasshouse" to editorial four weeks ahead', category: 'Playlisting', impact: 'High', effort: 'Low', rationale: 'Editorial streams spike after each release, then decay within six weeks. An early pitch lengthens the window.', evidence: 'Editorial share dropped 31% after week 9 (demo)' },
  { id: 'o3', title: 'Recut "Northbound" as a 20-second vertical clip', category: 'Social', impact: 'Medium', effort: 'Low', rationale: 'Northbound has the highest save rate in the catalogue and short-form video is the strongest content format.', evidence: 'Save rate 10.2%, short-form engagement 6.8% (demo)' },
  { id: 'o4', title: 'Add Spanish-language bio and captions', category: 'Audience', impact: 'Medium', effort: 'Low', rationale: 'Mexico City and São Paulo are both rising, but no profile copy is localised.', evidence: 'Latin America listeners +33% combined (demo)' },
  { id: 'o5', title: 'Complete songwriter and producer credits', category: 'Metadata', impact: 'Medium', effort: 'Low', rationale: 'Missing credits weaken royalty matching and discovery on credit-based playlists.', evidence: '3 releases below 80% metadata score (demo)' },
  { id: 'o6', title: 'Re-engage lapsed listeners with a stripped session', category: 'Audience', impact: 'Low', effort: 'Medium', rationale: 'A quarter of the audience has not played a track in 28 days.', evidence: 'Lapsed share 25.6% (demo)' },
]

export interface CareerGap {
  id: string
  title: string
  severity: 'critical' | 'serious' | 'warning'
  detail: string
  fix: string
}

export const careerGaps: CareerGap[] = [
  { id: 'g1', title: 'Release cadence gap', severity: 'serious', detail: 'The next scheduled release is 11 weeks after the last one. Momentum from Northbound may fade before then.', fix: 'Plan an interim acoustic version or remix.' },
  { id: 'g2', title: 'No pre-save campaign set up', severity: 'critical', detail: 'Glasshouse is scheduled with no pre-release activity planned.', fix: 'Create a pre-save link and a three-post teaser schedule.' },
  { id: 'g3', title: 'YouTube channel under-used', severity: 'warning', detail: 'Two uploads in 30 days, compared with eleven on Instagram.', fix: 'Repurpose live session clips as YouTube Shorts.' },
  { id: 'g4', title: 'Incomplete metadata on draft EP', severity: 'warning', detail: 'Untitled demos (vol. 2) has an 18% metadata score.', fix: 'Add ISRCs, credits and genre tags before delivery.' },
]

/* ------------------------------------------------------------------ */
/* Action planner                                                      */
/* ------------------------------------------------------------------ */

export type TaskStatus = 'todo' | 'doing' | 'done'
export type TaskPriority = 'High' | 'Medium' | 'Low'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  due: string
  category: OpportunityCategory
  opportunityId?: string
}

export const demoTasks: Task[] = [
  { id: 'k1', title: 'Draft editorial pitch for Glasshouse', status: 'doing', priority: 'High', due: '2026-10-16', category: 'Playlisting', opportunityId: 'o2' },
  { id: 'k2', title: 'Set up Glasshouse pre-save link', status: 'todo', priority: 'High', due: '2026-10-20', category: 'Release' },
  { id: 'k3', title: 'Cut 20s vertical clip of Northbound', status: 'todo', priority: 'Medium', due: '2026-10-23', category: 'Social', opportunityId: 'o3' },
  { id: 'k4', title: 'Email Berlin promoters shortlist', status: 'todo', priority: 'Medium', due: '2026-11-02', category: 'Live', opportunityId: 'o1' },
  { id: 'k5', title: 'Add producer credits to Low Tide Static', status: 'done', priority: 'Medium', due: '2026-10-05', category: 'Metadata', opportunityId: 'o5' },
  { id: 'k6', title: 'Translate bio into Spanish', status: 'done', priority: 'Low', due: '2026-10-03', category: 'Audience', opportunityId: 'o4' },
  { id: 'k7', title: 'Book stripped session studio day', status: 'todo', priority: 'Low', due: '2026-11-14', category: 'Audience', opportunityId: 'o6' },
]

/* ------------------------------------------------------------------ */
/* Ask SEEN — scripted demo replies (no AI model is called)            */
/* ------------------------------------------------------------------ */

export const assistantPrompts = [
  {
    id: 'p1',
    prompt: 'Which city should I prioritise next?',
    reply:
      'In the demo dataset, Berlin and Mexico City show the strongest growth (+27.4% and +41.2%). Berlin is closer to your existing European base and has no live date listed, so it is the lower-effort test. Suggested next step: shortlist three Berlin venues under 300 capacity and add a task to the Action planner.',
  },
  {
    id: 'p2',
    prompt: 'Why did streams jump in September?',
    reply:
      'In the demo data, the September lift lines up with the Northbound single (released 5 Sep). Algorithmic playlist streams rose about 33% week-on-week, while editorial streams spiked and then faded. That pattern usually means listeners are saving the track, not just sampling it.',
  },
  {
    id: 'p3',
    prompt: 'What should I post this week?',
    reply:
      'Based on the demo content mix, short-form video and live session clips perform best (6.8% and 7.3% engagement). A 20-second vertical cut of Northbound, plus one studio clip teasing Glasshouse, would fit both patterns. Avoid text-only announcements — they average 1.9%.',
  },
  {
    id: 'p4',
    prompt: 'Summarise my biggest career gap.',
    reply:
      'The most urgent gap in the demo workspace: Glasshouse is scheduled for 20 November with no pre-save or teaser plan. Releases without pre-release activity tend to lose their first-week algorithmic push. Fix it by creating a pre-save link and three teaser posts over the next fortnight.',
  },
]
