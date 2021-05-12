---
meta:
  - name: description
    content: hello
  - name: keywords
    content: 자바스크립트스코프 스코프체인 렉시컬스코프 함수스코프 블록스코프 IIFE
tags:
  - 자바스크립트스코프
  - 스코프체인
  - 렉시컬스코프
  - 함수스코프
  - 블록스코프
  - IIFE
  - 즉시실행함수표현식
---

# 스코프

스코프란 참조 대상 식별자를 찾아내는 방법에 대한 것이다.

## 렉시컬 스코프

스코프가 작동하는 방식에는 **동적 스코프**와 **렉시컬(=정적) 스코프**가 있다

자바스크립트는 렉시컬 스코프를 따른다.

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}
function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

- `foo`에서 호출된 `bar()`는 `foo` 스코프 내의 `var x = 10`을 참조할 것 같다. 그러나 이는 동적 스코프 방식의 동작이다.
- 실제로 `bar`는 상위스코프를 전역으로 가진다.

## 스코프 체인

만약 참조하려는 대상이 현재의 스코프에 존재하지 않는다면 [실행컨텍스트](ExecutionContext.html)에 의해 생성된 스코프 체인을 따라 상위 스코프로 이동하여 찾는다

```js
const a = "global";

function outer() {
  const b = "outer";
  const c = "outer";

  console.log(a, b, c);

  function inner() {
    const c = "inner";

    console.log(a, b, c);
  }
  inner();
}
outer();

// global outer outer
// global outer inner
```

- `outer`에서의 `console.log`는<br/>
  전역 스코프의 `a`<br/>
  `outer` 스코프의 `b,c`를 출력한다
- `inner`에서의 `console.log`는 <br/>
  전역 스코프의 `a`<br/>
  `outer` 스코프의 `b`<br/>
  `inner` 스코프의 `c`를 출력한다.

## 함수 스코프와 블록 스코프

자바스크립트는 기본적으로 함수 스코프를 사용한다. 함수 내에서 선언된 변수는 함수 외부에서 사용될 수 없다. 전역 스코프도 함수 스코프로써 동작한다.

```js
var x = "global scope";
function scope() {
  var x = "function scope";
  {
    let y = "block scope";
    console.log(x);
    console.log(y);
  }
  console.log(x);
  console.log(y);
}

console.log(x);
scope();

// global scope
// function scope
// block scope

// function scope
// Uncaught ReferenceError: y is not defined
```

`var` 키워드로 선언된 변수 또한 함수 스코프로 동작한다.<br/>
`let, const` 키워드로 선언된 변수는 블록 스코프로 동작한다.
함수 안에서 var 키워드를 사용하지 않고 변수할당을 하면 그 변수는 전역변수가 된다.

`for, while, switch, if` 등의 코드에서 사용한 `var` 변수도 계속 남아 있게되어 변수의 스코프 문제가 발생할 수 있다. 그러니 `let, const`를 사용하자..

### 암묵적 전역

```js
var x = 10;

function foo() {
  y = 20;
  console.log(x + y);
}

foo(); // 30
console.log(y); // 20

delete x;
delete y;

console.log(x); // 10
console.log(y); // Uncaught ReferenceError: y is not defined
```

함수 안에서 `var` 키워드를 사용하지 않고 변수할당을 하면 그 변수는 전역변수가 된다. 아니 전역변수처럼 동작한다. 실제로는 `window`객체의 프로퍼티로써 추가된 것이다. 그래서 `delete`를 하면 변수`x`는 삭제되지 않지만, 프로퍼티`y`는 삭제도니다.

## 전역변수의 문제

전역 변수는 다음과 같은 문제들을 가진다. 그렇기에 전역변수의 사용을 억제해야 한다.

- 암묵적 결합
- 긴 생명주기
- 스코프 체인 상에서 종점에 존재 전역변수의 검색이 가장 마지막에 이뤄지기 때문에 느림
- 네임스페이스 오염

## IIFE (즉시 실행 함수 표현식)

```js
(function() {
  var foo = 10;
})();

console.log(foo); // ReferenceError
```

모든 코드를 즉시 실행함수 표현식으로 감싸면 모든 변수는 즉시 실행 함수의 지역변수가 된다. 즉 외부에서 접근할 수 없는 scope를 형성해서 내부 변수를 private하게 만들 수 있다. 또한 전역 스코프를 오염시키지 않는다.

### 모듈패턴

모듈패턴은 클래스를 모방해서 관련있는 변수와 함수를 모아 즉시 실행함수로 감싸 하나의 모듈을 만든다.

모듈패턴은 클로저를 기반을 동작한다. 전역변수 억제는 물론 캡슐화까지 가능하다.

```js
var Counter = (function() {
  var num = 0;

  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
  };
})();

console.log(Counter.num); // undefined. 외부 노출 안됨

console.log(Counter.increase()); // 1
console.log(Counter.decrease()); // 0
```

<br/><br/>

---

> **Reference**<br/> [poiemaweb 스코프](https://poiemaweb.com/js-scope) <br/> 러닝 자바스크립트 <br/> 모던 자바스크립트 DeepDive <br/> You Don't Know JS. 타입과 문법, 스코프와 클로져
