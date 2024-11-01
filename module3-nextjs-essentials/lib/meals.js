import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}


export async function saveMeal(meal) {
  await new Promise(resolve => setTimeout(resolve, 5000));
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}-${Math.floor(Math.random() * 10000)}.${extension}`
  console.log(fileName)
  const bufferedImage = await meal.image.arrayBuffer();


  const stream = fs.createWriteStream(`public/images/${fileName}`);
  stream.write(Buffer.from(bufferedImage), (err) => {
    if (err) {
      console.log(err)
      throw new Error('Failed to save image!');
    }
  });

  meal.image = `/images/${fileName}`;
  db.prepare(`
    INSERT INTO meals 
      (title, image, slug, instructions, creator, creator_email, summary)
    VALUES (
      @title,
      @image,
      @slug,
      @instructions,
      @creator,
      @creator_email,
      @summary
    )
  `).run(meal);

}