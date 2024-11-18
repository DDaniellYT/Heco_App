A demo web app for Heco Schrauben Screw factory in Romania.

Intended to fix and or remove dead times that show up in the factory.
Like slow information propagation and inneficient commutes.

Current attributions:

Client-Side:
    Pages/AvailableRoutes:
        Error           // the error page you are redirected to if you go to a endpoint that doesnt exist
        Login           // the first page someone sees when entering the site
        Home            // the home page with all necessary data
        Department      // department specific page
        Request         // requesting help page
        Response        // respondin to a help request page
        Inventory       // factory inventory page

        *Complete Profiles with a profile being
            id              // inside the db
            username        // the profile`s username
            password        // small security by just having a check with this, no encryption yet
            firstName 
            lastName
            department      // department inside the factory
            role            // what you do in said department
            time            // when account created
            existance       // if inside the factory or not
        -each user can loggin inside their account with their credentials and acces the pages listed at the top
        in order to document their workings or say they are working on something

        *Complete Tasks with a task being
            id              // inside the db
            subject         // the tasks subject or even name
            message         // the tasks optional message 
            priority        // priority of the task
            sender          // who made the request/task
            reciever        // who accepted/finished the task
            time            // when created
            time            // when accepted
            time            // when finished
            status          // if requested,accepted,finished
        -each user can accept the requests and they appear in their own acceptedTasks area
        from where they can either abandon or say they finished the task

        *Complete Inventory with an item being
            id              // inside the db
            name            // the name of the object
            department      // who`s department it is
            state           // if its functional working broken etc.., up to the user to say which
            place           // the location inside the halls, shelves, spaces
            existance       // if the item is there
            last            // who last used it
        -each user can take an item and use it and then place it back by saying its existance
        the users can place, replace or take out an item from the hall/shelf/space by either
        inserting, updating or deleting it
        

