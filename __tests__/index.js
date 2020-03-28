
const request = require('supertest');
const app = require('../user');
const profile = require('../profile');


describe('App Index', () => {
  it('should GET john', () => {

    const res = request(app).get('/')
    //const status = 20

    //expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty.status
    //expect(res.body).toEqual(200)
    expect(res.json).toHaveProperty.name
    //expect(res.status).toHaveProperty(200)
  })

  it('should GET user', () => {

    const res = request(app).get('/user')

    //expect(status).toEqual(200)
    expect(res.body).toHaveProperty.json
    expect(res.json).toHaveProperty.name
  })


  it('should GET ALL Profiles', () => {

    const res = request(app).get('/')
  
    expect(res.body).toHaveProperty.json
    expect(res.json).toHaveProperty._id
    expect(res.json).toHaveProperty.firstName 
  })

  it('should GET a Profile', () => {

    const res = request(app).get('/:profile')
    
    expect(res.body).toHaveProperty.json
    expect(res.json).toHaveProperty._id
    expect(res.json).toHaveProperty._firstName 
  })
})

