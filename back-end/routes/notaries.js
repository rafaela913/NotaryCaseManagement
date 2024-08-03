import express from 'express';
import * as notaryController from "../controllers/notaries.js";

export const router = express.Router();

router.get("/", notaryController.getNotaries);
router.get("/:notaryId", notaryController.getNotaryById);

router.post("/", notaryController.createNotary);
router.put("/:notaryId", notaryController.updateNotary);
router.delete("/:notaryId", notaryController.deleteNotary);


router.get("/:notaryId/clients", notaryController.getClientsFromNotary);
router.post("/:notaryId/clients/:clientId", notaryController.addClientToNotary);