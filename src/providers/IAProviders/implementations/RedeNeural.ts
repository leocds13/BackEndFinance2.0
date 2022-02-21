import { randomInt } from "crypto";
import fs from "fs";
import { ICamada, INeuronio, IRede } from "./IRedeNeural";

class Neuronio implements INeuronio {
	bias: number;
	pesos: number[] = [];
	saida: number;
	qtdeLigacoes: number;

	constructor(
		public fnAtiv?: (val: number) => number,
		public camadaAnterior?: ICamada
	) {
		this.bias = randomInt(100) / 100;
		this.saida = 0;
		this.qtdeLigacoes = camadaAnterior ? camadaAnterior.qtdeNeuronios : 0;

		if (this.camadaAnterior) {
			this.camadaAnterior.neuronios.forEach(() => {
				this.pesos.push(randomInt(100) / 100);
			});
		}
	}

	calcSaida(): number {
		if (!this.camadaAnterior) {
			return this.saida;
		}
		if (!this.fnAtiv) {
			throw new Error("Função de ativação não definida!");
		}

		if (this.camadaAnterior.qtdeNeuronios !== this.qtdeLigacoes) {
			throw new Error(
				"CamadaAnterior é inconsistente com a quantidade de ligações!"
			);
		}

		const resultCalc = this.camadaAnterior.neuronios.reduce(
			(prev, curr, index) => {
				const valNeuronio = curr.calcSaida();

				const valPesado = valNeuronio * this.pesos[index];

				return prev + valPesado;
			},
			0
		);

		this.saida = this.fnAtiv(resultCalc + this.bias);
		return this.saida;
	}
}

class Camada implements ICamada {
	neuronios: INeuronio[] = [];

	constructor(
		public qtdeNeuronios: number,
		fnAtiv?: (val: number) => number,
		camadaAnterior?: ICamada
	) {
		for (let i = 0; i < qtdeNeuronios; i++) {
			this.neuronios.push(new Neuronio(fnAtiv, camadaAnterior));
		}
	}
}

export class Rede implements IRede {
	camadaEntrada: ICamada;
	camadasEscondidas: ICamada[] = [];
	camadaSaida: ICamada;
	qtdeCamadasEscondidas: number;

	constructor(
		camadaEntrada: {
			qtdeNeuronios: number;
		},
		camadasEscondidas: {
			qtdeNeuronios: number;
			fnAtiv: (val: number) => number;
		}[],
		camadaSaida: {
			qtdeNeuronios: number;
			fnAtiv: (val: number) => number;
		}
	) {
		this.qtdeCamadasEscondidas = camadasEscondidas.length;

		this.camadaEntrada = new Camada(camadaEntrada.qtdeNeuronios);

		camadasEscondidas.forEach((elem, idx) => {
			this.camadasEscondidas.push(
				new Camada(
					elem.qtdeNeuronios,
					elem.fnAtiv,
					idx === 0
						? this.camadaEntrada
						: this.camadasEscondidas[idx - 1]
				)
			);
		});

		this.camadaSaida = new Camada(
			camadaSaida.qtdeNeuronios,
			camadaSaida.fnAtiv,
			this.camadasEscondidas.at(-1)
		);
	}

	feedFoward(entradas: number[]): number[] {
		if (entradas.length !== this.camadaEntrada.qtdeNeuronios) {
			throw new Error("Quantidade de entradas inválida!");
		}

		entradas.forEach((val, i) => {
			this.camadaEntrada.neuronios[i].saida = val;
		});

		return this.camadaSaida.neuronios.map((neuronio) => {
			return neuronio.calcSaida();
		});
	}

	backProp(esperado: ICamada): void {
		// need to implement!
	}

	static saveToFile(file: string, rede: Rede): void {
		const getNeuronioProps = (neuronio: Neuronio) => {
			const { camadaAnterior, saida, ...data } = neuronio;
			return data;
		};

		const data = {
			camadaEntrada: {
				qtdeNeuronios: rede.camadaEntrada.qtdeNeuronios,
				neuronios: rede.camadaEntrada.neuronios.map(getNeuronioProps),
			},
			camadasEscondidas: rede.camadasEscondidas.map((camada) => {
				return {
					...camada,
					neuronios: camada.neuronios.map(getNeuronioProps),
				};
			}),
			camadaSaida: {
				...rede.camadaSaida,
				neuronios: rede.camadaSaida.neuronios.map(getNeuronioProps),
			},
			qtdeCamadasEscondidas: rede.qtdeCamadasEscondidas,
		};

		fs.writeFileSync(file, JSON.stringify(data));
	}

	static loadFromFile(file: string): Rede {
		try {
			const data = fs.readFileSync(file);
			let rede: Rede = JSON.parse(data.toString());

			rede.camadaEntrada.neuronios = rede.camadaEntrada.neuronios.map(
				(neuronio) => {
					return {
						...neuronio,
						saida: 0,
						camadaAnterior: undefined,
					};
				}
			);

			rede.camadasEscondidas.forEach((_, i) => {
				rede.camadasEscondidas[i].neuronios.forEach((_, j) => {
					rede.camadasEscondidas[i].neuronios[j] = {
						...rede.camadasEscondidas[i].neuronios[j],
						saida: 0,
						camadaAnterior:
							i === 0
								? rede.camadaEntrada
								: rede.camadasEscondidas[i - 1],
					};
				});
			});

			rede.camadaSaida.neuronios = rede.camadaSaida.neuronios.map(
				(neuronio) => {
					return {
						...neuronio,
						saida: 0,
						camadaAnterior: rede.camadasEscondidas.at(-1),
					};
				}
			);
            
            let redde = new Rede(
                {
                    qtdeNeuronios: rede.camadaEntrada.qtdeNeuronios
                },[
                    ...rede.camadasEscondidas.map((camada) => {
                        return {
                            qtdeNeuronios: camada.qtdeNeuronios,
                            fnAtiv: Rede.relu
                        }
                    })
                ], {
                    qtdeNeuronios: rede.camadaSaida.qtdeNeuronios,
                    fnAtiv: Rede.relu
                }
            );

			return rede;
		} catch (e) {
			throw e;
		}
	}
}

let MinhaRede = new Rede(
	{
		qtdeNeuronios: 2,
	},
	[
		{
			qtdeNeuronios: 2,
			fnAtiv: Rede.relu,
		},
		{
			qtdeNeuronios: 2,
			fnAtiv: Rede.relu,
		},
		{
			qtdeNeuronios: 2,
			fnAtiv: Rede.relu,
		},
	],
	{
		qtdeNeuronios: 2,
		fnAtiv: Rede.relu,
	}
);

MinhaRede = Rede.loadFromFile("test.json");

// const results = MinhaRede.feedFoward([11, 43]);
// console.log(results);
