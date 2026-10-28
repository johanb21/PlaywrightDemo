import {test, expect} from '@playwright/test'
import type {APIRequestContext} from '@playwright/test'

let apiContext: APIRequestContext;

test.beforeAll(async({playwright}) => {
    // The fixture 'request' always calls for .newContext() in the background
    // so this is an option for when you want to have more control over it
    apiContext = await playwright.request.newContext({
        baseURL: 'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
})

test.afterAll(async({}) => {
    await apiContext.dispose();
})

test('API Testing 101: GET', async ({request}) => {
    const response = await apiContext.get('/posts');
    const responseObject = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(responseObject).toContainEqual(expect.objectContaining({
        userId: 8,
        id: 79,
        title: 'pariatur consequatur quia magnam autem omnis non amet',
        body: 'libero accusantium et et facere incidunt sit dolorem\n' +
        'non excepturi qui quia sed laudantium\n' +
        'quisquam molestiae ducimus est\n' +
        'officiis esse molestiae iste et quos'
    }));
})

test('API Testing 101: POST', async({request}) => {
    const response = await apiContext.post('/posts', {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
        }
    });
    const responseObject = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(responseObject).toEqual({
        title: 'foo',
        body: 'bar',
        userId: 1,
        id: 101
    });
    console.log(responseObject);
})

test('API Testing 101: PUT', async({request}) => {
    const response = await apiContext.put('/posts/1', {
        data: {
            "id": 1,
            "title": "foo",
            "body": "bar",
            "userId": 1
        }
    });
    const responseObject = response.json();

    console.log(responseObject);
    expect(response.ok()).toBeTruthy();
})