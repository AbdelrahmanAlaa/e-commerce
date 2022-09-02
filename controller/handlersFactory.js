const asyncError = require('../middleware/asyncError')
const ApiFeatures = require('../middleware/apiFeatures.js')
exports.deleteOne = (Model)=>
    asyncError(async (req, res) => {
        const documents = await Model.findByIdAndDelete(req.params.id, {
          active: false,
        });
        if (!documents) return res
        .status(404)
        .json({ status: "false ", message: "this id is not found .." });
  
        res.status(200).json({ message: "successfully deleted .. " });
      });
      
exports.update = (Model)=>
asyncError(async (req, res) => {
  const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!documents) return res
      .status(404)
      .json({ status: "false ", message: "this id is not found .." });

  res.status(200).json({ status: "true", documents });
});


exports.createOne = (Model) =>

  asyncError(async (req, res) => {
  const documents = await Model.create(req.body);
  res.status(200).json({ documents });
});
             
exports.getOne = (Model)=>

asyncError(async(req,res)=>{
  const documents = await Model.find({_id:req.params.id});
  if(!documents)return res.status(400).json({
    status:"false",
    message:`no ${Model}for this id ..` 
  })
  res.status(200).json({
    status:"true",
    documents
  })
})

exports.getAll = (Model,modelFilter)=>
asyncError(async (req, res) => {

  // Build Query
console.log(modelFilter)
  const contDocuments = await Model.countDocuments();
const apiFeatures = new ApiFeatures(req.query,Model.find())
.sort()
.paginate(contDocuments)
.limitFields()
.filter()
.search(modelFilter);

 const {mongooseQuery,paginationResult} = apiFeatures; 
  const documents = await mongooseQuery;
    if (!documents) res.status(404).json({ message: "this id is not found ..! " });
  
    res.status(200).json({ result: documents.length,paginationResult,decoments: documents });
  
});