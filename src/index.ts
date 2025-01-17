import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { bot } from "./client/bot";
import { toDataURL } from "qrcode";
import qrcode from "qrcode-terminal";
import router from "./router";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// mutable variable
let QRCodeURL: string | null = null;

// configure express options
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(router)

bot.on("qr", (qr: string) => {
  toDataURL(qr).then((url: string) => {
    QRCodeURL = url;
  });
  qrcode.generate(qr, { small: true });
});

bot.on("ready", () => {
  QRCodeURL = null;
  console.log("Client is ready!");
});

// init bot
bot.initialize();

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "WhatsApp Gateway",
    message: "Welcome to WhatsApp Gateway!",
  });
});

app.get("/qrcode", async (req: Request, res: Response) => {
  if (QRCodeURL) {
    res.render("qrcode", {
      qrimage: QRCodeURL,
    });
  } else {
    setTimeout(() => {
      res.render("qrcode", {
        qrimage: QRCodeURL,
      });
    }, 5000);
  }
});

app.listen(port, () => {
  console.log(`app is running on port : ${port}`);
});
