

describe('My First Test', function() {
    it('Does not do much!', function() {
      expect(true).to.equal(true)
    })
    })
  
    describe('testing chapter db', function() {
        it('should recieve data from api/chapter', function() {
          cy.request('http://localhost:5000/api/chapter')
        })
      })

