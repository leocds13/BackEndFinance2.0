export interface INeuronio {
	bias: number;
	saida: number;
	pesos: number[];
    qtdeLigacoes: number;
    camadaAnterior?: ICamada;

    fnAtiv?: string;

	calcSaida(): number;
}

export interface ICamada {
    neuronios: INeuronio[];
    qtdeNeuronios: number;
}

export interface IRede {
    camadaEntrada: ICamada;
    camadasEscondidas: ICamada[];
    camadaSaida: ICamada;

    qtdeCamadasEscondidas: number;

    feedFoward(entradas: number[]): number[];
    backProp(esperado: ICamada): void;
}

export const funcoesDeAtivacao = {
    relu(val: number) {
		if (val < 0) {
			return 0;
		} else {
			return val;
		}
	},
    reluDx(val: number) {
		if (val < 0) {
			return 0;
		} else {
			return 1;
		}
	},
    sigmoid(val: number) {
		return 1.0 / (1.0 + Math.exp(-val));
	},
    tanh(val: number) {
		return val;
	}
}