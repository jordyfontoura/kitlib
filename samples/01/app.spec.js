const request = require('supertest');

const app = require('./app');

describe('Test example', () => {
  test('POST /lead', (done) => {
    request(app)
      .post('/lead')
      .expect('Content-Type', /json/)
      .send({
        id: '123',
        clicks: 23,
        links: ['http://www.example.com', 1234, true],
        isFake: 'false',
        contact: {
          email: 'test@test.com',
          name: 'Test',
          phone: '123456789',
        },
      })
      .expect(200)
      .expect((res) => {
        const data = res.body;
        expect(data).toStrictEqual({
          id: 123,
          clicks: 23,
          links: ['http://www.example.com', '1234', 'true'],
          isFake: false,
          type: 'lead',
          contact: {
            email: 'test@test.com',
            name: 'Test',
            phone: '123456789',
          },
        });
      })
      .end((err, res) => {
        if (err) return done(err);
        // elementId = res.body.data[1].id;
        return done();
      });
  });

  test('POST /middleware/lead', (done) => {
    request(app)
      .post('/middleware/lead')
      .expect('Content-Type', /json/)
      .send({
        id: '123',
        clicks: 23,
        links: ['http://www.example.com', 1234, true],
        isFake: 'false',
        contact: {
          email: 'test@test.com',
          name: 'Test',
          phone: '123456789',
        },
      })
      .expect(200)
      .expect((res) => {
        const data = res.body;
        expect(data).toStrictEqual({
          id: 123,
          clicks: 23,
          links: ['http://www.example.com', '1234', 'true'],
          isFake: false,
          type: 'lead',
          contact: {
            email: 'test@test.com',
            name: 'Test',
            phone: '123456789',
          },
        });
      })
      .end((err, res) => {
        if (err) return done(err);
        // elementId = res.body.data[1].id;
        return done();
      });
  });

  test('POST /parsed/lead', (done) => {
    request(app)
      .post('/parsed/lead')
      .expect('Content-Type', /json/)
      .send({
        id: '123',
        clicks: 23,
        links: ['http://www.example.com', 1234, true],
        isFake: 'false',
        contact: {
          email: 'test@test.com',
          name: 'Test',
          phone: '123456789',
        },
      })
      .expect(200)
      .expect((res) => {
        const data = res.body;
        expect(data).toStrictEqual({
          id: 123,
          clicks: 23,
          links: ['http://www.example.com', '1234', 'true'],
          isFake: false,
          type: 'lead',
          contact: {
            email: 'test@test.com',
            name: 'Test',
            phone: '123456789',
          },
        });
      })
      .end((err, res) => {
        if (err) return done(err);
        // elementId = res.body.data[1].id;
        return done();
      });
  });
});
