export function uuid() {

    const str1 = 'abcdefghijklm';
    const num1 = Math.floor(Math.random() * 13);
    const strNum1 = num1 - 1
    const subStr1 = str1.substring(strNum1, num1);
    const idNum1 = Math.floor(Math.random() * 9);
    const str = 'nopqrstuvwxyz';
    const num = Math.floor(Math.random() * 13);
    const strNum = num - 1

    const subStr = str.substring(strNum, num);
    const idNum = Math.floor(Math.random() * 9);

    

    const id  = `${subStr1}${idNum1}${subStr}${idNum}`;



    if (id.length == 3) {

        const num2 = `${Math.floor(Math.random() * 9)}`;

        const idMod = id + num2 ;

        return idMod;

    }else if(id.length == 2){

        const numM1 = `${Math.floor(Math.random() * 9)}`;
        const numM2 = `${Math.floor(Math.random() * 9)}`;

        const idMod2 = id + numM1 + numM2 ;

        return idMod2;

        
    }else{
        return id;
    };
};
