// jsonplaceholder.typicode.com Example
// This script fetches a todo item from the JSONPlaceholder API and logs it to the screen in a learning activity.
const todo = document.getElementById('todo-output');
async function getTodo() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/77');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    todo.textContent = JSON.stringify(json, null, 2); 
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
  }
}
todo.innerHTML = 'Loading...';
getTodo();