import sharp from 'sharp';
await sharp('public/social-card.svg').png().toFile('public/social-card.png');
