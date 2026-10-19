import type { LegalSection } from "@/components/legal-page"

// Source draft and decision log: VMI-OS repo, 02-STANDARDS/Policies/terms.md
export const TERMS_LAST_UPDATED = "20 October 2026"

const EMAIL = "[info@visionmatrixinstitute.com](mailto:info@visionmatrixinstitute.com)"

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    blocks: [
      {
        type: "p",
        text: 'These Terms and Conditions ("Terms") apply to the website **visionmatrixinstitute.com** and to all courses, classes, demo sessions and the student dashboard offered by **Vision Matrix Institute** ("VMI", "we", "us", "our").',
      },
      { type: "p", text: `Contact: ${EMAIL}, +91 9930259997.` },
      {
        type: "p",
        text: "By using our website, booking a demo class, creating an account or paying for a course, you agree to these Terms. If you do not agree, please do not use our services.",
      },
    ],
  },
  {
    heading: "Our courses",
    blocks: [
      {
        type: "p",
        text: "2.1 VMI provides online, live, instructor-led training in data center electrical design, BIM (Revit) and AutoCAD, together with course materials and access to a student dashboard.",
      },
      {
        type: "p",
        text: "2.2 Each course page describes its content, duration and fee. We may update course content, schedules, instructors or tools to keep the training current. If a change significantly reduces what you paid for, you may ask for a refund under section 5.",
      },
      {
        type: "p",
        text: "2.3 Live class timings are shared with enrolled students. Classes may occasionally be rescheduled. We will tell you in advance where possible.",
      },
      {
        type: "p",
        text: "2.4 **Classes are recorded.** Live classes run on Zoom or Google Meet and are recorded by VMI. Recordings are shared only with students enrolled in that course, for their access period. Your name, voice, video (if your camera is on) and chat messages may appear in a recording. You may keep your camera off.",
      },
      {
        type: "p",
        text: "2.5 Our courses are educational. They are not a university degree, diploma or government-recognised qualification unless a course page clearly says otherwise.",
      },
    ],
  },
  {
    heading: "Your account",
    blocks: [
      { type: "p", text: "3.1 You must give accurate details (name, email and phone number) when you register or pay." },
      {
        type: "p",
        text: "3.2 A student dashboard account is created after payment. Keep your login details private. You are responsible for activity on your account.",
      },
      {
        type: "p",
        text: "3.3 Your account is for your personal use only. Sharing your login, or letting another person attend classes in your place, is not allowed.",
      },
      { type: "p", text: "3.4 You must be **at least 18 years old** to create an account or enrol." },
    ],
  },
  {
    heading: "Fees and payment",
    blocks: [
      {
        type: "p",
        text: "4.1 Course fees are shown on each course page in Indian Rupees (INR). Fees may be revised from time to time. The fee that applies to you is the one shown at the time you pay.",
      },
      {
        type: "p",
        text: "4.2 Payments are processed securely by **Razorpay**. VMI does not see or store your card, UPI or bank details.",
      },
      {
        type: "p",
        text: "4.3 **GST:** VMI is not currently registered for GST, so no GST is charged on course fees. If this changes, the course page and your invoice will show any GST that applies.",
      },
      { type: "p", text: "4.4 Your enrolment is confirmed only after your payment is successfully received." },
      {
        type: "p",
        text: "4.5 If an instalment option is offered, its terms will be shown before you pay. If an instalment is not paid on time, access to the course may be paused until it is paid.",
      },
    ],
  },
  {
    heading: "Refunds and cancellations",
    blocks: [
      {
        type: "p",
        text: "5.1 **Cooling-off period:** you may cancel and receive a **full refund** if you ask within **7 days of payment**, provided you have not attended more than **2 live classes** or accessed more than **20%** of the course materials.",
      },
      { type: "p", text: "5.2 After the cooling-off period, fees are not refundable, except as set out in 5.3." },
      {
        type: "p",
        text: "5.3 **If VMI cancels** a course or batch, or cannot deliver it as described, you may choose either a full refund or a free transfer to the next available batch.",
      },
      {
        type: "p",
        text: `5.4 **How to ask:** email ${EMAIL} from your registered email address with your name, course and payment ID.`,
      },
      {
        type: "p",
        text: "5.5 Approved refunds are returned to the original payment method within **7–10 working days**. The time for the money to reach your account depends on your bank or Razorpay.",
      },
      {
        type: "p",
        text: "5.6 **Batch transfer:** you may ask to move to a later batch once, free of charge, before more than 25% of your current batch is complete, subject to seats being available.",
      },
    ],
  },
  {
    heading: "Course access period",
    blocks: [
      {
        type: "p",
        text: "6.1 You will have access to the student dashboard, course materials and class recordings for **12 months** from your enrolment date.",
      },
      { type: "p", text: "6.2 After that period, access may end. We will tell you before it ends." },
    ],
  },
  {
    heading: "Certificates",
    blocks: [
      {
        type: "p",
        text: "7.1 Students who complete a course receive a **Certificate of Completion** from Vision Matrix Institute, showing the student's name, course title, hours, issue date and a certificate ID that can be verified on our website.",
      },
      {
        type: "p",
        text: "7.2 A certificate is issued only when you have completed **100% of the course** (every module) and submitted all required assignments.",
      },
      {
        type: "p",
        text: "7.3 The certificate confirms that you completed VMI's course. It is not an accreditation, a government recognition or an industry approval, and it is not a licence to practise engineering.",
      },
    ],
  },
  {
    heading: "Career guidance — no job guarantee",
    blocks: [
      {
        type: "p",
        text: "8.1 VMI offers career guidance: help with your resume, interview preparation and job-search guidance.",
      },
      {
        type: "p",
        text: "8.2 VMI **does not guarantee** a job, an interview, a salary or any particular career outcome. Results depend on your own effort, skills, background and the job market.",
      },
    ],
  },
  {
    heading: "Free demo classes",
    blocks: [
      { type: "p", text: "9.1 Demo classes are free and carry no obligation to enrol." },
      {
        type: "p",
        text: "9.2 When you book a demo, we may contact you by phone, email or WhatsApp about the demo and our courses. You can ask us to stop at any time.",
      },
    ],
  },
  {
    heading: "Your conduct",
    blocks: [
      { type: "p", text: "10.1 Be respectful to instructors and other students in classes, chats and community spaces." },
      { type: "p", text: "10.2 You must not:" },
      {
        type: "ul",
        items: [
          "record, copy, share, sell or publish classes, recordings or course materials;",
          "share your account or login;",
          "disrupt classes or harass anyone;",
          "upload anything unlawful, harmful or that infringes someone else's rights.",
        ],
      },
      {
        type: "p",
        text: "10.3 We may suspend or end your access, without a refund, if you seriously or repeatedly break these rules. We will normally warn you first.",
      },
    ],
  },
  {
    heading: "Course content and intellectual property",
    blocks: [
      {
        type: "p",
        text: "11.1 All course materials, videos, slides, handbooks, templates, calculators and website content belong to VMI or its licensors.",
      },
      {
        type: "p",
        text: "11.2 You may use them only for your own personal learning during your access period. You may not copy, resell, redistribute or use them to train others without our written permission.",
      },
      {
        type: "p",
        text: "11.3 Work you create in assignments stays yours. You allow VMI to use it within the course for teaching and assessment. We will not publish it publicly without your permission.",
      },
      {
        type: "p",
        text: `11.4 **Your photo, video and name in our marketing:** VMI may show students' names, photos, class video clips and feedback on its website, social media, YouTube and adverts **only if you agree**. We ask for this separately, and saying no does not affect your course. You can withdraw your consent at any time by emailing ${EMAIL}; we will then stop using it in new material and remove it from pages we control. See our [Privacy Policy](/privacy).`,
      },
    ],
  },
  {
    heading: "Software used in courses",
    blocks: [
      {
        type: "p",
        text: "Some courses use third-party software such as AutoCAD, Revit, ETAP or DIALux. Unless a course page clearly says the licence is included, **you are responsible for obtaining a valid licence** for any software you use, and for following that software's licence terms.",
      },
    ],
  },
  {
    heading: "Educational content only",
    blocks: [
      {
        type: "p",
        text: "13.1 Our training, blog articles, calculators and examples are for learning. They are not professional engineering advice for any specific project.",
      },
      {
        type: "p",
        text: "13.2 Always follow the applicable standards and codes, the manufacturer's data, the project specification, and the review of a qualified engineer before using anything in real design or installation work.",
      },
      {
        type: "p",
        text: "13.3 Our online calculators give approximate results for learning. They must not be the only basis for design decisions.",
      },
    ],
  },
  {
    heading: "Technical requirements",
    blocks: [
      {
        type: "p",
        text: "You need a stable internet connection, a suitable computer and, for some courses, the required software. VMI is not responsible for classes you miss because of problems with your own internet, device or software.",
      },
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      { type: "p", text: "15.1 We provide our services with reasonable care and skill." },
      {
        type: "p",
        text: "15.2 To the extent allowed by law, VMI's total liability to you for any claim relating to a course is limited to the **fees you paid for that course**.",
      },
      {
        type: "p",
        text: "15.3 VMI is not liable for indirect losses, such as loss of income, job opportunities or business, or for events outside our reasonable control (for example internet or power outages, or platform failures).",
      },
      {
        type: "p",
        text: "15.4 Nothing in these Terms limits any rights you have under Indian consumer protection law that cannot legally be limited.",
      },
    ],
  },
  {
    heading: "Privacy",
    blocks: [
      {
        type: "p",
        text: "We collect and use your personal data as described in our [Privacy Policy](/privacy), in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.",
      },
    ],
  },
  {
    heading: "Changes to these Terms",
    blocks: [
      {
        type: "p",
        text: "We may update these Terms from time to time. The latest version, with its date, will always be on this page. Changes do not affect a course you have already paid for, unless the change is required by law.",
      },
    ],
  },
  {
    heading: "Governing law and disputes",
    blocks: [
      { type: "p", text: "18.1 These Terms are governed by the laws of India." },
      { type: "p", text: `18.2 We will first try to resolve any complaint informally. Please contact us at ${EMAIL}.` },
      {
        type: "p",
        text: "18.3 If a dispute cannot be resolved, the courts in **Mumbai, Maharashtra** will have exclusive jurisdiction.",
      },
    ],
  },
  {
    heading: "Grievance contact",
    blocks: [
      { type: "p", text: "For complaints or grievances, including about personal data, contact:" },
      {
        type: "p",
        text: `**Grievance Officer: Shaikh Bushra**, Vision Matrix Institute. Email: ${EMAIL}`,
      },
      { type: "p", text: "We acknowledge complaints within **48 hours** and aim to resolve them within **30 days**." },
    ],
  },
]
