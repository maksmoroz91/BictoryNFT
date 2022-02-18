// создание поля
let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

// разобьем поле на ячейки
for (let i=1; i<101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

// присвоим координаты каждой ячейке excel тут это уже другая переменная
let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 10;
for (let i=0; i<excel.length; i++) {
    if (x>10) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}   

// создание змеи (будет выдавать два рандомных значения это координа ты от 1 до 10)
function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}
let coordinates = generateSnake();
let bodyNFT = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]')];
 
    // let randN = Math.floor(Math.random( ) * (1+1));
    // bodyNFT[i].style.background = `url(body${randN}.png)`;
// всем элементам добавим класс body
for (let i = 0; i<bodyNFT.length; i++) {
    bodyNFT[i].classList.add('bodyn');

}
//голове добавим класс head
bodyNFT[0].classList.add('head');

// создание яблока
let nft;

function createnft() {
    function generatenft() {
        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }

    let nftCoordinates = generatenft();
    nft = document.querySelector('[posX = "' + nftCoordinates[0] + '"][posY = "' + nftCoordinates[1] + '"]');
    
    while (nft.classList.contains('body')) {
        let nftCoordinates = generatenft();
        nft = document.querySelector('[posX = "' + nftCoordinates[0] + '"][posY = "' + nftCoordinates[1] + '"]');
    }

    nft.classList.add('nft');

}
createnft();
// Движение во вскх напрпавлениях.. по-умолчанию вправо
let direction = 'rigth';
let steps = false; 

//отображение очков
let input = document.createElement('input'); //создание элемента
document.body.appendChild(input);           //добавление елемента в body
//стиль для этого элемента
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
background-color: #3BF1A5;
display: block
`;
//количество очков
let score = 0;
input.value = `Collected NFT: ${score}`;

//движение змеи
function move() {
    let snakeCoordinates = [bodyNFT[0].getAttribute('posX'), bodyNFT[0].getAttribute('posY')];
    bodyNFT[0].classList.remove('head');
    bodyNFT[bodyNFT.length-1].classList.remove('bodyn');
    bodyNFT.pop();

    if (direction == 'rigth') {
        if (snakeCoordinates[0] < 10) {
            bodyNFT.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            bodyNFT.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            bodyNFT.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            bodyNFT.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            bodyNFT.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
        } else {
            bodyNFT.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    }else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            bodyNFT.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));
        } else {
            bodyNFT.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
        }
    }
    
    if (bodyNFT[0].getAttribute('posX') == nft.getAttribute('posX') && bodyNFT[0].getAttribute('posY') == nft.getAttribute('posY')) {
        nft.classList.remove('nft');
        let a = bodyNFT[bodyNFT.length - 1].getAttribute('posX');
        let b = bodyNFT[bodyNFT.length - 1].getAttribute('posY');
        bodyNFT.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createnft();
        score++;
        input.value = `Collected NFT: ${score}`;
    }

    if (bodyNFT[0].classList.contains('bodyn')) {
        setTimeout(() => {
            if(!alert(`The end. Collected NFT: ${score}`)){window.location.reload();}
        }, 400);
        
        clearInterval(interval);
    
    }

    bodyNFT[0].classList.add('head');
    for (let i = 0; i<bodyNFT.length; i++) {
        bodyNFT[i].classList.add('bodyn');
    }
    steps = true;
}

let interval = setInterval(move, 200); 

//Обработчик событий
window.addEventListener('keydown', function (e) {
    //глобальное условие. пока не сделан ход..другие направления не работают(усправили баг)
    if (steps == true) {
        //код нажатия стрелок
        if (e.keyCode == 37 && direction!= 'rigth') {
            direction = 'left';
            steps = false;
        }
        else if (e.keyCode == 38 && direction!= 'down') {
            direction = 'up';
            steps = false;
        } 
        else if (e.keyCode == 39 && direction!= 'left') {
            direction = 'rigth';
            steps = false;
        }
        else if (e.keyCode == 40 && direction!= 'up') {
            direction = 'down';
            steps = false;
        }        
    }
    
});
