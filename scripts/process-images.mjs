import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const workspace = process.cwd();
const output = path.join(workspace, 'src', 'assets', 'images');
await mkdir(output, { recursive: true });

const sources = [
  ['logo', 'C:/Users/blair/Downloads/647680444_783936724762000_2064368093967325204_n.jpg', 760, 86],
  ['hero-lawn', 'C:/Users/blair/Downloads/515438390_611087795380228_4823309040027395337_n.jpg', 1800, 84],
  ['lawn-stripes', 'C:/Users/blair/Downloads/499040954_1398180107997065_8403855395184904288_n.jpg', 1500, 82],
  ['backyard-mower', 'C:/Users/blair/Downloads/528260905_1149552636986709_5811825680632699923_n.jpg', 1400, 82],
  ['mower-at-home', 'C:/Users/blair/Downloads/497832918_551844041304604_2951404519806621368_n.jpg', 1500, 82],
  ['pressure-washing', 'C:/Users/blair/Downloads/612214613_25407017292315805_7344639697520297241_n.jpg', 1400, 82],
  ['lawn-treatment', 'C:/Users/blair/Downloads/629319289_1545026709917001_6597138971185995385_n.jpg', 1400, 82],
  ['landscape-bed', 'C:/Users/blair/Downloads/682707147_827078040447868_438756148349118077_n.jpg', 1500, 82],
  ['owner-portrait', 'C:/Users/blair/Downloads/657938114_972069628493979_9169190585218918252_n.jpg', 1200, 82],
  ['crew-on-lawn', 'C:/Users/blair/Downloads/495360709_1336985854265093_6493187240429253344_n.jpg', 1200, 82],
  ['wide-striped-lawn', 'C:/Users/blair/Downloads/524260725_606475929174748_6638259167515926732_n.jpg', 1700, 82],
  ['fresh-edge-drive', 'C:/Users/blair/Downloads/780323670_922624194226585_969382461992997941_n.jpg', 1500, 82],
  ['front-yard-finish', 'C:/Users/blair/Downloads/781008931_922624150893256_8335920877702802381_n.jpg', 1500, 82],
  ['grand-lake-lawn', 'C:/Users/blair/Downloads/516780526_1178164117662164_995024129724634460_n.jpg', 1300, 82],
  ['truck-and-mower', 'C:/Users/blair/Downloads/470179522_442262732262736_4487842774670064789_n.jpg', 1300, 82],
  ['large-backyard', 'C:/Users/blair/Downloads/499214546_557640990724909_7758239771168361675_n.jpg', 1500, 82],
  ['clean-residential-lawn', 'C:/Users/blair/Downloads/559501024_668071379681869_7858372224885459937_n.jpg', 1500, 82],
  ['house-and-stripes', 'C:/Users/blair/Downloads/645761079_948127484460026_2183972415303450341_n.jpg', 1400, 82],
  ['lawn-equipment', 'C:/Users/blair/Downloads/528177158_616705084818499_21422246510415560_n.jpg', 1500, 82],
  ['neighborhood-lawn', 'C:/Users/blair/Downloads/538430928_632858923203115_2118094100880977501_n.jpg', 1500, 82],
  ['blue-sky-lawn', 'C:/Users/blair/Downloads/518373750_601079853047689_2277831876159229512_n.jpg', 1500, 82],
  ['mowing-action', 'C:/Users/blair/Downloads/459987329_438523915322256_7962056051568819430_n.jpg', 1400, 82],
  ['large-field', 'C:/Users/blair/Downloads/516780526_1178164117662164_995024129724634460_n.jpg', 1500, 82],
  ['work-rig', 'C:/Users/blair/Downloads/470179522_442262732262736_4487842774670064789_n.jpg', 1300, 82]
];

for (const [name, source, width, quality] of sources) {
  await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(path.join(output, `${name}.webp`));
  process.stdout.write(`processed ${name}\n`);
}
