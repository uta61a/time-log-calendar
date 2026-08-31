const STORAGE_KEY = "time-log-calendar-entries";
const LANGUAGE_STORAGE_KEY = "time-log-calendar-language";
const MEMO_STORAGE_KEY = "time-log-calendar-memos";

const currentHourMinuteEl = document.getElementById("currentHourMinute");
const currentSecondsEl = document.getElementById("currentSeconds");
const currentMetaEl = document.getElementById("currentMeta");
const activityInputEl = document.getElementById("activityInput");
const currentActivityInputEl = document.getElementById("currentActivityInput");
const saveButtonEl = document.getElementById("saveButton");
const currentSaveButtonEl = document.getElementById("currentSaveButton");
const recordHeadingEl = document.getElementById("recordHeading");
const pastRecordHeadingEl = document.getElementById("pastRecordHeading");
const dateTimeLabelEl = document.getElementById("dateTimeLabel");
const activityLabelEl = document.getElementById("activityLabel");
const currentActivityLabelEl = document.getElementById("currentActivityLabel");
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
const memoDateTimeInputEl = document.getElementById("memoDateTimeInput");
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
const exportDayButtonEl = document.getElementById("exportDayButton");
const exportAllButtonEl = document.getElementById("exportAllButton");
const memoDateTimeLabelEl = document.getElementById("memoDateTimeLabel");
const memoTextLabelEl = document.getElementById("memoTextLabel");
const memoHeadingEl = document.getElementById("memoHeading");
const memoInputEl = document.getElementById("memoInput");
const saveMemoButtonEl = document.getElementById("saveMemoButton");
const settingsHeadingEl = document.getElementById("settingsHeading");
const languageLabelEl = document.getElementById("languageLabel");
const languageJaButtonEl = document.getElementById("languageJaButton");
const languageEnButtonEl = document.getElementById("languageEnButton");

let selectedDateKey = null;
let textExportMode = "all";
let currentClockDate = null;
let secondsSinceClockSync = 0;
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
    tabList: "記録タブ",
    recordHeading: "今の記録",
    pastRecordHeading: "過去の記録",
    dateTimeLabel: "日時",
    activityLabel: "今していること",
    pastActivityLabel: "過去していたこと",
    save: "記録する",
    openCalendar: "カレンダーを開く",
    collapseCalendar: "折りたたむ",
    deleteEntry: "記録を削除",
    deleteConfirm: "本当に削除しますか？",
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
    memoHeading: "メモ",
    memoDateTimeLabel: "日付",
    memoTextLabel: "メモしたいこと",
    saveMemo: "メモを保存",
    memoSaved: "メモを保存しました。",
    memoEmpty: "この日のメモはまだありません。",
    memoFutureError: "未来の日付にはメモを保存できません。",
    memoPrompt: "メモを入力してください。",
    deleteMemo: "メモを削除",
    deleteSuccess: "記録を削除しました。",
    savePrompt: "記録内容を入力してください。",
    datePrompt: "日時を入力してください。",
    monthRangeError: "記録できるのは2026年8月から現在の月までです。",
    invalidDateError: "その月には存在しない日付です。",
    futureError: "未来の予定は記録できません。過去または現在の時刻を選んでください。",
    saveSuccess: "{date} {time} の記録を保存しました。",
    reviewLabel: "{month}/{day}の記録",
    textExportLabel: "{month}/{day}をテキスト化",
    textExportAllLabel: "全履歴をテキスト化",
    textExportEmpty: "テキスト化",
    exportDay: "この日",
    exportAll: "全履歴",
    exportRangeLabel: "テキスト化範囲",
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
    tabList: "Navigation tabs",
    recordHeading: "Current Log",
    pastRecordHeading: "Past Log",
    dateTimeLabel: "Date and time",
    activityLabel: "What are you doing?",
    pastActivityLabel: "What were you doing?",
    save: "Save",
    openCalendar: "Open calendar",
    collapseCalendar: "Collapse",
    deleteEntry: "Delete entry",
    deleteConfirm: "Are you sure you want to delete this entry?",
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
    memoHeading: "Memo",
    memoDateTimeLabel: "Date",
    memoTextLabel: "Memo",
    saveMemo: "Save memo",
    memoSaved: "Memo saved.",
    memoEmpty: "There is no memo for this day yet.",
    memoFutureError: "Memo cannot be saved for a future date.",
    memoPrompt: "Please enter a memo.",
    deleteMemo: "Delete memo",
    deleteSuccess: "Entry deleted.",
    savePrompt: "Please enter what you are doing.",
    datePrompt: "Please enter a date and time.",
    monthRangeError: "You can log only from August 2026 through the current month.",
    invalidDateError: "That date does not exist in this month.",
    futureError: "Future plans cannot be logged. Choose a past or current time.",
    saveSuccess: "Saved entry for {date} {time}.",
    reviewLabel: "{month}/{day} log",
    textExportLabel: "Export {month}/{day}",
    textExportAllLabel: "Export all history",
    textExportEmpty: "Export",
    exportDay: "This day",
    exportAll: "All history",
    exportRangeLabel: "Export range",
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

function normalizeMemoEntry(dateKey, memo, index = 0) {
  if (typeof memo === "string") {
    return {
      id: `legacy-${dateKey}-${index}`,
      text: memo,
      createdAt: `${dateKey}T00:00:00.000Z`,
    };
  }

  return {
    id: memo.id || `legacy-${dateKey}-${index}`,
    text: String(memo.text || ""),
    createdAt: memo.createdAt || `${dateKey}T00:00:00.000Z`,
  };
}

function normalizeMemos(rawMemos) {
  return Object.entries(rawMemos || {}).reduce((normalized, [dateKey, value]) => {
    const memoEntries = Array.isArray(value)
      ? value.map((memo, index) => normalizeMemoEntry(dateKey, memo, index))
      : [normalizeMemoEntry(dateKey, value)];
    const validMemoEntries = memoEntries.filter((memo) => memo.text.trim());

    if (validMemoEntries.length) {
      normalized[dateKey] = validMemoEntries;
    }

    return normalized;
  }, {});
}

function loadMemos() {
  try {
    const raw = localStorage.getItem(MEMO_STORAGE_KEY);
    return raw ? normalizeMemos(JSON.parse(raw)) : {};
  } catch (error) {
    console.error("Failed to read memo storage", error);
    return {};
  }
}

function saveMemos(memos) {
  localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(memos));
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

function parseDateInput(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if ([year, month, day].some(Number.isNaN)) {
    return null;
  }

  return { year, month, day };
}

function partsToDate(parts) {
  return new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, 0);
}

function dateToParts(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
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

function getCurrentLocalDateInputValue() {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
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

function formatExportDateHeader(dateKey) {
  const [, month, day] = dateKey.split("-");
  return `${Number(month)}/${Number(day)}`;
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

function isFutureDateKey(dateKey) {
  return dateKey > getTodayKey();
}

function validateMemoDateParts(activeParts) {
  if (!activeParts) {
    showToast(t("datePrompt"), "error");
    memoDateTimeInputEl.focus();
    return false;
  }

  const current = getCurrentAvailableMonth();
  if (
    compareYearMonth(activeParts.year, activeParts.month, RELEASE_YEAR, RELEASE_MONTH) < 0 ||
    compareYearMonth(activeParts.year, activeParts.month, current.year, current.month) > 0
  ) {
    showToast(t("monthRangeError"), "error");
    memoDateTimeInputEl.focus();
    return false;
  }

  if (activeParts.day > getDaysInMonth(activeParts.year, activeParts.month)) {
    showToast(t("invalidDateError"), "error");
    memoDateTimeInputEl.focus();
    return false;
  }

  const dateKey = formatDateKeyFromParts(activeParts.year, activeParts.month, activeParts.day);
  if (isFutureDateKey(dateKey)) {
    showToast(t("memoFutureError"), "error");
    memoDateTimeInputEl.focus();
    return false;
  }

  return true;
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
  pastRecordHeadingEl.textContent = t("pastRecordHeading");
  dateTimeLabelEl.textContent = t("dateTimeLabel");
  activityLabelEl.textContent = t("pastActivityLabel");
  currentActivityLabelEl.textContent = t("activityLabel");
  saveButtonEl.textContent = t("save");
  currentSaveButtonEl.textContent = t("save");
  recordTabButtonEl.textContent = t("recordTab");
  reviewTabButtonEl.textContent = t("reviewTab");
  textTabButtonEl.textContent = t("textTab");
  settingsHeadingEl.textContent = t("settingsHeading");
  languageLabelEl.textContent = t("languageLabel");
  copyTextButtonEl.textContent = t("copy");
  exportDayButtonEl.textContent = t("exportDay");
  exportAllButtonEl.textContent = t("exportAll");
  exportDayButtonEl.classList.toggle("is-active", textExportMode === "day");
  exportAllButtonEl.classList.toggle("is-active", textExportMode === "all");
  exportDayButtonEl.parentElement.setAttribute("aria-label", t("exportRangeLabel"));
  memoHeadingEl.textContent = t("memoHeading");
  memoDateTimeLabelEl.textContent = t("memoDateTimeLabel");
  memoTextLabelEl.textContent = t("memoTextLabel");
  saveMemoButtonEl.textContent = t("saveMemo");
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

function deleteMemo(memoId) {
  const memos = loadMemos();

  Object.keys(memos).forEach((dateKey) => {
    memos[dateKey] = memos[dateKey].filter((memo) => memo.id !== memoId);
    if (!memos[dateKey].length) {
      delete memos[dateKey];
    }
  });

  saveMemos(memos);
  renderSelectedEntries();
  renderTextExport();
  if (selectedDateKey) {
    renderMemo();
  }
  showToastWithKey(`memo-delete:${memoId}`, t("deleteSuccess"), "success");
}

function renderCurrentDateTime(date) {
  const clock = formatClockParts(date);
  currentHourMinuteEl.textContent = clock.hourMinute;
  currentSecondsEl.textContent = clock.seconds;
  currentMetaEl.textContent = `${clock.year} ${clock.monthDay} ${getLocationLabel()}`;
}

function refreshCurrentDateDependentViews() {
  renderCalendar();
  if (!selectedDateKey) {
    selectedDateKey = getTodayKey();
  }
  renderSelectedEntries();
  renderTextExport();
}

function syncCurrentDateTime(options = {}) {
  const { refreshViews = false } = options;
  const previousTodayKey = currentClockDate ? getTodayKey() : "";
  currentClockDate = new Date();
  secondsSinceClockSync = 0;
  renderCurrentDateTime(currentClockDate);
  if (refreshViews || previousTodayKey !== getTodayKey()) {
    refreshCurrentDateDependentViews();
    renderMemo();
  }
}

function tickCurrentDateTime() {
  if (!currentClockDate) {
    syncCurrentDateTime({ refreshViews: true });
    return;
  }

  currentClockDate = new Date(currentClockDate.getTime() + 1000);
  secondsSinceClockSync += 1;

  if (secondsSinceClockSync >= 5) {
    syncCurrentDateTime();
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
      renderMemo();
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
  const memoEntries = selectedDateKey ? (loadMemos()[selectedDateKey] || []) : [];
  const memoHtml = memoEntries.length
    ? memoEntries
      .map((memo) => `
        <article class="memo-card">
          <button class="entry-delete" type="button" data-memo-id="${memo.id}" aria-label="${t("deleteMemo")}">×</button>
          <span class="memo-card-label">${t("memoHeading")}</span>
          <p class="entry-text">${escapeHtml(memo.text)}</p>
        </article>
      `)
      .join("")
    : `<p class="empty-state memo-empty">${t("memoEmpty")}</p>`;

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
    selectedEntriesEl.innerHTML = `<p class="empty-state">${t("noDayEntries")}</p>${memoHtml}`;
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
    .join("") + memoHtml;

  selectedEntriesEl.querySelectorAll(".entry-delete").forEach((button) => {
    button.addEventListener("click", () => {
      if (window.confirm(t("deleteConfirm"))) {
        if (button.dataset.entryId) {
          deleteEntry(button.dataset.entryId);
          return;
        }

        deleteMemo(button.dataset.memoId);
      }
    });
  });
}

function renderMemo() {
  const activeParts = parseDateInput(memoDateTimeInputEl.value);
  const dateKey = activeParts
    ? formatDateKeyFromParts(activeParts.year, activeParts.month, activeParts.day)
    : getTodayKey();
  const isFuture = isFutureDateKey(dateKey);
  memoInputEl.disabled = isFuture;
  saveMemoButtonEl.disabled = isFuture;
}

function getSelectedDateEntries() {
  if (!selectedDateKey) {
    return [];
  }

  return loadEntries()
    .filter((entry) => entry.dateKey === selectedDateKey)
    .sort((a, b) => a.isoDateTime.localeCompare(b.isoDateTime));
}

function getSelectedMemoMap() {
  if (!selectedDateKey) {
    return {};
  }

  const memo = loadMemos()[selectedDateKey];
  return memo ? { [selectedDateKey]: memo } : {};
}

function formatEntriesAsText(entries, memos = {}) {
  const grouped = entries.reduce((map, entry) => {
    if (!map.has(entry.dateKey)) {
      map.set(entry.dateKey, []);
    }
    map.get(entry.dateKey).push(entry);
    return map;
  }, new Map());

  Object.keys(memos).forEach((dateKey) => {
    if (memos[dateKey]?.length && !grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
  });

  return Array.from(grouped.entries())
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([dateKey, dayEntries]) => {
      const lines = dayEntries
        .sort((a, b) => a.isoDateTime.localeCompare(b.isoDateTime))
        .map((entry) => `${entry.time} ${entry.text}`);
      const memoLines = (memos[dateKey] || [])
        .map((memo) => memo.text.trim())
        .filter(Boolean);
      return [formatExportDateHeader(dateKey), ...lines, ...memoLines].join("\n");
    })
    .join("\n\n");
}

function renderTextExport() {
  exportDayButtonEl.classList.toggle("is-active", textExportMode === "day");
  exportAllButtonEl.classList.toggle("is-active", textExportMode === "all");

  if (textExportMode === "all") {
    const entries = loadEntries();
    textExportLabelEl.textContent = t("textExportAllLabel");
    textExportOutputEl.value = formatEntriesAsText(entries, loadMemos());
    return;
  }

  if (!selectedDateKey) {
    textExportLabelEl.textContent = t("textExportEmpty");
    textExportOutputEl.value = "";
    return;
  }

  const entries = getSelectedDateEntries();
  textExportLabelEl.textContent = formatTextExportLabel(selectedDateKey);
  textExportOutputEl.value = formatEntriesAsText(entries, getSelectedMemoMap());
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validateEntryDateParts(activeParts) {
  if (!activeParts) {
    showToast(t("datePrompt"), "error");
    manualDateTimeInputEl.focus();
    return false;
  }

  const current = getCurrentAvailableMonth();
  if (
    compareYearMonth(activeParts.year, activeParts.month, RELEASE_YEAR, RELEASE_MONTH) < 0 ||
    compareYearMonth(activeParts.year, activeParts.month, current.year, current.month) > 0
  ) {
    showToast(t("monthRangeError"), "error");
    manualDateTimeInputEl.focus();
    return false;
  }

  if (activeParts.day > getDaysInMonth(activeParts.year, activeParts.month)) {
    showToast(t("invalidDateError"), "error");
    manualDateTimeInputEl.focus();
    return false;
  }

  const activeDate = partsToDate(activeParts);
  const now = currentClockDate || new Date();

  if (activeDate.getTime() > now.getTime()) {
    showToast(t("futureError"), "error");
    manualDateTimeInputEl.focus();
    return false;
  }

  return true;
}

function addEntry(text, activeParts) {
  const entries = loadEntries();
  const dateKey = formatDateKeyFromParts(activeParts.year, activeParts.month, activeParts.day);
  const time = `${pad(activeParts.hour)}:${pad(activeParts.minute)}`;
  const activeDate = partsToDate(activeParts);

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
  renderMemo();
  renderTextExport();
}

function saveCurrentEntry() {
  const text = currentActivityInputEl.value.trim();

  if (!text) {
    showToast(t("savePrompt"), "error");
    currentActivityInputEl.focus();
    return;
  }

  addEntry(text, dateToParts(currentClockDate || new Date()));
  currentActivityInputEl.value = "";
}

function saveEntry() {
  const text = activityInputEl.value.trim();
  const activeParts = parseDateTimeInput(manualDateTimeInputEl.value);

  if (!text) {
    showToast(t("savePrompt"), "error");
    activityInputEl.focus();
    return;
  }

  if (!validateEntryDateParts(activeParts)) {
    return;
  }

  addEntry(text, activeParts);
  activityInputEl.value = "";
}

function saveMemo() {
  const activeParts = parseDateInput(memoDateTimeInputEl.value);

  if (!validateMemoDateParts(activeParts)) {
    return;
  }

  const value = memoInputEl.value.trim();
  if (!value) {
    showToast(t("memoPrompt"), "error");
    memoInputEl.focus();
    return;
  }

  const memos = loadMemos();
  const dateKey = formatDateKeyFromParts(activeParts.year, activeParts.month, activeParts.day);

  if (!memos[dateKey]) {
    memos[dateKey] = [];
  }

  memos[dateKey].push({
    id: crypto.randomUUID(),
    text: value,
    createdAt: new Date().toISOString(),
  });

  saveMemos(memos);
  selectedDateKey = dateKey;
  setVisibleMonthFromDateKey(dateKey);
  memoInputEl.value = "";
  renderCalendar();
  renderSelectedEntries();
  renderTextExport();
  showToast(t("memoSaved"), "success");
}

function setActiveTab(tabName) {
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
  renderMemo();
  renderTextExport();
}

function moveVisiblePeriod(direction) {
  if (isCalendarExpanded) {
    moveVisibleMonth(direction);
    return;
  }

  moveVisibleWeek(direction);
}

function handleActivityKeydown(event) {
  if (event.key !== "Enter" || event.isComposing) {
    return;
  }

  event.preventDefault();
  if (event.currentTarget === currentActivityInputEl) {
    saveCurrentEntry();
    return;
  }

  if (event.currentTarget === memoInputEl) {
    saveMemo();
    return;
  }

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
  renderMemo();
  renderTextExport();
  showToast(t("languageChanged"), "success");
}

function setTextExportMode(mode) {
  textExportMode = mode;
  renderStaticText();
  renderTextExport();
}

currentSaveButtonEl.addEventListener("click", saveCurrentEntry);
saveButtonEl.addEventListener("click", saveEntry);
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
currentActivityInputEl.addEventListener("keydown", handleActivityKeydown);
memoInputEl.addEventListener("keydown", handleActivityKeydown);
memoDateTimeInputEl.addEventListener("input", renderMemo);
copyTextButtonEl.addEventListener("click", copyTextExport);
exportDayButtonEl.addEventListener("click", () => setTextExportMode("day"));
exportAllButtonEl.addEventListener("click", () => setTextExportMode("all"));
saveMemoButtonEl.addEventListener("click", saveMemo);
languageJaButtonEl.addEventListener("click", () => setLanguage("ja"));
languageEnButtonEl.addEventListener("click", () => setLanguage("en"));

syncCurrentDateTime();
renderStaticText();
manualDateTimeInputEl.value = getCurrentLocalInputValue();
memoDateTimeInputEl.value = getCurrentLocalDateInputValue();
selectedDateKey = getTodayKey();
setVisibleMonthFromDateKey(selectedDateKey);
window.setInterval(tickCurrentDateTime, 1000);
renderCalendar();
renderSelectedEntries();
renderMemo();
renderTextExport();
setActiveTab("record");
