// Information Separator One: \x1f is used to separate subfields
// Information Separator Two: \x1e is used to separate entries
// Information Separator Three: \x1d is used to separate records

function convertRecords(marcRecords) {
  const separateRecords = marcRecords.split("\x1d");
  const actualRecords = separateRecords.slice(0, separateRecords.length - 1);
  const convertedRecords = [];

  function splitFields(str) {
    let fields = [];
    for (let i = 0; i < str.length; i += 12) {
      fields.push(str.substring(i, i + 3));
    }
    return fields;
  }

  actualRecords.map(record => {
    let newBook = {
      leader: record.slice(0, 24)
    };
    const data = record.slice(24);
    const dataChunks = data.split("\x1e");
    const fieldLabels = splitFields(dataChunks[0]);
    const fieldEntries = dataChunks.slice(1);
    const subfieldArray = [];

    // Map over fields, if subfields exist map over them and create object for each
    fieldEntries.map(entry => {
      let splitEntry;
      let splitObj = {};
      if (entry.indexOf("\x1f") !== -1) {
        splitEntry = entry.split("\x1f");
        let label = splitEntry.splice(0, 1).toString();
        label = label.replace(/ /g, "_");
        splitEntry.map((e, i) => {
          splitEntryLabel = e.slice(0, 1);
          splitEntryData = e.slice(1);
          splitObj[splitEntryLabel] = splitEntryData;
        });
        subfieldArray.push({ [label]: splitObj });
      } else {
        subfieldArray.push(entry);
      }
      return subfieldArray;
    });
    fieldLabels.forEach((val, i) => {
      newBook[val] = subfieldArray[i];
    });
    convertedRecords.push(newBook);
  });
  return convertedRecords;
}

module.exports = convertRecords;
