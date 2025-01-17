import express from "express";
import { SendMedia, SendMessage } from "./controller/message-controller";
import { Token } from "./middleware/token";
import { validateSchema } from "./middleware/validation";
import { messageValidation } from "./validation/message-validation";

const router = express.Router();

router.post("/send-message",validateSchema(messageValidation), Token, SendMessage);
router.post("/send-media", Token, SendMedia);

export default router;
