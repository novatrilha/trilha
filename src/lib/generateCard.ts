function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function capName(s: string) {
  return s.split(' ').map(s => cap(s.toLowerCase())).join(' ')
}

const waitImg = (img: HTMLImageElement) => new Promise((res) => { img.onload = res; })

export async function generateCard(cd: Candidato) {
  const cv = document.createElement('canvas') as HTMLCanvasElement;
  const extraLinksHeight = cd.sites.length * 20;
  cv.height = 650 + extraLinksHeight;
  cv.width = 450;
  const ctx = cv.getContext('2d')!;

  // Gray
  ctx.fillStyle = '#EBEBEB';
  ctx.fillRect(0, 0, cv.width, cv.height);

  const firstLine = 280;
  const firstCol = 30;

  // Black
  ctx.fillStyle = '#1E1E1E';
  ctx.font = '38px Cabin';
  ctx.fillText(capName(cd.nomeUrna), firstCol, firstLine);
  ctx.fillText(`(${cd.partido.sigla})`, firstCol, firstLine + 45);
  ctx.fillText(`${cd.numero}`, firstCol + 160, firstLine + 45);

  const secLine = firstLine + 125;
  const itemWidth = 100;

  ctx.font = '25px Cabin';
  ctx.fillText(cap(cd.descricaoSexo), firstCol, secLine);
  ctx.fillText(cap(cd.descricaoCorRaca), firstCol + itemWidth, secLine);
  ctx.fillText(cap(cd.ocupacao), firstCol + itemWidth * 2, secLine);
  ctx.fillText(cd.grauInstrucao, firstCol, secLine + 60);

  const titlesLine = secLine - 25;
  ctx.font = '13px Cabin';

  ctx.fillText('GÊNERO:', firstCol, titlesLine);
  ctx.fillText('ETNIA:', firstCol + itemWidth, titlesLine);
  ctx.fillText('OCUPAÇÃO:', firstCol + itemWidth * 2, titlesLine);
  ctx.fillText('GRAU DE ESCOLARIDADE:', firstCol, titlesLine + 60);

  const thirdLine = secLine + 110;
  ctx.fillText('SITE:', firstCol, thirdLine);
  if (cd.sites.length === 0) {
    ctx.fillText('Nenhum Site Cadastrado', firstCol, thirdLine + 20);
  }

  cd.sites.forEach((site, index) => {
    ctx.fillText(site, firstCol, thirdLine + 20 * (index + 1), cv.width - 60);
  });

  // Load imgs
  const footerImg = document.createElement('img');
  footerImg.src = '/icons/candidato-card-footer.svg';
  const img = document.createElement('img');
  img.src = cd.fotoUrl;

  await waitImg(img);
  await waitImg(footerImg);
  
  // footer
  ctx.drawImage(footerImg, cv.width / 2 - 103, cv.height - 80, 206, 54);
  
  // Img
  const size = Math.min(img.width, img.height);
  const half = size / 2;

  ctx.strokeStyle = '#1e1e1e61';
  const centerX = cv.width / 2;
  const centerY = 125
  ctx.arc(centerX, centerY, 90, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.clip();
  const imgSize = 190;
  ctx.drawImage(
    img,
    (img.width / 2) - half,
    (img.height / 2) - half,
    size,
    size,
    centerY,
    35,
    imgSize,
    imgSize
  );

  return cv;
}
