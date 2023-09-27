const fs = require('fs');
// import { writeFile } from 'fs'; if you are using a typescript file

const environmentFile = `export const environment = {
  apiUrl: "${process.env['API_URL']}",
  production: ${process.env['PRODUCTION']},
};
`;

// Generate environment.ts file
fs.writeFile('./src/environments/environment.ts', environmentFile, function (err: any) {
    if (err) {
        throw console.error(err);
    } else {
        console.log(`Angular environment.ts file generated`);
    }
});