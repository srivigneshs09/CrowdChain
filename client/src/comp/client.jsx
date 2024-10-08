const express = require("express");
const app = express(); 
const bodyParser = require("body-parser"); 
app.use(express.json()); 
const Tickets = [
  { title: "Harry Potter", id: 1 },
  { title: "Avatar", id: 2 },
  { title: "IRON MAN", id: 3 },
];
app.get("/", (req, res) => {
  res.send("Practice with ExpressJS ");
});
app.get("/api/Tickets", (req, res) => {
  res.send(Tickets);
});
app.get("/api/Tickets/:id", (req, res) => {
  const book = Tickets.find((c) => c.id === parseInt(req.params.id));
  if (!book)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>'
      );
  res.send(book);
});
app.post('/api/send', (req, res) => {
    const { title, name, occupation, companyType, mobile, email, productInterest, department, expectedDate, expectedTime } = req.body;
});  

app.listen(8080, () => console.log(`Listening on port ${8080}..`));