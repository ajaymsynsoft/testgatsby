var selfsigned = require('selfsigned');
var attrs = [{ name: 'commonName', value: 'contoso.com' }];
var pems = selfsigned.generate(attrs, { days: 365 });
console.log(pems)

selfsigned.generate(attrs, { days: 365 }, function (err, pems) {
  console.log(pems)
});