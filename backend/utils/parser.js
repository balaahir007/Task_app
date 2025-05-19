import fs from 'fs';
import { parse } from 'fast-csv';

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(parse({ headers: true, trim: true }))
      .on('error', error => reject(error))
      .on('data', row => {
        // You can add row validation here if needed
        rows.push(row);
      })
      .on('end', rowCount => resolve(rows));
  });
};
