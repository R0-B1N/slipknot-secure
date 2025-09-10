// 7-Fragen-Quiz – alle Daten werden ausschließlich lokal (sessionStorage) verarbeitet.
(() => {
  const KEY_SELECTIONS = "quizSelections_v1";

  /** @typedef {{text: string, value: 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'}} Answer */
  /** @typedef {{question: string, answers: Answer[]}} QA */

  /** @type {QA[]} */
  const QUESTIONS = [
    {
      question: "Beschreibe dich selbst in drei Worten!",
      answers: [
        { text: "Aufgeschlossen, lustig, awesome!", value: "A" },
        { text: "Entspannt, locker, gelassen.", value: "B" },
        { text: "Cool, ruhig, freundlich.", value: "C" },
        { text: "Verrückt, aber weise.", value: "D" },
        { text: "Einschüchternd, aber freundlich.", value: "E" },
        { text: "Witzig, loyal, vertrauenswürdig.", value: "F" },
        { text: "Ruhig, gelassen, introvertiert.", value: "G" },
        { text: "Rebellisch, verrückt, lustig!", value: "H" },
        { text: "Klug, ruhig, entspannt.", value: "I" }
      ]
    },
    {
      question: "Lieblingssong von Slipknot?",
      answers: [
        { text: "Heretic Anthem", value: "A" },
        { text: "Gently", value: "B" },
        { text: "Surfacing", value: "C" },
        { text: "Sulfur", value: "D" },
        { text: "Psycosocial", value: "E" },
        { text: "Tattered and Torn", value: "F" },
        { text: "People=Sh*t", value: "G" },
        { text: "Disasterpiece", value: "H" },
        { text: "Eyeless", value: "I" }
      ]
    },
    {
      question: "Was machst du am liebsten bei einem Konzert?",
      answers: [
        { text: "Headbang", value: "A" },
        { text: "Moshpit!", value: "B" },
        { text: "Von Vorne zusehen", value: "C" },
        { text: "Einfach Musik hören, egal wo man ist.", value: "D" },
        { text: "Ich mag keine Konzerte, sie machen mich nervös.", value: "E" },
        { text: "Stage dive!", value: "F" },
        { text: "Mit Backstage-Pässen die Band treffen.", value: "G" },
        { text: "Mit Freunden chillen", value: "H" },
        { text: "Ich gehe nicht zu Konzerten, die sind langweilig.", value: "I" }
      ]
    },
    {
      question: "Wie warst du in der Schule bekannt?",
      answers: [
        { text: "Als Metalhead", value: "A" },
        { text: "Gamer", value: "B" },
        { text: "Gangstaaaaaa", value: "C" },
        { text: "Die Person, die jeden kennt", value: "D" },
        { text: "Ein ganz normales Kind", value: "E" },
        { text: "Das Kind, bei dem deine Eltern nicht wollten, dass du mit ihm rumhängst", value: "F" },
        { text: "Der stille Technikfreak / Nerd", value: "G" },
        { text: "Klassenclown", value: "H" },
        { text: "Stiller Goth", value: "I" }
      ]
    },
    {
      question: "Welchen Beruf würdest du außer Musiker ausüben?",
      answers: [
        { text: "Künstler", value: "A" },
        { text: "Autor", value: "B" },
        { text: "Arbeiten in einem Platten-/CD-Laden", value: "C" },
        { text: "Ein Clown sein (sorry, dass das so offentsichtlich ist)", value: "D" },
        { text: "An Autos oder Motorrädern herumschrauben", value: "E" },
        { text: "Bauwesen / Handwerk", value: "F" },
        { text: "Irgendwas mit Computern", value: "G" },
        { text: "Golfer", value: "H" },
        { text: "Barkeeper", value: "I" }
      ]
    },
    {
      question: "Was würdest du am Wochenende lieber machen?",
      answers: [
        { text: "Musik machen / ein Instrument üben / singen", value: "A" },
        { text: "Einen Film wie 'Transformers' schauen", value: "B" },
        { text: "Minigolf spielen oder eine andere Sportart ausüben", value: "C" },
        { text: "Mit Kätzchen spielen", value: "D" },
        { text: "Mit freunden abhängen / Party machen", value: "E" },
        { text: "Vielleicht einfach nur im Wald spazieren gehen", value: "F" },
        { text: "Eine Website erstellen oder Videospiele spielen", value: "G" },
        { text: "Fernsehen oder mit Freunden rausgehen", value: "H" },
        { text: "Zuhause bleiben und einfach nur Musik hören", value: "I" }
      ]
    },
    {
      question: "Was davon spricht dich am meisten an?",
      answers: [
        { text: "Baseball Schläger", value: "A" },
        { text: "Tranformers", value: "B" },
        { text: "Videospiele", value: "C" },
        { text: "Schweine", value: "D" },
        { text: "Kätzchen", value: "E" },
        { text: "Musik machen", value: "F" },
        { text: "Computer", value: "G" },
        { text: "Langes Haar", value: "H" },
        { text: "Schreiben", value: "I" }
      ]
    }
  ];

  // Ergebnis-Infos pro Wert (A–I)
  const RESULT_INFO = {
    A: {
      title: "Joey Jordison",
      text: "Strukturiert, vorausschauend und effizient in Planung und Umsetzung.",
      subtext: "Tipp: Große Ziele in Etappenziele zerlegen – das gibt dir Extra-Schub."
    },
    B: {
      title: "Jim Root",
      text: "Kreativ, neugierig und offen für Experimente und neue Perspektiven.",
      subtext: "Tipp: Halte spontane Ideen fest – sie sind Rohdiamanten."
    },
    C: {
      title: "Mick Thompson",
      text: "Kommunikativ, teamorientiert und stark im Zusammenbringen von Menschen.",
      subtext: "Tipp: Nutze Check-ins, um das Teamgefühl hoch zu halten."
    },
    D: {
      title: "Corey Taylor",
      text: "Pragmatisch, lösungsorientiert und handlungsstark.",
      subtext: "Tipp: Blocke Fokuszeiten, um deinen Flow zu schützen."
    },
    E: {
      title: "Du bist: Chris Fehn",
      text: "Ausgleichend, empathisch und gut im Lösen von Spannungen.",
      subtext: "Tipp: Klare Grenzen helfen dir, bei dir zu bleiben."
    },
    F: {
      title: "Du bist: Shawn Clown Crahan",
      text: "Zielstrebig, verlässlich und motivierend für andere.",
      subtext: "Tipp: Feiere Zwischenerfolge – auch kleine."
    },
    G: {
      title: "Du bist: Craig Jones",
      text: "Craig ist der Mixer und Keyboarder der Band. Er ist die meiste Zeit still und wahrscheinlich nur ein wenig schüchtern.",
      subtext: "[Stille]"
    },
    H: {
      title: "Du bist: Sid Wilson",
      text: "Unkonventionell, mutig und gut im Infragestellen des Status quo.",
      subtext: "Tipp: Verbinde kühne Ideen mit einem Mini-Experiment."
    },
    I: {
      title: "Du bist: Paul Gray",
      text: "Faktenorientiert, gründlich und stark in Präzision.",
      subtext: "Tipp: Visualisiere Daten, um andere besser mitzunehmen."
    }
  };

  // DOM-Elemente
  const elCard = document.getElementById("card");
  const elResult = document.getElementById("result");
  const elBtnPrev = document.getElementById("btnPrev");
  const elBtnNext = document.getElementById("btnNext");
  const elBtnSubmit = document.getElementById("btnSubmit");
  const elBtnRestart = document.getElementById("btnRestart");
  const elProgress = document.getElementById("progressBar");
  const elActions = document.querySelector(".actions");
  // const elTitle = document.querySelector("h1"); // optional – nur falls du die Überschrift ausblenden willst
  
  let isSummary = false; // <— neu



  let current = 0;
  // selections[i] enthält den value ('A'..'I') der gewählten Antwort zu Frage i oder null
  let selections = loadSelections() ?? Array(QUESTIONS.length).fill(null);

  // Initiale UI
  updateNavButtons();
  renderQuestion();
  updateProgress();

  // Navigation
  elBtnPrev.addEventListener("click", () => {
    if (current > 0) {
      current--;
      renderQuestion();
      updateNavButtons();
      updateProgress();
    }
  });

  elBtnNext.addEventListener("click", () => {
    if (current < QUESTIONS.length - 1) {
      current++;
      renderQuestion();
      updateNavButtons();
      updateProgress();
    }
  });

  elBtnSubmit.addEventListener("click", () => {
    if (selections.some(v => v === null)) {
      alert("Bitte beantworte alle Fragen, bevor du auswertest.");
      return;
    }
    const tally = tallyCounts(selections);
    const winner = getWinner(tally);
    showResult(winner, tally);
    enterSummaryView();         // <— NEU
    elResult.focus();
  });

  elBtnRestart.addEventListener("click", restart);

  // Hilfsfunktionen
  function renderQuestion() {
    const qa = QUESTIONS[current];
    const indexText = `Frage ${current + 1} von ${QUESTIONS.length}`;

    // Antworten zufällig mischen (ohne Originaldaten zu zerstören)
    const shuffled = shuffleArray(qa.answers.map(a => ({ ...a })));

    // Markierung: welche Auswahl ist gespeichert?
    const selectedValue = selections[current];

    elCard.innerHTML = `
      <div class="card__meta" aria-hidden="true">${indexText}</div>
      <h2 class="card__question">${qa.question}</h2>
      <div class="answers" role="listbox" aria-label="${qa.question}">
        ${shuffled.map((ans) => `
          <button
            class="answer ${ans.value === selectedValue ? "selected" : ""}"
            role="option"
            aria-selected="${ans.value === selectedValue}"
            data-value="${ans.value}"
          >
            <span class="answer__radio" aria-hidden="true"></span>
            <span class="answer__text">${escapeHtml(ans.text)}</span>
          </button>
        `).join("")}
      </div>
    `;

    // Klick-Listener für Antworten
    elCard.querySelectorAll(".answer").forEach(btn => {
      btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-value");
        selections[current] = value;
        saveSelections(selections);

        elCard.querySelectorAll(".answer").forEach(b => {
          b.classList.toggle("selected", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });

        updateNavButtons();
      });
    });

    elResult.hidden = true;
    elBtnRestart.hidden = true;
  }

  function updateNavButtons() {
    if (isSummary) {
      // Im Summary-Modus bleibt alles zu
      if (elActions) elActions.hidden = true;
      elBtnPrev.hidden = true;
      elBtnPrev.disabled = true;
      elBtnSubmit.hidden = true;
      elBtnSubmit.disabled = true;
      return;
    }

    elBtnPrev.disabled = current === 0;
    elBtnNext.hidden = current >= QUESTIONS.length - 1;
    elBtnNext.disabled = selections[current] === null;

    elBtnSubmit.hidden = current < QUESTIONS.length - 1;
    elBtnSubmit.disabled = selections.some(v => v === null);
  }

  function updateProgress() {
    const answered = selections.filter(v => v !== null).length;
    const pct = Math.round((answered / QUESTIONS.length) * 100);
    elProgress.style.width = pct + "%";
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function saveSelections(sel) {
    try {
      sessionStorage.setItem(KEY_SELECTIONS, JSON.stringify(sel));
    } catch (e) {
      console.warn("Konnte sessionStorage nicht schreiben.", e);
    }
  }

  function loadSelections() {
    try {
      const raw = sessionStorage.getItem(KEY_SELECTIONS);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function enterSummaryView() {
    isSummary = true;

    // Fortschrittsbalken auf 100 %
    elProgress.style.width = "100%";

    // Fragen ausblenden
    elCard.hidden = true;

    // Buttons Zurück/Auswerten sicher ausblenden *und* deaktivieren
    elBtnPrev.hidden = true;
    elBtnPrev.disabled = true;
    elBtnPrev.setAttribute("aria-disabled", "true");

    elBtnSubmit.hidden = true;
    elBtnSubmit.disabled = true;
    elBtnSubmit.setAttribute("aria-disabled", "true");

    // Falls vorhanden: ganze Actions-Leiste verstecken
    if (elActions) elActions.hidden = true;
  }

  function tallyCounts(sel) {
    const counter = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0 };
    sel.forEach(v => { if (v && counter[v] != null) counter[v]++; });
    return counter;
  }

  function getWinner(tally) {
    const entries = Object.entries(tally);
    let best = entries[0];
    for (const [k, v] of entries) {
      if (v > best[1]) best = [k, v];
    }
    const max = best[1];
    const ties = entries.filter(([_, v]) => v === max).map(([k]) => k);
    return { winner: ties[0], ties, max };
  }

  function showResult(w, tally) {
    // Hilfsfunktion zum sicheren Text-Escaping wiederverwenden
    const renderCard = (key) => {
      const info = RESULT_INFO[key] || {
        title: `Du bist: Profil ${key}`,
        text: "Beschreibung fehlt.",
        subtext: ""
      };
      return `
        <div class="result__block">
          <h3 class="result__title">${escapeHtml(info.title)}</h3>
          <p>${escapeHtml(info.text)}</p>
          <p class="result__sub">${escapeHtml(info.subtext)}</p>
        </div>
      `;
    };

    const details = `
      <div class="footer-note">
        Deine Verteilung: A=${tally.A}, B=${tally.B}, C=${tally.C}, D=${tally.D}, E=${tally.E}, F=${tally.F}, G=${tally.G}, H=${tally.H}, I=${tally.I}
      </div>
    `;

    // Bei Gleichstand alle passenden Profile zeigen
    if (w.ties.length > 1) {
      elResult.innerHTML = `
        <h3 class="result__title">Gleichstand</h3>
        ${w.ties.map(renderCard).join("")}
        ${details}
      `;
    } else {
      elResult.innerHTML = `
        ${renderCard(w.winner)}
        ${details}
      `;
    }

    elResult.hidden = false;
    elBtnRestart.hidden = false;
  }

  function restart() {
    selections = Array(QUESTIONS.length).fill(null);
    saveSelections(selections);
    current = 0;
    isSummary = false;

    // Ansicht & Buttons wiederherstellen
    elCard.hidden = false;
    if (elActions) elActions.hidden = false;

    elBtnPrev.hidden = false;
    elBtnPrev.disabled = false;
    elBtnPrev.removeAttribute("aria-disabled");

    elBtnSubmit.hidden = false;
    elBtnSubmit.disabled = true; // bleibt disabled bis alles beantwortet ist
    elBtnSubmit.removeAttribute("aria-disabled");

    renderQuestion();
    updateNavButtons();
    updateProgress();
    elResult.hidden = true;
    elBtnRestart.hidden = true;
  }


})();
