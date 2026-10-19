import type { LegalSection } from "@/components/legal-page"

// Source draft and decision log: VMI-OS repo, 02-STANDARDS/Policies/privacy-notice.md
export const PRIVACY_LAST_UPDATED = "20 October 2026"

const EMAIL = "[info@visionmatrixinstitute.com](mailto:info@visionmatrixinstitute.com)"

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    blocks: [
      {
        type: "p",
        text: 'This Privacy Policy explains how **Vision Matrix Institute** ("VMI", "we", "us") collects and uses your personal data when you use **visionmatrixinstitute.com**, book a demo class, enrol in a course or use our student dashboard.',
      },
      {
        type: "p",
        text: 'VMI is the "Data Fiduciary" for your personal data under India\'s **Digital Personal Data Protection Act, 2023** ("DPDP Act").',
      },
      {
        type: "p",
        text: `Contact for privacy questions and complaints: **Shaikh Bushra**, Grievance Officer, Vision Matrix Institute, ${EMAIL}.`,
      },
    ],
  },
  {
    heading: "What personal data we collect",
    blocks: [
      {
        type: "p",
        text: "**When you fill in a form (admission, demo class, enquiry):** first and last name, email address, phone / WhatsApp number, the course you are interested in, your educational qualification (optional) and any message you write.",
      },
      {
        type: "p",
        text: "**When you create an account or enrol:** your name, email address and phone number, and a password (stored in protected, encrypted form by our login provider; we cannot see it).",
      },
      {
        type: "p",
        text: "**While you study:** your course progress, quiz answers and scores, assignments you submit, class attendance and the certificates issued to you.",
      },
      {
        type: "p",
        text: "**During live classes:** classes are **recorded**. A recording can include your name, your voice, your video (if your camera is on) and anything you type in the class chat. You can keep your camera off if you prefer.",
      },
      {
        type: "p",
        text: "**When you pay:** payment details are handled by **Razorpay**. We receive the payment and order reference, the amount and the payment status. **We never see or store your card, UPI or bank details.**",
      },
      { type: "p", text: "**When you subscribe to updates:** your email address." },
      {
        type: "p",
        text: "**When you contact us on WhatsApp, email or phone:** your number or email and what you write to us.",
      },
      {
        type: "p",
        text: "**When you use the website:** technical data such as your device, browser, pages visited and approximate location, collected through cookies (see section 8). Our forms also use a security check (Cloudflare Turnstile) to block spam bots.",
      },
      { type: "p", text: "**We do not ask for ID proof** such as Aadhaar, PAN or a passport." },
    ],
  },
  {
    heading: "Why we use your data",
    blocks: [
      { type: "p", text: "We use your personal data only to:" },
      {
        type: "ul",
        items: [
          "reply to your enquiry and arrange your demo class;",
          "create and manage your student account;",
          "deliver your course, live classes, class recordings, materials, assessments and certificates;",
          "take payments and keep payment and tax records;",
          "give you career guidance if you ask for it;",
          "send you important messages about your course (class schedules, changes, account notices);",
          "send you news about our courses and free resources, **only if you agree**, with an easy way to stop at any time;",
          "show your name, photo, video or feedback in our marketing, **only if you agree** (see below);",
          "keep our website secure and stop spam and fraud;",
          "understand how our website is used so we can improve it;",
          "meet our legal obligations.",
        ],
      },
      {
        type: "p",
        text: "**Class recordings:** we record classes so that enrolled students can watch them again during their access period, and so that we can check and improve our teaching. We do not sell recordings or post a full class recording publicly.",
      },
      {
        type: "p",
        text: "**Your photo, video and name in our marketing (only with your consent):** with your permission, VMI may use your name, photo, video clips from classes, and your feedback or success story on our website, social media, YouTube and adverts. We ask for this **separately**, in writing, with a clear yes or no. Saying no does not affect your course in any way. You can withdraw your permission at any time by emailing us; we will then stop using your photo, video or name in new material and remove it from our website and the social media pages we control. Material that was already printed or shared by others may not be possible to recall.",
      },
      {
        type: "p",
        text: "**Use of AI tools:** we use automated and AI tools to help us sort and prioritise enquiries (for example, to see which course you are asking about) and to run our internal workflows. These tools do not make legal or similarly significant decisions about you. A person at VMI handles your admission and any decision that affects you.",
      },
    ],
  },
  {
    heading: "Our legal basis",
    blocks: [
      { type: "p", text: "We process your personal data:" },
      {
        type: "ul",
        items: [
          "with your **consent**, which you give when you submit a form, create an account, enrol or subscribe; and",
          "for **legitimate uses** allowed by the DPDP Act, for example to provide a service you asked for, or to meet a legal obligation such as keeping tax records.",
        ],
      },
      {
        type: "p",
        text: "You can withdraw your consent at any time (see section 7). Withdrawing consent does not affect what we did before you withdrew it, and we may not be able to continue a course without the data it needs.",
      },
    ],
  },
  {
    heading: "Who we share your data with",
    blocks: [
      {
        type: "p",
        text: "We do **not** sell your personal data. We share it only with service providers who help us run VMI, and only what they need:",
      },
      {
        type: "table",
        head: ["Provider", "What they do for us"],
        rows: [
          ["Supabase", "Stores our website database and student accounts"],
          ["Vercel", "Hosts our website"],
          ["Razorpay", "Processes payments"],
          [
            "Google (Workspace, Drive, Sheets, Meet, Analytics)",
            "Email, internal records of enquiries, live classes, storing class recordings, website analytics",
          ],
          ["Zoom", "Live online classes and storing class recordings"],
          ["n8n", "Runs our automated workflows (for example, moving new enquiries into our records)"],
          ["MailerLite", "Sends email updates to subscribers"],
          ["Cloudflare (Turnstile)", "Protects our forms from spam bots"],
          ["AI service providers (such as OpenAI or NVIDIA)", "Help sort and prioritise enquiries"],
          ["WhatsApp (Meta)", "Messages, if you contact us on WhatsApp"],
          [
            "YouTube and our social media pages",
            "Only if you agree: showing your photo, video or feedback in our marketing",
          ],
        ],
      },
      {
        type: "p",
        text: "We may also share data if the law requires it, or to protect our rights or the safety of others.",
      },
      {
        type: "p",
        text: "**Transfers outside India:** some of these providers store or process data outside India. We use reputable providers and share only what is needed.",
      },
    ],
  },
  {
    heading: "How long we keep your data",
    blocks: [
      {
        type: "table",
        head: ["Data", "How long"],
        rows: [
          ["Enquiries and demo bookings (if you do not enrol)", "Up to **2 years** after our last contact, then deleted"],
          ["Student account, progress and assignments", "While your course access lasts, plus **3 years**"],
          ["Class recordings", "For the course access period (**12 months**), then deleted"],
          [
            "Your photo, video or feedback used in marketing (with your consent)",
            "Until you withdraw your consent",
          ],
          [
            "Certificate records (name, course, date, certificate ID)",
            "Kept long-term so that certificates can be verified",
          ],
          ["Payment and invoice records", "As long as tax and accounting laws require"],
          ["Email subscriptions", "Until you unsubscribe"],
        ],
      },
      { type: "p", text: "When data is no longer needed, we delete it or make it anonymous." },
    ],
  },
  {
    heading: "Your rights",
    blocks: [
      { type: "p", text: "Under the DPDP Act you can:" },
      {
        type: "ul",
        items: [
          "**ask what personal data we hold** about you and how we use it;",
          "**ask us to correct, complete or update** it;",
          "**ask us to delete** it, unless we must keep it by law;",
          "**withdraw your consent** at any time;",
          "**nominate a person** to exercise your rights if you die or are unable to; and",
          "**raise a complaint** with us (section 11).",
        ],
      },
      {
        type: "p",
        text: `To use any of these rights, email ${EMAIL} from your registered email address. We may ask you to confirm your identity. We will reply within **30 days**.`,
      },
      { type: "p", text: "**Unsubscribing:** every marketing email has an unsubscribe link, or you can email us." },
    ],
  },
  {
    heading: "Cookies and analytics",
    blocks: [
      {
        type: "p",
        text: "Our website uses cookies and similar tools to keep it working, to keep it secure, and to understand how visitors use it.",
      },
      {
        type: "p",
        text: "For analytics we use **Google Analytics 4**, loaded through Google Tag Manager. It sets the cookies _ga and _ga_HWVM83SCTE, which count visits and show which pages are used. **We do not use advertising or remarketing cookies or pixels.**",
      },
      {
        type: "p",
        text: "You can block or delete cookies in your browser settings. Some parts of the site may not work properly without them.",
      },
    ],
  },
  {
    heading: "Age limit",
    blocks: [
      {
        type: "p",
        text: "Our courses and website forms are for people aged **18 and over**. We do not knowingly collect personal data from anyone under 18. If we learn that we have, we will delete it.",
      },
    ],
  },
  {
    heading: "How we protect your data",
    blocks: [
      {
        type: "p",
        text: "We use reasonable security measures, including encrypted connections (HTTPS), protected passwords, access controls and trusted service providers. No system is completely secure. If a data breach affects you, we will inform you and the authorities as the law requires.",
      },
    ],
  },
  {
    heading: "Questions and complaints",
    blocks: [
      { type: "p", text: "If you have a question or complaint about your personal data, contact:" },
      { type: "p", text: `**Shaikh Bushra**, Grievance Officer, Vision Matrix Institute. Email: ${EMAIL}` },
      {
        type: "p",
        text: "We acknowledge complaints within **48 hours** and aim to resolve them within **30 days**. If you are not satisfied with our response, you may complain to the **Data Protection Board of India**.",
      },
    ],
  },
  {
    heading: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. The latest version, with its date, will always be on this page. If we make an important change, we will tell students by email.",
      },
    ],
  },
]
