for (let i=1;i<82;i++){
    document.getElementById('cell'+i.toString()).style.backgroundColor = 'transparent'
}

function eraser(ID){
    document.getElementById(ID).value = null
    check()
}

function placeNumber(ID){
    
    for (let i=1;i<82;i++){
        if (document.getElementById('cell'+i.toString()).className === "blockclicked"){
            document.getElementById('cell'+i.toString()).value = document.getElementById(ID).value
        }
    }
    check()
}

function selected(ID){
    let checked = false
    if (document.getElementById(ID).className === "blockclicked"){checked = true}

    for (let i=1;i<82;i++){
        document.getElementById('cell'+i.toString()).className = "block"
        document.getElementById('cell'+i.toString()).style.backgroundColor = 'white'
    }

    if (checked === false){
        document.getElementById(ID).style.backgroundColor = 'rgba(0, 100, 155, 0.2)'
        document.getElementById(ID).className = "blockclicked"
    }
}


function columnCheck(){

    let ID = 'cell';
    let valid = true;
    for (let i = 1; i<10; i++){
        let column = [];
        for (let j = i; j<73+i; j+=9){
            column.push(document.getElementById(ID+j.toString()).value)
        };
        column = column.filter(item => item);
        if (column.length !== new Set(column).size){
            valid = false;

            for (let j = i; j<73+i; j+=9){
                document.getElementById(ID+j.toString()).style.backgroundColor = "rgba(240, 15, 0, 0.8)"
            };

        };
    };
        return valid;
    };

function rowCheck(){

    let ID = 'cell';
    let valid = true;
    for (let i = 1; i<74; i+=9){
        let row = [];
        for (let j = i; j<i+9; j++){
            row.push(document.getElementById(ID+j.toString()).value)
        };
        row = row.filter(item => item);
        if (row.length !== new Set(row).size){
            valid = false;

            for (let j = i; j<i+9; j++){
                document.getElementById(ID+j.toString()).style.backgroundColor = "rgba(240, 15, 0, 0.8)"
            };
        };
    };
        return valid;
    };

function nonetCheck(){
    let valid = true;
    let nonetbase=[1, 2, 3, 10, 11, 12, 19, 20, 21];
    let ID = '';
    for (let k=0;k<3;k++){
        for (let j=0;j<3;j++){
            let nonet=[];
            for (let i=0;i<9;i++){
                ID='cell'+(nonetbase[i]+27*k+j*3).toString()
                nonet.push(document.getElementById(ID).value)
            };
            nonet = nonet.filter(item => item);
            if (nonet.length !== new Set(nonet).size){
                valid = false;

                for (let i=0;i<9;i++){
                    ID='cell'+(nonetbase[i]+27*k+j*3).toString()
                    document.getElementById(ID).style.backgroundColor = "rgba(240, 15, 0, 0.8)"
                };

            };
        };
    };
    return valid;
};

function check(){

    let valid = true;
    let board = [];
    let ID = 'cell';

    for(let i = 1; i < 82; i++){
        document.getElementById(ID+i.toString()).style.backgroundColor = "white"};

    let check1=columnCheck();
    let check2=rowCheck();
    let check3=nonetCheck();

    if (check1 && check2 && check3){

        valid = true;
    }
    else {
        valid = false;
    }

    for(let i = 1; i < 82; i++){
        board.push(document.getElementById(ID+i.toString()).value);}
    board = board.filter(item => item);
    if (board.length === 81 && valid === true){
        for(let i = 1; i < 82; i++){
            board.push(document.getElementById(ID+i.toString()).style.backgroundColor = "rgba(0, 200, 55, 0.6)");
        }
    }

}

function generateBoard(emptycells){

    clearBoard()
    let alloptions = Array.from(Array(81), (_, i) => i + 1);
    //Fill each nonet with random valid numbers
    let options = [1,2,3,4,5,6,7,8,9];
    let nonetbase=[1, 2, 3, 10, 11, 12, 19, 20, 21];
    let ID = '';
    for (let k=0;k<3;k++){
        for (let j=0;j<3;j++){
            let choice = [getNumber()];
            for (let i=0;i<9;i++){
                ID='cell'+(nonetbase[i]+27*k+j*3).toString()
                if (i+1 === choice[0]){
                    options=shuffle(options);
                    for (let i=0;i<9;i++){
                        document.getElementById(ID).value = options[i]
                        document.getElementById(ID).disabled = true
                        if (quickCheck()===false){
                            document.getElementById(ID).value = null
                            document.getElementById(ID).disabled = false
                        }
                    }
                }
            }
        }
    }

    try{
    solver(1)
    }catch(e){
    }
    
    for (let i=0;i<81-emptycells;i++){
        alloptions=shuffle(alloptions)
        alloptions.pop()
    }
    for (let i=0;i<alloptions.length;i++){
        document.getElementById('cell' + alloptions[i].toString()).value = null
        document.getElementById('cell' + alloptions[i].toString()).disabled = false
    }
    

    check()

    function solver(index){

        while (Number.isInteger(document.getElementById('cell' + index.toString()).value)){
            index+=1;
        }
        for (let j=1;j<10;j++){
            document.getElementById('cell' + index.toString()).value = j;
            document.getElementById('cell' + index.toString()).disabled = true;
                if (quickCheck()){
                    solver(index+1)}
        }
        document.getElementById('cell' + index.toString()).value = null;
        document.getElementById('cell' + index.toString()).disabled = false;
    }


}


function quickCheck(){
    let valid = false
    if (columnCheck() && rowCheck() && nonetCheck()){
        valid = true
    }
    return valid;
}

function getNumber() {
    min = Math.ceil(1);
    max = Math.floor(9);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function boardFull(){
    board=[]
    for(let i = 1; i < 82; i++){
        board.push(document.getElementById('cell'+i.toString()).value);}
    board = board.filter(item => item);
    if (board.length === 81){
        return true;}
    else {
        return false;}
    }

function clearBoard(){
    for(let i = 1; i < 82; i++){
        document.getElementById('cell'+i.toString()).value = null
        document.getElementById('cell'+i.toString()).disabled = false
    }
}