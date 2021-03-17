require("dotenv").config();

const fs = require("fs").promises;
const nfs = require("fs")
const parse = require("csv-parse/lib/sync");

const gTTS = require("gtts");

const CSV_DEST = process.env.CSV_DEST;
const TEMP_DEST = process.env.TEMP_DEST;
const OLD_DEST = process.env.OLD_DEST;
const NEW_DEST = process.env.NEW_DEST;

const tts = (i, scene, word) => {
  const gtts = new gTTS(word, "en");
  const targetDestination = ""
    if (!nfs.existsSync(targetDestination)) {
      await nfs.mkdirSync(targetDestination);
    }
  gtts.save(`/${scene}/${word}.mp3`, function (err, result) {
    if (err) {
      throw new Error(err);
    }
    console.log("Text to speech converted!");
  });
};
const dataReader = async () => {
  const fileContent = await fs.readFile(CSV_DEST);
  const records = parse(fileContent, { columns: true });
  for (let i = 0; i < records.length; i++) {
    let scene = records[i]["scene"];
    let word = records[i]["word"].trim();
    tts(i, scene, word);
  }
};

const startApp = async () => {
  await dataReader();
};
startApp();
