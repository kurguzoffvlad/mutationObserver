// Import stylesheets
import './style.css';

// Настройка наблюдения за изменениями в DOM
const targetNode = document.getElementById('app');

const playgroundElement = document.querySelector('.playground');
const oneButtonElement = document.querySelector('#one');
const manyButtonElement = document.querySelector('#many');
const targetElement = document.querySelector('.target');

const config = { attributes: true, childList: true, subtree: true };

// Создаем новый экземпляр MutationObserver
const observer = new MutationObserver((mutations) => {
  console.log('!!!!!!!!!!!');
  mutations.forEach((mutation) => {
    // Обрабатываем каждую мутацию
    console.log(mutation.type);
    console.log(mutation.target);
    console.log(mutation.addedNodes);
    console.log(mutation.removedNodes);
    // Другие свойства мутации, которые вы можете использовать
  });
});

// Начинаем наблюдение
observer.observe(targetNode, config);

// Позже можно остановить наблюдение
setTimeout((_) => {
  observer.disconnect();
}, 5000);

// ======================================================================================= //
// Write TypeScript code!
targetElement.innerHTML = `<h1>TypeScript Starter</h1>`;

function addOneElement(): void {
  const div = document.createElement('test-div');
  div.textContent = 'Single element';
  targetElement.appendChild(div);
}

function addElementsTree(): void {
  const div = document.createElement('div');

  div.textContent = 'Elements tree: ';

  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.textContent = i.toString();
    div.appendChild(span);
  }

  targetElement.appendChild(div);
}

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};
addOneElement();
setTimeout((_) => {
  document.querySelector('test-div').remove();
}, 3000);

oneButtonElement.addEventListener('click', () => addOneElement());
manyButtonElement.addEventListener('click', () => addElementsTree());
