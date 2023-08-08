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

![branch_strategy](https://github-production-user-asset-6210df.s3.amazonaws.com/73725736/237285171-6f25b189-1269-46fa-bf11-e27adab40b75.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20230510%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230510T051712Z&X-Amz-Expires=300&X-Amz-Signature=76a83661bc9ad2c4e09404195f5ec8a33d7d902abf09c3c0e7a58a4eacc1ba08&X-Amz-SignedHeaders=host&actor_id=73725736&key_id=0&repo_id=638101956)


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
<!-- 
<table>
    <th width="33%" style="text-align:center"><a href="https://github.com/suhyun22" target="_blank">김수현</th>
    <th width="33%" style="text-align:center"><a href="https://github.com/raymondanythings" target="_blank">엽용현</a></th>
    <th width="33%" style="text-align:center"><a href="https://github.com/goodafteryoon" target="_blank">최윤나</a></th>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/106373580/233285631-99f54808-2c23-4b32-909c-c66e1b0759a6.png"/>
        </td>
        <td>
            <img src="https://user-images.githubusercontent.com/106373580/233285947-61926021-db9d-4f2b-8b7b-e5ef37c8d686.png"/>
        </td>
        <td>
            <img src="https://user-images.githubusercontent.com/106373580/233285807-ea297fe2-d6b3-4539-b7a3-fd7c96b3408c.png"/>
        </td>
    </tr>
    <tr>
        <td>
            <strong>UX/UI <br> Designer</strong>
        </td>
        <td>
            <strong>Front-end <br> Developer</strong>
        </td>
        <td>
            <strong>Front-end <br> Developer</strong>
        </td>
    </tr>
</table>

<br>



 -->
