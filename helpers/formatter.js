'use strict';

function priceToRupiah(value) {
  return `Rp. ${value.toLocaleString('id-ID')}`
}

function sumPrice(array){
  let result = 0;
  array.forEach(el => {
    result += el
  })
  return priceToRupiah(result)
}

function formatingDateForForm(value){
  let ndate = new Date(value).toISOString().split('T')[0]
      return ndate
}

module.exports = { priceToRupiah, sumPrice, formatingDateForForm };