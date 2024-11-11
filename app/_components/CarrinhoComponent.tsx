"use client";
import { CircleX } from "lucide-react";
import Image from "next/image";
import type { Carrinho } from "../_types/typeCarrinho";
import { currency } from "../_utils/Currency";

type CarrinhoProps = {
  carrinho: Carrinho[];
  confirmaPedido:  () => void,
  removerItem: (id: number) => void;
};
export default function CarrinhoComponent({
  carrinho,
  removerItem,
  confirmaPedido
}: CarrinhoProps) 

{
  const total = carrinho.reduce(
    (acumulador, valorAtual) =>
      acumulador + valorAtual.item.preco * valorAtual.quantidade,
    0
  );
  return carrinho.length == 0 ? (
    <div className="h-auto sticky top-10 w-[25em]">
      <div className="bg-white h-[20em] border rounded-3xl p-10 shadow-2xl">
        <h1 className="font-semibold text-2xl text-orange-700">
          Seu carrinho(0)
        </h1>
        <div className="h-full justify-center flex items-center text-center flex-col gap-5">
          <Image
            src="/img/illustration-empty-cart.svg"
            alt="Bolo cortado"
            width={150}
            height={150}
          />
          <p className="text-neutral-400 font-extrabold">
            Seus itens adicionados aparecerão aqui
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-auto sticky top-10 w-[25em]">
      <div className="bg-white h-full border rounded-3xl p-10 sticky top-24 shadow-2xl flex flex-col gap-5">
        <h1 className="font-semibold text-2xl text-orange-700">
          Seu carrinho({carrinho.length})
        </h1>
        <div className="h-full flex items-baseliner text-left flex-col gap-5">
          <div>
            <div className="flex justify-between flex-col items-start pb-4 gap-5">
              {carrinho.map((item) => (
                <div
                  key={item.item.id}
                  className="flex justify-between items-center w-full border-b border-b-gray-400"
                >
                  <div className="flex-col flex">
                    <p>{item.item.nome}</p>
                    <div className="flex gap-4 items-end">
                      <p className="text-orange-700 text-2xl tracking-tighter">
                        {item.quantidade}x
                      </p>
                      <p className="text-gray-400 text-base">
                        <strong className="text-xs">@</strong>
                        {item.item.preco}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => removerItem(item.item.id)}>
                    <CircleX className="text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-2xl">
              <h1 className="font-light">Total:</h1>
              <h1 className="font-semibold">{currency.format(total)}</h1>
            </div>
          </div>
          <div className="bg-background p-4 rounded-xl justify-center flex items-center gap-5">
            <Image
              src="/img/icon-carbon-neutral.svg"
              alt="Bolo cortado"
              width={20.5}
              height={20.5}
            />
            <p className="text-xs">Esta é uma entrega neutra em carbono</p>
          </div>
          <button onClick={confirmaPedido} className="bg-orange-700 p-4 rounded-full text-white hover:opacity-50">
            <p>Confirma pedido</p>
          </button>
        </div>
      </div>
    </div>
  );
}
