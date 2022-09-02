const asyncError = require('../middleware/asyncError')
console.log('iam here')

exports.deleteOne = (Model)=>
    asyncError(async (req, res) => {
        const model = await Model.findByIdAndDelete(req.params.id, {
          active: false,
        });
        if (!model) return res
        .status(404)
        .json({ status: "false ", message: "this id is not found .." });
  
        res.status(200).json({ message: "successfully deleted .. " });
      });
      
exports.update = (Model)=>
asyncError(async (req, res) => {
  const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!model) return res
      .status(404)
      .json({ status: "false ", message: "this id is not found .." });

  res.status(200).json({ status: "true", model });
});


exports.create = (Model) =>

  asyncError(async (req, res) => {
  const model = await Model.create(req.body);
  res.status(200).json({ model });
});
