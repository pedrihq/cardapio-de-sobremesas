"use client";
import Image from "next/image";
import "./globals.css";
import { useEffect, useState } from "react";
import CarrinhoComponent from "./_components/CarrinhoComponent";
import { currency } from "./_utils/Currency";
import PedidoConfirm from "./_components/PedidoConfirmComponent";

export type Sobremesas = {
  img: string;
  tipo: string;
  nome: string;
  preco: number;
  id: number;
};
type Carrinho = {
  quantidade: number;
  item: Sobremesas;
};
export default function Home() {
  const sobremesa: Sobremesas[] = [
    {
      img: "/img/image-baklava-desktop.jpg",
      tipo: "Waffle",
      nome: "Waffle com frutas vermelhas",
      preco: 15.5,
      id: 1,
    },
    {
      img: "/img/image-creme-brulee-desktop.jpg",
      tipo: "Creme Brûlée",
      nome: "Creme Brûlée de Vanilla Bean",
      preco: 12.34,
      id: 2,
    },
    {
      img: "/img/image-macaron-desktop.jpg",
      tipo: "Macaron",
      nome: "Macaron Mistura de Cinco",
      preco: 10.5,
      id: 3,
    },
    {
      img: "/img/image-tiramisu-desktop.jpg",
      tipo: "Tiramisu",
      nome: "Tiramisu Clássico",
      preco: 16,
      id: 4,
    },
    {
      img: "/img/image-baklava-desktop.jpg",
      tipo: "Waffle",
      nome: "Waffle com frutas vermelhas",
      preco: 13,
      id: 5,
    },
    {
      img: "/img/image-meringue-desktop.jpg",
      tipo: "Torta",
      nome: "Torta De Limão Com Merengue",
      preco: 18.55,
      id: 6,
    },
    {
      img: "/img/image-cake-desktop.jpg",
      tipo: "Bolo",
      nome: "Bolo De Veludo Vermelho",
      preco: 10.9,
      id: 7,
    },
    {
      img: "/img/image-brownie-desktop.jpg",
      tipo: "Brownie",
      nome: "Brownie de Caramelo Salgado",
      preco: 10.2,
      id: 8,
    },
    {
      img: "/img/image-panna-cotta-desktop.jpg",
      tipo: "Panna Cotta",
      nome: "Panna cotta de baunilha",
      preco: 5.5,
      id: 9,
    },
  ];
  const [carrinho, setCarrinho] = useState<Carrinho[]>([]);
  const [carrinhoConfirmada, setCarrinhoConfirmada] = useState(false)

  useEffect(() => {
    console.log(carrinho);
  }, [carrinho]);

  function addCarrinho(item: Sobremesas) {
    setCarrinho((estado) => [...estado, { quantidade: 1, item }]);
  }

  function verificaCarrinho(id: number) {
    const posicao = carrinho.findIndex((item) => {
      return item.item.id == id;
    });
    if (posicao !== -1) {
      return true;
    }
    return false;
  }

  function removerItemCarrinho(id: number){
   return setCarrinho((estado) => estado.filter((item) => item.item.id !== id))
  }
  function atualizaCarrinho(id: number, func: "soma" | "subtrai") {
    const itemSobremesa = pegaItemCarrinho(id);
    if (itemSobremesa) {
      if (func == "soma") itemSobremesa.quantidade += 1;
      else itemSobremesa.quantidade -= 1;

      if(itemSobremesa.quantidade === 0){
       return removerItemCarrinho(id)
      }

      setCarrinho((estado) => {
        const itensCarrinho = estado.filter(
          (carrinho) => carrinho.item.id !== id
        );
        return [...itensCarrinho, itemSobremesa!];
      });
    }
  }

  function botaoConfimaPedido(){
    setCarrinhoConfirmada(true)
  }
  function novoPedido(){
    setCarrinhoConfirmada(false)
    setCarrinho([])
  }
  const pegaItemCarrinho = (id: number) =>
    carrinho.find((carrinho) => carrinho.item.id === id);


  return (
    <main className={`h-screen font-fontPrincipal ${carrinhoConfirmada ? 'overflow-hidden' : ''}`}>
      <h1 className="mt-10 mb-10 font-semibold text-3xl">Sobremesas</h1>
      <div className="flex gap-10">
        <div className="h-screen max-w-full">
          <div className="pb-16 grid grid-cols-3 gap-y-20 gap-x-10">
            {sobremesa.map((sobremesa: Sobremesas) => {
              return (
                <div key={sobremesa.id} className="w-52 flex flex-col">
                  <Image
                    src={sobremesa.img}
                    alt="Imagem da sobremesa"
                    height={200}
                    width={300}
                    className={`rounded-2xl ease-in-ou transition duration-500 border-2 ${verificaCarrinho(sobremesa.id) ? 'border-orange-700' : 'border-transparent'}`}
                  />
                  {verificaCarrinho(sobremesa.id) === true ? (
                    <div className="w-40 h-14 p-3 gap-5 border border-orange-700 rounded-full relative top-[-25px] left-7 flex items-center justify-center ease-in-ou transition duration-500 text-xl text-white bg-orange-700">
                      <button
                        onClick={() =>
                          atualizaCarrinho(sobremesa.id, "subtrai") 
                        }
                        disabled={
                          !pegaItemCarrinho(sobremesa.id) ||
                          pegaItemCarrinho(sobremesa.id)!.quantidade <= 0
                        }
                        className="rounded-full border-2 border-white w-8 text-center"
                      >
                        -
                      </button>
                      <p>{pegaItemCarrinho(sobremesa.id)?.quantidade}</p>
                      <button
                        onClick={() => atualizaCarrinho(sobremesa.id, "soma")}
                        className="rounded-full border-2 border-white w-8 text-center"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addCarrinho(sobremesa)}
                      className="w-40 h-14 p-3 border border-black rounded-full relative top-[-25px] left-7 flex items-center justify-center ease-in-ou transition duration-500 gap-1 text-sm bg-white hover:border-orange-700"
                    >
                      <Image
                        src="/img/icon-add-to-cart.svg"
                        alt="Imagem da sobremesa"
                        height={20}
                        width={20}
                        className=""
                      />
                      Add carrinho
                    </button>
                  )}
                  <div className="top-96">
                    <p className="text-neutral-400 font-light">
                      {sobremesa.tipo}
                    </p>
                    <h1 className="text-black font-medium text-2xl break-words">
                      {sobremesa.nome}
                    </h1>
                    <p className="text-orange-500 font-bold">
                      {currency.format(sobremesa.preco)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <CarrinhoComponent carrinho={carrinho} removerItem={removerItemCarrinho} confirmaPedido={botaoConfimaPedido}/>
      </div>
      {carrinhoConfirmada && <PedidoConfirm novoPedido={novoPedido} carrinho={carrinho}/>}
    </main>
  );
}
