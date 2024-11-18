A demo web app for Heco Schrauben Screw factory in Romania.

Intended to fix and or remove dead times that show up in the factory.
Like slow information propagation and inneficient commutes.

    *Current attributions:

    *Client-Side:
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
            
    *Server-Side:
        I've used at the beggining storage inside arrays inside the server
            -hard to mentain
            -data wasn't permanent
            -seen no more progress after i've reached the user storage point
        Switched to working with a database, using sqlite3 on the local computer for a more permanent
        way of storage

        The endpoints are accesed using axios for ease of use
        The server-calls themselves will be added to a queue in order to manage
        database use and access
        Using a CRUD code architecture where
            I create using app.put
            I read using app.get
            I update using app.post
            I delete using app.delete
        Each of these endpoints checks if the call is alright and sends a conforming status
        The sqlite tables are remade if they don't exist and I insert in each one an entry to test the workings
        The functions called at the endpoints wait for the database to run its query using promises
        Reading from the database can be done choosing the keys of what you want to get back
            for ex:
                I make a call from the client to server using only the department selector
                I get in return all tasks/items that are by/for that department
                If i make a call with the name and department selectors
                I get back the tasks/items that have that name and that department assigned to them
            Most of the calls are in this manner for ease of use
