export function sortBy(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;

    return 0;
  };
}

export function limit(items, number) {
  return items.slice(0, number);
}

// export function getItemsCount(target, array) {
//   var count = 0;
//   target.forEach(function (tar) {
//     tar.category.forEach(function (subcat) {
//       array.forEach(function (arr) {
//         arr.subCategories.forEach(function (subcatproduct) {
//           console.log(subcatproduct);
//           console.log(subcat);
//         });
//       });
//     });
//     count++;
//   });
//   return count;
// }
