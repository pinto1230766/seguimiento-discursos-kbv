import fs from 'fs';
import { createCanvas } from 'canvas';

function createAppIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const s = size / 512;
    
    // Background gradient bleu JW
    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, '#6b8bc3');
    gradient.addColorStop(1, '#4a6fa5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Cercle de fond
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size*0.45, 0, 2*Math.PI);
    ctx.fill();
    
    // Microphone (centre haut)
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4*s;
    
    // Corps du micro
    ctx.beginPath();
    ctx.roundRect((256-25)*s, (160-40)*s, 50*s, 80*s, 25*s);
    ctx.fill();
    
    // Pied du micro
    ctx.fillRect((256-3)*s, (160+40)*s, 6*s, 60*s);
    
    // Base du micro
    ctx.beginPath();
    ctx.ellipse(256*s, (160+110)*s, 35*s, 10*s, 0, 0, 2*Math.PI);
    ctx.fill();
    
    // Ondes sonores
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3*s;
    ctx.beginPath();
    ctx.arc(256*s, 160*s, 45*s, -0.4, 0.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(256*s, 160*s, 65*s, -0.6, 0.6);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    
    // Maison (bas gauche)
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 3*s;
    
    const hx = 160*s, hy = 360*s;
    // Base maison
    ctx.fillRect(hx-25*s, hy-15*s, 50*s, 40*s);
    // Toit
    ctx.beginPath();
    ctx.moveTo(hx-35*s, hy-15*s);
    ctx.lineTo(hx, hy-40*s);
    ctx.lineTo(hx+35*s, hy-15*s);
    ctx.closePath();
    ctx.fill();
    // Porte
    ctx.fillStyle = '#2c5282';
    ctx.fillRect(hx-8*s, hy+10*s, 16*s, 15*s);
    // Fenêtre
    ctx.fillRect(hx+8*s, hy-5*s, 12*s, 12*s);
    
    ctx.shadowBlur = 0;
    
    // Calendrier (bas droite)
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 3*s;
    
    const cx = 352*s, cy = 360*s;
    // Base calendrier
    ctx.beginPath();
    ctx.roundRect(cx-25*s, cy-20*s, 50*s, 45*s, 4*s);
    ctx.fill();
    
    // En-tête calendrier
    ctx.fillStyle = '#2c5282';
    ctx.fillRect(cx-25*s, cy-20*s, 50*s, 12*s);
    
    // Anneaux calendrier
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(cx-12*s, cy-28*s, 3*s, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx+12*s, cy-28*s, 3*s, 0, 2*Math.PI);
    ctx.fill();
    
    // Grille calendrier
    ctx.strokeStyle = '#2c5282';
    ctx.lineWidth = 1*s;
    for(let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(cx-20*s, (cy-8+i*8)*s);
        ctx.lineTo(cx+20*s, (cy-8+i*8)*s);
        ctx.stroke();
    }
    for(let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo((cx-20+i*13)*s, (cy-8)*s);
        ctx.lineTo((cx-20+i*13)*s, (cy+25)*s);
        ctx.stroke();
    }
    
    ctx.shadowBlur = 0;
    
    // Texte de l'app
    ctx.fillStyle = 'white';
    ctx.font = `bold ${24*s}px Arial`;
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 2*s;
    ctx.fillText('KBV-GD-FP', 256*s, 450*s);
    
    return canvas.toBuffer('image/png');
}

// Générer les icônes
const icon192 = createAppIcon(192);
const icon512 = createAppIcon(512);

// Sauvegarder les fichiers
fs.writeFileSync('./public/pwa-192x192.png', icon192);
fs.writeFileSync('./public/pwa-512x512.png', icon512);

console.log('✅ Icônes générées: pwa-192x192.png et pwa-512x512.png');
console.log('📱 Prêtes pour ton Samsung S25 Ultra !');