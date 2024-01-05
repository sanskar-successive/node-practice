import events from "events";

const eventEmitter = new events.EventEmitter();

const eventName = "greet";

const eventListener1 = (greeting)=>{
    console.log(`Listener 1 ${greeting}`)
}

const eventListener2 = (greeting)=>{
    console.log(`Listener 2 ${greeting}`)
}

eventEmitter.on(eventName, eventListener1);
eventEmitter.on(eventName, eventListener2);

eventEmitter.once(eventName, ()=>{
    console.log('this is called only once')
})

const greetMessage = "Hi events"

eventEmitter.emit(eventName, greetMessage);
eventEmitter.emit(eventName, greetMessage);


class MyEventEmitter extends events.EventEmitter{

    sendMessage(message){
        this.emit('message', message);
    }

    sendData(data){
        this.emit('data', data);
    }
}

const myEmitter = new MyEventEmitter();

myEmitter.on('message', (message)=>{
    console.log(message);
})

myEmitter.on('data', (data)=>{
    console.log(data);
})


myEmitter.sendMessage("my custom event emitter calling sendMessage")
myEmitter.sendData({ key: 'value', number: 42 })


class MyErrorEmitter extends events.EventEmitter{

    throwError(errorMessage){
        const customError = new Error(errorMessage);
        this.emit('error', customError);
    }
}

const errorEmitter = new MyErrorEmitter();

errorEmitter.on('error', (error)=>{
    console.error(error.message);
})

errorEmitter.throwError('custom error message')


// custom event emitter

class CustomEventEmitter{

    constructor(){
        this.events = {};
    }

    on(eventName, listener){
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit(eventName, ...args){
        const listeners = this.events[eventName];
        if(listeners){
            listeners.forEach(listener => listener(...args))
        }
    }

    removeListener(eventName, listenerToRemove){
        const listeners = this.events[eventName];
        if(listeners){
            this.events[eventName] = listeners.filter(listener => listener !== listenerToRemove)
        }
    }
}


const customEmitter = new CustomEventEmitter();

const greetListener = ()=>console.log('Custom greet listener')
const dataListener = (data)=>console.log(data);

customEmitter.on('greet', greetListener);
customEmitter.on('data', dataListener);

customEmitter.emit('greet');
customEmitter.emit('data', {key : "custom data", value: "secret data"})

customEmitter.removeListener('greet', greetListener);

customEmitter.emit('greet');
customEmitter.emit('data', {key : "custom data", value: "secret data"})

