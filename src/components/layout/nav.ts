import {
  CalendarCheck,
  Compass,
  Disc3,
  Globe2,
  LayoutDashboard,
  LineChart,
  MessageSquareText,
  Settings,
  Share2,
} from 'lucide-react'

export const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/app', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { to: '/app/catalogue', label: 'Catalogue', icon: Disc3 },
    ],
  },
  {
    label: 'Insights',
    items: [
      { to: '/app/performance', label: 'Performance', icon: LineChart },
      { to: '/app/audience', label: 'Audience & geography', icon: Globe2 },
      { to: '/app/social', label: 'Social presence', icon: Share2 },
    ],
  },
  {
    label: 'Act',
    items: [
      { to: '/app/opportunities', label: 'Opportunities & gaps', icon: Compass },
      { to: '/app/actions', label: 'Action planner', icon: CalendarCheck },
      { to: '/app/assistant', label: 'Ask SEEN', icon: MessageSquareText },
    ],
  },
] as const

export const settingsItem = { to: '/app/settings', label: 'Settings', icon: Settings } as const
