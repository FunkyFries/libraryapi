const fields = [
  {
    "005": "20191201140706.2"
  },
  {
    "007": "t|"
  },
  {
    "008": "160829s2017    nyua   j 6    000 1 eng d"
  },
  {
    "010": {
      __: {
        a: "2016936340"
      }
    }
  },
  {
    "020": {
      __: {
        a: "0545935202",
        q: "hardcover"
      }
    }
  },
  {
    "020": {
      __: {
        a: "9780545935203",
        q: "hardcover"
      }
    }
  },
  {
    "040": {
      __: {
        d: "WiMaMI",
        b: "eng",
        e: "rda"
      }
    }
  },
  {
    "043": {
      __: {
        a: "n-us---"
      }
    }
  },
  {
    "082": {
      "04": {
        "2": "23",
        a: "741.5/973"
      }
    }
  },
  {
    "100": {
      "1_": {
        "4": "aut",
        a: "Pilkey, Dav,",
        d: "1966-",
        e: "illustrator."
      }
    }
  },
  {
    "245": {
      "10": {
        a: "Dog Man unleashed /",
        c:
          "written and illustrated by Dav Pilkey, as George Beard and Harold Hutchins, with interior color by Jose Garibaldi."
      }
    }
  },
  {
    "246": {
      "3_": {
        a: "Tree-house comix proudly presents Dog Man unleashed"
      }
    }
  },
  {
    "250": {
      __: {
        a: "First edition."
      }
    }
  },
  {
    "264": {
      _1: {
        a: "New York, New York :",
        b: "Graphix, an imprint of Scholastic,",
        c: "2017."
      }
    }
  },
  {
    "300": {
      __: {
        a: "220 pages :",
        b: "chiefly color illustrations ;",
        c: "22 cm."
      }
    }
  },
  {
    "336": {
      __: {
        "2": "rdacontent",
        a: "text",
        b: "txt"
      }
    }
  },
  {
    "337": {
      __: {
        "2": "rdamedia",
        a: "unmediated",
        b: "n"
      }
    }
  },
  {
    "338": {
      __: {
        "2": "rdacarrier",
        a: "volume",
        b: "nc"
      }
    }
  },
  {
    "490": {
      "1_": {
        a: "Dog Man ;",
        v: "[2]"
      }
    }
  },
  {
    "520": {
      __: {
        a:
          "Dog Man, the newest hero from the creator of Captain Underpants, is still learning a few tricks of the trade. If only the Chief would throw him a bone every once and a while...Dog Man needs to dry up the drool, dust away the dander, and roll out of the refuse if he's going to impress the Chief, and he needs to do it fast! Petey the cat is out of the bag, and his criminal curiosity is taking the city by storm. Can the canine crime biter unleash justice on this ruffian in time to save the city, or will Petey get away with the purrfect crime?"
      }
    }
  },
  {
    "521": {
      "8_": {
        a: "GN320",
        b: "Lexile."
      }
    }
  },
  {
    "526": {
      "0_": {
        a: "Accelerated Reader",
        b: "LG",
        c: "2.5",
        d: "1.0",
        z: "186901"
      }
    }
  },
  {
    "650": {
      _0: {
        a: "Dogs",
        v: "Comic books, strips, etc."
      }
    }
  },
  {
    "650": {
      _0: {
        a: "Cats",
        v: "Comic books, strips, etc."
      }
    }
  },
  {
    "650": {
      _0: {
        a: "Police",
        v: "Comic books, strips, etc."
      }
    }
  },
  {
    "650": {
      _0: {
        a: "Comic books, strips, etc.",
        z: "United States."
      }
    }
  },
  {
    "650": {
      _0: {
        a: "Graphic novels."
      }
    }
  },
  {
    "655": {
      _7: {
        "2": "lcgft",
        a: "Humorous comics."
      }
    }
  },
  {
    "700": {
      "1_": {
        a: "Garibaldi, Jose,",
        e: "colourist."
      }
    }
  },
  {
    "800": {
      "1_": {
        a: "Pilkey, Dav,",
        d: "1966-",
        t: "Dog Man ;",
        v: "2."
      }
    }
  },
  {
    "852": {
      __: {
        a: "Frederickson",
        h: "FIC",
        i: "PIL",
        p: "123456"
      }
    }
  }
];

const string = JSON.stringify(fields);
console.log(string);

function findValue(obj) {
  for (let key in obj) {
    console.log(obj[key]);
    if (obj[key] === "2016936340") {
      return obj;
    }
  }
}

const res = fields.findIndex(findValue);
console.log(res);
