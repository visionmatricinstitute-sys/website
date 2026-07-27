export interface VideoEntry {
  id: string
  title: string
  description: string
  uploadDate: string
  duration: string
  thumbnailUrl: string
}

export const INTRO_VIDEO: VideoEntry = {
  id: "4Sbv9glx1Hc",
  title: "Vision Matrix Institute Intro",
  description:
    "A short introduction to Vision Matrix Institute — a specialized data center electrical design training institute, live and instructor-led, online.",
  uploadDate: "2026-07-14",
  duration: "PT11S",
  thumbnailUrl: "https://i.ytimg.com/vi/4Sbv9glx1Hc/hqdefault.jpg",
}

export const PROGRAM_PREVIEW_VIDEOS: VideoEntry[] = [
  {
    id: "VPwVQln7NYA",
    title: "Module Summary | Introduction to Data Centers",
    description:
      "A summary of the Introduction to Data Centers session from the Electrical Design – Data Center Specialist program, covering the fundamentals of modern data center infrastructure for electrical, MEP, and data center engineers.",
    uploadDate: "2026-07-25",
    duration: "PT9M23S",
    thumbnailUrl: "https://i.ytimg.com/vi/VPwVQln7NYA/hqdefault.jpg",
  },
  {
    id: "csgHDhDg7l8",
    title: "Module Summary | Data Center Electrical Fundamentals",
    description:
      "A summary of the Electrical Engineering Fundamentals session from the Electrical Design – Data Center Specialist program — a high-level overview of the full live instructor-led session.",
    uploadDate: "2026-07-25",
    duration: "PT9M38S",
    thumbnailUrl: "https://i.ytimg.com/vi/csgHDhDg7l8/hqdefault.jpg",
  },
  {
    id: "6nfvCdjM9lM",
    title: "Module Summary | Data Center Electrical Equipment",
    description:
      "A summary of the Electrical Equipment session (utility interface, MV switchgear, and transformers) from the Electrical Design – Data Center Specialist program.",
    uploadDate: "2026-07-26",
    duration: "PT13M18S",
    thumbnailUrl: "https://i.ytimg.com/vi/6nfvCdjM9lM/hqdefault.jpg",
  },
]
