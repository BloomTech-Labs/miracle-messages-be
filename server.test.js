const supertest = require('supertest');
const server = require('./server');
const Chapters=require('./api/chapterRouter.js');


describe('server.js', () => {
  xit('should set the test env', async () => {
   expect(process.env.DB_ENV).toBe('testing')
    });
  });
;

//testing our get end points
describe('server.js', () => {
  describe('get', () => {
    xit('should return status 200', async () => {
      const user = await supertest(server)
        .get('/')
        .expect(200);
    });

    it('should return JSON', async ()=> {
      const res = await supertest(server).get('/');
      expect(res.type).toBe('application/json');
    })
  
    describe('GET /api/chapter', ()=>{
      it('should return an array with the below properties', async ()=> {
        const res = await supertest(server).get('/api/chapter')
        const chapters = res.body
        expect(Array.isArray(chapters)).toBe(true)
        expect(chapters.length).toEqual(22);
        expect(chapters[0].location).toEqual("Austin, TX");
        expect(chapters[0].location).toEqual("Austin, TX");
        expect(Object.keys(chapters[0]).length).toEqual(5);        
      })
    });
   })
  });



// describe('server.js', () => {
//   describe('get', () => {
//     it('should return status 200', async () => {
//       const user = await supertest(server)
//         .get('/users')
//         .expect(200);
//     });
//   });
// });
