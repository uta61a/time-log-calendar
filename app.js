const STORAGE_KEY = "time-log-calendar-entries";
const LANGUAGE_STORAGE_KEY = "time-log-calendar-language";

const currentHourMinuteEl = document.getElementById("currentHourMinute");
const currentSecondsEl = document.getElementById("currentSeconds");
const currentMetaEl = document.getElementById("currentMeta");
const activityInputEl = document.getElementById("activityInput");
const saveButtonEl = document.getElementById("saveButton");
const useCurrentTimeButtonEl = document.getElementById("useCurrentTimeButton");
const recordHeadingEl = document.getElementById("recordHeading");
const dateTimeLabelEl = document.getElementById("dateTimeLabel");
const activityLabelEl = document.getElementById("activityLabel");
const calendarMonthLabelEl = document.getElementById("calendarMonthLabel");
const calendarGridEl = document.getElementById("calendarGrid");
const toggleCalendarButtonEl = document.getElementById("toggleCalendarButton");
const prevMonthButtonEl = document.getElementById("prevMonthButton");
const nextMonthButtonEl = document.getElementById("nextMonthButton");
const textCalendarMonthLabelEl = document.getElementById("textCalendarMonthLabel");
const textCalendarGridEl = document.getElementById("textCalendarGrid");
const textToggleCalendarButtonEl = document.getElementById("textToggleCalendarButton");
const textPrevMonthButtonEl = document.getElementById("textPrevMonthButton");
const textNextMonthButtonEl = document.getElementById("textNextMonthButton");
const selectedDateLabelEl = document.getElementById("selectedDateLabel");
const selectedEntriesEl = document.getElementById("selectedEntries");
const manualDateTimeInputEl = document.getElementById("manualDateTimeInput");
const toastContainerEl = document.getElementById("toastContainer");
const recordTabButtonEl = document.getElementById("recordTabButton");
const reviewTabButtonEl = document.getElementById("reviewTabButton");
const textTabButtonEl = document.getElementById("textTabButton");
const settingsIconButtonEl = document.getElementById("settingsIconButton");
const heroSectionEl = document.getElementById("heroSection");
const recordTabEl = document.getElementById("recordTab");
const reviewTabEl = document.getElementById("reviewTab");
const textTabEl = document.getElementById("textTab");
const settingsTabEl = document.getElementById("settingsTab");
const textExportLabelEl = document.getElementById("textExportLabel");
const textExportOutputEl = document.getElementById("textExportOutput");
const copyTextButtonEl = document.getElementById("copyTextButton");
const settingsHeadingEl = document.getElementById("settingsHeading");
const languageLabelEl = document.getElementById("languageLabel");
const languageJaButtonEl = document.getElementById("languageJaButton");
const languageEnButtonEl = document.getElementById("languageEnButton");
const tabPanelEl = document.querySelector(".tab-panel");

let selectedDateKey = null;
let activeTab = "record";
let currentClockDate = null;
let isCalendarExpanded = false;
let visibleMonthKey = "";
let currentLanguage = loadLanguage();
const activeToasts = new Map();
const USER_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const RELEASE_YEAR = 2026;
const RELEASE_MONTH = 8;
const MONTH_LENGTHS = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const TRANSLATIONS = {
  ja: {
    documentTitle: "時間記録カレンダー",
    recordTab: "記録",
    reviewTab: "履歴",
    textTab: "テキスト化",
    settingsTab: "設定",
    tabList: "記録タブ",
    recordHeading: "かんたん記録",
    dateTimeLabel: "日時",
    useCurrentTime: "現在の時刻を取得",
    activityLabel: "今していること",
    save: "記録する",
    openCalendar: "カレンダーを開く",
    collapseCalendar: "折りたたむ",
    deleteEntry: "記録を削除",
    copy: "コピーする",
    settingsHeading: "設定",
    settingsButton: "設定",
    languageLabel: "言語",
    languageChanged: "言語を変更しました。",
    noDisplayEntries: "まだ表示する記録がありません。",
    noDayEntries: "この日の記録はまだありません。",
    noCopyText: "コピーできる記録がありません。",
    copiedText: "テキストをクリップボードにコピーしました。",
    copyFailed: "コピーに失敗しました。手動でコピーしてください。",
    deleteSuccess: "記録を削除しました。",
    savePrompt: "記録内容を入力してください。",
    datePrompt: "日時を入力してください。",
    monthRangeError: "記録できるのは2026年8月から現在の月までです。",
    invalidDateError: "その月には存在しない日付です。",
    futureError: "未来の予定は記録できません。過去または現在の時刻を選んでください。",
    useCurrentTimeSuccess: "この端末の現在時刻を入力しました。",
    saveSuccess: "{date} {time} の記録を保存しました。",
    reviewLabel: "{month}/{day}の記録",
    textExportLabel: "{month}/{day}をテキスト化",
    textExportEmpty: "テキスト化",
    currentDateTimeLabel: "この端末の現在日時",
    prevMonthAria: "前の月",
    nextMonthAria: "次の月",
    prevPeriodAria: "前の期間",
    nextPeriodAria: "次の期間",
    monthLabel: "{year}年{month}月",
    entryCount: "{count}件",
    weekdaysShort: ["日", "月", "火", "水", "木", "金", "土"],
  },
  en: {
    documentTitle: "Time Log Calendar",
    recordTab: "Log",
    reviewTab: "History",
    textTab: "Export",
    settingsTab: "Settings",
    tabList: "Navigation tabs",
    recordHeading: "Quick Log",
    dateTimeLabel: "Date and time",
    useCurrentTime: "Use current time",
    activityLabel: "What are you doing?",
    save: "Save",
    openCalendar: "Open calendar",
    collapseCalendar: "Collapse",
    deleteEntry: "Delete entry",
    copy: "Copy",
    settingsHeading: "Settings",
    settingsButton: "Settings",
    languageLabel: "Language",
    languageChanged: "Language updated.",
    noDisplayEntries: "No entries to show yet.",
    noDayEntries: "There are no entries for this day yet.",
    noCopyText: "There is nothing to copy.",
    copiedText: "Copied to clipboard.",
    copyFailed: "Copy failed. Please copy it manually.",
    deleteSuccess: "Entry deleted.",
    savePrompt: "Please enter what you are doing.",
    datePrompt: "Please enter a date and time.",
    monthRangeError: "You can log only from August 2026 through the current month.",
    invalidDateError: "That date does not exist in this month.",
    futureError: "Future plans cannot be logged. Choose a past or current time.",
    useCurrentTimeSuccess: "Inserted this device's current time.",
    saveSuccess: "Saved entry for {date} {time}.",
    reviewLabel: "{month}/{day} log",
    textExportLabel: "Export {month}/{day}",
    textExportEmpty: "Export",
    currentDateTimeLabel: "Current date and time on this device",
    prevMonthAria: "Previous month",
    nextMonthAria: "Next month",
    prevPeriodAria: "Previous period",
    nextPeriodAria: "Next period",
    monthLabel: "{monthName} {year}",
    entryCount: "{count}",
    weekdaysShort: ["S", "M", "T", "W", "T", "F", "S"],
  },
};

const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function loadLanguage() {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === "ja" || saved === "en") {
    return saved;
  }

  return "en";
}

function t(key, params = {}) {
  const template = TRANSLATIONS[currentLanguage][key] ?? TRANSLATIONS.ja[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, token) => String(params[token] ?? ""));
}

function saveLanguage(language) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read local storage", error);
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function isLeapYear(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function getDaysInMonth(year, month) {
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }

  return MONTH_LENGTHS[month];
}

function getFirstWeekday(year, month) {
  return new Date(year, month - 1, 1).getDay();
}

function compareYearMonth(yearA, monthA, yearB, monthB) {
  if (yearA !== yearB) {
    return yearA - yearB;
  }

  return monthA - monthB;
}

function formatDateKeyFromParts(year, month, day) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function parseDateTimeInput(value) {
  if (!value) {
    return null;
  }

  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) {
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  if ([year, month, day, hour, minute].some(Number.isNaN)) {
    return null;
  }

  return { year, month, day, hour, minute };
}

function partsToDate(parts) {
  return new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, 0);
}

function getCurrentLocalInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hour = pad(now.getHours());
  const minute = pad(now.getMinutes());
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

function formatSlashDate(year, month, day) {
  return `${year}/${pad(month)}/${pad(day)}`;
}

function formatReviewLabel(dateKey) {
  const [, month, day] = dateKey.split("-");
  return t("reviewLabel", { month, day });
}

function formatTextExportLabel(dateKey) {
  const [, month, day] = dateKey.split("-");
  return t("textExportLabel", { month, day });
}

function getCurrentAvailableMonth() {
  const baseDate = currentClockDate || new Date();
  return {
    year: baseDate.getFullYear(),
    month: baseDate.getMonth() + 1,
  };
}

function getTodayKey() {
  const baseDate = currentClockDate || new Date();
  return formatDateKeyFromParts(
    baseDate.getFullYear(),
    baseDate.getMonth() + 1,
    baseDate.getDate(),
  );
}

function getAvailableMonths() {
  const months = [];
  const current = getCurrentAvailableMonth();
  let year = RELEASE_YEAR;
  let month = RELEASE_MONTH;

  while (compareYearMonth(year, month, current.year, current.month) <= 0) {
    months.push({ year, month });
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return months;
}

function formatMonthKey(year, month) {
  return `${year}-${pad(month)}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return { year, month, day };
}

function getVisibleMonth() {
  const months = getAvailableMonths();
  return months.find(({ year, month }) => formatMonthKey(year, month) === visibleMonthKey) || months[months.length - 1];
}

function setVisibleMonthFromDateKey(dateKey) {
  const { year, month } = parseDateKey(dateKey);
  visibleMonthKey = formatMonthKey(year, month);
}

function getLocationLabel() {
  if (!USER_TIME_ZONE || !USER_TIME_ZONE.includes("/")) {
    return "Local";
  }

  const [countryRaw, cityRaw] = USER_TIME_ZONE.split("/");
  const country = countryRaw.replaceAll("_", " ");
  const city = cityRaw.replaceAll("_", " ");
  return `${country}, ${city}`;
}

function formatMonthLabel(year, month) {
  if (currentLanguage === "en") {
    return t("monthLabel", { year, monthName: MONTH_NAMES_EN[month - 1] });
  }

  return t("monthLabel", { year, month });
}

function formatEntryCount(count) {
  if (!count) {
    return "";
  }

  return t("entryCount", { count });
}

function formatClockParts(date) {
  return {
    hourMinute: `${pad(date.getHours())}:${pad(date.getMinutes())}`,
    seconds: pad(date.getSeconds()),
    year: String(date.getFullYear()),
    monthDay: `${pad(date.getMonth() + 1)}/${pad(date.getDate())}`,
  };
}

function renderStaticText() {
  document.documentElement.lang = currentLanguage;
  document.title = t("documentTitle");
  currentHourMinuteEl.parentElement.parentElement.setAttribute("aria-label", t("currentDateTimeLabel"));
  recordHeadingEl.textContent = t("recordHeading");
  dateTimeLabelEl.textContent = t("dateTimeLabel");
  useCurrentTimeButtonEl.textContent = t("useCurrentTime");
  activityLabelEl.textContent = t("activityLabel");
  saveButtonEl.textContent = t("save");
  recordTabButtonEl.textContent = t("recordTab");
  reviewTabButtonEl.textContent = t("reviewTab");
  textTabButtonEl.textContent = t("textTab");
  settingsHeadingEl.textContent = t("settingsHeading");
  languageLabelEl.textContent = t("languageLabel");
  copyTextButtonEl.textContent = t("copy");
  settingsIconButtonEl.setAttribute("aria-label", t("settingsButton"));
  prevMonthButtonEl.setAttribute("aria-label", t("prevMonthAria"));
  nextMonthButtonEl.setAttribute("aria-label", t("nextMonthAria"));
  textPrevMonthButtonEl.setAttribute("aria-label", t("prevPeriodAria"));
  textNextMonthButtonEl.setAttribute("aria-label", t("nextPeriodAria"));
  document.querySelector(".bottom-nav").setAttribute("aria-label", t("tabList"));
  languageJaButtonEl.classList.toggle("is-active", currentLanguage === "ja");
  languageEnButtonEl.classList.toggle("is-active", currentLanguage === "en");
}

function showToast(message, type = "success") {
  showToastWithKey(`${type}:${message}`, message, type);
}

function showToastWithKey(key, message, type = "success") {
  const existingToast = activeToasts.get(key);
  if (existingToast) {
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainerEl.appendChild(toast);
  activeToasts.set(key, toast);

  window.setTimeout(() => {
    activeToasts.delete(key);
    toast.remove();
  }, 3200);
}

function deleteEntry(entryId) {
  const nextEntries = loadEntries().filter((entry) => entry.id !== entryId);
  saveEntries(nextEntries);
  renderCalendar();
  renderSelectedEntries();
  renderTextExport();
  showToastWithKey(`delete:${entryId}`, t("deleteSuccess"), "success");
}

function renderCurrentDateTime(date) {
  const clock = formatClockParts(date);
  currentHourMinuteEl.textContent = clock.hourMinute;
  currentSecondsEl.textContent = clock.seconds;
  currentMetaEl.textContent = `${clock.year} ${clock.monthDay} ${getLocationLabel()}`;
}

function syncCurrentDateTime() {
  currentClockDate = new Date();
  renderCurrentDateTime(currentClockDate);
}

function tickCurrentDateTime() {
  if (!currentClockDate) {
    syncCurrentDateTime();
    return;
  }

  currentClockDate = new Date(currentClockDate.getTime() + 1000);

  if (currentClockDate.getSeconds() === 0) {
    syncCurrentDateTime();
    renderCalendar();
    if (!selectedDateKey) {
      selectedDateKey = getTodayKey();
      renderSelectedEntries();
      renderTextExport();
    }
    return;
  }

  renderCurrentDateTime(currentClockDate);
}

function getEntriesByDate() {
  return loadEntries().reduce((map, entry) => {
    if (!map[entry.dateKey]) {
      map[entry.dateKey] = [];
    }
    map[entry.dateKey].push(entry);
    return map;
  }, {});
}

function buildMonthCells(year, month, entriesByDate) {
  const cells = [];
  const firstWeekday = getFirstWeekday(year, month);
  const lastDate = getDaysInMonth(year, month);

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ type: "placeholder" });
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const dateKey = formatDateKeyFromParts(year, month, day);
    cells.push({
      type: "day",
      day,
      dateKey,
      entries: entriesByDate[dateKey] || [],
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ type: "placeholder" });
  }

  return cells;
}

function getSelectedWeekCells(cells, year, month) {
  const firstDayIndex = cells.findIndex((cell) => cell.type === "day");
  const selectedIndex = cells.findIndex((cell) => cell.type === "day" && cell.dateKey === selectedDateKey);
  const activeIndex = selectedIndex >= 0 ? selectedIndex : firstDayIndex;
  const selectedParts = selectedDateKey ? parseDateKey(selectedDateKey) : null;

  if (!selectedParts || selectedParts.year !== year || selectedParts.month !== month || activeIndex < 0) {
    return cells.slice(0, 7);
  }

  const weekStart = Math.floor(activeIndex / 7) * 7;
  return cells.slice(weekStart, weekStart + 7);
}

function renderWeekdayRow(container) {
  const weekdayRow = document.createElement("div");
  weekdayRow.className = "weekday-row";
  weekdayRow.setAttribute("aria-hidden", "true");
  weekdayRow.innerHTML = TRANSLATIONS[currentLanguage].weekdaysShort
    .map((day) => `<span>${day}</span>`)
    .join("");
  container.appendChild(weekdayRow);
}

function renderCalendarCells(container, cells) {
  const monthGrid = document.createElement("div");
  monthGrid.className = "calendar-grid";

  cells.forEach((cell) => {
    if (cell.type === "placeholder") {
      const placeholder = document.createElement("div");
      placeholder.className = "day-placeholder";
      monthGrid.appendChild(placeholder);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = `day-button${cell.entries.length ? " has-entry" : ""}${selectedDateKey === cell.dateKey ? " is-selected" : ""}`;
    button.innerHTML = `
      <span class="day-number">${cell.day}</span>
      <span class="entry-count">${formatEntryCount(cell.entries.length)}</span>
    `;
    button.addEventListener("click", () => {
      selectedDateKey = cell.dateKey;
      setVisibleMonthFromDateKey(cell.dateKey);
      renderCalendar();
      renderSelectedEntries();
      renderTextExport();
    });

    monthGrid.appendChild(button);
  });

  container.appendChild(monthGrid);
}

function getCalendarTargets() {
  return [
    {
      monthLabelEl: calendarMonthLabelEl,
      gridEl: calendarGridEl,
      toggleButtonEl: toggleCalendarButtonEl,
      prevButtonEl: prevMonthButtonEl,
      nextButtonEl: nextMonthButtonEl,
    },
    {
      monthLabelEl: textCalendarMonthLabelEl,
      gridEl: textCalendarGridEl,
      toggleButtonEl: textToggleCalendarButtonEl,
      prevButtonEl: textPrevMonthButtonEl,
      nextButtonEl: textNextMonthButtonEl,
    },
  ];
}

function updateCalendarControls() {
  const canMovePrev = canMoveVisiblePeriod(-1);
  const canMoveNext = canMoveVisiblePeriod(1);
  const toggleLabel = isCalendarExpanded ? t("collapseCalendar") : t("openCalendar");

  getCalendarTargets().forEach((target) => {
    target.prevButtonEl.disabled = !canMovePrev;
    target.nextButtonEl.disabled = !canMoveNext;
    target.toggleButtonEl.textContent = toggleLabel;
    target.toggleButtonEl.setAttribute("aria-expanded", String(isCalendarExpanded));
  });
}

function renderCalendar() {
  const entriesByDate = getEntriesByDate();
  const { year, month } = getVisibleMonth();
  const cells = buildMonthCells(year, month, entriesByDate);
  const visibleCells = isCalendarExpanded ? cells : getSelectedWeekCells(cells, year, month);
  const monthLabel = formatMonthLabel(year, month);

  getCalendarTargets().forEach((target) => {
    const monthSection = document.createElement("section");
    monthSection.className = "calendar-month-section";
    target.gridEl.innerHTML = "";
    target.monthLabelEl.textContent = monthLabel;
    renderWeekdayRow(monthSection);
    renderCalendarCells(monthSection, visibleCells);
    target.gridEl.appendChild(monthSection);
  });

  updateCalendarControls();
}

function renderSelectedEntries() {
  if (!selectedDateKey) {
    selectedDateLabelEl.textContent = formatReviewLabel(getTodayKey());
    selectedEntriesEl.innerHTML = `<p class="empty-state">${t("noDisplayEntries")}</p>`;
    return;
  }

  const entries = loadEntries()
    .filter((entry) => entry.dateKey === selectedDateKey)
    .sort((a, b) => a.isoDateTime.localeCompare(b.isoDateTime));

  selectedDateLabelEl.textContent = formatReviewLabel(selectedDateKey);

  if (!entries.length) {
    selectedEntriesEl.innerHTML = `<p class="empty-state">${t("noDayEntries")}</p>`;
    return;
  }

  selectedEntriesEl.innerHTML = entries
    .map((entry) => `
      <article class="entry-card">
        <button class="entry-delete" type="button" data-entry-id="${entry.id}" aria-label="${t("deleteEntry")}">×</button>
        <span class="entry-time">${entry.time}</span>
        <p class="entry-text">${escapeHtml(entry.text)}</p>
      </article>
    `)
    .join("");

  selectedEntriesEl.querySelectorAll(".entry-delete").forEach((button) => {
    button.addEventListener("click", () => {
      deleteEntry(button.dataset.entryId);
    });
  });
}

function getSelectedDateEntries() {
  if (!selectedDateKey) {
    return [];
  }

  return loadEntries()
    .filter((entry) => entry.dateKey === selectedDateKey)
    .sort((a, b) => a.isoDateTime.localeCompare(b.isoDateTime));
}

function renderTextExport() {
  if (!selectedDateKey) {
    textExportLabelEl.textContent = t("textExportEmpty");
    textExportOutputEl.value = "";
    return;
  }

  const entries = getSelectedDateEntries();
  textExportLabelEl.textContent = formatTextExportLabel(selectedDateKey);
  textExportOutputEl.value = entries.map((entry) => `${entry.time} ${entry.text}`).join("\n");
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function saveEntry() {
  const text = activityInputEl.value.trim();
  const activeParts = parseDateTimeInput(manualDateTimeInputEl.value);

  if (!text) {
    showToast(t("savePrompt"), "error");
    activityInputEl.focus();
    return;
  }

  if (!activeParts) {
    showToast(t("datePrompt"), "error");
    manualDateTimeInputEl.focus();
    return;
  }

  const current = getCurrentAvailableMonth();
  if (
    compareYearMonth(activeParts.year, activeParts.month, RELEASE_YEAR, RELEASE_MONTH) < 0 ||
    compareYearMonth(activeParts.year, activeParts.month, current.year, current.month) > 0
  ) {
    showToast(t("monthRangeError"), "error");
    manualDateTimeInputEl.focus();
    return;
  }

  if (activeParts.day > getDaysInMonth(activeParts.year, activeParts.month)) {
    showToast(t("invalidDateError"), "error");
    manualDateTimeInputEl.focus();
    return;
  }

  const activeDate = partsToDate(activeParts);
  const now = currentClockDate || new Date();

  if (activeDate.getTime() > now.getTime()) {
    showToast(t("futureError"), "error");
    manualDateTimeInputEl.focus();
    return;
  }

  const entries = loadEntries();
  const dateKey = formatDateKeyFromParts(activeParts.year, activeParts.month, activeParts.day);
  const time = `${pad(activeParts.hour)}:${pad(activeParts.minute)}`;

  entries.push({
    id: crypto.randomUUID(),
    dateKey,
    time,
    text,
    isoDateTime: activeDate.toISOString(),
  });

  const savedEntry = entries[entries.length - 1];

  saveEntries(entries);

  selectedDateKey = dateKey;
  setVisibleMonthFromDateKey(dateKey);
  activityInputEl.value = "";
  showToastWithKey(
    `save:${savedEntry.id}`,
    t("saveSuccess", {
      date: formatSlashDate(activeParts.year, activeParts.month, activeParts.day),
      time,
    }),
    "success",
  );
  renderCalendar();
  renderSelectedEntries();
  renderTextExport();
}

function useCurrentLocalTime() {
  manualDateTimeInputEl.value = getCurrentLocalInputValue();
  manualDateTimeInputEl.dispatchEvent(new Event("input"));
  showToast(t("useCurrentTimeSuccess"), "success");
}

function setActiveTab(tabName) {
  activeTab = tabName;
  const showRecord = tabName === "record";
  const showReview = tabName === "review";
  const showText = tabName === "text";
  const showSettings = tabName === "settings";
  recordTabButtonEl.classList.toggle("is-active", showRecord);
  reviewTabButtonEl.classList.toggle("is-active", showReview);
  textTabButtonEl.classList.toggle("is-active", showText);
  recordTabButtonEl.setAttribute("aria-selected", String(showRecord));
  reviewTabButtonEl.setAttribute("aria-selected", String(showReview));
  textTabButtonEl.setAttribute("aria-selected", String(showText));
  recordTabEl.hidden = !showRecord;
  reviewTabEl.hidden = !showReview;
  textTabEl.hidden = !showText;
  settingsTabEl.hidden = !showSettings;
  heroSectionEl.hidden = showSettings;
}

function toggleCalendarExpanded() {
  isCalendarExpanded = !isCalendarExpanded;
  renderCalendar();
}

function getMonthIndex(monthKey) {
  const months = getAvailableMonths();
  return months.findIndex(({ year, month }) => formatMonthKey(year, month) === monthKey);
}

function getWeekRowInfo(monthKey = visibleMonthKey) {
  const { year, month } = getVisibleMonth();
  const targetMonthKey = formatMonthKey(year, month);
  const { year: monthYear, month: monthMonth } = monthKey === targetMonthKey ? { year, month } : (() => {
    const [parsedYear, parsedMonth] = monthKey.split("-").map(Number);
    return { year: parsedYear, month: parsedMonth };
  })();
  const cells = buildMonthCells(monthYear, monthMonth, getEntriesByDate());
  const dayCells = cells.filter((cell) => cell.type === "day");
  const fallbackDateKey = dayCells[0]?.dateKey ?? formatDateKeyFromParts(monthYear, monthMonth, 1);
  const targetDateKey = dayCells.some((cell) => cell.dateKey === selectedDateKey)
    ? selectedDateKey
    : fallbackDateKey;
  const activeIndex = cells.findIndex((cell) => cell.type === "day" && cell.dateKey === targetDateKey);
  const rowIndex = activeIndex >= 0 ? Math.floor(activeIndex / 7) : 0;

  return {
    monthKey,
    rowIndex,
    totalRows: Math.ceil(cells.length / 7),
  };
}

function canMoveVisiblePeriod(direction) {
  if (isCalendarExpanded) {
    const months = getAvailableMonths();
    const currentIndex = getMonthIndex(visibleMonthKey);
    const nextIndex = currentIndex + direction;
    return nextIndex >= 0 && nextIndex < months.length;
  }

  const months = getAvailableMonths();
  const currentIndex = getMonthIndex(visibleMonthKey);
  const weekInfo = getWeekRowInfo();

  if (direction < 0) {
    return weekInfo.rowIndex > 0 || currentIndex > 0;
  }

  return weekInfo.rowIndex < weekInfo.totalRows - 1 || currentIndex < months.length - 1;
}

function moveVisibleMonth(direction) {
  const months = getAvailableMonths();
  const currentIndex = getMonthIndex(visibleMonthKey);
  const nextIndex = currentIndex + direction;

  if (nextIndex < 0 || nextIndex >= months.length) {
    return;
  }

  const nextMonth = months[nextIndex];
  visibleMonthKey = formatMonthKey(nextMonth.year, nextMonth.month);
  renderCalendar();
}

function moveVisibleWeek(direction) {
  const months = getAvailableMonths();
  const currentIndex = getMonthIndex(visibleMonthKey);
  const weekInfo = getWeekRowInfo();
  let targetMonthIndex = currentIndex;
  let targetRowIndex = weekInfo.rowIndex + direction;

  if (targetRowIndex < 0) {
    if (currentIndex <= 0) {
      return;
    }

    targetMonthIndex = currentIndex - 1;
    const prevMonthKey = formatMonthKey(months[targetMonthIndex].year, months[targetMonthIndex].month);
    const prevWeekInfo = getWeekRowInfo(prevMonthKey);
    targetRowIndex = prevWeekInfo.totalRows - 1;
  } else if (targetRowIndex >= weekInfo.totalRows) {
    if (currentIndex >= months.length - 1) {
      return;
    }

    targetMonthIndex = currentIndex + 1;
    targetRowIndex = 0;
  }

  const targetMonthKey = formatMonthKey(months[targetMonthIndex].year, months[targetMonthIndex].month);
  const [targetYear, targetMonth] = targetMonthKey.split("-").map(Number);
  const targetCells = buildMonthCells(targetYear, targetMonth, getEntriesByDate());
  const targetRowCells = targetCells.slice(targetRowIndex * 7, targetRowIndex * 7 + 7);
  const targetDayCell = targetRowCells.find((cell) => cell.type === "day");

  if (!targetDayCell) {
    return;
  }

  visibleMonthKey = targetMonthKey;
  selectedDateKey = targetDayCell.dateKey;
  renderCalendar();
  renderSelectedEntries();
  renderTextExport();
}

function moveVisiblePeriod(direction) {
  if (isCalendarExpanded) {
    moveVisibleMonth(direction);
    return;
  }

  moveVisibleWeek(direction);
}

function setupSwipeTabs() {
  const tabs = ["record", "review", "text", "settings"];
  let startX = 0;
  let startY = 0;
  let tracking = false;

  tabPanelEl.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    tracking = true;
  }, { passive: true });

  tabPanelEl.addEventListener("touchend", (event) => {
    if (!tracking || event.changedTouches.length !== 1) {
      tracking = false;
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    tracking = false;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < 0) {
      return;
    }

    if (deltaX < 0 && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else if (deltaX > 0 && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  }, { passive: true });
}

function handleActivityKeydown(event) {
  if (event.key !== "Enter" || event.isComposing) {
    return;
  }

  event.preventDefault();
  saveEntry();
}

async function copyTextExport() {
  const text = textExportOutputEl.value.trim();

  if (!text) {
    showToast(t("noCopyText"), "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast(t("copiedText"), "success");
  } catch (error) {
    console.error("Failed to copy text", error);
    textExportOutputEl.focus();
    textExportOutputEl.select();
    showToast(t("copyFailed"), "error");
  }
}

function setLanguage(language) {
  if (language !== "ja" && language !== "en") {
    return;
  }

  currentLanguage = language;
  saveLanguage(language);
  renderStaticText();
  renderCalendar();
  renderSelectedEntries();
  renderTextExport();
  showToast(t("languageChanged"), "success");
}

saveButtonEl.addEventListener("click", saveEntry);
useCurrentTimeButtonEl.addEventListener("click", useCurrentLocalTime);
recordTabButtonEl.addEventListener("click", () => setActiveTab("record"));
reviewTabButtonEl.addEventListener("click", () => setActiveTab("review"));
textTabButtonEl.addEventListener("click", () => setActiveTab("text"));
settingsIconButtonEl.addEventListener("click", () => setActiveTab("settings"));
toggleCalendarButtonEl.addEventListener("click", toggleCalendarExpanded);
textToggleCalendarButtonEl.addEventListener("click", toggleCalendarExpanded);
prevMonthButtonEl.addEventListener("click", () => moveVisiblePeriod(-1));
nextMonthButtonEl.addEventListener("click", () => moveVisiblePeriod(1));
textPrevMonthButtonEl.addEventListener("click", () => moveVisiblePeriod(-1));
textNextMonthButtonEl.addEventListener("click", () => moveVisiblePeriod(1));
activityInputEl.addEventListener("keydown", handleActivityKeydown);
copyTextButtonEl.addEventListener("click", copyTextExport);
languageJaButtonEl.addEventListener("click", () => setLanguage("ja"));
languageEnButtonEl.addEventListener("click", () => setLanguage("en"));

syncCurrentDateTime();
renderStaticText();
manualDateTimeInputEl.value = getCurrentLocalInputValue();
selectedDateKey = getTodayKey();
setVisibleMonthFromDateKey(selectedDateKey);
window.setInterval(tickCurrentDateTime, 1000);
renderCalendar();
renderSelectedEntries();
renderTextExport();
setActiveTab("record");
setupSwipeTabs();
