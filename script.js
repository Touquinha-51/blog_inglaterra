// ===== Menu mobile =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ===== Reveal ao rolar a página =====
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ===== Quiz interativo =====
  const quizBox = document.querySelector('[data-quiz]');
  if (quizBox) initQuiz(quizBox);
});

function initQuiz(box) {
  const questions = [
    {
      q: "Em que ano a Inglaterra conquistou seu único título da Copa do Mundo?",
      opts: ["1958", "1966", "1970", "1996"],
      correct: 1
    },
    {
      q: "Qual é o apelido da seleção inglesa?",
      opts: ["The Red Devils", "The Three Lions", "The Blues", "Los Leones"],
      correct: 1
    },
    {
      q: "Qual estádio é considerado a \"casa\" da seleção inglesa?",
      opts: ["Old Trafford", "Anfield", "Wembley Stadium", "Emirates Stadium"],
      correct: 2
    },
    {
      q: "Na Copa do Mundo de 2026, contra quem a Inglaterra venceu por 3 a 2 nas oitavas de final?",
      opts: ["Croácia", "México", "Marrocos", "França"],
      correct: 1
    },
    {
      q: "Quem é o técnico da seleção inglesa na Copa do Mundo de 2026?",
      opts: ["Gareth Southgate", "Pep Guardiola", "Thomas Tuchel", "Jürgen Klopp"],
      correct: 2
    }
  ];

  let current = 0;
  let score = 0;

  const qEl = box.querySelector('.q');
  const optsEl = box.querySelector('.quiz-opts');
  const progEl = box.querySelector('.quiz-progress');

  function render() {
    if (current >= questions.length) {
      qEl.textContent = '';
      progEl.textContent = '';
      optsEl.innerHTML = `<div class="quiz-result">Você acertou ${score} de ${questions.length} 🦁</div>
        <button class="btn btn-primary" id="quiz-restart" style="justify-self:center; margin:0 auto;">Jogar de novo</button>`;
      document.getElementById('quiz-restart').addEventListener('click', () => {
        current = 0; score = 0; render();
      });
      return;
    }
    const item = questions[current];
    progEl.textContent = `Pergunta ${current + 1} de ${questions.length}`;
    qEl.textContent = item.q;
    optsEl.innerHTML = '';
    item.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => answer(i, btn, item));
      optsEl.appendChild(btn);
    });
  }

  function answer(i, btn, item) {
    const allBtns = optsEl.querySelectorAll('.quiz-opt');
    allBtns.forEach(b => b.disabled = true);
    if (i === item.correct) {
      btn.classList.add('correct');
      score++;
    } else {
      btn.classList.add('wrong');
      allBtns[item.correct].classList.add('correct');
    }
    setTimeout(() => { current++; render(); }, 900);
  }

  render();
}
