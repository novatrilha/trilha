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
  cv.height = 1000 + extraLinksHeight;
  cv.width = 800;
  const ctx = cv.getContext('2d')!;

  // Gray
  ctx.fillStyle = '#EBEBEB';
  ctx.fillRect(0, 0, cv.width, cv.height);

  const offset = 2;
  ctx.strokeStyle = 'gray';
  ctx.strokeRect(offset, offset, cv.width - 2 * offset, cv.height - 2 * offset);

  const firstLine = 420;
  const firstCol = 30;

  // Black
  ctx.fillStyle = '#1E1E1E';
  ctx.font = '60px Cabin';
  ctx.fillText(capName(cd.nomeUrna), firstCol, firstLine, cv.width - 70);
  ctx.fillText(`(${cd.partido.sigla})`, firstCol, firstLine + 60);
  ctx.fillText(`${cd.numero}`, firstCol + 280, firstLine + 60);

  const secLine = firstLine + 190;
  const itemWidth = 210;

  ctx.font = '45px Cabin';
  ctx.fillText(cap(cd.descricaoSexo), firstCol, secLine);
  ctx.fillText(cap(cd.descricaoCorRaca), firstCol + itemWidth, secLine);
  ctx.fillText(cap(cd.ocupacao), firstCol + itemWidth * 2, secLine, 320);
  ctx.fillText(cd.grauInstrucao, firstCol, secLine + 90);

  const titlesLine = secLine - 40;
  ctx.font = '18px Cabin';

  ctx.fillText('GÊNERO:', firstCol, titlesLine);
  ctx.fillText('ETNIA:', firstCol + itemWidth, titlesLine);
  ctx.fillText('OCUPAÇÃO:', firstCol + itemWidth * 2, titlesLine);
  ctx.fillText('GRAU DE ESCOLARIDADE:', firstCol, titlesLine + 90);

  const thirdLine = secLine + 160;
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
  ctx.drawImage(footerImg, cv.width / 2 - 150, cv.height - 110, 300, 80);

  // Img
  const imgSize = Math.min(img.width, img.height);
  const imgHalf = imgSize / 2;

  ctx.strokeStyle = '#1e1e1e61';
  const centerX = cv.width / 2;
  const centerY = 190

  ctx.arc(centerX, centerY, 160, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.clip();

  const renderImgSize = 320;
  ctx.drawImage(
    img,
    (img.width / 2) - imgHalf,
    (img.height / 2) - imgHalf,
    imgSize,
    imgSize,
    centerX - (renderImgSize / 2),
    30,
    renderImgSize,
    renderImgSize
  );

  ctx.setTransform(2, 0, 0, 2, 0, 0);
  return cv;
}
