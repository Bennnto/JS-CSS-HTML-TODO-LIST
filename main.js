document.addEventListener("DOMContentLoaded", function() {
  const texts = document.getElementById('todo')
  const list = document.getElementById('list')
  const Clear = document.getElementById('clear')

  function save(){
    const todos  = [];
    document.querySelectorAll('#list div').forEach(item => {
      const checkbox = item.querySelector('input[type="checkbox"]')
      const label = item.querySelector('label');
      todos.push({
        text: label.textContent,
        done: checkbox.checked,
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  function Todoist (todoText) {
    const item = document.createElement('div');
    item.style.fontSize = '30px'
    item.style.display = 'flex'
    item.style.flexDirection = 'row'
    const label = document.createElement('label');
    label.textContent = todoText;
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.id = 'check';
    box.style.width = '30px';
    box.style.height = '30px';

    box.addEventListener('change', () =>
    {item.classList.toggle('done', box.checked);
    });
    item.appendChild(box)
    item.appendChild(label)
    list.appendChild(item)
    save()
  }
  document.addEventListener('submit',(e) => {
    e.preventDefault()
    const todo = texts.value.trim();
    if (todo !== "") {
      Todoist(todo);
      texts.value = ''
    }
  })

 Clear.addEventListener('click', (e) => {
   e.preventDefault()
   list.innerHTML = ''
      })

  function load(){
    const saved = JSON.parse(localStorage.getItem('todos')) || [];
    saved.forEach(todo => {
      Todoist(todo.text, todo.done);
    })
  }
  load()
})