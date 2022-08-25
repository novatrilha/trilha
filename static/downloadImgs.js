import fs from 'fs'
import client from 'https'
import fetch from 'node-fetch'

const dados = JSON.parse(fs.readFileSync('./dados.json'))

function downloadImage(url, filepath) {
  console.log({ url })
  return fetch(url).then(res => res.body.pipe(fs.createWriteStream(filepath)))
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

      }
    });
  });
}

Object.values(dados).forEach(async cargo => {
  for (const cd of cargo.candidatos) {
    const format = cd.fotoUrl.split('.').reverse()[0]
    await downloadImage(cd.fotoUrl, `./photos/${cd.id}.${format}`)
    await new Promise((r) => setTimeout(r, 500))
  }
})