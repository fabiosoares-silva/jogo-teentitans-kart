const jogador1 = {
    nome: 'Ravena',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const jogador2 = {
    nome: 'Robin',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const jogador3 = {
    nome: 'Mutano',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const jogador4 = {
    nome: 'Estelar',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const jogador5 = {
    nome: 'Ciborgue',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const jogador6 = {
    nome: 'Silkie',
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

async function rolarDados() {
    return Math.floor(Math.random() * 6 + 1);
}

async function obterBlocoAleatorio() {
    let aleatorio = Math.random();
    let resultado;

    switch (true) {
        case aleatorio < 0.33:
            resultado = 'RETA';
            break;
        case aleatorio < 0.66:
            resultado = 'CURVA';
            break;
        default:
            resultado = 'CONFRONTO';
    }

    return resultado;
}

async function logResultadoDados(personagem, bloco, resultadoDado, atributo) {
    console.log(`${personagem} 🎲 rolou um dado de ${bloco} ${resultadoDado} + ${atributo} = ${resultadoDado + atributo}`);
}

async function motorDoJogo(personagem1, personagem2) {
    for (let jogada = 1; jogada <= 5; jogada++) {
        console.log(`🏁 Jogada ${jogada}`);

        //sortear bloco
        let bloco = await obterBlocoAleatorio();
        console.log(`Bloco: ${bloco}`);

        //rolar dados
        let resultadoDado1 = await rolarDados();
        let resultadoDado2 = await rolarDados();

        //teste de habilidade
        let testeDeHabilidadeTotal1 = 0;
        let testeDeHabilidadeTotal2 = 0;

        if (bloco === 'RETA') {
            testeDeHabilidadeTotal1 = resultadoDado1 + personagem1.velocidade;
            testeDeHabilidadeTotal2 = resultadoDado2 + personagem2.velocidade;

            await logResultadoDados(personagem1.nome, 'velocidade', resultadoDado1, personagem1.velocidade);

            await logResultadoDados(personagem2.nome, 'velocidade', resultadoDado2, personagem2.velocidade);
        }
        if (bloco === 'CURVA') {
            testeDeHabilidadeTotal1 = resultadoDado1 + personagem1.manobrabilidade;
            testeDeHabilidadeTotal2 = resultadoDado2 + personagem2.manobrabilidade;

            await logResultadoDados(personagem1.nome, 'velocidade', resultadoDado1, personagem1.velocidade);

            await logResultadoDados(personagem2.nome, 'velocidade', resultadoDado2, personagem2.velocidade);
        }

        if (bloco === 'CONFRONTO') {
            let resultadoDePoder1 = resultadoDado1 + personagem1.poder;
            let resultadoDePoder2 = resultadoDado2 + personagem2.poder;

            console.log(`${personagem1.nome} confrontou com ${personagem2.nome}! 🥊`);

            await logResultadoDados(personagem1.nome, 'poder', resultadoDado1, personagem1.poder);

            await logResultadoDados(personagem2.nome, 'poder', resultadoDado2, personagem2.poder);

            if (resultadoDePoder1 > resultadoDePoder2 && personagem2.pontos > 0) {
                console.log(`${personagem1.nome} venceu o confronto! ${personagem2.nome} perdeu 1 ponto 🎃`);
                personagem2.pontos--;
            }

            if (resultadoDePoder2 > resultadoDePoder1 && personagem1.pontos > 0) {
                console.log(`${personagem2.nome} venceu o confronto! ${personagem1.nome} perdeu 1 ponto 🎃`);
                personagem1.pontos--;
            }

            if (resultadoDePoder2 === resultadoDePoder1) {
                console.log('Confronto empatado! Nenhum ponto foi perdido.');
            }
        }

        //verificando o vencedor
        if (testeDeHabilidadeTotal1 > testeDeHabilidadeTotal2) {
            console.log(`${personagem1.nome} marcou um ponto! 🥩🍤`);
            personagem1.pontos++;
        } else if (testeDeHabilidadeTotal2 > testeDeHabilidadeTotal1) {
            console.log(`${personagem2.nome} marcou um ponto! 🥩🍤`);
            personagem2.pontos++;
        }

        console.log('-----------------------------------');
    }
}

async function declararVencedor(personagem1, personagem2) {
    console.log('Resultado final:');
    console.log(`${personagem1.nome}: ${personagem1.pontos} ponto(s)`);
    console.log(`${personagem2.nome}: ${personagem2.pontos} ponto(s)`);

    if (personagem1.pontos > personagem2.pontos) {
        console.log(`\n${personagem1.nome} venceu a corrida! Parabéns! 🏆`);
    } else if (personagem2.pontos > personagem1.pontos) {
        console.log(`\n${personagem2.nome} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log('A corrida terminou em empate 🙁');
    }
}

(async function funcaoPrincipal() {
    console.log(`🏁 🚨 Corrida entre ${jogador1.nome} e ${jogador2.nome} começando...\n`);

    await motorDoJogo(jogador1, jogador2);
    await declararVencedor(jogador1, jogador2);
})();
