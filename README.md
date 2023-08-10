# 포포-고

- [포포-고](#포포-고)
  - [yarn berry setup](#yarn-berry-setup)
  - [브런치 전략](#브런치-전략)
  - [커밋 컨벤션](#커밋-컨벤션)
  - [참고](#참고)
  - [팀원 및 역할](#팀원-및-역할)


## yarn berry setup
```bash
yarn -v  # current: 3.5.1 not: 1.x.x
yarn set version berry
yarn dlx @yarnpkg/sdks vscode
```

## 브런치 전략

![git_strategy](https://github.com/fourfourgo/fourfour-go/assets/73725736/5715bd46-e503-47da-9155-b597d82dd683)


## 커밋 컨벤션
```html
🎨 feat : 기능 추가 및 개선
🐛 fix : 오류 수정
💄 style : 코드의 수정이 없는 문자포멧팅
🧪 test : 코드 및 기능 테스트
♻️ refactor : 기존 코드를 수정한 코드정리
🗑️ cleanup : 기존 코드를 수정하지 않은 코드정리
🚧 chore : 환경설정 및 프로젝트 세팅

<type>(<scope>): <subject> - Subject line
<BLANK LINE> - 줄 바꿈으로 구분한다
<body> - Message body
<BLANK LINE>  
<footer> - Message footer

    1. **Subject line**
       1. 변경 사항에 대한 간단한 설명.
    2. **Message body**
       1. 수정 이유와 전후 비교 설명.
       2. 명령형 현재 시제로 작성한다. (changed X, change O)
    3. **Message footer**
       1. 주요 변경사항은 푸터에 변화에 대한 상세설명, 정의, 이전 노트와 함께 명시되어야 한다.
       2. 전후를 Before : scope: { ~~ } After : scope: { ~~~ } 와 같이 상세하게 명시한다.
       3. 처리 완료된, 즉 close 된 이슈에 대해서는 `Closes #123, #124` 로 표기한다.

<!-- ex -->
🎨feat : 로그인 기능 추가
<!-- body 줄바꿈 -->
- 로그인 시 스토어에 유저정보 저장
- 최상위 라우터에서 로그인 여부 확인
<!-- footer 줄바꿈 -->
Resolve: #1 <!-- 이슈번호 -->
See also: #3, #4 <!-- 참고 이슈번호 -->

```

## 참고
- Clerk Usage 
  - https://clerk.com/docs/nextjs/get-started-with-nextjs



## 팀원 및 역할

<table>
    <th width="33%" style="text-align:center"><a href="https://github.com/raymondanythings" target="_blank">엽용현</a></th>
    <th width="33%" style="text-align:center"><a href="https://github.com/LeeBonHoon1" target="_blank">이본훈</a></th>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/106373580/233285947-61926021-db9d-4f2b-8b7b-e5ef37c8d686.png"/>
        </td>
        <td>
            <img src="https://github.com/fourfourgo/fourfour-go/assets/73725736/5be49b39-9a38-4f1a-bf0a-01dca0b31050.png"/>
        </td>
    </tr>
    <tr>
        <td>
            <strong>Data based <br />Front-end <br> Developer</strong>
        </td>
        <td>
            <strong>UI based <br />Front-end <br> Developer</strong>
        </td>
    </tr>
</table>

<br>
