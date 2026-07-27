const PAGE_TITLE = "Hi, I'm Miłosz Miśkiewicz";

const notes = [
  {
    id: "about",
    icon: "📍",
    title: "About me",
    count: 1,
    group: "Pinned",
    content: `
      <h1>About me</h1>
      <p class="lead">Student & developer creating thoughtful digital products.</p>
      <p>
        This is where a short, focused introduction will go: what you do,
        what matters to you, and which problems you are best at solving.
      </p>
      <h2>Outside of work</h2>
      <p>
        A place for your interests, favorite tools, books, or anything else
        that makes this website sound like you — not another résumé.
      </p>
      <hr class="note-rule" />
      <p><em>Tip: two or three short paragraphs are usually enough.</em></p>
    `,
  },
  {
    id: "projects",
    icon: "📁",
    title: "Projects",
    count: 4,
    group: "Pinned",
    content: `
      <h1>Projects</h1>
      <p class="lead">A few things I am particularly proud of.</p>
      <div class="project-grid">
        <section class="project-card">
          <h2>Project number one ↗</h2>
          <p>A short description of the problem, your solution, and the outcome.</p>
        </section>
        <section class="project-card">
          <h2>Project number two ↗</h2>
          <p>This could be an application, a website, an experiment, or a case study.</p>
        </section>
        <section class="project-card">
          <h2>Project number three ↗</h2>
          <p>Key technologies, the scope of your role, and a link to the result.</p>
        </section>
        <section class="project-card">
          <h2>Next project…</h2>
          <p>This card is waiting for something new.</p>
        </section>
      </div>
    `,
  },
  {
    id: "experience",
    icon: "💼",
    title: "Experience",
    count: 2,
    group: "Pinned",
    content: `
      <h1>Experience</h1>
      <p class="lead">A concise, readable overview of my professional path.</p>
      <h2>Company name · Current role</h2>
      <p>2024 — present</p>
      <ul>
        <li>the most important responsibility or result,</li>
        <li>a specific improvement you managed to introduce.</li>
      </ul>
      <h2>Previous company · Role</h2>
      <p>2021 — 2024</p>
      <ul>
        <li>a description of the project, team, or measurable outcome.</li>
      </ul>
    `,
  },
  {
    id: "education",
    icon: "🎓",
    title: "Education",
    count: 1,
    group: "Pinned",
    content: `
      <h1>Education</h1>
      <p class="lead">A place for education, courses, and important milestones.</p>
      <h2>University or school name</h2>
      <p>Degree or specialization · 2020 — 2024</p>
      <ul>
        <li>key areas of study and interest,</li>
        <li>an award, thesis project, or extracurricular activity.</li>
      </ul>
      <h2>Courses and certifications</h2>
      <p>Selected programs, workshops, and training related to your work.</p>
    `,
  },
  {
    id: "skills",
    icon: "🧠",
    title: "Skills",
    count: 1,
    group: "Pinned",
    content: `
      <h1>Skills</h1>
      <p class="lead">Tools matter, but what you create with them matters more.</p>
      <h2>Design</h2>
      <p>Product design, UX/UI, prototyping, design systems, and accessibility.</p>
      <h2>Development</h2>
      <p>HTML, CSS, JavaScript, and the other technologies you use.</p>
      <h2>Collaboration</h2>
      <p>Workshops, communication, project leadership, and teamwork.</p>
    `,
  },
  {
    id: "contact",
    icon: "✉️",
    title: "Contact",
    count: 1,
    group: "Pinned",
    content: `
      <h1>Contact</h1>
      <p class="lead">Have an idea, a question, or simply want to say hello?</p>
      <p>
        The easiest way to reach me is by email:
        <a href="mailto:hello@example.com">hello@example.com</a>
      </p>
      <p>
        You can also find me on
        <a href="#" aria-label="LinkedIn profile">LinkedIn</a>,
        <a href="#" aria-label="GitHub profile">GitHub</a>,
        or anywhere else you would like to link here.
      </p>
    `,
  },
];

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
const listViewButton = document.querySelector("#listViewButton");
const themeToggle = document.querySelector("#themeToggle");
const shareButton = document.querySelector("#shareButton");
const gridButton = document.querySelector("#gridButton");
const trashButton = document.querySelector("#trashButton");
const newNoteButton = document.querySelector("#newNoteButton");
const toast = document.querySelector("#toast");
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
        const content = document.createElement("template");
        content.innerHTML = note.content;
        const preview =
          content.content.querySelector(".lead, p")?.textContent.trim() || "";

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

function formatSystemDate(includeTime = true) {
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

  return new Intl.DateTimeFormat("en-US", options).format(new Date());
}

function updateCurrentDate() {
  const currentDate = formatSystemDate(true);
  noteDate.textContent = currentDate;
  galleryDate.textContent = currentDate;
}

function renderDocument() {
  updateCurrentDate();
  noteContent.innerHTML = "";

  notes.forEach((note) => {
    const section = document.createElement("section");
    section.className = "note-section";
    section.id = note.id;
    section.dataset.noteId = note.id;
    section.innerHTML = note.content;

    const heading = section.querySelector("h1");
    if (heading) {
      heading.id = `${note.id}-title`;
      heading.textContent = note.title;
      const icon = document.createElement("span");
      icon.className = "note-title-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = note.icon;
      heading.prepend(icon);
      section.setAttribute("aria-labelledby", heading.id);
    }

    noteContent.append(section);
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
    preview.innerHTML = note.content;

    const heading = preview.querySelector("h1");
    if (heading) {
      heading.textContent = `${note.icon} ${note.title}`;
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

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
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
setActiveNote(activeNoteId, "replace");

requestAnimationFrame(() => {
  scrollToNote(activeNoteId, "auto", "none");
});
