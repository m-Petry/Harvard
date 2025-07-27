function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  const next = current === 'light' ? 'dark-blue' : current === 'dark-blue' ? 'dark-grey' : 'light';
  applyTheme(next);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);

  const switcher = document.getElementById('theme-switch');
  if (switcher) {
    switcher.addEventListener('click', toggleTheme);
  }

  initQuestionPage();
  initNotebookPage();
});

function initQuestionPage() {
  const qEl = document.getElementById('question-text');
  if (!qEl) return; // not on question page

  const mock = {
    id: 1,
    text: 'Qual a capital da França?',
    options: ['Berlim', 'Madrid', 'Paris', 'Roma'],
    answer: 2
  };

  qEl.textContent = mock.text;
  const opts = document.getElementById('options');
  mock.options.forEach((opt, i) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answer';
    input.value = i;
    label.appendChild(input);
    label.append(' ' + opt);
    opts.appendChild(label);
  });

  document.getElementById('resolve').addEventListener('click', () => {
    const checked = document.querySelector('input[name="answer"]:checked');
    if (!checked) return;
    const result = document.getElementById('result');
    if (parseInt(checked.value) === mock.answer) {
      result.textContent = 'Você acertou!';
      result.className = 'result correct';
    } else {
      result.textContent = 'Você errou! Gabarito: ' + mock.options[mock.answer];
      result.className = 'result wrong';
    }
  });
}

function initNotebookPage() {
  const tree = document.getElementById('tree');
  if (!tree) return;

  const data = {
    'Matemática': ['Álgebra', 'Geometria'],
    'Português': ['Gramática', 'Interpretação'],
    'Informática': ['Hardware', 'Software']
  };

  const active = document.getElementById('active-filters');

  Object.entries(data).forEach(([key, children]) => {
    const li = document.createElement('li');
    const parentLabel = document.createElement('label');
    const parentCheck = document.createElement('input');
    parentCheck.type = 'checkbox';
    parentLabel.appendChild(parentCheck);
    parentLabel.append(' ' + key);
    li.appendChild(parentLabel);

    const ul = document.createElement('ul');
    children.forEach(child => {
      const cli = document.createElement('li');
      const childLabel = document.createElement('label');
      const childCheck = document.createElement('input');
      childCheck.type = 'checkbox';
      childCheck.dataset.name = child;
      childCheck.addEventListener('change', () => updateFilters());
      childLabel.appendChild(childCheck);
      childLabel.append(' ' + child);
      cli.appendChild(childLabel);
      ul.appendChild(cli);
    });
    li.appendChild(ul);
    tree.appendChild(li);
  });

  function updateFilters() {
    active.innerHTML = '';
    const selected = tree.querySelectorAll('input[data-name]:checked');
    selected.forEach(chk => {
      const span = document.createElement('span');
      span.className = 'chip';
      span.textContent = chk.dataset.name;
      active.appendChild(span);
    });
  }
}
