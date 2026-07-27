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
      <p class="lead">
        Hi, I’m <b>Miłosz Miśkiewicz</b>, pronounced roughly
        <em>Me-wash Meesh-key-vitch</em> or, for the linguistic geeks,
        <code>[ˈmi.wɔʂ miɕˈkʲɛ.vit͡ʂ]</code>.
      </p>
      <p>
        I’m a third-year
        <a
          href="https://ww2.mini.pw.edu.pl/studia/inzynierskie-i-licencjackie/inzynieria-i-analiza-danych/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="View the Data Science programme"
        >Data Science</a>
        student at the
        <a
          href="https://ww4.mini.pw.edu.pl/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Visit the MiNI website"
        >Faculty of Mathematics and Information Science</a>
        (MiNI) at
        <a
          href="https://eng.pw.edu.pl/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Visit Warsaw University of Technology"
        >Warsaw University of Technology</a>, working toward a bachelor’s degree
        in engineering.
      </p>
      <p>
        I’m curious about technology, especially software and AI, with a
        particular interest in data mining, web scraping, and turning messy
        information into useful products.
      </p>
      <p>
        Born, raised, and currently based in
        <a
          href="https://share.google/3rWxIilLs5elOUNxR"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Open Warsaw in Google Maps"
        >Warsaw, Poland</a>.
        Casually obsessed with getting things right.
      </p>
      <p>
        Right now, I’m building
        <a
          href="https://www.sedno.news/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Sedno"
        >Sedno</a>, an AI-powered media intelligence platform that monitors
        news in real time and turns noisy coverage into concise summaries and
        actionable insights.
      </p>
      <p>
        See what I’m building (apart from this site, which is still a work in
        progress)&nbsp;<a
          href="/projects"
          data-note-link="projects"
          aria-label="Go to Projects"
          title="Go to Projects"
        >↓</a>
      </p>
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
      <p class="lead">
        Things that made it out of my notes folder and into working code.
      </p>
      <h2>
        <a
          href="https://www.sedno.news/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Sedno"
        >Sedno</a>
        · AI-powered media intelligence platform
      </h2>
      <p>2025 – Present</p>
      <p>
        An AI-powered platform that monitors news in real time and turns
        fragmented coverage into concise summaries and actionable insights.
        Developed within the NCBR
        <a
          href="https://www.gov.pl/web/ncbr/projekt-uczelnie-przyszlosci"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Learn about Uczelnie Przyszłości"
        >Uczelnie Przyszłości</a>
        program, with a
        public launch planned for September 2026.
      </p>
      <ul>
        <li>
          Built a resilient RSS ingestion layer with custom parsers, retry
          mechanisms, and Redis caching.
        </li>
        <li>
          Developed NLP- and LLM-assisted classification for sources with
          limited or inconsistent metadata.
        </li>
        <li>
          Implemented semantic article grouping with Qdrant and asynchronous
          processing pipelines with Dramatiq.
        </li>
        <li>
          Iteratively redesigned the ingestion and processing architecture
          while navigating the legal and ethical constraints of news
          aggregation.
        </li>
      </ul>
      <h2>
        <a
          href="https://github.com/miuoshdot/meritumnews"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Meritum on GitHub"
        >Meritum</a>
        · Real-time news summarization mobile app
      </h2>
      <p>2024 – 2025</p>
      <p>
        A publicly released mobile application that collected articles from
        multiple sources and turned them into concise news summaries.
      </p>
      <ul>
        <li>
          Built multi-source Python scraping workflows using Requests, aiohttp,
          Beautiful Soup, Selenium, and Playwright.
        </li>
        <li>
          Improved scraping reliability with rotating headers, proxies, retry
          logic, browser automation, and discovered internal APIs.
        </li>
        <li>
          Containerized the application with Docker and worked with PostgreSQL,
          LLM APIs, and AWS-based hosting.
        </li>
      </ul>
      <h2>
        <a
          href="https://github.com/miuoshdot/csllmui"
          target="_blank"
          rel="noopener noreferrer"
          title="Open CSLLMUI on GitHub"
        >CSLLMUI</a>
        · Custom interface for large language models
      </h2>
      <p>2024</p>
      <p>
        A configurable Streamlit interface for interacting with multiple
        OpenAI and Anthropic models from a single application.
      </p>
      <ul>
        <li>
          Built model switching, persistent chat sessions, token usage
          tracking, and configurable response settings.
        </li>
        <li>
          Added controls for temperature, memory, and model behavior through a
          customizable sidebar.
        </li>
      </ul>
      <h2>
        <a
          href="https://github.com/miuoshdot/st_better_chat_input"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Better Chat Input for Streamlit on GitHub"
        >Better Chat Input for Streamlit</a>
        · Open-source UI utility
      </h2>
      <p>2024</p>
      <p>
        A small open-source utility that makes Streamlit’s chat input more
        flexible without requiring a separate frontend.
      </p>
      <ul>
        <li>
          Added configurable element orientation, optional borders, and
          additional containers beside and above the input.
        </li>
        <li>
          Packaged the solution as a reusable Python function with usage
          examples and documentation.
        </li>
      </ul>
    `,
  },
  {
    id: "experience",
    icon: "💼",
    title: "Experience",
    count: 2,
    group: "The serious stuff",
    content: `
      <h1>Experience</h1>
      <p class="lead">
        Gained hands-on experience through collaborative data and AI projects.
      </p>
      <h2>
        Project Member · Data Science Student Research Club (KNDS), MiNI WUT
      </h2>
      <p>2025/26 Academic Year · Present</p>
      <ul>
        <li>
          Co-developed
          <a
            href="https://github.com/Kolo-Naukowe-Data-Science-PW/Chatbot-MiNI"
            target="_blank"
            rel="nofollow noopener noreferrer"
            title="Open Chatbot MiNI on GitHub"
          >Chatbot MiNI</a>, an open-source assistant created by KNDS.
        </li>
        <li>
          Contributed primarily to the web-scraping strategy and data-pipeline
          design.
        </li>
      </ul>
      <h2>Project Lead · Data Science Student Research Club (KNDS), MiNI WUT</h2>
      <p>2026/27 Academic Year · Planned</p>
      <ul>
        <li>
          Expected to coordinate and lead a student project developed in
          collaboration with a global top-10 bank.
        </li>
      </ul>
    `,
  },
  {
    id: "education",
    icon: "🎓",
    title: "Education",
    count: 1,
    group: "The serious stuff",
    content: `
      <h1>Education</h1>
      <p class="lead">
        Academic foundations <em>(not really)</em> shaping my interests in data and technology.
        I’ve met some really cool
        <a
          href="https://www.linkedin.com/in/bart%C5%82omiej-domanowski-5a6b0b207/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Open their LinkedIn profile"
        >guys</a>
        &amp;
        <a
          href="https://www.linkedin.com/in/aleksandra-mulewicz-3003a722b/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Open their LinkedIn profile"
        >gals</a>
        along the way.
      </p>
      <h2>
        BEng in Data Engineering and Analytics · Individual Study Programme
      </h2>
      <p>
        2024 – Present · Faculty of Mathematics and Information Science,
        Warsaw University of Technology
      </p>
      <h3>Selected Coursework</h3>
      <ul>
        <li>
          <strong>Programming & Computer Science:</strong>
          Advanced Object-Oriented Programming, Algorithms and Data Structures
        </li>
        <li>
          <strong>Data Engineering:</strong>
          Structured Data Processing, Linear Algebra in Data Analysis
        </li>
        <li>
          <strong>Mathematics & Statistics:</strong>
          Calculus, Linear Algebra with Geometry, Discrete Mathematics, Probability Theory, Numerical Methods, Stochastic Processes
        </li>
      </ul>
      <h3>Individual Study Programme</h3>
      <p>
        Selected for
        <a
          href="https://www.gov.pl/web/ncbr/projekt-uczelnie-przyszlosci"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Learn about Uczelnie Przyszłości"
        >Uczelnie Przyszłości</a>
        with
        <a
          href="https://www.sedno.news/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Sedno"
        >Sedno</a>
        and currently following an individual educational pathway combining
        academic coursework, mentoring, and product development.
      </p>
      <h3>Extracurricular Activities</h3>
      <ul>
        <li>Member of the Data Science Student Research Club (KNDS)</li>
      </ul>
      <h2>
        BSc in Mathematics · Transferred to Data Engineering and Analytics
      </h2>
      <p>
        2023 – 2024 · Faculty of Mathematics and Information Science,
        Warsaw University of Technology
      </p>
      <p>
        Completed the first year before transferring to Data Engineering and
        Analytics, building a strong foundation in calculus, linear algebra with
        geometry, and discrete mathematics.
      </p>
    `,
  },
  {
    id: "achievements",
    icon: "🏅",
    title: "Achievements",
    count: 3,
    group: "Somewhere in between",
    content: `
      <h1>Achievements</h1>
      <p class="lead">
        A few milestones shaping my journey so far. Some more serious than others.
      </p>
      <h2>
        NCBR · Uczelnie Przyszłości Programme
      </h2>
      <p>
        <a
          href="https://www.sedno.news/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Sedno"
        >Sedno</a>
        was selected among the top 100 student projects nationwide for funding,
        incubation, and structured scientific and business mentoring.
      </p>
      <h2>
        BraveCamp Entrepreneurship Academy · Special Award
      </h2>
      <p>
        Received the
        <a
          href="https://ww2.mini.pw.edu.pl/milosz-miskiewicz-student-kierunku-inzynieria-i-analiza-danych-na-wydziale-matematyki-i-nauk-informacyjnych-zdobyl-nagrode-specjalna-w-14-edycji-bravecamp/"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Read about BraveCamp 2025"
        >Special Award for Best Project</a>
        among 22 participants from
        leading Polish universities. Presented
        <a
          href="https://www.sedno.news/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Sedno"
        >Sedno</a>
        to an audience of 200+
        people, industry experts, and a jury panel.
      </p>
      <h2>MAT &amp; Kangurek Mathematics Competitions · Winner</h2>
      <p>
        Won two legendary Polish mathematics competitions in primary school.
        This was probably the peak of my mathematical abilities.
      </p>
    `,
  },
  {
    id: "skills",
    icon: "🧠",
    title: "Skills",
    count: 1,
    group: "Back to casual",
    content: `
      <h1>Skills</h1>
      <p class="lead">
        Tools matter, but what you create with them matters more.
        Through a fair amount of trial and error, I’ve worked with:
      </p>
      <ul>
        <li>
          <strong>Programming Languages:</strong>
          Python, SQL, JavaScript, Java, R <em>(ouch)</em>, MATLAB, Bash,
          PowerShell
        </li>
        <li>
          <strong>Web, Backend & API Technologies:</strong>
          HTML, CSS, Next.js, Django, Streamlit, Reflex (formerly Pynecone),
          Pydantic, Celery, REST APIs, major LLM APIs, OpenRouter
        </li>
        <li>
          <strong>Data & Scientific Computing:</strong>
          NumPy, SciPy, pandas, Matplotlib, seaborn, Plotly, dplyr, tidyr,
          ggplot2, Shiny
        </li>
        <li>
          <strong>Web Scraping:</strong>
          Requests, HTTPX, aiohttp, asyncio, Beautiful Soup 4, Playwright,
          Selenium, Firecrawl
        </li>
        <li>
          <strong>Databases:</strong>
          PostgreSQL, MySQL, SQLite, pgvector, Supabase, Firebase, Qdrant,
          ChromaDB
        </li>
        <li>
          <strong>Cloud & Tools:</strong>
          Git, GitHub, Docker, Redis, AWS Lambda, Vercel
        </li>
      </ul>
      <p>
      Some are daily drivers. Others are tools
      I’ve used when the problem called for them.
      </p>
    `,
  },
  {
    id: "contact",
    icon: "✉️",
    title: "Contact",
    count: 1,
    group: "Back to casual",
    content: `
      <h1>Contact</h1>
      <p class="lead">
        You can find me on
        <a
          href="https://www.linkedin.com/in/miloszmiskiewicz/"
          target="_blank"
          rel="noopener noreferrer"
          title="Open my LinkedIn profile"
        >LinkedIn</a>
        and
        <a
          href="https://github.com/miuoshdot"
          target="_blank"
          rel="noopener noreferrer"
          title="Open my GitHub profile"
        >GitHub</a>.
      </p>
      <p>
      Peace ✌️
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
