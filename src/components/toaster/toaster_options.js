function optToast(value) {
  return {
    default: {
      icon: 'las la-bell text-2xl'
    },
    success: {
      icon: 'las la-check-circle text-2xl'
    },
    info: {
      icon: 'las la-exclamation text-2xl'
    },
    warning: {
      icon: 'las la-exclamation-circle text-2xl'
    },
    error: {
      icon: 'las la-exclamation-triangle text-2xl'
    }
  }[value]
}

export { optToast }