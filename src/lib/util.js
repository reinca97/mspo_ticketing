export const seatNameTranslator = seatName =>{

    let result ="";
    const tempArr = seatName.split("_");

    if(tempArr[0]==="ground"){
        result = "1층";
    }else if(tempArr[0]==="loop"){
        result = "2층";
    }

    if(tempArr[1]==="GA"){
        result = result+" 가 열";
    }else if(tempArr[1]==="NA"){
        result = result+ " 나 열";
    }else if(tempArr[1]==="DA"){
        result = result+ " 다 열";
    }else{
        result = result+" 라 열";
    }

    return `${result} ${tempArr[3]}번 좌석`;
};

export const telNumTranslator = telNumStr =>{
  return "0"+telNumStr.slice(3,-1);
};