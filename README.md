# PM Email Helper

Tool I threw together to help me keep track of customers I've already emailed (so
I don't reach out to people twice). And for performing cleanup on lists of contacts
I've pulled from a database.

How it works:

1. Maintain a local `slugs-contactred.txt`, this list contains all the people you've
   reached out to in the past.
2. Run `node index.mjs <input-file.csv> output.csv, to take an input CSV file, remove
   duplicates and output a cleaned up CSV file for outreach.
