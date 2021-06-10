import { useToast } from 'vue-toastification';
import { optToast } from './toaster_options';
import Toaster from './Toaster'

// How to use - super easy!
// import into your component, ex.: import { toastMe } from '@/components/toaster/toaster.js'
// now, call: toastMe() with the following options:
// 'default', 'success', 'info', 'warning' or 'error'.
// and with the desired props. There are four of them. (title, msg, link, href)
// Example usage:
// toastMe('success', {
//   title: 'Transacion ID',
//   msg: 'Some text', <-- maybe the transaction hash? I think so!
//   link: true,
//   href: 'https...../tx/0x....' <-- link for transaction
// });

// If you don't want to make the tx linkable just set link to false or
// you can even skip link and href props.

// ALL PROPS ARE OPTIONAL. If you do not use any of them you will get
// an empty toaster!

function toastMe(type, props) {

  let content = {
    component: Toaster,
    props: { toast: props }
  }

  switch(type) {
    case 'success':
      useToast().success(content, optToast(type))
      break
    case 'info':
      useToast().info(content, optToast(type))
      break
    case 'warning':
      useToast().warning(content, optToast(type))
      break
    case 'error':
      useToast().error(content, optToast(type))
      break
    default:
      useToast()(content, optToast(type))
  }
}

export { toastMe }