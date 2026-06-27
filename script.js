let lang = "en";
let adToBs = null;
let dateInterval = null;

const translations = {
  en: {
    name: "Sujan Limel",
    navHome: "Home",
    navAbout: "About",
    navEdu: "Education",
    navMedia: "Media",

    welcome: "Welcome to My Official Portfolio",

    subtitle: "Student • Learning New Technologies",

    aboutTitle: "👨 About Me",

    aboutText:
      "Hello! I'm Sujan Limel from Kathmandu, Nepal. I am passionate about technology and web development. I am currently learning new technologies every day and building projects to improve my skills. Welcome to my official portfolio website.",

    edu1: "SEE - Neel Barahi School",
    edu2: "Grade 12 - Triton International College",
    eduTitle: "🎓 Education",

    pdfHeading: "📘 Documents",
    pdfFile: "Nepali Barna PDF",
    pdfBtn: "Open PDF",

    mediaTitle: "📱 Media Gallery",
    photoTitle: "📷 Photo",
    videoTitle: "🎥 Video Reel",
    musicTitle: "🎵 Music Player",

    backBtnText: "Back",

    footer: "© 2026 Sujan Limel | All Rights Reserved",

    langBtn: "नेपाली"
  },

  ne: {
    name: "सुजन लिमेल",

    navHome: "गृहपृष्ठ",
    navAbout: "मेरो बारेमा",
    navEdu: "शिक्षा",
    navMedia: "मिडिया",

    welcome: "मेरो आधिकारिक वेबसाइटमा स्वागत छ",

    subtitle: "विद्यार्थी • नयाँ प्रविधिहरू सिक्दै",

    aboutTitle: "👨 मेरो बारेमा",

    aboutText:
      "नमस्ते! म सुजन लिमेल हुँ। म काठमाडौं, नेपालबाट हुँ। मलाई प्रविधि र वेब विकासमा रुचि छ। म अहिले नयाँ प्रविधिहरू सिक्दै छु र आफ्ना सीपहरू सुधार्न विभिन्न परियोजनाहरूमा काम गरिरहेको छु।",

    edu1: "एसईई - नील बाराही विद्यालय",
    edu2: "कक्षा १२ - ट्राइटन इन्टरनेशनल कलेज",
    eduTitle: "🎓 शिक्षा",

    pdfHeading: "📘 कागजातहरू",
    pdfFile: "नेपाली वर्णमाला PDF",
    pdfBtn: "पीडीएफ खोल्नुहोस्",

    mediaTitle: "📱 मिडिया ग्यालेरी",
    photoTitle: "📷 फोटो",
    videoTitle: "🎥 भिडियो",
    musicTitle: "🎵 संगीत",

    backBtnText: "पछाडि",

    footer: "© २०२६ सुजन लिमेल | सबै अधिकार सुरक्षित",

    langBtn: "English"
  }
};
const nepaliMonths = [
  "बैशाख",
  "जेठ",
  "असार",
  "साउन",
  "भदौ",
  "असोज",
  "कात्तिक",
  "मंसिर",
  "पुस",
  "माघ",
  "फागुन",
  "चैत"
];

function toNepaliNum(value) {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(value).replace(/\d/g, d => map[d]);
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
}

function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.toggle("show");
  }
}

function openPDF() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("pdfView").style.display = "block";
  window.scrollTo(0, 0);
}

function goBack() {
  document.getElementById("pdfView").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
}

function getKathmanduDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const year = parts.find(p => p.type === "year")?.value || "0000";
  const month = parts.find(p => p.type === "month")?.value || "00";
  const day = parts.find(p => p.type === "day")?.value || "00";

  return `${year}-${month}-${day}`;
}

function getKathmanduWeekday(date = new Date()) {
  const weekdayEn = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "long"
  }).format(date);

  const weekdayMap = {
    Sunday: "आइतबार",
    Monday: "सोमबार",
    Tuesday: "मंगलबार",
    Wednesday: "बुधबार",
    Thursday: "बिहीबार",
    Friday: "शुक्रबार",
    Saturday: "शनिबार"
  };

  return weekdayMap[weekdayEn] || weekdayEn;
}

function updateDateTime() {
  const el = document.getElementById("datetime");
  if (!el) return;

  const now = new Date();

  if (lang === "en") {
    const dateStr = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(now);

    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(now);

    el.textContent = `${dateStr} | ${timeStr}`;
    return;
  }

  if (!adToBs) {
    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(now);

    const nepaliTimeStr = timeStr
      .replace(/\d/g, d => toNepaliNum(d))
      .replace("AM", "बिहान")
      .replace("PM", "बेलुकी");

    el.textContent = `BS converter loading... | ${nepaliTimeStr}`;
    return;
  }

  try {
    const adDate = getKathmanduDateString(now);
    const bsDate = adToBs(adDate);

    const [bsYear, bsMonth, bsDay] = String(bsDate).split("-").map(Number);

    const timeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    }).format(now);

    const nepaliTimeStr = timeStr
      .replace(/\d/g, d => toNepaliNum(d))
      .replace("AM", "बिहान")
      .replace("PM", "बेलुकी");

    const nepaliDateStr = `${getKathmanduWeekday(now)}, ${toNepaliNum(bsDay)} ${nepaliMonths[bsMonth - 1]} ${toNepaliNum(bsYear)}`;
    el.textContent = `${nepaliDateStr} | ${nepaliTimeStr}`;
  } catch (err) {
    console.error("Date conversion failed:", err);
    el.textContent = "Date conversion error";
  }
}

function resetTypingAnimation() {
  const typingEl = document.getElementById("typingTarget");
  if (!typingEl) return;

  typingEl.style.animation = "none";
  void typingEl.offsetWidth;
  typingEl.textContent = translations[lang].welcome;
  typingEl.style.animation = "typing 3.5s steps(30, end) forwards, blink 0.75s step-end infinite";
}

function applyTranslations() {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (!key) return;

    if (key === "welcome") return;
    el.textContent = translations[lang][key];
  });

  document.getElementById("langBtn").textContent = translations[lang].langBtn;
  resetTypingAnimation();
  updateDateTime();
}

function toggleLanguage() {
  lang = lang === "en" ? "ne" : "en";
  applyTranslations();
}

async function loadNepaliDateConverter() {
  try {
    const mod = await import("https://esm.sh/@sbmdkl/nepali-date-converter");
    adToBs = mod.adToBs;
  } catch (e) {
    console.warn("Nepali date converter failed to load:", e);
  } finally {
    updateDateTime();

    if (dateInterval) clearInterval(dateInterval);
    dateInterval = setInterval(updateDateTime, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("langBtn").textContent = translations[lang].langBtn;
  updateDateTime();
  loadNepaliDateConverter();

  const navLinks = document.querySelectorAll("#navMenu a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const navMenu = document.getElementById("navMenu");
      if (window.innerWidth <= 900 && navMenu) {
        navMenu.classList.remove("show");
      }
    });
  });
});
