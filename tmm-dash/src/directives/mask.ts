import { ObjectDirective } from 'vue'

// NOTE se chamar diretamente passe o value já formatado com replace(/\D/g, '')
const NAMED_MASKS: {[key: string]: string} = {
  phone: '(##) ?####-####',
  data: '##/##/####',
  time: '##:##',
  cnpj: '##.###.###/####-##',
  cpf: '###.###.###-##',
  cep: '##.###-###'
}

function replacement (maskArr: string[], value: string) {
  const result = []
  for (let index = 0, ponto = 0; index < maskArr.length; index++) {
    let replaced: string

    if (value[ponto] && maskArr[index] === '#') {
      replaced = maskArr[index].replace(/#/g, value[ponto])
      ponto++
    } else {
      replaced = maskArr[index]
    }

    result.push(replaced)
  }

  return result
}

function getReplaceSymbol (mask: string, value: string): string {
  const min = mask.match(/#/g)
  return (min && value.length <= min.length) ? '' : '#'
}

function preReplacement (mask: string, value: string): string[] {
  if (!mask.includes('?')) {
    return replacement(mask.split(''), value)
  }

  const symbol = getReplaceSymbol(mask, value)
  return replacement(mask.replace(/\?/g, symbol).split(''), value)
}

// NOTE se chamar diretamente passe o value já formatado com replace(/\D/g, '')
function formatNumber (mask: string, value: string): string {
  const result = preReplacement(mask, value)
  return result.join('').replace(/#(.*)/g, '') // remove todos os caracteres restantes que a partir de um # existente
}

function formatCurrency (value: string) {
  if (value.length <= 1) {
    value = '0' + value
  }
  value = value.replace(/([0-9]{2})$/g, '.$1')
  const parsed = parseFloat(value)
  return parsed.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

function formatCPFOrCNPJ (value: string): string {
  return value.length > 11 ? formatNumber(NAMED_MASKS.cnpj, value) : formatNumber(NAMED_MASKS.cpf, value)
}

function maskTo (type: string, value: string): string {
  // TODO diminuir complexidade
  const v = value.replace(/\D/g, '')
  if (!value) return value
  if (type === 'real') return formatCurrency(v)
  if (type === 'cpf | cnpj') return formatCPFOrCNPJ(v)

  const mask = NAMED_MASKS[type] || type
  return formatNumber(mask, v)
}

export const mask: ObjectDirective = {
  beforeMount (el, binding) {
    const mask = binding.value
    if (!mask) return

    el.addEventListener('input', (event: InputEvent) => {
      if (!el.value) return
      if (event.inputType === 'deleteContentBackward') return

      el.value = maskTo(mask, el.value)
    })
  }
}
