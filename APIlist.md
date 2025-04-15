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
        -POST/request/send/intrested/:userId
        -POST/request/send/ignored/:userId
        -POST/request/review/accepted/:requestId
        -POST/request/review/rejected/:requestId

    ## userRouter
        -GET/user/connections
        -GET/user/requests/received
        -GET/user/feed -gets you the profiles of other users onthe platform

TO create all the router we will need the help of the express router to efficiently manage our API's

