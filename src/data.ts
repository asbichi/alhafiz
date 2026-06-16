import { GalleryItem, Donation, ContactMessage, Announcement, Volunteer } from './types';

export const FOUNDATION_INFO = {
  name: "AL - HAFIZ ISLAMIC FOUNDATION FOR DA'AWAH AND SERVICE TO HUMANITY",
  caption: "Providing shelter, complete Islamic & western education, and community support for Kaduna's orphans.",
  address: "No. 1 Kakuri Road by Sabon birni steet, Adjacent Gidan A acha - Kawo Kaduna.",
  phone: "08035962290",
  altPhone: "",
  email: "abidaayah@gmail.com",
  mission: "To promote education and community welfare by providing orphans and underprivileged children with high-quality education, healthcare, moral mentorship, and a loving environment.",
  vision: "To be a leading center of Islamic and academic excellence that nurtures children to become independent, god-fearing, and productive members of the global community.",
  foundedYear: 2010,
  leftLogoUrl: "https://i.ibb.co/tPT7FtzV/8ae5f200-0aa2-4ae5-889f-324ddfdd85c4.jpg",
  rightLogoUrl: "https://i.ibb.co/zVhsQPRB/45c5be8c-40b4-4b44-904d-3958c2c30868.jpg",
  socialLinks: {
    x: "https://x.com/alhafizislamicf",
    whatsapp: "https://chat.whatsapp.com/HTkguJY0F8X5ika2U98ZuK",
    telegram: "https://t.me/+-sc68QrSXitjYmJk",
    instagram: "https://t.co/redirect?cn=b25ib2FyZGluZ193ZWxjb21l&iid=4bfc1c33187a4f56a890ebc52f4d8781&nid=15+7&sig=18dd7249b65f0964e36146f72a692a87122855ef&t=1+1780931374109&uid=2064001349755322368&url=https%3A%2F%2Fm.x.com%2FAlhafizislamicf%3Fct%3Db25ib2FyZGluZ193ZWxjb21l%26ppid%3Demail-push-service"
  }
};

export const ORIGINATOR_INFO = {
  name: "Adam Idris Usman Mallawan Falakin Zazzau",
  title: "Originator / Founder & Patron",
  bio: "Driven by the Islamic command of service to humanity and education, Adam Idris Usman Mallawan Falakin Zazzau established the Al-Hafiz Islamic Foundation in Kawo, Kaduna in 2010AD. His vision has combined comprehensive Quranic memorization (Hifz) with sound Western academic curricula, creating a sanctuary of learning and growth for hundreds of children.",
  quote: "“The proof of faith is how we care for the youth and foster wisdom. Educating a child is building a continuous charity that outlasts our lifetimes.”",
  imageUrl: "https://i.ibb.co/r25hSHyb/f3a8b7a1-e94e-4e78-9fc9-69838d8278da.jpg"
};

export const SUCCESS_STORIES = [
  {
    id: "story-1",
    name: "Aisha Muhammad",
    role: "Hifz Graduate & Medical Student",
    quote: "Coming to Al-Hafiz Foundation gave me hope when I had none. Not only did I memorize the Holy Quran, but the foundation sponsored my secondary education, paving the way for my current medical studies.",
  },
  {
    id: "story-2",
    name: "Umar Farooq",
    role: "Vocational Trainee & Entrepreneur",
    quote: "The vocational training program equipped me with carpentry skills. Today, I run my own workshop and employ two other youths from the community. Al-Hafiz Foundation changed my life trajectory.",
  },
  {
    id: "story-3",
    name: "Fatima Ali",
    role: "Current Student (JSS 3)",
    quote: "Before joining the foundation, I couldn't read or write. Now, I am top of my class and have memorized 15 Ajza of the Quran. I dream of becoming a teacher to help others like me.",
  }
];

export const SCHOOL_NEEDS = [
  {
    id: "need-1",
    title: "Monthly Food & Nutrition",
    description: "Sustaining a nutritious daily diet for our orphans, including three meals, fresh fruits, and dairy to ensure their healthy physical development.",
    costEstimate: "₦250,000 / month",
    icon: "Heart"
  },
  {
    id: "need-2",
    title: "Educational Materials & Books",
    description: "Providing modern textbooks, Quranic copies (Mushaf), writing materials, and school bags for the upcoming academic session.",
    costEstimate: "₦15,000 / student",
    icon: "BookOpen"
  },
  {
    id: "need-3",
    title: "School Uniforms & Clothing",
    description: "Sewing custom academic uniforms, providing comfortable footwear, and casual clothing for the children residing in the orphanage facility.",
    costEstimate: "₦18,500 / kit",
    icon: "Shirt"
  },
  {
    id: "need-4",
    title: "Healthcare & Medicine",
    description: "Routine medical checkups, malaria treatments, first-aid supplies, and emergency health provisions for the children.",
    costEstimate: "₦100,000 / month",
    icon: "Stethoscope"
  },
  {
    id: "need-5",
    title: "Facility Maintenance & Solar",
    description: "Maintaining the classroom roofs, dormitory beds, and continuously upgrading our solar power systems for uninterrupted study at night.",
    costEstimate: "Varies",
    icon: "Sun"
  },
  {
    id: "need-6",
    title: "Teacher & Staff Welfare",
    description: "Supporting the monthly stipends of our dedicated Islamic and Western education teachers, caretakers, and security personnel.",
    costEstimate: "₦400,000 / month",
    icon: "Users"
  }
];

export const FUNDING_TARGET = {
  title: "New Classroom Construction Fund",
  currentAmount: 3500000,
  targetAmount: 5000000,
  currency: "NGN",
  description: "Help us build additional classrooms to accommodate 50 new orphans enrolling this year."
};

export const YEARLY_IMPACT_DATA = [
  { year: '2019', students: 120, orphansSupported: 45 },
  { year: '2020', students: 155, orphansSupported: 60 },
  { year: '2021', students: 210, orphansSupported: 85 },
  { year: '2022', students: 280, orphansSupported: 130 },
  { year: '2023', students: 350, orphansSupported: 180 },
  { year: '2024', students: 420, orphansSupported: 240 },
  { year: '2025', students: 500, orphansSupported: 300 },
  { year: '2026', students: 615, orphansSupported: 385 }
];

export const initialGalleryItems: GalleryItem[] = [
  {
    id: "gal-0000000000",
    imageUrl: "https://i.ibb.co/7J7DGp3q/769ceb14-3711-4edb-adec-f2d0df45a9b8.jpg",
    caption: "Al-Hafiz Annual Hifz & Academic Excellence Graduation",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Young Quranic scholars celebrating their memorization milestone with graduation scrolls, marking their academic progression at Al-Hafiz Islamic Foundation."
  },
  {
    id: "gal-000000000",
    imageUrl: "https://i.ibb.co/5xschhyk/14ba2895-b303-4bca-8b3e-53145375a176.jpg",
    caption: "Al-Hafiz Quran Memorization & Academic Merit Awards",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Honoring our exceptional scholars with graduation scrolls and certificates of excellence for their moral uprightness and Quranic memorization achievement."
  },
  {
    id: "gal-00000000",
    imageUrl: "https://i.ibb.co/R4S8fyFL/7f813ff6-9fc9-4493-a050-5c9e8603de4d.jpg",
    caption: "Al-Hafiz Prestigious Quranic Completion & Academic Achievement Awards",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Honoring our successful young memorizers and outstanding students with scrolls and prizes during the formal annual graduation assembly."
  },
  {
    id: "gal-0000000",
    imageUrl: "https://i.ibb.co/FkpMZrt6/5edaf7a4-bfd9-460b-86f2-029c39a86e46.jpg",
    caption: "Al-Hafiz Annual Graduation Celebration & Certificate Presentation",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Young graduates holding their achievement scrolls during the celebratory graduation event in Kaduna, marking their major academic milestones."
  },
  {
    id: "gal-000000",
    imageUrl: "https://i.ibb.co/Y4QmhvC9/2aeb1b4e-9a3d-478c-9eed-2992a4b767f4.jpg",
    caption: "Al-Hafiz Quran Memorization & Hifz Graduation Honors",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Honored graduates celebrating their memorization (Hifz) completion, framed by their teachers and parents in a joyous community ceremony."
  },
  {
    id: "gal-00000",
    imageUrl: "https://i.ibb.co/kg2Jstwm/2a7b9141-fd2b-4d71-9e23-aaa9aed35121.jpg",
    caption: "Al-Hafiz Islamic Foundation Grand Graduation Assembly",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "A momentous occasion celebrating the moral, scientific, and Quranic achievements of our graduates as they prepare to serve their community."
  },
  {
    id: "gal-0000",
    imageUrl: "https://i.ibb.co/r2gBKkD1/1ebffb24-9829-4e62-9007-fa16be38562f.jpg",
    caption: "Al-Hafiz Foundation Memorization & Hifz Graduate Honors",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Our diligent students receiving awards and accolades during our annual celebration of academic and moral excellence."
  },
  {
    id: "gal-000",
    imageUrl: "https://i.ibb.co/hJDbJJTp/1aa84438-0f7a-47a2-bd86-1a6d4947ea50.jpg",
    caption: "Al-Hafiz Annual Graduation and Hifz Ceremony",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Orphan students of Al-Hafiz foundation being recognized for excellent performance and discipline in Quran memorization and basic education."
  },
  {
    id: "gal-00",
    imageUrl: "https://i.ibb.co/PGHjnk76/0ed48282-b2e0-4f40-8763-6e1299a418d2.jpg",
    caption: "Islamic & Western Study Excellence Presentation",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Honored students presented with awards for outstanding performance in both Quranic studies and contemporary academic subjects."
  },
  {
    id: "gal-0",
    imageUrl: "https://i.ibb.co/Q7xQS9ny/7f813ff6-9fc9-4493-a050-5c9e8603de4d.jpg",
    caption: "Al-Hafiz Islamic Foundation Holy Quran Graduation Class",
    graduationYear: 2026,
    category: "Quranic Graduation",
    description: "Our student graduates celebrating their memorization completion (Hifz) and basic academic achievements in an elegant ceremony."
  },
  {
    id: "gal-1",
    imageUrl: "https://i.ibb.co/tPT7FtzV/8ae5f200-0aa2-4ae5-889f-324ddfdd85c4.jpg",
    caption: "Inaugural Graduation Class of Hifz-ul-Quran",
    graduationYear: 2025,
    category: "Quranic Graduation",
    description: "Our pioneering students who fully completed the memorization of the Holy Quran, celebrated with family, teachers, and prestigious scholars of Kaduna."
  },
  {
    id: "gal-2",
    imageUrl: "https://i.ibb.co/zVhsQPRB/45c5be8c-40b4-4b44-904d-3958c2c30868.jpg",
    caption: "Primary School Leaving Certificate Ceremony",
    graduationYear: 2025,
    category: "Academic",
    description: "An elegant ceremony honoring students who completed their basic primary education, moving into junior secondary school with top academic honors."
  }
];

export const initialDonations: Donation[] = [
  {
    id: "don-1",
    donorName: "Alhaji Ibrahim Danbata",
    email: "i.danbata@gmail.com",
    amount: 150000,
    currency: "NGN",
    date: "2026-06-07T14:22:00Z",
    purpose: "Quranic & Academic Textbooks Supply",
    message: "May Allah put His barakah in the education of these young stars.",
    gatewayStatus: "SUCCESS",
    reference: "ALH-892348-NGN"
  },
  {
    id: "don-2",
    donorName: "Dr. Fatima Yusuf",
    email: "fatima.yusuf@abu.edu.ng",
    amount: 450,
    currency: "USD",
    date: "2026-06-05T09:15:00Z",
    purpose: "Orphanage Food & Healthcare Fund",
    message: "A tiny contribution towards the monthly welfare program of our children.",
    gatewayStatus: "SUCCESS",
    reference: "ALH-334902-USD"
  },
  {
    id: "don-3",
    donorName: "Malama Aisha Balarabe",
    email: "aisha.b@yahoo.com",
    amount: 50000,
    currency: "NGN",
    date: "2026-06-04T18:40:00Z",
    purpose: "Secondary School Uniforms & Sandals",
    gatewayStatus: "SUCCESS",
    reference: "ALH-512034-NGN"
  },
  {
    id: "don-4",
    donorName: "Anonymously Blessed",
    email: "anonymous@barakah.org",
    amount: 1000,
    currency: "GBP",
    date: "2026-05-28T11:02:00Z",
    purpose: "Solar Power Project for Kawo Campus",
    message: "Supporting sustainable illumination so the kids can revise their Quran memorization comfortable at night.",
    gatewayStatus: "SUCCESS",
    reference: "ALH-992104-GBP"
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    senderName: "Mallam Bello Maitama",
    email: "bello.maitama@outlook.com",
    phone: "08039988776",
    subject: "Admissions for Year 1 Secondary",
    message: "Good day. I am writing to inquire about the scholarship admission process for two orphan boys currently basic school graduates from Rigasa. We would highly appreciate your admission steps.",
    date: "2026-06-08T08:30:00Z",
    isRead: false
  },
  {
    id: "msg-2",
    senderName: "Barrister Amina Lawal",
    email: "amina.lawal.chambers@gmail.com",
    phone: "08061234455",
    subject: "Volunteering as a Weekend Instructor",
    message: "As-salamu alaykum. I am a legal practitioner based in Kaduna and would love to volunteer my weekends in teaching English composition or civic rights to your senior classes. Kindly let me know if this is welcome.",
    date: "2026-06-06T12:00:00Z",
    isRead: true
  },
  {
    id: "msg-3",
    senderName: "Usman Dan-Mallam",
    email: "usmandanm@gmail.com",
    phone: "08152233445",
    subject: "Donating Food Items directly",
    message: "Peace be unto you. Our cooperative society has acquired bags of rice, maize, and cooking oil to deliver directly to the Kakuri Road campus. Please advise who to contact for logistics reception.",
    date: "2026-06-05T16:45:00Z",
    isRead: false
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Urgent: School Uniform and Shoes Drive",
    content: "We are currently seeking sponsorship for 45 newly enrolled primary school orphans. Each kit cost N18,500 ($12 USD equivalent) consisting of two uniforms, a pair of leather shoes, and socks.",
    date: "2026-06-07T08:00:00Z",
    category: "Needs"
  },
  {
    id: "ann-2",
    title: "Kawo Campus Solar Power System Completed!",
    content: "Alhamdulillah! Through the generous sponsorship of our community and our global supporters, we have completed the installation of a 7.5kVA hybrid solar power system, providing continuous clean energy for the classrooms and dormitory.",
    date: "2026-06-02T10:00:00Z",
    category: "Milestone"
  },
  {
    id: "ann-3",
    title: "Upcoming Quran Memorization Graduation (Hifz)",
    content: "Joint celebration of 18 children who have fully memorized the Holy Quran under teachers of Al-Hafiz. Scheduled to take place on Saturday, July 11th, 2026, at our main Kaduna Center.",
    date: "2026-05-25T09:00:00Z",
    category: "General"
  }
];

export const initialVolunteers: Volunteer[] = [
  {
    id: "vol-1",
    name: "Ahmed Musa",
    email: "ahmed.musa@example.com",
    phone: "08012345678",
    areaOfInterest: "Teaching",
    availability: "Weekends",
    message: "I am a high school teacher and would like to volunteer to teach mathematics on weekends.",
    date: "2026-06-08T10:00:00Z",
    status: "APPROVED"
  },
  {
    id: "vol-2",
    name: "Zainab Ali",
    email: "z.ali.med@example.com",
    phone: "08123456789",
    areaOfInterest: "Healthcare",
    availability: "Monthly",
    message: "I'm a registered nurse and can help with routine medical checkups for the orphans.",
    date: "2026-06-09T09:30:00Z",
    status: "PENDING"
  }
];
