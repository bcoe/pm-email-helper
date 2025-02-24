import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

yargs(hideBin(process.argv))
  .command('* <in> <out>', 'CSV file to process removing duplicate slugs and cleaning up names', () => {}, (argv) => {
    const slugsAlreadyContacted = new Set(fs.readFileSync(argv['slugs-contacted-file'], 'utf8').split('\n').map((txt) => {
      return txt.trim();
    }));
    const csv = fs.readFileSync(argv.in, 'utf8').split('\n');
    const output = [];
    for (const rowText of csv) {
      const row = rowText.split(',');
      const orgSlug = row[argv['slug-col']];
      const email = row[argv['email-col']];
      const name = row[argv['name-col']];
      if (!slugsAlreadyContacted.has(orgSlug)) {
        if (name && email) {
          const [fname, _] = name.split(' ');
          // This looks like a properly formed name.
          if (fname[0] === fname[0].toUpperCase()) {
            slugsAlreadyContacted.add(orgSlug);
            output.push({
              slug: orgSlug,
              email: email,
              fname: fname
            })
          }
        }
      } else {
        console.info(`skipping ${orgSlug} who is already in our contact list`);
      }
    }
    let outputCSV = 'slug,email,fname\n';
    for (const row of output) {
      outputCSV += `${row.slug},${row.email},${row.fname}\n`;
    }
    fs.writeFileSync(argv.out, outputCSV, 'utf8');
  })
  .option('slugs-contacted-file', {
    default: 'slugs-contacted.txt',
    type: 'string'
  })
  .option('slug-col', {
    default: 1,
    type: 'number'
  })
  .option('slug-col', {
    default: 1,
    type: 'number'
  })
  .option('email-col', {
    default: 4,
    type: 'number'
  })
  .option('name-col', {
    default: 6,
    type: 'number'
  })
  .demandCommand(1)
  .parse();
