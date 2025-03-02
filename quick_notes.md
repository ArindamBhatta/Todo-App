# Express.js Todo API

### Overview
This project is a simple Todo API using Express.js. It demonstrates how to use middleware, handle different HTTP methods, and manage a global state.


### Middleware: -
In express.js middleware functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle. They act as intermediaries that can intercept, manipulate, or terminate requests before they reach route handlers.

### Key Capabilities of Middleware: -
- `Execute any code` : You can perform a wide range of tasks within middleware, such as logging, authentication, data parsing, error handling, and more.

- `Modify request and response objects` : Middleware can access and modify properties of the req and res objects, allowing you to add information or later the flow of data.

- `Terminate the request-response cycle` : If a middleware function decides to handle the request entirely, it can send a response directly and prevent further processing.

- `Pass control to the next middleware` : By calling the next() function, middleware signals that it's finished with its processing and allows the next middleware in the chain to execute. If there's no next middleware, the route handler is called.

```
app.use((req, res, next) => {
  console.log("Middleware is Working");
  next();
  console.log("The Whole Request URL is", req.url);
  console.log("Query Parameters:", req.query);
  // Note: Be cautious about logging request bodies for security reasons
  // console.log("Request Body:", req.body);  // Uncomment for specific use cases

  // ... (Middleware logic that might modify response)

  res.on('finish', () => {
    console.log("Response Status:", res.statusCode);
    // Note: Be cautious about logging response bodies for security reasons
    // console.log("Response Body:", res.body);  // Uncomment for specific use cases
  });
});

```
### How Params Work
- req.params is used to access route parameters if you have a route like /books/:id, where :id is a route parameter
```
app.get("/user/:name", (req, res) => {
//  if we needs to take the variable from the url we needs to use params
  const name = req.params.name;
//  req.params == { name: 'adam' }
  res.send(`${name} is logged in`);
});
```
### How query Work
- route path: - `http://localhost:3000/books?author=Martin&title=Game_of_Thrones`
```
app.get("/user", (req, res) => {
   const {author,title} = req.params;
  res.send(`${author} and ${title} coming from url query`)
})
```


### Todo API Logic
- global Scope
  1. Create a global object where we store all todo `globalTodo{}`
  2. Create a id for increment purpose `globalId = 0`

### Read All Todo
- `function getTodoHandler()` : -
data is store in a global object if we needs to fetch that data: -
`Object.values(globalObject)`. pass globalObject to get all data in array format

Example:-
```
        const object1 = {
            a: 'some string',
            b: 42,
            c: false,
        };
         console.log(Object.values(object1));
        Expected output: Array [0:"some string",1:  42, 2: false]

function getTodoHandler(req, res) {
  const allTodo = Object.values(globalTodo);
  res.send(allTodo);
}
```

### Create Todo
- `function postTodoHandler()` : - 
     1. take values from user which one is come from client
     2. from request object access body
     3. body is also a object access specific property title and description
     4. after access all that data push to global object for store that data
- `question is how do i push this data in global object?`
1. Create a object 1st
```
  newTodo =  {
                id : globalId++,
                title,
                description
            }
```
2. then assign this data in globalTodo one by one

#####  create a Object, and assign data using . property 
- 1st way To initialize a property in a object `myObj.property` property is only string datatype
```
 let myObj ={
            name: "Tony"
        } 
        myObj.middleName = null;
        myObj.surName = "Stark"
        console.log(myObj)
```
- 2nd way to assign data in a object using `myObj[property]` when you property is number datatype
```
       let myObj = {};

        const firstObj = {
            name: "Xiaomi",
            version:"note 8 Pro",
            user: "8 million"
        };
        const secondObj = {
            name: "Samsung",
            version:" Pro",
            user: "9 million"
        };

        myObj[0] = firstObj;
        myObj[1] = secondObj;

        console.log(myObj); 
```  
`so Answer is`
###### globalTodo[newTodo.id] = newTodo; 


### Delete Todo
- function deleteTodoHandler()
    1. For Delete Purpose we needs that id from user, and id object come with dynamic route `req.params = {id : 1}`
    2. so we make it 1st number data type using parseInt() method
    3. req.params.id = 1; 
    4. using delete method with Global object
    5. Send a response message

### Update Todo
- function putTodoHandler()
    1. In putTodoHandler method we edit body and title both method sending id in route parameter
    2. access req.body in a variable also access id in a variable
    3. if(globalTodo[id]){
        push every data in Todo[id]
    } 

### Function call
`Okay, we defined all function but we don't call this function`
```
        app.get("/todo",(req,res)=>{}) //we needs a function definition
        app.get("/todo", function getTodoHandler(req,res){
            logic
        })
```
You don't directly call this function yourself; Express takes care of calling it when appropriate based on incoming HTTP requests.

so, if the  path route is matched then express call the callback function and push the data in the req or res object as per the specification 




