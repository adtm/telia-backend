import express from 'express'

import catController from '../controllers/cat.controller'

// NOTE: we could have done body parsing validation with f.e: Joi
// but because of time I have decided to skip it

const router = express.Router()
router.post("/", catController.addCat)
router.get("/", catController.listCats)
router.get("/search", catController.searchCat)
router.get("/:id", catController.getCatById)
router.delete("/:id", catController.deleteCat)

export default router;
