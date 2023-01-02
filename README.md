# mdstory

markdown 파일을 tistory로 업로드 하는 패키지

## 1. Install

```
npm install -g mdstory
```

## 2. Usage

### 2-1. 키 발급

[tistory API](https://www.tistory.com/guide/api/manage/register)로 이동하여 클라이언트를 등록합니다.
서비스 URL와 callback 경로에는 `https://xxx.tistory.com`을 입력합니다.

터미널에 다음을 입력합니다.

```
mdstory init
```

그러면 `mdstory.config.json` 파일이 생성됩니다.
해당 파일에 blogName, appID, secretKey를 입력합니다.

파일 저장 후, 터미널에 다음을 입력합니다.

```
mdstory token
```

브라우저가 열리면서 OAuth2 인증이 나옵니다.
`허가하기`를 누른 후 이동하면 URL은 다음과 같은 꼴입니다.
`https://xxx.tistory.com/?code=<code>&state=`
<코드> 부분을 복사하여, 터미널에 아래와 같이 입력합니다.

```
mdstory token --code <code>
```

그러면 `.mdstorytoken` 파일이 생성되어, 그 안에 Access token이 담기게 됩니다.

### 2-2. 글 정보 입력

글의 윗 부분에는 YAML 문법으로 작성된 헤더가 존재해야 합니다.

```
---
title: 'mdstory 개발 일지'
public: true
category: '개발'
tag:
  - 'mdstory'
  - '개발
---
```

위와 같이 `title, public, category, tag`를 입력하고, `---`로 감쌉니다. 문법은 [나무위키](https://namu.wiki/w/YAML)를 참고해주세요.

> 현재 `category`는 입력하더라도 반영되지 않습니다.

그 아래에는 markdown문법으로 글을 작성해주세요.

> 현재 로컬 이미지는 업로드 되지 않습니다.

### 2-3. 글 등록

글을 등록하는 방법은 다음과 같습니다.

```
mdstory write --path <path>
```

예를 들어 같은 폴더에 있는 `first post.md`를 등록하려면, 다음과 같이 입력하면 됩니다.

```
mdstory write --path "first post.md"
```

### 2-4. 글 수정

글을 수정하는 방법은 다음과 같습니다.

```
mdstory update --id <postID> --path <path>
```

예를 들어 같은 폴더에 있는 `second post.md`를 2번째 글에 덮어씌우려면, 다음과 같이 입력하면 됩니다.

```
mdstory update --id 2 --path "second post.md"
```
