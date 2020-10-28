const { ObjectId } = require('mongodb');

const vendasModel = require('../models/vendasModels');
const produtoModel = require('../models/produtosModels');
const validador = require('./validador');

const diminuiComplexidade = async (prod, quantity) => {
  const { _id, name } = prod;
  if (prod.quantity >= quantity) {
    const novaQ = prod.quantity - quantity;
    // atualizar lista de produto
    if (novaQ === 0) {
      await produtoModel.deletaProduto(_id);
      return true;
    }
    await produtoModel.atualizarProduto(_id, name, novaQ);
    return true;
  }
};

const addVendasService = async (lista) => {
  try {
    const results = Promise.all(
      lista.map(async ({ productId, quantity }) => {
        await validador.schemaVenda.validate({ quantity });
        if (ObjectId.isValid(productId)) {
          const prod = await produtoModel.produtoPorId(productId);
          if (prod) await diminuiComplexidade(prod, quantity);
        }
      }),
    );
    if (await results) {
      // if ((await results).every((e) => e === true)) {
      const vendaAdicionada = await vendasModel.addVendas(lista);
      return vendaAdicionada;
    }
  } catch (error) {
    return false;
  }
};
// recebe id da venda, prodId do produto vendido e quanti vendida do produto
const atualizaVendaService = async (id, productId, quantity) => {
  try {
    const vendaId = await vendasModel.vendaPorId(id);
    if (vendaId) {
      const listaprod = vendaId.itensSold;
      // console.log('listaprodutos', listaprod);
      const listaFiltrada = listaprod.filter((item) => item.productId !== productId);
      // console.log('listaFiltrada lista filtrada', listaFiltrada);
      const novoObj = { productId, quantity };
      // console.log('novo prod', novoObj);
      listaFiltrada.push(novoObj);
      // console.log('novoarray', novoArray);
      // console.log('teste', listaFiltrada);
      const atualizaVenda = await vendasModel.atualizarVenda(id, listaFiltrada);
      // console.log('venda atualizada', atualizaVenda);
      return atualizaVenda;
    }
  } catch (error) {
    return 'nao deu';
  }
};

module.exports = {
  addVendasService,
  atualizaVendaService,
};

// try {
//   const results = promise.all(
//     lista.map(async (item) => {
//       const { productId, quantity } = item;
//       const validaQ = await validador.schemaVenda.validate({ quantity });
//       if (ObjectId.isValid(productId)) {
//         const prod = await produtoModel.produtoPorId(productId);
//         if (prod) {
//           const { _id, quantity, name } = prod;
//           if (quantity >= item.quantity) {
//             const novaQ = quantity - item.quantity;
//             // atualizar lista de produto
//             if (novaQ === 0) {
//               await produtoModel.deletaProduto(_id);
//               return true;
//             }
//             await produtoModel.atualizarProduto(_id, name, novaQ);
//             return true;
//           }
//         }
//       }
//     }),
//   );
// } catch (error) {
//   return ('Wrong product ID or invalid quantity');
// }

// const results = Promise.all(
//   lista.map(async (item) => {
//     if (ObjectId.isValid(item.productId)) {
//       const prod = await produtoModel.produtoPorId(item.productId);
//       if (prod) {
//         const { _id, quantity, name } = prod;
//         if (quantity >= item.quantity) {
//           const novaQ = quantity - item.quantity;
//           // atualizar lista de produto
//           if (novaQ === 0) {
//             await produtoModel.deletaProduto(_id);
//             return true;
//           }
//           await produtoModel.atualizarProduto(_id, name, novaQ);
//           return true;
//         }
//         return false;
//       }
//       return false;
//     }
//     return false;
//   }),
// );
// console.log('results', await results);
// if ((await results).every((e) => e === true)) {
//   const vendaAdicionada = await vendasModel.addVendas(lista);
//   return vendaAdicionada;
// }
// return false;

// const atualizaVendaService = async (id, prodId, quanti) => {
//   try {
//     // checa se existe uma venda com o id passado
//     const vendaId = await vendasModel.vendaPorId(id);
//     console.log('venda por id service', vendaId);
//     // existindo a venda seleciona a lista de itens vendidos
//     if (vendaId) {
//       const listaprod = vendaId.itensSold;
//       console.log('itenssold do if', listaprod);
//       // usa a lista de produtos vendidos e faz um map pra ver se o id do
//       // produto eh igual ao prodid passado na funcao
//       const atualiza = Promise.all(
//         listaprod.map(async (item) => {
//           console.log('item id map', item.productId);
//           console.log('item quan map', item.quantity);
//           // os ids sendo iguais atualiza a venda daquele produto
//           if (item.productId === prodId) {
//             console.log('acho q nem veio aqui');
//             const result = await vendasModel.atualizarVenda(id, prodId, quanti);
//             console.log('resultdo final', result);
//             return result;
//           }
//           const diferente = await vendasModel.atualizarVenda(id, item.productId, item.quantity);
//           return diferente;
//         }),
//       );
//       return await atualiza;
//     }
//   } catch (error) {
//     return 'nao deu';
//   }
// };

// if (prod) {
//   const { _id, name } = prod;
//   if (prod.quantity >= quantity) {
//     const novaQ = prod.quantity - quantity;
//     // atualizar lista de produto
//     if (novaQ === 0) {
//       await produtoModel.deletaProduto(_id);
//       return true;
//     }
//     await produtoModel.atualizarProduto(_id, name, novaQ);
//     return true;
//   }
// }
