"use client";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { Carrinho } from "../_types/typeCarrinho";
import { currency } from "../_utils/Currency";

type CarrinhoProps = {
  carrinho: Carrinho[];
  novoPedido: () => void
};
export default function PedidoConfirma({
  carrinho,
  novoPedido
}: CarrinhoProps) {
  

  const total = carrinho.reduce(
    (acumulador, valorAtual) =>
      acumulador + valorAtual.item.preco * valorAtual.quantidade,
    0)
  return (
    <div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-[30em] flex flex-col gap-5 z-10 rounded-xl">
        <CircleCheck className="size-16 stroke-1 text-green-700" />
        <h1 className="font-semibold text-3xl">Pedido confirmado</h1>
        <p className="text-neutral-400 font-light">
          Esperamos que você goste da sua comida!
        </p>
        <div className="bg-background p-5 rounded-xl flex flex-col gap-7">
          {/* FORA DO SCROLL */}
          <div className="w-full h-32 overflow-x-scroll gap-4 flex flex-col">
            {/* SCROLL */}
            {carrinho.map((item) => (
              <div key={item.item.id} className="flex justify-between items-center border-b pb-2 border-b-gray-400">
                <div className="flex gap-5">
                  <Image
                    width={60}
                    height={60}
                    alt=""
                    src={item.item.img}
                    className="rounded-xl"
                  />
                  <div className="">
                    <h1>{item.item.nome}</h1>
                    <div className="flex gap-4 items-end">
                      <p className="text-orange-700 text-xl tracking-tighter">
                        {item.quantidade}x
                      </p>
                      <p className="text-gray-400 text-base">${item.item.preco}</p>
                    </div>
                  </div>
                </div>
                <h1 className="font-semibold">{currency.format(item.item.preco)}{}</h1>
              </div>
            ))}
            {/* SCROLl */}
          </div>
          {/* FORA DO SCROLL */}
          <div className="flex justify-between">
            <h1 className="text-black font-medium text-2xl break-words">
              Total:
            </h1>
            <h1 className="text-black font-medium text-2xl break-words">{currency.format(total)}</h1>
          </div>
          <button onClick={novoPedido} className="bg-orange-700 p-4 rounded-full text-white hover:opacity-50">
            Novo Pedido?
          </button>
        </div>
      </div>
    </div>
  );
}
