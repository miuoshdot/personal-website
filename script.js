const PAGE_TITLE = "Hi, I'm Miłosz Miśkiewicz";

const notes = [...document.querySelectorAll("#noteContent > .note-section")].map(
  (section) => ({
    id: section.id,
    icon: section.dataset.noteIcon,
    title: section.dataset.noteTitle,
    group: section.dataset.noteGroup,
  }),
);

const app = document.querySelector(".notes-app");
const noteList = document.querySelector("#noteList");
const noteContent = document.querySelector("#noteContent");
const noteDate = document.querySelector("#noteDate");
const noteView = document.querySelector("#noteView");
const workspace = document.querySelector(".workspace");
const galleryView = document.querySelector("#galleryView");
const galleryGrid = document.querySelector("#galleryGrid");
const galleryDate = document.querySelector("#galleryDate");
const galleryEmpty = document.querySelector("#galleryEmpty");
const searchInput = document.querySelector("#searchInput");
const searchShortcut = document.querySelector("#searchShortcut");
const sidebarToggle = document.querySelector("#sidebarToggle");
const sidebar = document.querySelector("#sidebar");
const listViewButton = document.querySelector("#listViewButton");
const closeWindowButton = document.querySelector("#closeWindowButton");
const minimizeWindowButton = document.querySelector("#minimizeWindowButton");
const closeDialog = document.querySelector("#closeDialog");
const fullscreenButton = document.querySelector("#fullscreenButton");
const themeToggle = document.querySelector("#themeToggle");
const shareButton = document.querySelector("#shareButton");
const gridButton = document.querySelector("#gridButton");
const trashButton = document.querySelector("#trashButton");
const newNoteButton = document.querySelector("#newNoteButton");
const toast = document.querySelector("#toast");
const copyrightYear = document.querySelector("#copyrightYear");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const overlaySidebarMedia = window.matchMedia(
  "(max-width: 760px), (max-width: 1100px) and (pointer: coarse)",
);

function getNoteIdFromPath() {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const routeId = pathSegments.at(-1);

  return notes.some((note) => note.id === routeId)
    ? routeId
    : notes[0].id;
}

function getNotePath(noteId) {
  return `/${noteId}`;
}

let activeNoteId = getNoteIdFromPath();
let toastTimer;
let scrollFrame;
let searchMatches = [];
let activeSearchMatch = -1;
let isGalleryView = false;
let sidebarSwipe = null;

const SIDEBAR_SWIPE_EDGE = 32;
const SIDEBAR_SWIPE_DISTANCE = 64;
const SIDEBAR_SWIPE_AXIS_THRESHOLD = 10;

function setSearchShortcutLabel() {
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  const userAgent = navigator.userAgent || "";
  const isMobileApple = /iPhone|iPad|iPod|Mobile/i.test(userAgent);
  const isMac = /Mac/i.test(platform) && !isMobileApple;
  const isWindows = /Win/i.test(platform) || /Windows/i.test(userAgent);

  if (isMac) {
    searchShortcut.textContent = "⌘ K";
    searchShortcut.hidden = false;
  } else if (isWindows) {
    searchShortcut.textContent = "Ctrl K";
    searchShortcut.hidden = false;
  }
}

function renderList() {
  noteList.innerHTML = "";
  const groups = [...new Set(notes.map((note) => note.group))];

  groups.forEach((groupName) => {
    const group = document.createElement("section");
    group.className = "note-group";
    const pinIcon =
      groupName === "Pinned"
        ? `<svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M9 3h6l-1 5 3 3v2H7v-2l3-3-1-5Z"></path>
            <path d="M12 13v8"></path>
          </svg>`
        : "";
    group.innerHTML = `<h2 class="note-group__title">${pinIcon}${groupName}</h2>`;

    notes
      .filter((note) => note.group === groupName)
      .forEach((note) => {
        const item = document.createElement("div");
        item.className = `note-list__item${note.id === activeNoteId ? " is-active" : ""}`;
        const preview =
          document
            .getElementById(note.id)
            ?.querySelector(".lead, p")
            ?.textContent.trim() || "";

        item.innerHTML = `
          <button
            class="note-list__button"
            type="button"
            data-note-id="${note.id}"
            aria-current="${note.id === activeNoteId ? "page" : "false"}"
          >
            <span class="note-list__icon" aria-hidden="true">${note.icon}</span>
            <span class="note-list__title">${note.title}</span>
            <span class="note-list__preview">${preview}</span>
          </button>
        `;
        group.append(item);
      });

    noteList.append(group);
  });
}

function clearSearchHighlights() {
  noteView.querySelectorAll("mark.search-match").forEach((mark) => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });
  noteView.normalize();
  searchMatches = [];
  activeSearchMatch = -1;
}

function scrollToSearchMatch(index, behavior = "smooth") {
  if (searchMatches.length === 0) return;

  searchMatches.forEach((match) => match.classList.remove("is-current"));
  activeSearchMatch =
    (index + searchMatches.length) % searchMatches.length;

  const match = searchMatches[activeSearchMatch];
  match.classList.add("is-current");
  match.scrollIntoView({
    behavior,
    block: "center",
    inline: "nearest",
  });
}

function searchDocument(query) {
  clearSearchHighlights();
  const normalizedQuery = query.trim().toLocaleLowerCase("en-US");
  if (!normalizedQuery) return;

  const textNodes = [];
  const walker = document.createTreeWalker(
    noteView,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return node.textContent.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  const ranges = [];
  textNodes.forEach((node) => {
    const normalizedText = node.textContent.toLocaleLowerCase("en-US");
    let startIndex = 0;

    while (startIndex < normalizedText.length) {
      const matchIndex = normalizedText.indexOf(normalizedQuery, startIndex);
      if (matchIndex === -1) break;
      ranges.push({
        node,
        start: matchIndex,
        end: matchIndex + normalizedQuery.length,
      });
      startIndex = matchIndex + normalizedQuery.length;
    }
  });

  ranges.reverse().forEach(({ node, start, end }) => {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    const mark = document.createElement("mark");
    mark.className = "search-match";
    range.surroundContents(mark);
  });

  searchMatches = [...noteView.querySelectorAll("mark.search-match")];
  if (searchMatches.length > 0) {
    scrollToSearchMatch(0);
  }
}

function formatSystemDate(date, includeTime = true) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  if (includeTime) {
    options.hour = "numeric";
    options.minute = "2-digit";
    options.hour12 = true;
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function updateCurrentDate() {
  const now = new Date();
  const currentDate = formatSystemDate(now);
  noteDate.textContent = currentDate;
  galleryDate.textContent = currentDate;
  copyrightYear.textContent = String(now.getFullYear());
}

function renderDocument() {
  updateCurrentDate();

  notes.forEach((note) => {
    const section = document.getElementById(note.id);
    if (!section) return;

    const heading = section.querySelector(".note-section__title");
    if (heading && !heading.querySelector(".note-title-icon")) {
      const icon = document.createElement("span");
      icon.className = "note-title-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = note.icon;
      heading.prepend(icon);
    }

    section.setAttribute("aria-labelledby", `${note.id}-title`);
  });
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  notes.forEach((note) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.dataset.galleryNoteId = note.id;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${note.title}`);
    card.setAttribute(
      "aria-current",
      note.id === activeNoteId ? "page" : "false",
    );

    const paper = document.createElement("div");
    paper.className = "gallery-card__paper";
    const preview = document.createElement("div");
    preview.className = "gallery-card__preview";
    const sourceSection = document.getElementById(note.id);
    preview.innerHTML = sourceSection?.innerHTML || "";

    const previewH1 = preview.querySelector("h1.note-section__title");
    if (previewH1) {
      const previewTitle = document.createElement("div");
      previewTitle.className = previewH1.className;
      previewTitle.innerHTML = previewH1.innerHTML;
      previewH1.replaceWith(previewTitle);
    }

    preview.querySelectorAll("a").forEach((link) => {
      const text = document.createElement("span");
      text.className = "gallery-card__link";
      text.textContent = link.textContent;
      link.replaceWith(text);
    });

    paper.append(preview);
    card.append(paper);

    const caption = document.createElement("div");
    caption.className = "gallery-card__caption";
    caption.innerHTML = `
      <h2 class="gallery-card__title">${note.title}</h2>
    `;
    card.append(caption);
    galleryGrid.append(card);
  });
}

function filterGallery(query) {
  const normalizedQuery = query.trim().toLocaleLowerCase("en-US");
  let visibleCards = 0;

  document.querySelectorAll(".gallery-card").forEach((card) => {
    const note = notes.find(
      (item) => item.id === card.dataset.galleryNoteId,
    );
    const isMatch = note.title
      .toLocaleLowerCase("en-US")
      .includes(normalizedQuery);
    card.hidden = !isMatch;
    if (isMatch) visibleCards += 1;
  });

  galleryEmpty.hidden = visibleCards > 0;
}

function setView(view, restorePosition = true) {
  const nextIsGalleryView = view === "gallery";
  const viewChanged = nextIsGalleryView !== isGalleryView;

  if (viewChanged) {
    searchInput.value = "";
    clearSearchHighlights();
    filterGallery("");
  }

  isGalleryView = nextIsGalleryView;
  workspace.hidden = isGalleryView;
  galleryView.hidden = !isGalleryView;
  app.classList.toggle("gallery-mode", isGalleryView);
  listViewButton.setAttribute("aria-pressed", String(!isGalleryView));
  gridButton.setAttribute("aria-pressed", String(isGalleryView));
  gridButton.setAttribute(
    "aria-label",
    isGalleryView ? "Show notes view" : "Show gallery view",
  );
  gridButton.title = isGalleryView ? "Notes view" : "Gallery view";

  if (isGalleryView) {
    renderGallery();
    filterGallery("");
    galleryView.scrollTop = 0;
  } else if (restorePosition) {
    requestAnimationFrame(() => {
      scrollToNote(activeNoteId, "auto", "none");
    });
  }
}

function openGalleryNote(noteId) {
  setView("document", false);
  setSidebar(false);
  requestAnimationFrame(() => {
    scrollToNote(noteId, "auto", "push");
  });
}

function setActiveNote(noteId, historyMode = "none") {
  const note = notes.find((item) => item.id === noteId) || notes[0];
  activeNoteId = note.id;

  document.querySelectorAll(".note-list__button").forEach((button) => {
    const isActive = button.dataset.noteId === activeNoteId;
    button.setAttribute("aria-current", isActive ? "page" : "false");
    button.closest(".note-list__item")?.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.setAttribute(
      "aria-current",
      card.dataset.galleryNoteId === activeNoteId ? "page" : "false",
    );
  });

  document.title = PAGE_TITLE;

  const notePath = getNotePath(note.id);

  if (window.location.pathname !== notePath) {
    if (historyMode === "push") {
      history.pushState(null, "", notePath);
    }
    if (historyMode === "replace") {
      history.replaceState(null, "", notePath);
    }
  }
}

function scrollToNote(noteId, behavior = "smooth", historyMode = "push") {
  const note = notes.find((item) => item.id === noteId) || notes[0];
  const section = document.querySelector(`#${note.id}`);
  if (!section) return;

  setActiveNote(note.id, historyMode);
  const containerTop = noteView.getBoundingClientRect().top;
  const sectionTop = section.getBoundingClientRect().top;
  const targetTop =
    note.id === notes[0].id
      ? 0
      : noteView.scrollTop + sectionTop - containerTop - 16;

  noteView.scrollTo({ top: targetTop, behavior });

  if (overlaySidebarMedia.matches) {
    setSidebar(false);
  }
}

function updateActiveNoteFromScroll() {
  const sections = [...document.querySelectorAll(".note-section")];
  if (sections.length === 0) return;

  const readingOffset = Math.min(140, noteView.clientHeight * 0.24);
  const maxScroll = Math.max(
    0,
    noteView.scrollHeight - noteView.clientHeight,
  );
  const finalSectionRange = Math.min(
    72,
    Math.max(44, noteView.clientHeight * 0.075),
  );
  const minimumSectionRange = Math.min(
    180,
    Math.max(120, noteView.clientHeight * 0.18),
  );
  const activationPoints = sections.map((section) =>
    Math.min(maxScroll, Math.max(0, section.offsetTop - readingOffset)),
  );
  const lastIndex = activationPoints.length - 1;

  activationPoints[lastIndex] = Math.min(
    activationPoints[lastIndex],
    Math.max(0, maxScroll - finalSectionRange),
  );

  for (let index = lastIndex - 1; index > 0; index -= 1) {
    activationPoints[index] = Math.min(
      activationPoints[index],
      Math.max(0, activationPoints[index + 1] - minimumSectionRange),
    );
  }

  let currentNoteId = sections[0].dataset.noteId;
  activationPoints.forEach((activationPoint, index) => {
    if (noteView.scrollTop >= activationPoint) {
      currentNoteId = sections[index].dataset.noteId;
    }
  });

  if (currentNoteId !== activeNoteId) {
    setActiveNote(currentNoteId, "replace");
  }
}

function setSidebar(isVisible) {
  app.classList.toggle("sidebar-hidden", !isVisible);
  sidebarToggle.setAttribute("aria-expanded", String(isVisible));
  sidebarToggle.setAttribute(
    "aria-label",
    isVisible ? "Hide sidebar" : "Show sidebar",
  );
}

function resetSidebarSwipe() {
  sidebarSwipe = null;
}

function beginSidebarSwipe(event) {
  if (
    !overlaySidebarMedia.matches ||
    isGalleryView ||
    event.touches.length !== 1
  ) {
    resetSidebarSwipe();
    return;
  }

  const touch = event.touches[0];
  const sidebarIsHidden = app.classList.contains("sidebar-hidden");
  const sidebarBounds = sidebar.getBoundingClientRect();
  const startsAtOpeningEdge =
    sidebarIsHidden && touch.clientX <= SIDEBAR_SWIPE_EDGE;
  const startsInsideOpenSidebar =
    !sidebarIsHidden &&
    touch.clientX >= sidebarBounds.left &&
    touch.clientX <= sidebarBounds.right;

  if (!startsAtOpeningEdge && !startsInsideOpenSidebar) {
    resetSidebarSwipe();
    return;
  }

  sidebarSwipe = {
    startX: touch.clientX,
    startY: touch.clientY,
    sidebarWasHidden: sidebarIsHidden,
    axis: null,
  };
}

function trackSidebarSwipe(event) {
  if (!sidebarSwipe || event.touches.length !== 1) return;

  const touch = event.touches[0];
  const deltaX = touch.clientX - sidebarSwipe.startX;
  const deltaY = touch.clientY - sidebarSwipe.startY;
  const horizontalDistance = Math.abs(deltaX);
  const verticalDistance = Math.abs(deltaY);

  if (
    !sidebarSwipe.axis &&
    Math.max(horizontalDistance, verticalDistance) >=
      SIDEBAR_SWIPE_AXIS_THRESHOLD
  ) {
    sidebarSwipe.axis =
      horizontalDistance > verticalDistance * 1.25
        ? "horizontal"
        : "vertical";
  }

  const movesInSidebarDirection = sidebarSwipe.sidebarWasHidden
    ? deltaX > 0
    : deltaX < 0;

  if (
    sidebarSwipe.axis === "horizontal" &&
    movesInSidebarDirection &&
    event.cancelable
  ) {
    event.preventDefault();
  }
}

function finishSidebarSwipe(event) {
  if (!sidebarSwipe) return;

  const touch = event.changedTouches[0];
  const swipe = sidebarSwipe;
  resetSidebarSwipe();
  if (!touch || swipe.axis !== "horizontal") return;

  const deltaX = touch.clientX - swipe.startX;
  const deltaY = touch.clientY - swipe.startY;
  const isHorizontal =
    Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

  if (!isHorizontal) return;

  if (
    swipe.sidebarWasHidden &&
    deltaX >= SIDEBAR_SWIPE_DISTANCE
  ) {
    setSidebar(true);
  } else if (
    !swipe.sidebarWasHidden &&
    deltaX <= -SIDEBAR_SWIPE_DISTANCE
  ) {
    setSidebar(false);
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement;
}

function updateFullscreenButton() {
  const isFullscreen = Boolean(getFullscreenElement());
  const label = isFullscreen ? "Exit full screen" : "Enter full screen";

  fullscreenButton.setAttribute("aria-label", label);
  fullscreenButton.title = label;
}

async function toggleFullscreen() {
  const root = document.documentElement;
  const requestFullscreen =
    root.requestFullscreen || root.webkitRequestFullscreen;
  const exitFullscreen =
    document.exitFullscreen || document.webkitExitFullscreen;

  try {
    if (getFullscreenElement()) {
      if (exitFullscreen) {
        await exitFullscreen.call(document);
      }
      return;
    }

    if (!requestFullscreen) {
      showToast("Fullscreen is not supported on this device");
      return;
    }

    await requestFullscreen.call(root);
  } catch {
    showToast("Unable to enter full screen");
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("notes-theme", theme);
  const isDark = theme === "dark";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Enable light mode" : "Enable dark mode",
  );
  themeMeta.setAttribute("content", isDark ? "#272422" : "#f6f6f6");
}

noteList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-note-id]");
  if (button) scrollToNote(button.dataset.noteId);
});

noteContent.addEventListener("click", (event) => {
  const link = event.target.closest("[data-note-link]");
  if (!link) return;

  event.preventDefault();
  scrollToNote(link.dataset.noteLink);
});

searchInput.addEventListener("input", (event) => {
  if (isGalleryView) {
    filterGallery(event.target.value);
  } else {
    searchDocument(event.target.value);
  }
});

searchInput.addEventListener("search", () => {
  if (isGalleryView) {
    filterGallery(searchInput.value);
  } else {
    searchDocument(searchInput.value);
  }
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();

  if (isGalleryView) {
    const firstVisibleCard = [...document.querySelectorAll(".gallery-card")]
      .find((card) => !card.hidden);
    if (firstVisibleCard) {
      openGalleryNote(firstVisibleCard.dataset.galleryNoteId);
    }
    return;
  }

  if (searchMatches.length === 0) {
    searchDocument(searchInput.value);
    return;
  }

  scrollToSearchMatch(
    activeSearchMatch + (event.shiftKey ? -1 : 1),
  );
});

sidebarToggle.addEventListener("click", () => {
  if (isGalleryView) {
    setView("document");
  } else {
    setSidebar(app.classList.contains("sidebar-hidden"));
  }
});

closeWindowButton.addEventListener("click", () => {
  if (typeof closeDialog.showModal === "function") {
    closeDialog.showModal();
  } else {
    closeDialog.setAttribute("open", "");
  }
});

minimizeWindowButton.addEventListener("click", () => {
  showToast("Coming soon");
});

closeDialog.addEventListener("click", (event) => {
  if (event.target === closeDialog) {
    closeDialog.close();
  }
});

fullscreenButton.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "Take a look at my notes-inspired portfolio.",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      showToast("Unable to share the link");
    }
  }
});

listViewButton.addEventListener("click", () => {
  setView("document");
});

gridButton.addEventListener("click", () => {
  setView("gallery");
});

trashButton.addEventListener("click", () => {
  showToast("Coming soon");
});

newNoteButton.addEventListener("click", () => {
  showToast("Coming soon");
});

galleryGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-gallery-note-id]");
  if (card) openGalleryNote(card.dataset.galleryNoteId);
});

galleryGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-gallery-note-id]");
  if (!card) return;
  event.preventDefault();
  openGalleryNote(card.dataset.galleryNoteId);
});

window.addEventListener("popstate", () => {
  scrollToNote(getNoteIdFromPath(), "smooth", "none");
});

noteView.addEventListener(
  "scroll",
  () => {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(updateActiveNoteFromScroll);
  },
  { passive: true },
);

document.addEventListener("touchstart", beginSidebarSwipe, {
  passive: true,
});
document.addEventListener("touchmove", trackSidebarSwipe, {
  passive: false,
});
document.addEventListener("touchend", finishSidebarSwipe, {
  passive: true,
});
document.addEventListener("touchcancel", resetSidebarSwipe, {
  passive: true,
});
overlaySidebarMedia.addEventListener("change", resetSidebarSwipe);

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
    searchInput.select();
  }

  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    if (isGalleryView) {
      filterGallery("");
    } else {
      clearSearchHighlights();
    }
    searchInput.blur();
  }
});

const preferredTheme =
  localStorage.getItem("notes-theme") || "dark";
const startsWithCollapsedSidebar = overlaySidebarMedia.matches;

applyTheme(preferredTheme);
setSidebar(!startsWithCollapsedSidebar);
setSearchShortcutLabel();
renderList();
renderDocument();
window.setInterval(updateCurrentDate, 60_000);
setActiveNote(activeNoteId, "none");

requestAnimationFrame(() => {
  scrollToNote(activeNoteId, "auto", "none");
});
