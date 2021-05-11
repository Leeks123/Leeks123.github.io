---
meta:
  - name: description
    content: about JS engine
  - name: keywords
    content: 자바스크립트엔진 v8엔진 브라우저엔진 JS엔진 콜스택 메모리힙
tags:
  - 브라우저동작
  - 자바스크립트엔진
  - v8엔진
  - 자바스크립트
  - jsEngine
  - callstack
  - jitc
  - jit컴파일
---

# 자바스크립트 엔진

## Interpreter/compiler pipelines

![javascriptEnginePipeline](https://shlrur.github.io//assets/images/javascript_engine_fundamentals_shape_and_inline_caches/0_js-engine-pipeline.png)

브라우저마다 엔진 동작 방식이 조금씩 다르지만, 전체적인 틀은 위와 같다.

자바스크립트는 인터프리터 언어이자 JITC 언어이다.<br/>
**JITC (Just in time Compilation)** 이란 런타임 시점에서 기계어로 번역하는 컴파일 기법이다.

자바스크립트 소스코드를 parsing하여 AST를 구성한 후 interpreter를 통해 bytecode를 변환한다. 그런 다음 interpreter 모드라면 bytecode를 하나씩 읽어가며 동작을 수행하고, JIT 모드라면 생성된 bytecode를 기반으로 native code로 컴파일 하여 수행하게 된다.
<br/><br/>

여기에서 interpreter라고 더 느리고, JITC라고 더 빠른 것도 아니다. 상황에 따라 다르다.<br/>자바스크립트는 변수의 타입도 달라질 수 있고, 객체도 prototype 방식이라는 점 등 매우 동적인 언어이다. 따라서 예외처리를 한 native code를 생성해야하는데, 이 과정을 거치는 컴파일은 interpreter와 큰 차이가 없게 된다.<br/>그리고 만약 연산량이 적은 프로그램, 자주 반복되서 수행되는 구간(**Hotspot**)이 적은 프로그램이라면 compile overhead가 더 커지게 되어 오히려 JITC가 느리게 된다.
<br/><br/>

위와 같은 문제를 해결하기 위해 모던 브라우저는 **Adaptive JIT Compilation** 방식을 택한다.

기본적으로 모든 코드는 처음에 interpreter로 수행하여 생성한 bytecode에서 Hotspot이 발견되면, 그 부분에 대해서만 JITC를 적용하여 native code로 수행한다. 이 과정을 여러 단계로 진행하여 optimized code를 생성한다.
<br/><br/>

## 가비지 컬렉션

<img width="947" alt="가비지컬렉션" src="https://user-images.githubusercontent.com/37547661/117708814-35af5700-b20b-11eb-9729-4ac9cf9e48e9.png">

자바스크립트에서의 가비지 컬렉션은 **Mark and Sweep** 알고리즘으로 이뤄진다.

root 객체 집합(자바스크립트에서는 전역변수)을 시작으로 닿을 수 있는(참조하고 있는) 객체를 전부 마킹한다. 그리고 닿지 않는 객체들에 대해서 가비지 컬렉션을 수행한다.

<br/>

---

> **Reference** <br/> [JavaScript engine fundamentals: Shapes and Inline Caches](https://shlrur.github.io/javascripts/javascript-engine-fundamentals-shapes-and-Inline-caches/) <br/> [자바스크립트 엔진의 최적화 기법 (1) - JITC, Adaptive Compilation](https://meetup.toast.com/posts/77) <br/> [MDN 가비지컬렉션](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management) <br/> [zerotomastery.io](https://zerotomastery.io/cheatsheets/javascript-cheatsheet-the-advanced-concepts/?utm_source=udemy&utm_medium=coursecontent#JavaScriptEngine)
