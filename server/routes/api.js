const router = require('koa-router')();
const http = require('http');
const https = require('https');
const co = require('bluebird-co');
// const adapt = require('koa-adapter-bluebird'); // uses bluebird-co for performance
// const co = require('co');

router.prefix('/api');

/* GET api listing. */
router.get('/', (ctx, next) => {
    ctx.body = 'api works';
});

router.get('/test2', co.wrap(function*(ctx, next) {
    yield new Promise(resolve => setTimeout(resolve, 1000));
    ctx.body = 'Web Server Reply';
}));

router.get('/test', co.wrap(function*(ctx, next) {
    var options = {
        hostname: process.env.EVENT_RUNNER_HOST,
        // method: 'GET',
        path: '/api/test',
        headers: {
            'X-Authorization': process.env.EVENT_RUNNER_API_KEY
        }
    };

    yield new Promise(function(resolve, reject) {
        http.get(options, (apiRes) => {
            var result = '';
            console.log(`STATUS: ${apiRes.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(apiRes.headers)}`);
            apiRes.setEncoding('utf8');
            apiRes.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                result += `${chunk}`;
            });
            apiRes.on('end', () => {
                console.log('No more data in response.');

                resolve(result);
            });
        }).on('error', (e) => {
            console.log(`problem with request: ${e.message}`);

            reject(e);
        });
    }).then(function(result) {
        console.log('then: ' + result);

        ctx.body = result;
    });

    console.log('Done');
}));

// Events

router.post('/event', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 443,
    method: 'POST',
    path: '/api/event',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.put('/event', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 80,
    method: 'PUT',
    path: '/api/event',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  // console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/events', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/events',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then(function(result) {
    console.log(result);

    ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/events/:ownerId', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/events/' + ctx.params.ownerId,
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/event/:id', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/event/' + ctx.params.id,
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.post('/event/search', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 80,
    method: 'POST',
    path: '/api/event/search',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  // console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

// Stage

router.post('/stage', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 80,
    method: 'POST',
    path: '/api/stage',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  // console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.put('/stage', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 80,
    method: 'PUT',
    path: '/api/stage',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  // console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/stages', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/stages',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then(function(result) {
    console.log(result);

    ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/stages/:ownerId', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/stages/' + ctx.params.ownerId,
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/stage/:id', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/stage/' + ctx.params.id,
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

// Achievement

router.post('/achievement', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 80,
    method: 'POST',
    path: '/api/achievement',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  // console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.put('/achievementachievement', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    port: 80,
    method: 'PUT',
    path: '/api/achievement',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  // console.log('received', ctx.request.body);
  yield sendRequest(options, ctx.request.body).then(function(result) {
      // console.log('then: ' + result);

      ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/achievements', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/achievements',
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then(function(result) {
    console.log(result);

    ctx.body = result;
  })
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/achievements/:eventId', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/achievements/' + ctx.params.eventId,
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

router.get('/achievement/:id', co.wrap(function*(ctx, next) {
  var options = {
    hostname: process.env.EVENT_RUNNER_HOST,
    method: 'GET',
    path: '/api/achievement/' + ctx.params.id,
    headers: {
      'X-Authorization': process.env.EVENT_RUNNER_API_KEY,
      'Content-Type': 'application/json'
    }
  };

  yield sendRequest(options, null).then((result) => ctx.body = result)
  .catch(function(err) {
    console.log(err);
    throw err;
  });
}));

function sendRequest(options, data) {
  // console.log('sending request', options);
  return new Promise(function(resolve, reject) {
    var req = https.request(options, (apiRes) => {
      var result = '';
      var status = apiRes.statusCode;
      console.log(`STATUS: ${apiRes.statusCode}`);

      if ((status >= 200) && (status < 300)) {
        // console.log(`HEADERS: ${JSON.stringify(apiRes.headers)}`);
        apiRes.setEncoding('utf8');
        apiRes.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`);
            result += `${chunk}`;
        });
        apiRes.on('end', () => {
            // console.log('No more data in response.');

            resolve(result);
        });
      } else {
        reject(new Error('Request error: ' + status));
      }
    }).on('error', (e) => {
      console.log(`problem with request: ${e.message}`);

      reject(e);
    });

    if (data) {
      console.log('writing request data', JSON.stringify(data));
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

module.exports = router;
