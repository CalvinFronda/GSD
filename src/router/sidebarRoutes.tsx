import {
  Calendar,
  CircleCheck,
  Clipboard,
  Clock,
  FolderKanban,
  Home,
  Inbox,
  MailCheck,
  MailPlus,
  Mails,
  Sparkle,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Mails,
    subItems: [
      { title: "All", url: "/inbox", icon: Inbox },
      { title: "Processed", url: "/processed", icon: MailPlus },
      { title: "Unproccesed", url: "/unproccesed", icon: MailCheck },
    ],
  },
  {
    title: "Next Actions",
    url: "/next-actions",
    icon: Clipboard,
  },
  {
    title: "Projects",
    url: "projects",
    icon: FolderKanban,
  },
  {
    title: "Waiting For",
    url: "waiting-for",
    icon: Clock,
  },
  {
    title: "Someday/Maybe",
    url: "someday",
    icon: Sparkle,
  },
  {
    title: "Calendar",
    url: "calendar",
    icon: Calendar,
  },
  {
    title: "Weekly Review",
    url: "weekly",
    icon: CircleCheck,
  },
];
