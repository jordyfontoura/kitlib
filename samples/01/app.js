const { KitParser } = require("@kitlib/helpers");
const { BodyParser } = require("@kitlib/helpers/kitexpress");

const express = require("express");

const app = express();

app.use(express.json());


const leadSchema = KitParser.schema({
  id: KitParser.number(),
  clicks: KitParser.number(),
  links: KitParser.arrayOf(KitParser.string()),
  isFake: KitParser.boolean(),
  type: KitParser.default('lead').string(),
  payload: KitParser.optional().object(),
  contact: KitParser.schema({
    name: KitParser.string(),
    phone: KitParser.string(),
    email: KitParser.string(),
  })
})
app.post('/lead', (req, res) => {
  const { body } = req;
  const data = leadSchema.compile(body);
  res.status(200).json(data);
});

app.use('/parsed/lead', BodyParser(leadSchema));

app.use('/middleware/lead', function (req, res, next) {
  req.body = leadSchema.compile(req.body);
  next();
})

app.post('/middleware/lead', (req, res) => {
  res.status(200).json(req.body);
})

app.post('/parsed/lead', (req, res) => {
  res.status(200).json(req.body);
})


module.exports = app;