const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const convertRecords = require("./marc-to-json");
const bookRoutes = require("./routes/books");

const marcRecords =
  "01995cam a2200397 i 450000500170000000700030001700800410002001000150006102000260007602000290010204000210013104300120015208200180016410000520018224501400023424600560037425000190043026400680044930000550051733600260057233700280059833800270062649000190065352005500067252100190122252600450124165000360128665000360132265000380135865000460139665000200144265500280146270000330149080000390152385200350156220191201140706.2t|160829s2017    nyua   j 6    000 1 eng d  a2016936340  a0545935202qhardcover  a9780545935203qhardcover  dWiMaMIbengerda  an-us---04a741.5/9732231 aPilkey, Dav,d1966-eauthor,eillustrator.4aut10aDog Man unleashed /cwritten and illustrated by Dav Pilkey, as George Beard and Harold Hutchins, with interior color by Jose Garibaldi.3 aTree-house comix proudly presents Dog Man unleashed  aFirst edition. 1aNew York, New York :bGraphix, an imprint of Scholastic,c2017.  a220 pages :bchiefly color illustrations ;c22 cm.  atextbtxt2rdacontent  aunmediatedbn2rdamedia  avolumebnc2rdacarrier1 aDog Man ;v[2]  aDog Man, the newest hero from the creator of Captain Underpants, is still learning a few tricks of the trade. If only the Chief would throw him a bone every once and a while...Dog Man needs to dry up the drool, dust away the dander, and roll out of the refuse if he's going to impress the Chief, and he needs to do it fast! Petey the cat is out of the bag, and his criminal curiosity is taking the city by storm. Can the canine crime biter unleash justice on this ruffian in time to save the city, or will Petey get away with the purrfect crime?8 aGN320bLexile.0 aAccelerated ReaderbLGc2.5d1.0z186901 0aDogsvComic books, strips, etc. 0aCatsvComic books, strips, etc. 0aPolicevComic books, strips, etc. 0aComic books, strips, etc.zUnited States. 0aGraphic novels. 7aHumorous comics.2lcgft1 aGaribaldi, Jose,ecolourist.1 aPilkey, Dav,d1966-tDog Man ;v2.  aFredericksonhFICiPILp12345601709cam a2200433 i 450000500170000000700030001700800410002001000170006102000260007802000320010402000290013602000350016504000210020005000250022108200180024610000470026424501490031124600240046025000190048426400680050330000550057133600260062633700280065233800270068050000400070752001560074752100090090352600450091265000360095765000360099365000400102965000190106965000190108865500350110765500290114265500280117170000320119985200440123120191201140729.7t|171214s2018    nyua   j 6    000 1 eng d  abl2017051830  a0545935180qhardcover  a1338230379qlibrary binding  a9780545935180qhardcover  a9781338230376qlibrary binding  dWiMaMIbengerda14aPZ7.7.P538bDoc 201804a741.5/9732231 aPilkey, Dav,d1966-eauthor,eartist.4aut10aDog Man.n[4],pDog Man and Cat Kid /cwritten and illustrated by Dav Pilkey as George Beard and Harold Hutchins ; with color by Jose Garibaldi.30aDog Man and Cat Kid  aFirst edition. 1aNew York, New York :bGraphix, an imprint of Scholastic,c2018.  a253 pages :bchiefly color illustrations ;c22 cm.  atextbtxt2rdacontent  aunmediatedbn2rdamedia  avolumebnc2rdacarrier  a'Treehouse Comix proudly presents.'  aWhen a new sitter arrives and a movie star goes missing, Dog Man and Cat Kid investigate, but Petey, the world's most evil cat, complicates their case.2 a234.0 aAccelerated ReaderbLGc2.6d0.5z192899 0aDogsvComic books, strips, etc. 0aCatsvComic books, strips, etc. 1aAdventure and adventurersvFiction. 1aDogsvFiction. 1aCatsvFiction. 7aComics (Graphic works)2lcgft. 7aHumorous comics.2lcgft. 7aGraphic novels.2lcgft.1 aGaribaldi, Jose,ecolorist.  aFredericksonhFICiPILp190859083908951";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost/libraryapi", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error(err.message));

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send(convertRecords(marcRecords));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
