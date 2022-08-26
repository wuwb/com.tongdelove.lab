export default function handler(req, res): any {
  return res.send(req.query.word)
}
