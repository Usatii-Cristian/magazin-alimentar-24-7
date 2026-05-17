const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
    .replace(/ș/g, 's').replace(/ş/g, 's')
    .replace(/ț/g, 't').replace(/ţ/g, 't')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function main() {
  console.log('🌱 Pornire seed...')

  await prisma.product.deleteMany()
  await prisma.subcategory.deleteMany()
  await prisma.category.deleteMany()
  await prisma.blog.deleteMany()

  // ── Categorii ──────────────────────────────────────────────────────────────
  const fainoase  = await prisma.category.create({ data: { name: 'Făinoase' } })
  const lactate   = await prisma.category.create({ data: { name: 'Lactate' } })
  const oua       = await prisma.category.create({ data: { name: 'Ouă' } })
  const legume    = await prisma.category.create({ data: { name: 'Legume' } })
  const fructe    = await prisma.category.create({ data: { name: 'Fructe' } })
  const carne     = await prisma.category.create({ data: { name: 'Carne și Mezeluri' } })
  const conserve  = await prisma.category.create({ data: { name: 'Conserve' } })
  const bauturi   = await prisma.category.create({ data: { name: 'Băuturi' } })
  const dulciuri  = await prisma.category.create({ data: { name: 'Dulciuri' } })
  const condimente = await prisma.category.create({ data: { name: 'Condimente și Uleiuri' } })

  // ── Produse ────────────────────────────────────────────────────────────────
  await prisma.product.createMany({
    data: [

      // ── FĂINOASE ──────────────────────────────────────────────────────────
      {
        name: 'Pâine albă feliată', slug: slugify('Pâine albă feliată'), price: 4.5, oldPrice: 5.0,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Pâine', isBest: true, isDiscount: true,
        description: 'Pâine albă feliată, coaptă tradițional din făină de grâu selectată. Feliată uniform pentru confortul tău zilnic — ideală pentru sandvișuri, prăjit sau consumată simplă cu unt proaspăt.',
        ingredients: 'Făină de grâu (tip 550), apă, drojdie, sare, zahăr, ulei vegetal.',
        nutrition: { per: '100g', energy: 265, protein: 8.5, fat: 2.8, saturatedFat: 0.6, carbs: 50, sugars: 3.2, fiber: 2.5, salt: 1.2 },
      },
      {
        name: 'Pâine integrală', slug: slugify('Pâine integrală'), price: 5.5,
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Pâine', isBest: true, isDiscount: false,
        description: 'Pâine integrală preparată din făină completă de grâu, bogată în fibre naturale. O alegere sănătoasă pentru o digestie mai bună și energie susținută pe parcursul zilei.',
        ingredients: 'Făină integrală de grâu, apă, drojdie, sare, semințe de in, semințe de floarea-soarelui.',
        nutrition: { per: '100g', energy: 242, protein: 9.5, fat: 3.2, saturatedFat: 0.5, carbs: 43, sugars: 2.1, fiber: 7.5, salt: 0.9 },
      },
      {
        name: 'Pâine cu maia', slug: slugify('Pâine cu maia'), price: 7.0,
        image: 'https://images.unsplash.com/photo-1534432182912-63863115e106?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Pâine', isBest: true, isDiscount: false,
        description: 'Pâine artizanală cu maia naturală, fermentată lent 18 ore. Crustă crocantă, interior pufos și aerat, gust ușor acrișor caracteristic. Fără drojdie industrială sau aditivi.',
        ingredients: 'Făină de grâu (tip 650), apă, maia naturală, sare.',
        nutrition: { per: '100g', energy: 255, protein: 9.0, fat: 1.5, saturatedFat: 0.3, carbs: 51, sugars: 1.0, fiber: 3.2, salt: 1.0 },
      },
      {
        name: 'Cornuri cu mac', slug: slugify('Cornuri cu mac'), price: 2.5, oldPrice: 3.0,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Patiserie', isBest: false, isDiscount: true,
        description: 'Cornuri pufoase cu umplutură de mac, coapte proaspăt în fiecare dimineață. Aluatul fraged și umplutura aromată fac din acestea o răsfățare perfectă la micul dejun sau ca gustare.',
        ingredients: 'Făină de grâu, apă, drojdie, zahăr, unt (10%), ouă, mac (8%), lapte praf, sare.',
        nutrition: { per: '100g', energy: 378, protein: 7.2, fat: 14.5, saturatedFat: 6.1, carbs: 55, sugars: 12, fiber: 3.1, salt: 0.8 },
      },
      {
        name: 'Croissant cu unt', slug: slugify('Croissant cu unt'), price: 3.5,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Patiserie', isBest: false, isDiscount: false,
        description: 'Croissant clasic cu unt, cu aluat foietaj stratificat, crocant la exterior și fraged în interior. Copt proaspăt zilnic. Perfect cu gem, miere sau pur și simplu ca atare.',
        ingredients: 'Făină de grâu, unt (25%), apă, zahăr, drojdie, sare, lapte praf.',
        nutrition: { per: '100g', energy: 406, protein: 8.1, fat: 22.0, saturatedFat: 13.5, carbs: 45, sugars: 8.0, fiber: 1.8, salt: 1.0 },
      },
      {
        name: 'Paste fusilli 500g', slug: slugify('Paste fusilli 500g'), price: 3.8,
        image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Paste', isBest: false, isDiscount: false,
        description: 'Paste fusilli din grâu dur de calitate superioară, cu suprafață spiralată care reține perfect sosurile. Timp de fierbere 8–10 minute. Ideale cu sos de roșii, pesto sau în salate reci.',
        ingredients: 'Făină de grâu dur (semolina), apă.',
        nutrition: { per: '100g (uscat)', energy: 352, protein: 12.5, fat: 1.5, saturatedFat: 0.3, carbs: 71, sugars: 2.5, fiber: 3.0, salt: 0.01 },
      },
      {
        name: 'Spaghete 500g', slug: slugify('Spaghete 500g'), price: 3.5, oldPrice: 4.2,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Paste', isBest: false, isDiscount: true,
        description: 'Spaghete clasice nr. 5 din grâu dur, cu timp de fierbere 9-11 minute. Perfecte cu sos bolognese, carbonara, aglio e olio sau orice sos preferat.',
        ingredients: 'Grâu dur (semolina), apă.',
        nutrition: { per: '100g (uscat)', energy: 356, protein: 13.0, fat: 1.8, saturatedFat: 0.4, carbs: 70, sugars: 2.0, fiber: 2.8, salt: 0.01 },
      },
      {
        name: 'Făină albă de grâu 1kg', slug: slugify('Faina alba de grau 1kg'), price: 3.2,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Făinuri', isBest: false, isDiscount: false,
        description: 'Făină albă de grâu tip 550, fină și albă, ideală pentru pâine albă, cozonac, prăjituri, pizza și paste de casă. Proteică și cu o putere bună de absorbție a apei.',
        ingredients: 'Făină de grâu tip 550.',
        nutrition: { per: '100g', energy: 340, protein: 10.0, fat: 1.2, saturatedFat: 0.2, carbs: 72, sugars: 0.5, fiber: 2.5, salt: 0.01 },
      },

      // ── LACTATE ───────────────────────────────────────────────────────────
      {
        name: 'Lapte integral 1L', slug: slugify('Lapte integral 1L'), price: 6.5,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Lapte', isBest: true, isDiscount: false,
        description: 'Lapte integral pasteurizat, colectat de la ferme locale. Conținut de grăsime min. 3,5%. Bogat în calciu, vitamina D și proteine complete.',
        ingredients: 'Lapte de vacă integral pasteurizat.',
        nutrition: { per: '100ml', energy: 65, protein: 3.2, fat: 3.6, saturatedFat: 2.3, carbs: 4.7, sugars: 4.7, fiber: 0, salt: 0.1 },
      },
      {
        name: 'Lapte semidegresat 1L', slug: slugify('Lapte semidegresat 1L'), price: 5.9, oldPrice: 6.5,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Lapte', isBest: false, isDiscount: true,
        description: 'Lapte semidegresat pasteurizat cu 1,5% grăsime. Aceleași beneficii nutritive ca laptele integral — calciu, proteine, vitamine — cu mai puține calorii. Ideal pentru cei care monitorizează aportul de grăsimi.',
        ingredients: 'Lapte de vacă semidegresat pasteurizat.',
        nutrition: { per: '100ml', energy: 46, protein: 3.4, fat: 1.5, saturatedFat: 1.0, carbs: 4.8, sugars: 4.8, fiber: 0, salt: 0.1 },
      },
      {
        name: 'Iaurt natural 400g', slug: slugify('Iaurt natural 400g'), price: 3.2, oldPrice: 3.8,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Iaurt', isBest: false, isDiscount: true,
        description: 'Iaurt natural gras, fermentat tradițional cu culturi vii de bacterii lactice. Fără aditivi, fără conservanți, fără arome artificiale. Cremos, ușor acrișor — perfect simplu, cu fructe sau în rețete.',
        ingredients: 'Lapte de vacă integral, culturi vii (Lactobacillus bulgaricus, Streptococcus thermophilus).',
        nutrition: { per: '100g', energy: 61, protein: 3.5, fat: 3.5, saturatedFat: 2.2, carbs: 4.7, sugars: 4.7, fiber: 0, salt: 0.1 },
      },
      {
        name: 'Iaurt grecesc 500g', slug: slugify('Iaurt grecesc 500g'), price: 8.5,
        image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Iaurt', isBest: true, isDiscount: false,
        description: 'Iaurt grecesc dens, strecurat tradițional pentru a elimina zerul. Conținut ridicat de proteine (10g/100g). Textură cremoasă, gust echilibrat ușor acrișor. Ideal cu miere, nuci sau fructe de pădure.',
        ingredients: 'Lapte de vacă integral concentrat, culturi vii (Lactobacillus bulgaricus, Streptococcus thermophilus).',
        nutrition: { per: '100g', energy: 97, protein: 10.0, fat: 5.0, saturatedFat: 3.3, carbs: 3.5, sugars: 3.5, fiber: 0, salt: 0.07 },
      },
      {
        name: 'Brânză telemea 300g', slug: slugify('Brânză telemea 300g'), price: 12.5,
        image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Brânzeturi', isBest: true, isDiscount: false,
        description: 'Telemea de vacă maturată min. 30 de zile în saramură, după rețeta tradițională. Textură fermă, gust sărat și ușor acid. Perfectă în salate, cu roșii și castraveți sau la micul dejun.',
        ingredients: 'Lapte de vacă pasteurizat, sare, cheag, culturi lactice. Conservant: E252.',
        nutrition: { per: '100g', energy: 258, protein: 16.0, fat: 21.0, saturatedFat: 14.0, carbs: 1.8, sugars: 0.5, fiber: 0, salt: 3.2 },
      },
      {
        name: 'Caș proaspăt 400g', slug: slugify('Cas proaspat 400g'), price: 10.0,
        image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Brânzeturi', isBest: false, isDiscount: false,
        description: 'Caș proaspăt de vacă, nepresat, cu textură moale și gust lăptos delicat. Excelent la micul dejun cu miere, în plăcinte, sau ca ingredient în diverse preparate tradiționale.',
        ingredients: 'Lapte de vacă pasteurizat, cheag, culturi lactice, sare.',
        nutrition: { per: '100g', energy: 110, protein: 12.0, fat: 6.0, saturatedFat: 4.0, carbs: 2.5, sugars: 2.5, fiber: 0, salt: 0.5 },
      },
      {
        name: 'Unt 82% 200g', slug: slugify('Unt 82% 200g'), price: 9.5, oldPrice: 11.0,
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Unt', isBest: false, isDiscount: true,
        description: 'Unt din smântână de vacă cu 82% grăsime, nesărat. Gust bogat și cremos, culoare galbenă naturală. Ideal pentru tartine, copt sau gătit. Se topește uniform și are punctul de fum potrivit pentru prăjire ușoară.',
        ingredients: 'Smântână din lapte de vacă pasteurizat.',
        nutrition: { per: '100g', energy: 717, protein: 0.6, fat: 82.0, saturatedFat: 54.0, carbs: 0.5, sugars: 0.5, fiber: 0, salt: 0.01 },
      },
      {
        name: 'Smântână 20% 400g', slug: slugify('Smântână 20% 400g'), price: 7.0, oldPrice: 8.0,
        image: 'https://images.pexels.com/photos/6941022/pexels-photo-6941022.jpeg?w=600&auto=compress&cs=tinysrgb',
        categoryId: lactate.id, subcategory: 'Smântână', isBest: false, isDiscount: true,
        description: 'Smântână proaspătă cu 20% grăsime, obținută din lapte de vacă colectat local. Consistentă și cremoasă, ideală pentru supe, tocănițe, dressing sau deserturi.',
        ingredients: 'Smântână din lapte de vacă pasteurizat, culturi lactice.',
        nutrition: { per: '100g', energy: 205, protein: 2.8, fat: 20.0, saturatedFat: 13.0, carbs: 3.4, sugars: 3.4, fiber: 0, salt: 0.09 },
      },

      // ── OUĂ ──────────────────────────────────────────────────────────────
      {
        name: 'Ouă de găină 10 buc', slug: slugify('Oua de gaina 10 buc'), price: 8.5,
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80&auto=format&fit=crop',
        categoryId: oua.id, subcategory: 'Ouă de găină', isBest: true, isDiscount: false,
        description: 'Ouă proaspete de găină, clasa A, mărimea M. Colectate zilnic de la ferme locale cu păsări crescute în condiții naturale. Gălbenușul intens colorat este un indicator al calității superioare.',
        nutrition: { per: '1 ou (~55g)', energy: 78, protein: 6.3, fat: 5.3, saturatedFat: 1.6, carbs: 0.6, sugars: 0.3, fiber: 0, salt: 0.2 },
      },
      {
        name: 'Ouă ecologice 6 buc', slug: slugify('Oua ecologice 6 buc'), price: 9.0, oldPrice: 10.5,
        image: 'https://images.pexels.com/photos/6294248/pexels-photo-6294248.jpeg?w=600&auto=compress&cs=tinysrgb',
        categoryId: oua.id, subcategory: 'Ouă ecologice', isBest: false, isDiscount: true,
        description: 'Ouă ecologice certificate BIO, de la găini crescute în aer liber, hrănite exclusiv cu furaje naturale fără pesticide sau aditivi chimici.',
        nutrition: { per: '1 ou (~60g)', energy: 85, protein: 7.0, fat: 5.8, saturatedFat: 1.8, carbs: 0.7, sugars: 0.4, fiber: 0, salt: 0.2 },
      },
      {
        name: 'Ouă de rață 6 buc', slug: slugify('Oua de rata 6 buc'), price: 11.0,
        image: 'https://images.unsplash.com/photo-1569288052389-dac9b01ac769?w=600&q=80&auto=format&fit=crop',
        categoryId: oua.id, subcategory: 'Ouă de rață', isBest: false, isDiscount: false,
        description: 'Ouă proaspete de rață, cu gălbenuș mare și bogat. Au un gust mai intens decât ouăle de găină și mai multă proteină. Excelente pentru cozonac, prăjituri sau omleta bogată.',
        nutrition: { per: '1 ou (~70g)', energy: 105, protein: 7.5, fat: 7.8, saturatedFat: 2.1, carbs: 0.8, sugars: 0.4, fiber: 0, salt: 0.25 },
      },

      // ── LEGUME ────────────────────────────────────────────────────────────
      {
        name: 'Roșii cherry 500g', slug: slugify('Rosii cherry 500g'), price: 7.5,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80&auto=format&fit=crop',
        categoryId: legume.id, subcategory: 'Roșii', isBest: true, isDiscount: false,
        description: 'Roșii cherry dulci și zemoase, cultivate natural. Perfecte în salate, ca gustare sau drept decor pentru preparate. Recoltate la maturitate deplină pentru un gust intens și o culoare vibrantă.',
        nutrition: { per: '100g', energy: 18, protein: 0.9, fat: 0.2, saturatedFat: 0.0, carbs: 3.5, sugars: 2.6, fiber: 1.2, salt: 0.01 },
      },
      {
        name: 'Castraveți 1kg', slug: slugify('Castraveti 1kg'), price: 5.0, oldPrice: 6.0,
        image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&q=80&auto=format&fit=crop',
        categoryId: legume.id, subcategory: 'Castraveți', isBest: false, isDiscount: true,
        description: 'Castraveți proaspeți, crocanți și hidratanți. Cu un conținut de apă de 96%, sunt ideali pentru salate, murături sau consumați simplu cu sare și ulei de măsline.',
        nutrition: { per: '100g', energy: 15, protein: 0.6, fat: 0.1, saturatedFat: 0.0, carbs: 3.1, sugars: 1.7, fiber: 0.5, salt: 0.01 },
      },
      {
        name: 'Ardei capia 1kg', slug: slugify('Ardei capia 1kg'), price: 9.0,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80&auto=format&fit=crop',
        categoryId: legume.id, subcategory: 'Ardei', isBest: false, isDiscount: false,
        description: 'Ardei capia roșii, dulci și cărnosi. Excelenți pentru copt, salate, tocănițe sau consumați cruzi. Bogați în vitamina C și antioxidanți. Recoltați la maturitate deplină.',
        nutrition: { per: '100g', energy: 31, protein: 1.0, fat: 0.3, saturatedFat: 0.0, carbs: 6.0, sugars: 4.2, fiber: 2.1, salt: 0.01 },
      },
      {
        name: 'Morcovi 1kg', slug: slugify('Morcovi 1kg'), price: 4.5,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80&auto=format&fit=crop',
        categoryId: legume.id, subcategory: 'Rădăcinoase', isBest: false, isDiscount: false,
        description: 'Morcovi proaspeți, dulci și suculenți, bogați în beta-caroten și vitamina A. Ideali pentru supe, salate, sucuri sau consumați ca snack sănătos. Recoltați din culturi locale.',
        nutrition: { per: '100g', energy: 41, protein: 0.9, fat: 0.2, saturatedFat: 0.0, carbs: 9.6, sugars: 4.7, fiber: 2.8, salt: 0.07 },
      },
      {
        name: 'Ceapă galbenă 1kg', slug: slugify('Ceapa galbena 1kg'), price: 3.5, oldPrice: 4.0,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80&auto=format&fit=crop',
        categoryId: legume.id, subcategory: 'Ceapă', isBest: false, isDiscount: true,
        description: 'Ceapă galbenă autohtonă, cu coajă brun-aurie și gust pronunțat. Ingredient de bază în bucătăria românească. Perfectă pentru călire, ciorbe, tocănițe sau consumată crudă în salate.',
        nutrition: { per: '100g', energy: 40, protein: 1.1, fat: 0.1, saturatedFat: 0.0, carbs: 9.3, sugars: 4.2, fiber: 1.7, salt: 0.01 },
      },
      {
        name: 'Cartofi albi 2kg', slug: slugify('Cartofi albi 2kg'), price: 6.0,
        image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=600&q=80&auto=format&fit=crop',
        categoryId: legume.id, subcategory: 'Cartofi', isBest: true, isDiscount: false,
        description: 'Cartofi albi de calitate, cultivați local. Versatili la gătit — fierți, prăjiți, la cuptor sau piure. Bogați în amidon, potasiu și vitamina C. Recoltați toamna și păstrați în condiții optime.',
        nutrition: { per: '100g (fiert)', energy: 87, protein: 1.9, fat: 0.1, saturatedFat: 0.0, carbs: 20.0, sugars: 0.9, fiber: 1.8, salt: 0.01 },
      },
      {
        name: 'Salată verde', slug: slugify('Salata verde'), price: 3.0,
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=80&auto=format&fit=crop',
        categoryId: legume.id, subcategory: 'Salate', isBest: false, isDiscount: false,
        description: 'Salată verde fragedă, proaspăt recoltată. Frunze crocante, de culoare verde intens, cu gust delicat. Baza perfectă pentru orice salată sau garnitură. Bogată în acid folic și vitamina K.',
        nutrition: { per: '100g', energy: 15, protein: 1.4, fat: 0.2, saturatedFat: 0.0, carbs: 2.3, sugars: 1.2, fiber: 2.1, salt: 0.03 },
      },

      // ── FRUCTE ────────────────────────────────────────────────────────────
      {
        name: 'Mere ionatan 1kg', slug: slugify('Mere ionatan 1kg'), price: 5.5,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80&auto=format&fit=crop',
        categoryId: fructe.id, subcategory: 'Mere', isBest: true, isDiscount: false,
        description: 'Mere ionatan autohtone, cu coajă roșie-verde și gust dulce-acrișor echilibrat. Crocante, zemoase, ideale pentru consum direct, strudel, mere coapte sau suc proaspăt.',
        nutrition: { per: '100g', energy: 52, protein: 0.3, fat: 0.2, saturatedFat: 0.0, carbs: 14.0, sugars: 10.4, fiber: 2.4, salt: 0.01 },
      },
      {
        name: 'Portocale 1kg', slug: slugify('Portocale 1kg'), price: 6.5, oldPrice: 8.0,
        image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&q=80&auto=format&fit=crop',
        categoryId: fructe.id, subcategory: 'Citrice', isBest: false, isDiscount: true,
        description: 'Portocale zemoase și dulci, bogate în vitamina C și antioxidanți. Perfecte pentru consum direct, suc proaspăt sau în deserturi. Coaja aromaă poate fi folosită ca ingredient în rețete.',
        nutrition: { per: '100g', energy: 47, protein: 0.9, fat: 0.1, saturatedFat: 0.0, carbs: 11.7, sugars: 9.4, fiber: 2.4, salt: 0.01 },
      },
      {
        name: 'Banane 1kg', slug: slugify('Banane 1kg'), price: 5.0,
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80&auto=format&fit=crop',
        categoryId: fructe.id, subcategory: 'Tropicale', isBest: false, isDiscount: false,
        description: 'Banane coapte natural, dulci și energizante. Sursa excelentă de potasiu și vitamina B6. Ideale ca gustare rapidă, în smoothie-uri, cereale sau prăjituri. Recomandate după sport.',
        nutrition: { per: '100g', energy: 89, protein: 1.1, fat: 0.3, saturatedFat: 0.1, carbs: 22.8, sugars: 12.2, fiber: 2.6, salt: 0.01 },
      },
      {
        name: 'Struguri albi 1kg', slug: slugify('Struguri albi 1kg'), price: 8.0,
        image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80&auto=format&fit=crop',
        categoryId: fructe.id, subcategory: 'Struguri', isBest: true, isDiscount: false,
        description: 'Struguri albi de masă, dulci și aromatic, cu boabe mari și suculente. Recoltați de la producători locali. Perfecti pentru desert sau platouri de fructe. Bogați în resveratrol și antioxidanți.',
        nutrition: { per: '100g', energy: 69, protein: 0.7, fat: 0.2, saturatedFat: 0.0, carbs: 17.6, sugars: 15.5, fiber: 0.9, salt: 0.01 },
      },
      {
        name: 'Căpșuni 500g', slug: slugify('Capsuni 500g'), price: 12.0, oldPrice: 15.0,
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80&auto=format&fit=crop',
        categoryId: fructe.id, subcategory: 'Fructe de pădure', isBest: true, isDiscount: true,
        description: 'Căpșuni proaspete de sezon, aromate și zemoase. Recoltate la maturitate optimă. Perfecte cu smântână, în prăjituri, smoothie-uri sau pur și simplu ca atare. Bogat în vitamina C și antioxidanți.',
        nutrition: { per: '100g', energy: 32, protein: 0.7, fat: 0.3, saturatedFat: 0.0, carbs: 7.7, sugars: 4.9, fiber: 2.0, salt: 0.01 },
      },

      // ── CARNE ─────────────────────────────────────────────────────────────
      {
        name: 'Piept de pui 1kg', slug: slugify('Piept de pui 1kg'), price: 22.0,
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=600&q=80&auto=format&fit=crop',
        categoryId: carne.id, subcategory: 'Pui', isBest: true, isDiscount: false,
        description: 'Piept de pui proaspăt, dezos și fără piele. Carne albă slabă, bogată în proteine. Ideal pentru grătar, la cuptor, la tigaie sau în salate proteice. Provine de la pui crescuți în condiții naturale.',
        nutrition: { per: '100g', energy: 165, protein: 31.0, fat: 3.6, saturatedFat: 1.0, carbs: 0.0, sugars: 0.0, fiber: 0, salt: 0.07 },
      },
      {
        name: 'Carne tocată de porc 500g', slug: slugify('Carne tocata de porc 500g'), price: 15.0, oldPrice: 18.0,
        image: 'https://images.unsplash.com/photo-1588347818036-cf5ed9db1e82?w=600&q=80&auto=format&fit=crop',
        categoryId: carne.id, subcategory: 'Porc', isBest: false, isDiscount: true,
        description: 'Carne tocată de porc proaspătă, cu un conținut de grăsime de aproximativ 20%. Ideală pentru chiftele, pârjoale, sarmale, mici sau burgeri de casă. Gust pronunțat și textură suculentă.',
        nutrition: { per: '100g', energy: 263, protein: 17.0, fat: 21.0, saturatedFat: 8.0, carbs: 0.0, sugars: 0.0, fiber: 0, salt: 0.08 },
      },
      {
        name: 'Cârnați de casă 300g', slug: slugify('Carnati de casa 300g'), price: 18.0,
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80&auto=format&fit=crop',
        categoryId: carne.id, subcategory: 'Mezeluri', isBest: true, isDiscount: false,
        description: 'Cârnați de casă afumați, preparați după rețetă tradițională din carne de porc aleasă, condimentată cu usturoi, boia și piper. Fără aditivi chimici sau conservanți artificiali. La grătar sau tigaie.',
        ingredients: 'Carne de porc (90%), sare, usturoi, boia dulce, piper negru, maț natural.',
        nutrition: { per: '100g', energy: 345, protein: 16.0, fat: 30.0, saturatedFat: 11.0, carbs: 1.5, sugars: 0.5, fiber: 0, salt: 2.1 },
      },
      {
        name: 'Salam de vară 250g', slug: slugify('Salam de vara 250g'), price: 14.5, oldPrice: 16.0,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop',
        categoryId: carne.id, subcategory: 'Mezeluri', isBest: false, isDiscount: true,
        description: 'Salam de vară clasic, cu textură fină și gust echilibrat. Feliat subțire, perfect pentru sandvișuri, platouri sau aperitive. Produs după rețeta tradițională, cu condimente naturale.',
        ingredients: 'Carne de porc și vită (75%), apă, amidon, sare, condimente, afumat.',
        nutrition: { per: '100g', energy: 310, protein: 14.0, fat: 27.0, saturatedFat: 10.0, carbs: 2.0, sugars: 0.5, fiber: 0, salt: 2.4 },
      },

      // ── CONSERVE ──────────────────────────────────────────────────────────
      {
        name: 'Roșii întregi în suc 400g', slug: slugify('Rosii intregi in suc 400g'), price: 5.5,
        image: 'https://images.unsplash.com/photo-1606923231573-cf35cbcd8c98?w=600&q=80&auto=format&fit=crop',
        categoryId: conserve.id, subcategory: 'Roșii conservate', isBest: false, isDiscount: false,
        description: 'Roșii pelate întregi în suc propriu, recoltate și conservate la maturitate maximă. Perfecte pentru sos bolognese, pizza, supe sau tocănițe. Fără conservanți adăugați.',
        ingredients: 'Roșii (95%), suc de roșii, sare.',
        nutrition: { per: '100g', energy: 22, protein: 1.0, fat: 0.2, saturatedFat: 0.0, carbs: 4.5, sugars: 3.0, fiber: 1.5, salt: 0.3 },
      },
      {
        name: 'Fasole roșie 400g', slug: slugify('Fasole rosie 400g'), price: 4.5, oldPrice: 5.5,
        image: 'https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?w=600&q=80&auto=format&fit=crop',
        categoryId: conserve.id, subcategory: 'Legume conservate', isBest: false, isDiscount: true,
        description: 'Fasole roșie kidney gata fiartă, în apă cu sare. Gata de utilizare direct din cutie. Bogată în fibre și proteine vegetale. Ideală pentru salate, chili, tocănițe sau terciuri proteice.',
        ingredients: 'Fasole roșie (60%), apă, sare.',
        nutrition: { per: '100g (scursă)', energy: 127, protein: 8.7, fat: 0.5, saturatedFat: 0.1, carbs: 22.8, sugars: 0.3, fiber: 6.8, salt: 0.4 },
      },
      {
        name: 'Ton în ulei 160g', slug: slugify('Ton in ulei 160g'), price: 8.0,
        image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80&auto=format&fit=crop',
        categoryId: conserve.id, subcategory: 'Pește conservat', isBest: true, isDiscount: false,
        description: 'File de ton yellowfin în ulei de floarea-soarelui. Carne albă, fragedă, cu gust delicat. Sursă excelentă de proteine și Omega-3. Perfect în salate, sandvișuri sau paste.',
        ingredients: 'Ton (70%), ulei de floarea-soarelui, sare.',
        nutrition: { per: '100g (scursă)', energy: 200, protein: 26.0, fat: 11.0, saturatedFat: 1.8, carbs: 0.0, sugars: 0.0, fiber: 0, salt: 0.8 },
      },
      {
        name: 'Măsline negre 300g', slug: slugify('Masline negre 300g'), price: 9.5,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80&auto=format&fit=crop',
        categoryId: conserve.id, subcategory: 'Murături', isBest: false, isDiscount: false,
        description: 'Măsline negre Kalamata în saramură, cu sâmburi. Aromă intensă, caracteristică, ușor fructuoasă și acrișoară. Indispensabile în salate grecești, pe pizza, la aperitive sau platouri mediteraneene.',
        ingredients: 'Măsline negre (78%), apă, sare, oțet.',
        nutrition: { per: '100g (scursă)', energy: 145, protein: 1.0, fat: 15.0, saturatedFat: 2.1, carbs: 3.8, sugars: 0.5, fiber: 3.2, salt: 2.2 },
      },

      // ── BĂUTURI ───────────────────────────────────────────────────────────
      {
        name: 'Apă minerală plată 1.5L', slug: slugify('Apa minerala plata 1.5L'), price: 4.5,
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80&auto=format&fit=crop',
        categoryId: bauturi.id, subcategory: 'Apă', isBest: false, isDiscount: false,
        description: 'Apă minerală naturală plată, îmbuteliată la sursă. Conținut natural de minerale: calciu, magneziu, bicarbonat. Ideală pentru hidratare zilnică, sport și gătit. Fără tratamente chimice.',
        nutrition: { per: '100ml', energy: 0, protein: 0, fat: 0, saturatedFat: 0, carbs: 0, sugars: 0, fiber: 0, salt: 0 },
      },
      {
        name: 'Suc de portocale 1L', slug: slugify('Suc de portocale 1L'), price: 9.0, oldPrice: 11.0,
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80&auto=format&fit=crop',
        categoryId: bauturi.id, subcategory: 'Sucuri naturale', isBest: true, isDiscount: true,
        description: 'Suc de portocale 100% natural, presat la rece, fără zahăr adăugat și fără conservanți. Bogat în vitamina C. Se agită bine înainte de consum. Se păstrează la frigider după deschidere.',
        ingredients: 'Portocale 100%.',
        nutrition: { per: '100ml', energy: 45, protein: 0.7, fat: 0.2, saturatedFat: 0.0, carbs: 10.4, sugars: 8.4, fiber: 0.2, salt: 0.01 },
      },
      {
        name: 'Ceai verde bio 20 pliculețe', slug: slugify('Ceai verde bio 20 plicutete'), price: 12.0,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&auto=format&fit=crop',
        categoryId: bauturi.id, subcategory: 'Ceaiuri', isBest: false, isDiscount: false,
        description: 'Ceai verde organic, recoltat din plantații certificate BIO. Bogat în antioxidanți și catechine. Se prepară la 80°C pentru a păstra compușii benefici. Timp de infuzare 2-3 minute.',
        ingredients: 'Frunze de ceai verde organic 100% (Camellia sinensis).',
        nutrition: { per: '100ml preparat', energy: 1, protein: 0, fat: 0, saturatedFat: 0, carbs: 0.2, sugars: 0, fiber: 0, salt: 0 },
      },

      // ── DULCIURI ──────────────────────────────────────────────────────────
      {
        name: 'Miere de salcâm 500g', slug: slugify('Miere de salcam 500g'), price: 35.0,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80&auto=format&fit=crop',
        categoryId: dulciuri.id, subcategory: 'Miere', isBest: true, isDiscount: false,
        description: 'Miere crudă de salcâm, recoltată de la apicultori locali. Culoare galbenă deschisă, transparentă, cu aromă delicată florală și gust dulce fin. Cristalizează lent. Ideală pentru ceai, tartine sau ca îndulcitor natural.',
        ingredients: 'Miere de salcâm 100%.',
        nutrition: { per: '100g', energy: 304, protein: 0.3, fat: 0.0, saturatedFat: 0.0, carbs: 82.4, sugars: 82.4, fiber: 0.2, salt: 0.01 },
      },
      {
        name: 'Ciocolată neagră 85% 100g', slug: slugify('Ciocolata neagra 85% 100g'), price: 11.0, oldPrice: 13.5,
        image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80&auto=format&fit=crop',
        categoryId: dulciuri.id, subcategory: 'Ciocolată', isBest: false, isDiscount: true,
        description: 'Ciocolată neagră cu 85% cacao, intensă și ușor amăruie, pentru adevărații iubitori de ciocolată. Bogată în flavonoide și antioxidanți. Se recomandă 20-30g pe zi ca parte a unei diete echilibrate.',
        ingredients: 'Masă de cacao (55%), unt de cacao (17%), zahăr (13%), pudră de cacao (15%), emulgator: lecitină de soia.',
        nutrition: { per: '100g', energy: 598, protein: 11.0, fat: 52.0, saturatedFat: 32.0, carbs: 22.0, sugars: 14.0, fiber: 11.0, salt: 0.05 },
      },
      {
        name: 'Gem de caise 350g', slug: slugify('Gem de caise 350g'), price: 8.5,
        image: 'https://images.unsplash.com/photo-1597528380898-5c03f67c1b22?w=600&q=80&auto=format&fit=crop',
        categoryId: dulciuri.id, subcategory: 'Gemuri', isBest: false, isDiscount: false,
        description: 'Gem de caise preparat după rețetă tradițională, din fructe proaspete recoltate la maturitate. Culoare portocalie vibrantă, aromă intensă. Fără coloranți sau arome artificiale. Perfect pe pâine cu unt sau în prăjituri.',
        ingredients: 'Caise (55%), zahăr, acid citric, pectină.',
        nutrition: { per: '100g', energy: 220, protein: 0.5, fat: 0.1, saturatedFat: 0.0, carbs: 55.0, sugars: 52.0, fiber: 1.0, salt: 0.01 },
      },

      // ── CONDIMENTE ────────────────────────────────────────────────────────
      {
        name: 'Ulei de măsline extravirgin 500ml', slug: slugify('Ulei de masline extravirgin 500ml'), price: 29.0,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80&auto=format&fit=crop',
        categoryId: condimente.id, subcategory: 'Uleiuri', isBest: true, isDiscount: false,
        description: 'Ulei de măsline extravirgin presat la rece, din olive selectate. Aciditate max. 0,8%. Culoare verde-aurie, aromă fructuoasă cu note ierbacee. Ideal pentru salate, dressing, marinate sau drizzle pe preparate.',
        ingredients: 'Ulei de măsline extravirgin 100%.',
        nutrition: { per: '100ml', energy: 884, protein: 0.0, fat: 100.0, saturatedFat: 14.0, carbs: 0.0, sugars: 0.0, fiber: 0, salt: 0 },
      },
      {
        name: 'Oțet de mere 500ml', slug: slugify('Otet de mere 500ml'), price: 12.0, oldPrice: 14.5,
        image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80&auto=format&fit=crop',
        categoryId: condimente.id, subcategory: 'Oțet', isBest: false, isDiscount: true,
        description: 'Oțet din cidru de mere nepasteurizat, cu "mama" (cultură vie de bacterii). Aciditate 5%. Beneficii digestive recunoscute, folosit în salate, murături, băuturi detox sau ca supliment zilnic diluat.',
        ingredients: 'Cidru de mere fermentat 100%.',
        nutrition: { per: '100ml', energy: 21, protein: 0.0, fat: 0.0, saturatedFat: 0.0, carbs: 0.9, sugars: 0.4, fiber: 0, salt: 0.01 },
      },
      {
        name: 'Sare roz de Himalaya 500g', slug: slugify('Sare roz de Himalaya 500g'), price: 15.0,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop',
        categoryId: condimente.id, subcategory: 'Sare', isBest: false, isDiscount: false,
        description: 'Sare roz de Himalaya, cristale fine, cu un conținut natural de 84 de minerale și oligoelemente. Gust ușor diferit de sarea de mare, mai complex. Ideală în gătit, la masă sau în băi relaxante.',
        ingredients: 'Clorură de sodiu (sare roz de Himalaya).',
        nutrition: { per: '100g', energy: 0, protein: 0, fat: 0, saturatedFat: 0, carbs: 0, sugars: 0, fiber: 0, salt: 98.0 },
      },
    ],
  })

  // ── Blog ───────────────────────────────────────────────────────────────────
  await prisma.blog.createMany({
    data: [
      {
        slug: slugify('Beneficiile consumului de fructe de sezon'),
        title: 'Beneficiile consumului de fructe de sezon',
        content: 'Fructele de sezon sunt nu doar mai gustoase, ci și mult mai hrănitoare. Atunci când fructele sunt culese la maturitate și consumate imediat, ele au un conținut maxim de vitamine și minerale.\n\nPrimăvara aduce căpșunile, cireșele și vișinele. Vara sunt piersicile, caisele, prunele și pepenii. Toamna este sezonul merelor, perelor și strugurelilor, iar iarna găsim portocale, mandarine și kiwi.\n\nAflă care sunt beneficiile fructelor de sezon și cum să le integrezi în dieta ta zilnică pentru o viață mai sănătoasă.',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-03-15'),
      },
      {
        slug: slugify('Pâinea artizanală: tradițională și sănătoasă'),
        title: 'Pâinea artizanală: tradițională și sănătoasă',
        content: 'Pâinea artizanală se întoarce în forță! Preparată din ingrediente naturale, fără conservanți, pâinea tradițională are un gust aparte și beneficii reale pentru sănătate.\n\nPâinea artizanală este preparată din făină integrală sau semintegrală, apă, sare și maia sau drojdie naturală. Procesul de fermentare lentă îi conferă o textură unică și o crustă crocantă irezistibilă.\n\nDescoperă diferența dintre pâinea industrială și cea artizanală și de ce tot mai mulți oameni aleg varianta tradițională.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-03-22'),
      },
      {
        slug: slugify('Cum să alegi produsele lactate de calitate'),
        title: 'Cum să alegi produsele lactate de calitate',
        content: 'Produsele lactate sunt esențiale într-o dietă echilibrată, furnizând calciu, proteine și vitamine importante. Dar cum știi dacă alegi produsele potrivite?\n\nCel mai important aspect este să citești eticheta cu atenție. Caută produse cu cât mai puțini aditivi și conservanți. Un iaurt de calitate ar trebui să conțină doar lapte și culturi active de bacterii.\n\nDe asemenea, acordă atenție procentului de grăsime. Produsele degresate nu sunt întotdeauna mai sănătoase, deoarece grăsimea lactată conține vitamine liposolubile importante.',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-03-29'),
      },
      {
        slug: slugify('Sfaturi pentru o alimentație echilibrată'),
        title: 'Sfaturi pentru o alimentație echilibrată',
        content: 'O alimentație sănătoasă nu trebuie să fie complicată sau costisitoare. Prin câteva schimbări simple în rutina ta zilnică poți face o diferență enormă pentru sănătatea ta pe termen lung.\n\nÎncepe prin a include mai multe fructe și legume în fiecare masă. Încearcă să consumi minimum 5 porții de fructe și legume pe zi. Gătitul la abur sau la grătar păstrează cel mai bine nutrienții.\n\nReducă consumul de zahăr adăugat și produse ultraprocesate. Înlocuiește gustările nesănătoase cu nuci, semințe sau fructe proaspete.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-01'),
      },
      {
        slug: slugify('De ce ouăle ecologice merită prețul mai mare'),
        title: 'De ce ouăle ecologice merită prețul mai mare',
        content: 'Ouăle ecologice provin de la găini crescute în aer liber, hrănite cu furaje naturale fără pesticide sau antibiotice. Diferența față de ouăle convenționale nu este doar etică, ci și nutrițională.\n\nStudiile arată că ouăle ecologice conțin de două ori mai mulți acizi grași Omega-3, mai multă vitamina D și beta-caroten. Gălbenușul mai portocaliu este un semn al unei diete bogate în carotenoide.',
        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-03'),
      },
      {
        slug: slugify('5 rețete rapide cu legume proaspete de primăvară'),
        title: '5 rețete rapide cu legume proaspete de primăvară',
        content: 'Primăvara aduce o explozie de culori și arome în piețe. Salata verde fragedă, morcovii dulci, ridichile crocante și ceapa verde sunt ingredientele perfecte pentru mese ușoare și nutritive.\n\n1. Salată verde cu ouă fierte și muștar. 2. Supă cremă de morcovi cu ghimbir. 3. Omletă cu ceapă verde și brânză telemea. 4. Morcovi glazurați cu miere. 5. Smoothie verde cu salată, măr și lămâie.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-05'),
      },
      {
        slug: slugify('Iaurtul natural – aliatul tău pentru digestie sănătoasă'),
        title: 'Iaurtul natural – aliatul tău pentru digestie sănătoasă',
        content: 'Iaurtul natural este unul dintre cele mai puternice alimente probiotice disponibile. Bacteriile vii din culturile active ajută la menținerea unui microbiom intestinal sănătos, esențial pentru imunitate și digestie.\n\nConsumat zilnic, iaurtul natural reduce inflamația intestinală, îmbunătățește absorbția nutrienților și poate ajuta la prevenirea unor afecțiuni precum sindromul intestinului iritabil.',
        image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-07'),
      },
      {
        slug: slugify('Cum să păstrezi fructele și legumele proaspete mai mult timp'),
        title: 'Cum să păstrezi fructele și legumele proaspete mai mult timp',
        content: 'Risipa alimentară este o problemă majoră: aproape 30% din alimentele cumpărate ajung la coș din cauza depozitării greșite. Cu câteva trucuri simple poți prelungi prospețimea fructelor și legumelor cu zile sau chiar săptămâni.\n\nBananele se păstrează separat. Căpșunile nu se spală până nu sunt gata de consum. Morcovii se depozitează în apă rece în frigider. Roșiile trebuie ținute la temperatura camerei.',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-08'),
      },
      {
        slug: slugify('Importanța micului dejun: de ce nu trebuie sărit niciodată'),
        title: 'Importanța micului dejun: de ce nu trebuie sărit niciodată',
        content: 'Micul dejun este cu adevărat cea mai importantă masă a zilei. După 8-10 ore de somn, corpul tău are nevoie de combustibil pentru a porni metabolismul, a alimenta creierul și a asigura energia necesară activităților matinale.\n\nStudiile arată că persoanele care iau micul dejun regulat au o concentrare mai bună și un control mai bun al greutății. Un mic dejun echilibrat: ouă fierte, pâine integrală cu brânză telemea și un pahar de lapte.',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-10'),
      },
    ],
  })

  console.log('✅ Seed complet! 40 produse + 9 articole blog adăugate.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
