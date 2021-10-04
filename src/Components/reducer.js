export const initState = JSON.parse(localStorage.getItem("cart") || '[]');

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            const cartFromLS = JSON.parse(localStorage.getItem("cart") || '[]');
            cartFromLS.push(action.payload);
            
            localStorage.setItem("cart", JSON.stringify(cartFromLS));
            const filteredArr = JSON.parse(localStorage.getItem("cart")).reduce((acc, current) => {
              const x = acc.find(item => item.id === current.id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            return filteredArr;
        case 'REMOVE':
          state.forEach((item, index)=>{
            if (item.id === action.id) {
              state.splice(index, 1);
            }
          });
          localStorage.setItem("cart", JSON.stringify(state));
          return JSON.parse(localStorage.getItem("cart"));
        case 'INCREASE':
          const state1 = [...state];
          state.forEach((item, index)=>{
            if (item.id === action.id) {
              state1.splice(index, 1, {
                id: item.id,
                name: item.name,
                price: item.price,
                quantily: item.quantily < 5 ? item.quantily + 1 : 5,
                image: item.image,
              });
            }
          });
          const state2 = [...state1];
          localStorage.setItem("cart", JSON.stringify(state2));
          return JSON.parse(localStorage.getItem("cart"));
        case 'DECREASE':
          const state12 = [...state];
          state.forEach((item, index)=>{
            if (item.id === action.id) {
              state12.splice(index, 1, {
                id: item.id,
                name: item.name,
                price: item.price,
                quantily: item.quantily > 1 ? item.quantily - 1 : 1,
                image: item.image,
              });
            }
          });
          localStorage.setItem("cart", JSON.stringify(state12));
          return JSON.parse(localStorage.getItem("cart"));
        default:
            throw new Error();
      }
}

export default reducer;