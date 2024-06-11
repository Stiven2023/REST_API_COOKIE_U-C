## Posts Actions

### Enpoint Posts

- Request GET response Json with structure:

```JSON
[
  {
    "_id": "66528ac492b4ce51d830dce0",
    "content": "😉😉😉😉",
    "image": null,
    "user": {
      "userId": "1d42-1d42-1d42-sad3",
      "name": "Luis Rodri",
      "nickName": "Rodri",
      "image": "asdadsads",
      "_id": "66528ac492b4ce51d830dce1"
    },
    "likes": [],
    "comments": [],
    "createdAt": "2024-05-26T01:05:08.917Z",
    "updatedAt": "2024-05-26T01:05:08.917Z",
    "__v": 0
  }
]
```

- Resquest Method POST JSON structure:

```js
{
    "content":"😉😉😉😉",
    "user":{
        "userId":"1d42-1d42-1d42-sad3",
        "name":"Luis Rodri",
        "nickName":"Rodri",
        "image":"asdadsads"
    }
}
```

- Request delete post:

```js
const Enpoint: /posts/:postId
```

#### Enpoint Comments

- Request GET response Json with structure.

```JSON
[
    {
        "content": "This is a comment",
        "emoji": "happy",
        "user": {
            "userId": "1234567890",
            "name": "John Doe",
            "nickName": "johnd",
            "image": "http://example.com/image.jpg",
            "_id": "66528d1e92b4ce51d830dcea"
        },
        "_id": "66528d1e92b4ce51d830dce9",
        "createdAt": "2024-05-26T01:15:10.884Z",
        "updatedAt": "2024-05-26T01:15:10.884Z"
    }
]
```

- Resquest Method POST JSON structure:


```JSON
 {
    "content": "This is a comment",
    "emoji":"ungry",
    "user": {
        "userId": "1234567890",
        "name": "John Doe",
        "nickName": "johnd",
        "image": "http://example.com/image.jpg"
    }
}
```

- Request delete comment post:

```js
const Enpoint: /posts/:postId/comments/:commentId
```

```JSON
{
    "Message": "Resource deleted successfully",
    "resource": {
        "content": "This is a comment",
        "emoji": "happy",
        "user": {
            "userId": "1234567890",
            "name": "John Doe",
            "nickName": "johnd",
            "image": "http://example.com/image.jpg",
            "_id": "66528d1e92b4ce51d830dcea"
        },
        "_id": "66528d1e92b4ce51d830dce9",
        "createdAt": "2024-05-26T01:15:10.884Z",
        "updatedAt": "2024-05-26T01:15:10.884Z"
    }
}
```

#### Enpoint Likes

- Request GET response Json with structure:

```JSON
[
    {
        "user": {
            "userId": "1234567890asdasds",
            "name": "Alexis Gonzales",
            "nickName": "Cameron",
            "image": "https//:Uri",
            "_id": "665291163e8669100ef1b1ee"
        },
        "_id": "665291163e8669100ef1b1ed",
        "createdAt": "2024-05-26T01:32:06.973Z",
        "updatedAt": "2024-05-26T01:32:06.973Z"
    }
]
```

- Resquest Method POST JSON structure:


```JSON
 {
    "content": "This is a comment",
    "emoji":"ungry",
    "user": {
        "userId": "1234567890",
        "name": "John Doe",
        "nickName": "johnd",
        "image": "http://example.com/image.jpg"
    }
}
```

- Request delete comment post:

```js
const Enpoint: /posts/:postId/Likes/:LikeId
```

```JSON
{
    "Message": "Resource deleted successfully",
    "like": {
        "user": {
            "userId": "1234567890asdasds",
            "name": "Alexis Gonzales",
            "nickName": "Cameron",
            "image": "https//:Uri",
            "_id": "665291163e8669100ef1b1ee"
        },
        "_id": "665291163e8669100ef1b1ed",
        "createdAt": "2024-05-26T01:32:06.973Z",
        "updatedAt": "2024-05-26T01:32:06.973Z"
    }
}
```
