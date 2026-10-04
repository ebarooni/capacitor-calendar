export async function presentToast(message) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = 3500;
  toast.position = 'bottom';
  document.body.appendChild(toast);
  await toast.present();
}
