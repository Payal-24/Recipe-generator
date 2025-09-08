const itemInput = document.getElementById("itemInput");
const groceryList = document.getElementById("groceryList");

// Load items from localStorage
window.onload = function () {
  const savedItems = JSON.parse(localStorage.getItem("groceryItems")) || [];
  savedItems.forEach(item => addItemToDOM(item.text, item.done));
};

// Add item
function addItem() {
  const text = itemInput.value.trim();
  if (text === "") return;

  addItemToDOM(text, false);
  saveItems();
  itemInput.value = "";
}

// Add item to DOM
function addItemToDOM(text, done) {
  const li = document.createElement("li");
  if (done) li.classList.add("done");

  li.innerHTML = `
    <span>${text}</span>
    <div class="grocery-btns">
      <button class="done-btn" onclick="toggleDone(this)">✓</button>
      <button class="delete-btn" onclick="deleteItem(this)">✗</button>
    </div>
  `;
  groceryList.appendChild(li);
}

// Mark as done
function toggleDone(btn) {
  const li = btn.closest("li");
  li.classList.toggle("done");
  saveItems();
}

// Delete item
function deleteItem(btn) {
  const li = btn.closest("li");
  li.remove();
  saveItems();
}

// Save items to localStorage
function saveItems() {
  const items = [];
  document.querySelectorAll("#groceryList li").forEach(li => {
    items.push({
      text: li.querySelector("span").innerText,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("groceryItems", JSON.stringify(items));
}
