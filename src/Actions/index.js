import {APP_INIT,TEST} from '../Constants';

export const onAppIit = () =>{
    return{
        type:APP_INIT,
    }
};

export const testAction = (list) =>{
    let tempArr = [...list];
    const lastNum =  list[list.length-1];
    if(tempArr.length<20){
        tempArr= [...tempArr,(lastNum+1)];
    }

    return{
        type:TEST,
        arr:tempArr,
        style:""
    }
};