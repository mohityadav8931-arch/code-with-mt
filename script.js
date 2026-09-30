// Chartered Accountant Hood - Mock Test Engine
// Replace the demo question objects below with your authorized question bank.

const questionBank = [
  {
    question: "During an audit, an auditor identifies a matter that is relevant to users' understanding of the auditor's report but is not presented or disclosed in the financial statements. Which reporting section may be appropriate?",
    options: ["Key Audit Matter", "Other Matter Paragraph", "Other Information", "Basis for Opinion"],
    answer: 1
  },
  {
    question: "A company has an unspent CSR amount relating to a non-ongoing project. The auditor is considering the relevant reporting requirement. Which area should be examined?",
    options: ["Transfer of the applicable unspent amount to a specified fund", "Transfer to the share capital account", "Transfer to the general reserve only", "No reporting consideration is required"],
    answer: 0
  },
  {
    question: "Which type of misstatement describes an auditor's best estimate of misstatements in a population based on projecting errors identified in an audit sample?",
    options: ["Factual misstatement", "Judgmental misstatement", "Projected misstatement", "Trivial misstatement"],
    answer: 2
  },
  {
    question: "In a bank audit, a loan account's master data contains an incorrect interest rate compared with the sanctioned terms. Which procedure is directly relevant?",
    options: ["Verify loan-account master data and parameters", "Ignore the difference if the account is active", "Check only physical cash", "Review only the annual report"],
    answer: 0
  },
  {
    question: "When calculating drawing power, which item would generally reduce the eligible value of stock before applying the sanctioned margin?",
    options: ["Damaged stock and relevant stock creditors", "Share capital", "Depreciation on office furniture", "Dividend declared"],
    answer: 0
  },
  {
    question: "An auditor is evaluating an auditor's expert's findings. Which approach can help assess the relevance and reasonableness of those findings?",
    options: ["Perform corroborative procedures and analytical checks", "Accept every conclusion without evaluation", "Avoid comparing the work with other audit evidence", "Remove the expert's work from documentation"],
    answer: 0
  },
  {
    question: "A new accounting standard is adopted early where early adoption is permitted and its effect is material. Which reporting consideration can arise under the applicable auditing standard?",
    options: ["Emphasis of Matter", "Only a management letter", "No disclosure consideration", "Only an Other Information section"],
    answer: 0
  },
  {
    question: "For joint audits, responsibility is generally connected with the work allocated to the respective joint auditor. What is the key principle?",
    options: ["Every auditor is automatically responsible for every allocated task", "Each joint auditor is responsible for the work allocated to that auditor", "Only the smallest firm is responsible", "Only the client is responsible"],
    answer: 1
  },
  {
    question: "If audit evidence for a selected sample item cannot be obtained because the supporting records are unavailable, the auditor should consider the effect on the sampling conclusion and seek an appropriate response.",
    options: ["True", "False", "Only if the client agrees", "Only for listed companies"],
    answer: 0
  },
  {
    question: "Which activity is an example of an information-processing control?",
    options: ["Reviewing actual performance against budget", "Edit checks of input data", "Physical verification of office furniture", "Board meeting attendance"],
    answer: 1
  },
  {
    question: "If management's accounting estimate is unreasonable in the auditor's judgment, the resulting difference may be classified as what kind of misstatement?",
    options: ["Judgmental misstatement", "Projected misstatement only", "Administrative error", "No misstatement"],
    answer: 0
  },
  {
    question: "What is the purpose of maintaining documentation about the threshold below which misstatements are considered clearly trivial?",
    options: ["To record the predetermined threshold used in the audit", "To replace the audit opinion", "To eliminate all sampling", "To avoid documenting corrected misstatements"],
    answer: 0
  },
  {
    question: "When significant doubt about going concern exists, the auditor should obtain sufficient appropriate audit evidence and consider relevant mitigating factors.",
    options: ["True", "False", "Only after issuing the report", "Only when management requests it"],
    answer: 0
  },
  {
    question: "A high-risk area that required significant auditor attention, where sufficient appropriate evidence was ultimately obtained, may be considered for communication as a:",
    options: ["Key Audit Matter", "Cash flow statement", "Management representation", "Bank confirmation"],
    answer: 0
  },
  {
    question: "A sampling method may be necessary where the volume of available data makes examination of the entire population impractical.",
    options: ["True", "False", "Only for payroll", "Only for tax audits"],
    answer: 0
  },
  {
    question: "Which of the following is most closely connected with substantive audit procedures for bank advances?",
    options: ["Verifying loan master data and examining problem accounts", "Designing the company's logo", "Preparing employee leave records", "Selecting office furniture"],
    answer: 0
  },
  {
    question: "When a revaluation meets the applicable reporting threshold, the auditor considers whether the valuation was based on a Registered Valuer and the amount of change.",
    options: ["True", "False", "Only if management asks", "Only for cash balances"],
    answer: 0
  },
  {
    question: "Which section is intended for information other than the financial statements and auditor's report that is addressed in the auditor's reporting framework?",
    options: ["Other Information", "Cash Flow", "Trial Balance", "Ledger"],
    answer: 0
  },
  {
    question: "If an identified matter causes a material but not pervasive limitation on the auditor's ability to obtain sufficient appropriate evidence, the auditor may need to consider a qualified opinion.",
    options: ["True", "False", "Always an adverse opinion", "Always an unmodified opinion"],
    answer: 0
  },
  {
    question: "What is the main purpose of a mock-test result screen in this platform?",
    options: ["Show performance metrics and support revision", "Replace the CA examination", "Guarantee an exam result", "Automatically register a student"],
    answer: 0
  }
];

const modal = document.getElementById("testModal");
const resultModal = document.getElementById("resultModal");
const questionText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const paletteEl = document.getElementById("palette");
const currentNumber = document.getElementById("currentNumber");
const totalNumber = document.getElementById("totalNumber");
const countdownEl = document.getElementById("countdown");
const questionProgress = document.getElementById("questionProgress");

let current = 0;
let answers = Array(questionBank.length).fill(null);
let secondsLeft = 30 * 60;
let timer = null;
let testFinished = false;

totalNumber.textContent = questionBank.length;

function openTest() {
  current = 0;
  answers = Array(questionBank.length).fill(null);
  secondsLeft = 30 * 60;
  testFinished = false;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  startTimer();
  renderQuestion();
}

function closeTest() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  clearInterval(timer);
}

function startTimer() {
  clearInterval(timer);
  updateTimer();
  timer = setInterval(() => {
    secondsLeft--;
    updateTimer();
    if (secondsLeft <= 0) finishTest();
  }, 1000);
}

function updateTimer() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const s = (secondsLeft % 60).toString().padStart(2, "0");
  countdownEl.textContent = `${m}:${s}`;
  countdownEl.style.color = secondsLeft <= 60 ? "#dc2626" : "";
}

function renderQuestion() {
  const q = questionBank[current];
  currentNumber.textContent = current + 1;
  questionText.textContent = q.question;
  questionProgress.style.width = `${((current + 1) / questionBank.length) * 100}%`;

  optionsEl.innerHTML = q.options.map((option, index) => `
    <label class="option ${answers[current] === index ? "selected" : ""}">
      <input type="radio" name="answer" value="${index}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${escapeHtml(option)}</span>
    </label>
  `).join("");

  optionsEl.querySelectorAll(".option").forEach((label, index) => {
    label.addEventListener("click", () => {
      answers[current] = index;
      renderQuestion();
    });
  });

  document.getElementById("prevBtn").disabled = current === 0;
  document.getElementById("prevBtn").style.opacity = current === 0 ? ".5" : "1";

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.style.display = current === questionBank.length - 1 ? "none" : "block";

  renderPalette();
}

function renderPalette() {
  paletteEl.innerHTML = questionBank.map((_, index) => `
    <button class="${answers[index] !== null ? "answered" : ""} ${index === current ? "current" : ""}" data-index="${index}">
      ${index + 1}
    </button>
  `).join("");

  paletteEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      current = Number(btn.dataset.index);
      renderQuestion();
    });
  });
}

function finishTest() {
  if (testFinished) return;
  testFinished = true;
  clearInterval(timer);

  let correct = 0;
  answers.forEach((answer, i) => {
    if (answer !== null && answer === questionBank[i].answer) correct++;
  });

  const attempted = answers.filter(a => a !== null).length;
  const wrong = attempted - correct;
  const percent = Math.round((correct / questionBank.length) * 100);

  document.getElementById("resultPercent").textContent = `${percent}%`;
  document.getElementById("correctCount").textContent = correct;
  document.getElementById("wrongCount").textContent = wrong;
  document.getElementById("attemptedCount").textContent = attempted;

  document.getElementById("resultMessage").textContent =
    percent >= 80 ? "Excellent practice session. Keep revising and testing yourself."
    : percent >= 60 ? "Good attempt. Review the incorrect questions and try again."
    : "Keep practicing. Review the concepts and retake the test.";

  modal.classList.remove("open");
  resultModal.classList.add("open");
}

function retake() {
  resultModal.classList.remove("open");
  openTest();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelectorAll(".start-test:not(.disabled)").forEach(btn => {
  btn.addEventListener("click", openTest);
});

document.getElementById("closeTest").addEventListener("click", closeTest);
document.getElementById("closeBackdrop").addEventListener("click", closeTest);
document.getElementById("prevBtn").addEventListener("click", () => {
  if (current > 0) { current--; renderQuestion(); }
});
document.getElementById("nextBtn").addEventListener("click", () => {
  if (current < questionBank.length - 1) { current++; renderQuestion(); }
});
document.getElementById("submitBtn").addEventListener("click", () => {
  if (confirm("Submit this test and see your result?")) finishTest();
});
document.getElementById("closeResult").addEventListener("click", () => {
  resultModal.classList.remove("open");
  document.body.style.overflow = "";
});
document.getElementById("retakeBtn").addEventListener("click", retake);
document.getElementById("reviewBtn").addEventListener("click", () => {
  resultModal.classList.remove("open");
  modal.classList.add("open");
  current = 0;
  renderQuestion();
});
document.querySelector(".modal-backdrop", resultModal)?.addEventListener("click", () => {
  resultModal.classList.remove("open");
  document.body.style.overflow = "";
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("click", () => document.getElementById("nav").classList.remove("open"));
});

window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  document.getElementById("progressLine").style.width = `${(window.scrollY / max) * 100}%`;
});
