//must sorted arr
export const emptySeatsIndex ={
    ground:{
        GA:{FR: null, BK:[42,48]},
        NA:{FR: null, BK:null},
        DA:{FR: null, BK:[42,48]},
    },
    loop:{
        GA:{FR:[2,3,4,5,11], BK:[]},
        NA:{FR:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], BK:[]},
        DA:{FR:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], BK:[]},
        LA:{FR:[0,1,2,3,6], BK:[]}
    },
};

export const columns = {
    ground:{
        GA:{FR:7,BK:7},
        NA:{FR:16,BK:16},
        DA:{FR:7,BK:7},
    },
    loop:{
        GA:{FR:6,BK:6},
        NA:{FR:8,BK:8},
        DA:{FR:8,BK:8},
        LA:{FR:6,BK:6}
    },
};

export const numberOfSeats = {
    ground:{
        GA:{FR:35, BK:82-36 },
        NA:{FR:80, BK:177-81},
        DA:{FR:35, BK:83-36},
    },
    loop:{
        GA:{FR:13, BK:80-14},
        NA:{FR:8, BK:97-9},
        DA:{FR:8, BK:97-9},
        LA:{FR:13, BK:80-14 }
    }
};

export const startSeatNum = {
    ground:{
        GA:{FR:1, BK:36},
        NA:{FR:1, BK:81},
        DA:{FR:1, BK:36},
    },
    loop:{
        GA:{FR:1, BK:14},
        NA:{FR:1, BK:9},
        DA:{FR:1, BK:9},
        LA:{FR:1, BK:14}
    }
};