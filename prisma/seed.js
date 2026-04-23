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
  await prisma.category.deleteMany()
  await prisma.blog.deleteMany()

  // Categorii
  const fainoase = await prisma.category.create({ data: { name: 'Făinoase' } })
  const lactate  = await prisma.category.create({ data: { name: 'Lactate' } })
  const oua      = await prisma.category.create({ data: { name: 'Ouă' } })

  // Produse
  await prisma.product.createMany({
    data: [
      // Făinoase
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
        name: 'Cornuri cu mac', slug: slugify('Cornuri cu mac'), price: 2.5, oldPrice: 3.0,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Patiserie', isBest: false, isDiscount: true,
        description: 'Cornuri pufoase cu umplutură de mac, coapte proaspăt în fiecare dimineață. Aluatul fraged și umplutura aromată fac din acestea o răsfățare perfectă la micul dejun sau ca gustare.',
        ingredients: 'Făină de grâu, apă, drojdie, zahăr, unt (10%), ouă, mac (8%), lapte praf, sare.',
        nutrition: { per: '100g', energy: 378, protein: 7.2, fat: 14.5, saturatedFat: 6.1, carbs: 55, sugars: 12, fiber: 3.1, salt: 0.8 },
      },
      {
        name: 'Paste fusilli 500g', slug: slugify('Paste fusilli 500g'), price: 3.8,
        image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?w=600&q=80&auto=format&fit=crop',
        categoryId: fainoase.id, subcategory: 'Paste', isBest: false, isDiscount: false,
        description: 'Paste fusilli din grâu dur de calitate superioară, cu suprafață spiralată care reține perfect sosurile. Timp de fierbere 8–10 minute. Ideale cu sos de roșii, pesto sau în salate reci.',
        ingredients: 'Făină de grâu dur (semolina), apă.',
        nutrition: { per: '100g (uscat)', energy: 352, protein: 12.5, fat: 1.5, saturatedFat: 0.3, carbs: 71, sugars: 2.5, fiber: 3.0, salt: 0.01 },
      },
      // Lactate
      {
        name: 'Lapte integral 1L', slug: slugify('Lapte integral 1L'), price: 6.5,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Lapte', isBest: true, isDiscount: false,
        description: 'Lapte integral pasteurizat, colectat de la ferme locale. Conținut de grăsime min. 3,5%. Bogat în calciu, vitamina D și proteine complete — esențial pentru oase sănătoase și un sistem imunitar puternic.',
        ingredients: 'Lapte de vacă integral pasteurizat.',
        nutrition: { per: '100ml', energy: 65, protein: 3.2, fat: 3.6, saturatedFat: 2.3, carbs: 4.7, sugars: 4.7, fiber: 0, salt: 0.1 },
      },
      {
        name: 'Iaurt natural 400g', slug: slugify('Iaurt natural 400g'), price: 3.2, oldPrice: 3.8,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Iaurt', isBest: false, isDiscount: true,
        description: 'Iaurt natural gras, fermentat tradițional cu culturi vii de bacterii lactice. Fără aditivi, fără conservanți, fără arome artificiale. Cremos, ușor acrișor — perfect simplu, cu fructe sau în rețete.',
        ingredients: 'Lapte de vacă integral, culturi vii de bacterii lactice (Lactobacillus bulgaricus, Streptococcus thermophilus).',
        nutrition: { per: '100g', energy: 61, protein: 3.5, fat: 3.5, saturatedFat: 2.2, carbs: 4.7, sugars: 4.7, fiber: 0, salt: 0.1 },
      },
      {
        name: 'Brânză telemea 300g', slug: slugify('Brânză telemea 300g'), price: 12.5,
        image: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=600&q=80&auto=format&fit=crop',
        categoryId: lactate.id, subcategory: 'Brânzeturi', isBest: true, isDiscount: false,
        description: 'Telemea de vacă maturată min. 30 de zile în saramură, după rețeta tradițională. Textură fermă, gust sărat și ușor acid. Se consumă ca atare, în salate, cu roșii și castraveți sau la micul dejun.',
        ingredients: 'Lapte de vacă pasteurizat, sare, cheag, culturi lactice. Conservant: E252.',
        nutrition: { per: '100g', energy: 258, protein: 16.0, fat: 21.0, saturatedFat: 14.0, carbs: 1.8, sugars: 0.5, fiber: 0, salt: 3.2 },
      },
      {
        name: 'Smântână 20% 400g', slug: slugify('Smântână 20% 400g'), price: 7.0, oldPrice: 8.0,
        image: 'https://images.pexels.com/photos/6941022/pexels-photo-6941022.jpeg?w=600&auto=compress&cs=tinysrgb',
        categoryId: lactate.id, subcategory: 'Smântână', isBest: false, isDiscount: true,
        description: 'Smântână proaspătă cu 20% grăsime, obținută din lapte de vacă colectat local. Consistentă și cremoasă, ideală pentru supe, tocănițe, dressing, deserturi sau pur și simplu lângă mâncăruri tradiționale.',
        ingredients: 'Smântână din lapte de vacă pasteurizat, culturi lactice.',
        nutrition: { per: '100g', energy: 205, protein: 2.8, fat: 20.0, saturatedFat: 13.0, carbs: 3.4, sugars: 3.4, fiber: 0, salt: 0.09 },
      },
      // Ouă
      {
        name: 'Ouă de găină (10 buc)', slug: slugify('Ouă de găină 10 buc'), price: 8.5,
        image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80&auto=format&fit=crop',
        categoryId: oua.id, subcategory: 'Ouă de găină', isBest: true, isDiscount: false,
        description: 'Ouă proaspete de găină, clasa A, mărimea M. Colectate zilnic de la ferme locale cu păsări crescute în condiții naturale. Gălbenușul intens colorat este un indicator al calității superioare.',
        nutrition: { per: '1 ou (~55g)', energy: 78, protein: 6.3, fat: 5.3, saturatedFat: 1.6, carbs: 0.6, sugars: 0.3, fiber: 0, salt: 0.2 },
      },
      {
        name: 'Ouă ecologice (6 buc)', slug: slugify('Ouă ecologice 6 buc'), price: 9.0, oldPrice: 10.5,
        image: 'https://images.pexels.com/photos/6294248/pexels-photo-6294248.jpeg?w=600&auto=compress&cs=tinysrgb',
        categoryId: oua.id, subcategory: 'Ouă ecologice', isBest: false, isDiscount: true,
        description: 'Ouă ecologice certificate BIO, de la găini crescute în aer liber, hrănite exclusiv cu furaje naturale fără pesticide sau aditivi chimici. Gust autentic, calitate superioară față de ouăle convenționale.',
        nutrition: { per: '1 ou (~60g)', energy: 85, protein: 7.0, fat: 5.8, saturatedFat: 1.8, carbs: 0.7, sugars: 0.4, fiber: 0, salt: 0.2 },
      },
    ],
  })

  // Articole blog
  await prisma.blog.createMany({
    data: [
      {
        slug: slugify('Beneficiile consumului de fructe de sezon'),
        title: 'Beneficiile consumului de fructe de sezon',
        content:
          'Fructele de sezon sunt nu doar mai gustoase, ci și mult mai hrănitoare. Atunci când fructele sunt culese la maturitate și consumate imediat, ele au un conținut maxim de vitamine și minerale. Consumul de fructe de sezon reduce totodată impactul asupra mediului înconjurător, deoarece nu necesită transport pe distanțe lungi sau depozitare în condiții artificiale.\n\nPrimăvara aduce căpșunile, cireșele și vișinele. Vara sunt piersicile, caisele, prunele și pepenii. Toamna este sezonul merelor, perelor și strugurelilor, iar iarna găsim portocale, mandarine și kiwi.\n\nAflă care sunt beneficiile fructelor de sezon și cum să le integrezi în dieta ta zilnică pentru o viață mai sănătoasă.',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-03-15'),
      },
      {
        slug: slugify('Pâinea artizanală: tradițională și sănătoasă'),
        title: 'Pâinea artizanală: tradițională și sănătoasă',
        content:
          'Pâinea artizanală se întoarce în forță! Preparată din ingrediente naturale, fără conservanți, pâinea tradițională are un gust aparte și beneficii reale pentru sănătate. Diferența față de pâinea industrială este vizibilă atât în textură, cât și în aromă.\n\nPâinea artizanală este preparată din făină integrală sau semintegrală, apă, sare și maia sau drojdie naturală. Procesul de fermentare lentă îi conferă o textură unică și o crustă crocantă irezistibilă.\n\nDescoperă diferența dintre pâinea industrială și cea artizanală și de ce tot mai mulți oameni aleg varianta tradițională.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-03-22'),
      },
      {
        slug: slugify('Cum să alegi produsele lactate de calitate'),
        title: 'Cum să alegi produsele lactate de calitate',
        content:
          'Produsele lactate sunt esențiale într-o dietă echilibrată, furnizând calciu, proteine și vitamine importante. Dar cum știi dacă alegi produsele potrivite?\n\nCel mai important aspect este să citești eticheta cu atenție. Caută produse cu cât mai puțini aditivi și conservanți. Un iaurt de calitate ar trebui să conțină doar lapte și culturi active de bacterii.\n\nDe asemenea, acordă atenție procentului de grăsime. Produsele degresate nu sunt întotdeauna mai sănătoase, deoarece grăsimea lactată conține vitamine liposolubile importante.',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-03-29'),
      },
      {
        slug: slugify('Sfaturi pentru o alimentație echilibrată'),
        title: 'Sfaturi pentru o alimentație echilibrată',
        content:
          'O alimentație sănătoasă nu trebuie să fie complicată sau costisitoare. Prin câteva schimbări simple în rutina ta zilnică poți face o diferență enormă pentru sănătatea ta pe termen lung.\n\nÎncepe prin a include mai multe fructe și legume în fiecare masă. Încearcă să consumi minimum 5 porții de fructe și legume pe zi. Gătitul la abur sau la grătar păstrează cel mai bine nutrienții.\n\nReducă consumul de zahăr adăugat și produse ultraprocesate. Înlocuiește gustările nesănătoase cu nuci, semințe sau fructe proaspete. Bea minimum 2 litri de apă pe zi.',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-01'),
      },
      {
        slug: slugify('De ce ouăle ecologice merită prețul mai mare'),
        title: 'De ce ouăle ecologice merită prețul mai mare',
        content:
          'Ouăle ecologice provin de la găini crescute în aer liber, hrănite cu furaje naturale fără pesticide sau antibiotice. Diferența față de ouăle convenționale nu este doar etică, ci și nutrițională.\n\nStudiile arată că ouăle ecologice conțin de două ori mai mulți acizi grași Omega-3, mai multă vitamina D și beta-caroten. Gălbenușul mai portocaliu este un semn al unei diete bogate în carotenoide.\n\nDacă bugetul permite, alegerea ouălor ecologice este o investiție inteligentă în sănătatea ta și a familiei. Caută codul „0" sau „1" imprimat pe ou pentru a identifica proveniența acestora.',
        image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-03'),
      },
      {
        slug: slugify('5 rețete rapide cu legume proaspete de primăvară'),
        title: '5 rețete rapide cu legume proaspete de primăvară',
        content:
          'Primăvara aduce o explozie de culori și arome în piețe. Salata verde fragedă, morcovii dulci, ridichile crocante și ceapa verde sunt ingredientele perfecte pentru mese ușoare și nutritive.\n\n1. Salată verde cu ouă fierte și muștar – simplă, gata în 10 minute. 2. Supă cremă de morcovi cu ghimbir – reconfortantă și plină de vitamine. 3. Omletă cu ceapă verde și brânză telemea – micul dejun ideal. 4. Morcovi glazurați cu miere – garnitură festivă. 5. Smoothie verde cu salată, măr și lămâie – energizant pentru dimineți.\n\nToate aceste rețete pot fi realizate cu produsele proaspete disponibile la Crissval, direct de la producători locali.',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-05'),
      },
      {
        slug: slugify('Iaurtul natural – aliatul tău pentru digestie sănătoasă'),
        title: 'Iaurtul natural – aliatul tău pentru digestie sănătoasă',
        content:
          'Iaurtul natural este unul dintre cele mai puternice alimente probiotice disponibile. Bacteriile vii din culturile active ajută la menținerea unui microbiom intestinal sănătos, esențial pentru imunitate și digestie.\n\nConsumat zilnic, iaurtul natural reduce inflamația intestinală, îmbunătățește absorbția nutrienților și poate ajuta la prevenirea unor afecțiuni precum sindromul intestinului iritabil. Alege întotdeauna iaurt fără zahăr adăugat și cu minimum 2 tipuri de culturi bacteriene.\n\nLa Crissval găsești iaurt natural de ferma, produs tradițional fără aditivi, cu o textură cremoasă și gust autentic. Combinat cu miere și fructe proaspete, devine un desert perfect sănătos.',
        image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-07'),
      },
      {
        slug: slugify('Cum să păstrezi fructele și legumele proaspete mai mult timp'),
        title: 'Cum să păstrezi fructele și legumele proaspete mai mult timp',
        content:
          'Risipa alimentară este o problemă majoră: aproape 30% din alimentele cumpărate ajung la coș din cauza depozitării greșite. Cu câteva trucuri simple poți prelungi prospețimea fructelor și legumelor cu zile sau chiar săptămâni.\n\nBananele se păstrează separat – ele emană etilenă care grăbește coacerea altor fructe. Căpșunile nu se spală până nu sunt gata de consum. Morcovii se depozitează în apă rece în frigider. Roșiile trebuie ținute la temperatura camerei, nu la frigider, pentru a-și păstra aroma.\n\nSalata verde se menține fragedă dacă o înfășori în prosop de hârtie umezit și o pui într-o pungă închisă. Aplicând aceste sfaturi, vei economisi bani și vei reduce risipa alimentară din familia ta.',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-08'),
      },
      {
        slug: slugify('Brânza telemea făcută în casă – tradiție pe masă'),
        title: 'Brânza telemea făcută în casă – tradiție pe masă',
        content:
          'Telemeau este poate cel mai emblematic produs lactat românesc. Preparată din lapte integral de oaie sau vacă, cu sare și cheag natural, telemeau tradițională nu are nimic în comun cu variantele industriale de pe raft.\n\nO telemeaua autentică se maturează în saramură timp de minimum 2-4 săptămâni. În această perioadă, proteinele se transformă, gustul devine mai complex, iar textura capătă acea firimitură specifică. Conținutul ridicat de calciu și proteine o face un aliment extrem de nutritiv.\n\nLa Crissval îți oferim brânză telemea produsă tradițional, de la ferme cu animale crescute în condiții naturale. Perfectă pe pâine integrală cu roșii proaspete sau în salate de vară.',
        image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-09'),
      },
      {
        slug: slugify('Importanța micului dejun: de ce nu trebuie sărit niciodată'),
        title: 'Importanța micului dejun: de ce nu trebuie sărit niciodată',
        content:
          'Micul dejun este cu adevărat cea mai importantă masă a zilei. După 8-10 ore de somn, corpul tău are nevoie de combustibil pentru a porni metabolismul, a alimenta creierul și a asigura energia necesară activităților matinale.\n\nStudiile arată că persoanele care iau micul dejun regulat au o concentrare mai bună, un control mai bun al greutății și un risc mai scăzut de diabet de tip 2. Un mic dejun echilibrat ar trebui să conțină proteine (ouă, iaurt), carbohidrați complecși (pâine integrală) și grăsimi sănătoase.\n\nO combinație ideală: două ouă fierte sau omletă cu legume, o felie de pâine integrală cu brânză telemea și un pahar de lapte sau un iaurt natural. Tot ce ai nevoie găsești proaspăt la Crissval.',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80&auto=format&fit=crop',
        createdAt: new Date('2026-04-10'),
      },
    ],
  })

  console.log('✅ Seed complet!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })

