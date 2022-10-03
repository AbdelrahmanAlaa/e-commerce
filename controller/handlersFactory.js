const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const ApiFeatures = require("../middleware/apiFeatures.js");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await Model.findByIdAndDelete(req.params.id, {
      active: false,
    });
    if (!documents)
      return res
        .status(404)
        .json({ status: "false ", message: "this id is not found .." });
    // trigger "remove" event when update document
    documents.remove();
    res.status(200).json({ message: "successfully deleted .. " });
  });

exports.update = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!documents)
      return res
        .status(404)
        .json({ status: "false ", message: "this id is not found .." });
    // trigger "update" event when update document look in review models in 64

    documents.save();
    res.status(200).json({ status: "true", documents });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await Model.create(req.body);
    res.status(200).json({ message: "true", documents });
  });

exports.getOne = (Model, populateOpt) =>
  asyncHandler(async (req, res) => {
    // build query
    let query = Model.find({ _id: req.params.id });
    if (populateOpt) {
      console.log(populateOpt);
      query = query.populate(populateOpt);
    }
    // execute query
    const documents = await query;
    if (!documents)
      return res.status(400).json({
        status: "false",
        message: `no ${Model}for this id ..`,
      });
    res.status(200).json({
      status: "true",
      documents,
    });
  });

exports.getAll = (Model, modelName) =>
  asyncHandler(async (req, res) => {
    // Build Query
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    console.log(filter);
    const contDocuments = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(req.query, Model.find(filter))
      .sort()
      .paginate(contDocuments)
      .limitFields()
      .filter()
      .search(modelName);

    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    if (!documents)
      res.status(404).json({ message: "this id is not found ..! " });

    res
      .status(200)
      .json({ result: documents.length, paginationResult, documents });
  });

exports.resizeImage = (folderName, x, y) =>
  asyncHandler(async (req, res, next) => {
    if (req.file) {
      const filename = `category-${uuidv4()}.jpeg`;
      await sharp(req.file.buffer)
        .resize(x, y)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`images/${folderName}/${filename}`);

      req.body.image = filename;
    }
    next();
  });
