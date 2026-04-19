// Data Access Component Layer (Repository/DB 조작 역할)
// 실제 환경에서는 mysql, postgresql 같은 모듈을 가져와 쿼리를 실행하는 곳입니다.

let posts = [
  { id: 2, title: '금융 상품 가입 경로 문의', content: '앱 내에서 가입하는 경로를 못찾겠습니다.', author: '고객B', createdAt: new Date().toISOString() },
  { id: 1, title: '첫 번째 문의글입니다', content: '게시판이 잘 만들어졌네요.', author: '고객A', createdAt: new Date(Date.now() - 10000000).toISOString() }
];
let currentId = 3;

module.exports = {
  /**
   * 나중에 실제 DB로 교체할 때를 대비해, 모든 반환은 비동기 Promise로 시뮬레이션 합니다.
   * 이렇게 하면 상위 계층(biz, web)의 코드는 전혀 수정할 필요가 없습니다.
   */
  findAllPosts: async () => {
    return new Promise((resolve) => {
      // 0.3초의 네트워크 지연 시간 시뮬레이션
      setTimeout(() => resolve([...posts]), 300);
    });
  },

  createPost: async (postData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          id: currentId++,
          ...postData,
          createdAt: new Date().toISOString()
        };
        // 최신글을 상단에 오게 배열 맨 앞에 추가
        posts.unshift(newPost);
        resolve(newPost);
      }, 300);
    });
  }
};
