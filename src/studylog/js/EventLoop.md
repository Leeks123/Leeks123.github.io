---
meta:
  - name: description
    content: about JS Runtime, Event Loop
  - name: keywords
    content: 자바스크립트엔진 JS엔진 콜스택 이벤트루프 런타임 taskqueue microtaskqueue
tags:
  - 브라우저동작
  - 자바스크립트엔진
  - v8엔진
  - 자바스크립트
  - jsEngine
  - 이벤트루프
  - 자바스크립트런타입
  - 싱글스레드
  - taskqueue
  - microtaskqueue
---

# 자바스크립트 런타임

## 이벤트 루프

![이벤트루프](https://user-images.githubusercontent.com/37547661/117696610-75bb0d80-b1fc-11eb-9845-94c28816a413.png)

자바스크립트엔진은 싱글스레드로 동작한다. 즉 하나의 call stack을 가진다. 프로그램의 코드에 따라 함수가 호출되면 call stack에 쌓이게 된다. timer, ajax, DOM 조작, event 등의 작업은 WebAPI에 처리를 넘긴다. WebAPI에서 처리된 후 적절한 큐로 넘긴다.

이벤트 루프는 콜 스택이 비어있는지를 확인한다. 만약에 비어있다면 이벤트 큐에서 작업을 꺼내어 다시 콜 스택에 쌓는다.

## Callback Queue

```js
console.log("1", "Call stack");

setTimeout(() => {
  console.log("2", "Task Queue");
}, 0);

Promise.resolve().then(() => {
  console.log("3", "Microtask Queue");
});

requestAnimationFrame(() => {
  console.log("4", "AnimationFrame");
});

// 1 Call stack
// 3 Microtask Queue
// 4 AnimationFrame
// 2 Task Queue
```

위의 코드를 보면 코드마다 들어가게되는 큐를 출력한다.

Task Queue에는 일반(?) 콜백이 들어간다.<br/>
Microtask Queue에는 `Promise.then`의 콜백이 들어간다.<br/>
microTask 처리 후에 requestAnimationFrame가 실행되어 렌더링 된다.

콘솔이 찍힌 걸 보면 `1 Call stack` 을 제외하고 나머지 결과들을 통해 이벤트 큐의 우선순위를 알 수 있다.

**Microtask Queue > AnimationFrame > Task queue**

<br/><br/>

[런타임 동작 과정](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)을 시각적으로 확인해보면 이해가 쉽다.

---

> **Reference**<br/> [자바스크립트 비동기 처리 과정과 RxJS Scheduler](http://sculove.github.io/blog/2018/01/18/javascriptflow/) <br/> [zerotomastery.io](https://zerotomastery.io/cheatsheets/javascript-cheatsheet-the-advanced-concepts/?utm_source=udemy&utm_medium=coursecontent)
