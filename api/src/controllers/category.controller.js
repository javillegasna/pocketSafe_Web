import Category from "../models/category.model";
import User from "../models/user.model";
const handlerError = (res) => (err) => {
  res.status(400);
  res.json(err);
};

const create = (req, res) => {
  const { iconName, categoryName } = req.body;
  Category.create({ iconName, categoryName })
    .then((newCategory) => res.status(201).json(newCategory))
    .catch(handlerError(res));
};

const findAll = (req, res) => {
  Category.find()
    .then((ListOfCategories) => res.json(ListOfCategories))
    .catch(handlerError(res));
};

const findOne = (req, res) => {
  const { categoryId } = req.params;
  Category.findById(categoryId)
    .then((oneCategory) => res.json(oneCategory))
    .catch(handlerError(res));
};

const deleteOne = (req, res) => {
  const { userId, categoryId } = req.params;
  Category.findByIdAndDelete(categoryId)
    .then((category) =>
      User.findOneAndUpdate(
        { _id: userId },
        { $pull: { categories: category._id } },
        { new: true }
      )
    )
    .then((user) => res.json(user))
    .catch(handlerError(res));
};

const update = (req, res) => {
  const { categoryId } = req.params;
  const { categoryName, iconName } = req.body;
  Category.findOneAndUpdate(
    { _id: categoryId },
    { categoryName, iconName },
    { new: true }
  )
    .then((oneCategory) => res.json(oneCategory))
    .catch(handlerError(res));
};
export { create, findAll, findOne, deleteOne, update };
