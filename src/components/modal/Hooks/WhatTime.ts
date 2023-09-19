const CreateDay = () => {
    // 현재 날짜를 생성
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return year + '.' + month + '.' + day;
};

const CreateTime = () => {
    // 현재 시간을 생성
    let Hours: number | string = new Date().getHours();
    let Min: number | string = new Date().getMinutes();
    let Sec: number | string = new Date().getSeconds();
    Hours = String(Hours).padStart(2, '0');
    Min = String(Min).padStart(2, '0');
    Sec = String(Sec).padStart(2, '0');
    return Hours + ' ' + ':' + ' ' + Min + ' ' + ':' + ' ' + Sec;
};

export { CreateDay, CreateTime };
