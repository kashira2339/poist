export function dragmove(event) {
  console.log(event);
  let target = event.target,
      x      = (parseFloat(target.dataset.x) || 0) + event.dx,
      y      = (parseFloat(target.dataset.y) || 0) + event.dy;
  target.style.transform = `translate(${x}px, ${y}px)`;
  target.dataset.x = x;
  target.dataset.y = y;
}

export function resizemove(event) {
  console.log(event);
  let target = event.target,
      x      = (parseFloat(target.dataset.x) || 0),
      y      = (parseFloat(target.dataset.y) || 0);
  target.style.width  = event.rect.width  + 'px';
  target.style.height = event.rect.height + 'px';

  x += event.deltaRect.left;
  y += event.deltaRect.top;
  
  target.style.transform = `translate(${x}px, ${y}px)`;
  target.dataset.x = x;
  target.dataset.y = y;
}
