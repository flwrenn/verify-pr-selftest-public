const http = require("http")

const notes = ["Quarterly plan", "Grocery list", "Standup notes"]
const port = Number(process.env.VERIFY_PORT || 3000)

http
  .createServer((req, res) => {
    const u = new URL(req.url, "http://x")
    if (u.pathname === "/health") {
      res.writeHead(200, { "content-type": "text/plain" })
      return res.end("ok")
    }
    if (u.pathname === "/public/search.js") {
      res.writeHead(200, { "content-type": "text/javascript" })
      return res.end(require("fs").readFileSync(__dirname + "/public/search.js"))
    }
    const q = (u.searchParams.get("q") || "").toLowerCase()
    const shown = q ? notes.filter((n) => n.toLowerCase().includes(q)) : notes
    res.writeHead(200, { "content-type": "text/html" })
    res.end(
      [
        "<!doctype html><title>Notes</title><h1>Notes</h1>",
        '<form><input name="q" aria-label="Search notes" value="' + q + '"><button>Search</button></form>',
        "<ul>" + shown.map((n) => "<li>" + n + "</li>").join("") + "</ul>",
        shown.length === 0 ? '<p role="status">No matching notes</p>' : "",
        '<script src="/public/search.js"></script>',
      ].join("\n"),
    )
  })
  .listen(port, () => console.log("READY url=http://127.0.0.1:" + port))
