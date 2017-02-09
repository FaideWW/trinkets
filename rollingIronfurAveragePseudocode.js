
ticks = 0;
avg = 0;

function tick(tickNumber) {
  avg = avg * (ticks / tickNumber);
  ticks = tickNumber;

  stacks = getIFStacks()

  avg += stacks / ticks;
}







function onCast() {
  const duration = getDurationInTicks(traits, goeUp)
  timers.push(ticks + duration);
}


