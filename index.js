let player = {
    name:"You",
    chips: 100
}

//player
let cards=[]
let playerSum = 0 
let hasBlackJack = false
let isAlive = false
let hasStay = false
let hasBet = false
let message =""
let messageEL = document.getElementById("message-el")
let sumEL = document.getElementById("sum-el")
let cardsEl = document.querySelector("#playerCards-el")
let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

//dealer
let dealerCardsEl = document.getElementById("dealerCards-el")
let dealerSumEL = document.getElementById("dealerSum-el")
let dealersCards = []
let dealerSum = 0

//celebration
let celebrationEl = document.getElementById("celebration-el")

//bet sizes
let betSize = 0
function bet10(){
    betSize = 10
    hasBet = true
    celebrationEl.textContent = "$10 Bet placed! Click start game"
} function bet20(){
    betSize = 20
    hasBet = true
    celebrationEl.textContent = "$20 Bet placed! Click start game"
} function bet50(){
    betSize = 50
    hasBet = true
    celebrationEl.textContent = "$50 Bet placed! Click start game"
} function bet75(){
    betSize = 75
    hasBet = true
    celebrationEl.textContent = "$75 Bet placed! Click start game"
}

function startGame(){
    if (hasBet){
        isAlive = true
        hasBlackJack = hasStay = false
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards=[firstCard, secondCard]
        playerSum = firstCard + secondCard
        dealersCards = []
        dealerSum = 0
        dealerCardsEl.textContent = "Dealers Cards: " 
        dealerSumEL.textContent = "Dealers Sum: "
        renderGame()
        hasBet = false
    }
    else {
        celebrationEl.textContent = "Place bet before clicking Start game!"
    }
}

function getRandomCard(){
    cardDrawn = Math.floor(Math.random()*13+1)
    if (cardDrawn >= 11 && cardDrawn <= 13){
        return 10
    } if (cardDrawn === 1){
        return 11
    }
    return cardDrawn
}

function renderGame(){
    cardsEl.textContent = "Cards: " 
    for (let i = 0; i < cards.length; i += 1){
        if (cards[i] === 1){
            cardsEl.textContent += "A" + " "
        } else if (cards[i] === 11){
            cardsEl.textContent += "J" + " "
        } else if (cards[i] === 12){
            cardsEl.textContent += "Q" + " "
        } else if (cards[i] === 13){
            cardsEl.textContent += "K" + " "
        } else{
            cardsEl.textContent += cards[i] + " "
        } 
    }
    sumEL.textContent = "Sum: " + playerSum
    if (playerSum <= 20){
        message = "Do you want to draw another card"
    } else if (playerSum === 21){
        message = "BLACKJACK!!!"
        hasBlackJack = true
        player.chips += (2*betSize)
        playerEl.textContent = player.name + ": $" + player.chips
        celebrationEl.textContent = "Congratulations you have won twice your betsize!!! Place bet first! Then, click start game for new game" 
        betSize = 0
    } else {
        message = "Bust! Better luck next time :("
        isAlive = false
        celebrationEl.textContent = "You have lost your bet. Place bet first! Then, click start game for new game"
        player.chips -= betSize
        playerEl.textContent = player.name + ": $" + player.chips
        betSize = 0
    }
    
    messageEL.textContent = message
}

function hit(){
    if (isAlive && !hasBlackJack && !hasStay){
        let card = getRandomCard()
        playerSum += card
        cards.push(card)
        renderGame()
    }  
}

function stay(){
    if (isAlive && !hasBlackJack && !hasStay){
        let num = getRandomCard()
        dealerSum += num
        dealersCards.push(num)
        dealerCardsEl.textContent += " " + num 
        while (dealerSum < playerSum){
            let num2 = getRandomCard()
            dealerSum += num2
            dealerCardsEl.textContent += " " + num2
        }
        dealerSumEL.textContent = "Dealers Sum: " + dealerSum
        hasStay = true
        if (isAlive && (playerSum > dealerSum || dealerSum > 21)){
            player.chips += betSize
            playerEl.textContent = player.name + ": $" + player.chips
            celebrationEl.textContent = "Congratulations you have won your bet amount!!! Place bet first! Then, click start game for new game"    
        } else{
            player.chips -= betSize
            playerEl.textContent = player.name + ": $" + player.chips
            celebrationEl.textContent = "You have lost your bet amount. Place bet first! Then, click start game for new game"
        }
        betSize = 0
        
    }
}

