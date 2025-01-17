import { Request, Response } from "express";
import { bot } from "../client/bot";
import { MessageMedia } from "whatsapp-web.js";
import { processPhoneNumber } from "../utils/phoneNumber";

export async function SendMessage(req: Request, res: Response): Promise<void> {
  const { phone_number, message } = req.body;

  try {
    const formattedPhoneNumber = processPhoneNumber(phone_number);
    await bot.sendMessage(formattedPhoneNumber, message);
    res.status(200).send({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).send({ error: "Failed to send message" });
  }
}

export async function SendMedia(req: Request, res: Response): Promise<void> {
  const { phone_number, media, message } = req.body;

  try {
    const formattedPhoneNumber = processPhoneNumber(phone_number);
    const mediaFile = await MessageMedia.fromUrl(media);
    await bot.sendMessage(formattedPhoneNumber, mediaFile, {
      caption: message || "",
    });
    res.status(200).send({ message: "Media sent successfully" });
  } catch (err) {
    console.error("Error sending media:", err);
    res.status(500).send({ error: "Failed to send media" });
  }
}

