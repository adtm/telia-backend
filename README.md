# Cat Server ✨ 🐈

## Launching the application

<!-- -->

### Run application

To run the application you will need to install npm packages and start it

```bash
npm i & npm start
```

## API Endpoints

<!-- -->

### **Get A Cat**

`GET /api/v1/cats/:id`

```bash
curl -X GET http://localhost:3000/api/v1/cats/1
```

#### Response

```json
[
  {
    "id": "1",
    "name": "Elvis",
    "breed_group": "Persian",
    "weight": 10
  }
]
```

### **Get All Cats**

`GET /api/v1/cats/`

```bash
curl -X GET http://localhost:3000/api/v1/cats?limit=20&offset=0&field=name&direction=DESC
```

#### Response

```json
[
  {
    "id": "1",
    "name": "Elvis",
    "breed_group": "Persian",
    "weight": 10
  }
]
```

### **Search cats**

`GET /api/v1/cats/search?name=<query>`

```bash
curl -X GET http://localhost:3000/api/v1/cats/search?name=Elv
```

#### Response

```json
[
  {
    "id": "1",
    "name": "Elvis",
    "breed_group": "Persian",
    "weight": 10
  }
]
```

### **Add a cat**

`POST /api/v1/cats`

```bash
curl -v -X POST http://localhost:3000/api/v1/cats \
  -d '{ "id": "1", "name": "Elvis", "breedGroup": "Persian", "weight": 10 }' \
  -H "Content-Type: application/json"
```

#### Response

```
...
< HTTP/1.1 201 Created
...
Content-Length: 0
```

### **Delete a cat**

`DELETE /api/v1/cats/:id`

```bash
curl -v -X DELETE http://localhost:3000/api/v1/cats/1
```

#### Response

```
...
< HTTP/1.1 200 OK
...
Content-Length: 0
```
