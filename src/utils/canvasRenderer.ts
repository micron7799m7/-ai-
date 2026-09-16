import { PromotionProject, RatioType } from '../types';

export function getRatioDimensions(ratio: RatioType): { width: number; height: number; label: string } {
  switch (ratio) {
    case '1:1':
      return { width: 1080, height: 1080, label: '1:1 (SNS 피드/당근)' };
    case '4:5':
      return { width: 1080, height: 1350, label: '4:5 (인스타그램)' };
    case '9:16':
      return { width: 1080, height: 1920, label: '9:16 (스토리/쇼츠)' };
    case '16:9':
      return { width: 1920, height: 1080, label: '16:9 (가로형/현수막)' };
    case 'A4':
      return { width: 1240, height: 1754, label: 'A4 (인쇄용 전단지)' };
    default:
      return { width: 1080, height: 1080, label: '1:1 정방형' };
  }
}

export async function renderProjectToCanvas(
  project: PromotionProject,
  targetCanvas: HTMLCanvasElement,
  options: { isPro?: boolean } = {}
): Promise<void> {
  const { width, height } = getRatioDimensions(project.ratio);
  targetCanvas.width = width;
  targetCanvas.height = height;

  const ctx = targetCanvas.getContext('2d');
  if (!ctx) return;

  // 1. Background Fill
  let bgColor = '#FFFFFF';
  let textColor = '#111827';
  let accentColor = project.accentColor || '#F59E0B';
  let primaryColor = project.primaryColor || '#2563EB';

  if (project.bgTheme === 'red') {
    bgColor = '#991B1B';
    textColor = '#FFFFFF';
  } else if (project.bgTheme === 'dark') {
    bgColor = '#0F172A';
    textColor = '#F8FAFC';
  } else if (project.bgTheme === 'warm') {
    bgColor = '#FFFBEB';
    textColor = '#451A03';
  } else {
    bgColor = '#F8FAFC';
    textColor = '#0F172A';
  }

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 2. Load & Draw Image
  let imgLoaded = false;
  if (project.photoUrl) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // continue even if image fails
        img.src = project.photoUrl;
      });

      if (img.width > 0) {
        imgLoaded = true;
        // Calculate image area based on ratio
        let imgHeight = height * 0.45;
        if (project.ratio === '16:9') imgHeight = height * 0.7;
        if (project.ratio === '9:16') imgHeight = height * 0.48;

        // Draw image cover into rect
        const targetX = 40;
        const targetY = 120;
        const targetW = width - 80;
        const targetH = imgHeight;

        ctx.save();
        // Rounded corners for photo
        roundRect(ctx, targetX, targetY, targetW, targetH, 28);
        ctx.clip();

        // Object cover math
        const hRatio = targetW / img.width;
        const vRatio = targetH / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (targetW - img.width * ratio) / 2;
        const centerShiftY = (targetH - img.height * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          targetX + centerShiftX,
          targetY + centerShiftY,
          img.width * ratio,
          img.height * ratio
        );
        ctx.restore();
      }
    } catch (e) {
      console.warn('Canvas image load warning:', e);
    }
  }

  // 3. Header: Store Name & Category Badge
  ctx.save();
  ctx.fillStyle = primaryColor;
  roundRect(ctx, 40, 40, 180, 52, 14);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(project.category || '홍보특가', 130, 66);

  ctx.textAlign = 'left';
  ctx.fillStyle = project.bgTheme === 'red' || project.bgTheme === 'dark' ? '#F1F5F9' : '#334155';
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
  ctx.fillText(project.storeName, 240, 66);
  ctx.restore();

  // 4. Content Area
  const textStartY = imgLoaded ? (height * 0.45) + 160 : 200;

  // Price Badge Pill
  if (project.priceBadge) {
    ctx.save();
    ctx.fillStyle = accentColor;
    const badgeWidth = Math.min(width - 120, 480);
    roundRect(ctx, 40, textStartY, badgeWidth, 68, 16);
    ctx.fill();

    ctx.fillStyle = project.bgTheme === 'red' ? '#991B1B' : '#0F172A';
    ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`★ ${project.priceBadge}`, 40 + (badgeWidth / 2), textStartY + 34);
    ctx.restore();
  }

  // Headline
  ctx.save();
  ctx.fillStyle = textColor;
  ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  const headlineY = project.priceBadge ? textStartY + 90 : textStartY;
  wrapText(ctx, project.headline, 40, headlineY, width - 80, 64, 2);
  ctx.restore();

  // Subheadline
  ctx.save();
  ctx.fillStyle = project.bgTheme === 'red' || project.bgTheme === 'dark' ? '#E2E8F0' : '#475569';
  ctx.font = '600 30px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
  wrapText(ctx, project.subheadline, 40, headlineY + 140, width - 80, 40, 2);
  ctx.restore();

  // Body text
  if (project.bodyCopy && height > 1100) {
    ctx.save();
    ctx.fillStyle = project.bgTheme === 'red' || project.bgTheme === 'dark' ? '#CBD5E1' : '#64748B';
    ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
    wrapText(ctx, project.bodyCopy, 40, headlineY + 230, width - 80, 36, 3);
    ctx.restore();
  }

  // 5. Footer CTA Bar & Contact Info
  const footerH = 140;
  const footerY = height - footerH - 40;

  ctx.save();
  ctx.fillStyle = primaryColor;
  roundRect(ctx, 40, footerY, width - 80, footerH, 24);
  ctx.fill();

  // CTA Button Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(project.cta || '지금 방문하세요', width / 2, footerY + 50);

  // Phone & Address
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif';
  const contactString = [project.phone ? `☎ ${project.phone}` : '', project.address ? `📍 ${project.address}` : '']
    .filter(Boolean)
    .join('  |  ');
  ctx.fillText(contactString || `${project.storeName} 찾아오시는 길`, width / 2, footerY + 100);
  ctx.restore();

  // Watermark for free plan
  if (!options.isPro) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(width - 240, 40, 200, 34);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('사장님 AI 홍보실 무료버전', width - 140, 62);
    ctx.restore();
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 3
) {
  if (!text) return;
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let linesCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
      linesCount++;
      if (linesCount >= maxLines - 1 && n < words.length - 1) {
        // truncate with ellipsis if last line
        const remaining = words.slice(n).join(' ');
        ctx.fillText(remaining.length > 25 ? remaining.slice(0, 23) + '...' : remaining, x, currentY);
        return;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string, mimeType: 'image/jpeg' | 'image/png' = 'image/jpeg') {
  try {
    const dataUrl = canvas.toDataURL(mimeType, 0.95);
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.warn('Canvas direct toDataURL export fallback triggered:', err);
    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas blob generation returned null');
        }
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      }, mimeType, 0.95);
    } catch (blobErr) {
      console.error('All canvas download methods failed:', blobErr);
      alert('이미지 저장 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  }
}
