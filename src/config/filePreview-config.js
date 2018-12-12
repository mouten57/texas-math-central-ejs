var FilePreviews = require('filepreviews');

var previews = new FilePreviews({
  debug: true,
  apiKey: 'uLrMz5O3cirmVDqz2N5SeDERBiJwQJ',
  apiSecret: 'tDsbqgb58Nyxn32KnowEPpk7qobhyE'
});

previews.generate(url, function(err, result) {
  console.log(err);
  console.log(result.id);
  console.log(result.status);

  previews.retrieve(result.id, function(err, result) {
    console.log(result);
  });
});
