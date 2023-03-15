const { encode, decode } = require('gpt-3-encoder');
const encoded = encode('This is an example sentence to try encoding out on!');
const number_of_tokens = encoded.length;
console.log(number_of_tokens);

for (let token of encoded) {
  console.log({ token, string: decode([token]) });
}

const decoded = decode(encoded);
console.log('We can decode it back into:\n', decoded);
