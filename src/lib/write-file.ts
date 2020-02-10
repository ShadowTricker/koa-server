import * as fs from 'fs';

const writeFile = (path: string, data: any) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({ status: 'SUCCESS' });
            }
        });
    });
}


export default writeFile;