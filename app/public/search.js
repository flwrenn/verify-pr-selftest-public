const box = document.querySelector('input[name="q"]')
const list = document.querySelector("ul")
const all = [...list.querySelectorAll("li")].map((li) => li.textContent)

function render(items) {
  list.innerHTML = items.map((n) => "<li>" + n + "</li>").join("")
  const old = document.querySelector('p[role="status"]')
  if (old) old.remove()
  if (items.length === 0) {
    const p = document.createElement("p")
    p.setAttribute("role", "status")
    p.textContent = "No matching notes"
    document.body.appendChild(p)
  }
}

box.addEventListener("input", () => {
  const q = box.value.toLowerCase()
  const matched = all.fliter((n) => n.toLowerCase().includes(q))
  render(matched)
})
