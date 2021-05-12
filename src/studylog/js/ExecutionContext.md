---
meta:
  - name: description
    content: 자바스크립트 실행컨텍스트
  - name: keywords
    content: 실행컨텍스트 ExecutionContext 렉시컬환경 LexicalEnvironment 콜스택
tags:
  - 실행컨텍스트
  - ExecutionContext
  - 렉시컬환경
  - LexicalEnvironment
  - 콜스택
---

# 실행컨텍스트

## 실행 컨텍스트란?

코드가 실행되기 위해서는 선언된 변수, 함수, 스코프, this, arguments 등의 정보가 필요하다. 자바스크립트는 이러한 정보들을 가진 객체의 형태로 관리한다. 이것이 **실행 컨텍스트**이다.

실행 컨텍스트는 전역 실행 컨텍스트, 함수 실행 컨텍스트, eval 실행 컨텍스트가 있다.<br/>
전역 실행 컨텍스트는 프로그램 실행 시 생성되며,<br/>
함수 실행 컨텍스트는 함수 호출떄마다 생성된다.

이러한 실행 컨텍스트들은 자바스크립트 엔진의 콜 스택에 의해서 관리(?), 처리된다.

## 실행컨텍스트의 구조

```
// 실행 컨텍스트의 추상적인 구조
Execution Context = {
  Lexical Environment : {
    Environment Records : {
      Declarative Environment Record : {
        Function Environment Record,
        Module Environment Record
      },
      Object Environment Record,
      Global Environment Record
    },
    Reference to the outer Environment : xxx
  },
  Variable Environment : {
    // lexical environment와 구조는 동일
  }
}
```

실행 컨텍스트는 **Lexical Environment**와 **Variable Environment**로 구성된다.

- **Lexical Environment**<br/>
  코드에서의 식별자와 식별자에 대입된 값들이 매핑된 정보를 가진 곳이라고 생각할 수 있다.<br/>
  Lexical Environment의 구성 요소는 다음과 같다.
  1. **Environment Records**<br/>
     스코프 내의 함수와 변수를 기록한다
     - **Declarative Environment Record**<br/>변수와 함수 선언을 여기에 저장. <br/>
       이를 상속한 **Function Env Record**에 `this`,`new.target`,`super` 등의 정보가 기록된다.<br/>
       **Module Env Record**에는 Module단에서의 스코프를 나타낸다.
     - **Object Environment Record**<br/>
       Binding Object라는 객체와 연결된다고 하는데 잘 모르겠다. 자세한 내용은 [링크](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#object-environment-record)를 참조..
     - **Global Environment Record**<br/>
       이름 그대로 가장 바깥쪽의 스코프(전역 스코프)를 참조하는 레코드.
  2. **Reference to the outer environment**<br/>
     상위 스코프의 Lexical Env를 참조한다.<br/>이걸 기반으로 [스코프 체인](Scope.html)이 형성된다. 현재 스코프 내의 변수들 중에 참조하려는 변수가 없다면 이 참조를 통해 상위 스코프로 가서 변수를 찾는다.
- **Variable Environment**<br/>
  기본적으로 **Lexical Env**와 구성은 같다. <br/>다른 점은 LexicalEnv는 함수 선언과 변수 (let과 const)의 바인딩을 저장하고 Variable Env는 변수 var 만 저장한다.

## 실행컨텍스트의 생성

실행 컨텍스트의 생성은 다음 2단계로 이뤄진다.

### Creation Phase

Lexical Environment와 Variable Environment의 정의가 이루어진다.<br/> Outer Reference가 결정 되고, <br/>
Environment Record에서 식별자들에 대한 메모리 할당이 진행된다.

Lexical Env에서는 `let, const`가 메모리에 할당되지만 초기화되지는 않는다.<br/>
Variable Env에서는 `var`에 대해서 `undefined`로 초기화(?)된다.

이 과정이 [Hoisting](Hoisting.html)이 일어나는 이유이다.<br/>
자바스크립트 엔진은 코드를 Parsing, Interpreting하면서 선언된 변수, 함수를 찾아 메모리에 저장한다. (호이스팅한다.)

### Execution Phase

이제 자바스크립트 엔진은 해석한 코드를 한줄 한줄 실행하고, 이 과정에서 변수에 값이 할당된다.

그리고 함수가 호출되는 순간 함수에 대한 실행컨텍스트가 생성되는 작업이 진행된다. <br/>
함수 실행 컨텍스트에서 `arguments`도 생성된다.

<br/><br/>

---

> **Reference**<br/> [자바스크립트 실행컨텍스트#1 - 환경 레코드](https://roseline.oopy.io/dev/javascript-back-to-the-basic/environment-record) <br/> [자바스크립트 함수(3) - Lexical Environment](https://meetup.toast.com/posts/129)<br/> [[JS]Execution Context와 Call Stack](https://dkje.github.io/2020/08/30/ExecutionContext/) <br/> [실행 컨텍스트와 자바스크립트의 동작 원리](https://catsbi.oopy.io/fffa6930-ca30-4f7e-88b6-28011fde5867) <br/> [[JS] 자바스크립트의 The Execution Context (실행 컨텍스트) 와 Hoisting (호이스팅)](https://velog.io/@imacoolgirlyo/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-Hoisting-The-Execution-Context-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EC%8B%A4%ED%96%89-%EC%BB%A8%ED%85%8D%EC%8A%A4%ED%8A%B8-6bjsmmlmgy)
