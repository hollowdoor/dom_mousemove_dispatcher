import mouseMoveDispatcher from '../';

const dispatcher = mouseMoveDispatcher(window);

let div = document.querySelector('div')
div.addEventListener('mousemove', (e)=>{
    //This event might have been dispatched by the dispatcher.
    console.log(
        'mouse moving dispatched = ',e.dispatched,
        ' event =', e,
        ' data =', e.data
    );
});

div.addEventListener('mousemove', (e)=>{
    if(e.data === 'myEvent'){
        //The event was dispatched from this listener.
        //To prevent infinite recursion don't refire.
        e.stopPropagation();
        return;
    }
    //Re-dispatch this event.
    dispatcher.dispatch(div, e, 'myEvent');
});

//Dispatch an event with a clientX property.
setTimeout(()=>dispatcher.dispatch(div, {clientX: 500}), 1000);
