<template>
  <a class="dance" href="http://ashuai.work/welcome" target="_blank">
    <span class="word">a</span>
    <span class="word">s</span>
    <span class="word">h</span>
    <span class="word">u</span>
    <span class="word">a</span>
    <span class="word">i</span>
    <span class="word">.</span>
    <span class="word">w</span>
    <span class="word">o</span>
    <span class="word">r</span>
    <span class="word">k</span>
  </a>
</template>

<style>
.dance {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 6rem;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  margin-left: 12px;
}

.word {
  animation: dance 0.72s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
  display: inline-block;
  transform: translate3d(0, 0, 0);
  font-size: 0.88rem;
  text-decoration: underline;
  color: #75b9ff;
  margin-right: 1px;
}
.word:nth-child(1) {
  animation-delay: 0s;
}
.word:nth-child(2) {
  animation-delay: 0.0333333333s;
}
.word:nth-child(3) {
  animation-delay: 0.1333333333s;
}
.word:nth-child(4) {
  animation-delay: 0.2333333333s;
}
.word:nth-child(5) {
  animation-delay: 0.3333333333s;
}
.word:nth-child(6) {
  animation-delay: 0.4333333333s;
}
.word:nth-child(7) {
  animation-delay: 0.5333333333s;
}
.word:nth-child(8) {
  animation-delay: 0.6333333333s;
}
.word:nth-child(9) {
  animation-delay: 0.7333333333s;
}
.word:nth-child(10) {
  animation-delay: 0.8333333333s;
}
.word:nth-child(11) {
  animation-delay: 0.9333333333s;
}

@keyframes dance {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -0.54em, 0);
  }
}
</style>