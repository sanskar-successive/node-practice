// import { stdin, stdout } from 'process'
// import readLine from 'readline'


// const rl = readLine.createInterface({
//     input : stdin,
//     output : stdout
// })


// function getUserInput() {


//     rl.question('enter some input', (input)=>{
//         if(input.toLowerCase()==='exit'){
//             rl.close();
//         }
//         else{
//             console.log(input);
//             getUserInput();
//         }
//     })
// }

// getUserInput();

// rl.on('close', ()=>{
//     console.log('exiting the program');
//     process.exit(0);
// })


// import { stdin, stdout } from 'process'
// import readLine from 'readline'


// const rl = readLine.createInterface({
//     input : stdin,
//     output : stdout
// })


// function calculator(){

//     rl.question('enter first number', (num1)=>{
//         rl.question('enter second number', (num2)=>{
//             rl.question('enter operator', (op)=>{

//                 const number1 = parseFloat(num1);
//                 const number2 = parseFloat(num2);


//                 if(isNaN(number1) || isNaN(number2)){
//                     console.log('please enter a valid number');
//                     calculator();
//                 }

//                 else{


//                     let result;

//                     switch (op){
//                         case '+' :
//                             result = number1+number2;
//                             break;
//                         case '-' :
//                             result = number1-number2;
//                             break;
//                         case '*' :
//                             result = number1*number2;
//                             break;
//                         case '/' :
//                             result = number1/number2;
//                             break;
//                         default :
//                             console.log('invalid operation')
//                             calculator();5
//                     }

//                     console.log(result);

//                     rl.question('Do you want to perform more calculation', (answer)=>{

//                         if(answer.toLowerCase()==='yes'){
//                             calculator();
//                         }
//                         else{
//                             rl.close();
//                         }
//                     })
//                 }


                
//             })
//         })
//     })
// }


// calculator();

// rl.on('close', ()=>{
//     console.log('program exit')
//     process.exit(0)
// })


import { stdin, stdout } from 'process'
import readLine from 'readline'
import fs from 'fs'

const rl = readLine.createInterface({
    input : stdin,
    output : stdout
})

const databaseFile = 'userDatabase.json';

function loadDatabase(){

    try{
        const data = fs.readFileSync(databaseFile);
        return JSON.parse(data);
    }
    catch(err){
        return [];
    }
}


function saveDatabase(data){
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(databaseFile, jsonData);
}


function addUser(){

    rl.question('enter username', (username)=>{
        rl.question('enter email', (email)=>{

            const user = {username, email};

            const database = loadDatabase();
            database.push(user);
            saveDatabase(database);
            console.log('user added successfully');
            mainMenu();
        })
    })
}


function viewUsers(){

    const database = loadDatabase();
    if(!database.length){
        console.log('no users in database')
    }
    else{
        console.log('users : ')

        database.forEach((user,index)=>{
            console.log(`${index+1} ${user.username} ${user.email}`);
        })
    }

    mainMenu();
}


function deleteUser(){

    const database = loadDatabase();
    if(database.length===0){
        console.log('no users to delete');
        mainMenu();
    }

    else{
        viewUsers();

        rl.question('enter user id to delete', (index)=>{

            const id = parseInt(index);
            if(id>=0 && id<database.length){
                const deletedUser = database.splice(id, 1)[0];
                saveDatabase(database);
                console.log(`deleted user --- ${user.username} ${user.email}`)
            }
            else{
                console.log('invalid user')
            }

            mainMenu();
        })
    }
}

function mainMenu(){

    console.log('\nMain Menu:')
    console.log('1 : Add user')
    console.log('2 : View user')
    console.log('3 : Delete user')
    console.log('4 : Exit')

    rl.question('enter your choice', (choice)=>{
        switch (choice){
            case '1' : {
                addUser()
                break;
            }
            case '2':{
                viewUsers();
                break;
            }
            case '3':{
                deleteUser()
                break;
            }
            case '4':{
                rl.close();
                break;
            }
            default:{
                console.log('invalid choice')
                mainMenu();
            }
        }
    })
}

mainMenu();

rl.on('close', ()=>{
    console.log('exiting the program')
    process.exit(0);
})