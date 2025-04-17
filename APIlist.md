# devConnect api's

## authRouter
    -POST/signup
    -POST/login
    -POST/logout

## profileRouter
    -GET/profile/view
    -PATCH/profile/edit
    -PATCH/profile/password

## connectionRequestRouter
    -POST/request/send/:status/:userId //status- intrested,ignored (sender's end)
    -POST/request/review/:status/:requestId //status- accepted, rejected (reciever's end)
 

## userRouter
    -GET/user/connections
    -GET/user/requests/received
    -GET/user/feed -gets you the profiles of other users onthe platform

TO create all the router we will need the help of the express router to efficiently manage our API's

