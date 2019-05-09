import React from 'react';
import "./style.scss"


const Mobile = props =>{

    return(
        <div className="mobile">
            <h3> 본 페이지는
                <br/>
                모바일/태블릿 버전을
                <br/>
                지원하지 않습니다.
            </h3>

            <h5> PC 에서 크롬 브라우저로 접속하시면 이용할 수 있습니다.</h5>

        </div>
    )
};

export default Mobile;