import {expect, test} from '@playwright/test';


//API Key for REQES: free_user_3L483ZP7d1Y57PUueroagQqAbFn
//SAMPLE DATA: GETreqres.in/api/users?page=2
//OWN DATA: GETreqres.in/api/collections/products/records

//JSONPLACEHOLDER API BASE URL: https://jsonplaceholder.typicode.com


test('API Testing 101: GET', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    const responseObject = await response.json()
    //console.log(responseObject);

    expect(response.ok()).toBeTruthy();
    // Assertion to find an object in a complex json
    expect(responseObject).toContainEqual(expect.objectContaining({
        userId: 8,
        id: 79,
        title: 'pariatur consequatur quia magnam autem omnis non amet',
        body: 'libero accusantium et et facere incidunt sit dolorem\n' +
        'non excepturi qui quia sed laudantium\n' +
        'quisquam molestiae ducimus est\n' +
        'officiis esse molestiae iste et quos'
    }));

    expect(response.status()).toBe(200);
    
})

test('API Testing 101: POST', async({request}) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
        }
    });
    const responseObject = await response.json();

    expect(response.ok()).toBeTruthy();
    // Option #1 to assert full object response
    expect(responseObject).toMatchObject({
        title: 'foo',
        body: 'bar',
        userId: 1,
        id: 101
    });
    // Option #2 to assert full object response
    expect(responseObject).toEqual({
        title: 'foo',
        body: 'bar',
        userId: 1,
        id: 101
    });
})

test('API Testing 101: PUT', async({request}) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
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