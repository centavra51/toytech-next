// ToyTech Google Apps Script backend for a bound spreadsheet.
// Deploy as: Web app -> Execute as me -> Anyone with the link.

const SHEET_NAME = 'ToyTech';

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange('A1:B1').setValues([['key', 'value']]);
    sheet.getRange('A1:B1').setFontWeight('bold');
  }

  return sheet;
}

function readStore() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const data = {};

  for (let i = 1; i < rows.length; i++) {
    const key = rows[i][0];
    const rawValue = rows[i][1];

    if (!key) continue;

    try {
      data[key] = JSON.parse(rawValue);
    } catch (_) {
      data[key] = rawValue;
    }
  }

  return data;
}

function writeStoreValue(key, value) {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const serialized = JSON.stringify(value);

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(serialized);
      return;
    }
  }

  sheet.appendRow([key, serialized]);
}

function parsePostBody(e) {
  if (!e) throw new Error('Missing request event');

  if (e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  if (e.parameter && e.parameter.payload) {
    return JSON.parse(e.parameter.payload);
  }

  throw new Error('Request body is empty');
}

function doGet(e) {
  try {
    const data = readStore();

    if (e && e.parameter && e.parameter.key) {
      return response({
        ok: true,
        key: e.parameter.key,
        value: data[e.parameter.key] ?? null,
      });
    }

    return response(data);
  } catch (error) {
    return response({ ok: false, error: error.message });
  }
}

function doPost(e) {
  try {
    const body = parsePostBody(e);
    const key = String(body.key || '').trim();

    if (!key) {
      throw new Error('Missing key');
    }

    writeStoreValue(key, body.value);

    return response({
      ok: true,
      key,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return response({ ok: false, error: error.message });
  }
}

function response(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
