import request from "supertest";
import { app } from "../../app";

it('returns a 404 if the provided id does not exist', async () => {
  const id = global.getMongoId();
  const title = 'abc';
  const price = 20;

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title, price
    })
    .expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
  const id = global.getMongoId();
  const title = 'abc';
  const price = 20;

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title, price
    })
    .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const title = 'abc';
  const price = 20;
  const newTitle = 'def';
  const newPrice = 40;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title, price
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: newTitle, 
      price: newPrice
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const title = 'abc';
  const price = 20;
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title, price
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '', 
      price: 40
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'def', 
      price: -40
    })
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const title = 'abc';
  const price = 20;
  const newTitle = 'def';
  const newPrice = 40;
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title, price
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: newTitle, 
      price: newPrice
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual(newTitle);
  expect(ticketResponse.body.price).toEqual(newPrice);
});