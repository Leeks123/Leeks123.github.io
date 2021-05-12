---
meta:
  - name: description
    content: 호이스팅
  - name: keywords
    content: 호이스팅 hoisting var let const 함수호이스팅
tags:
---

# 호이스팅

호이스팅은 [실행컨텍스트](ExecutionContext.html)의 Creation Phase 과정에 의해 나타나는 현상이다. 실제 동작은 다르지만 Hoisting이라는 표현처럼 선언문을 끌어올리는 동작이라고 해석해도 무방하다.

## 변수 호이스팅

```js
// var a = undefined; 주석처럼 동작된다.
console.log(a); // undefined
console.log(b); // Uncaught ReferenceError: b is not defined

var a = 1;
let b = 100;
```

`var` 변수`a`는 실행컨텍스트의 생성과정에서 `a`는 `undefined`로 초기화된다. 즉 호이스팅이 일어난다.

## 함수 호이스팅

함수 또한 호이스팅이 이뤄진다. 그러나 함수 선언식과 함수 표현식은 다르다.

```js
foo();
console.log(bar);
bar();

function foo() {
  console.log("foo executed!!");
}

var bar = function() {
  console.log("bar executed!!");
};

// foo executed!!
// undefined
// Uncaught TypeError: bar is not a function
```

`foo`는 호이스팅되어 잘 호출된다.<br/>
`bar`는 `var bar`라는 변수 선언이 호이스팅된 것이기에 `bar is not a function`이라는 에러가 발생한다.

### 호이스팅 우선순위

변수, 함수 둘다 호이스팅이 된다. 그렇다면 뭐가 먼저 호이스팅 되는가?

```js
foo(); // 1

function foo() {
  console.log(1);
}
var foo = function() {
  console.log(2);
};
```

함수가 호이스팅 된 후, 변수가 호이스팅 된다. 이런 이론적인 내용에 앞서 스코프 내의 중복 선언을 하지 않는 것이 우선이다..

<br/><br/>

---

> **Reference**<br/> You Don't Know JS. 타입과 문법, 스코프와 클로져
