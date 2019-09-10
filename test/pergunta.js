var readline = require("readline")
var arvore = require("./pergunta.json")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function predict(arv) {
    rl.question(arv.pergunta, testa_resposta)
    
    function testa_resposta(resposta) {
        lowerCaseRes = resposta.toLowerCase()        
        if (lowerCaseRes === "sim" || lowerCaseRes === "si" || lowerCaseRes === "s" || lowerCaseRes === "yes" || lowerCaseRes === "y" || lowerCaseRes === "e" || lowerCaseRes === "eh" || lowerCaseRes === "é") {            
            if (!arv.sim.pergunta) {
                console.log(arv.sim.no)
                rl.close();
            } else {                
                predict(arv.sim)
            }           
        } else if (lowerCaseRes === "nao" || lowerCaseRes === "não" || lowerCaseRes === "no" || lowerCaseRes === "n") {
            if (!arv.nao.pergunta) {
                console.log(arv.nao.no)
                rl.close();
            } else {                
                predict(arv.nao)
            }
        } else {
            console.log("Insira uma resposta válida")
            predict(arv)
        }        
    }   
}

predict(arvore)


