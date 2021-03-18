exports.run = (req, res) => {
  const { uid, code } = req.body;
  if (!code || !uid) return res.status(400).send({ message: "Missing code!" });
  //Run the code here
  return res.status(200).send(code);
};
