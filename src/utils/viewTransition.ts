// https://veerasundar.com/blog/next-js-react-view-transitions

export default function viewTransition(callback: () => void) {
  if (!document.startViewTransition) {
    callback();
  } else {
    document.startViewTransition(() => {
      callback();
    });
  }
}