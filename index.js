var request = require('request');
var fs = require('fs');

var problemsCount = 547;
var dir = './questions/';

for (var i=1; i<=problemsCount; i++) {
  getProblem(i);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getProblem(id) {
  id = pad(id, problemsCount.toString().length);
  var url = 'https://projecteuler.net/problem=' + id;

  request.post(
    'http://www.jamapi.xyz',
    {
      form: {
        url: url,
        json_data: '{"title": "h2", "problem": ".problem_content"}'
      }
    },
    function (err, res, body) {
      if (!err) {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        var parsed = JSON.parse(body);
        var filename = dir + 'problem-'+id+'.js';
        var content = '/*\n' + parsed.title + '\n' + parsed.problem + '\n\nMore info: '+ url +'\n*/\n\n';

        fs.writeFile(filename, content, function (err) {
          if (err) return console.log(err);
          console.log('Wrote ', filename);
        });
      }
    }
  );
}