import { Request, Response } from "express";
import errors from "../errors/errors";
import catModel from "../models/cat.model";
import {
  Cat,
  DeleteCatQueryParams,
  GetCatByIdQueryParams,
  ListCatQueryParams,
  PageOffset,
  PageSort,
  SearchCatQueryParams,
} from "../types";

const addCat = async (req: Request, res: Response) => {
  try {
    const requestBody = req.body as Cat;
    await catModel.add(requestBody);
    res.sendStatus(201);
  } catch (err) {
    errors.sendResponseError(err, res);
  }
};

const getCatById = async (
  req: Request<GetCatByIdQueryParams>,
  res: Response,
) => {
  try {
    const catId = req.params.id;
    const result = await catModel.getById(catId);
    res.status(200).send(result);
  } catch (err) {
    errors.sendResponseError(err, res);
  }
};

const listCats = async (
  req: Request<{}, {}, {}, ListCatQueryParams>,
  res: Response,
) => {
  try {
    const pageSort = formPageSorting(req.query.field, req.query.direction);
    const pageOffset = formPageOffset(req.query.offset, req.query.limit);
    const result = await catModel.listAll(pageOffset, pageSort);
    res.status(200).send(result);
  } catch (err) {
    console.log(err)
    errors.sendResponseError(err, res);
  }
};

const searchCat = async (
  req: Request<{}, {}, {}, SearchCatQueryParams>,
  res: Response,
) => {
  try {
    const name = req.query?.name || "";
    const result = await catModel.searchByName(name);
    res.status(200).send(result);
  } catch (err) {
    errors.sendResponseError(err, res);
  }
};

const deleteCat = async (req: Request<DeleteCatQueryParams>, res: Response) => {
  try {
    const catId = req.params.id;
    await catModel.deleteById(catId);
    res.sendStatus(200);
  } catch (err) {
    errors.sendResponseError(err, res);
  }
};

const formPageOffset = (offset = "0", limit = "10"): PageOffset => ({
  offset: parseInt(offset),
  limit: Math.min(parseInt(limit), 100),
});

const formPageSorting = (field: string = "name" , direction?: string): PageSort => {
  const sortDirection = direction === "ASC" ? direction : "DESC";
  return { field, direction: sortDirection }
};

export default {
  getCatById,
  addCat,
  listCats,
  searchCat,
  deleteCat,
};
