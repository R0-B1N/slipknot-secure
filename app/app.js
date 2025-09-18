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
        { text: "Zielstrebig, dynamisch, diszipliniert.", value: "A" },
        { text: "Aufgeschlossen, kreativ, awesome!", value: "D" },
        { text: "Entspannt, klug, introvertiert.", value: "B" },
        { text: "Direkt, einschüchternd, finster.", value: "C" },
        { text: "Humorvoll, aufmerksam, loyal.", value: "E" },
        { text: "Irre, unberechenbar, konträr.", value: "F" },
        { text: "Wortkarg, mysteriös, genügsam.", value: "G" },
        { text: "Nerdig, aufgedreht, aber weise.", value: "H" },
        { text: "Freundlich, rücksichtsvoll, ausgeglichen.", value: "I" }
      ]
    },
    {
      question: "Lieblingssong von Slipknot?",
      answers: [
        { text: "Heretic Anthem", value: "A" },
        { text: "Gently", value: "B" },
        { text: "Surfacing", value: "C" },
        { text: "Sulfur", value: "H" },
        { text: "Psychosocial", value: "E" },
        { text: "Tattered and Torn", value: "F" },
        { text: "People=Sh*t", value: "G" },
        { text: "Disasterpiece", value: "D" },
        { text: "Eyeless", value: "I" }
      ]
    },
    {
      question: "Was machst du am liebsten bei einem Konzert?",
      answers: [
        { text: "Headbangen.", value: "A" },
        { text: "Moshpit!", value: "D" },
        { text: "Erste Reihe!", value: "H" },
        { text: "Einfach die Musik hören, egal wo man ist.", value: "B" },
        { text: "Zu Hause bleiben. Konzerte machen mich nervös.", value: "G" },
        { text: "Stage diven und Crowd surfen.", value: "F" },
        { text: "Mit Backstage-Pässen die Band treffen.", value: "E" },
        { text: "Mit Freunden chillen weiter hinten chillen.", value: "C" },
        { text: "Konzerte sind langweilig. Ich spiele lieber selbst.", value: "I" }
      ]
    },
    {
      question: "Welcher Archetype trifft auf dich während der Schul-/Unizeit am ehesten zu?",
      answers: [
        { text: "Metalhead", value: "A" },
        { text: "Gamer/Nerd", value: "C" },
        { text: "Punk", value: "B" },
        { text: "Die Person, die jeden kennt", value: "D" },
        { text: "Die ganz normale Person", value: "I" },
        { text: "Die Person, von der man sich fernhalten sollte.", value: "F" },
        { text: "Technikfreak", value: "H" },
        { text: "Klassenclown", value: "E" },
        { text: "Stiller Goth", value: "G" }
      ]
    },
    {
      question: "Welchen Beruf würdest du ausüben wenn du kein*e Systembibliothekar*in wärst?",
      answers: [
        { text: "Künstler*in", value: "H" },
        { text: "Autor*in", value: "D" },
        { text: "Verkäufer*in in einem Platten-/CD-Laden", value: "B" },
        { text: "Ein Clown sein (sorry, dass das so offentsichtlich ist)", value: "F" },
        { text: "Mechaniker*in", value: "A" },
        { text: "Bauarbeiter*in", value: "C" },
        { text: "Irgendwas anderes mit Computern", value: "I" },
        { text: "Golfer*in", value: "E" },
        { text: "Barkeeper*in", value: "G" }
      ]
    },
    {
      question: "Was würdest du am Wochenende am liebsten machen?",
      answers: [
        { text: "Musik machen.", value: "A" },
        { text: "Einen Film wie 'Transformers' schauen", value: "H" },
        { text: "Minigolf spielen oder eine andere Sportart ausüben", value: "E" },
        { text: "Mit Kätzchen spielen", value: "G" },
        { text: "Party machen!!!", value: "F" },
        { text: "Vielleicht einfach nur im Wald spazieren gehen", value: "B" },
        { text: "Videospiele spielen oder Programmieren üben.", value: "C" },
        { text: "Etwas mit Freunden unternehmen.", value: "I" },
        { text: "Zuhause bleiben und lesen", value: "D" }
      ]
    },
    {
      question: "Zu guter Letzt: suche dir eine Sache aus:",
      answers: [
        { text: "Baseball Schläger", value: "F" },
        { text: "Transformer", value: "H" },
        { text: "Videospiele", value: "C" },
        { text: "Schwein", value: "I" },
        { text: "Kätzchen", value: "G" },
        { text: "Musik", value: "A" },
        { text: "PC", value: "E" },
        { text: "Langes Haar", value: "B" },
        { text: "Kugelschreiber", value: "D" }
      ]
    }
  ];

  // Ergebnis-Infos pro Wert (A–I)
  const RESULT_INFO = {
    A: {
      title: "Du bist: Joey Jordison",
      text: "Joey war der legendäre Schlagzeuger der Band. Er war ehrgeizig, diszipliniert und prägte die Band als Mitbegründer.",
      subtext: "Funfact: Er spielte auch Gitarre und schrieb einige Songs in der Anfangszeit der Band."
    },
    B: {
      title: "Du bist: Jim Root",
      text: "Jim ist einer der Gitarristen von Slipknot. Er ist introvertiert, bleibt lieber im Hintergurnd und ist für seine Kreativität bekannt.",
      subtext: "Funfact: Er war neben Slipknot auch in der Band Stone Sour aktiv."
    },
    C: {
      title: "Du bist: Mick Thompson",
      text: "Mick ist Gitarrist (und hat die coolste Maske!). Er zeigt in Interviews einen trockenen Humor und bleibt lieber direkt.",
      subtext: "Funfact: Seine Gitarrenriffs sind stark von Deathmetal inspiriert."
    },
    D: {
      title: "Corey Taylor",
      text: "Corey ist der Sänger und Songwriter von Slipknot. Er ist offen, charismatisch und das Sprachrohr der Band.",
      subtext: "Funfact: Er schreibt gern finstere Texte, spielt aber auch Gitarre und coverte schon Spongebob oder Livin' La Vida Loca."
    },
    E: {
      title: "Du bist: Chris Fehn",
      text: "Chris war Percussionist und bekannt für seine energievolle Perfomance auf der Bühne. In Interviews war er locker und brachte viel Humor in die Gruppe.",
      subtext: "War seine Maske von Pinocchio oder Lysop inspiriert? - wir werden es nie erfahren."
    },
    F: {
      title: "Du bist: Shawn 'Clown' Crahan",
      text: "Shawn ist Percussionist und ein Gründungsmitglied der Band. Er ist kreativ, unberechenbar und stark von künstlerischem Ausdruck getrieben.",
      subtext: "Funfact: Du solltest den Vorfall mit der Krähe im Glas (Crow Jar Incident) googeln - nicht!"
    },
    G: {
      title: "Du bist: Craig Jones",
      text: "Craig ist der Mixer und Keyboarder der Band. Er ist die meiste Zeit stumm und wahrscheinlich nur ein wenig schüchtern :D",
      subtext: "[Stille]"
    },
    H: {
      title: "Du bist: Sid Wilson",
      text: "Sid ist DJ der Band und vermutlich ein Außerirdischer. Er ist unkonventionell und auf der Bühne für seine verrückten Aktionen bekannt.",
      subtext: "Funfact: Er ist seit Sommer 2025 mit Kelly Osbourne (Ozzy Osbournes Tochter) verlobt."
    },
    I: {
      title: "Du bist: Paul Gray",
      text: "Paul war der Bassist und Mitbegründer der Band. Er galt als eines der freundlichsten und ausgeglichensten Mitglieder von Slipknot.",
      subtext: "Funfact: Er schrieb viele der Basslines, die Slipknot so einzigartig machen."
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
